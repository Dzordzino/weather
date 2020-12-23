<template>
    <li :class="[
            { 'singleDay--expanded': expanded },
            'singleDay',
        ]"
        @click= displaySingleDay
    >
        <!-- <Graph :firstDayData="firstDayData"/> -->
        {{max}},{{min}},{{average}}
    </li>
</template>

<script>
    // import Graph from './Graph.vue';
    export default {
        name: 'SingleDay',
        data() {
            return {
                max: '',
                min: '',
                average:'',
                expanded: false
            }
        },
        components: {
            // Graph
        },
        props: { 
            singleDayData: {
                type: Array,
                required: true 
            }
        },
        mounted() {
            console.log(this.singleDayData);
            this.calculateTemperature();
        },
        methods: {
            calculateTemperature: function() {
                let hourTemperatureArray = '';

                hourTemperatureArray = this.singleDayData.map(item => item.main.temp);
                this.max = Math.round(Math.max(...hourTemperatureArray));
                this.min = Math.round(Math.min(...hourTemperatureArray));
                this.average = Math.round(hourTemperatureArray.reduce((a,b) => a + b, 0) / hourTemperatureArray.length);
            },
            displaySingleDay: function() {
                if (this.expanded) {
                    this.expanded = false;
                } else {
                    this.expanded = true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .singleDay {
        display: inline-block;
        width: 20%;
        cursor: pointer;
        background: #fff;
        transition-duration: .5s;
        &--expanded {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>