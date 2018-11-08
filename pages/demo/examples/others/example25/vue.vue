<template>
  <div>
    <v-chart force-fit="true" :height="height" :padding="padding" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-coord type="rect" direction="LB"/>
      <v-stack-bar position="year*percent" :color="color" /> 
      <v-guide
        v-for="(guideData, index) in guideDatas"
        :key="index"
        type="line"
        :top="true"
        :start="[guideData.startPoint.x, guideData.startPoint.y]"
        :end="[guideData.endPoint.x, guideData.endPoint.y]"
        :lineStyle="{
          stroke: colorSet[guideData.key]
        }"
        :text="{
          position: 'center',
          autoRotate: false,
          offsetY: 0,
          style: {
            fill: guideData.color
          },
          content: '' + guideData.symbol + (Math.abs(guideData.percent) * 100).toFixed(2) + '%'
        }"
      />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');
const measureKeys = ['Europe', 'Asia', 'Africa'];
let originalData = [{
  year: '1750',
  Europe: 20,
  Asia: 30,
  Africa: 50
}, {
  year: '1800',
  Europe: 30,
  Asia: 40,
  Africa: 30
}, {
  year: '1850',
  Europe: 50,
  Asia: 20,
  Africa: 30
}];
const colorSet = {
  Europe: '#4FAAEB',
  Asia: '#9AD681',
  Africa: '#FED46B'
};
const totalValues = originalData.map(function(data) {
  return measureKeys.map(function(key) {
    return data[key];
  }).reduce(function(a, b) {
    return a + b;
  }, 0);
});

// 计算每个柱子的占比
const ds = new DataSet();
const dv = ds.createView().source(originalData).transform({
  type: 'fold',
  fields: measureKeys,
  key: 'key',
  value: 'value'
}).transform({
  type: 'percent',
  field: 'value',
  dimension: 'key',
  groupBy: ['year'],
  as: 'percent'
});

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: function formatter(val) {
    return (val * 100).toFixed(2) + '%';
  }
}];

const transposeCoord = true;

let guideDatas = [];
originalData.slice(1).forEach(function(data, dataIndex) {
  measureKeys.forEach(function(key, keyIndex) {
    let guideData = {};
    const sliceArgs = transposeCoord ? [0, keyIndex + 1] : [keyIndex, measureKeys.length];
    const getY = function getY(dataIndex) {
      return measureKeys.slice.apply(measureKeys, sliceArgs).map(function(key) {
        return originalData[dataIndex][key];
      }).reduce(function(a, b) {
        return a + b;
      }, 0) / totalValues[dataIndex];
    };
    const startPoint = {
      x: dataIndex + 0.25,
      y: getY(dataIndex)
    };
    const endPoint = {
      x: dataIndex + 0.75,
      y: getY(dataIndex + 1)
    };
    const percent = (originalData[dataIndex + 1][key] - originalData[dataIndex][key]) / totalValues[dataIndex];
    const symbol = percent === 0 ? '' : percent > 0 ? '+' : '-';
    const color = percent === 0 ? '#000' : percent > 0 ? 'red' : 'green';
    guideData = {
      startPoint,
      endPoint,
      percent,
      key,
      color,
      symbol
    }
    guideDatas.push(guideData);
  })
});

export default {
  data() {
    return {
      data: dv,
      guideDatas,
      colorSet,
      height: 400,
      scale,
      padding: [20,80,40,60],
      color: ['key', value => colorSet[value]]
    };
  }
};
</script>
