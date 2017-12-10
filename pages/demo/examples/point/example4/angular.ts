import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule, Global } from 'viser-ng';
import * as $ from 'jquery';

const scale = [{
  dataKey: 'LifeExpectancy',
  alias: '人均寿命（年）'
}, {
  dataKey: 'Population',
  type: 'pow',
  alias: '人口总数'
}, {
  dataKey: 'GDP',
  alias: '人均国内生产总值($)'
}, {
  dataKey: 'Country',
  alias: '国家/地区'
}];

const colorMap = {
  'Asia': Global.colors[0],
  'Americas': Global.colors[1],
  'Europe': Global.colors[2],
  'Oceania': Global.colors[3]
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="true" [height]="500" [data]="data">
      <v-tooltip [showTitle]="false"></v-tooltip>
      <v-axis
        [dataKey]="'GDP'"
        [label]="axisLabel"
      ></v-axis>
      <v-legend
        [dataKey]="'Population'"
      ></v-legend>
      <v-point
        position="GDP*LifeExpectancy"
        [color]="pointColor"
        [size]="pointSize"
        [style]="pointStyle"
        tooltip="Country*Population*GDP*LifeExpectancy"
      ></v-point>
    </v-chart>
  </div>
  `
})
class AppComponent {
  data = [];
  scale = scale;
  axisLabel = {
    // formatter: '.0s'
  };
  pointColor = ['continent', val => colorMap[val]];
  pointSize = ['Population', [4, 65]];
  pointStyle = ['continent', {
    lineWidth: 1,
    strokeOpacity: 1,
    fillOpacity: 0.3,
    opacity: 0.65,
    stroke: val => colorMap[val],
  }];

  constructor() {
    $.getJSON('/data/bubble.json', (data) => {
      this.data = data;
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
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);