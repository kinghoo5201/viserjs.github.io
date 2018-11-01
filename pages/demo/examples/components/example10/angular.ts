import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';

const data:any = [{
  year: '1951 年',
  sales: 38
}, {
  year: '1952 年',
  sales: 52
}, {
  year: '1956 年',
  sales: 61
}, {
  year: '1957 年',
  sales: 145
}, {
  year: '1958 年',
  sales: 48
}, {
  year: '1959 年',
  sales: 38
}, {
  year: '1960 年',
  sales: 38
}, {
  year: '1962 年',
  sales: 38
}];
const scale:any = [{
  dataKey: 'sales',
  tickInterval: 20,
}];

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart
      [forceFit]="true"
      height="400"
      [data]="data"
      [scale]="scale"
    >
      <v-tooltip></v-tooltip>
      <v-axis
        dataKey="sales"
        [label]="{
          offset:[-10,10],
        }"
      ></v-axis>
      <v-interval
        position="year*sales"
      ></v-interval>
    </v-chart>
  </div>
  `,
})
class AppComponent {
  public data: any = data;
  public scale: any = scale;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ViserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
