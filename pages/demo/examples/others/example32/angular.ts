import 'zone.js';
import 'reflect-metadata';
import * as $ from 'jquery';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
const DataSet=require('@antv/data-set');
@Component({
  selector: '#mount',
  template: `
    <div *ngIf="data.length">
        <div id="canvas">
            <v-chart
                [forceFit]="true"
                height="400"
                [data]="dv"
            >
            <v-axis dataKey="x" [grid]="grid"></v-axis>
            <v-tooltip [showTitle]="false" [crosshairs]="false"></v-tooltip>
            <v-legend 
              offset="40"
            >
            </v-legend>
            <v-polygon position="x*y" [color]="color" [style]="style"></v-polygon>
            </v-chart>
        </div>
    </div>
  `,
})
class AppComponent {
  data:any=[];
  ds:any={};
  dv:any={};
  color=['count', '#BAE7FF-#1890FF-#0050B3'];
  style={
    lineWidth: 1,
    stroke: '#fff'
  };
  grid={
    lineStyle: {
      stroke: '#d9d9d9',
      lineWidth: 1,
      lineDash: [2, 2]
    }
  };
  constructor(){
    $.getJSON('/assets/data/gaussion-distribution.json',data=>{
      const ds = new DataSet();
      this.data=data;
      this.ds=ds;
      this.getDv();
    });
  }
  getDv=()=>{
    const {ds,data}=this;
    const dv = ds.createView();
    dv.source(data).transform({
      sizeByCount: true, 
      type: 'bin.hexagon',
      fields: ['x', 'y'], 
      bins: [10, 5]
    });
    this.dv=dv;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ViserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
