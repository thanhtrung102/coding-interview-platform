// Code execution utilities for JavaScript and Python (via Pyodide)

let pyodideInstance = null;

/**
 * Initialize Pyodide (Python WASM runtime)
 */
export async function initPyodide() {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  try {
    // Load Pyodide from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';

    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    // Initialize Pyodide
    pyodideInstance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    });

    return pyodideInstance;
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
    throw new Error('Failed to initialize Python runtime');
  }
}

/**
 * Execute JavaScript code safely in the browser
 */
export function executeJavaScript(code) {
  return new Promise((resolve) => {
    const logs = [];
    const errors = [];

    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      logs.push(args.map(arg => String(arg)).join(' '));
    };

    console.error = (...args) => {
      errors.push(args.map(arg => String(arg)).join(' '));
    };

    console.warn = (...args) => {
      logs.push('[Warning] ' + args.map(arg => String(arg)).join(' '));
    };

    try {
      // Use Function constructor for safer evaluation
      // This creates a new function scope and doesn't give access to local variables
      const fn = new Function(code);
      const result = fn();

      // Restore console
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;

      // Format output
      let output = '';

      if (logs.length > 0) {
        output += logs.join('\n');
      }

      if (result !== undefined) {
        output += (output ? '\n' : '') + '=> ' + String(result);
      }

      if (errors.length > 0) {
        output += (output ? '\n' : '') + 'Errors:\n' + errors.join('\n');
      }

      resolve({
        success: errors.length === 0,
        output: output || 'Code executed successfully (no output)',
        error: errors.length > 0 ? errors.join('\n') : null
      });
    } catch (error) {
      // Restore console
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;

      resolve({
        success: false,
        output: logs.join('\n'),
        error: `Error: ${error.message}\n${error.stack || ''}`
      });
    }
  });
}

/**
 * Execute Python code using Pyodide (WASM)
 */
export async function executePython(code) {
  try {
    // Initialize Pyodide if not already done
    const pyodide = await initPyodide();

    // Redirect stdout to capture print statements
    await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

    // Run the user's code
    const result = await pyodide.runPythonAsync(code);

    // Get stdout and stderr
    const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
    const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');

    // Format output
    let output = '';

    if (stdout) {
      output += stdout;
    }

    if (result !== undefined && result !== null) {
      output += (output ? '\n' : '') + '=> ' + String(result);
    }

    if (stderr) {
      output += (output ? '\n' : '') + 'Errors:\n' + stderr;
    }

    return {
      success: !stderr,
      output: output || 'Code executed successfully (no output)',
      error: stderr || null
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `Python Error: ${error.message}`
    };
  }
}

/**
 * Execute code based on language
 */
export async function executeCode(code, language) {
  if (language === 'javascript') {
    return executeJavaScript(code);
  } else if (language === 'python') {
    return executePython(code);
  } else {
    return {
      success: false,
      output: '',
      error: `Unsupported language: ${language}`
    };
  }
}
