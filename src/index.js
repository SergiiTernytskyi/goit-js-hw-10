import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import CountriesApiService from './country-search/country-search';
import { createMarkup } from './create-markup';
import { refs } from './refs';

const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

refs.searchBox.addEventListener(
  'input',
  debounce(inputHandler, DEBOUNCE_DELAY)
);

function inputHandler(event) {
  if (event.target.value === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return Notify.failure('Please enter some characters for search!', {
      position: 'center-center',
    });
  }

  countriesApiService.query = event.target.value.trim().toLowerCase();

  let markup = '';

  countriesApiService
    .fetchCountries()
    .then(countries => {
      markup = createMarkup(countries);
      console.log(markup);

      if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = markup;
      } else {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = markup;
      }
    })
    .catch(error => {
      Notify.failure(
        `${error.message} Oops, there is no country with that name`,
        {
          position: 'center-center',
        }
      );
      refs.countryInfo.innerHTML = '';
    });
}
