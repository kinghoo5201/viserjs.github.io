import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
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

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="400" [data]="data" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-legend></v-legend>
      <v-axis></v-axis>
      <v-facet type="mirror" [fields]="fields" [transpose]="true" [padding]="padding">
        <v-facet-view>
            <v-interval position="age*total_percentage" [color]="color" />
          </v-facet-view>
      </v-facet>
    </v-chart>
  </div>
  `
})
export class AppComponent {
  forceFit: boolean = true;
  height: number = 400;
  data = [];
  scale = scale;
  padding = [0, 60, 0, 0];
  fields = ['gender'];
  color = ['gender', ['#1890ff', '#f04864']];

  constructor() {
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
  bootstrap: [AppComponent]
})

export default class AppModule { }

