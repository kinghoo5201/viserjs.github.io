<template>
    <div>
        <v-chart :forceFit="true" :height="height" :data="data" :padding="padding">
            <v-point position="x*y" :shape="shape" :size="size" color="name"></v-point>
        </v-chart>
    </div>
</template>

<script>
const DataSet = require('@antv/data-set');

const data = [{
  name: 'Internet Explorer',
  value: 26
}, {
  name: 'Chrome',
  value: 40
}, {
  name: 'Firefox',
  value: 30
}, {
  name: 'Safari',
  value: 24
}, {
  name: 'Opera',
  value: 15
}, {
  name: 'Undetectable',
  value: 8
}];
const imageMap = {
  'Internet Explorer': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  Chrome: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  Firefox: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  Safari: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  Opera: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  Undetectable: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
};
const dv = new DataSet.View().source(data).transform({
  type: 'waffle',
  rows: 10
});

export default {
  data() {
    return {
      data: dv,
      height: 400,
      padding: [20],
      size: (window.innerHeight - 40) / 20,
      shape: ['name',name=>['image',imageMap[name]]]
    };
  }
};
</script>

