import { Chart, Axis, Interval, Tooltip } from 'viser-react';
import * as React from 'react';
import * as _ from 'lodash';

const data = [{
  name: '类别一',
  value: 150,
  error: 6,
  range: []
}, {
  name: '类别二',
  value: 120,
  error: 10,
  range: []
}, {
  name: '类别三',
  value: 170,
  error: 5,
  range: []
}, {
  name: '类别四',
  value: 170,
  error: 5,
  range: []
}];

data.forEach(function(obj) {
  obj.range = [obj.value - obj.error, obj.value + obj.error];
});

const scale = [{
  dataKey: 'value',
  min: 0,
  max: 200
},{
  dataKey: 'range',
  min: 0,
  max: 200
}];

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={data} scale={scale} padding={[20,40,40,40]}>
          <Tooltip />
          <Axis />
          <Interval position="name*value" color="name" opacity={0.7}/>
          <Interval position="name*range" color="name" size={40} shape="tick"/>
        </Chart>
      </div>
    );
  }
}


