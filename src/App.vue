<template>
    <WeatherLayout />
</template>

<script>
    import WeatherLayout from './components/WeatherLayout.vue'
    import { mapActions } from 'vuex';
    import './main.scss';
    
    export default {
        name: 'App',
        created() {
            navigator.geolocation.getCurrentPosition(this.setUpData);
        },
        methods: {
            ...mapActions('weather', [
                'getWeatherData',
                'setLatitude',
                'setLongitude'
            ]),
            setUpData: function(position) {
                this.setLatitude(position.coords.latitude);
                this.setLongitude(position.coords.longitude);
                this.getWeatherData();
            },
        },
        components: {
            WeatherLayout
        }
    }
</script>

