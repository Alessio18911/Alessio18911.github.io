const CITIES = ["Минск", "Москва", "Санкт-Петербург", "Рим", "Ламеция-Терме", "Милан", "Дублин", "Бургас", "Ставрополь", "Воронеж", "Вильнюс", "Палермо", "Франкфурт-на-Майне"];

const form = document.querySelector(".form-search");
const departureInput = form.querySelector(".input__cities-from");
const departureDropdown = form.querySelector(".dropdown__cities-from");
const destinationInput = form.querySelector(".input__cities-to");
const destinationDropdown = form.querySelector(".dropdown__cities-to");

function createCitiesList(filteredCities, dropdown) {
  const documentFragment = document.createDocumentFragment();

  filteredCities.forEach(city => {
    const listItem = document.createElement("li");
    listItem.textContent = city;
    documentFragment.append(listItem);
  });

  dropdown.append(documentFragment);
}

function showCities(evt, dropdown) {
  closeDropdown(dropdown);
  let inputValue = evt.target.value;

  if (/[а-яА-ЯЁё]$/.test(inputValue)) {
    const searchPattern = new RegExp(`^${inputValue}`, "i");

    const filteredCities = CITIES.filter(city => {
      return searchPattern.test(city);
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
  dropdown.textContent = '';
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
