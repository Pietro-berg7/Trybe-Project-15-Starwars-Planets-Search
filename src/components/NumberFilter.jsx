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
    setAllFilters,
    setFilteredPlanets,
    allFilters,
    filteredPlanets,
    getApiResult,
  } = useContext(PlanetsContext);

  useEffect(() => {
    setColumn(columnOptions[0]);
    setComparison('maior que');
    setNumber(0);
  }, [setColumn, columnOptions, setComparison, setNumber]);

  const deleteFilter = ({ target: { value } }) => {
    const refreshFilters = allFilters.filter((filter) => filter.column !== value);
    setAllFilters(refreshFilters);
    columnOptions.unshift(value);
    filteredPlanets.forEach((planet) => {
      planets.unshift(planet);
    });
    if (allFilters.length === 1) {
      setPlanets([]);
      getApiResult();
    }
  };

  const deleteAllFilter = () => {
    setAllFilters([]);
    setPlanets([]);
    getApiResult();
  };

  const handleClick = () => {
    setAllFilters([
      ...allFilters,
      {
        column,
        comparison,
        number,
      },
    ]);
    const options = columnOptions.filter((option) => option !== column);
    if (comparison === 'maior que') {
      const filter = planets
        .filter((planet) => Number(planet[column]) > Number(number));
      const filter2 = planets
        .filter((planet) => (
          Number(planet[column]) <= Number(number)) || (planet[column] === 'unknown'
        ));
      setPlanets(filter);
      setFilteredPlanets(filter2);
    }
    if (comparison === 'menor que') {
      const filter = planets
        .filter((planet) => Number(planet[column]) < Number(number));
      const filter2 = planets
        .filter((planet) => (
          Number(planet[column]) >= Number(number)) || (planet[column] === 'unknown'
        ));
      setPlanets(filter);
      setFilteredPlanets(filter2);
    }
    if (comparison === 'igual a') {
      const filter = planets
        .filter((planet) => Number(planet[column]) === Number(number));
      const filter2 = planets
        .filter((planet) => Number(planet[column]) !== Number(number));
      setPlanets(filter);
      setFilteredPlanets(filter2);
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
      <section>
        { allFilters.map((filter) => (
          <div
            data-testid="filter"
            key={ filter.column }
          >
            <p>{`${filter.column} ${filter.comparison} ${filter.number}`}</p>
            <button
              type="button"
              value={ filter.column }
              onClick={ deleteFilter }
            >
              X
            </button>
          </div>
        ))}
      </section>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ deleteAllFilter }
      >
        Remover Filtros
      </button>
    </form>
  );
}
