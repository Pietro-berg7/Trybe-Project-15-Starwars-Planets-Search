import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NumberFilter() {
  const {
    setFilterColumn,
    setFilterComparison,
    setFilterNumber,
  } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setFilterNumber({ name: number });
  }, [setFilterNumber, number]);

  useEffect(() => {
    setFilterColumn({ name: column });
  }, [setFilterColumn, column]);

  useEffect(() => {
    setFilterComparison({ name: comparison });
  }, [setFilterComparison, comparison]);

  return (
    <form>
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
  );
}
