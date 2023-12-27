<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <ThreeRings :iconColor="'ffffff'" :size="30"/>
        <span class="custom-font black--text" style="font-size: 2rem;">Tandas</span>
        <ThreeRings :iconColor="'ffffff'" :size="30"/>
        <v-spacer></v-spacer>
        <div>{{ tandas.length }} </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <div>
          <!--
          <BarriDataPicker />
          -->
        </div>
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
      <v-divider />
      <v-card-text class="">
        <v-alert v-if="errorMessage">{{ errorMessage }}</v-alert>
        <v-data-table 
          :headers="headers" 
          :items="tandas" 
          :loading="loading" 
          :no-data-text="'No hay datos disponibles'"
          :search="search"
        >
    
          <template v-slot:item.number_tanda="{ item }">
            <span class="custom-number primary--text pa-0 ma-0" >{{ item.number_tanda }}</span>
          </template>
          
          <!-- Slot 1 -->
          <template v-slot:item.slots[0].slot.name="{ item }">
            <td :class="{
              'tdmColor': item.slots[0].slot.is_tandem, 
              'studentStyles': item.slots[0].slot.is_tandem_al || item.slots[0].slot.is_aff || (item.slots[0].slot.is_student && (item.slots[0].slot.is_student.level === 1 || item.slots[0].slot.is_student.level === 2 || item.slots[0].slot.is_student.level === 3)), 
              'iscoachStyles': item.slots[0].slot.is_coach, 
              'isFree': item.slots[0].slot.fr, 
              }">
              {{ item.slots[0].slot.name }}
              <!--
              <v-icon v-if="item.slots[0].slot.is_student && item.slots[0].slot.is_student.level === 1" color="blue">mdi-numeric-1</v-icon>
              <v-icon v-if="item.slots[0].slot.is_student && item.slots[0].slot.is_student.level === 2" color="blue">mdi-numeric-2</v-icon>
              <v-icon v-if="item.slots[0].slot.is_student && item.slots[0].slot.is_student.level === 3" color="blue">mdi-numeric-3</v-icon>
                -->
            </td>
          </template>
          
          <!-- Slot 2 -->
          <template v-slot:item.slots[1].slot.name="{ item }">
            <td :class="{
              'studentStyles': item.slots[0].slot.is_tandem_al || item.slots[1].slot.is_tandem_al || item.slots[1].slot.is_aff || (item.slots[1].slot.is_student && (item.slots[1].slot.is_student.level === 1 || item.slots[1].slot.is_student.level === 2 || item.slots[1].slot.is_student.level === 3)), 
              'tdmColor': item.slots[1].slot && item.slots[1].slot.tandemOptions,
              'iscoachStyles': item.slots[1].slot.is_coachee,
              'isFree': item.slots[1].slot.fr,              
              }">
              {{ item.slots[1].slot.name }}
              <span v-if="item.slots[1].slot.tandemOptions && item.slots[1].slot.tandemOptions.passengers_name">
                {{ item.slots[1].slot.tandemOptions.passengers_name }}
              </span>
            </td>
          </template>
    
          <!-- Slot 3 -->
          <template v-slot:item.slots[2].slot.name="{ item }">
            <td :class="{
              'tdmColor': item.slots[2].slot.is_tandem || item.slots[2].slot.is_cam,
              'iscoachStyles': item.slots[2].slot.is_coachee,
              'iscoachStyles2': item.slots[2].slot.is_coach_b,
              'studentStyles': item.slots[2].slot.is_tandem_al || item.slots[2].slot.is_aff || (item.slots[2].slot.is_student && (item.slots[2].slot.is_student.level === 1 || item.slots[2].slot.is_student.level === 2 || item.slots[2].slot.is_student.level === 3)),
              'isFree': item.slots[2].slot.fr, 
              }" >
              <v-icon size="22" color="gray" v-if="item.slots[2].slot.is_cam">mdi-camera-gopro</v-icon> {{ item.slots[2].slot.name }}
            </td>
          </template>
    
          <!-- Slot 4 -->
          <template v-slot:item.slots[3].slot.name="{ item }">
            <td :class="{
              'tdmColor': item.slots[3].slot && item.slots[3].slot.tandemOptions || item.slots[3].slot.is_cam,
              'iscoachStyles': item.slots[3].slot.is_coachee,
              'iscoachStyles2': item.slots[3].slot.is_coachee_2,
              'studentStyles': item.slots[3].slot.is_tandem_al || item.slots[3].slot.is_aff || (item.slots[3].slot.is_student && (item.slots[3].slot.is_student.level === 1 || item.slots[3].slot.is_student.level === 2 || item.slots[3].slot.is_student.level === 3)),
              'isFree': item.slots[3].slot.fr, 
              }">
              <v-icon size="22" color="gray" v-if="item.slots[3].slot.is_cam">mdi-camera-gopro</v-icon> {{ item.slots[3].slot.name }} 
              <span v-if="item.slots[3].slot.tandemOptions && item.slots[3].slot.tandemOptions.passengers_name">
                {{ item.slots[3].slot.tandemOptions.passengers_name }}
              </span>
            </td>
          </template>
    
          <template v-slot:item.time="{ item }">
            <td v-if="item.time">
            <v-btn @click="openTimePicker(item)" :disabled="item.status.f_status === 3">{{ item.time }}</v-btn>
            </td>
            <td v-else>-</td>
          </template>
    
          <template v-slot:item.altitude.value="{ item }">
            <td v-if="item.altitude">{{ getTypeAltWord(item.altitude.value) }}</td>
            <td v-else>-</td>
          </template>
    
          <template v-slot:item.pilot="{ item }">
            <td v-if="item.pilot">{{ item.pilot.name }}</td>
            <td v-else>-</td>
          </template>
    
          <template v-slot:item.plane="{ item }">
            <v-btn
              @click="changePlane(item)"
              :disabled="item.status.f_status === 3"
            >{{ item.plane.name }}
            </v-btn>
          </template>
    
          <template v-slot:item.activate="{ item }">
            <v-btn
              @click="item.status.f_status === 1 || item.status.f_status === 2 ? showLandingConfirmation(item) : ''"
              :disabled="item.status.f_status === 3 || 
                        item.altitude.value === undefined || 
                        item.plane.name === undefined || item.pilot.name === undefined"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="green">
                    <!-- Mostrar el icono de avión en tierra si flight_status es 1 -->
                    <template v-if="item.status.f_status === 1">
                      mdi-airplane-off
                    </template>
                    <!-- Mostrar el icono de despegue si flight_status es 2 -->
                    <template v-else-if="item.status.f_status === 2">
                      mdi-airplane-takeoff
                    </template>
                    <!-- Mostrar el icono de aterrizaje si flight_status es 3 -->
                    <template v-else-if="item.status.f_status === 3">
                      mdi-airplane-landing
                    </template>
                    <template v-else-if="item.status.f_status === 4">
                      mdi-check-circle-outline
                    </template>
                    <!-- Mostrar el icono de hastag si flight_status no es 1, 2 ni 3 -->
                    <template v-else>
                      mdi-pound
                    </template>
                  </v-icon>
                </template>
                <span>
                  <template v-if="item.status.f_status === 1">
                    En tierra
                  </template>
                  <template v-else-if="item.status.f_status === 2">
                    En ascenso
                  </template>
                  <template v-else-if="item.status.f_status === 3">
                    Finalizado
                  </template>
                  <template v-else-if="item.status.f_status === 4">
                    Todos en tierra y plegados
                  </template>
                </span>
              </v-tooltip>
            </v-btn>
          </template>
    
          <template v-slot:item.actions="{ item }" hide-headers>
            <router-link :to="{ name: 'tandasForm', params: { id: item._id } }">
              <v-btn class="mr-2" :disabled="item.status.f_status === 3">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </router-link>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>


    <v-btn dark fab color="primary" class="black--text mt-5" to="/manifest/tandasForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <BarriConfirmationDialog
      :showBarriConfirm="landingConfirmation"
      :titleBarriModal="'¿Está seguro de que desea cambiar el estado del vuelo?'"
      :barriModalMessage="barriModalMessage"
      :showIcon1="showIcon1"
      :showIcon2="showIcon2"
      :showIcon3="showIcon3"
      :showFlighStatusIcons="true"
      @save="saveEditedValue"
      @close="closeConfirmationModal"

    ></BarriConfirmationDialog>

    <barri-bottom-sheet
      :showBarriBottomSheet="showBarriBottomSheet"
      :selectedTanda="selectedTanda"
      :summary="summary"
      :messageHsPlane="messageHsPlane"
      :messageHsPilot="messageHsPilot"
      :messageEquipRent="messageEquipRent"
      :userTransactions="userTransactions"
      @saveBottomSheet="saveEditedValueBottomSheet"
      @closeBottomSheet="closeConfirmationModalBottomSheet"
    ></barri-bottom-sheet>

    <time-picker-dialog
      v-model="pickerOpen"
      :selectedTime="selectedTime"
      @input="updateTime"
      @update-selected-time="updateSelectedTime"
    ></time-picker-dialog>
  </v-container>
  
