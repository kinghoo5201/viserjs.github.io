"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var viser_react_1 = require("viser-react");
var React = require("react");
var DataSet = require('@antv/data-set');
var sourceData = [
    { x: '职业 A', low: 20000, q1: 26000, median: 27000, q3: 32000, high: 38000, outliers: [50000, 52000] },
    { x: '职业 B', low: 40000, q1: 49000, median: 62000, q3: 73000, high: 88000, outliers: [32000, 29000, 106000] },
    { x: '职业 C', low: 52000, q1: 59000, median: 65000, q3: 74000, high: 83000, outliers: [91000] },
    { x: '职业 D', low: 58000, q1: 96000, median: 130000, q3: 170000, high: 200000, outliers: [42000, 210000, 215000] },
    { x: '职业 E', low: 24000, q1: 28000, median: 32000, q3: 38000, high: 42000, outliers: [48000] },
    { x: '职业 F', low: 47000, q1: 56000, median: 69000, q3: 85000, high: 100000, outliers: [110000, 115000, 32000] },
    { x: '职业 G', low: 64000, q1: 74000, median: 83000, q3: 93000, high: 100000, outliers: [110000] },
    { x: '职业 H', low: 67000, q1: 72000, median: 84000, q3: 95000, high: 110000, outliers: [57000, 54000] }
];
var dv = new DataSet.View().source(sourceData);
dv.transform({
    type: 'map',
    callback: function (obj) {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
    }
});
var data = dv.rows;
var scale = [{
        dataKey: 'range',
        min: 0,
        max: 240000,
    }, {
        dataKey: 'outliers',
        min: 0,
        max: 240000,
    }];
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        var tooltipOpts = {
            showTitle: false,
            crosshairs: {
                type: 'rect'
            },
            itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
                + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
                + '{name}<br/>'
                + '<span style="padding-left: 16px">最大值：{high}</span><br/>'
                + '<span style="padding-left: 16px">上四分位数：{q3}</span><br/>'
                + '<span style="padding-left: 16px">中位数：{median}</span><br/>'
                + '<span style="padding-left: 16px">下四分位数：{q1}</span><br/>'
                + '<span style="padding-left: 16px">最小值：{low}</span><br/>'
                + '</li>'
        };
        var boxStyle = {
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3
        };
        var boxTooltip = ['x*low*q1*median*q3*high', function (x, low, q1, median, q3, high) {
                return {
                    name: x,
                    low: low,
                    q1: q1,
                    median: median,
                    q3: q3,
                    high: high
                };
            }];
        return (React.createElement("div", null,
            React.createElement(viser_react_1.Chart, { forceFit: true, height: 400, data: data, scale: scale },
                React.createElement(viser_react_1.Tooltip, __assign({}, tooltipOpts)),
                React.createElement(viser_react_1.Axis, null),
                React.createElement(viser_react_1.Box, { position: "x*range", style: boxStyle, tooltip: boxTooltip }),
                React.createElement(viser_react_1.View, { data: data, scale: scale },
                    React.createElement(viser_react_1.Point, { position: "x*outliers", size: 3, active: false, shape: "circle" })))));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=react.js.map