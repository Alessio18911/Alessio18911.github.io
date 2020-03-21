const initialState = {
  isLoading: false,
  cities: [],
  tickets: [],
  departureCity: '',
  destinationCity: '',
  departureDate: '',
};

const stateMachine = new StateMachine(initialState);

const popup = document.querySelector(".popup");
const form = document.querySelector(".form-search");
const departureInput = form.querySelector(".input__cities-from");
const departureDropdown = form.querySelector(".dropdown__cities-from");
const departureDate = form.querySelector('#form-departure-date');
const destinationInput = form.querySelector(".input__cities-to");
const destinationDropdown = form.querySelector(".dropdown__cities-to");

function createCitiesList(filteredCities, dropdown) {
  const documentFragment = document.createDocumentFragment();

  filteredCities.forEach(city => {
    const listItem = document.createElement("li");
    listItem.textContent = city.name;
    documentFragment.append(listItem);
  });

  dropdown.append(documentFragment);
}

const getCitiesList = (inputValue) => {
  if (/[а-яА-ЯЁё]$/.test(inputValue)) {
    const searchPattern = new RegExp(`^${inputValue}`, "i");

    return stateMachine.getState().cities.filter(city => {
      return searchPattern.test(city.name);
    }) || [];
  }

  return [];
}

function closeDropdown(dropdown) {
  dropdown.textContent = "";
}

departureInput.addEventListener("input", function(evt) {
  const departureCity = evt.target.value;
  const filteredCities = getCitiesList(departureCity);

  stateMachine.setState({
    departureCity,
  });

  closeDropdown(departureDropdown);
  createCitiesList(filteredCities, departureDropdown);
});

destinationInput.addEventListener("input", function(evt) {
  const destinationCity = evt.target.value;
  const filteredCities = getCitiesList(destinationCity);

  stateMachine.setState({
    destinationCity,
  });

  closeDropdown(destinationDropdown);
  createCitiesList(filteredCities, destinationDropdown);
});

departureDropdown.addEventListener("click", function(evt) {
  if (evt.target.tagName === "LI") {
    const departureCity = evt.target.textContent;
    stateMachine.setState({
      departureCity,
    });
  }
  closeDropdown(departureDropdown);
});

destinationDropdown.addEventListener("click", function(evt) {
  if (evt.target.tagName === "LI") {
    const destinationCity = evt.target.textContent;
    stateMachine.setState({
      destinationCity,
    });
  }

  closeDropdown(destinationDropdown);
});

departureDate.addEventListener('change', (event) => {
  stateMachine.setState({
    departureDate: event.target.value,
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  stateMachine.setState({
    isLoading: true,
  });

  // emulate xhr request
  setTimeout(() => {
    stateMachine.setState({
      isLoading: false,
    });
  }, 500);
});

const handleLoadingState = (state) => {
  if (state.isLoading) {
    loader.classList.remove('hidden');
    window['form-wrapper'].classList.add('hidden');
  } else {
    loader.classList.add('hidden');
    window['form-wrapper'].classList.remove('hidden');
  }
}

const handleDepartureCityChange = state => {
  departureInput.value = state.departureCity;
}

const handleDestinationCityChange = state => {
  destinationInput.value = state.destinationCity;
}

stateMachine.subscribe(handleLoadingState);
stateMachine.subscribe(handleDepartureCityChange);
stateMachine.subscribe(handleDestinationCityChange);

api.getCities().then(cities => {
  stateMachine.setState({
    cities,
    isLoading: false,
  });
});
