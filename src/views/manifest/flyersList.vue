<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="font-weight-bold">
        <span class="custom-font pink--text" style="font-size: 2rem;">Flyers</span>
        <!--
        <v-spacer></v-spacer>
        <v-icon
          class="active-users-icon"
          color="green"
          size="36"
        >
          mdi-account-circle
        </v-icon>
        <v-spacer></v-spacer>
        <div>
          <v-icon class="red--text">mdi-exclamation</v-icon>
          <span class="red--text">-</span>
        </div>
        -->
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
          <!--
          <v-text-field
            v-model="search"
            variant="solo"
            prepend-inner-icon="mdi-magnify"
            @click:append="getUsers"
            label="Search"
            single-line
            hide-details
            clearable
            density="compact"
          ></v-text-field>
          -->
        </div>
      </v-card-title>

      <v-divider />
      
      <v-card-text class="">
        <v-data-table 
          :headers="headers" 
          :items="filteredFlyers" 
          :loading="loading"
          class="elevation-0"
          :no-data-text="'No hay datos disponibles'"
        >

          <template v-slot:item.status="{ item }">
            <v-icon v-if="item.status === 1" color="yellow" size="23" class="pr-1">mdi-account-star</v-icon>
            <v-icon v-if="item.status === 2" color="orange" size="23" class="pr-1">mdi-account-heart</v-icon>
            <span v-if="item.role.includes(8)">
              <v-icon v-if="item.role.includes(8)" color="blue">mdi-school</v-icon>
              <v-icon color="blue" v-if="item.role.includes(8) && item.is_student.level === 1">mdi-numeric-1</v-icon>
              <v-icon color="blue" v-if="item.role.includes(8) && item.is_student.level === 2">mdi-numeric-2</v-icon>
              <v-icon color="blue" v-if="item.role.includes(8) && item.is_student.level === 3">mdi-numeric-3</v-icon>
            </span>

            <v-icon v-else-if="item.status === 3" color="green" size="23" class="pr-1">mdi-account-check</v-icon>
            <v-icon v-if="item.status === 4" color="purple" size="23" class="pr-1">mdi-account-cash</v-icon>
          </template>

          <template v-slot:item.first_name="{ item }">
            {{ item.first_name }}
          </template>

          <template v-slot:item.last_name="{ item }">
            {{ item.last_name }}
          </template>

          <template v-slot:item.alias="{ item }">
              {{ capitalizeFirstLetter(item.alias) }}
          </template>

          <template v-slot:item.balance="{ item }">
            <span>
              <v-chip
                :color="item.balance < 0 ? 'red' : item.balance === 0 ? 'orange' : 'green'"
                outlined
                class="hover-pointer"
                @click="redirectToTotalFlyer(item.id)"
              >
                <v-icon small>mdi-currency-usd</v-icon>
                {{ item.balance ? item.balance.toFixed(2) : "Sin saldo" }}
              </v-chip>
            </span>
          </template>

          <template v-slot:item.exp_cma="{ item }">
            <v-chip
                size="small"
                :color="item.color"
              ><v-icon
                  start
                  :icon="item.exp_cma ? 'mdi-security' : 'mdi-close-octagon'"
                ></v-icon>
                {{ item.exp_cma ? item.exp_cma : "S/D" }}
              </v-chip>
          </template>

          <!--
            <template v-if="item.cma_data" v-slot:item.cma_data="{ item }">
            <v-td class="">
              <v-chip
                size="small"
                :color="item.color"
              >
                <v-icon
                  start
                  :icon="item.cma_data.exp_date ? 'mdi-security' : 'mdi-close-octagon'"
                ></v-icon>
                {{ item.cma_data.exp_date ? item.cma_data.exp_date : "No hayyy" }}
              </v-chip>
            </v-td>
            </template>
            -->

          <template v-slot:item.actions="{ item }">
            <router-link :to="{ name: 'registerFlyer', params: { id: item.id } }">
              <v-btn dark class="mr-2" color="white">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </router-link>
          </template>


        </v-data-table>
      </v-card-text>
    </v-card>

    <!--
    <v-text-field
      v-model="search"
      label="Buscar"
      outlined
      dense
      prepend-icon="mdi-magnify"
      class="mt-4"
    > 
    </v-text-field>
-->

    <!--
    <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
    -->
 

    <v-btn dark fab color="primary" class="black--text mt-5" to="/manifest/registerFlyer">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!--
    <div class="d-flex justify-center">
      <v-progress-circular
        :loading="loading" 
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </div>
    -->
  </v-container>
</template>

<script>
import { capitalize, formatDate } from '../../utils/utils'
//import { formatDate, , capitalize } from '../../utils/utils'
export default {
  data() {
    return {
      loading: false,
      search: "",
      flyers: [],
      errorMessage: null,
      headers: [
        {
          text: "Nombre",
          value: 'first_name',
        },
        {
          text: "Apellido",
          value: 'last_name',
        },
        {
          text: "Alias",
          value: 'alias',
        },
        {
          text: "Saldo",
          //value: 'balance',
          value: 'balance',
        },
        {
          text: "Categoría",
          value: 'status',
        },
        {
          text: "Psicofisico",
          value: 'exp_cma',
        },
        {
          text: "Editar",
          value: 'actions',
          sortable: false,
        },
      ],
      color: null
    };
  },
  mounted() {
    this.getParacas();
  },
  methods: {
    getParacas() {
      this.loading = true;
      try {
        this.$http.get(`${process.env.VUE_APP_USERS}`)
          .then(response => {
            if (Array.isArray(response.data.payload) && response.data.payload.length === 0) {
              this.errorMessage = "No se encontraron usuarios cargados";
            } else if (Array.isArray(response.data.payload)) {
              console.log("respuesta ", response.data.payload)
              this.flyers = response.data.payload.map(flyer => ({
                ...flyer,
                status: flyer.status,
                first_name: capitalize(flyer.first_name),
                last_name: capitalize(flyer.last_name),
                balance: flyer.balance,
                alias: flyer.alias,
                role: flyer.role,
                //exp_cma: flyer.cma_data || {}, // Asegúrate de que cma_data esté definido como un objeto vacío si no existe
                exp_cma: flyer.exp_cma ? formatDate("dd/mm/yyyy", flyer.exp_cma) : ''
                //exp_cma: flyer.exp_cma  ? formatDate("dd/mm/yyyy", flyer.exp_cma) : '',
                //color: (formatDate("dd/mm/yyyy", flyer.cma_data.exp_date)),
                /*
                av_c: {
                  ...flyer.av_c,
                  exp_date: FormatDate("dd-mm-yyyy", flyer.av_c.exp_date)
                }
                */
              }));
              console.log("this.flyers", this.flyers)
              console.log("this.flyers ver color:", this.flyers)
              this.loading = false;
            } else {
              this.errorMessage = "La carga de usuarios falló. Payload no es un array válido.";
              this.loading = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      } finally {
        //this.loading = false;
      }
    },
    capitalizeFirstLetter(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    redirectToTotalFlyer(id) {
      this.$router.push({ name: 'totalFlyer', params: { id } });
    }
    /*
    navigateToEdit(_id) {
      this.$router.push({ name: 'registerFlyer', params: { id: _id } })
    }
    */
  },
  computed: {
    filteredFlyers() {
      return this.flyers.filter(flyer => {
        return (
          flyer.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
          flyer.last_name.toLowerCase().includes(this.search.toLowerCase())        
        );
      });
    }
  }
};
</script>

<style scoped>
.custom {
  /*font-size: 0.8rem;*/
  /*color: rgb(43, 43, 160);*/
  text-decoration: none;
}

</style>
