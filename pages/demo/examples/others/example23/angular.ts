import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';

const data = [{
  "name": "John",
  "vote": 35654
}, {
  "name": "Damon",
  "vote": 65456
}, {
  "name": "Patrick",
  "vote": 45724
}, {
  "name": "Mark",
  "vote": 13654
}];

const imageMap = {
  'John': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
  'Damon': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
  'Patrick': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
  'Mark': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
};

const scale = [{
  dataKey: 'vote',
  min: 0
}];

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart force-fit="true" [height]="height" [padding]="padding" [data]="data" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-axis dataKey="vote"></v-axis>
      <v-interval position="name*vote" [color]="color"></v-interval>
      <v-point position="name*vote" [size]="size" [shape]="shape"></v-point>
    </v-chart>
  </div>
  `
})

class AppComponent {
  forceFit: boolean= true;
  height: number = 400;
  data = data;
  scale = scale;
  padding = [60,20,40,60];
  imageMap = imageMap;
  size = 60;
  color = ['name',['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']];
  shape = ['name', name => ['image',imageMap[name]]];
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

