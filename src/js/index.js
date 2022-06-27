import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import { fetchCountries } from './fetchCountries';


const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputSearch.addEventListener('input',  debounce(onInput, DEBOUNCE_DELAY));


function onInput () {
    const searchName = inputSearch.value.trim();
    resetList();
    resetCard();
    
    if(searchName === ""){
        resetList();
        resetCard();
        return};
    
    fetchCountries(searchName)
    .then(response => {

        if(response.length > 1 && response.length <= 10){
            markupCreateList (response)
        };        

        if (response.length > 10){
            Notify.info("Too many matches found. Please enter a more specific name.");
        };

        if(response.length === 1){
            markupCreateCard(response[0])
        };
    })
    .catch(() =>{
        Notify.failure("Oops, there is no country with that name");
    });
};  

function markupCreateList (response){
    return response.map(evt => {               
        countryList.insertAdjacentHTML('beforeend',  `<li><img src="${evt.flags.svg}" alt="">${evt.name.common}</li>`)
        })
};

function resetList(){
    countryList.innerHTML = '';
};

function resetCard(){
    countryInfo.innerHTML = '';
};

function markupCreateList (response){
    return response.map(evt => {               
        countryList.insertAdjacentHTML('beforeend',  `<li><img src="${evt.flags.svg}" alt="">${evt.name.common}</li>`)
        })
};

function markupCreateCard (obj) {
    console.log([obj]);
    resetList();
    resetCard();
        
    countryInfo.innerHTML = `<h1 class="country-info__title">
        <img src="${obj.flags.svg}" alt="flag of ${obj.name.official}" class="country-info__img">
        ${obj.name.official}</h1>

        <ul class="country-info__list">
          <li><h3>Capital:</h3>${obj.capital}</li>
          <li><h3>Population:</h3>${obj.population}</li>
          <li><h3>Languages:</h3>${Object.values(obj.languages)}</li>
        </ul>`
};
