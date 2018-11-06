<template>
  <div v-if="data.length">
    <v-chart :force-fit="true" :height="400" :padding="[ 40, 40, 40, 80 ]">
      <v-tooltip/>
      <v-axis dataKey="rain" :grid="null"/>
      <v-axis dataKey="flow" :title="titleStyle"/>
      <v-view :data="dv" :scale="scale">
        <v-area position="time*flow" color="l(100) 0:#a50f15 1:#fee5d9" :opacity="0.85" />
      </v-view>
      <v-view :data="dv" :scale="scale">
        <v-coord type="rect" direction="TL"/>
        <v-axis dataKey="rain" position="right" />
        <v-area position="time*rain" color="l(100) 0:#293c55 1:#f7f7f7" :opacity="0.85" />
      </v-view>
    </v-chart>
    <v-plugin>
      <v-slider width="auto" :height="26"
        :start="start" :end="end"
        :data="dv" xAxis="time" yAxis="flow" 
        :scales="{
          time: {
            type: 'time',
            tickCount: 10,
            mask: 'M/DD H:mm'
          }
        }"
        :background-chart="{
          type: 'line'
        }"
       :on-change="slideChange" />
    </v-plugin>
  </div>
</template>

<script>

import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

export default {
  mounted() {
    $.getJSON('/assets/data/rain-flow.json', (data) => {
      const ds = new DataSet({
      state: {
        start,
        end,
      }
    });
      const scale = [{
          dataKey: 'time',
          type: 'time',
          tickCount: 8,
          mask: 'm/dd hh:MM'
        },
        {
          dataKey: 'flow',
          alias: '流量(m^3/s)'
        },
        {
          dataKey: 'rain',
          alias: '降雨量(mm)'
      }];
      const start =  new Date('2009/7/20 0:00').getTime();
      const end =  new Date('2009/9/9 0:00').getTime();
      this.$data.data = data;
      this.$data.ds = ds;
      this.$data.scale = scale;
      this.$data.start = start;
      this.$data.end = end;
      this.$data.dv = this.getDv();
    });
  },
  methods: {
    getDv() {
      const { start, end, data, ds } = this;
      const dv = ds.createView();
      dv.source(data).transform({
          type: 'filter',
          callback: obj => {
            const time = new Date(obj.time).getTime(); 
            return time >= start && time <= end;
          }
        });
      return dv;
    },
    slideChange (opts) {
      let startValue = opts.startValue,
          endValue = opts.endValue;
      this.start = startValue;
      this.end = endValue;
      this.dv = this.getDv();
    },
  },
  data() {
    return {
      data: [],
      ds: {},
      scale: [],
      dv: {},
      start: 0,
      end: 0,
      titleStyle:{
        autoRotate: true
      }
    };
  },
};

</script>
