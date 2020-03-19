let cities;

const API_URL = "http://api.travelpayouts.com/data/ru/cities.json";
const DIRECT_TICKET_URL =
  "http://api.travelpayouts.com/v1/prices/direct?origin=MOW&destination=LED&depart_date=2017-11&return_date=2017-12&token=";
const API_KEY = "efddf8e209d90edc9b0ef6ff1ecdff8a";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const METHOD = "GET";
const SUCCESS_CODE = 200;

const popup = document.querySelector(".popup");
const form = document.querySelector(".form-search");
const departureInput = form.querySelector(".input__cities-from");
const departureDropdown = form.querySelector(".dropdown__cities-from");
const destinationInput = form.querySelector(".input__cities-to");
const destinationDropdown = form.querySelector(".dropdown__cities-to");

function getData(method, url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send();
  xhr.addEventListener("load", function() {
    switch (xhr.status) {
      case SUCCESS_CODE:
        cities = JSON.parse(xhr.response);
        if (cb) {
          cb();
        }

        break;

      default:
        console.error();
    }
  });
}

function removePopup() {
  popup.classList.remove("popup--visible");
}

function createCitiesList(filteredCities, dropdown) {
  const documentFragment = document.createDocumentFragment();

  filteredCities.forEach(city => {
    const listItem = document.createElement("li");
    listItem.textContent = city.name;
    documentFragment.append(listItem);
  });

  dropdown.append(documentFragment);
}

function showCities(evt, dropdown) {
  closeDropdown(dropdown);
  let inputValue = evt.target.value;

  if (/[а-яА-ЯЁё]$/.test(inputValue)) {
    const searchPattern = new RegExp(`^${inputValue}`, "i");

    const filteredCities = cities.filter(city => {
      return searchPattern.test(city.name);
    });

    if (filteredCities.length) {
      createCitiesList(filteredCities, dropdown);
    }
  }
}

function inputSelectedCity(evt, input, dropdown) {
  const target = evt.target;

  if (target.tagName === "LI") {
    input.value = target.textContent;
  }

  closeDropdown(dropdown);
}

function closeDropdown(dropdown) {
  dropdown.textContent = "";
}

departureInput.addEventListener("input", function(evt) {
  showCities(evt, departureDropdown);
});

destinationInput.addEventListener("input", function(evt) {
  showCities(evt, destinationDropdown);
});

departureDropdown.addEventListener("click", function(evt) {
  inputSelectedCity(evt, departureInput, departureDropdown);
});

destinationDropdown.addEventListener("click", function(evt) {
  inputSelectedCity(evt, destinationInput, destinationDropdown);
});

getData(METHOD, PROXY_URL + API_URL, removePopup);
