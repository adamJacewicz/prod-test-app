import React from 'react';
import { useConfig } from '../context/ConfigContext.tsx';

const EnvVersion = ({className}: {className?: string}) => {
  const context = useConfig();

  return (
    <div className={`bg-white w-fit p-2 rounded ${className}`}>
        ENV: {context.appEnv} - VER: {context.appVersion}
    </div>
  );
};

export default EnvVersion;
