import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    planets,
    setFilterName,
    setFilterNumber,
  } = useContext(PlanetsContext);

  const [filterNa, setFilterNa] = useState('');
  const [filterNu, setFilterNu] = useState('');

  useEffect(() => {
    setFilterName({ name: filterNa });
  }, [setFilterName, filterNa]);

  useEffect(() => {
    setFilterNumber({ name: filterNu });
  }, [setFilterNumber, filterNu]);

  console.log(planets);

  return (
    <main>
      <label htmlFor="filter-name">
        Search:
        <input
          data-testid="name-filter"
          type="text"
          name="filter-name"
          value={ filterNa }
          onChange={ ({ target: { value } }) => setFilterNa(value) }
        />
      </label>
      <label htmlFor="filter-number">
        Search:
        <input
          data-testid="number-filter"
          type="text"
          name="filter-number"
          value={ filterNu }
          onChange={ ({ target: { value } }) => setFilterNu(value) }
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
