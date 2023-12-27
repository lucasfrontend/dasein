<template>
  <div class="py-8">
    <v-row class="mb-3 px-5" no-gutters>
      <v-col cols="12" class="d-flex justify-center">
        <v-icon 
          :color="`${icon.color} darken-1`" 
          class="text-h1"
        >
          {{icon.icon}}
        </v-icon>
      </v-col>
    </v-row>

    <v-form ref="form" class="pb-4">
      <v-row class="px-4">
        <v-col cols="12">
          <v-text-field
            v-model="debtorQuery"
            prepend-inner-icon="mdi-account"
            placeholder="Ingrese un nombre"
            outlined
            dense
            clearable
            @keydown.enter="getDebtor"
            :rules='[
                (v) => !!v || "El nombre es requerido",
                (v) => /^[a-zA-Z]+$/.test(v) || "Debe ingresar solo letras"
            ]'
          />
        </v-col>
      </v-row>

      <v-row class="px-4" no-gutters>
        <v-col cols="12">
          <v-btn color="black" class="yellow--text" block dark @click="getDebtor" :loading="loadingButton">
            <v-icon left>mdi-magnify</v-icon> Buscar
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="px-10" no-gutters>
        <v-col cols="12" class="text-center">
          <v-progress-circular
            v-if="loadingDebt"
            :size="85"
            color="pink"
            indeterminate
            class="mt-8"
          ></v-progress-circular>
        </v-col>
        <v-col cols="12">
          <v-alert
          v-if="errorMessage"
          type="error"
          border="left"
          colored-border
          dense
          outlined
          class="my-3 px-3"
          >
            {{ errorMessage }}
          </v-alert>                
        </v-col>
      </v-row>
    </v-form>
    <v-container>
      <v-row style="display: flex; align-items: stretch;">
        <div v-if="debtors.length === 0">Aun no hay deudores</div>
        <v-col 
          v-for="debtor in debtors" 
          :key="debtor.id" 
          cols="6"
        >
        <router-link :to="{ name: 'DebtorDetails', params: { id: debtor._id } }">
          <v-card 
            elevation="4" 
            outlined 
            class="rounded-lg align-center" 
            style="height: 240px;"
          >
            <v-card-text 
                class="primary--text" 
                style="display: flex; flex-direction: column; align-items: center; text-align: center;"
              >
                <v-img v-if="beerImg" :src="beerImg" class="orange--text text-center custom-beer"></v-img>
                <v-icon v-else size="40" color="primary"></v-icon>
                <h4 class="">{{ debtor.alias  }}</h4>
            </v-card-text>
          </v-card>
        </router-link>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
//  import eventBus from "../../event-bus";
//import store from '@/store'
export default{
  data(){
    return{
      loading: false,
      loadingDebt: true,
      loadingButton: false,
      errorMessage: '',
      //debtor: null,
      debtors: [],
      debtorQuery: '',
      username: '',
      flyer: null,
      beerImg: require("../../assets/beer.png"),
    }
  },
  mounted() {
    this.loading = true;
//    this.$http.get(`${process.env.VUE_APP_USERS}?debtors=true`)
    this.$http.get(`${process.env.VUE_APP_USERS}?debtors=true`)
      .then(response => {
        console.log("DEUDORESSSS", response);
        this.debtors = response.data.payload;
        localStorage.setItem('debtors', JSON.stringify(response.data.payload));

      })
      .catch(error => {
        console.log(error);
        this.errorMessage = 'No se ha podido conectar'
      })
      .finally(() => {
        this.loadingDebt = false
      });
  },
  computed:{
    icon(){
      let icon = {icon: 'mdi-beer', color: 'yellow'}
      if(this.debtor != null){
        if(this.username){
          switch (this.username) {
            case 1: case 2: case 3: case 8:
              icon = { color: 'green', icon: 'mdi-check-circle' }
              break;
            case 4:
              icon = { color: 'info', icon: 'mdi-check-circle' }
              break;
            case 5: case 6: case 7:
              icon = { color: 'red', icon: 'mdi-close-circle' }
              break;
          }
        }else icon = { color: 'red', icon: 'mdi-close-circle' }
      }
      return icon
    },
  },
  methods:{
    clean(){
    },
    getDebtor() {
      if(this.debtorQuery !== ''){
        this.loadingButton = true;
        this.errorMessage = '';
        let vm = this;
        const query = this.debtorQuery.toLowerCase();
        if(this.$refs.form.validate()){
          this.$http.get(`${process.env.VUE_APP_USERS}?query=${query}`)
          .then((response) => {
            if(response.status === 200){
              this.debtors = response.data.payload;
            }
            vm.loading = false
            vm.loadingButton = false
          }).catch((err) => {
            console.log(err);
            this.errorMessage = 'No se encontraron deudores';
            vm.loading = false; // Establecer loading a true en caso de error
            vm.loadingButton = false
          });
        }
        vm.loading = false;
      } else {
        this.errorMessage = 'Ingrese un valor válido'
      }
    },
    
  }
}
</script> 


<div class="d-flex">
  
</div>
<style>
.custom-beer {
  max-width: 50px; /* Toma el 100% del ancho del contenedor */
  max-height: 195px; /* Toma el 100% del alto del contenedor */
  object-fit: contain;
}
</style>