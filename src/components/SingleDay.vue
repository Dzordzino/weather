<template>
    <div>
        <div>Single</div>
    </div>
</template>

<script>
    export default {
        name: 'FiveDays',
        props: { 
            singleDayData: {
                type: Array,
                required: true 
            }
        },
        watch: { 
            singleDayData: function() {
               console.log(this.singleDayData);
            }
        },
        data() {
            return {

            }
        }
    }
</script>