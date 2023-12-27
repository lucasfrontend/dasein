<template>
  <v-app>
    <v-container>
      <!-- Tabla para mostrar datos de precios -->
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Precios</v-card-title>
          <v-data-table
            :headers="pricesHeaders"
            class="elevation-1"
            :items="pricesData"
          >
            <!-- Utiliza una ranura para mostrar la palabra correspondiente -->
            <template v-slot:item.typeAlt="{ item }">
              {{ getTypeAltWord(item.typeAlt) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-row>
        <v-col cols="6" v-for="(pilotData, index) in pilots" :key="index">
          <v-card class="mb-4">
            <v-card-title>Vuelos: {{ pilotData.pilotName }} <v-btn>Pagar</v-btn></v-card-title>
            <v-data-table
              :headers="headers"
              class="elevation-1"
              :items="pilotData.payload"
            >
            <template v-slot:item.altitude="{ item }">
              {{ getTypeAltWord(item.altitude) }}
            </template>
          </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'pilotsList',
  data() {
    return {
      loading: false,
      pricesHeaders: [
        { text: 'altura', value: 'typeAlt' },
        { text: 'Precio ARG', value: 'value' },
      ],
      pricesData: [],
      headers: [
        { text: 'Altitud', value: 'altitude' },
        { text: 'Cantidad', value: 'count' },
        { text: 'ARG', value: 'arg' },
      ],
      pricesPaymentPilots: [],
      pilots: [], // Almacenar datos de todos los pilotos
    };
  },
  created() {
    this.getPrices();
    this.getPilots();
  },
  computed: {
    getTypeAltWord() {
      return (typeAlt) => {
        switch (typeAlt) {
          case 1:
            return '5.000 ft';
          case 2:
            return '8.000 ft';
          case 3:
            return '10000 ft';
          case 4:
            return '12.000 ft';
          default:
            return 'S/D';
        }
      };
    }
  },
  methods: {
    getPrices() {
      this.loading = true;
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=4`)
        .then((response) => {
          this.pricesData = response.data.payload;
          console.log("this.pricesData", this.pricesData)
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    getPilots() {
      this.loading = true;
      this.$http.get(`process.env.VUE_APP_PILOTS`)
        .then(response => {
          console.log("response.data", response.data);
          let pilots = response.data.payload;
          this.loading = false;

          pilots.forEach(pilot => {
            console.log("id del pilot desde getPilots:", pilot._id)
            console.log("alias del pilot getPilots:", pilot.alias)
            this.getTotalpilots(pilot._id); // Pasar el ID del piloto
            console.log("this.pilots esssssssÑÑÑÑ", this.pilots)
          });
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    getTotalpilots(pilotId) {
      this.$http.get(`${process.env.VUE_APP_PILOTS}/countPilots/${pilotId}`)
        .then(response => {
          let pilotName = response.data.pilotName ? response.data.pilotName : 'S/D'; // Nombre del piloto obtenido de la respuesta
          let payload = response.data.payload;

          this.pilots.push({ pilotName, payload });
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  }
};
</script>
