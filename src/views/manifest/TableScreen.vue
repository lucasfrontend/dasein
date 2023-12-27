<template>
  <div>
    <v-container fluid class="fullscreen-container" v-if="showTandas">
      <v-data-table
      style="min-height: 98vh;"
      :headers="headersSlots" 
      :items="tandas" 
      :loading="loading" 
      :no-data-text="'No hay tandas cargadas'"
      >
      <template v-slot:item.number_tanda="{ item }">
        <span class="custom-number pink--text pa-0 ma-0" style="font-size: 4rem;">{{ item.number_tanda }}</span>
      </template>
      
        <template v-slot:item.slots[0].slot.name="{ item }">
          <td :class="{
            'tdmColor': item.slots[0].slot.is_tandem, 
            'studentStyles': item.slots[0].slot.is_tandem_al || item.slots[0].slot.is_aff || (item.slots[0].slot.is_student && (item.slots[0].slot.is_student.level === 1 || item.slots[0].slot.is_student.level === 2 || item.slots[0].slot.is_student.level === 3)), 
            'iscoachStyles': item.slots[0].slot.is_coach, 
            }">
            <div class="d-flex align-center">
              <span class="custom-font" style="font-size: 2.5rem;">{{ capitalizedSlotName(item.slots[0].slot.name) }}</span>
              <v-icon v-if="item.slots[0].slot.packing" color="green" class="pl-2" size="35">mdi-check-circle-outline</v-icon>
            </div>
          </td>
        </template>
        
        <template v-slot:item.slots[1].slot.name="{ item }">
          <td :class="{
            'tdmColor': item.slots[1].slot && item.slots[1].slot.tandemOptions,
            'iscoachStyles': item.slots[1].slot.is_coachee,
            'studentStyles': item.slots[1].slot.is_tandem_al || item.slots[1].slot.is_aff || (item.slots[1].slot.is_student && (item.slots[1].slot.is_student.level === 1 || item.slots[1].slot.is_student.level === 2 || item.slots[1].slot.is_student.level === 3)),              
          }">
            <div class="d-flex align-center">
              <span class="custom-font" style="font-size: 2.5rem;">
                {{ capitalizedSlotName(item.slots[1].slot.name) }}
              </span>
              <span class="custom-font" style="font-size: 2.5rem;" v-if="item.slots[1].slot.tandemOptions && item.slots[1].slot.tandemOptions.passengers_name">
                {{ capitalizedSlotName(item.slots[1].slot.tandemOptions.passengers_name) }}
              </span>
              <v-icon v-if="item.slots[1].slot.packing" color="green" class="pl-2" size="35">mdi-check-circle-outline</v-icon>
            </div>
        </td>
      </template>
      
      <template v-slot:item.slots[2].slot.name="{ item }">
        <td :class="{
          'tdmColor': item.slots[2].slot.is_tandem || item.slots[2].slot.is_cam,
          'iscoachStyles': item.slots[2].slot.is_coachee,
          'iscoachStyles2': item.slots[2].slot.is_coach,
          'studentStyles': item.slots[2].slot.is_tandem_al || item.slots[2].slot.is_aff || (item.slots[2].slot.is_student && (item.slots[2].slot.is_student.level === 1 || item.slots[2].slot.is_student.level === 2 || item.slots[2].slot.is_student.level === 3)),
        }" >
          <div class="d-flex align-center">
            <v-icon color="gray" v-if="item.slots[2].slot.is_cam" size="35" class="pr-4">mdi-camera-gopro</v-icon> 
            <span class="custom-font" style="font-size: 2.5rem;">
              {{ capitalizedSlotName(item.slots[2].slot.name) }}
            </span>            
            <v-icon v-if="item.slots[3].slot.packing" color="green" class="pl-2" size="35">mdi-check-circle-outline</v-icon>
          </div>
      </td>
    </template>
  
        <template v-slot:item.slots[3].slot.name="{ item }">
          <td :class="{
            'tdmColor': item.slots[3].slot && item.slots[3].slot.tandemOptions || item.slots[3].slot.is_cam,
            'iscoachStyles': item.slots[3].slot.is_coachee,
            'iscoachStyles2': item.slots[3].slot.is_coachee_2,
            'studentStyles': item.slots[3].slot.is_tandem_al || item.slots[3].slot.is_aff || (item.slots[3].slot.is_student && (item.slots[3].slot.is_student.level === 1 || item.slots[3].slot.is_student.level === 2 || item.slots[3].slot.is_student.level === 3)),
          }">
            <div class="d-flex align-center">
              <v-icon size="35" color="gray" v-if="item.slots[3].slot.is_cam" class="pr-4">mdi-camera-gopro</v-icon>  
              <span class="custom-font" style="font-size: 2.5rem;">
                {{ capitalizedSlotName(item.slots[3].slot.name) }}
              </span>
              <span class="custom-font" style="font-size: 2.5rem;" v-if="item.slots[3].slot.tandemOptions && item.slots[3].slot.tandemOptions.passengers_name">
                {{ capitalizedSlotName(item.slots[3].slot.tandemOptions.passengers_name) }}
              </span>
              <v-icon v-if="item.slots[3].slot.packing" color="green" class="pl-2" size="35">mdi-check-circle-outline</v-icon>
            </div>
          </td>
        </template>
        
        <template v-slot:item.time="{ item }">
          <td v-if="item.time">
            <v-btn @click="openTimePicker(item)" :disabled="item.status.f_status === 3">
              <span class="custom-font" style="font-size: 2.5rem;">
                {{ item.time }}
              </span>
            </v-btn>
          </td>
          <td v-else>
            <span class="custom-font" style="font-size: 1rem;">
            
            </span>
          </td>
        </template>
        
        <template v-slot:item.altitude.value="{ item }">
          <td v-if="item.altitude">
            <span class="custom-font" style="font-size: 2rem;">
              {{ getTypeAltWord(item.altitude.value) }}
            </span>
          </td>
          <td v-else></td>
        </template>
        
        <template v-slot:item.pilot="{ item }">
          <td v-if="item.pilot">
            <span class="custom-font" style="font-size: 2rem;">
              {{ capitalizedSlotName(item.pilot.name) }}  
            </span>
          </td>
          <td v-else>-</td>
        </template>
        
        <template v-slot:item.plane="{ item }">
          <span class="custom-font" style="font-size: 2rem;">
            {{ capitalizedSlotName(item.plane.name) }}
          </span>
        </template>
        
        <template v-slot:item.activate="{ item }">
          <div
            @click="item.status.f_status === 1 || item.status.f_status === 2 ? showLandingConfirmation(item) : ''"
            :disabled="item.status.f_status === 3 || 
            item.altitude.value === undefined || 
                      item.plane.name === undefined || item.pilot.name === undefined"
          >
          <v-icon color="green" size="45">
            <template v-if="item.status.f_status === 1">
              mdi-airplane-off
            </template>
            <template v-else-if="item.status.f_status === 2">
              mdi-airplane-takeoff
            </template>
            <template v-else-if="item.status.f_status === 3">
              mdi-airplane-landing
            </template>
            <template v-else-if="item.status.f_status === 4">
                mdi-check-circle-outline
              </template>
              <template v-else>
                mdi-pound
              </template>
            </v-icon>
          </div>
        </template>
      </v-data-table>
  </v-container>

    <v-container fluid v-else>
      <v-card>
        <!--
        <v-card-title>
          <span class="custom-font green--text pl-4 text-center" style="font-size: 5rem;">Morosos</span>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <div>
          </div>
          <v-spacer></v-spacer>
          <div class="w-25">
          </div>
        </v-card-title>
