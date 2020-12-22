import { api } from '../../utils';

const { getPollutionData, getWeatherData } = api;

const state = {
    lat: '',
    long: '',
    searchByPosition: true,
    weather: {
        temp:''
    },
    pollution: '',
    searchText: ''
};

const getters = {
    getWeatherData(state) {
        return state.weather;
    },
    getPollutionValue(state) {
        console.log('ulazi1')
        return state.pollution;
    },
    getLatitude(state) {
        return state.lat;
    },
    getLongitude(state) {
        return state.long;
    },
    getSearchType(state) {
        return state.searchByPosition;
    },
    getSearchText(state) {
        return state.searchText;
    },
};

const mutations = {
    setLatitude(state, lat) {
        state.lat = lat;
    },
    setLongitude(state, long) {
        state.long = long;
    },
    setWeatherData(state, weather) {
        state.weather = weather;
    },
    setPollutionValue(state, pollution) {
        state.pollution = pollution;
    },
    setSearchType(state, searchByPosition) {
        state.searchByPosition = searchByPosition;
    },
    setSearchText(state, searchText) {
        state.searchText = searchText;
    },
};

const actions = {
    setLatitude({ commit }, lat) {
        commit('setLatitude', lat);
    },
    setLongitude({ commit }, long) {
        commit('setLongitude', long);
    },
    setSearchType({ commit }, searchByPosition) {
        commit('setSearchType', searchByPosition);
    },
    setSearchText({ commit }, searchText) {
        commit('setSearchText', searchText);
    },
    async getWeatherData({ commit, dispatch }) {
        let weatherData = '';
        weatherData = await getWeatherData();

        commit('setLatitude', weatherData.city.coord.lat);
        commit('setLongitude', weatherData.city.coord.lon);

        dispatch('getPollutionData');

        if (typeof weatherData !== 'undefined') {
            commit('setWeatherData', weatherData);
        }
    },

    async getPollutionData({ commit }) {
        let pollution = '';

        pollution = await getPollutionData();

        if (typeof pollution !== 'undefined') {
            commit('setPollutionValue', pollution);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};