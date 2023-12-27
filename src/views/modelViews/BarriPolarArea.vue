<template>
  <v-card>
    <v-card-title> {{ title }} </v-card-title>
    <apexchart :options="chartOptions" :series="chartSeries" type="polarArea" height="350" />
    
    <v-expansion-panels>
      <v-expansion-panel class="elevation-0 rounded-top-0">
        <v-expansion-panel-header>
          <div>
            <span class="px-2 custom-font pink--text pa-0 ma-0" style="font-size: 1.6rem;"> Total Tdms (slots)</span>
            <span class="px-2 custom-font green--text pa-0 ma-0" style="font-size: 1.6rem;"><v-icon size="40" color="green">mdi-currency-usd</v-icon>{{ totalData.totalUSD }} USD</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex flex-column">
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 8 Bautismos
              <span class="primary--text">{{ totalData.t_q_s8 }}</span><span class="pink--text"> ($ S/D USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 10 Bautismos: 
              <span class="primary--text">{{ totalData.t_q_s10 }}</span><span class="pink--text"> ($ S/D USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total plazas a 12 Bautismos: 
              <span class="primary--text">{{ totalData.t_q_s12 }}</span><span class="pink--text"> ($ S/d USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >asddd
              <span class="primary--text">S/D </span><span class="pink--text"> ($ S/D USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total etc: 
              <span class="primary--text"> S/D </span><span class="pink--text"> ($ S/D USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total etc: 
              <span class="primary--text"> S/D </span><span class="pink--text"> ($ S/D USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total etc: 
              <span class="primary--text"> S/D </span><span class="pink--text"> ($ S/D USD )</span>
            </span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Total etc: 
              <span class="primary--text"> S/D </span><span class="pink--text"> ($ S/D USD )</span>
            </span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

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
      default: 'S/D',
    },
    totalData: {
      type: Object
    },
    totalSlots: {
      type: Array,
      required: true,
    },
    free: {
      type: Number,
      default: 0,
    },
    sum: {
      type: Number,
      default: 0,
    },
    seriesUSD: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      chartOptions: {
        colors: ['#1ab7ea', '#0084ff', '#39539E'],
        labels: this.labels,
        //labels: Object.keys(this.data),
        //colors: this.colors,
        chart: {
          type: 'polarArea',
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: (val, { dataPointIndex }) => {
              const seriesUSD = this.seriesUSD;

              // Obtener el valor del punto de datos actual
              const seriesValue = seriesUSD[dataPointIndex];

              // Obtener el valor del array totalSlots
              const slotValue = this.totalSlots ? this.totalSlots[dataPointIndex] : undefined;

              return `$${seriesValue} USD | Cantidad de Slots: ${slotValue !== undefined ? slotValue : 'N/A'}`;
            },
          },
          marker: {
            show: false,
          },
        },
        stroke: {
          colors: ['#1ab7ea', '#0084ff', '#39539E'],
        },
        fill: {
          opacity: 0.8,
        },
        plotOptions: {
          // no funciona
          radialBar: {
            rings: {
              strokeWidth: 10, // Ancho del anillo
              strokeColor: '#FF0000', // Color del anillo
              fill: {
                colors: ['#FF0000', '#00FF00', '#0000FF'], // Colores de los anillos
              },
            },
          },
        },
        responsive: [
          {
            breakpoint: 800,
            options: {
              chart: {
                width: '100%', // Utilizar el ancho completo en pantallas pequeñas
              },
              legend: {
                position: 'bottom', // Mover la leyenda a la parte inferior en pantallas pequeñas
              },
            },
          },
        ],
      },
      
      //chartData: Object.values(this.data),
    };
  },
  watch: {
    data: {
      handler: 'updateChartData', // Aquí está el nombre del método que se ejecutará
      deep: true,
    },
    colors: {
      handler: 'updateChartColors', // Aquí está el nombre del método que se ejecutará
    },
  },
  methods: {
    /*
    updateChartData() {
      this.chartOptions.labels = Object.keys(this.data);
      this.chartData = Object.values(this.data);
    },
    updateChartColors() {
      this.chartOptions.colors = this.colors;
    },
    updateOptions(options) {
      console.log(options)
      // Agrega los console.log para verificar los datos
      console.log("Etiquetas en chartOptions.labels:", this.chartOptions.labels);
      console.log("Datos en chartData:", this.chartData);

      // Lógica para actualizar las opciones del gráfico en el componente hijo
    },
    */
  }
};
</script>
