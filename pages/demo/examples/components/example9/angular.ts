import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';
const DataSet = require('@antv/data-set');

const data = [
  {
    country: 'Lithuania',
    litres: 501.9,
  },
  {
    country: 'Czech',
    litres: 301.9,
  },
  {
    country: 'Ireland',
    litres: 201.1,
  },
  {
    country: 'Germany',
    litres: 165.8,
  },
  {
    country: 'Australia',
    litres: 139.9,
  },
  {
    country: 'Austria',
    litres: 128.3,
  },
  {
    country: 'UK',
    litres: 99,
  },
  {
    country: 'Belgium',
    litres: 60,
  },
  {
    country: 'Netherlands',
    litres: 50,
  },
];

const ds = new DataSet();
const dv = ds
  .createView()
  .source(data)
  .transform({
    type: 'percent',
    field: 'litres',
    dimension: 'country',
    as: 'percent',
  });

const scale = [
  {
    dataKey: 'percent',
    formatter: function formatter(val) {
      val = (val * 100).toFixed(2) + '%';
      return val;
    },
  },
  {
    dataKey: 'count',
    nice: false,
  },
];

const itemTpl = (value, color, checked, index) => {
  var obj = dv.rows[index];
  var percent = (obj.percent * 100).toFixed(2) + '%';
  checked = checked ? 'checked' : 'unChecked';
  return (
    '<tr class="g2-legend-list-item item-' +
    index +
    ' ' +
    checked +
    '" data-value="' +
    value +
    '" data-color=' +
    color +
    ' >' +
    '<td style="width:120px;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
    color +
    ';"></i>' +
    '<span class="g2-legend-text" style="color: #666">' +
    value +
    '</span></td>' +
    '<td style="text-align: right">' +
    percent +
    '</td>' +
    '<td style="text-align: right;color: #666;width:80px">' +
    obj.litres +
    '</td>' +
    '</tr>'
  );
};
@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart
      [forceFit]="forceFit"
      height="400"
      [data]="data"
      [scale]="scale"
      [padding]="padding"
      [plotBackground]="plotBackground"
    >
      <v-coord
        type="theta"
        innerRadius="0.3"
        radius="0.95"
      ></v-coord>
      <v-legend
        [useHtml]="true"
        position="right"
        [reactive]="true"
        [containerTpl]="containerTpl"
        [itemTpl]="itemTpl"
        [offset]="[15,0]"
        [legendList]="{listStyleType:'none',margin:0,padding:0}"
        [legendListItem]="{cursor:'pointer',fontSize:'14px'}"
      ></v-legend>
      <v-tooltip
        [showTitle]="false"
        [containerTpl]="tooltipCont"
        [itemTpl]="tooltipTpl"
      ></v-tooltip>
      <v-stack-interval
        position="percent"
        [color]="color"
        [label]="label"
        [style]="style"
        [select]="false"
        [active]="false"
      ></v-stack-interval>
    </v-chart>
  </div>
  `
})
export class AppComponent {
  forceFit: boolean = true;
  height: number = 400;
  padding: any = [80, 300, 80, 80];
  plotBackground: any = { stroke: '#ccc' };
  itemTpl: any = itemTpl;
  data: any = dv;
  scale: any = scale;
  containerTpl: string = '<div class="g2-legend">' +
    '<table class="g2-legend-list"></table>' +
    '</div>';
  tooltipCont: string = '<div class="g2-tooltip"><ul class="g2-tooltip-list"></ul></div>';
  tooltipTpl: string = '<li data-index={index}><span style="color:{color}">{name}:</span>{value}</li>';
  color: any = [
    'country',
    [
      '#67b7dc',
      '#84b761',
      '#fdd400',
      '#cc4748',
      '#cd82ad',
      '#2f4074',
      '#448e4d',
      '#b7b83f',
      '#b9783f',
    ],
  ];
  label: any = [
    'percent',
    {
      formatter: function formatter(val, item) {
        return item.point.country + ': ' + val;
      },
    },
  ];
  style: any = {
    lineWidth: 2,
    stroke: '#fff',
  };
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
