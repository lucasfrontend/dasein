<template>
  <v-card>
    <apexchart
      type="bar"
      height="400"
      :options="chartOptions"
      :series="chartSeriesData"
    />
    <v-expansion-panels>
      <v-expansion-panel class="elevation-0 rounded-top-0">
        <v-expansion-panel-header>
          <div>
            <span class="px-2 custom-font pink--text pa-0 ma-0" style="font-size: 1.6rem;">{{ title }}</span>
            <span class="px-2 custom-font green--text pa-0 ma-0" style="font-size: 1.6rem;"><v-icon size="40" color="green">mdi-currency-usd</v-icon>{{ total }} USD</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex flex-column">
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Equipos alquilados por Socios: 
              <span class="primary--text">{{ totalData.t_eq_so }}</span>
              <span class="pink--text"> ($ {{ totalData.t_eq_dep_soUSD }} USD )</span>
            </span>
            <span style="font-size: 0.7rem;" class="black--text pl-2">suma equipos alquilados por socios tanto de tipo escuela como deportivos (funciona solo si staff, staff vip y socios paguen lo mismo)</span>
            
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Equipos Deportivos No Socios: 
              <span class="primary--text">{{ totalData.t_eq_no }} </span><span class="pink--text"> ($ {{ totalData.t_eq_dep_noUSD }} USD )</span>
            </span>
            <span style="font-size: 0.7rem;" class="black--text pl-2">total cantidad de equipos alquilados NO SOCIOS, suma escuela y deportivos</span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Equipos Tandem Bautismos: 
              <span class="primary--text">{{ totalData.t_eq_tb }} </span><span class="pink--text"> ($ {{ totalData.eq_tdm_USD}} USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Equipos Tandem Alumno (no esta sumando en grafico): 
              <span class="primary--text">{{ totalData.t_eq_tal }} </span><span class="pink--text"> ($ {{ totalData.eq_tdm_alUSD }} USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Equipos alquilados por Alumnos: 
              <span class="primary--text"> {{ totalData.eq_stud }} </span><span class="pink--text"> ($ {{ totalData.t_eq2_3 }} USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Equipos free: 
              <span class="primary--text"> {{ totalData.t_free }} </span>
            </span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartSeries: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    total: { 
      type: Number,
      default: 0
    },
    totalData: {
      type: Object
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          stacked: true,
        },
        xaxis: {
          categories: Object.keys(this.chartSeries),
        },
        plotOptions: {
          bar: {
            columnWidth: '50%', // Ajusta según tus necesidades
          },
        },
        colors: this.colors,
      };
    },
    chartSeriesData() {
      const firstSeriesKey = Object.keys(this.chartSeries)[0];
      const categories = firstSeriesKey ? Object.keys(this.chartSeries[firstSeriesKey]) : [];
      return categories.map(category => ({
        name: category,
        data: Object.keys(this.chartSeries).map(owner => {
          const ownerData = this.chartSeries[owner];
          return ownerData ? ownerData[category] : 0;
        }),
      }));
    },
  },
};
</script>
