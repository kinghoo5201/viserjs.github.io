import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [padding]="padding" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-view [data]="geoDv">
        <v-polygon position="longitude*latitude" color="grey" [opacity]="0.5"></v-polygon>
      </v-view>
      <v-view [data]="userDv">
        <v-polygon position="longitude*latitude" [color]="color"
          [style]="style"
        ></v-polygon>
      </v-view>
    </v-chart>
  </div>
  `
})
class AppComponent {
  forceFit: boolean = true;
  height: number = 500;
  padding = [0];
  geoDv = [];
  userDv = [];
  color = ['count', '#BAE7FF-#1890FF-#0050B3'];
  style = {
    stroke: 'white',
    lineWidth: 10
  };
  scale = [{
    dataKey: 'latitude',
    nice: false,
    sync: true
  }, {
    dataKey: 'longitude',
    nice: false,
    sync: true
  }];
  addPoint = function(collection, point, other) {
    let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    for (let i = 0; i < count; i++) {
      collection.push(point);
    }
  };
  getCount = function(x, y, medianX, medianY) {
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

  constructor() {
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
      this.geoDv = geoDv;
      this.userDv = userDv;
    });
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export default class AppModule { }

