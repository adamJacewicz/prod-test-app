const originalOnError = window.onerror;

window.onerror = function(message, source, lineno, colno, error) {
  console.error(`🚨 ERROR: ${message} at ${source}:${lineno}:${colno}`);

  if (originalOnError) {
    return originalOnError.apply(this, [
      message, source, lineno, colno, error
    ]);
  }

  return true;
};
