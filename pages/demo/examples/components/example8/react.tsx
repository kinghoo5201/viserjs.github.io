import { Chart, Area, Legend, Axis, Tooltip } from 'viser-react';
import * as React from 'react';

import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [
  {
    dataKey: 'year',
    tickInterval: 10,
    nice: false,
  },
  {
    dataKey: 'count',
    nice: false,
  },
];

export default class App extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    $.getJSON('/assets/data/baby-names.json', data => {
      var ds = new DataSet();
      var dv = ds
        .createView('demo')
        .source(data)
        .transform({
          type: 'fill-rows',
          groupBy: ['name'],
          orderBy: ['year'],
        })
        .transform({
          type: 'impute',
          field: 'n',
          method: 'value',
          value: 0,
        })
        .transform({
          type: 'aggregate',
          fields: ['n'],
          operations: ['sum'],
          groupBy: ['year', 'name'],
          orderBy: ['year'],
          as: ['count'],
        });
      this.setState({
        data: dv,
      });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Chart
          forceFit
          height={400}
          width={400}
          data={data}
          scale={scale}
          padding={[20, 180, 50, 50]}
          plotBackground={{
            stroke: '#ccc',
          }}
        >
          <Legend
            useHtml={true}
            flipPage={true}
            position={'right'}
            title={{ text: '图例可滚动' }}
            legendMarker={{ borderRadius: 'none' }}
            legendTitle={{
              fontSize: '12px',
              fontWeight: 500,
              margin: 0,
              color: '#ff8800',
            }}
          />
          <Axis dataKey="cyearount" title={null} line={null} tickLine={null} />
          <Axis
            dataKey="count"
            title={null}
            line={null}
            tickLine={{
              length: 8,
            }}
            subTickCount={10}
            subTickLine={{
              lineWidth: 1, // 子刻度线宽
              stroke: '#ddd', // 子刻度线颜色
              length: 5,
            }}
            grid={null}
          />
          <Tooltip shared={false} crosshairs={false} />
          <Area
            position="year*count"
            adjust={['stack', 'symmetric']}
            color={'name'}
            shape={'smooth'}
            opacity={1}
          />
        </Chart>
      </div>
    );
  }
}
