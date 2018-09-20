"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js");
require("reflect-metadata");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var viser_ng_1 = require("viser-ng");
var $ = require("jquery");
/**
 * 获取卡吉图数据点
 * @param  {Array} points 原始数据点
 * @param  {String} x x维度字段名
 * @param  {String} y y维度字段名
 * @return {Array} data 卡吉图数据点
 **/
function getKagiData(points, x, y) {
    // 初始最小值
    var min = points[0][y];
    // 初始最大值
    var max = points[0][y];
    // 初始绘制起点
    var start = points[0];
    // 阳线和阴线判断标志
    var isPos = points[1][y] >= points[0][y] ? true : false;
    // 初始绘制方向，1为向上，－1为向下
    var direction = isPos ? 1 : -1;
    // 阈值，默认为最大值的4%
    var maxValue = getMax(points, y);
    var threshold = maxValue * 0.04;
    // 阴线数组
    var negPath = [];
    // 阳线数组
    var posPath = [];
    var tmp1 = {};
    tmp1[x] = start[x];
    tmp1[y] = start[y];
    pushPoint(tmp1, isPos, posPath, negPath, x, y);
    if (points.length > 1) {
        for (var i = 0; i <= points.length - 1; i++) {
            // 浮动超过阈值时执行算法
            if (Math.abs(start[y] - points[i][y]) > threshold) {
                if (direction > 0) {
                    if (points[i][y] >= start[y]) {
                        isPos = getVerticalPoints(start, points[i], max, direction, negPath, posPath, isPos, x, y);
                        start[y] = points[i][y];
                    }
                    else {
                        var tmp2 = {};
                        tmp2[x] = points[i][x];
                        tmp2[y] = start[y];
                        pushPoint(tmp2, isPos, posPath, negPath, x, y);
                        start[x] = points[i][x];
                        direction = -1; // 转向
                        isPos = getVerticalPoints(start, points[i], min, direction, negPath, posPath, isPos, x, y);
                        max = start[y]; // 更新当前最高点
                        start = points[i]; // 更新当前绘制起点
                    }
                }
                else {
                    if (points[i][y] < start[y]) {
                        isPos = getVerticalPoints(start, points[i], min, direction, negPath, posPath, isPos, x, y);
                        start[y] = points[i][y];
                    }
                    else {
                        var tmp3 = {};
                        tmp3[x] = points[i][x];
                        tmp3[y] = start[y];
                        pushPoint(tmp3, isPos, posPath, negPath, x, y);
                        start[x] = points[i][x];
                        direction = 1;
                        isPos = getVerticalPoints(start, points[i], max, direction, negPath, posPath, isPos, x, y);
                        min = start[y]; // 更新当前最低点
                        start = points[i];
                    }
                }
            }
        }
    }
    return posPath.concat(negPath);
}
/**
 * 获取卡吉图垂直线数据点
 * @param  {Array} start 起点坐标
 * @param  {Array} end 终点坐标
 * @param  {Number} changePoint 转折点y坐标
 * @param  {Number} direction 绘制方向
 * @param  {Array} negPath 阴线数组
 * @param  {Array} posPath 阳线数组
 * @param  {Boolean} isPos 是否阳线标志位
 * @param  {String} x x维度字段名
 * @param  {String} y y维度字段名
 * @return  {Boolean} isPos 是否阳线标志位
 **/
function getVerticalPoints(start, end, changePoint, direction, negPath, posPath, isPos, x, y) {
    // 阳线和阴线相互转换的判断条件
    var condition = direction > 0 ? (end[y] > changePoint) && (start[y] < changePoint) && !isPos : (end[y] < changePoint) && (start[y] > changePoint) && isPos;
    var tmp1 = {};
    tmp1[x] = start[x];
    tmp1[y] = changePoint;
    var tmp2 = {};
    tmp2[x] = start[x];
    tmp2[y] = end[y];
    if (condition) {
        pushPoint(tmp1, isPos, posPath, negPath, x, y, true);
        isPos = isPos ? false : true;
        pushPoint(tmp2, isPos, posPath, negPath, x, y);
    }
    else {
        pushPoint(tmp2, isPos, posPath, negPath, x, y);
    }
    return isPos;
}
/**
 * 将卡吉图数据分别放入阳线数组和阴线数组
 * @param  {Object} point 当前数据点
 * @param  {Boolean} isPos 是否阳线标志位
 * @param  {Array} negPath 阴线数组
 * @param  {Array} posPath 阳线数组
 * @param  {String} x x维度字段名
 * @param  {String} y y维度字段名
 * @param  {Boolean} isChangePoint 是否转折点
 **/
function pushPoint(point, isPos, posPath, negPath, x, y, isChangePoint) {
    if (isChangePoint === void 0) { isChangePoint = false; }
    var tmpPoint = {};
    tmpPoint[x] = point[x];
    tmpPoint[y] = isChangePoint ? point[y] : null; // 转折点阳线和阴线都有数据，非转折点阳线或阴线的数据点为空
    if (isPos) {
        point.type = 'pos';
        posPath.push(point);
        tmpPoint.type = 'neg';
        negPath.push(tmpPoint);
    }
    else {
        point.type = 'neg';
        negPath.push(point);
        tmpPoint.type = 'pos';
        posPath.push(tmpPoint);
    }
}
function getMax(points, y) {
    var max = points[points.length - 1][y];
    if (points.length > 0) {
        for (var i = points.length - 1; i >= 0; i--) {
            max = points[i][y] > max ? points[i][y] : max;
        }
    }
    return max;
}
var scale = [{
        dataKey: 'date',
        type: 'cat',
        tickCount: 10,
        range: [0, 1]
    }];
var tooltipOpts = {
    crosshairs: {
        type: 'line'
    }
};
var pathOpts = {
    color: ['type', function (val) {
            if (val === 'pos') {
                return '#f04864';
            }
            return '#2fc25b';
        }],
    size: ['type', function (val) {
            if (val === 'pos') {
                return 2;
            }
            return 1;
        }],
};
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        var _this = this;
        this.forceFit = true;
        this.height = 400;
        this.data = [];
        this.scale = scale;
        this.tooltipOpts = tooltipOpts;
        this.pathOpts = pathOpts;
        $.getJSON('/assets/data/kagi.json', function (data) {
            _this.data = getKagiData(data, 'date', 'value');
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: '#mount',
            template: "\n  <div>\n    <v-chart [forceFit]=\"forceFit\" [height]=\"height\" [data]=\"data\" [scale]=\"scale\">\n      <v-tooltip [crosshairs]=\"tooltipOpts.crosshairs\"></v-tooltip>\n      <v-legend></v-legend>\n      <v-axis></v-axis>\n      <v-path position=\"date*value\" [color]=\"pathOpts.color\" [size]=\"pathOpts.size\"></v-path>\n    </v-chart>\n  </div>\n  "
        }),
        __metadata("design:paramtypes", [])
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
                viser_ng_1.ViserModule
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