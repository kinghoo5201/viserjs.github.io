import * as React from 'react';
import * as $ from 'jquery';
import { Coord, Chart, Tooltip, Polygon } from 'viser-react';
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
      type: 'diagram.voronoi',
      fields: ['x', 'y'],
      size: [800, 600],
      as: ['_x', '_y']
    });
    return dv;
  };
  componentDidMount() {
    $.getJSON('/assets/data/voronoi.json', data => {
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
        height={440}
        data={dv}
      >
        <Tooltip showTitle={false}/>
        <Coord type="polar"/>
        <Polygon position="_x*_y" color="value" label={['value', {
          offset: 0,
          textStyle: {
            fill: '#fff',
            fontSize: '12',
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        }]}/>
      </Chart>
    );
  }
}