</template>

<script>  
//import DataTableInputVue from './DataTableInput.vue'
import TimePickerDialog from "../app/TimePickerDialog.vue";
// import BarriDataPicker from "../app/BarriDataPicker.vue";
import BarriConfirmationDialog from "../app/BarriConfirmationDialog.vue";
import BarriBottomSheet from "../app/BarriBottomSheet.vue";
import ThreeRings from '../../components/Icons/ThreeRings.vue'
import eventBus from '../../event-bus'
export default {
  components: {
    //DataTableInputVue
    TimePickerDialog,
    // BarriDataPicker,
    BarriConfirmationDialog,
    BarriBottomSheet,
    ThreeRings
  },
  name: 'tandasMain',
  data () {
    return {
      loading: false,
      errorMessage: null,
      headers: [
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
        },
        {
          text: "Editar",
          value: 'actions',
          sortable: false,
        },
      ],
      tandas: [],
      selectedTanda: null,
      landingConfirmation: false,
      showBarriBottomSheet: false,
      flightFinishedConfirmation: false,
      changePLaneConfirmation: false,
      selectedItem: null,
      showDialog: false,
      showIcon1: false,
      showIcon2: false,
      showIcon3: false,
      pickerOpen: false,
      selectedTime: null,
      selectTandaTimeId: null,

      // PRECIOS
      prices: [],
      pricesStudent: [],
      pricesRenEqu: [],
      packingSport: null,
      tdmInstrPayment: [],
      coachPayment: [],
      pricesTdmJumps: [],
      priceSlotsTdms: [],
      feeStudents: null,
      tdmPackingPrice: null,
      equipTdmStudent: null,
      equipLevel2: null,
      equipLevel3: null,
      instrucPacking: null,
      studPacking: null,
      priceCam: null,
      priceEquipTdm: null,
      
      barriModalMessage: null,
      search: '',

      messageHsPlane: null,
      messageHsPilot: null,
      messageEquipRent: null,
      userTransactions: [],
      summary: [],


      equipments: []
    }
  },
  mounted(){
    this.getTandas()
    this.getPrices()
    this.getPricesSlots()
    this.getPricesStudent()
    this.getPricesTDMS()
    this.getEquipment()
  },
  computed: {
    optionsFormatted() {
      return this.options.map(option => ({
        text: option,
        value: option
      }));
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
  methods: {
    getTandas () {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_TANDAS}?today=true`)
      //this.$http.get(`http://localhost:8082/api/tandas?today=true`)
          .then(response => {
            this.tandas = response.data.payload
            console.log("TANDAS:", this.tandas)
            localStorage.setItem('tandas', JSON.stringify(this.tandas));
            //this.$store.commit('setTandas', response.data.payload);
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error)
          })
    },
    openTimePicker(item) {
      this.selectedTime = item.time; // Almacena la hora seleccionada
      this.selectTandaTimeId= item._id
      this.pickerOpen = true; // Abre el diálogo
    },
    updateTime(newTime) {
      console.log("Aqui NADA", newTime)
      //this.selectedTime = newTime;
    },
    updateSelectedTime(newSelectedTime) {
      let newData = {
        time: newSelectedTime
      };
      this.$http.put(`${process.env.VUE_APP_TANDAS}/${this.selectTandaTimeId}`, newData)
        .then((response) => {
          console.log(response.data.payload, "respuesta de updateSelectedTime");
          // Cambiar el icono del botón según el nuevo valor de flight_status
          this.getTandas()

        }).catch((err) => {
          console.log(err);
          // Realizar acciones en caso de error
          // ...
        });
    },
    edit(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    cancelEdit() {
      this.selectedItem = null;
      this.showDialog = false;
    },
    saveEdit(value) {
      if (this.selectedItem) {
        this.selectedItem.name = value;
      }
      this.selectedItem = null;
      this.showDialog = false;
    },
    changePlane(){
      console.log("change plane")
    },
    showLandingConfirmation(item) {
    //const allNamesComplete = item.slots.every(slot => slot.slot.name !== null);
    //if (!allNamesComplete) {
    //  eventBus.$emit('toast', { show: true, text: "La tanda no está completa", color: "red" });
    //} else {
      if (item.status.f_status === 1) {
        this.showIcon1 = true;
        this.showIcon2 = true;
        this.showIcon3 = false; // Agregar esta línea para ajustar showIcon3
      } else if (item.status.f_status === 2) {
        this.showIcon1 = false;
        this.showIcon2 = true;
        this.showIcon3 = true;
      }
      if(item.number_tanda !== null && item.plane.name !== '' && item.pilot.name !== '' && item.pilot.name !== undefined && item.altitude.value !== undefined && item.slots[0].slot && item.slots[1].slot && item.slots[2].slot && item.slots[3].slot){
        this.landingConfirmation = true;
        this.selectedTanda = item
      } else {
        eventBus.$emit('toast', { show: true, text: "Faltan datos necesarios en la tanda", color: "red" });
      }
    //}
      
    },
    closeConfirmationModal(){
      this.landingConfirmation = false;
      //this.selectedTanda = null //agregue esta linea para solucionar quizas ambos modales abiertos
    },
    saveEditedValueBottomSheet() {
      // Implementa la lógica para manejar el evento 'saveBottomSheet' aquí
      this.showBarriBottomSheet = false //esta linea esta al pedo aca?
    },
    closeConfirmationModalBottomSheet() {
      this.showBarriBottomSheet = false
    },
    saveEditedValue(){
      let id = this.selectedTanda._id;
      let newData = {
        status: {
          f_status: this.selectedTanda.status.f_status === 1 ? 2 : 3
        }
      };
      this.$http.put(`${process.env.VUE_APP_TANDAS}/${id}`, newData)
        .then((res) => {
          console.log( "respuesta de actualizacion estado de tanda" , res)          
          this.getTandas()
          /*
          this.barriModalMessage = null
          if(this.selectedTanda.status.f_status === 2){
            console.log("AQUI ACTUALIZAR MENSAJITO")
            this.barriModalMessage = `Se sumaran hs al avión: ${this.selectedTanda.plane.name} y al piloto: ${this.selectedTanda.pilot.name}`
          }
          */
         if(this.selectedTanda.status.f_status === 2){
          this.updateHsPlane()
          
          // CORREGIR ERROR PILOTO
          //this.updateHsPilot()
          this.updateBalancePilot()

          //nueva funcion
          this.updateCharge()

          // funcion anterior para transacciones desde front
          //this.updateBalanceFlyers();
         }
         /*
            this.barriModalMessage = 'Se actualizaron las horas de piloto y avion, se efectuaran transacciones de cobro'
            this.updateHsPilot()
            this.updateBalanceFlyers()
          }
          */

        }).catch((err) => {
          console.log(err);
        });
      this.landingConfirmation = false;
    },
    updateHsPlane(){
      let planeId = this.selectedTanda.plane._id;
      let bal_r_h = this.calculateBal_r_h(this.selectedTanda.altitude.value);

      if (bal_r_h !== 0.0) {
        let newData = {
          bal_r_h: parseFloat(bal_r_h)
        };

        this.$http.put(`${process.env.VUE_APP_PLANES}/${planeId}`, newData)
          .then((response) => {
            if(response.status === 200){
              this.messageHsPlane = `Se sumaron ${parseFloat(bal_r_h)} hs reales al avión.`
            }
          })
          .catch((err) => {
            console.log("error actualizacion hs avion", err)
            eventBus.$emit('toast', 
            { show: true, text: `No se han podido actualizar las horas del avión: ${err}`, 
            color: "red" })
          });
      } else {
        console.log("bal_r_h es 0.0, no se realizará la actualización.");
      }
    },
    updateHsPilot(){
      let pilotId = this.selectedTanda.pilot.id;
      let bal_r_h = this.calculateBal_r_h(this.selectedTanda.altitude.value);

      if (bal_r_h !== 0.0) {
        const newData = {
          pilot: {
            bal_h: parseFloat(bal_r_h),
          },
        };

        //this.$http.put(`http://localhost:8082/api/users/${pilotId}`, newData)
        this.$http.put(`${process.env.VUE_APP_USERS}/${pilotId}`, newData)
          .then((res) => {
            console.log("respuesta ACTUALIZACION HS PILOT", res)
            if(res.status === 200){
              this.messageHsPilot = `Se sumaron ${parseFloat(bal_r_h) / 2} hs al piloto.`
            }
          })
          .catch((err) => {
            console.log(err);
            eventBus.$emit('toast', { show: true, text: "No se han podido actualizar las horas del piloto", color: "red" });
          });
      } else {
        console.log("bal_r_h es 0.0, no se realizará la actualización del piloto.");
      }

      /* sumar el pago de vuelo a cuenta corriente de pilotos??? 
      
      PAGO A PILOTOS AQUI
      
      const newData = {
        transactions: [
          {
            type: 1,
            amount: parseFloat(this.valueCash), //parseFloat(this.valueCash).toFixed(2) pruebo quitarle tofiex
            description: this.description,
          }
        ]
      };
      console.log("transactions", newData)

      this.$http.put(`http://localhost:8082/api/users/${this.id}`, newData)
        .then(response => {
          console.log("RESPUESTA DE TRANSACCION GUARDADA, .status", response.status)
          if(response.status === 200){
            eventBus.$emit('toast', { show: true, text: "Transacción efectuada correctamente", color: "green" })
            this.tempAmount = this.amount.value
            this.description = ''
            this.valueCash = null
            this.showAddAmount = false
            this.$router.push('/manifest/flyersList');
          }
          // esta emitiendo mensaje de ok pero no funciona bien
        })
        .catch(error => {
          console.log(error);
        });
        */
    },
    updateBalancePilot(){
      let pilotId = this.selectedTanda.pilot.id;
      const description = 'Se acreditaron 0 pesos arg por vuelo a ... ' 
      const newData = {
        transactions: [
          {
            type: 0,
            amount: 0,
            description: description
          }
        ] // Nuevas transacciones
      };
      this.updateUserBalance(pilotId, newData);
      
      const userTransaction = {
        name: 'Piloto',
        description: description
      };
      this.userTransactions.push(userTransaction);

    },
    /*
    getPriceFeeCoach(idParam, altitudeParam){
      console.log("idParamMMMMM", idParam)
      console.log("altitudeParam", altitudeParam)

      this.$http.get(`${process.env.VUE_APP_USERS}/${idParam}`)
        .then(response => {
          const payload = response.data.payload;


          // Haz lo que necesites con la propiedad is_coach_q
          console.log("is_coach_q:", isCoachQ);

        })
        .catch(error => {
          console.log(error);
        });
      console.log("no EJECUTA LLAMADO__????")
      //return 10
    },
    */
    updateBalanceFlyers() {
      //AGREGAR ALQUILERES DE EQUIPO
      const slots = this.selectedTanda.slots;
      const type_coach = this.selectedTanda.type_coach;
      const altitude = this.selectedTanda.altitude.value;
      let coacheesCount = 0; // Contador de coacheados
      let priceFeeCoach;
      if(type_coach !== 0){
        slots.forEach(slot => {
          if (slot.slot.is_coachee) {
            coacheesCount++;
          }
        });
      }
      //const coachPrice = this.coachPayment.find(price => price.coachPayment.typeAlt === altitude) // busca precio de coach segun altura 
      //const priceFeeCoach = coachPrice.coachPayment.value //precio del fee a abonar al coach
      // consultar si es la plaza de un SOCIO


      const slotCoach = this.getPriceForAltitudeAndType(altitude, 3).value; // precio de slot del coach
      const total = slotCoach + priceFeeCoach + this.packingSport // AGREGAR AQUI PLEGADO DEL COACH // precio total gastado por coach q abonan los coacheados, fee + plaza de coach
      const coacheePrice = total / coacheesCount; // precio anterior dividido en coacheados

      slots.forEach(slot => {
        const userId = slot.slot.id_slot; //id del slot
        const name = slot.slot.name; // nombre
        const typeStatus = slot.slot.typeStatus; //
        const equipmentID = slot.slot.equipment ? slot.slot.equipment._id : null
        const equipmentType = slot.slot.equipment ? slot.slot.equipment.category : null
        let description;
        let priceRentEquip = 0

        if (slot.slot.fr) {
          //chequear aqui que el equipo sea free, en caso de que no debitar alquiler
          const userTransaction = {
            name: name,
            description: 'Slot Free'
          };
          this.userTransactions.push(userTransaction);
        } else {
          // ingresa en cobro deportivos, se debita SU PROPIA PLAZA
          // tiene userId para q no entren pasajeros
          if (userId && slot.slot.is_coachee === true || userId && slot.slot.is_coachee_2 === true) { // cobro de plaza propia en coacheados?
            let price;
            let sum;
            //ESCUELA
            if (slot.slot.role.includes(9)) {
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, 5).value; // Asignar 5 como typeStatus para jubilados
              sum = priceRentEquip + price
              description = `Total: ${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de Jubilado ($ ${price} USD) + Alquiler Equipo (${priceRentEquip})`;
            } else if (slot.slot.role.includes(12)){
            //jubilados??
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, 6).value; // Usar typeStatus original para otros roles
              sum = priceRentEquip + price
              description = `Total: ${sum} USD. Plaza a ${this.getTypeAltWord(altitude)}, aplica DESCUENTO por paquete ($ ${price} USD) + Alquiler Equipo ($ ${priceRentEquip})`;
            } else if(slot.slot.role.includes(1)|| typeStatus === 1){
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, typeStatus).value; // Usar typeStatus original para otros roles
              sum = priceRentEquip + price
              description = `Total: ${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de STAFF VIP (${price} USD) + Alquiler Equipo ($ ${priceRentEquip})`;
            } else if (
              slot.slot.role.includes(2) || 
              slot.slot.role.includes(3) || 
              slot.slot.role.includes(4) || 
              slot.slot.role.includes(5) || 
              slot.slot.role.includes(6)
            ){
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, typeStatus).value; // Usar typeStatus original para otros roles
              sum = priceRentEquip + price
              description = `Total: ${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de STAFF (${price} USD) + Alquiler Equipo ($ ${priceRentEquip})`;
            } else {
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, typeStatus).value; // Usar typeStatus original para otros roles
              sum = priceRentEquip + price
              description = `Total: ${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de Socio al día (${price} USD) + Alquiler Equipo ($ ${priceRentEquip})`;
              if(price === 0){
                description = `Precio es igual a 0, NO se efectuaron transacciones.`;
              }
            }
  
            if (price !== null && price !== undefined) {
              //const description = `Se debitaron ${price.value} USD por salto a ${this.getTypeAltWord(altitude)}`;
              const newData = {
                transactions: [
                  {
                    type: 2,
                    amount: sum,
                    description: description
                  }
                ] // Nuevas transacciones
              };
              this.updateUserBalance(userId, newData);
              
              const userTransaction = {
                name: name,
                description: description
              };
              this.userTransactions.push(userTransaction);
            
            } else {
              eventBus.$emit('toast', { show: true, text: `Precio no encontrado. Está correctamente ingresado el precio de la altura de esta tanda?`, color: "red" });
            }
          }
  
          //pago a coach & cobro coacheados, instructores actualizacion pasajeros
          if (slot.slot.is_coach || slot.slot.is_coach_b){
            // Calcula el monto que se le debe pagar al coach
            if (coacheesCount === 0) {
              console.log("No hay coacheados, el coach no cobra.");
            } else {
              //priceFeeCoach = this.getPriceFeeCoach(userId, altitude)

              //console.log("respuestta de priceFeeCoach", priceFeeCoach)




              console.log(`El coach cobra $${priceFeeCoach}, cada coacheado paga $${coacheePrice}.`);
              description = `Se acreditaron $${priceFeeCoach} USD por FEE por salto a ${this.getTypeAltWord(altitude)} en condición de COACH.`
  
              const newData = {
                transactions: [
                  {
                    type: 7, // PAGO DE PLAZA DE COACH
                    amount: priceFeeCoach,
                    description: description
                  }
                ] // Nuevas transacciones
              };
            this.updateUserBalance(userId, newData)
              .then(() => {
                console.log("entra en el then de pago a coach")
                // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                const userTransaction = {
                  name: name,
                  description: description
                };
                this.userTransactions.push(userTransaction);
              })
              .catch((error) => {
                console.log("aqui OTRO ERRORRRR OTRO")
                // Ocurrió un error durante la actualización del saldo
                console.log("Error al actualizar el saldo:", error);
              });
  
              // Calcula el precio que debe pagar el coacheado en función de coacheesCount y coachPrice
              // Realiza la transacción para pagar al coach y a los coacheados
              // this.updateUserBalance(userIdDelCoach, coachPrice);
              // this.updateUserBalance(userIdDelCoachee, coacheePrice);
            }
            if(slot.slot.is_coach_b){
              console.log(`El coach cobra $${priceFeeCoach}`);
  
              /// lo hice hoy !!! chequear
              description = `Se acreditaron $${priceFeeCoach} USD por FEE por salto a ${this.getTypeAltWord(altitude)} en condición de COACH.`
  
              const newData = {
                transactions: [
                  {
                    type: 7, // PAGO DE PLAZA DE COACH
                    amount: priceFeeCoach,
                    description: description
                  }
                ] // Nuevas transacciones
              };
            this.updateUserBalance(userId, newData)
              .then(() => {
                console.log("entra en el then de pago a coach")
                // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                const userTransaction = {
                  name: name,
                  description: description
                };
                this.userTransactions.push(userTransaction);
              })
              .catch((error) => {
                console.log("aqui OTRO ERRORRRR OTRO")
                // Ocurrió un error durante la actualización del saldo
                console.log("Error al actualizar el saldo:", error);
              });
            }
          } else if (slot.slot.is_coachee){
  
            if (slot.slot.is_student.level === 3 && slot.slot.is_coachee === true){
              console.log("es alumno coacheado con A")
            }
              // AGREGAR SI ALUMNO ES COACHEADO
            let coacheados = '';
            if(coacheesCount > 1){
              coacheados = `- Monto total divido en ${coacheesCount} paracaidistas.`
            }
            description = `Débito: $${coacheePrice} USD por: FEE ($ ${priceFeeCoach} USD) + plegado del coach ($ ${this.packingSport} USD) + plaza de coach ($${slotCoach} USD) a ${this.getTypeAltWord(altitude)}. ${coacheados}`
  
            const newData = {
              transactions: [
                {
                  type: 11, // 11, se debita de cuenta de socio comun
                  amount: coacheePrice,
                  description: description
                }
              ] // Nuevas transacciones
            };
            this.updateUserBalance(userId, newData)
            .then(() => {
              console.log("entra en el then de pago a coach")
              // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
              const userTransaction = {
                name: name,
                description: description
              };
              this.userTransactions.push(userTransaction);
            })
            .catch((error) => {
              console.log("Error al actualizar el saldo:", error);
            });
          } else if (slot.slot.is_coachee_2){
            if (slot.slot.is_student.level === 3 && slot.slot.is_coachee_2){
              console.log("es alumno coacheado con B")
            }
            console.log("coacheado 2")
            if(coacheesCount > 1){
              console.log("Aqui habria un error")
            }
            description = `Débito: $${total} USD por: FEE + plegado + plaza de coach a ${this.getTypeAltWord(altitude)}.`
  
            const newData = {
              transactions: [
                {
                  type: 11, // 11, se debita de cuenta de socio comun
                  amount: total,
                  description: description
                }
              ] // Nuevas transacciones
            };
            this.updateUserBalance(userId, newData)
            .then(() => {
              console.log("entra en el then de pago a coach")
              // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
              const userTransaction = {
                name: name,
                description: description
              };
              this.userTransactions.push(userTransaction);
            })
            .catch((error) => {
              console.log("Error al actualizar el saldo:", error);
            });
          } else if (slot.slot.tandemOptions && slot.slot.tandemOptions.pass_id ) { //Es PASAJERO

            //const passengerId = slot.slot.tandemOptions.pass_id
            description = ` Estado actualizado. Debito por Bautismo ok`
            this.updateTdmStatus(slot.slot.tandemOptions.pass_id, slot.slot.tandemOptions.chargedType)
              .then(() => {
                console.log("entra en el then de updateTdmStatus, hay respuesta")
                // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                const userTransaction = {
                  name: slot.slot.tandemOptions.passengers_name,
                  description: description
                };
                this.userTransactions.push(userTransaction);
              })
              .catch((error) => {
                console.log("aqui OTRO ERRORRRR OTRO")
                // Ocurrió un error durante la actualización del saldo
                console.log("Error al actualizar el saldo:", error);
              });
          } else if (slot.slot.is_tandem === true) {
            const valueTdm = this.tdmInstrPayment.find(price => price.tdmInstrPayment.typeAlt === altitude);
            description = `Se acreditaron $${valueTdm.tdmInstrPayment.value} USD por salto CON PASAJERO a ${this.getTypeAltWord(altitude)}.`
            const newData = {
              transactions: [
                {
                  type: 6, // pago a instructor tandem por bautismo
                  amount: valueTdm.tdmInstrPayment.value,
                  description: description
                }
              ] // Nuevas transacciones
            };
            this.updateUserBalance(userId, newData)
              .then(() => {
                // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                const userTransaction = {
                  name: name,
                  description: description
                };
                this.userTransactions.push(userTransaction);
              })
              .catch((error) => {
                // Ocurrió un error durante la actualización del saldo
                console.log("Error al actualizar el saldo:", error);
              });
          } else if (slot.slot.is_tandem_al === true || slot.slot.is_aff){
            // agregar validacion is_3 y is_2 externos
            if(slot.slot.is_aff){
              description = `Se acreditaron $${this.feeStudents} USD por salto con alumno a ${this.getTypeAltWord(altitude)}.`
            } else if(slot.slot.is_tandem_al){
              description = `Se acreditaron $${this.feeStudents} USD por salto TDM CON ALUMNO a ${this.getTypeAltWord(altitude)}.`
            }
            const newData = {
              transactions: [
                {
                  type: 9, // pago a instructor tandem por bautismo
                  amount: this.feeStudents,
                  description: description
                }
              ] // Nuevas transacciones
            };
            this.updateUserBalance(userId, newData)
              .then(() => {
                // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                const userTransaction = {
                  name: name,
                  description: description
                };
                this.userTransactions.push(userTransaction);
              })
              .catch((error) => {
                console.log("Error al actualizar el saldo:", error);
              });
          } else if (slot.slot.is_student.level && slot.slot.role.includes(8)) { // si es ALUMNO, deberia incluir en condificional que el level sea 1, 2 o 3
            const PRUEBA = this.getPriceAltStudent(altitude, this.pricesStudent)
            console.log("PRUEBA PRECIO", PRUEBA)
            const slotStudentPrice = this.getPriceAltStudent(altitude, this.pricesStudent).students.value;
            let finallyPrice = 0

            if(slot.slot.is_student.level === 1){
              // TDM de escuela
              const slots2Student = slotStudentPrice + slotStudentPrice
              finallyPrice = slots2Student + this.feeStudents + this.tdmPackingPrice + this.equipTdmStudent;
              if (slotStudentPrice && this.feeStudents && finallyPrice) {
                description = `Se debitaron $${finallyPrice} USD por salto TDM de curso. 2 plazas a ${this.getTypeAltWord(altitude)} por ($ ${slots2Student} USD) + Fee Instructor ($ ${this.feeStudents}) + Equipo Etapa 1 ($ ${this.equipTdmStudent}) + plegado TDM: ($ ${this.tdmPackingPrice})`
                
                const newData = {
                  transactions: [
                    {
                      type: 10,
                      amount: finallyPrice,
                      description: description
                    }
                  ] // Nuevas transacciones
                };
                this.updateUserBalance(userId, newData)
                  .then(() => {
                    console.log("entra en el then de updateUserBalance, hay respuesta")
                    // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                    const userTransaction = {
                      name: name,
                      description: description
                    };
                    this.userTransactions.push(userTransaction);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
  
              } else {
                console.log(`No se encontró precio`);
              }
            } else if (slot.slot.is_student.level === 2){
              // asistido doble
              if(slot.slot.is_student.is_3){
                let slots3Student = slotStudentPrice + slotStudentPrice + slotStudentPrice;
                const fee2 = this.feeStudents + this.feeStudents;
                const totalPackingInst = this.instrucPacking + this.instrucPacking,
                finallyPrice = slots3Student + fee2 + this.equipLevel2 + totalPackingInst + this.studPacking;
                priceRentEquip = this.equipLevel2 // agregado para probar transaccion 23, de pago a duenio de equipo
                
                description = `Se debitaron $${finallyPrice} USD por salto DOBLE ASISTIDO. 3 slots ($${slots3Student} USD) a ${this.getTypeAltWord(altitude)} + 2 Fee de Instructor($${fee2} USD) + Equipo Etapa 2 ($ ${this.equipLevel2} USD) + 2 plegados Instructores ($ ${totalPackingInst} USD) + 1 plegado ESC ($ ${this.studPacking} USD)`;
                
                const newData = {
                  transactions: [
                    {
                      type: 10,
                      amount: finallyPrice,
                      description: description
                    }
                  ] // Nuevas transacciones
                };
                this.updateUserBalance(userId, newData)
                  .then(() => {
                    console.log("entra en el then de updateUserBalance, hay respuesta")
                    // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                    const userTransaction = {
                      name: name,
                      description: description
                    };
                    this.userTransactions.push(userTransaction);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else if (slot.slot.is_student.is_2){ // asistido simple
                let slots2Student = slotStudentPrice + slotStudentPrice;
                priceRentEquip = this.equipLevel2 // agregado para probar transaccion 23, de pago a duenio de equipo
                finallyPrice = slots2Student + this.feeStudents + this.instrucPacking + this.studPacking + this.equipLevel2;
                // falta equipo escuela
                description = `Se debitaron $${finallyPrice} USD por salto ASISTIDO SIMPLE. 2 slots ($${slots2Student} USD) a ${this.getTypeAltWord(altitude)} + 1 Fee de Instructor($${this.feeStudents} USD) + 1 plegado Instructor ($ ${this.instrucPacking} USD) + Equipo Etapa 2 ($ ${this.equipLevel2} USD) + 1 plegado ESC ($ ${this.studPacking} USD)`;

                const newData = {
                  transactions: [
                    {
                      type: 10,
                      amount: finallyPrice,
                      description: description
                    }
                  ] // Nuevas transacciones
                };
                console.log("console 4")
                this.updateUserBalance(userId, newData)
                  .then(() => {
                    // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                    const userTransaction = {
                      name: name,
                      description: description
                    };
                    this.userTransactions.push(userTransaction);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            } else if (slot.slot.is_student.level === 3){ 
              // salta SOLO
              // falta equipo escuela
              priceRentEquip = this.equipLevel3// agregado para probar transaccion 23, de pago a duenio de equipo
              finallyPrice = slotStudentPrice + this.studPacking + this.equipLevel3;
              description = `Se debitaron $${finallyPrice} USD por salto Alumno SOLO. 1 slots ($${slotStudentPrice} USD) a ${this.getTypeAltWord(altitude)}. + 1 equipo Etapa 3 ($ ${this.equipLevel3}) + plegado escuela ($ ${this.studPacking} USD)`;

              const newData = {
                transactions: [
                  {
                    type: 10,
                    amount: finallyPrice,
                    description: description
                  }
                ] // Nuevas transacciones
              };
              this.updateUserBalance(userId, newData)
                .then(() => {
                  // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                  const userTransaction = {
                    name: name,
                    description: description
                  };
                  this.userTransactions.push(userTransaction);
                })
                .catch((error) => {
                  console.log(error);  
                });
            } 
          } else if (slot.slot.is_cam) {
            description = `Se acreditaron $ ${this.priceCam} USD por salto como camarógrafo`;
            const newData = {
              transactions: [
                {
                  type: 4, // pago a camara
                  amount: this.priceCam,
                  description: description
                }
              ] // Nuevas transacciones
            };
            this.updateUserBalance(userId, newData)
              .then(() => {
                // La actualización del saldo fue exitosa, ahora puedes agregar userTransaction
                const userTransaction = {
                  name: name,
                  description: description
                };
                this.userTransactions.push(userTransaction);
              })
              .catch((error) => {
                console.log("Error al actualizar el saldo:", error);
              });
              
          } else if (userId) { // calculo de slots, usuarios comunes
            let price;
            let sum;
            if (slot.slot.role.includes(9)) {
              if (slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, 5).value; // JUBILADOS
              sum = price + priceRentEquip
              description = `Total: $${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de Jubilado ($ ${price}USD) + Alquiler de Equipo: ($ ${priceRentEquip} USD)`;
            } else if(slot.slot.role.includes(1)|| typeStatus === 1){ // STAFF VIP
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, typeStatus).value; 
              sum = price + priceRentEquip
              description = `Total: $${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de STAFF VIP ($${price} USD) + Alquier de Equipo: ($ ${priceRentEquip} USD)`;
            } else if (
              slot.slot.role.includes(2) || 
              slot.slot.role.includes(3) || 
              slot.slot.role.includes(4) || 
              slot.slot.role.includes(5) || 
              slot.slot.role.includes(6)
            ){
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              } else {
                console.log("equipment.not_r parece no estar definida");
              }
              price = this.getPriceForAltitudeAndType(altitude, typeStatus).value; // Usar typeStatus original para otros roles
              sum = price + priceRentEquip
              description = `Total: $ ${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de STAFF ($${price} USD) + Alquiler de Equipo: ($${priceRentEquip} USD)`;
            } else if (slot.slot.role.includes(12)){
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, 6).value; // Usar typeStatus original para otros roles
              sum = price + priceRentEquip
              description = `Total: $${sum} USD. Plaza a ${this.getTypeAltWord(altitude)}, aplica DESCUENTO por paquete($ ${price} USD). Alquiler de Equipo: ${priceRentEquip}`;
            } else {
              if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
                priceRentEquip = this.getRentPriceForType(typeStatus, equipmentType)
              } else if (slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === true){
                priceRentEquip = 0
              }
              price = this.getPriceForAltitudeAndType(altitude, typeStatus).value; // Usar typeStatus original para otros roles
              sum = price + priceRentEquip
              description = `Total: $${sum} USD. Plaza a ${this.getTypeAltWord(altitude)} en condición de Socio al día ($ ${price} USD)+ Alquier de Equipo:${priceRentEquip}`;
              if(price === 0){
                description = `Precio es igual a 0, NO se efectuaron transacciones.`;
              }
            }
  
            if (price !== null && price !== undefined) {
              //const description = `Se debitaron ${price.value} USD por salto a ${this.getTypeAltWord(altitude)}`;
              const newData = {
                transactions: [
                  {
                    type: 2,
                    amount: sum,
                    description: description
                  }
                ] // Nuevas transacciones
              };
              this.updateUserBalance(userId, newData);
              
              const userTransaction = {
                name: name,
                description: description
              };
              this.userTransactions.push(userTransaction);
            } else {
              eventBus.$emit('toast', { show: true, text: `Precio no encontrado. Está correctamente ingresado el precio de la altura de esta tanda?`, color: "red" });
            }
          }
          //SUMAR $ AL DUENIO
          // sumar validacion que id no sea not rent
          if(equipmentID && equipmentID !== null && equipmentID !== undefined){
            console.log("slot.slot.equipment.not_r", slot.slot.equipment.not_r)
            if(slot && slot.slot && slot.slot.equipment && slot.slot.equipment.not_r === false){
              this.updateQEquip(equipmentID);
              this.updateOrwner(equipmentID, priceRentEquip);
            }
          } else {
            console.log("aqui poner mensaje, no se encuentra equipo")
          }

        } //cierre de condicional para todos los q no son free
      });
      console.log("Aqui deberia abrir el modal");
      this.showBarriBottomSheet = true;
      this.getTandas();
    },
    updateUserBalance(userId, newData) {
      console.log("llega a updateUserBalance puto?")
      return this.$http.put(`${process.env.VUE_APP_USERS}/${userId}`, newData)
        .then((response) => {
          console.log("hay respuesta WTF")
          console.log(response.data.payload, "respuesta users de pagos");
          console.log("SE EFECTUO DEBITO");
          //this.getTandas();
          return response.data; // Retorna los datos de respuesta
        })
        .catch((err) => {
          console.log(err);
          console.log("aqui ERRORRRR")
          eventBus.$emit('toast', { show: true, text: "No se ha podido actualizar la cuenta del paracaidista", color: "red" })
          throw err; // Lanza el error para que sea manejado por la función que llama a updateUserBalance
        });
    },
    updateQEquip(equipmentID) {
      // Crear el cuerpo de la solicitud con incrementQJumps
      const requestBody = {
        incrementQJumps: true, // Indicar que se debe incrementar q_jumps en 1
      };

      this.$http.put(`${process.env.VUE_APP_EQUIPMENT}/${equipmentID}`, requestBody)
        .then((response) => {
          console.log(response.data, "respuesta de equipos");
          console.log("Se actualizó el equipo?");
          //this.getTandas();
        })
        .catch((err) => {
          console.log(err);
          eventBus.$emit('toast', { show: true, text: "No se ha podido actualizar la cantidad de saltos del equipo", color: "red" });
        });
    },
    updateTdmStatus(passengerId, chargedType){
      // Determina el índice en this.priceSlotsTdms según el chargedType
      const arrayIndex = [11, 12, 13, 14].includes(chargedType) ? 0 : 1;

      // Accede directamente al precio correspondiente en this.priceSlotsTdms
      const priceSlot = this.priceSlotsTdms[arrayIndex];
      console.log("precio de slot CORRESPONDIENTE ES", priceSlot.value)
      // Determina el factor de multiplicación según el chargedType
      let multiplicationFactor = 1;
      let description = "";

      if ([1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18].includes(chargedType)) {
        //DOS PLAZAS
        multiplicationFactor = 2;
        description = 'Dos plazas TDMS';
      } else if ([5, 6, 7, 8].includes(chargedType)) {
        //3 PLAZAS
        multiplicationFactor = 3;
        description = 'Tres plazas TDMS'
      } else if ([9, 10].includes(chargedType)) {
        //4 PLAZAS
        multiplicationFactor = 4;
        description = 'Cuatro plazas TDMS'
      }

      // Calcula el valor final a debitar
      const totalSlotsTdm = priceSlot.value * multiplicationFactor;

      let additionalAmount = 0;
      let aditionalString = ''
      if ([5, 6, 7, 8].includes(chargedType)) {
        additionalAmount = this.priceCam;
        aditionalString = `+ 1 Cam ( ${this.priceCam} USD) `
      } else if ([9, 10].includes(chargedType)) {
        additionalAmount = 2 * this.priceCam;
        aditionalString = `+ 2 cam (${this.priceCam + this.priceCam} USD)`
      }

      // Calcula el monto total de la transacción
      const totalAmount = totalSlotsTdm + this.priceEquipTdm + additionalAmount;

      console.log("VALOR FINAL DE SLOTSSSS TDMS a debitar:", totalSlotsTdm, this.priceCam);

      const newTransaction = {
        jumped: true,
        //balance: 0,
        transactions: [
          {
            type: 2, // DEBITAR MONTO DE PLAZAS
            amount: totalAmount, // CONSEGUIR PRECIO CORRECTO, alquiler equipo + plazas
            description: `Débito por Bautismo: ${description} ( ${totalSlotsTdm} USD) + equipo ( ${this.priceEquipTdm} USD) ${aditionalString}.`,
          },
        ],
      };
      
      console.log("id tdm recibido en funcion para actualizar tdm", passengerId, "y newTransaction", newTransaction)
      /*
      const updateData = {
        jumped: true
      };
      */
      return this.$http.put(`${process.env.VUE_APP_PASSENGERS}/${passengerId}`, newTransaction)
        .then((response) => {
          console.log("respuesta actualizacion tdms:", response.status);
          //this.getTandas();
        })
        .catch((err) => {
          console.log("error en actualizacion de tdms:")
          console.log(err);
          eventBus.$emit('toast', { show: true, text: "No se ha podido actualizar la cuenta del paracaidista", color: "red" })
          // Realizar acciones en caso de error
        });
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
    },
    getPriceForAltitudeAndType(altitude, typeStatus) {
      if(typeStatus === 0){
        eventBus.$emit('toast', { show: true, text: "La categoría computada no es válida", color: "red" })
        return 0
      }
      // Buscar el objeto de precios correspondiente a la altura
      const priceList = this.prices.find(priceItem => priceItem._id === altitude);

      if (priceList) {
        // Buscar el precio correspondiente al tipo de usuario
        const price = priceList.prices.find(priceItem => priceItem.typeStatus === typeStatus);
        return price; // Devuelve el objeto de precio encontrado
      }

      return 0; // Si no se encuentra el precio, devolver null o manejar el caso según tus necesidades
    },
    getRentPriceForType(typeStatus, equipmentType) {
      console.log("funcion recibe typeStatus", typeStatus, "y equipmentType", equipmentType)
      // si typeStatus no es valido 
      if (typeStatus < 1 || typeStatus > 4) {
        eventBus.$emit('toast', { show: true, text: "El tipo de usuario no es válido", color: "red" });
        console.log("tipo de typeStatus NO valido")
        return 0; 
      }
      let typeRent;
      switch (equipmentType) {
        case 1: // Si equipmentType es 1, es tdm
          // Maneja caso de tdm, no deberia
          break;
        case 2: // Si equipmentType es 2, es ESC
          typeRent = 1; // Escuela
          break;
        case 3: // Si equipmentType es 3, es DEP
          typeRent = 2; // Deportivo
          break;
        default:
          eventBus.$emit('toast', { show: true, text: "El tipo de equipo no es válido", color: "red" });
          return 0; // O maneja el caso según tus necesidades
      }

      console.log("typeRent luego del switch", typeRent)
      console.log("tipo de dato", typeof typeRent)
      console.log("this.pricesRenEqu", this.pricesRenEqu)
      // Busca el objeto de precios correspondiente al typeRent
      const rentPrice = this.pricesRenEqu.find(priceItem => priceItem.rent.typeRent === typeRent);

      console.log("dato procesado, rentPrice: ", rentPrice)
      if (rentPrice) {
        // Ahora, según el typeStatus, elige el precio adecuado
        let price;
        switch (typeStatus) {
          case 1:
            price = rentPrice.rent.valueStaffVip;
            break;
          case 2:
            price = rentPrice.rent.valueStaff;
            break;
          case 3:
            price = rentPrice.rent.value;
            break;
          case 4:
            price = rentPrice.rent.valueNonMember;
            break;
          default:
            eventBus.$emit('toast', { show: true, text: "El tipo de usuario no es válido", color: "red" });
            return 0; // O maneja el caso según tus necesidades
        }
        return price;
      }
      eventBus.$emit('toast', { show: true, text: "El tipo de equipo no tiene precios definidos", color: "red" });
      console.log("El tipo de equipo no tiene precios definidos")
      return 0; // O maneja el caso según tus necesidades
    },
    updateOrwner(idParam, priceRentParam){
      console.log("priceRentParam", priceRentParam)
      const equip = this.equipments.find(equipo => equipo._id.toString() === idParam);
      console.log("equipo encontrado:", equip)
      if (equip) {
        const ownerID = equip.owner.id;
        const ownnerA = equip.owner.alias;
        console.log("ownerID", ownerID, ownnerA)

        const description = `Se acreditaron ${priceRentParam} USD a la cuenta de ${ownnerA} por utilización de equipo`
        const newData = {
          transactions: [
            {
              type: 23,
              amount: priceRentParam,
              description: description
            }
          ] // Nuevas transacciones
        };
        this.updateUserBalance(ownerID, newData);
        this.messageEquipRent = "Se acreditaron pagos a dueños de equipos" 
 
        // HACER ACTUALIZACION DE CUENTA DEL PROPIETARIO
      } else {
        eventBus.$emit('toast', { show: true, text: "Equipo no encontrado", color: "red" });
      }
    },
    getEquipment() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_EQUIPMENT}`)
        .then(response => {
          this.equipments = response.data.payload
        })
        .catch(error => {
          this.loading = false;
        console.log(error)
      //
      });
    },
    getPricesSlots() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=1`)
        .then((response) => {
          this.prices = response.data.payload;
          console.log("responseData de getSLOTS:", this.prices)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPricesStudent() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=7`)
        .then((response) => {
          this.pricesStudent = response.data.payload;
          //fee instructor
          const pS = this.pricesStudent.find((price) => price.students.typeCategory === 11);
          this.feeStudents = pS.students.value

          this.tdmPackingPrice = this.pricesStudent.find((price) => price.students.typeCategory === 15).students.value;

          this.equipTdmStudent = this.pricesStudent.find((price) => price.students.typeCategory === 12).students.value;
          this.equipLevel2 = this.pricesStudent.find((price) => price.students.typeCategory === 13).students.value;
          this.equipLevel3 = this.pricesStudent.find((price) => price.students.typeCategory === 14).students.value;
          this.instrucPacking = this.pricesStudent.find((price) => price.students.typeCategory === 17).students.value;

          console.log("Plegado instructor:", this.instrucPacking)
          this.pricesStudent = this.pricesStudent.filter((price) => {
            return [8, 9, 10, 20].includes(price.students.typeCategory);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPricesTDMS() {
      this.$http
      .get(`${process.env.VUE_APP_PRICES}?tipo=6`)
      .then((response) => {
        const pricesTdmData = response.data.payload;

        const priceSlotsTdms = pricesTdmData.filter(price => [30, 31, 32].includes(price.typeAlt));
        console.log("priceSlotsTdms:", priceSlotsTdms);
        // Verifica si se encontraron precios y guarda los valores en un arreglo
        if (priceSlotsTdms.length > 0) {
          this.priceSlotsTdms = priceSlotsTdms
          console.log("Precios 30, 31 y 32:", this.priceSlotsTdms);
        }
        //this.loadingCard = false;
      })
      .catch((error) => {
        console.log(error);
        //this.loadingCard = false;
      });
    },
    // aun solo trae precios instructores, traer otros tipos de precios y borrar las funciones
    getPrices() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}`)
        .then((response) => {
          const prices = response.data.payload;
          //this.pricesSlots = prices.filter((price) => price.priceType === 1);
          const pricesPacking = prices.filter((price) => price.priceType === 2); // precios packers
          const packingSport = pricesPacking.find((price) => price.Packing.typePacking === 3).Packing.value; // precio plegado deportivo
          if (packingSport) {
            // priceOfDeportivo es el objeto de PackingSchema con typePacking === 3
            this.packingSport = packingSport;
            console.log("Plegado DEPORTIVO: ", packingSport)
            console.log('Precio del plegado de equipo deportivo:', packingSport);
          } else {
            console.log('No se encontró precio para el tipo de plegado deportivo.');
          }
          // AQUI BUSCAR PRECIO DE PLEGADO DE UN DEPORTIVO
          this.pricesRenEqu = prices.filter((price) => price.priceType === 3);
          console.log("pricesRenEqu", this.pricesRenEqu)
          
          this.studPacking = pricesPacking.find((price) => price.Packing.typePacking === 2).Packing.value;
          console.log("plegado EScuela:", this.studPacking)

          //this.pricesPaymentPilots = prices.filter((price) => price.priceType === 4);
          this.tdmInstrPayment = prices.filter((price) => price.priceType === 5);
          console.log("tdmInstrPayment", this.tdmInstrPayment)
          const pricesTdmJumps = prices.filter((price) => price.priceType === 6);
          
          this.priceCam = pricesTdmJumps.find((price) => price.tandemJumps.typeAlt === 19).tandemJumps.value
          console.log("PRECIO CAMAROGRAFO", this.priceCam)

          this.priceEquipTdm = pricesTdmJumps.find((price) => price.tandemJumps.typeAlt === 21).tandemJumps.value
          console.log("PRECIO EQUIPO TDMS", this.priceEquipTdm)


          //this.pricesStudents =prices.filter((price) => price.priceType === 7);
          this.coachPayment =prices.filter((price) => price.priceType === 8);
          

        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    getPriceAltStudent(altitude, pricesStudent) {
      console.log("PARAMENTROS priceALT, imrpime 2", altitude, "y pricesustendss", pricesStudent)
      const altitudeToTypeCategory = {
        1: 8,   // 1 se mapea a 5 (altura 5000 ft)?
        2: 20, // 1 se mapea a 8 (altura 8000 ft)?
        3: 9,   // 3 se mapea a 9 (altura 10000 ft)
        4: 10   // 4 se mapea a 10 (altura 12000 ft)
      };

      const typeCategory = altitudeToTypeCategory[altitude];
      console.log("typeCategory", typeCategory)
      if (typeCategory !== undefined) {
        const priceForAltitude = pricesStudent.find(price => price.students.typeCategory === typeCategory);
        console.log("priceForAltitude", priceForAltitude)
        return priceForAltitude;
      } else {
        return null;
      }
    },
    // NO se usa
    sendEmail(){
      console.log("INGRESA A SEND MAIL")
      this.$http
        .get(`http://localhost:8082/api/email`)
        .then((response) => {
          console.log("response", response)     
          console.log("envio el mail?")
      
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCharge(){
      let idParam = this.selectedTanda._id;
      console.log("id de la tanda a enviar", idParam)
      console.log("TANDA Q SE ENVIA", this.selectedTanda)
      //this.$http.post(`${process.env.VUE_APP_TANDAS}/updateCharge`, { tandaId: idParam })
      this.$http.post(`http://localhost:8082/api/tandas/updateCharge`, { tandaId: idParam })
        .then((res) => {
          if(res.status === 200){
            this.summary = res.data.payload
            console.log("RESPUESTA:", res.data.payload)
            this.showBarriBottomSheet = true;
          }
        })
        .catch((err) => {
          console.log("error ", err)
          eventBus.$emit('toast', 
          { show: true, text: `Error, modificar`, 
          color: "red" })
        });
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
</style>