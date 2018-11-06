import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
const DataSet = require('@antv/data-set');

const sourceData = [{
  "State": "AL",
  "Under 5 Years": 310504,
  "5 to 13 Years": 552339,
  "14 to 17 Years": 259034,
  "18 to 24 Years": 450818,
  "25 to 44 Years": 1231572,
  "45 to 64 Years": 1215966,
  "65 Years and Over": 641667
}, {
  "State": "AK",
  "Under 5 Years": 52083,
  "5 to 13 Years": 85640,
  "14 to 17 Years": 42153,
  "18 to 24 Years": 74257,
  "25 to 44 Years": 198724,
  "45 to 64 Years": 183159,
  "65 Years and Over": 50277
}, {
  "State": "AZ",
  "Under 5 Years": 515910,
  "5 to 13 Years": 828669,
  "14 to 17 Years": 362642,
  "18 to 24 Years": 601943,
  "25 to 44 Years": 1804762,
  "45 to 64 Years": 1523681,
  "65 Years and Over": 862573
}, {
  "State": "AR",
  "Under 5 Years": 202070,
  "5 to 13 Years": 343207,
  "14 to 17 Years": 157204,
  "18 to 24 Years": 264160,
  "25 to 44 Years": 754420,
  "45 to 64 Years": 727124,
  "65 Years and Over": 407205
}, {
  "State": "CA",
  "Under 5 Years": 2704659,
  "5 to 13 Years": 4499890,
  "14 to 17 Years": 2159981,
  "18 to 24 Years": 3853788,
  "25 to 44 Years": 10604510,
  "45 to 64 Years": 8819342,
  "65 Years and Over": 4114496
}, {
  "State": "CO",
  "Under 5 Years": 358280,
  "5 to 13 Years": 587154,
  "14 to 17 Years": 261701,
  "18 to 24 Years": 466194,
  "25 to 44 Years": 1464939,
  "45 to 64 Years": 1290094,
  "65 Years and Over": 511094
}, {
  "State": "CT",
  "Under 5 Years": 211637,
  "5 to 13 Years": 403658,
  "14 to 17 Years": 196918,
  "18 to 24 Years": 325110,
  "25 to 44 Years": 916955,
  "45 to 64 Years": 968967,
  "65 Years and Over": 478007
}];

const ages = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ages,
  key: 'age',
  value: 'population',
  retains: ['State']
}).transform({
  type: 'map',
  callback: obj => {
    let key = obj.age;
    let type = void 0;
    if (key === 'Under 5 Years' || key === '5 to 13 Years' || key === '14 to 17 Years') {
      type = 'a';
    } else if (key === '18 to 24 Years') {
      type = 'b';
    } else if (key === '25 to 44 Years') {
      type = 'c';
    } else {
      type = 'd';
    }
    obj.type = type;
    return obj;
  }
});
const data = dv.rows;

const colorMap = {
  'Under 5 Years': '#E3F4BF',
  '5 to 13 Years': '#BEF7C8',
  '14 to 17 Years': '#86E6C8',
  '18 to 24 Years': '#36CFC9',
  '25 to 44 Years': '#209BDD',
  '45 to 64 Years': '#1581E6',
  '65 Years and Over': '#0860BF'
};

const scale = [{
  dataKey: 'population',
  tickInterval: 1000000
}];

const label = {
  formatter: function formatter(val) {
    return val / 1000000 + 'M';
  }
}
@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="true" [height]="height" [data]="data" [scale]="scale">
      <v-coord type="polar" [innerRadius]="0.5"></v-coord>
      <v-tooltip></v-tooltip>
      <v-legend position="right"></v-legend>
      <v-axis dataKey="population" [label]="label"></v-axis>
      <v-interval 
          position="State*population" 
          [color]="color"
          [tooltip]="tooltip"
          [adjust]="adjust"
      ></v-interval>
    </v-chart>
  </div>
  `
})
class AppComponent {
  forceFit: boolean = true;
  height: number = 600;
  data = data;
  scale = scale;
  label = label;
  colorMap = colorMap;
  color = ['age', age => colorMap[age] ];
  tooltip = ['age*population', (age, population) => {return {
      name: age,
      value: population
    };
  }];
  adjust = [{
    type: 'dodge',
    dodgeBy: 'type', 
    marginRatio: 0 
  }, {
    type: 'stack'
  }]
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

