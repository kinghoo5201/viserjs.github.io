"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkgMap = {
    //包名映射的变量名
    'viser-react': 'ViserReact',
    'viser-graph-react': 'ViserGraphReact',
    'viser-vue': 'ViserVue',
    'viser-graph-vue': 'ViserGraphVue'
};
exports.template = {
    react: "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <script crossorigin src=\"/assets/pkg/react.production.min.js\"></script>\n        <script crossorigin src=\"/assets/pkg/react-dom.production.min.js\"></script>\n        <script src=\"https://cdn.bootcss.com/babel-standalone/7.0.0-beta.3/babel.min.js\"></script>\n        <script src=\"/assets/pkg/viser-react.min.js\"></script>\n        <script src=\"/assets/pkg/jquery.min.js\"></script>\n        <script src=\"/assets/pkg/viser-graph-react.min.js\"></script>\n        <script src=\"/assets/pkg/lodash.core.min.js\"></script>\n        <script src=\"/assets/pkg/data-set.min.js\"></script>\n        <title>Document</title>\n        <style>*{margin:0;padding:0;}</style>\n    </head>\n    <body>\n    <div id=\"mount\"></div>\n    <script type=\"text/babel\">\n    {code}\n    </script>\n        \n    </body></html>",
    vue: "<html>\n    <head>\n    <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">\n    <title>Vue example</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <script src=\"https://cdn.bootcss.com/babel-standalone/7.0.0-beta.3/babel.min.js\"></script>\n    <script src=\"/assets/pkg/jquery.min.js\"></script>\n    <script src=\"/assets/pkg/vue.min.js\"></script>\n    <script src=\"/assets/pkg/data-set.min.js\"></script>\n    <script src=\"/assets/pkg/viser-vue.min.js\"></script>\n    <script src=\"/assets/pkg/viser-graph-vue.min.js\"></script>\n    <script src=\"/assets//pkg/jquery.min.js\"></script>\n    <script src=\"https://webapi.amap.com/maps?v=1.4.1&key=0d78256ea89beeb8c25d1cd047549d1f\"></script>\n    <script src=\"https://webapi.amap.com/ui/1.0/main.js?v=1.0.11\"></script>\n    <style type=\"text/css\">\n    * {\n        margin: 0;\n        padding: 0;\n    }\n    </style>\n    </head>\n    <body>\n    <div id=\"mount\"></div>\n    <script type=\"text/babel\">\n    Vue.use(ViserVue.default);\n    Vue.use(ViserGraphVue.default);\n    {variable}\n    new Vue({\n        el: '#mount',\n        template: `{template}`,\n        {exports}\n    })\n    </script>\n    </body>\n    </html>",
    angular: "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <script src=\"/assets/pkg/typescript.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/core-js@2.5.7/client/shim.min.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/zone.js@0.8.26/dist/zone.min.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/rxjs@5.2.0/bundles/Rx.min.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/@angular/core@5.0.1/bundles/core.umd.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/@angular/common@5.0.1/bundles/common.umd.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/@angular/compiler@5.0.1/bundles/compiler.umd.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/@angular/platform-browser@5.0.1/bundles/platform-browser.umd.js\"></script>\n        <script type=\"text/javascript\" src=\"https://unpkg.com/@angular/platform-browser-dynamic@5.0.1/bundles/platform-browser-dynamic.umd.js\"></script>\n        <script src=\"https://webapi.amap.com/maps?v=1.4.1&key=0d78256ea89beeb8c25d1cd047549d1f\"></script>\n        <script src=\"https://webapi.amap.com/ui/1.0/main.js?v=1.0.11\"></script>\n        <script src=\"/assets/pkg/viser-ng.min.js\"></script>\n        <title>Document</title>\n        <style>*{margin:0;padding:0;}</style>\n    </head>\n    <body>\n    <div id=\"mount\"></div>\n    <script type=\"text/typescript\">\n    {code}\n    </script>  \n    </body></html>"
};
//# sourceMappingURL=iframe-templage.js.map