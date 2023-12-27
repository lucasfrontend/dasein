<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="d-flex mt-4">
          <span class="custom-font pink--text" style="font-size: 1.8rem;">Equipos</span>
          <v-img v-if="logoEquip" :src="logoEquip" width="40" height="40" class="orange--text ml-2"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table 
        :headers="headers" 
        :loading="loading" 
        :items="equipment" 
        class="elevation-1" 
        :no-data-text="'No hay datos disponibles'"
      >
        <template v-slot:item.actions="{ item }">
          <router-link :to="{ name: 'equipmentForm', params: { id: item._id } }">
            <v-btn class="mr-2">
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </template>
  
        
        <template v-slot:item.name_parachute="{ item }">
          <div style="display: flex; align-items: center;">
            {{ item.name_parachute }}
          </div>
        </template>

        <template v-slot:item.owner="{ item }">
          <div style="display: flex; align-items: center;">
            {{ item.owner }}
          </div>
        </template>

        <img style="max-width: 20px;" :src="logo">
  
        <template v-slot:item.category="{ item }">
          <v-chip
            class="ma-2"
            :color="getChipColor(item.category)"
            label
            
          >
          <!--
            <v-icon left>
              {{ getIcon(item.category) }}
            </v-icon>
            -->
          <span class="custom-text-color">
            {{ getCategoryText(item.category) }}
          </span> 
          </v-chip>
        </template>
  
        <template v-slot:item.canopy="{ item }">
          <div>{{ item.canopy }}</div>
        </template>
  
        <template v-slot:item.canopy="{ item }">
          <div>{{ item.canopy.jumps }}</div>
        </template>
  
        <template v-slot:item.harness="{ item }">
          <span v-if="item.harness === 1">
            <img style="max-width: 27px; color: yellow" :src="logoVector" class="pr-2">
            Vector
          </span>
          <span v-if="item.harness === 2">
            <img style="max-width: 27px;" :src="logo" class="pr-2">
            Icon
          </span>
        </template>
  
        <!--
        <template v-slot:item.reserve="{ item }">
          <div>{{ item.packing_date }}</div>
        </template>
        -->
  
        <template v-slot:item.reserve="{ item }">
          <span>
            <v-chip
              size="small"
              :color="item.color"
            >
              <v-icon
                start
                :icon="item.packing_date ? 'mdi-security' : 'mdi-close-octagon'"
              ></v-icon>
              {{ item.packing_date ? item.packing_date : "S/D" }}
            </v-chip>
          </span>
        </template>
  
      </v-data-table>
    </v-card>

    <v-btn color="primary" fab class="black--text mt-5" to="/manifest/equipmentForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>  
import { getColorWithin180Days, formatDate } from '../../utils/utils'
import moment from 'moment';
export default {
  name: 'EquipmentList',
  data () {
    return {
      loading: false,
      equipment: [],
      headers: [
        { text: 'Nombre Paracaídas', value: 'name_parachute' },
        { text: 'Categoría', value: 'category' },
        { text: 'Cantidad saltos', value: 'q_jumps' },
        { text: 'Dueño', value: 'owner.alias' },
        { text: 'Velamen', value: 'canopy.name' },
        { text: 'Arnes', value: 'harness' },
        { text: 'Reserva', value: 'reserve' },
        { text: '', value: 'actions', sortable: false },
      ],
      logoVector: require('@/assets/anillas.png'),
      logo: require('@/assets/aerodyne.jpg'),
      logoEquip: require("@/assets/icons/arnes.png"),
    }
  },
  created () {
    this.getEquipment()
  },
  methods: {
    getEquipment() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_EQUIPMENT}`)
        .then(response => {
          this.equipment = response.data.payload.map(equip => ({
            ...equip,
            packing_date: equip.reserve.packing_date ? formatDate("dd/mm/yyyy", equip.reserve.packing_date) : null,
            color: equip.reserve.packing_date ? getColorWithin180Days(formatDate("dd/mm/yyyy", equip.reserve.packing_date)) : null,
          }));
          console.log("RESPUESTA EQUIPOS", this.equipment)
          this.loading = false;
        //
        })
        .catch(error => {
          this.loading = false;
        console.log(error)
      //
      });
    },
    getIcon(category) {
      switch (category) {
        case 1:
          return 'mdi-account-multiple'; // Icono para TDM
        case 2:
          return 'mdi-school'; // Icono para ESC
        case 3:
          return 'mdi-soccer'; // Icono para DEP
        default:
          return 'mdi-help-circle'; // Icono predeterminado
      }
    },
    getCategoryText(category) {
      switch (category) {
        case 1:
          return 'TDM'; // Texto para TDM
        case 2:
          return 'ESC'; // Texto para ESC
        case 3:
          return 'DEP'; // Texto para DEP
        default:
          return '-'; // Texto predeterminado
      }
    },
    getChipColor(category) {
      switch (category) {
        case 1:
          return 'rgba(255, 255, 0, 0.2)'; // Color gris para TDM
        case 2:
          return 'rgba(16, 16, 168, 0.39)'; // Color azul para ESC
        case 3:
          return 'rgba(255, 106, 0, 0.2)'; // Color verde para DEP
        default:
          return 'default'; // Color predeterminado
      }
    },
    format(date) {
      return moment(date).format('DD/MM/YYYY');
    }
  }
}
</script>

<style>
.custom-text-color {
  color: rgba(0, 0, 0, 0.87); /* Establece el color de texto deseado */
}
</style>
