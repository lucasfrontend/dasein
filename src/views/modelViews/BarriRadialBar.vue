<template>
  <v-card>
    <div>
    <apexchart ref="chart" :options="chartOptions" :series="chartSeries" type="radialBar" height="390" />
  </div>
    <v-expansion-panels>
      <v-expansion-panel class="elevation-0 rounded-top-0">
        <v-expansion-panel-header>
          <div>
            <span class="px-2 custom-font pink--text pa-0 ma-0" style="font-size: 1.6rem;">{{ title }}</span>
            <span class="px-2 custom-font green--text pa-0 ma-0" style="font-size: 1.6rem;"><v-icon size="40" color="green">mdi-currency-usd</v-icon>{{ total }}</span>
            
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex flex-column">
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas de escuela: <span class="pink--text">{{ sum }}</span></span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 5: <span class="pink--text">{{ sum5 }}</span></span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 8: <span class="pink--text">{{ sum8 }}</span></span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 10: <span class="pink--text">{{ sum10 }}</span></span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 12: <span class="pink--text">{{ sum12 }}</span></span>
            <!--
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Slots free: <span class="pink--text"></span></span>
            -->
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
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'Donut Chart',
    },
    total: {
      type: Number,
      default: 0,
    },
    totalSlots: {
      type: Array,
      required: true,
    },
    sum: {
      type: Number,
      default: 0,
    },
    sum5: {
      type: Number,
      default: 0,
    },
    sum8: {
      type: Number,
      default: 0,
    },
    sum10: {
      type: Number,
      default: 0,
    },
    sum12: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 390,
          type: 'radialBar',
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: (val, { dataPointIndex }) => {
              const seriesValue = val;
              const slotValue = this.totalSlots ? this.totalSlots[dataPointIndex] : undefined; // Obtener el valor del array totalSlots

              return `$${seriesValue} USD | Cantidad de Slots: ${slotValue !== undefined ? slotValue : 'N/A'}`; // Manejar el caso en que slotValue sea undefined
            },
          },
          marker: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Slots 5k', 'Slots 8k', 'Slots 10k', 'Slots 12k'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 100,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + ' $USD';
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
          // Agrega más breakpoints según sea necesario
        ],
      },
    };
  },
  mounted() {
    this.$refs.chart.updateOptions(this.chartOptions);
  },
};
</script>
