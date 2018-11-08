<template>
  <div v-if="data.length">
    <v-chart
      :forceFit="true"
      height="440"
      :data="dv"
    >
      <v-coord type="polar"></v-coord>
      <v-tooltip :showTitle="false"></v-tooltip>
      <v-polygon position="_x*_y" color="value" :label="label"></v-polygon>
    </v-chart>
  </div>
</template>

<script>

export default {
  mounted(){
    $.getJSON('/assets/data/voronoi.json',data=>{
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
        type: 'diagram.voronoi',
        fields: ['x', 'y'],
        size: [800, 600],
        as: ['_x', '_y']
      });
      this.dv=dv;
    },
  },
  data() {
    return {
      data:[],
      ds:{},
      dv:{},
      label:['value', {
        offset: 0,
        textStyle: {
          fill: '#fff',
          fontSize: '12',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      }]
    };
  }
};
</script>

