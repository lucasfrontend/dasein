<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="pilots"
      item-key="_id"
      class="elevation-1"
      :no-data-text="'No hay datos disponibles'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="custom-font pink--text" style="font-size: 1.8rem;">Pilotos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link :to="{ name: 'pilotsForm', params: { id: item._id } }">
          <v-btn class="mr-2">
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-data-table>

    <v-btn color="primary" dark fab bottom right class="mt-5 black--text" to="/manifest/pilotsForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-container>
</template>





<script>
export default {
  name: 'pilotsList',
  data () {
    return {
      loading: false,
      pilots: [],
      headers: [
        {
          text: 'Nombre',
          value: 'first_name'
        },
        {
          text: 'Apellido',
          value: 'last_name'
        },
        {
          text: 'Horas',
          value: 'bal_h'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  created () {
    this.getpilots()
  },
  methods: {
    getpilots () {
      this.loading = true;
      
      this.$http.get(`${process.env.VUE_APP_PILOTS}`)
      //this.$http.get(`${process.env.VUE_APP_PILOTS}`)
        .then(response => {
          this.pilots = response.data.payload
          console.log("RESPUESTA GETPILOTS:", this.pilots)
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    }
  }
}
</script>
