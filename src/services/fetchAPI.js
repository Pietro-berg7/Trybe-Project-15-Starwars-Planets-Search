const fetchAPI = async () => {
  const url = 'https://swapi.dev/api/planets';
  const response = await fetch(url);
  const data = await response.json();
  data.results.map((planet) => delete planet.residents);
  return data.results;
};

export default fetchAPI;
