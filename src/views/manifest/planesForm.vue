<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title v-if="this.form.name" class="custom-font pink--text" style="font-size: 2rem;">{{ this.form.name }}</v-toolbar-title>
        <v-toolbar-title v-else class="custom-font pink--text" style="font-size: 2rem;">Nuevo Avión</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" @submit.prevent="savePlane">
          <v-text-field 
            label="Nombre" 
            v-model="form.name" 
            outlined 
            dense 
            class="input-border" 
            prepend-inner-icon="mdi-airplane"
            :rules="rules.required"
          ></v-text-field>
          <v-text-field 
            label="Modelo" 
            v-model="form.model" 
            outlined 
            dense 
            class="input-border" 
            prepend-inner-icon="mdi-file-cog"
            :rules="rules.required"
          ></v-text-field>
          <v-text-field 
            label="Año" 
            v-model="form.ye" 
            outlined dense 
            class="input-border" 
            prepend-inner-icon="mdi-calendar"
            :rules="rules.required"
          ></v-text-field>
          <v-text-field 
            label="Carga máxima de despegue - MWTO" 
            v-model="form.mtow" 
            outlined 
            dense 
            class="input-border" 
            prepend-inner-icon="mdi-weight-kilogram"
            :rules="rules.required"
          ></v-text-field>
          <v-btn 
            color="black" 
            dark 
            type="submit" 
            block
          >
          <span class="yellow--text">Guardar</span>
        </v-btn>
        
        <v-btn v-if="id !== null" @click="showDialog = true" color="red" dark block class="mt-2">
          <span class="yellow--text">Eliminar</span>
        </v-btn>
        <!--
          <BarriColorPicker />
        -->
        </v-form>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar este avión?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deletePlane" :loading="loadingDel">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
 
<script>
import eventBus from '../../event-bus'
//import BarriColorPicker from "../app/BarriColorPicker.vue";
export default {
  components: {
    //donut: donut,
    //BarriColorPicker,
  },
  data() {
    return {
      id: null,
      showDialog: false,
      form: {
        name: '',
        model: '',
        mtow: '',
        ye: ''
      },
      loading: false,
      loadingDel: false,
      rules: {
        required: [v => !!v || 'Este campo es obligatorio'],
      },
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.$http.get(`${process.env.VUE_APP_PLANES}/${id}`)
        .then(response => {
          this.form = response.data.payload;
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  methods: {
    savePlane() {
      this.loading = true;
      const url = this.id ? `${process.env.VUE_APP_PLANES}/${this.id}` : `${process.env.VUE_APP_PLANES}`;
      const method = this.id ? 'PUT' : 'POST';
      this.$http({ method: method, url: url, data: this.form })
        .then(response => {
          console.log(response, this.id ? 'actualiza ok' : 'guarda ok');
          eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
          this.$refs.form.reset();
          this.$router.push('/manifest/planesList')
        })
        .catch(error => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          console.log(error);
        })
        .finally(() => {
          this.loading = false; 
        });
    },
    deletePlane(){
      if (this.id) {
        this.loadingDel = true;
        this.$http.delete(`${process.env.VUE_APP_PLANES}/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/planesList')
          //
          })
          .catch(error => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
            console.log(error)
          //
          })
          .finally(() => {
            this.loadingDel = false; 
        });
      }
    }
  }
}
</script>
