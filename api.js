const api = (() => {

const API_URL = "http://api.travelpayouts.com/data/ru/cities.json";
const DIRECT_TICKET_URL =
    "http://api.travelpayouts.com/v1/prices/direct?origin=MOW&destination=LED&depart_date=2017-11&return_date=2017-12&token=";
const API_KEY = "efddf8e209d90edc9b0ef6ff1ecdff8a";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const METHOD = "GET";
const SUCCESS_CODE = 200;

const getData = ({
  method,
  url
}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("load", () => {
      if (xhr.status === SUCCESS_CODE) {
        try {
          const data = JSON.parse(xhr.response);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Failed to load cities'));
      }
    });

    xhr.send();
  })
}

const getCities = () =>
    getData({
        method: METHOD,
        url: PROXY_URL + API_URL,
    })

return {
    getCities,
};

})();
