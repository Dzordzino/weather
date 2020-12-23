<template>
    <div>
        <input type="text" :placeholder="getPlaceholderText" @keyup="inputChanged" v-model="inputValue">
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "SearchBar",

        data() {
            return {
                inputValue: "",
                timer: '',
            }
        },
        computed: {
            ...mapGetters('weather', ['getPlaceholderText']),
        },
        methods: {
            ...mapActions('weather', [
                'setSearchType',
                'getWeatherData',
                'setSearchText'
            ]),
            inputChanged: function() {
                if (this.inputValue) {
                    this.delay(function(){
                    this.setSearchType(false);
                    this.setSearchText(this.inputValue);
                    this.getWeatherData();
                    }, 500, this);
                }
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
