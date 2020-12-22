<template>
    <div>
        <ul id="today"></ul>
        <Graph :firstDayData="firstDayData"/>
    </div>
</template>

<script>
    import Graph from './Graph.vue';
    export default {
        name: 'Today',
        components: {
            Graph
        },
        props: { 
            firstDayData: {
                type: Array,
                required: true 
            }
        },
        watch: { 
            firstDayData: function() {
                let today = document.getElementById("today"),
                    tadayData = "";

                tadayData = this.firstDayData.map(item => `<li>${item["main"]["temp"]}</li>`);
                today.innerHTML = tadayData.join("");
            }
        }
    }
</script>