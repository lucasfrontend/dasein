<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <span class="custom-font pink--text" style="font-size: 1.8rem;">Aviones</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table 
        :headers="headers" 
        :items="planes" 
        :loading="loading" 
        item-key="_id" 
        class="elevation-1" 
        :no-data-text="'No hay datos disponibles'"
      >

        <template v-slot:item.bal_h_h="{ item }">
          {{ item.bal_h_h.toFixed(2) }}
        </template>

        <template v-slot:item.bal_r_h="{ item }">
          {{ item.bal_r_h.toFixed(2) }}
        </template>

        <template v-slot:item.action="{ item }">
          <router-link :to="{ name: 'planesForm', params: { id: item._id } }">
            <v-btn class="mr-2">
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </template>
      </v-data-table>
      
    </v-card>
    <v-btn color="secondary" dark fab class="black--text mt-5" to="/manifest/planesForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>  
import { getData } from '../../utils/gets';
export default {
  name: 'planesList',
  data () {
    return {
      loading: false,
      planes: [],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Horas historial', value: 'bal_h_h' },
        { text: 'Horas reales', value: 'bal_r_h' },
        { text: '', value: 'action', sortable: false },
      ]
    }
  },
  created () {
    this.getplanes()
  },
  methods: {
    getplanes() {
      this.loading = true;
      const url = process.env.VUE_APP_PLANES;
      getData.call(this, url)
        .then(data => {
          this.planes = data;
          console.log("this.planes", this.planes);
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false;
        });
    }
    /*
    getplanes() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_PLANES}`)
        .then(response => {
          this.planes = response.data.payload;
          console.log("this.planes", this.planes)
          this.loading = false;
        })
        .catch(error => {
          console.log(error)
          this.loading = false;
        });
    },
    */
  }
}
</script>
