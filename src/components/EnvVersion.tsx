import React from 'react';

const EnvVersion = ({className}: {className?: string}) => {
  return (
    <div className={`bg-white w-fit p-2 rounded ${className}`}>
        ENV: {import.meta.env.VITE_ENVIRONMENT} - VER: {__APP_VERSION__}
    </div>
  );
};

export default EnvVersion;
