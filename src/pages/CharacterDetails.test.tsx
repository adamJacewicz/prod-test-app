import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterDetails from './CharacterDetails.tsx';
import { Route, Routes, useLoaderData } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';


const character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1'
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20'
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: new Date('2017-11-04T18:50:21.651Z')
};



vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as any;
  return {
    ...actual,
    useLoaderData: vi.fn()
  };
});


describe('CharacterDetails', () => {
  beforeEach(() => {
    (vi.mocked(useLoaderData)).mockReturnValue(character);
  });

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders character details', () => {
    render(
      <MemoryRouter initialEntries={['/character/2']}>
        <Routes>
          <Route path="character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('character-details')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Type: Human')).toBeInTheDocument();
    expect(screen.getByText('Location: Earth (Replacement Dimension)')).toBeInTheDocument();
  });
});
