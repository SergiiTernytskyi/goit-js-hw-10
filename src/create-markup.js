import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function createMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'center-center',
    });
    return '';
  }

  if (countries.length > 1 && countries.length <= 10) {
    const countriesListMarkup = countries
      .map(country => {
        return `<li class="country-list__item"><img class="country-list__image" src="${country.flags.svg}" alt="flag of ${country.name.official}">${country.name.official}</li>`;
      })
      .join(' ');
    return countriesListMarkup;
  }

  if (countries.length === 1) {
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
}
