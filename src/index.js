import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import CountriesApiService from './country-search/country-search';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('country-info'),
};

const countriesApiService = new CountriesApiService();

refs.searchBox.addEventListener('input', inputHandler);

function inputHandler(event) {
  countriesApiService.query = event.currentTarget.value.trim().toLowerCase();

  countriesApiService.fetchCountries().then(countries => {
    createMarkup(countries);
  });
}

function createMarkup(countries) {
  if (countries.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length > 1 && countries.length <= 10) {
    const countriesListMarkup = countries
      .map(country => {
        return `<li class="country-list__item"><img class="country-list__image" src="${country.flags.svg}" alt="flag of ${country.name}">${country.name}</li>`;
      })
      .join(' ');

    refs.countryList.innerHTML = countriesListMarkup;
    return;
  }

  if (countries.length === 1) {
    const countryMarkup = '';
    refs.countryList.innerHTML = countryMarkup;
    return;
  }
}
