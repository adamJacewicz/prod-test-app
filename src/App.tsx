import React from 'react';
import { Outlet } from 'react-router-dom';
import EnvVersion from './components/EnvVersion.tsx';

const App = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h1 className="text-xl font-bold text-center">🚀 Rick and Morty - Fan Service - Hello from AWS - 2</h1>
      </div>
      <Outlet />
      <EnvVersion className="m-1 ml-auto" />
    </div>
  );
};

export default App;
