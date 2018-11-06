import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
const DataSet = require('@antv/data-set');

const sourceData = [{
  "name": "type 1",
  "value": 102
}, {
  "name": "type 2",
  "value": 65
}, {
  "name": "type 3",
  "value": 43
}, {
  "name": "type 4",
  "value": 12
}];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'waffle',
  maxCount: 500,
  rows: 12
});
const data = dv.rows;

const scale = [
  { dataKey: 'x', nice: false },
  { dataKey: 'y', nice: false },
];

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale" [padding]="padding">
      <v-tooltip></v-tooltip>
      <v-legend position="bottom"></v-legend>
      <v-legend dataKey="_hStep" [show]="legendShow"></v-legend>
      <v-legend dataKey="_wStep" [show]="legendShow"></v-legend>
      <v-point
        shape="square"
        position="x*y"
        color="name"
        [size]="pointSize"
      ></v-point>
    </v-chart>
  </div>
  `
})
class AppComponent {
  forceFit: boolean = true;
  height: number = 440;
  data = data;
  scale = scale;
  padding = [20, 20, 80, 50];

  legendShow = false;
  pointSize = ['_hStep', hStep => Math.min((340) * 0.4 * hStep, 15)];
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

