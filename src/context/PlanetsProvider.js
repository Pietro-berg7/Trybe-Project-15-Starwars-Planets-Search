import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterNumber, setFilterNumber] = useState(0);
  const [filterColumn, setFilterColumn] = useState('');
  const [filterComparison, setFilterComparison] = useState('');

  useEffect(() => {
    async function getApiResult() {
      const apiResult = await fetchAPI();
      setPlanets(apiResult);
      setApiData(apiResult);
    }
    getApiResult();
  }, []);

  useEffect(() => {
    const filteredByName = apiData
      .filter((planet) => planet.name.toLowerCase()
        .includes(filterName.name.toLowerCase()));
    setPlanets(filteredByName);
  }, [filterName, apiData, setPlanets]);

  useEffect(() => {
    if (filterComparison === 'maior que') {
      const filteredByNumber = apiData
        .filter((planet) => Number(planet[filterColumn]) > Number(filterNumber));
      setPlanets(filteredByNumber);
    }
    if (filterComparison === 'menor que') {
      const filteredByNumber = apiData
        .filter((planet) => Number(planet[filterColumn]) < Number(filterNumber));
      setPlanets(filteredByNumber);
    }
    if (filterComparison === 'igual a') {
      const filteredByNumber = apiData
        .filter((planet) => Number(planet[filterColumn]) === Number(filterNumber));
      setPlanets(filteredByNumber);
    }
  }, [filterComparison, apiData, filterColumn, filterNumber, setPlanets]);

  const allData = {
    planets,
    setFilterName,
    setFilterNumber,
    setFilterColumn,
    setFilterComparison,
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
