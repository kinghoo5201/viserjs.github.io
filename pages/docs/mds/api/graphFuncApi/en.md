# Viser-graph Method Api

## Layouts

Layouts provides centralized layout as well as custom layout.

#### Compact tree: Layouts.CompactBoxTree

```javascript
var layout = new Layouts.CompactBoxTree({
  // direction: 'LR', // direction（LR/RL/H/TB/BT/V）
  getHGap: function getHGap() {
    return 100; // horizontal spacing
  },
  getVGap: function getVGap() {
    return 10; // vertical spacing
  },
});
```

<img src="//cdn.nlark.com/lark/0/2018/png/124533/1533110599036-a9c03524-6ddd-4ffb-a498-4c6b328e64cf.png" width="500px"/>

#### Dendrogram: Layouts.Dendrogram

```javascript
var layout = new Layouts.Dendrogram({
  direction: 'LR',
  nodeSize: 20,
  rankSep: 400,
});
```

<img src="//cdn.nlark.com/lark/0/2018/png/124533/1533110637920-cc576981-0da8-4b86-a362-8a1d85fa2489.png" width="500px"/>

#### Ecological tree: Layouts.IndentedTree

```javascript
var layout = new Layouts.IndentedTree({
  direction: 'LR', // direction（LR/RL/H）
  indent: 30, // indent
  getVGap: function getVGap() {
    return 4; // vertical spacing
  },
});
```

<img src="//cdn.nlark.com/lark/0/2018/png/124533/1533110689020-a0719ae1-30b2-4565-b2bd-21a2e3accc46.png" width="300px"/>

#### Mindmap:Layouts.Mindmap

```javascript
var layout = new Layouts.Mindmap({
  direction: 'H', // direction（LR/RL/H/TB/BT/V）
  getHGap: function getHGap() {
    return 100; // horizontal spacing
  },
  getVGap: function getVGap() {
    return 10; // vertical spacing
  },
});
```

<img src="//cdn.nlark.com/lark/0/2018/png/124533/1533110746761-1770f71e-aa46-4da4-a8fb-d8b2e7c3be29.png" width="500px"/>

#### Layout Common parameter list

```
direction [String] The direction of tree layout.default to LR,The optional value is LR.（The root node is left and to right layout） RL（The root node is in the right and to left layout） H（The root node is in the middle, horizontally symmetrical layout）
   TB（The root node is up and to down layout） BT（The root node is down and to up layout） V（The root node is in the middle, and vertical symmetry layout）
   Layout.IndentedTree only ahs the first three directions. That is LR / RL / H
getHGap [Function|Number] Horizontal distance, default 18
getVGap [Function|Number] Vertical distance, default 18
```

#### Special parameter list

Dendrogram

```
nodeSep  [Function|Number] Node spacing
nodeSize  [Function|Number] Node size
rankSep  rank spacing
subTreeSep   Subtree spacing
```

IndentedTree

```
indent  [Function|Number] indent
```

It can be seen in detail: https://antv.alipay.com/zh-cn/g6/1.x/api/layouts.html

### registerNode

Registration of new nodes

```
// common nodes
registerNode(name, {
  draw: (item) =>{},
  drawKeyShape:(item) =>{},
  drawLabel: (item) =>{},
  getSize: (item) =>{},
  getColor:(item) =>{},
  getStyle: (item) =>{},
  getPath:(item) =>{},
  getLabel: (item) =>{},
  afterDraw: (item) =>{},
  enterAnimate: (item) =>{},
  leaveAnimate: (item) =>{},
  drawText: (item) =>{},
  getText: (item) =>{},
  anchor: [
    [ 0, 0.5 ],
    [ 1, 0.5 ]
  ],
  anchor: {
    type: 'rect'
  },
});
// html nodes
registerNode('html', {
  cssSize: true,
  draw: (item) =>{},
  getHtml: (item) =>{},
});
registerNode('treeNode', {
    anchor: [[0, 0.5], [1, 0.5]]
});
```

### registerEdge

Registrate edge

```
registerEdge(name, {
  draw: (item) =>{},
  drawKeyShape:(item) =>{},
  drawLabel: (item) =>{},
  getSize: (item) =>{},
  getColor:(item) =>{},
  getStyle: (item) =>{},
  getPath:(item) =>{},
  getLabel: (item) =>{},
  afterDraw:  (item) =>{},
});
```

Example:

```
registerEdge('smooth', {
  getPath: function getPath(item) {
    var points = item.getPoints();
    var start = points[0];
    var end = points[points.length - 1];
    var hgap = Math.abs(end.x - start.x);
    if (end.x > start.x) {
        return [['M', start.x, start.y], ['C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y]];
    }
    return [['M', start.x, start.y], ['C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y]];
  }
});
```

### registerGroup

Registrate group

```
registerGroup(name, {
  draw: (item) =>{},
  drawKeyShape:(item) =>{},
  drawLabel: (item) =>{},
  drawExpanded:  (item) =>{},
  drawCollapsed:  (item) =>{},
  getLabel: (item) =>{},
});
```
