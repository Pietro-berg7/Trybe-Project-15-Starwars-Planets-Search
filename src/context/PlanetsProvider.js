import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterNumber, setFilterNumber] = useState('');

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

  // useEffect(() => {
  //   const filteredByNumber = apiData
  //     .filter((planet) => planet.name.toLowerCase()
  //       .includes(filteredByNumber.name.toLowerCase()));
  //   setPlanets(filteredByNumber);
  // }, [filterNumber, apiData, setPlanets]);
  console.log(filterNumber);

  const allData = {
    planets,
    setFilterName,
    setFilterNumber,
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
