import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('');
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [allFilters, setAllFilters] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  async function getApiResult() {
    const apiResult = await fetchAPI();
    setPlanets(apiResult);
  }

  useEffect(() => {
    getApiResult();
  }, []);

  const allData = {
    setFilterName,
    setPlanets,
    setColumn,
    setComparison,
    getApiResult,
    setNumber,
    setColumnOptions,
    setAllFilters,
    setFilteredPlanets,
    planets,
    filterName,
    allNumberValue: [{
      column,
      comparison,
      number,
    }],
    columnOptions,
    allFilters,
    filteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ allData }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: node,
}.isRequired;
