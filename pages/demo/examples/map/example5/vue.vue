<template>
  <div>
    <v-chart :forceFit="true" :height="500" :padding="0" :scale="scale">
      <v-tooltip/>
      <v-view :data="geoDv">
        <v-polygon position="longitude*latitude" color="grey" :opacity="0.3"/>
      </v-view>
      <v-view :data="userDv">
        <v-polygon position="longitude*latitude" :color="color"
          :vStyle="style"
        />
      </v-view>
    </v-chart>
  </div>
</template>

<script>
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [{
  dataKey: 'latitude',
  nice: false,
  sync: true
}, {
  dataKey: 'longitude',
  nice: false,
  sync: true
}];

export default {
  mounted() {
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
            this.addPoint(userData, {
              latitude: lat,
              longitude: lon
            }, this.getCount(lon, lat, medians.lon, medians.lat));
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
      this.$data.geoDv = geoDv;
      this.$data.userDv = userDv;
    });
  },
  methods:{
    addPoint(collection, point, other) {
      let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      for (let i = 0; i < count; i++) {
        collection.push(point);
      }
    },
    getCount(x, y, medianX, medianY) {
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
  },
  data() {
    return {
      geoDv: [],
      userDv: [],
      scale,
      color: ['count', '#BAE7FF-#1890FF-#0050B3'],
      style: {
        stroke: 'white',
        lineWidth: 10
      }
    };
  },
};
</script>