-->
        <v-row style="height: 100%;">
          <v-col>
            <v-data-table 
            :headers="headersDeb" 
            :items="debtors" 
            :loading="loading" 
            :no-data-text="'No hay deudores'"
            style="height: 100%;"
          >
          <template v-slot:item.alias="{ item }">
            <span style="font-size: 3rem;" class="custom-font green--text">
              {{ capitalizeFirstLetter(item.alias) }}
            </span>
              </template>
              <template v-slot:item.beer_bal="{ item }">
                <div>
                  <v-img v-for="index in item.beer_bal" :key="index" :src="beerImg" class="orange--text text-center custom-beer" style="display: inline-block; margin-right: 5px;"></v-img>
                </div>
              </template>
              <!--
              <template v-slot:item.date="{ item }">
                <v-chip :color="getChipColor(item.date)">{{ formatMoment(item.date) }}</v-chip>
              </template>
              -->
              <template v-slot:item.b_transactions="{ item }">
                <div class="motivo-column">
                  <div v-for="t in item.b_transactions" :key="t.date">
                    <span style="font-size: 1.5rem; font-weight: bold;">{{ capitalizeFirstLetter(t.description) }}</span>
                    - 
                    <span class="green-text" style="font-size: 2rem; font-weight: bold;">{{ t.amount }}</span>
                    <br>
                  </div>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>

    </v-container>
    <button 
        @click="activateFullscreen"
        class="fullscreen-button"
      >
      <v-icon color="blue">mdi-fullscreen</v-icon>
    </button>
  </div>
</template>


<script>  
  import moment from 'moment';
