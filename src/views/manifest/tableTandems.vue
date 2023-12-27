<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="custom-font black--text pl-4" style="font-size: 2rem;">Pasajeros TDMs</span>
        <v-spacer></v-spacer>
        <div class="w-25">
          <v-text-field
            v-model="search"
            label="Buscar"
            outlined
            dense
            prepend-icon="mdi-magnify"
            class="mt-4"
          > 
          </v-text-field>
        </div>
      </v-card-title>
      <v-card-text class="">
      <!--
        <v-btn color="primary" >
          <span class="pr-2">Enviar</span>
          <v-icon>mdi-email</v-icon>
        </v-btn>    
      -->
        <v-data-table 
          :headers="headers" 
          :items="passengers" 
          :loading="loading" 
          :no-data-text="'No hay datos'"
          :search="search"
        >
        <template v-slot:item.first_name="{ item }">
            <td v-if="item.first_name">
              <span span>{{ capitalizeFirstLetter(item.first_name) }}</span>
            </td>
          </template>
          <template v-slot:item.last_name="{ item }">
            <td v-if="item.last_name">
              <span span>{{ capitalizeFirstLetter(item.last_name) }}</span>
            </td>
          </template>

          <template v-slot:item.alias="{ item }">
            <td v-if="item.alias">
              <span span>{{ capitalizeFirstLetter(item.alias) }}</span>
            </td>
          </template>

          <template v-slot:item.a_alias="{ item }">
            <td v-if="item.a_alias">
              <span span>{{ capitalizeFirstLetter(item.a_alias) }}</span>
            </td>
          </template>

          <template v-slot:item.chargedType="{ item }">
            <td v-if="item.chargedType">
              <span span>{{ getTypeAltText(item.chargedType) }}</span>
            </td>
          </template>

          <template v-slot:item.price="{ item }">
            <td v-if="item.price">
              <span class="green--text">$</span>
              <span class="pl-2">{{ item.price }}</span>
            </td>
          </template>

          <template v-slot:item.balance="{ item }">
            <td v-if="item.balance">
              <span class="green--text">$</span>
              <span class="pl-2">{{ item.balance }}</span>
            </td>
          </template>

          <template v-slot:item.is_ext="{ item }">
            <v-icon>{{ item.is_ext ? 'mdi-check' : 'mdi-close' }}</v-icon>
          </template>
    
          <template v-slot:item.jumped="{ item }">
            <td>
              <v-icon v-if="item.jumped" color="green" class="pl-2" :size="20">mdi-check-circle-outline</v-icon>
              <v-icon v-if="!item.jumped" color="red" class="pl-2" :size="20">mdi-alert-circle-outline</v-icon>
            </td>
          </template>
          
          <template v-slot:item.checkbox="{ item }">
            <input type="checkbox" v-model="selectedPassenger" :value="item" @change="handleSelectionChange" />
          </template>

          <template v-slot:item.actions="{ item }">
            <router-link :to="{ name: 'NewPassenger', params: { id: item._id } }">
              <v-btn dark class="mr-2" color="white">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </router-link>
          </template>
    
          <!--
          <template v-slot:item.chargedType="{ item }">
            <td v-if="item.chargedType">
            <v-btn @click="openTimePicker(item)" :disabled="item.status.f_status === 3">{{ item.chargedType }}</v-btn>
            </td>
            <td v-else>-</td>
          </template>
          -->
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-btn dark fab color="primary" class="black--text mt-5" to="/NewPassenger">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>  
//import eventBus from '../../event-bus'
//import moment from 'moment';
//import eventBus from '../../event-bus'
//import { mapState } from 'vuex';
export default {
  components: {
  },
  name: 'tableScreen',
  data () {
    return {
      loading: false,
      headers: [
        {
          text: "Nombre/s",
          value: 'first_name',
        },
        {
          text: "Apellido/s",
          value: 'last_name',
        },
        {
          text: "Alias",
          value: 'alias',
        },
        {
          text: "Pareja LowCost",
          value: 'a_alias',
        },
        {
          text: "Externo",
          value: 'is_ext',
        },
        {
          text: "Tipo de Salto",
          value: 'chargedType',
        },
        {
          text: "Precio del Salto",
          value: 'price',
        },
        {
          text: "Saldo a favor",
          value: 'balance',
        },
        {
          text: "Saltó?",
          value: 'jumped',
        },
        /*
        { 
          text: 'Enviar', 
          value: 'checkbox' 
        },
        */
        {
          text: "Editar",
          value: 'actions',
          sortable: false,
        },

      ],
      passengers: [],
      search: '',
      selectedPassenger: null,
      
    }
  },

  created() {
    this.getPassengers()
  },
  computed: {
  },
  methods: {
    getPassengers() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_PASSENGERS}`)
      //this.$http.get(`http://localhost:8082/api/passengers`)
          .then(response => {
            this.passengers = response.data.payload
            console.log("RESPUESTA A URI", this.passengers)
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error)
          })
    },
    getTypeAltText(typeAlt) {
      switch (typeAlt) {
        case 1:
          return 'HandyCam';
        case 2:
          return 'HandyCam con Tarjeta';
        case 3:
          return 'HandyCam PXL';
        case 4:
          return 'HandyCam PXL con Tarjeta';
        case 5:
          return 'CON CAMAROGRAFO';
        case 6:
          return 'Camarógrafo con Tarjeta';
        case 7:
          return 'Camarógrafo PXL';
        case 8:
          return 'Camarógrafo PXL con Tarjeta';
        case 9:
          return 'VIP';
        case 10:
          return 'VIP con Tarjeta';
        case 11:
          return 'LOW COST';
        case 12:
          return 'LOW COST Con Tarjeta';
        case 13:
          return 'Low Cost PXL';
        case 14:
          return 'Low Cost PXL con Tarjeta';
        case 15:
          return 'PROMO CAM';
        case 16:
          return 'PROMO HANDYC';
        case 17:
          return 'PROMO CAM con Tarjeta';
        case 18:
          return 'PROMO HANDYC con Tarjeta';
        default:
          return ''; // Maneja valores no esperados si es necesario
      }
    },
    handleSelectionChange() {
      // Aquí puedes realizar acciones adicionales si es necesario
      console.log('Transacciones seleccionadas:', this.selectedTransactions);
    },
    capitalizeFirstLetter(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
}
</script>

<style>
</style>