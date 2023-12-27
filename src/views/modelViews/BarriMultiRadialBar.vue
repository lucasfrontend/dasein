<!-- RadialBarChart.vue -->

<template>
  <apexchart :options="chartOptions" :series="chartSeries" type="radialBar" height="300"></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'; 

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartSeries: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'Radial Bar Chart',
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chartOptions: {
        background: '#F5F5F5',
        xaxis: {
          categories: ['Enero', 'Febrero', 'Marzo'],
        },
        yaxis: {
          max: 5, // 100 representa el 50% del rango total
        },
        plotOptions: {
          radialBar: {
            track: {
              background: '#F5F5F5',
              strokeWidth: '95%', // Ajusta el ancho de las barras
            },
            dataLabels: {
              // NO ANDA
              style: {
                fontSize: '500px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
              },
              total: {
                show: true,
                label: 'TANDAS',
                formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return `<div>${total} vuelos</div>`;
                },
              },
              value: {
                show: true,
                formatter: function (val) {
                  return `${val}`;
                },
              },
            },
          },
        },
        labels: ['5 k', '8 k', '10 k', '12 k'],
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        track: {
          background: '#00E396', // Color de fondo del gráfico
          strokeWidth: '100%', // Ancho de las barras
        yaxis: {
          max: 20, // Ajusta el rango total según tus necesidades
        },
      },
      },
    };
  },
};
</script>
