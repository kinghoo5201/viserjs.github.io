import * as React from 'react';
import { Chart,Polygon} from 'viser-react';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

export default class App extends React.Component { 
  state = {
    worldMap:null,
  }
  componentDidMount() { 
    $.getJSON('/assets/data/world.geo.json', mapData => {
      const worldMap = new DataSet.View().source(mapData, {
        type: 'GeoJSON'
      });
      this.setState({worldMap})
    });
  }
  render() { 
    const { worldMap } = this.state;
    return (
      <Chart
        forceFit
        height={500}
        padding={[55, 20]}
        data={worldMap}
      >
        <Polygon
          position="longitude*latitude"
          label={[
            'name',
            {
              type: 'map',
              offset: 0,
              textStyle: {
                fill: 'black',
                stroke: '#fff',
                lineWidth: 2,
              },
            }
          ]}
          style={{
            fill: '#CED4D9',
            stroke: '#F2F4F5',
            lineWidth: 0.5
          }}
        />
      </Chart>
    );
  }
}
