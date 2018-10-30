<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip type="mini"></v-tooltip>
      <v-axis
        dataKey="count"
        :label="{
          offset:[-10,10]
        }"
      ></v-axis>
      <v-interval 
        position="release*count"
        color="#1890ff"
        :opacity="0.96"
      ></v-interval>
    </v-chart>
  </div>
</template>

<script>
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [
  {
    dataKey: 'count',
    alias: 'top2000 唱片总量',
  },
  {
    dataKey: 'release',
    tickInterval: 5,
    alias: '唱片发行年份',
  },
];

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
