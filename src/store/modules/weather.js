import { api } from '../../utils';

const { getPollutionData, getWeatherData } = api;

const state = {
    lat: '',
    long: '',
    searchByPosition: true,
    weather: {},
    pollution: '',
    searchText: '',
    status: 'pending',
    placeholder: 'Place name',
    fiveDaysData: [],
    fiveDaysArray: [],
    firstDayArray: [],
};

const getters = {
    getWeatherData(state) {
        return state.weather;
    },
    getPollutionValue(state) {
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
    getPlaceholderText(state) {
        return state.placeholder;
    },
    getStatus(state) {
        return state.status;
    },
    getFiveDays(state) {
        return state.fiveDaysData;
    },
    getFiveDaysArray(state) {
        return state.fiveDaysArray;
    },
    getFirstDayArray(state) {
        return state.firstDayArray;
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
    setStatus(state, status) {
        state.status = status;
    },
    setPlaceholder(state, placeholder) {
        state.placeholder = placeholder;
    },
    setFiveDays(state, fiveDaysData) {
        state.fiveDaysData = fiveDaysData;
    },
    setFiveDaysArray(state, fiveDaysArray) {
        state.fiveDaysArray = fiveDaysArray;
    },
    setFirstDayArray(state, firstDayArray) {
        state.firstDayArray = firstDayArray;
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
    renderData: function({ commit }) {
        let firstDay = new Date().toJSON().slice(0,10),
            fiveDaysArray = [],
            firstDayArray = [],
            firstMidnightAdded = false,
            itemNumber = 0,
            arrayNumber = 0,
            incrementNumber = 8,
            fiveDaysData = state.fiveDaysData;

        if (fiveDaysData.length) {
            fiveDaysData.forEach((item, i) => {
                let currentDate = item["dt_txt"].split(" ")[0];
                if (firstDay !== currentDate) {

                    if ( itemNumber - 1 + i > itemNumber + incrementNumber) {
                        incrementNumber = incrementNumber + 8;
                        arrayNumber ++;
                    }

                    if (!firstMidnightAdded) {
                        firstDayArray.push(item);
                        firstMidnightAdded = true;
                    }

                    if (typeof fiveDaysArray[arrayNumber] === 'undefined') {
                        fiveDaysArray[arrayNumber] = []
                    }

                    fiveDaysArray[arrayNumber].push(item);
                } else {
                    itemNumber = i - 1 ;
                    firstDayArray.push(item);
                }
            })

            commit('setFiveDaysArray', fiveDaysArray);
            commit('setFirstDayArray', firstDayArray);
        }
    },
    async getWeatherData({ commit, dispatch }) {
        let weatherData = '';

        commit('setStatus', 'pending');
        weatherData = await getWeatherData();

        if (typeof weatherData !== 'undefined') {
            commit('setWeatherData', weatherData);

            if (weatherData.city && weatherData.city.coord && weatherData.city.coord.lat && weatherData.city.coord.lon) {
                commit('setLatitude', weatherData.city.coord.lat);
                commit('setLongitude', weatherData.city.coord.lon);
            }

            if (weatherData.city && weatherData.city.name) {
                commit('setPlaceholder', weatherData.city.name);
            }

            if (weatherData.list) {
                commit('setFiveDays', weatherData.list);
            }
            dispatch('renderData');
            dispatch('getPollutionData');
        } else {
            commit('setStatus', 'error');
        }
    },

    async getPollutionData({ commit }) {
        let pollution = '';

        pollution = await getPollutionData();

        if (typeof pollution !== 'undefined') {
            commit('setPollutionValue', pollution);
            commit('setStatus', 'success');
        } else {
            commit('setStatus', 'error');
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