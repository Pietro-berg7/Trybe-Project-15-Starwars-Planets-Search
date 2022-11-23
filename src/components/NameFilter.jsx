import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NameFilter() {
  const { setFilterName } = useContext(PlanetsContext);

  return (
    <form>
      <label htmlFor="filter-name">
        <input
          data-testid="name-filter"
          type="text"
          name="filter-name"
          onChange={ ({ target: { value } }) => setFilterName(value) }
        />
      </label>
    </form>
  );
}
