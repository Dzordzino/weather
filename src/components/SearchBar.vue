<template>
    <div>
        <input type="text" :placeholder="placoholderValue" @keyup="inputChanged" v-model="inputValue">
        <FiveDays :fiveDaysData.sync="fiveDaysData" />
    </div>
</template>

<script>
    import axios from "axios";
    import FiveDays from './FiveDays.vue';

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
                fiveDaysData: []
            }
        },
        created() {
            navigator.geolocation.getCurrentPosition(this.success);
        },
        methods: {
            success: function(position) {
                this.lat=position.coords.latitude;
                this.long=position.coords.longitude;
                this.getByPosition = true;
                this.timer = '';
                this.getData();
            },
            inputChanged: function() {
                this.delay(function(){
                    this.getByPosition = false;
                    this.getData();
                }, 500, this);
            },
            delay: function(func, time, that){
                return (
                    clearTimeout(this.timer),
                    this.timer = setTimeout(func.bind(that), time)
                )
            },
            getData: function() {
                let key = "72c9a867642e013110865ea6df567324",
                    weatherUrl = "http://api.openweathermap.org/data/2.5/forecast",
                    dataUrl = "";
                    // iconUrl = "http://openweathermap.org/img/w/04n.png";
                if (this.getByPosition) {
                    dataUrl = `${weatherUrl}?lat=${this.lat}&lon=${this.long}&units=metric&appid=${key}`;
                } else {
                    dataUrl = `${weatherUrl}?q=${this.inputValue}&units=metric&appid=${key}`;
                }

                axios.get(dataUrl)
                .then(response => {
                    let data = response.data;
                    this.fiveDaysData = data.list;
                    console.log(data);
                    if (data.city && data.city.name) {
                        this.placoholderValue = data.city.name;
                    }
                })
                .catch(error => {
                    if (error) {
                        console.log('Invalid city name');
                    }
                });
            }
        }
    }
</script>
