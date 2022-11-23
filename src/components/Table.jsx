import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    planets,
    setFilterName,
    setFilterColumn,
    setFilterComparison,
    setFilterNumber,
  } = useContext(PlanetsContext);

  const [filterNa, setFilterNa] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setFilterName({ name: filterNa });
  }, [setFilterName, filterNa]);

  useEffect(() => {
    setFilterNumber({ name: number });
  }, [setFilterNumber, number]);

  useEffect(() => {
    setFilterColumn({ name: column });
  }, [setFilterColumn, column]);

  useEffect(() => {
    setFilterComparison({ name: comparison });
  }, [setFilterComparison, comparison]);

  console.log(planets);

  return (
    <main>

      <form>
        <label htmlFor="filter-name">
          <input
            data-testid="name-filter"
            type="text"
            name="filter-name"
            value={ filterNa }
            onChange={ ({ target: { value } }) => setFilterNa(value) }
          />
        </label>

        <label htmlFor="filter-number">
          <select
            data-testid="column-filter"
            name="filter-number"
            value={ column }
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
          <select
            data-testid="comparison-filter"
            name="filter-number"
            value={ comparison }
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            type="number"
            name="filter-number"
            value={ number }
            onChange={ ({ target: { value } }) => setNumber(value) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setFilterColumn(column);
            setFilterComparison(comparison);
            setFilterNumber(number);
          } }
        >
          Filtrar
        </button>
      </form>

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
