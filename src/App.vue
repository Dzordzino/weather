<template>
    <div>
        <h1>Hello</h1>
        <SearchBar />
    </div>
</template>

<script>
    import SearchBar from './components/SearchBar.vue'
    import { mapActions } from 'vuex';
    import './main.scss';
    
    export default {
        name: 'App',
        created() {
            navigator.geolocation.getCurrentPosition(this.setUpData);
        },
        methods: {
            ...mapActions('weather', [
                'getPollutionData',
                'getWeatherData',
                'setLatitude',
                'setLongitude'
            ]),
            setUpData: function(position) {
                this.setLatitude(position.coords.latitude);
                this.setLongitude(position.coords.longitude);
                this.getWeatherData();
                this.getPollutionData();
            },
        },
        components: {
            SearchBar
        }
    }
</script>

