<template>
  <v-card>
    <v-card-title>{{ title }}: {{  total }}</v-card-title>
    <!-- Utiliza el componente vue-apexcharts -->
    <apexchart type="radialBar" :options="chartOptions" :series="chartSeries" />
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartColor: {
      type: String,
      default: '#2196F3', // Color predeterminado si no se proporciona
    },
    total: {
      type: Number
    },
    title: {
      type: String,
      default: '',
    },
    chartSeries: {
      type: Array,
      default: () => [50], // Valor inicial (ajusta según sea necesario)
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: `1%`,
              margin: 1, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              /*
              value: {
                offsetY: -2,
                fontSize: '22px'
              },
              */
              value: {
              // ... otras configuraciones ...
              barHeight: 45, // Ajusta el valor según tus necesidades
            },
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
          },
        },
      },
      labels: ['Average Results'],
      /*
      chartSeries: [50], // Valor inicial (ajusta según sea necesario)
      */
    };
  },
  watch: {
    total: function(newTotal) {
      // Ajusta el ancho de la barra radial en función del nuevo total
      this.chartOptions.plotOptions.radialBar.track.strokeWidth = `${newTotal}%`;
    },
  },
};
</script>
