import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NumberFilter() {
  const {
    allNumberValue: [{ column, comparison, number }],
    columnOptions,
    planets,
    setColumn,
    setColumnOptions,
    setComparison,
    setNumber,
    setPlanets,
  } = useContext(PlanetsContext);

  useEffect(() => {
    setColumn(columnOptions[0]);
    setComparison('maior que');
    setNumber(0);
  }, [setColumn, columnOptions, setComparison, setNumber]);

  const handleClick = () => {
    const options = columnOptions.filter((option) => option !== column);
    if (comparison === 'maior que') {
      setPlanets(planets
        .filter((planet) => Number(planet[column]) > Number(number)));
    }
    if (comparison === 'menor que') {
      setPlanets(planets
        .filter((planet) => Number(planet[column]) < Number(number)));
    }
    if (comparison === 'igual a') {
      setPlanets(planets
        .filter((planet) => Number(planet[column]) === Number(number)));
    }
    setColumnOptions(options);
  };

  return (
    <form>
      <label htmlFor="filter-number">
        <select
          data-testid="column-filter"
          name="filter-number"
          value={ column }
          onChange={ ({ target: { value } }) => setColumn(value) }
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
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
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}
