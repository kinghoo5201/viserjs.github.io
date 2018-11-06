<template>
  <div>
    <v-chart force-fit="true" :height="height" :padding="padding" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis dataKey="vote"/>
      <v-interval position="name*vote" :color="['name',['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']]"/>
        <v-point position="name*vote" :size="size" :shape="['name', name => ['image',imageMap[name]]]"/>
    </v-chart>
  </div>
</template>

<script>
const data = [{
  "name": "John",
  "vote": 35654
}, {
  "name": "Damon",
  "vote": 65456
}, {
  "name": "Patrick",
  "vote": 45724
}, {
  "name": "Mark",
  "vote": 13654
}];

const imageMap = {
  'John': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
  'Damon': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
  'Patrick': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
  'Mark': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
};

const scale = [{
  dataKey: 'vote',
  min: 0
}];

export default {
  data() {
    return {
      data,
      height: 400,
      scale,
      padding: [60,40,40,60],
      size: 60,
      imageMap
    };
  }
};
</script>
