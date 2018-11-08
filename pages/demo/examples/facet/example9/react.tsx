import { Chart, Facet, Interval, Tooltip, Legend, Axis, FacetView } from 'viser-react';
import * as React from 'react';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [{
  dataKey: 'age',
  sync: true,
  tickCount: 11
},{
  dataKey: 'total_percentage',
  sync: true,
  formatter: function formatter(v) {
    return v + '%';
  }
},{
  dataKey: 'gender',
  sync: true,
}];

export default class App extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    $.getJSON('/assets/data/population.json', (data) => {
      let tmp = [];
      let dates = [];
      data.male.values.forEach(function(obj) {
        if (dates.indexOf(obj.date) === -1) {
          dates.push(obj.date);
        }
        obj.age_groups.forEach(function(subObject) {
          subObject.gender = 'male';
          subObject.date = obj.date;
          tmp.push(subObject);
        });
      });
      data.female.values.forEach(function(obj) {
        obj.age_groups.forEach(function(subObject) {
          subObject.gender = 'female';
          subObject.date = obj.date;
          tmp.push(subObject);
        });
      });
      const ds = new DataSet();
      const dv = ds.createView().source(tmp).transform({
        type: 'filter',
        callback: function callback(row) {
          return new Date(row.date * 1000).getFullYear() === new Date(dates[0] * 1000).getFullYear();
        }
      });
      this.setState({ data: dv.rows });
    });
  }

  render() {
    const { data } = this.state;
    if (!data.length) {
      return null;
    }
    return (
      <Chart forceFit={true} height={400} data={data} scale={scale}>
        <Tooltip />
        <Legend />
        <Axis />
        <Facet type="mirror" fields={['gender']} transpose={true} padding={[0, 60, 0, 0]}>
          <FacetView>
            <Interval position="age*total_percentage" color={['gender', ['#1890ff', '#f04864']]} />
          </FacetView>
        </Facet>
      </Chart>
    );
  }
}




