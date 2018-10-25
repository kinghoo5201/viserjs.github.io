<template>
  <div>
    <v-chart forceFit height="400" :data="data" :scale="scale">
      <v-legend />
      <v-tooltip
        :crosshairs="{
          type: 'line',
        }"
        :useHtml="false"
      />
      <v-stack-area position="year*value" color="country" />
      <v-stack-line position="year*value" color="country" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');

const scale = [
  {
    dataKey: 'data',
    tickCount: 10
  },
  {
    dataKey: 'minTemp',
    max: 30,
    min: 0
  },
  {
    dataKey: 'maxTemp',
    max: 30,
    min: 0
  },
];

const htmlContent = (title, items) => {
  var data = items[0].point._origin;
  var titleDom = '<div class ="custom-tooltip-title">' + data.data + '</div>';
  var tempDom = '<div class = "custom-tooltip-value">' + '<div class = "custom-tooltip-temp"><span>低温</span>' + data.minTemp + '</div>' + '<div class = "custom-tooltip-temp"><span>高温</span>' + data.maxTemp + '</div>' + '</div>';
  var windDom = '<div class = "custom-tooltip-wind">风向:' + data.windDir + ',  风速:' + data.windSpeed + '</div>';
  var domClass = void 0;
  if (data.rain === true) {
    domClass = ' rain';
  } else if (data.sunny === true) {
    domClass = ' sun';
  } else {
    domClass = ' cloud';
  }
  return '<div class="custom-tooltip' + domClass + '">' + titleDom + tempDom + windDom + '</div>';
}

export default {
  mounted() {
    $.getJSON('/assets/data/top2000.json', data => {
      var ds = new DataSet();
      var dv = ds
        .createView('test')
        .source(data)
        .transform({
          as: ['count'],
          groupBy: ['release'],
          operations: ['count'],
          type: 'aggregate',
        });
      this.$data.data = dv.rows;
    });
  },
  data() {
    return {
      data: [],
      scale,
      height: 400,
    };
  },
};
</script>
