import { Chart, Interval, Point, Tooltip, Axis } from 'viser-react';
import * as React from 'react';

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

export default class App extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
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
      this.setState({
        data: dv.rows,
      });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Chart forceFit height={400} width={400} data={data} scale={scale}>
          <Tooltip type="mini" />
          <Axis
            dataKey="count"
            label={{
              offset: [-10, 10],
            }}
          />
          <Interval position="release*count" color={'#1890ff'} opacity={0.96} />
        </Chart>
      </div>
    );
  }
}
