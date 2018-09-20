"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js");
require("reflect-metadata");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var viser_graph_ng_1 = require("viser-graph-ng");
var data_1 = require("./data");
// 注册脑图节点
viser_graph_ng_1.registerNode('mindNode', {
    anchor: [[0, 0.5], [1, 0.5]]
});
// 注册脑图边
viser_graph_ng_1.registerEdge('mindEdge', {
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
var layout = new viser_graph_ng_1.Layouts.Mindmap({
    direction: 'H',
    getHGap: function getHGap() {
        // 横向间距
        return 100;
    },
    getVGap: function getVGap() {
        // 竖向间距
        return 10;
    }
});
var graph = {
    container: 'mount',
    width: 500,
    height: 500,
    fitView: 'autoZoom',
    fitViewPadding: true,
    animate: true,
    type: 'tree',
    layout: layout,
    data: {
        roots: [data_1.data]
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
            }
            else {
                dx = 0;
            }
            label.translate(dx, dy);
        });
        graph.draw();
    }
};
var node = {
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
var edge = {
    shape: 'mindEdge'
};
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.graph = graph;
        this.node = node;
        this.edge = edge;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: '#mount',
            template: "\n  <div>\n    <v-graph [width]=\"graph.width\" [height]=\"graph.height\"\n      [fitView]=\"graph.fitView\" [fitViewPadding]=\"graph.fitViewPadding\"\n      [animate]=\"graph.animate\" [type]=\"graph.type\"\n      [layout]=\"graph.layout\"\n      [data]=\"graph.data\" [onAfterchange]=\"graph.onAfterchange\">\n      <v-node [shape]=\"node.shape\" [size]=\"node.size\" [label]=\"node.label\"></v-node>\n      <v-edge [shape]=\"edge.shape\"></v-edge>\n    </v-graph>\n  </div>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                viser_graph_ng_1.ViserGraphModule
            ],
            providers: [],
            bootstrap: [
                AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.default = AppModule;
//# sourceMappingURL=angular.js.map