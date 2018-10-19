# Viser-graph component api

## Graph

#### type

Optional tree (tree relation diagram) or graph (mesh relation diagram), default graph. The simplest examples are as follows:

```javascript
const graph = {
  type: 'graph',
  width: 500,
  height: 500,
  fitView: 'cc',
  fitViewPadding: true,
  animate: true,
  minZoom: 0.2,
  maxZoom: 10,
  data,
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph} />
      </div>
    );
  }
}
```

#### data {object} data model, required

format:
The data format of type for graph and tree is different.

```javascript
// type === graph
{
  nodes:[],
  edges:[],
  groups: [],
}
// type === tree
{
  roots:[]
}
```

nodes: Data model of nodes

```javascript
{
  id: 'node1',             // id must be unique
  x: number,            // Lateral position
  y: number,           // Longitudinal position
  color: '#333',           // color
  size: 10 || [10, 10],    // size || [width, height]
  shape: 'circle',         // The graphics used (currently only tested circle available)
  style: {                 // Key shape style (priority over color)
    fill: 'red',
	  stroke: 'blue'
  },
  label: 'Text label' || {     // Text label || Text graphics configuration
    text: 'Text label',
	  fill: 'green'
  },
  parent: 'group1',         // declare which group is the parent of nodes
  index: 1,                 // Render level (not yet tested)
}
```

edges: Data model of edges

```javascript
{
  id: 'edge1',           // id must be unique
  source: 'node1',       // Source node ID
  target: 'node2',       // Target node ID
  controlPoints: [{      // control point
    x: 10,
	  y: 10
  }],
  sourceAnchor: 0,       // The anchor point of the source node (the above anchor test will not be connected to other points after completion, and the specific function is unknown).
  targetAnchor: 2,       // The anchor point of the target node (the above anchor test will not be connected to other points after completion, and the specific function is unknown).
  color: 'red',          // color
  size: 3,               // size
  shape: 'line',         // The graphics used (currently only tested line available), introduced the plug-in - , and shape: quadraticCurve can be used.
  style: {               // Key shape style (priority over color)
	  stroke: 'blue'
  },
  label: 'Text label' || {   // Text label || Text graphics configuration
    text: 'Text label',
	  fill: 'green'
  },
  parent: 'group1',       // declare which group is the parent of nodes
  index: 1,               // Render level (not yet tested)
}
```

groups: Data model of groups

```javascript
{
  id: 'group1',             // id must be unique
  color: '#333',           // color
  size: 10 || [10, 10],    // size || [width, height], Parameter not available
  shape: 'circle',         // The graphics used, Parameter not available
  style: {                 // Key shape style (priority over color)
    fill: 'red',
	  stroke: 'blue'
  },
  label: 'Text label' || {     // Text label || Text graphics configuration
    text: 'Text label',
	  fill: 'green'
  },
  parent: 'group2',         // declare which group is the parent of nodes
  index: 1,                 // Render level
}
```

roots: the data model when type is tree

```javascript
[
  {
    id: 'root', // Root node ID
    color: '#333', // color
    size: 10 || [10, 10], // size || [width, height]
    shape: 'circle', //  The graphics used
    style: {
      // Key shape style (priority over color)
      fill: 'red',
      stroke: 'blue',
    },
    label: 'Text label' || {
      // Text label || Text graphics configuration
      text: 'Text label',
      fill: 'green',
    },
    parent: 'parentId', // Parent node ID
    collapsed: false, // Whether to collapse, default false
    index: 1, // Render level
    children: [
      {
        // child element data（child element data model is the same as root node structure）
        id: 'leaf',
      },
    ],
  },
];
```

#### container

You need to import DOM container or container ID. {domObject || string},  required

#### width

Canvas width, unit pixel {number}, optional

#### height

Canvas height, unit pixel {number}, optional

#### fitview

Initialize viewport area {string} , optional
The candidate values are: 'tl', 'lc', 'bl', 'cc', 'tc', 'tr', 'rc', 'br', 'bc', 'autoZoom'

<img src="//cdn.nlark.com/lark/0/2018/png/124533/1532954651334-8286b350-7e04-4b56-84ec-fc0182e1bf32.png" width="300px"/>

#### fitViewPadding

Viewport adaptation canvas margins {boolean | number | number[]}  optional
<img src="//cdn.nlark.com/lark/0/2018/png/1140/1533632218107-1822dab0-9499-41cb-8fb4-cfb4843637ec.png" width="300px"/>

#### animate

Whether to open animation {boolean} default to false

#### minZoom

Minimum zoom ratio {number} default value is 0.2

#### maxZoom

Maximum zoom ratio {number} default value is 10

#### plugins

Plug-in set {array} It is used to extend layout or mapping relationship.The examples are as follows

```
// Plug-in - layout -  Archimedes spiral
var Plugin = G6.Plugins["layout.circle"];
// Plugin - layout - round
var Plugin = G6.Plugins["layout.archimeddeanSpiral"];
// Plug-in - template - maximum spanning forest
var Plugin = G6.Plugins["template.maxSpanningForest"];
// Plug-in - thumbnail
var Plugin = G6.Plugins["tool.minimap"];
var plugin = new Plugin({
  container: 'minimap',
  width: 180,
  height: 120
});

var graph = new G6.Graph({
  container: 'mountNode',
  fitView: 'cc',
  height: window.innerHeight,
  plugins: [new Plugin()]
});
```

#### layout

Layout parameters {object|function}
See the details from the method of Layouts

#### Event

```javascript
const graph = {
  type: 'graph',
  data,
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
  },
};
```

```
  onClick?: func; mouse click
  onAfterchange?: func; After data change
  onMousedown?: func; mouse down
  onMousemove?: func; mouse click
  onMouseleave?: func; mouse leaves the canvas area.
  onMouseup?: func; mouse up
  onDblclick?: func; mouse double click
  onTouchstart?: func; finger touch
  onTouchmove?: func; finger move
  onTouchend?: func; finger leave
  onPlotenter?: func; when entering charts
  onPlotmove?: func; when moving on the chart
  onPlotleave?: func; when leaving from the chart
  onPlotclick?: func; when click the chart
  onPlotdblclick?: func; when double click the chart
  onDragstart?: func; when dragging starts
  onDrag?: func; dragging
  onDragend?: func; when dragging end
```

#### Event callback function parameters

ev: dom , Node related information
graph: Configuration parameter related information

### zoom Canvas scaling

#### min?: number;

Minimum zoom ratio

#### max?: number;

Maximum zoom ratio

#### current?: number;

current zoom ratio

```javascript
const zoom = {
  max: 10,
  min: 1,
  current: 2,
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph}>
          <Zoom {...zoom} />
        </Graph>
      </div>
    );
  }
}
```

### Node

#### shape?: string;

the shape of node

#### size?: number;

the size of node

#### label?: (obj: any) => {};

the label of node

#### style?: any;

the style of node

```javascript
const node = {
  shape: 'treeNode',
  size: 8,
  label: function(obj) {
    return obj.name;
  },
  style: {
    fill: 'red',
    stroke: 'blue',
  },
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph}>
          <Node {...node} />
        </Graph>
      </div>
    );
  }
}
```

### Edge

#### shape?: string;Edge shape

#### style?: any;Edge style

```javascript
const edge = {
  shape: 'smooth',
  style: {
    stroke: 'blue',
  },
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph}>
          <Edge {...Edge} />
        </Graph>
      </div>
    );
  }
}
```

It can be seen in detail: https://antv.alipay.com/zh-cn/g6/1.x/api/graph.html
