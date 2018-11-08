<template>
  <div>
    <v-chart 
      :forceFit="true" 
      :height="height" 
      :data="data" 
      :scale="scale" 
      :padding="padding" 
      :plotBackground="plotBackground"
    >
      <v-legend
        :useHtml="true"
        :flipPage="true"
        position="right"
        :title="{text:'图例可滚动'}"
        :legendMarker="legendMarker"
        :legendTitle="legendTitle"
      ></v-legend>
      <v-axis
        dataKey="count"
        :title="null"
        :line="null"
        :tickLine="{length:8}"
        subTickCount="10"
        :subTickLine="{
          lineWidth:1,
          stroke:'#ddd',
          length:5,
        }"
        :grid="null"
      ></v-axis>
      <v-tooltip
        :shared="false"
        :crosshairs="false"
      ></v-tooltip>
      <v-area
        position="year*count"
        :adjust="['stack','symmetric']"
        color="name"
        shape="smooth"
        opacity="1"
      ></v-area>
    </v-chart>
  </div>
</template>

<script>
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [
  {
    dataKey: 'year',
    tickInterval: 10,
    nice: false,
  },
  {
    dataKey: 'count',
    nice: false,
  },
];

export default {
  mounted() {
    $.getJSON('/assets/data/baby-names.json', data => {
      var ds = new DataSet();
      var dv = ds
        .createView('demo')
        .source(data)
        .transform({
          type: 'fill-rows',
          groupBy: ['name'],
          orderBy: ['year'],
        })
        .transform({
          type: 'impute',
          field: 'n',
          method: 'value',
          value: 0,
        })
        .transform({
          type: 'aggregate',
          fields: ['n'],
          operations: ['sum'],
          groupBy: ['year', 'name'],
          orderBy: ['year'],
          as: ['count'],
        });
      this.$data.data=dv;
    });
  },
  data() {
    return {
      data: [],
      scale,
      height: 400,
      padding:[20, 180, 50, 50],
      plotBackground:{
        stroke: '#ccc',
      },
      legendMarker:{ borderRadius: 'none' },
      legendTitle:{
        fontSize: '12px',
        fontWeight: 500,
        margin: 0,
        color: '#ff8800',
      },
    };
  },
};
</script>
