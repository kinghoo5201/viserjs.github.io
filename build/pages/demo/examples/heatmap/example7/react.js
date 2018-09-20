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
var $ = require("jquery");
var DataSet = require('@antv/data-set');
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: [],
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        $.getJSON('/assets/data/heatmap-7.json', function (sourceData) {
            var ds = new DataSet({
                state: {
                    sizeEncoding: false
                }
            });
            var dv = ds.createView().source(sourceData);
            dv.transform({
                sizeByCount: '$state.sizeEncoding',
                type: 'bin.hexagon',
                fields: ['x', 'y'],
                bins: [10, 5],
            });
            _this.setState({ data: dv.rows });
        });
    };
    App.prototype.render = function () {
        var data = this.state.data;
        var axis1Opts = {
            dataKey: 'x',
            grid: {
                lineStyle: {
                    stroke: '#d9d9d9',
                    lineWidth: 1,
                    lineDash: [2, 2]
                }
            }
        };
        var seriesOpts = {
            quickType: 'polygon',
            color: ['count', '#BAE7FF-#1890FF-#0050B3'],
            position: 'x*y',
            style: {
                lineWidth: 1,
                stroke: '#fff'
            }
        };
        return (React.createElement("div", null,
            React.createElement(viser_react_1.Chart, { forceFit: true, height: 400, data: data },
                React.createElement(viser_react_1.Legend, { offset: 40 }),
                React.createElement(viser_react_1.Tooltip, { showTitle: false, crosshairs: false }),
                React.createElement(viser_react_1.Axis, __assign({}, axis1Opts)),
                React.createElement(viser_react_1.Polygon, __assign({}, seriesOpts)))));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=react.js.map