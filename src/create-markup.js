import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCountriesListMarkup } from './create-countries-list-markup';
import { createCountryInfoMarkup } from './create-country-info-markup';

export function createMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'center-top',
    });
    return '';
  }

  if (countries.length >= 2 && countries.length <= 10) {
    return createCountriesListMarkup(countries);
  }

  if (countries.length === 1) {
    return createCountryInfoMarkup(countries);
  }
}
