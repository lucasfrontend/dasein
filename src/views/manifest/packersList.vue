<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="custom-font pink--text" style="font-size: 1.8rem;">Listado de Packers</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="headers" :loading="loading" :items="packers" class="elevation-1" :no-data-text="'No hay datos disponibles'">
        <template v-slot:item.actions="{ item }">
          <router-link :to="{ name: 'packersForm', params: { id: item._id } }">
            <v-btn class="mr-2">
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
    <v-btn color="yellow" dark fab class="black--text mt-5" to="/manifest/packersForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'packersList',
  data () {
    return {
      loading: false,
      packers: [],
      headers: [
        { text: 'Nombre', value: 'first_name' },
        { text: 'Apellido', value: 'last_name' },
        // Agrega aquí cualquier otra columna que quieras mostrar
        { text: '', value: 'actions', sortable: false },
      ]
    }
  },
  created () {
    this.getpackers()
  },
  methods: {
    getpackers() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_PACKERS}`)
        .then(response => {
          this.packers = response.data.payload;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        });
    },
  }
}
</script>
