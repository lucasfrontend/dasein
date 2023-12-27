<template>
  <v-container>
    <v-card v-if="dataLoaded">
      <apexchart type="donut" :options="chartOptions" :series="chartSeries" />
    </v-card>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    chartData: {
      type: Array, // Asegúrate de ajustar el tipo de dato según la estructura de tus datos
      //required: true
    },
    /*
    dataLoaded: {
      type: Boolean,
      //required: true
    }
    */
  },
  data() {
    return {
      loading: false,
      chartOptions: {
        labels: ['Jairo', 'Barri', 'May'],
        legend: {
          show: true,
          position: 'bottom'
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return val.toString();
          }
        },
        colors: ['#EF5350', '#FFCA28', '#66BB6A', '#EF5350', '#FFCA28', '#66BB6A'],
        
        //enabled: false,
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true
                },
                formatter: function (val) {
                  return val.toString();
                }
              }
            }
          }
        }
      },
      chartSeries: [4, 5, 6],
      dataLoaded: true
    }
  }
}
</script>
