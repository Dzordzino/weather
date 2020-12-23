<template>
    <div class="chart">
        <canvas></canvas>
    </div>
</template>

<script>

export default {
    name: 'Graph',
    props: { 
        firstDayData: {
            type: Array,
            required: true 
        }
    },
    data() {
        return {
            graphData: []
        }
    },
    mounted() {
        let todayData = ''
        todayData = this.firstDayData.map(item => {
            let tempData = {};

            tempData.name = item["main"]["temp"];
            tempData.value = item["main"]["temp"];
            tempData.color = '#6f7aff';
            return tempData;
        });
        this.graphData = todayData;
        this.renderGraphData();
    },
    methods: {
        renderGraphData: function() {
            let data = this.graphData;
            const canvas = document.querySelector('canvas');
            let ctx = canvas.getContext('2d');
            let height = 300;
            let width = 800;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            let scale = window.devicePixelRatio;
            canvas.width =  width * scale;
            canvas.height = height * scale;
            ctx.scale(scale, scale);

            let graphHeight = height - 100;

            let maxValue = Math.max.apply(Math, data.map(function(o) { return o.value; }));

            data.forEach(item => {
              item['height'] = (item.value / maxValue) * graphHeight
            })

            let boxes = data.length
            ctx.strokeStyle = "#eee";
            for(let i = 0; i < boxes; i++) {
              let x = Math.round(i*(width / boxes));

              // draw separation lines 
              ctx.beginPath();
              ctx.moveTo(x + 0.5, 0.5);
              ctx.lineTo(x + 0.5, height + 0.5);
              ctx.stroke();

              // draw item area 
              ctx.fillStyle = data[i].color;
              ctx.beginPath();
              ctx.moveTo(x, height - 50 - data[i].height);
              ctx.lineTo(x + (width / boxes) + 0.5, height - 50 - (data[i+1] ? data[i+1].height : data[i].height));
              ctx.lineTo(x + (width / boxes) + 0.5, height - 50);
              ctx.lineTo(x, height - 50);
              ctx.closePath();
              ctx.fill();

              // draw header
              ctx.font = "lighter 12px sans-serif";
              ctx.fillStyle = "#888888";
              ctx.fillText(data[i].name, x + 10, 20);

              ctx.font = "bolder 12px sans-serif";
              ctx.fillStyle = "#000";
              ctx.fillText(data[i].value, x + 10, 40);


              // draw footer
              
                ctx.font = "lighter 12px sans-serif";
                ctx.fillStyle = "#888888";
                ctx.fillText('Dropoff -', x + 10, height - 30);
              
            }
        }
    }
}
</script>