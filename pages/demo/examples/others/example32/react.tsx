import * as React from 'react';
import * as $ from 'jquery';
import { Axis, Chart, Tooltip, Legend, Polygon } from 'viser-react';
const DataSet = require('@antv/data-set');

export default class App extends React.Component {
  state = {
    data: [],
    ds: null,
  };
  getDv = () => {
    const { ds, data } = this.state;
    const dv = ds.createView();
    dv.source(data).transform({
      sizeByCount: true, 
      type: 'bin.hexagon',
      fields: ['x', 'y'], 
      bins: [10, 5]
    });
    return dv;
  };
  componentDidMount() {
    $.getJSON('/assets/data/gaussion-distribution.json', data => {
      const ds = new DataSet();
      this.setState({ data, ds });
    });
  }
  render() {
    const { data } = this.state;
    if (!data.length) {
      return null;
    }
    const dv = this.getDv();
    return (
      <Chart
        container="mountNode"
        forceFit={true}
        height={400}
        data={dv}
      >
        <Tooltip showTitle={false} crosshairs={false}/>
        <Axis dataKey="x" grid={{
          lineStyle: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [2, 2]
          }
        }}/>
        <Legend offset={40}/>
        <Polygon position="x*y" color={['count', '#BAE7FF-#1890FF-#0050B3']} style={{
          lineWidth: 1,
          stroke: '#fff'
        }}/>
      </Chart>
    );
  }
}
