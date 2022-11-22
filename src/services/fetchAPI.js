const fetchAPI = async () => {
  try {
    const url = 'https://swapi.dev/api/planets';
    const response = await fetch(url);
    const data = await response.json();
    data.results.map((planet) => delete planet.residents);
    return data.results;
  } catch (err) {
    console.error(err);
  }
};

export default fetchAPI;
