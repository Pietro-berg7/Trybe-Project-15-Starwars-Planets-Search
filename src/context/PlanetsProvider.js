import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function getApiResult() {
      const apiResult = await fetchAPI();
      setPlanets(apiResult);
    }
    getApiResult();
  }, []);

  const allData = {
    planets,
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
