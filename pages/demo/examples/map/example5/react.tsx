import { Chart, Tooltip, Coord, View, Polygon, Point } from 'viser-react';
import * as React from 'react';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

function addPoint(collection, point, other) {
  let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  for (let i = 0; i < count; i++) {
    collection.push(point);
  }
}

function getCount(x, y, medianX, medianY) {
  let distance = Math.pow(x - medianX, 2) + Math.pow(y - medianY, 2);
  if (distance < 4) {
    return 3;
  } else if (distance < 16) {
    return 3;
  } else if (distance < 64) {
    return 2;
  }
  return 1;
}

const scale = [{
  dataKey: 'latitude',
  nice: false,
  sync: true
}, {
  dataKey: 'longitude',
  nice: false,
  sync: true
}];

export default class App extends React.Component {
  state = {
    geoDv: [],
    userDv: [],
  };

  componentDidMount() {
    $.getJSON('/assets/data/china-provinces.geo.json', (data) => {
      const geoDv = new DataSet.View().source(data, {
        type: 'GeoJSON'
      });
      const ranges = {
        lat: geoDv.range('latitude'),
        lon: geoDv.range('longitude')
      };
      const medians = {
        lat: geoDv.median('latitude'),
        lon: geoDv.median('longitude')
      };
      const userData = [];
      for (let lon = ranges.lon[0]; lon <= ranges.lon[1]; lon += .5) {
        for (let lat = ranges.lat[0]; lat <= ranges.lat[1]; lat += .5) {
          if (geoDv.geoContains(data, [lon, lat])) {
            addPoint(userData, {
              latitude: lat,
              longitude: lon
            }, getCount(lon, lat, medians.lon, medians.lat));
          }
        }
      }
      const userDv = new DataSet.View().source(userData).transform({
        // sizeByCount: true,
        type: 'bin.hexagon',
        fields: ['longitude', 'latitude'],
        binWidth: [2, 3],
        as: ['longitude', 'latitude', 'count']
      });
      this.setState({geoDv, userDv});
    });
  }

  render() {
    const { geoDv, userDv } = this.state;

    return (
      <div>
        <Chart forceFit height={500} padding={0} scale={scale}>
          <View data={geoDv}>
            <Polygon position="longitude*latitude" color="grey" opacity={0.3}/>
          </View>
          <View  data={userDv}>
            <Polygon position="longitude*latitude"        color={['count', '#BAE7FF-#1890FF-#0050B3']}
              style={{
                stroke: 'white',
                lineWidth: 10
              }}
            />
          </View>
        </Chart>
      </div>
    );
  }
}


