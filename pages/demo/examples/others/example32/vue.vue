<template>
  <div v-if="data.length">
    <v-chart
      :forceFit="true"
      height="400"
      :data="dv"
    >
      <v-legend 
        offset="40"
      >
      </v-legend>
      <v-tooltip :showTitle="false" :crosshairs="false"></v-tooltip>
      <v-axis dataKey="x" :grid="grid"></v-axis>
      <v-polygon position="x*y" :color="color" :style="style"></v-polygon>
    </v-chart>
  </div>
</template>

<script>

export default {
  mounted(){
    $.getJSON('/assets/data/gaussion-distribution.json',data=>{
      const ds = new DataSet();
      this.$data.data=data;
      this.$data.ds=ds;
      this.getDv();
    });
  },
  methods:{
    getDv(){
      const {ds,data}=this;
      const dv = ds.createView();
      dv.source(data).transform({
        sizeByCount: true, 
        type: 'bin.hexagon',
        fields: ['x', 'y'], 
        bins: [10, 5]
      });
      this.dv=dv;
    },
  },
  data() {
    return {
      data:[],
      ds:{},
      dv:{},
      color:['count', '#BAE7FF-#1890FF-#0050B3'],
      style:{
        lineWidth: 1,
        stroke: '#fff'
      },
      grid:{
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [2, 2]
        }
      }
    };
  }
};
</script>

