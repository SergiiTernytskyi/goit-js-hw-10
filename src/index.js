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
    clearCountries();

    return Notify.failure('Please enter some character for search!', {
      position: 'center-top',
    });
  }

  countriesApiService.query = event.target.value.trim().toLowerCase();

  countriesApiService
    .fetchCountries()
    .then(countries => {
      if (countries.length === 1) {
        clearCountries();
        renderCountryInfo(countries);
      } else {
        clearCountries();
        renderCountryList(countries);
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

function clearCountries() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
  refs.countryList.innerHTML = createMarkup(countries);
}

function renderCountryInfo(country) {
  refs.countryInfo.innerHTML = createMarkup(country);
}
