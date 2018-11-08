import { Chart, Legend, Coord, Tooltip, StackInterval } from 'viser-react';
import * as React from 'react';
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

var ds = new DataSet();
var dv = ds
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

export default class App extends React.Component {
  itemTpl = (value, color, checked, index) => {
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
  render() {
    return (
      <div>
        <Chart
          forceFit
          height={400}
          width={400}
          data={dv}
          scale={scale}
          padding={[80, 300, 80, 80]}
          plotBackground={{
            stroke: '#ccc',
          }}
        >
          <Coord type="theta" innerRadius={0.3} radius={0.95} />
          <Legend
            useHtml={true}
            position={'right'}
            reactive={true}
            containerTpl={
              '<div class="g2-legend">' +
              '<table class="g2-legend-list"></table>' +
              '</div>'
            }
            itemTpl={this.itemTpl}
            offset={[15, 0]}
            legendList={{
              listStyleType: 'none',
              margin: 0,
              padding: 0,
            }}
            legendListItem={{
              cursor: 'pointer',
              fontSize: '14px',
            }}
          />
          <Tooltip
            showTitle={false}
            containerTpl={
              '<div class="g2-tooltip"><ul class="g2-tooltip-list"></ul></div>'
            }
            itemTpl={
              '<li data-index={index}><span style="color:{color}">{name}:</span>{value}</li>'
            }
          />
          <StackInterval
            position="percent"
            color={[
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
            ]}
            label={[
              'percent',
              {
                formatter: function formatter(val, item) {
                  return item.point.country + ': ' + val;
                },
              },
            ]}
            style={{
              lineWidth: 2,
              stroke: '#fff',
            }}
            select={false}
            active={false}
          />
        </Chart>
      </div>
    );
  }
}
