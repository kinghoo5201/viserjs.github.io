import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [
  {
    dataKey: 'count',
    alias: 'top2000 唱片总量',
  },
  {
    dataKey: 'release',
    tickInterval: 5,
    alias: '唱片发行年份',
  },
];

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale">
      <v-tooltip type="mini"></v-tooltip>
      <v-axis dataKey="count" [label]="label" ></v-axis>
      <v-interval position="release*count" color="#1890ff" opacity="0.96"></v-interval>
    </v-chart>
  </div>
  `
})

class AppComponent {
  forceFit: boolean = true;
  height: number = 400;
  data: any = [];
  scale: any = scale;
  label: any = {
    offset: [-10,10],
  };
  constructor() { 
    $.getJSON('/assets/data/top2000.json', data => {
      var ds = new DataSet();
      var dv = ds
        .createView('test')
        .source(data)
        .transform({
          as: ['count'],
          groupBy: ['release'],
          operations: ['count'],
          type: 'aggregate',
        });
      this.data = dv.rows;
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
