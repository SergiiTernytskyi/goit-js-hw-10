export function createCountryInfoMarkup(countries) {
  const countryInfoMarkup = countries
    .map(country => {
      return `<img class="country-info__image" src="${
        country.flags.svg
      }" alt="flag of ${
        country.name.official
      }"><h2 class="country-info__title">${
        country.name.official
      }</h2> <p class="country-info__text"><span class="country-info__text--accent">Capital: </span>${
        country.capital
      }</p> <p class="country-info__text"><span class="country-info__text--accent">Population: </span>${
        country.population
      }</p> <p class="country-info__text"><span class="country-info__text--accent">Languages: </span>${Object.values(
        country.languages
      ).join(', ')}
          </p>`;
    })
    .join(' ');
  return countryInfoMarkup;
}
