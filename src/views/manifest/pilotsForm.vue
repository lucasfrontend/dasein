<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>titulito dinamico</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
      <v-card>
        <v-card-text>
            <v-form ref="form" @submit.prevent="saveInstructor">
              <v-text-field label="Nombre" v-model="form.first_name" outlined dense required prepend-inner-icon="mdi-account"></v-text-field>
              <v-text-field label="Apellido" v-model="form.last_name" outlined dense required prepend-inner-icon="mdi-account-outline"></v-text-field>

              <v-btn color="black" dark type="submit" block @click="savePilot" :loading="loading">
                  <span class="yellow--text">Guardar</span>
              </v-btn>
              <v-btn v-if="id !== null" @click="showDialog = true" color="red" class="mt-2" dark block>
                  <span class="yellow--text">Eliminar</span>
              </v-btn>
            </v-form>
        </v-card-text>
      </v-card>

      <v-dialog v-model="showDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>Eliminar</v-card-title>
          <v-card-text>¿Está seguro de que desea Eliminar a este piloto?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
            <v-btn color="primary" text @click="deletePilot">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>
 
<script>
import eventBus from '../../event-bus'
export default {
  data() {
    return {
      id: null,
      showDialog: false,
      form: {
        first_name: '',
        last_name: '',
      },
      loading: false,
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
        this.id = id
        this.$http.get(`${process.env.VUE_APP_PILOTS}/${id}`)
          .then(response => {
          this.form = response.data.payload;
          console.log(this.form, "this.pilots")
          //
          })
          .catch(error => {
          console.log(error)
          //
          });
    }
  },
  methods: {
    savePilot() {
      this.loading = true;
      const url = this.id ? `${process.env.VUE_APP_PILOTS}/${this.id}` : `${process.env.VUE_APP_PILOTS}`;
      const method = this.id ? 'PUT' : 'POST';
      this.$http({ method: method, url: url, data: this.form })
        .then(response => {
          console.log(response, this.id ? 'actualiza ok' : 'guarda ok');
          eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
          this.$refs.form.reset();
          this.$router.push('/manifest/pilotsList')
        })
        .catch(error => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          console.log(error);
        })
        .finally(() => {
          this.loading = false; 
        });
    },
    deletePilot(){
      if (this.id) {
        this.loading = true;
        this.$http.delete(`${process.env.VUE_APP_PILOTS}/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/pilotsList')
          //
          })
          .catch(error => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
            console.log(error)
          //
          });
      }
    }
  }
}
</script>
