<template>
    <ul class="allDays">
        <SingleDay
            v-for="singleDay in nextFiveDaysData"
            :key="singleDay[0].dt"
            :singleDayData="singleDay"
        />
    </ul>
</template>

<script>
    import SingleDay from './SingleDay.vue';

    export default {
        name: 'NextFiveDays',
        props: { 
            nextFiveDaysData: {
                type: Array,
                required: true 
            }
        },
        components: {
            SingleDay,
        },
    }
</script>

<style scoped lang="scss">
    .allDays {
        position: relative;
        padding: 0;
        list-style: none;
    }
</style>