//import eventBus from '../../event-bus'
//import { mapState } from 'vuex';
import { isTv, goToFullscreen } from '../../helpers/index'
export default {
  components: {
  },
  name: 'tableScreen',
  data () {
    return {
      showTandas: true,
      loading: false,
      errorMessage: null,
      headersSlots: [
        {
          text: "Numero",
          value: 'number_tanda',
        },
        {
          text: "Slot 1",
          value: 'slots[0].slot.name',
        },
        {
          text: "Slot 2",
          value: 'slots[1].slot.name',
        },
        {
          text: "Slot 3",
          value: 'slots[2].slot.name',
        },
        {
          text: "Slot 4",
          value: 'slots[3].slot.name',
        },
        {
          text: "Hora",
          value: 'time',
        },
        {
          text: "Piloto",
          value: 'pilot',
        },
        {
          text: "Avión",
          value: 'plane',
        },
        {
          text: "FT",
          value: 'altitude.value',
        },
        {
          text: "Estado",
          value: 'activate',
        }
      ],
      headersDeb: [
        {
          text: "Deudores",
          value: 'alias',
          class: 'your-custom-class', // Clase personalizada
          style: 'font-size: 4rem;', // Estilo personalizado
        },
        /*
        {
          text: "Fecha",
          value: 'date',
        },
        */
        {
          text: "Motivo",
          value: 'b_transactions',
          width: '400',
        },
        {
          text: "Cantidad",
          value: 'beer_bal',
        },
      ],
      tandas: [],
      debtors: [],
      fullScreen: null,
      beerImg: require("../../assets/beer.png"),
    }
  },
  watch: {
    '$store.state.dataTable': {
      handler() {
        // Actualizar la tabla automáticamente cuando cambie el estado
        this.$forceUpdate();
      },
      deep: true,
    },
  },
  created() {
    window.addEventListener('storage', this.updateStore);
  },
  mounted() {
    const sunset = moment(this.$store.state.sunset, 'HH:mm:ss');
    console.log("const sunset", sunset)

    const currentTime = new Date().getTime(); // Obtén la hora actual en milisegundos
    console.log("currentTime", currentTime)

    const currentDate = new Date(currentTime);
    console.log("currentDate, hora estandar de argentina", currentDate);

    const sunsetTimeString = this.$store.state.sunset; // Obtén la hora del atardecer desde Vuex como cadena
    console.log("sunset String", sunsetTimeString);

    // Utiliza moment.js para analizar la cadena de tiempo y obtener la marca de tiempo
    const sunsetTime = moment(sunsetTimeString, 'h:mm:ss A').valueOf();
    console.log("sunset Time despues de moment", sunsetTime);

    //this.showTandas = currentTime < sunsetTime
    console.log("resultado", currentTime < sunsetTime);






    const tandasData = localStorage.getItem('tandas');
    const debtorsData = localStorage.getItem('debtors');

    if (tandasData) {
      this.tandas = JSON.parse(tandasData);
    }

    if (debtorsData) {
      this.debtors = JSON.parse(debtorsData);
    }
    //const estadoInicial = JSON.parse(localStorage.getItem('tandas')) || [];
    //console.log("estadoInicial", estadoInicial)
    //this.tandas = estadoInicial;
    // Acceder al socket
    // Agrega un evento para escuchar la conexión 
    /*
    this.$socket.on('connection', () => {
      console.log('Conectado al servidor WebSocket');
    });
    */
  },
  /*
  created() {
    console.log('Componente de tabla creado');
    this.$watch(
      () => this.$store.state.dataTable,
      () => {
        // Actualizar la tabla automáticamente cuando cambie el estado
        // Aquí puedes agregar lógica adicional si es necesario
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      },
      { deep: true }
    );
    // Llamar directamente a la acción al crear el componente
    this.$store.dispatch('getDataTable');
    /*his.$socket.on('update-tandas', (tandas) => {
    console.log('Tandas actualizadas', tandas);
    // Actualiza tu componente con las nuevas tandas
  }); 
    //this.getTandas()
    //this.getDebtors()
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function () {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  */
  computed: {
    /*
    dataTable() {
      console.log('Getter dataTable llamado con:', this.$store.state.dataTable);
      return this.$store.getters.getDataTable;
    },*/
    computed: {
      showTandas() {
        const currentTime = new Date().getTime(); // Obtén la hora actual en milisegundos
        console.log("currentTime", currentTime)
        const sunsetTime = this.$store.state.sunset; // Obtén la hora del atardecer desde Vuex
        console.log("sunsetTime", sunsetTime)
        // Compara la hora actual con la hora del atardecer
        console.log("resultado", currentTime < sunsetTime)
        return currentTime < sunsetTime;
      },
    },
    dataTable() {
      return this.$store.state.dataTable;
    },
    getTypeAltWord() {
      return (altitude) => {
        switch (altitude) {
          case 1:
            return '5.000 ft';
          case 2:
            return '8.000 ft';
          case 3:
            return '10.000 ft';
          case 4:
            return '12.000 ft';
          default:
            return 'S/D';
        }
      };
    },
    capitalizedSlotName() {
      return (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1);
      };
    },

  },
  /*
  sockets: {
      connect: function () {
          console.log('socket connected')
      },
      customEmit: function (data) {
          console.log('this method was fired by the socket server. eg: io.emit("customEmit")', data)
      }
  },
  */
  methods: {
    updateStore(event) {
      console.log("tandsssssss")
    if (event.key === 'tandas') {
      console.log("entra tandas");

      this.tandas = JSON.parse(event.newValue) || [];
    }
    if (event.key === 'debtors') {
      console.log("entra debtors");
      this.debtors = JSON.parse(event.newValue) || [];
    }
  },
    /*
    enviarDatosAlServidor: function (data) {
      this.$socket.emit('tandas', data);
    },*/
    actualizarTandas(formData) {
      // Lógica para actualizar las tandas con formData
      console.log("Actualizando tandas con:", formData);
      // Luego, puedes llamar a this.getTandas() si es necesario
      this.getTandas();
      this.getDebtors();
    },
    getChipColor(date) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); // Set UTC time to midnight

      const itemDate = new Date(date);
      itemDate.setUTCHours(0, 0, 0, 0); // Set UTC time to midnight

      console.log("today", today);
      console.log("itemDate", itemDate);

      if (
        itemDate.getUTCFullYear() <= today.getUTCFullYear() &&
        itemDate.getUTCMonth() <= today.getUTCMonth() &&
        itemDate.getUTCDate() <= today.getUTCDate()
      ) {
        console.log("Result: red");
        return 'green';
      } else {
        console.log("Result: green");
        return 'red';
      }
    },
    capitalizeFirstLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    formatMoment(dateString) {
      //return moment(dateString).format('DD/MM/YYYY HH:mm');
      return moment(dateString).format('DD/MM/YYYY');
    },
    getTandas () {
      const tv = isTv()
      console.log("tv", tv)
      console.log("3")
      this.fullScreen = this.isFullScreen();
      console.log("fullScreen:", this.fullScreen)
      this.loading = true;
      //this.$http.get(`http://localhost:8082/api/tandas?today=true`)
      this.$http.get(`${process.env.VUE_APP_TANDAS}?today=true`)
        .then(response => {
          this.tandas = response.data.payload
          console.log("RESPUESTA A URI", this.tandas)
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    },
    getDebtors(){
      this.$http.get(`${process.env.VUE_APP_USERS}?debtors=true`)
      .then(res => {
        if(res.status === 200){
          console.log("DEUDORESSSS", res);
          this.debtors = res.data.payload;
          this.debtors.forEach(user => {
            if (user.b_transactions.length > 0) {
              user.date = user.b_transactions[0].date;
            }
          });
          console.log("debtors", this.debtors)
        }
      })
      .catch(error => {
        console.log(error);
        this.errorMessage = 'No se ha podido conectar'
      })
      .finally(() => {
        this.loadingDebt = false
      });
    },
    activateFullscreen() {
      goToFullscreen();
    },
    isFullScreen() {
      const element = document.body;
      return element.fullscreenElement || element.mozFullScreenElement || element.webkitFullscreenElement || element.msFullscreenElement;
    },
    getSunset() {
      // Implementa tu lógica para obtener la hora del atardecer desde una API u otra fuente de datos
      // y actualiza el valor de this.sunset en consecuencia.
    },
    calculateBal_r_h(altitudeValue) {
      switch (altitudeValue) {
        case 1: // 5000ft
          return 0.3;
        case 2: // 8000ft
          return 0.4;
        case 3: // 10000ft
          return 0.5;
        case 4: // 12000ft
          return 0.7;
        default:
          return 0.0;
      }
    }
  },
}
</script>

<style>
.custom {
  font-size: 1.5em;
}

.v-data-table-header th.sortable .v-icon {
  font-size: 5em; /* tamaño del ícono de ordenamiento */
  margin-left: 5px; /* margen izquierdo del ícono */
}

.v-data-table-header th.active {
  color: #ff9800; /* color de texto del encabezado activo */
}

.v-data-table-header th.active .v-icon {
  color: #ff9800; /* color del ícono del encabezado activo */
}

.motivo-column {
  min-width: 1000px; /* Puedes ajustar este valor según sea necesario */
}

.custom-beer {
  max-width: 25px; /* Toma el 100% del ancho del contenedor */
  max-height: 95px; /* Toma el 100% del alto del contenedor */
  object-fit: contain;
}

.fullscreen-container {
  position: relative;
}

.fullscreen-button {
  position: absolute;
  bottom: 16px; /* Puedes ajustar esta propiedad para cambiar la distancia desde la parte inferior */
  right: 16px; /* Puedes ajustar esta propiedad para cambiar la distancia desde la derecha */
}

.your-custom-class {
  font-size: 1rem;
}
</style>