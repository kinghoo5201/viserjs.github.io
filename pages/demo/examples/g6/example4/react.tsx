import { Graph, Node, Edge, registerNode, registerEdge, Layouts } from 'viser-graph-react';
import * as React from 'react';
const data = {
  "name": "Modeling Methods",
  "children": [
    {
      "name": "Classification",
      "children": [
        {
          "name": "Logistic regression"
        },
        {
          "name": "Linear discriminant analysis"
        },
        {
          "name": "Rules"
        },
        {
          "name": "Decision trees"
        },
        {
          "name": "Naive Bayes"
        },
        {
          "name": "K nearest neighbor"
        },
        {
          "name": "Probabilistic neural network"
        },
        {
          "name": "Support vector machine"
        }
      ]
    },
    {
      "name": "Consensus",
      "children": [
        {
          "name": "Models diversity",
          "children": [
            {
              "name": "Different initializations"
            },
            {
              "name": "Different parameter choices"
            },
            {
              "name": "Different architectures"
            },
            {
              "name": "Different modeling methods"
            },
            {
              "name": "Different training sets"
            },
            {
              "name": "Different feature sets"
            }
          ]
        },
        {
          "name": "Methods",
          "children": [
            {
              "name": "Classifier selection"
            },
            {
              "name": "Classifier fusion"
            }
          ]
        },
        {
          "name": "Common",
          "children": [
            {
              "name": "Bagging"
            },
            {
              "name": "Boosting"
            },
            {
              "name": "AdaBoost"
            }
          ]
        }
      ]
    },
    {
      "name": "Regression",
      "children": [
        {
          "name": "Multiple linear regression"
        },
        {
          "name": "Partial least squares"
        },
        {
          "name": "Multi-layer feedforward neural network"
        },
        {
          "name": "General regression neural network"
        },
        {
          "name": "Support vector regression"
        }
      ]
    }
  ]
};

// 注册脑图节点
registerNode('mindNode', {
  anchor: [[0, 0.5], [1, 0.5]]
});
// 注册脑图边
registerEdge('mindEdge', {
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

var layout = new Layouts.Mindmap({
  direction: 'H', // 方向（LR/RL/H/TB/BT/V）
  getHGap: function getHGap() /* d */ {
    // 横向间距
    return 100;
  },
  getVGap: function getVGap() /* d */ {
    // 竖向间距
    return 10;
  }
});

const graph = {
  container: 'mount',
  width: 500,
  height: 500,
  fitView: 'autoZoom',
  fitViewPadding: true,
  animate: true,
  type: 'tree',
  layout: layout,
  data: {
    roots: [data]
  },
  onAfterchange: function (ev, graph) {
    graph.getNodes().forEach(function (node) {
      var model = node.getModel();
      var label = node.getLabel();
      var keyShape = node.getKeyShape();
      var parent = node.getParent();
      var box = keyShape.getBBox();
      var labelBox = label.getBBox();
      var dx = (box.maxX - box.minX + labelBox.maxX - labelBox.minX) / 2 + 8;
      var dy = (box.maxY - box.minY) / 2 + 8;
      if (parent) {
        var parentModel = parent.getModel();
        if (parentModel.x > model.x) {
          dx = -dx;
        }
        dy = 0;
      } else {
        dx = 0;
      }
      label.translate(dx, dy);
    });
    graph.draw();
  }
};

const node = {
  size: 8,
  shape: 'mindNode',
  label: function label(model) {
    return {
      text: model.name,
      stroke: '#fff',
      lineWidth: 3
    };
  },
};

const edge = {
  shape: 'mindEdge'
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
          <Edge {...edge} />
        </Graph>
      </div>
    );
  }
}
