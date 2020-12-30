<template>
    <div>
        <div class="successHolder" v-if="getStatus === 'success'">
            <div class="weatherData">
                <SearchBar />
                <p>{{getPollutionValue}}</p>
                <Graph :firstDayData.sync="getFirstDayArray"/>
                <NextFiveDays :nextFiveDaysData.sync="getFiveDaysArray" />
            </div>
        </div>
        <div class="errorHolder" v-if="getStatus === 'error'">
            <p>Error</p>
        </div>
        <div class="pendingHolder" v-if="getStatus === 'pending'">
            <p>Loader</p>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SearchBar from './SearchBar.vue'
    import NextFiveDays from './NextFiveDays.vue';
    import Graph from './Graph.vue';

    export default {
        name: 'WeatherLayout',
        computed: {
            ...mapGetters('weather', [
                'getPollutionValue', 
                'getStatus', 
                'getFirstDayArray',
                'getFiveDaysArray'
            ]),
        },
        components: {
            SearchBar,
            NextFiveDays,
            Graph
        }
    }
</script>

<style scoped lang="scss">
    .successHolder {
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .weatherData {
        width: 100%;
        min-width: 320px;
        max-width: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

