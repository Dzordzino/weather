<template>
    <div :style="display">
        <div>lista</div>
        <Today :firstDayData.sync="firstDayData" />
        <SingleDay :singleDayData.sync="singleDayData" :firstDayData.sync="firstDayData" />
    </div>
</template>

<script>
    import SingleDay from './SingleDay.vue';
    import Today from './Today.vue';


    export default {
        name: 'FiveDays',
        components: {
            SingleDay,
            Today
        },
        props: { 
            fiveDaysData: {
                type: Array,
                required: true 
            }
        },
        watch: { 
            fiveDaysData: function() {
                let date = new Date(),
                    year = date.getFullYear(),
                    mounth = date.getMonth() + 1,
                    day = date.getDate(),
                    today = `${year}-${mounth > 9 ? mounth : "0" + mounth}-${day > 9 ? day : "0" + day}`,
                    firstDay = today,
                    singleDayArray = [],
                    firstDayArray = [];

                if (this.fiveDaysData.length) {
                    this.fiveDaysData.forEach(item => {
                        let currentDate = item["dt_txt"].split(" ")[0];
                        if (firstDay !== currentDate) {
                            singleDayArray.push(item);
                            if (currentDate && today !== currentDate) {
                                today = currentDate;
                                this.singleDayData.push(singleDayArray);
                                singleDayArray = []
                            }
                        } else {
                            firstDayArray.push(item);
                        }
                    })
                    firstDayArray.push(this.fiveDaysData[firstDayArray.length]);
                    this.firstDayData = firstDayArray;
                }
                this.display = {};
            }
        },
        data() {
            return {
                display: {
                    display: 'none'
                },
                singleDayData: [],
                firstDayData: []
            }
        }
    }
</script>