import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NameFilter() {
  const { setFilterName } = useContext(PlanetsContext);
  const [filterNa, setFilterNa] = useState('');

  useEffect(() => {
    setFilterName({ name: filterNa });
  }, [setFilterName, filterNa]);

  return (
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
    </form>
  );
}
