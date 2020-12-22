<template>
    <div>
        <div id="upcomingDays"></div>
        <Graph :firstDayData="firstDayData"/>
    </div>
</template>

<script>
    import Graph from './Graph.vue';
    export default {
        name: 'SingleDay',
        components: {
            Graph
        },
        props: { 
            singleDayData: {
                type: Array,
                required: true 
            },
            firstDayData: {
                type: Array,
                required: true 
            }
        },
        watch: { 
            singleDayData: function() {
                let daysHolder = document.getElementById("upcomingDays");

                this.singleDayData.forEach(item => {
                    let listElement = document.createElement("UL"),
                        slingleList = "";

                    slingleList = item.map(list=> `<li>${list["main"]["temp"]}</li>`);
                    listElement.innerHTML = slingleList.join("");
                    daysHolder.appendChild(listElement);
                });
            }
        }
    }
</script>