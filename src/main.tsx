import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import { fetchCharacter, fetchCharacters } from './loaders/CharacterLoader';
import { CharacterRouteParams } from './types/types';
import { ConfigProvider } from './context/ConfigContext';
import './utils/custom-error.ts';
import { createInstance } from '@featurevisor/sdk';
import { FeaturevisorProvider } from '@featurevisor/react';

const Characters = lazy(() => import('./pages/Characters'));
const CharacterDetails = lazy(() => import('./pages/CharacterDetails'));

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: fetchCharacters,
        element: <Characters />
      },
      {
        path: 'character/:id',
        loader: async ({ params }) => {
          return fetchCharacter({ params } as CharacterRouteParams);
        },
        element: <CharacterDetails />
      }
    ]
  }
]);

const envName = import.meta.env.VITE_ENVIRONMENT || 'preview';
const featurevisor = createInstance({
  datafileUrl: `https://dsz1j4uozijd9.cloudfront.net/datafiles/${envName.toLowerCase()}/datafile-tag-all.json`
});

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <FeaturevisorProvider instance={featurevisor}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </FeaturevisorProvider>
  </React.StrictMode>
);
