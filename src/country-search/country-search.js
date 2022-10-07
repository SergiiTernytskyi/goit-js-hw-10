export default class CountriesApiService {
  constructor() {
    this.queryName = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.queryName}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        return data;
      });
  }

  get query() {
    return this.queryName;
  }

  set query(newQuery) {
    this.queryName = newQuery;
  }
}
