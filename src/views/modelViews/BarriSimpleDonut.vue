<template>
  <v-card>
    <div>
      <apexchart type="donut" :options="chartOptions" :series="chartSeries" height="300"></apexchart>
    </div>
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
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Plazas Deportivos: <span class="pink--text">{{ sum }}</span></span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Slots free: <span class="pink--text">{{ free }}</span></span>
            <span class="px-2 custom-font grey--text pa-0 ma-0" >Cantidad de Coach, poner contador: <span class="pink--text">s/d</span></span>
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
    free: {
      type: Number,
      default: 0,
    },
    sum: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      arregloTest: [1, 4, 7, 9],
      chartOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        tooltip: {
          y: {
            formatter: (val, { dataPointIndex }) => {
              const seriesValue = val;
              const slotValue = this.totalSlots ? this.totalSlots[dataPointIndex] : undefined; // Obtener el valor del array totalSlots

              return `$${seriesValue} USD | Cantidad de Slots: ${slotValue !== undefined ? slotValue : 'N/A'}`; // Manejar el caso en que slotValue sea undefined
            },
          },
          /* esta casi funciona
          y: {
            formatter: function (val, { dataPointIndex }) {
            const seriesValue = val;
            const totalSlots = this.totalSlots || []; // Asegurarse de que totalSlots esté definido
            const slotValue = totalSlots[dataPointIndex]; // Obtener el valor del array totalSlots

            return `$${seriesValue} USD | Slot: ${slotValue || 'N/A'}`; // Manejar el caso en que slotValue sea undefined
          }.bind(this),
          },*/
        },
        // ????????????  
        annotations: {
          points: [{
            x: 50, // Coordenada x en porcentaje (centro del gráfico)
            y: 50, // Coordenada y en porcentaje (centro del gráfico)
            label: {
              text: 'Texto',
              offsetY: 0,
              style: {
                fontSize: '16px',
                color: '#000000', // Color del texto
              },
            },
          }],
        },
        dataLabels: {
          /*
          formatter: function (val) {
            return `$${Math.round(val)} USDdddd`;
          },*/
          value: {
            show: false, // Esto oculta el porcentaje
          },
        },
        labels: ['Staff VIP', 'Staff', 'Socios', 'No Socios', 'Jubilados', 'Coachs', 'paquete 1'],
        //labels: ['Staff VIP', 'Staff', 'Socios', 'No Socios', 'Jubilados'].map(label => `$${label} USD`),
        colors: ["#ffeb3b", "#ff9800", "#4CAF50", "#9c27b0", '#808080', '#ff9e6e'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        }
      }
    };
  },
};
</script>

<style scoped>
.centered-text {
  position: absolute;
  z-index: 100;
  top: 40%;
  left: 40%;
  transform: translate(-25%, -25%);
  font-size: 1.6rem;
}
</style>