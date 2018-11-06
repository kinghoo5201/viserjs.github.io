import { Chart, Axis, Interval, Tooltip, Point } from 'viser-react';
import * as React from 'react';
import * as _ from 'lodash';

const data = [{
  "name": "John",
  "vote": 35654
}, {
  "name": "Damon",
  "vote": 65456
}, {
  "name": "Patrick",
  "vote": 45724
}, {
  "name": "Mark",
  "vote": 13654
}];

const imageMap = {
  'John': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
  'Damon': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
  'Patrick': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
  'Mark': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
};

const scale = [{
  dataKey: 'vote',
  min: 0
},];

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={data} scale={scale} padding={[60,20,40,60]}>
          <Tooltip />
          <Axis dataKey="vote"/>
          <Interval position="name*vote" color={["name",['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']]} />
          <Point position="name*vote" size={60} shape={['name', name => ['image',imageMap[name]]]}/>
        </Chart>
      </div>
    );
  }
}


