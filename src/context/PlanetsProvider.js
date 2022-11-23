import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    async function getApiResult() {
      const apiResult = await fetchAPI();
      setPlanets(apiResult);
    }
    getApiResult();
  }, []);

  const allData = {
    setFilterName,
    setPlanets,
    setColumn,
    setComparison,
    setNumber,
    planets,
    filterName,
    allNumberValue: [{
      column,
      comparison,
      number,
    }],
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
