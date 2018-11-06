import { Chart, Axis, Interval, Tooltip, registerShape } from 'viser-react';
import * as React from 'react';
import * as _ from 'lodash';

registerShape('interval', 'textInterval', {
  drawShape: function drawShape(cfg, group) {
    var points = this.parsePoints(cfg.points); 
    var value = cfg.origin._origin.value;
    group.addShape('text', {
      attrs: {
        text: value,
        textAlign: 'center',
        x: points[1].x + cfg.size / 2,
        y: points[1].y,
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fill: '#BBB'
      }
    });
    var polygon = group.addShape('polygon', {
      attrs: {
        points: points.map(function(point) {
          return [point.x, point.y];
        }),
        fill: cfg.color
      }
    });
    return polygon;
  }
});

registerShape('interval', 'fallFlag', {
  getShapePoints: function getShapePoints(_ref) {
    var x = _ref.x,
      y = _ref.y,
      y0 = _ref.y0,
      size = _ref.size;

    return [{
      x: x + size,
      y: y0 + size
    }, {
      x: x,
      y: y
    }];
  },
  drawShape: function drawShape(cfg, group) {
    if (cfg.origin._origin === data[data.length - 1]) {
      return;
    }
    var points = this.parsePoints(cfg.points); 
    var p1 = points[0];
    var width = 9;
    var washaway = cfg.origin._origin.washaway;
    group.addShape('text', {
      attrs: {
        text: (washaway * 100).toFixed(1) + ' %',
        x: p1.x - width / 2 - 14,
        y: p1.y - 14,
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fill: '#BBB'
      }
    });
    var polygon = group.addShape('image', {
      attrs: {
        x: p1.x - 16,
        y: p1.y - 16,
        img: 'https://zos.alipayobjects.com/rmsportal/JuBdciUyUAkewNAetxtS.png',
        width: 32,
        height: 32
      }
    });
    return polygon; // 将自定义Shape返回
  }
});

const data = [{
  name: 'MODIFY',
  value: 138,
  washaway: 0.21014492753623193
}, {
  name: 'PRERELEASE',
  value: 109,
  washaway: 0.5596330275229358
}, {
  name: 'RELEASING',
  value: 48,
  washaway: 0
}];

const colorSet = {
  MODIFY: '#4FAAEB',
  PRERELEASE: '#9AD681',
  RELEASING: '#FED46B'
};

const scale = [{
  dataKey: 'value',
  alias: '访问数'
},{
  dataKey: 'name',
  alias: '步骤名称'
}];

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Chart forceFit height={400} data={data} scale={scale} padding={[20,80,40,60]}>
          <Tooltip />
          <Axis dataKey="name"/>
          <Interval position="name*value" shape="textInterval" color={['name',value => colorSet[value]]} />
          <Interval position="name*value" color='#E4E4E4' shape='fallFlag'/>
        </Chart>
      </div>
    );
  }
}


