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
            <v-coord type="polar"></v-coord>
            <v-tooltip [showTitle]="false"></v-tooltip>
            <v-polygon 
                position="_x*_y"
                color="value"
                [label]="label"
            >
            </v-polygon>
            </v-chart>
        </div>
    </div>
  `,
})
class AppComponent {
  data:any=[];
  ds:any={};
  dv:any={};
  label=['value', {
    offset: 0,
    textStyle: {
      fill: '#fff',
      fontSize: '12',
      textAlign: 'center',
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)'
    }
  }]
  constructor(){
    $.getJSON('/assets/data/voronoi.json',data=>{
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
      type: 'diagram.voronoi',
      fields: ['x', 'y'],
      size: [800, 600],
      as: ['_x', '_y']
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
