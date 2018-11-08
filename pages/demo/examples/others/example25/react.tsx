import { Chart, Axis, Guide, Tooltip, StackBar, Coord } from 'viser-react';
import * as React from 'react';
import * as _ from 'lodash';
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

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={dv} scale={scale} padding={[20,80,40,60]}>
          <Tooltip />
          <Axis />
          <Coord type="rect" direction="LB"/>
          <StackBar position="year*percent" color={['key', value => colorSet[value]]} />
          {
            originalData.slice(1).map(function(data, dataIndex) {
              return (
                measureKeys.map(function(key, keyIndex) {
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
                  const guideKey = Number(dataIndex.toString() + keyIndex.toString())
                  return (
                    <Guide
                      key={guideKey}
                      type="line"
                      top={true}
                      start={[startPoint.x, startPoint.y]}
                      end={[endPoint.x, endPoint.y]}
                      lineStyle={{
                        stroke: colorSet[key]
                      }}
                      text={{
                        position: 'center',
                        autoRotate: false,
                        offsetY: 0,
                        // style: {
                        //   fill: color
                        // },
                        content: '' + symbol + (Math.abs(percent) * 100).toFixed(2) + '%'
                      }}
                    />
                  );
                })
              )
            })
          }
        </Chart>
      </div>
    );
  }
}


