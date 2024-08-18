import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Character } from '../../lib/rick-and-morty-api-client';

const Characters = () => {
  const { characters } = useLoaderData() as { characters: Character[] };

  useEffect(() => {
    if (import.meta.env.VITE_ENVIRONMENT === "LOCAL") return
      const fetchData: Partial<PerformanceResourceTiming> = performance.getEntriesByName("https://rickandmortyapi.com/api/character")[0]!;
      fetch(`${import.meta.env.VITE_AWS_MONITORING_API}/prod/monitoring`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          loadTimeMs: fetchData.responseEnd
        })
      })
  }, [characters]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4" data-testid="characters-list">
      <p className="font-bold mb-4">Select a character:</p>
      <ul>
        {characters.map((character) => (
          <li key={character.id} className="mb-4">
            <Link to={`character/${character.id}`} data-testid={`character-link-${character.id}`}>
              <div className="flex flex-row items-center space-x-2 border border-gray-100 rounded-md hover:border-blue-200 hover:bg-blue-100/50 p-4">
                <img
                  src={character.image}
                  alt={`${character.name} - Profile Image`}
                  className="w-10 h-10 rounded-full"
                />
                <p>{character.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
