import * as React from 'react';
import * as $ from 'jquery';
import { Axis, Chart, Tooltip, View, Area, Coord, Slider, Plugin } from 'viser-react';
const DataSet = require('@antv/data-set');

export default class App extends React.Component {
  state = {
    data: [],
    scale: [],
    ds: null,
    start: 0,
    end: 0
  };
  getDv = () => {
    const { ds, data, start, end } = this.state;
    const dv = ds.createView();
    dv.source(data).transform({
      type: 'filter',
      callback: function callback(obj) {
        let time = new Date(obj.time).getTime(); 
        return time >= start && time <= end;
      }
    });
    return dv;
  };
  componentDidMount() {
    $.getJSON('/assets/data/rain-flow.json', data => {
      const ds = new DataSet();
      const scale = [
        {
          dataKey: 'time',
          type: 'time',
          tickCount: 8,
          mask: 'm/dd hh:MM'
        },
        {
          dataKey: 'flow',
          alias: '流量(m^3/s)'
        },
        {
          dataKey: 'rain',
          alias: '降雨量(mm)'
        },
      ];
      const start =  new Date('2009/7/20 0:00').getTime();
      const end =  new Date('2009/9/9 0:00').getTime();
      this.setState({ scale, data, ds, start, end });
    });
  }
  render() {
    const me = this;
    const { data, scale, ds, start, end } = this.state;
    if (!data.length) {
      return null;
    }
    const dv = this.getDv();
    const sliderOpts = {
      width: 'auto',
      height: 26,
      start: start,
      end: end,
      data: dv,
      xAxis: 'time', 
      yAxis: 'flow', 
      scales: {
        time: {
          type: 'time',
          tickCount: 10,
          mask: 'M/DD H:mm'
        }
      },
      backgroundChart: {
        type: 'line'
      },
      onChange: function onChange(_ref:any) {
        let startValue = _ref.startValue,
          endValue = _ref.endValue;
        me.setState({
          start: startValue,
          end: endValue
        })
      }
    };
    return (
      <div>
        <Chart
          container="mountNode"
          forceFit={true}
          height={400}
          padding={[40, 40, 40, 80]}
        >
          <Axis dataKey='rain' grid={null}></Axis>
          <Axis dataKey='flow' title={{autoRotate: true}}></Axis>
          <View
            data={dv}
            scale={scale}
          >
            <Area 
              position='time*flow'
              color='l(100) 0:#a50f15 1:#fee5d9'
              opacity={0.85}
            >
            </Area>
          </View>
          <View
            data={dv}
            scale={scale}
          >
            <Coord type='rect' direction='TL'></Coord>
            <Axis dataKey='rain' position='right'></Axis>
            <Area 
              position='time*rain'
              color='l(100) 0:#293c55 1:#f7f7f7'
              opacity={0.85}
            >
            </Area>
          </View>
          <Tooltip />
        </Chart>
        <Plugin>
          <Slider {...sliderOpts}/>
        </Plugin>
      </div>
    );
  }
}
