import axios from 'axios';
import store from '../store/index';

async function getWeatherData() {
    let lat = store.getters["weather/getLatitude"],
        long = store.getters["weather/getLongitude"],
        searchByPosition = store.getters["weather/getSearchType"],
        searchText = store.getters["weather/getSearchText"],
        weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast',
        parameters = {
            appid: '72c9a867642e013110865ea6df567324',
            units: 'metric',
        };

    if (searchByPosition) {
        parameters.lat = lat;
        parameters.lon = long;
    } else if (typeof searchText !== 'undefined' && searchText){
        parameters.q = searchText 
    }

    return await axios.get(weatherUrl, { params: parameters })
    .then(response => {
        return response.data
    })
    .catch(error => {
        if (error) {
            console.log(error);
        }
    });
}

async function getPollutionData() {
    let lat = store.getters["weather/getLatitude"],
        long = store.getters["weather/getLongitude"];

    if (lat && long) {
        return await axios.get('http://api.airvisual.com/v2/nearest_city', {
            params: {
                lat: lat,
                lon: long,
                key: '554b1316-ef1a-4f7f-9443-814bc1c2aefc'
            }
        })
        .then(response => {
            let data = response.data;

            if (data && data.data && data.data.current && data.data.current.pollution && data.data.current.pollution.aqicn) {
                return data.data.current.pollution.aqicn;
            }
        })
        .catch(error => {
            if (error) {
                console.log(error);
            }
        });
    }
}

export default { getWeatherData, getPollutionData };
