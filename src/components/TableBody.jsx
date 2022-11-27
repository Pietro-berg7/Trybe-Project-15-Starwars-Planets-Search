import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function TableBody() {
  const {
    planets,
    filterName,
    allNumberValue: [{
      column,
      comparison,
      number,
    }],
  } = useContext(PlanetsContext);

  const search = planets
    .filter((planet) => planet.name.toLowerCase()
      .includes(filterName, column, comparison, number))
    .map((planet) => (
      <tr key={ planet.name }>
        <td data-testid="name-cell">{ planet.name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ planet.diameter }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.gravity }</td>
        <td>{ planet.terrain }</td>
        <td>{ planet.surface_water }</td>
        <td>{ planet.population }</td>
        <td>{ planet.films }</td>
        <td>{ planet.created }</td>
        <td>{ planet.edited }</td>
        <td>{ planet.url }</td>
      </tr>
    ));
  return (
    <tbody>
      {search}
    </tbody>
  );
}
