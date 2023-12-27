<template>
    <v-container>
      <v-alert type="warning" dismissible>
        La mayoría de las APIs que proporcionan datos financieros y de divisas suelen ofrecer información sobre las tasas de cambio oficiales y no sobre las tasas de cambio no oficiales como el dólar blue. Ten en cuenta que obtener información sobre el valor del dólar blue puede ser ilegal. Recomendamos optar por ingresar manualmente el valor del dolar no oficial de tu país al inicio de la actividad.
      </v-alert>

      <v-card>
        <v-card-text>
          <v-card outlined>

            <v-card-text>
              <div>ultima Actualizacion</div>
              <div>ultimos valores utilizados</div>
            </v-card-text>

            <v-card-text>
              <div v-if="!dolarBlue">No hay valor cargado</div>
              <div v-else>Valor actual del dólar: {{ dolarBlue }}</div>
            </v-card-text>
          </v-card>
          <v-form ref="form" @submit.prevent="savedolarblue">
            <v-text-field 
              v-model="dolarBlue" 
              type="text"
              label="Blue hoy" 
              outlined 
              dense 
              required 
              prepend-inner-icon="mdi-currency-usd"
              inputmode="numeric"
              :rules="dolarBlueRules"
            ></v-text-field>
            <v-btn :loading="loading" color="black" dark type="submit" block>
              <span class="yellow--text">Guardar</span>
            </v-btn>
            <v-btn color="red" class="mt-2" dark block>
              <span class="yellow--text" :hover="{background: 'black'}">Eliminar</span>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
</template>
  
<script>
import eventBus from '../../event-bus'
import { mapActions } from 'vuex';
export default {
  name: "Dasboard",
  data() {
    return {
      dolarBlue: null, 
      loading: false,
      dolarBlueRules: [
        (value) => !!value || 'Este campo es requerido',
        (value) => /^(\d+(\.\d{1,2})?)?$/.test(value) || 'Solo acepto valores numéricos y con un punto (.) como separador decimal',
      ],
    };
  },
  created() {
    this.dolarBlue = this.$store.state.dolarBlue
    this.getDolarblue()
  },
  mounted() {
    console.log(this.buttons, "buttons")
  },
  methods: {
    ...mapActions(['setDolarBlue']),
    getDolarblue(){
      //trae de la DB el valor del dolar
      //si hay dolar carga en template valor anterior y se muestra input del nuevo
      this.updateDolar()
      //si no hay guardo valor
      //this.savedolarblue()

    },
    updateDolar(){

    },
    savedolarblue() {
      this.loading = true;
      try {
        this.$http.put(`http://localhost:8082/api/dolarblue/${this.id}`)
        .then(response => {
          console.log(response);
          eventBus.$emit('toast', { show: true, text: "Dolar actualizado correctamente", color: "green" })
          this.$router.push('/tandasMain')
        })
      } catch (error) {
        console.log(error);
        console.log("por que error aca?")
      }
      this.setDolarBlue(this.dolarBlue);
      eventBus.$emit('toast', { show: true, text: "Valor del dolar actualizado correctamente", color: "green" })
      this.loading = false;
      this.$router.push('/')
    }
  },
};
</script>