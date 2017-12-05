export const template =
`import { Chart, Tooltip, Axis, Legend, Pie } from 'viser-react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

const data = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
];

const dataPre = {
  transform: [{
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  }]
};

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];

class App extends React.Component {
  render() {
    return (
      <Chart forceFit height={500} data={data} dataPre={dataPre} scale={scale}>
        <Tooltip showTitle={false} dataKey="item*percent"/>
        <Axis />
        <Legend dataKey="item"/>
        <Pie
          position="percent"
          color="item"
          style={{ stroke: '#fff', lineWidth: 1 }}
          label={['percent', {
            formatter: (val, item) => {
              return item.point.item + ': ' + val;
            }
          }]}
        />
      </Chart>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('mount')
);
`;
