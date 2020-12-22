<template>
    <div>
        <input type="text" :placeholder="placoholderValue" @keyup="inputChanged" v-model="inputValue">
        <FiveDays :fiveDaysData.sync="fiveDaysData" />
    </div>
</template>

<script>
    import FiveDays from './FiveDays.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "SearchBar",
        components: {
            FiveDays
        },
        data() {
            return {
                lat: "",
                long: "",
                inputValue: "",
                placoholderValue: "Place name",
                getByPosition: false,
                fiveDaysData: [],
                timer: '',
            }
        },
        methods: {
            ...mapGetters('weather', [
                'getPollutionValue'
            ]),
            ...mapActions('weather', [
                'setSearchType',
                'getWeatherData',
                'setSearchText'
            ]),
            inputChanged: function() {
                this.delay(function(){
                    this.setSearchType(false);
                    this.setSearchText(this.inputValue);
                    this.getWeatherData();
                    console.log(this.getPollutionValue())
                }, 500, this);
            },
            delay: function(func, time, that){
                return (
                    clearTimeout(this.timer),
                    this.timer = setTimeout(func.bind(that), time)
                )
            },
        }
    }
</script>
