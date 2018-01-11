import { Chart, Tooltip, Polygon } from 'viser-react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const dataView = [
  'nodes', nodes => {
    return nodes.map((node: any) => ({
      name: node.data.name,
      value: node.value,
      depth: node.depth,
      x: node.x,
      y: node.y,
    }));
  },
];

class App extends React.Component {
  state = {
    data: {},
  };

  componentDidMount() {
    $.getJSON('/data/flare.json', (sourceData) => {
      const dv = new DataSet.View().source(sourceData, {
        type: 'hierarchy',
      });
      dv.transform({
        type: 'hierarchy.partition',
      });
      this.setState({ data: dv.rows });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <Chart forceFit height={500} data={data} dataView={dataView} padding={0}>
        <Tooltip showTitle={false} />
        <Polygon position="x*y" color="name" />
      </Chart>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));