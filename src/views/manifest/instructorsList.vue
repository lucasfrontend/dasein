<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="instructors"
      :loading="loading"
      item-key="_id"
      class="elevation-1"
      :no-data-text="'No hay datos disponibles'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="custom-font pink--text" style="font-size: 1.8rem;">Instructores</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <router-link :to="{ name: 'instructorsForm', params: { id: item._id } }">
          <v-btn class="mr-2">
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-data-table>
    <!--
    <v-btn color="black" dark fab bottom right class="mt-5 yellow--text" to="/manifest/instructorsForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    -->
  </v-container>
</template>

<script>  
export default {
  name: 'instructorsList',
  data () {
    return {
      loading: false,
      instructors: [],
      headers: [
        { text: 'Nombre', value: 'first_name' },
        { text: 'Apellido', value: 'last_name' },
        { text: '', value: 'action', sortable: false }
      ]
    }
  },
  created () {
    this.getinstructors()
    //this.getUsersInstructors()
  },
  methods: {
    getUsersInstructors(){
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_INSTRUCTORS}`)
        .then(response => {
        this.instructors = response.data.payload;
        this.loading = false;
        //
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        //
        });
    },
    getinstructors() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_INSTRUCTORS}`)
        .then(response => {
        this.instructors = response.data.payload;
        console.log("this.instructors:", response.data.payload)
        this.loading = false;
        //
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        //
        });
    },
  }
}
</script>
