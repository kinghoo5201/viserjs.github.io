import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;

const scale = [{
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
}];

@Component({
  selector: '#mount',
  template: `
  <div *ngIf="data.length">
    <v-chart [forceFit]="forceFit" [height]="height" [animate]="false" [padding]="[ 40, 40, 40, 80 ]">
      <v-tooltip></v-tooltip>
      <v-axis dataKey="rain" [grid]="null"></v-axis>
      <v-axis dataKey="flow" [title]="titleStyle"></v-axis>
      <v-view [data]="dv" [scale]="scale">
        <v-area position="time*flow" color="l(100) 0:#a50f15 1:#fee5d9" [opacity]="0.85"></v-area>
      </v-view>
      <v-view [data]="dv" [scale]="scale">
        <v-coord type="rect" direction="TL"></v-coord>
        <v-axis dataKey="rain" position="right"></v-axis>
        <v-area position="time*rain" color="l(100) 0:#293c55 1:#f7f7f7" [opacity]="0.85"></v-area>
      </v-view>
    </v-chart>
    <v-plugin>
      <v-slider [width]="'auto'" [height]="26" [start]="start" [end]="end" [data]="dv"
        [xAxis]="'time'" [yAxis]="'flow'" [scales]="scales" [onChange]="this.slideChange"
      ></v-slider>
    </v-plugin>
  </div>
  `
})
class AppComponent {
  forceFit: boolean = true;
  height: number = 400;
  titleStyle = {
    autoRotate: true
  };
  data = [];
  dv = [];
  scale = scale;
  start = new Date('2009/7/20 0:00').getTime();
  end = new Date('2009/9/9 0:00').getTime();
  scales = {
    time: {
      type: 'time',
      tickCount: 10,
      mask: 'M/DD H:mm'
    }
  };

  constructor() {
    $.getJSON('/assets/data/rain-flow.json', (sourceData) => {
      this.data = sourceData;
      this.dv = this.getData();
    });
  }

  getData = () => {
    const { start, end, data } = this;
    const ds = new DataSet();
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const time = new Date(obj.time).getTime();
          return time <= end && time >= start;
        }
      })
    return dv;
  }

  slideChange = (opts: any) => {
    this.start = opts.startValue;
    this.end = opts.endValue;
    this.dv = this.getData();
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
