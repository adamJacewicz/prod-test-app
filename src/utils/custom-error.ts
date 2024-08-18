const originalOnError = window.onerror;

window.onerror = function(message, source, lineno, colno, error) {
  console.error(`🚨 ERROR: ${message} at ${source}:${lineno}:${colno}`);

  fetch(`${import.meta.env.VITE_AWS_ERROR_TRACKING_API}/prod/track-error`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      value: 1
    })
  })

  if (originalOnError) {
    return originalOnError.apply(this, [
      message, source, lineno, colno, error
    ]);
  }

  return true;
};
