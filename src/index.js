import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import CountriesApiService from './country-search';
import { createMarkup } from './create-markup';
import { refs } from './refs';

const DEBOUNCE_DELAY = 300;
const countriesApiService = new CountriesApiService();

refs.searchBox.addEventListener(
  'input',
  debounce(inputHandler, DEBOUNCE_DELAY)
);

function inputHandler(event) {
  if (event.target.value.trim() === '') {
    return Notify.failure('Please enter some character for search!', {
      position: 'center-top',
    });
  }

  countriesApiService.query = event.target.value.trim().toLowerCase();

  countriesApiService
    .fetchCountries()
    .then(countries => {
      if (countries.length === 1) {
        renderCountriesList(countries);
      } else {
        renderCountryInfo(countries);
      }
    })
    .catch(error => {
      Notify.failure(
        `${error.message} Oops, there is no country with that name`,
        {
          position: 'center-top',
        }
      );
      refs.countryInfo.innerHTML = '';
    });
}

function renderCountriesList(countries) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = createMarkup(countries);
}

function renderCountryInfo(countries) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = createMarkup(countries);
}
