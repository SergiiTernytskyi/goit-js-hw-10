export function createCountriesListMarkup(countries) {
  const countriesListMarkup = countries
    .map(country => {
      return `<li class="country-list__item"><img class="country-list__image" src="${country.flags.svg}" alt="flag of ${country.name.official}">${country.name.official}</li>`;
    })
    .join(' ');
  return countriesListMarkup;
}
