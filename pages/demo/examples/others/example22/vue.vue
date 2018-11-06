<template>
  <div>
    <v-chart force-fit="true" :height="height" :padding="padding" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis/>
      <v-interval position="name*value" color="name" :opacity="opciaty"/>
          <v-interval position="name*range" color="name" :size="size" shape="tick"/>
    </v-chart>
  </div>
</template>

<script>
const data = [{
  name: '类别一',
  value: 150,
  error: 6,
  range: []
}, {
  name: '类别二',
  value: 120,
  error: 10,
  range: []
}, {
  name: '类别三',
  value: 170,
  error: 5,
  range: []
}, {
  name: '类别四',
  value: 170,
  error: 5,
  range: []
}];

data.forEach(function(obj) {
  obj.range = [obj.value - obj.error, obj.value + obj.error];
});

const scale = [{
  dataKey: 'value',
  min: 0,
  max: 200
},{
  dataKey: 'range',
  min: 0,
  max: 200
}];

export default {
  data() {
    return {
      data,
      height: 400,
      scale,
      padding: [20,40,40,40],
      opciaty: 0.7,
      size: 40
    };
  }
};
</script>
