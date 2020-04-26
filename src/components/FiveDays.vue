<template>
    <div :style="display">
        <div>lista</div>
        <SingleDay :singleDayData.sync="singleDayData" />
    </div>
</template>

<script>
    import SingleDay from './SingleDay.vue';

    export default {
        name: 'FiveDays',
        components: {
            SingleDay
        },
        props: { 
            fiveDaysData: {
                type: Array,
                required: true 
            }
        },
        watch: { 
            fiveDaysData: function() {
                console.log(this.fiveDaysData);
                let date = new Date(),
                    dateFormat = `${date.getFullYear()}-${date.getMonth() > 9 ? "" : 0}${date.getMonth()+1}-${date.getDate()}`;

                if(this.fiveDaysData.length) {
                    this.singleDayData = this.fiveDaysData.filter(item => item["dt_txt"].split(" ")[0] === dateFormat);
                }
                this.display = {};
            }
        },
        data() {
            return {
                display: {
                    display: 'none'
                },
                singleDayData: []
            }
        }
    }
</script>