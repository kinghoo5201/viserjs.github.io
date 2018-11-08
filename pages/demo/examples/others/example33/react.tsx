import * as React from 'react';
import { Chart, Point } from 'viser-react';
const DataSet = require('@antv/data-set');

const data = [{
  name: 'Internet Explorer',
  value: 26
}, {
  name: 'Chrome',
  value: 40
}, {
  name: 'Firefox',
  value: 30
}, {
  name: 'Safari',
  value: 24
}, {
  name: 'Opera',
  value: 15
}, {
  name: 'Undetectable',
  value: 8
}];
const imageMap = {
  'Internet Explorer': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  Chrome: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  Firefox: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  Safari: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  Opera: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  Undetectable: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
};
const dv = new DataSet.View().source(data).transform({
  type: 'waffle',
  rows: 10
});
export default class App extends React.Component {
  render() {
    return (
      <Chart forceFit={true} height={400} padding={[20]} data={dv}>
        <Point position="x*y" shape={['name',name=>['image',imageMap[name]]]} size={(window.innerHeight - 40) / 20} color="name"/>
      </Chart>
    );
  }
}
