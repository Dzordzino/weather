<template>
    <div>
        <div class="successHolder" v-if="getStatus === 'success'">
            <SearchBar />
            <p>{{getPollutionValue}}</p>
            <Graph :firstDayData.sync="getFirstDayArray"/>
            <NextFiveDays :nextFiveDaysData.sync="getFiveDaysArray" />
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

