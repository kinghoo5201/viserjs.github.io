import { Chart, Tooltip, Axis, Point, Legend, Guide } from 'viser-react';
import * as React from 'react';
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


export default class App extends React.Component {
  render() {
    return (
      <Chart forceFit height={440} data={data} scale={scale} padding={[20, 20, 80, 50]}>
        <Tooltip />
        <Legend position="bottom"/>
        <Legend dataKey="_hStep" show={false}/>
        <Legend dataKey="_wStep" show={false}/>
        <Point
          shape="square"
          position="x*y"
          color="name"
          size={['_hStep', hStep => Math.min((340) * 0.4 * hStep, 15)]}
        />
      </Chart>
    );
  }
}
