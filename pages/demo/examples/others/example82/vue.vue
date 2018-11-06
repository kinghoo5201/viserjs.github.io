<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
      <v-tooltip/>
      <v-legend position="bottom"/>
      <v-legend dataKey="_hStep" :show="legendShow"/>
      <v-legend dataKey="_wStep" :show="legendShow"/>
      <v-point
        shape="square"
        position="x*y"
        color="name"
        :size="pointSize"
      />
    </v-chart>
  </div>
</template>

<script>
  const DataSet = require('@antv/data-set');

  const sourceData = [{
  "name": "type 1",
  "value": 102
}, {
  "name": "type 2",
  "value": 65
}, {
  "name": "type 3",
  "value": 43
}, {
  "name": "type 4",
  "value": 12
}];

  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'waffle',
    maxCount: 500,
    rows: 12
  });
  const data = dv.rows;

  const scale = [
    { dataKey: 'x', nice: false },
    { dataKey: 'y', nice: false },
  ];

  export default {
    data() {
      return {
        data,
        scale,
        height: 440,
        padding: [20, 20, 80, 50],

        legendShow: false,
        pointSize: ['_hStep', hStep => Math.min((340) * 0.4 * hStep, 15)],
      };
    }
  };
</script>