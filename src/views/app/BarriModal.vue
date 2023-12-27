<template>
  <v-dialog v-model="showBarriModal" max-width="500px">
    <v-card>
      <v-card-title class="">
        <span>{{ modalTitle }}</span>
        <span v-if="modalData"> {{ modalData.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" class="d-flex">
            <div v-if="modalData"> {{ modalData.description }}</div>
            <div v-if="modalData.html" v-html="modalData.html"></div>
            <v-spacer></v-spacer>
            <v-icon v-if="typeStatus === 1" color="yellow" size="25" class="pr-1">mdi-account-star</v-icon> 
            <v-icon v-if="typeStatus === 2" color="orange" size="25" class="pr-1">mdi-account-heart</v-icon>
            <v-icon v-if="typeStatus === 3" color="green" size="25" class="pr-1">mdi-account-check</v-icon>
            <v-icon v-if="typeStatus === 4" color="purple" size="25" class="pr-1">mdi-account-cash</v-icon>
          </v-col>
          
          <!-- BORRAR DESCRIPTION
          <v-col cols="12">
            <p v-if="description">{{ description }}</p>
          </v-col>
        -->
        </v-row>

        <v-divider color="primary" class="mt-2"></v-divider>
        <v-col cols="12" v-if="mode === 'monthlyFee'">
          <v-select
            v-model="selectedMonth"
            :items="monthsNotPaid"
            item-text="month"
            label="Seleccione el mes"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="mode === 'paymentDualTdm'">
          <v-select
            v-model="selectedInstructor"
            :items="instrOptions"
            item-text="name"
            item-value="id"
            label="Seleccione instructor"
            outlined
            return-object
          ></v-select>
        </v-col>

        <v-col cols="12" v-if="mode === 'paymentGeneralTheory'">
          <v-select
            v-model="selectedInstructors"
            :items="instrOptions"
            item-text="name"
            item-value="id"
            label="Seleccione instructor"
            outlined
            multiple 
          ></v-select>
        </v-col>

        <!--
        <v-col cols="12" v-if="mode === 'paymentpackA'">
           holi oli
        </v-col>
        -->
        <v-col cols="12" v-if="mode === 'paymentJumps'">
          <v-select
            v-model="altitude"
            label="Altura"
            outlined
            dense
            :items="altitudesOptions"
            :value="altitudesOptions.value"
            return-object
          ></v-select>
          <div class="d-flex align-center">
            <v-checkbox v-model="jumpsEnabled" class="pa-0"></v-checkbox>
            <p class="mt-3">Alquila Equipo?</p>
          </div>
          <v-select
            v-model="equipment"
            label="Equipos"
            outlined
            dense
            class="mt-4"
            :items="equipmentRentOptions"
            :item-text="'name_parachute'"
            :disabled="!jumpsEnabled"
            return-object
          ></v-select>
          <div class="d-flex align-center">
            <v-checkbox v-model="selfPackaging" class="pa-0"></v-checkbox>
            <p class="mt-3">Agregar Plegado:             <v-chip
            color="primary"
            class="ma-2"
          >
            <span v-if="equipment">Equipo Club</span>
            <span v-else>Equipo Propio</span>
          </v-chip></p>
          </div>
        </v-col>

        <!-- :initialValue="1" -->
        <barri-counter
        v-if="showCounter"
          :count="ticketsCount"
          @increment="incTicketsCount"
          @decrement="decTicketsCount"
        />

        <v-col cols="12" v-if="mode === 'SelectedTransactions'">
          <div class="d-flex align-center">
            <v-checkbox v-model="emailEnabled"></v-checkbox>
            <p class="mt-3">Deseas enviarlas a otro correo?</p>
          </div>
          <v-text-field
            v-model="email"
            label="Ingrese el correo electrónico"
            outlined
            :rules="emailRules"
            :disabled="!emailEnabled"
          ></v-text-field>
        </v-col>
        <div class="d-flex pt-4">
          <div>
            <div>
              <v-icon size="60" color="green">mdi-currency-usd</v-icon> 
              <span v-if="modalData.value" class="custom-font green--text" style="font-size: 2.5rem;"> 
                {{ modalData.value }} 
              </span>
              <span class="custom-font green--text" style="font-size: 2.5rem;">
                {{  totalCount }} USD
              </span>
            </div>

            <v-divider></v-divider>

            <div>
              <v-icon size="30" color="blue">mdi-currency-usd</v-icon>
              <span v-if="mode === 'paymentJumps'" class="custom-font blue--text" style="font-size: 1.5rem;">
                {{ totalArgs(totalCount) }} ARG
              </span>
              <span v-if="modalData.value" class="custom-font blue--text" style="font-size: 1.5rem;"> 
                {{ totalArgs(modalData.value) }} ARG
              </span>
            </div>
          </div>
        </div>
        <v-alert v-if="emailError">Correo incorrecto</v-alert>


        <v-alert v-if="totalCount > 0 && modalData && modalData.showAlert && modalData.showAlert === true || totalCount > 0 && totalCount < amount || modalData && modalData.showAlert" color="primary" dismissible>
          <div class="d-flex flex-column">
            <span>{{ modalData.alertMessage }}</span>
            <span>¿Deseas debitar el monto de su cuenta?</span>
          </div>
        </v-alert>
        <v-checkbox
          v-if="totalCount > 0 && modalData && modalData.showAlert && modalData.showAlert === true || totalCount > 0 && totalCount < amount || modalData && modalData.showAlert"
          v-model="isDebit"
          label="Debitar de cuenta"
        ></v-checkbox>
      </v-card-text>
        
      <v-card-actions class="pb-4 d-flex flex-column">
        <v-spacer></v-spacer>
        <v-btn dark block class="yellow--text mb-2" @click="saveAction">Aceptar</v-btn>
        <v-btn block color="red" class="yellow--text ma-0" @click="closeConfirmationModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { convertToArgs } from '../../utils/utils'
import BarriCounter from '../beers/BarriCounter.vue';
export default {
  // BORRAR OTHER DATA???? DESCRIPTION???? MODALTITLE?
  props: {
    showBarriModal: Boolean,
    selectedButtonId: Number,
    mode: String,
    amount: Number, ///// probando, quito?
    modalData: Object,
    isWithdrawing: Boolean,
    modalTitle: String,
    description: String,
    otherData: String,
    monthsNotPaid: Array,
    instrOptions: Array,
    equipmentRentOptions: Array,
    pricesSlots: Array,
    pricesRenEqu: Array,
    pricesPacking: Array,
    typeStatus: Number,
    showCounter: {
      type: Boolean,
      default: false, // Valor predeterminado
    },
  },
  components: {
    BarriCounter
  },
  data() {
    return {
      loading: false, // donde uso este loading??? deberia ser en el boton de guardar, no>?
      dolarBlue: null,
      selectedMonth: null, // Esta propiedad almacenará el mes seleccionado
      selectedInstructor: null,
      selectedInstructors: [],
      email: '',
      emailRules: [
        (v) => !!v || 'El correo electrónico es requerido',
        (v) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
      ],
      emailError: null,
      emailEnabled: false,
      altitudesOptions: [
        { text: '5.000 ft', value: 1 },
        { text: '8.000 ft', value: 2 },
        { text: '10.000 ft', value: 3 },
        { text: '12.000 ft', value: 4 }
      ],
      altitude: 0,
      jumpsEnabled: false,
      equipRent: false,
      equipment: null,
      selfPackaging: false,
      totalCount: null,
      ticketsCount: null,
      slotsCount: 0,
      equipmentCount: 0,
      packingCount: 0,
      isDebit: false
    };
  },
  mounted() {
      this.dolarBlue = this.$store.state.dolarBlue;
      this.updateTotalCount();
      console.log("amount LLEGA_?????", this.amount)
    },
  watch: {
    altitude: 'updateTotalCount', // Observa cambios en la propiedad 'altitude'
    typeStatus: 'updateTotalCount', // Observa cambios en la propiedad 'typeStatus'
    equipment: 'updateTotalCount',
    selfPackaging: 'updateTotalCount',
    ticketsCount: 'updateTotalCount',
    jumpsEnabled(newJumpsEnabled, oldJumpsEnabled) {
      if (newJumpsEnabled === false && oldJumpsEnabled === true) {
        this.resetEquipment(); // Restablece los datos del equipo cuando se deshabilita
      }
    },
    totalCount: function (newCount) {
      // La función se ejecutará cada vez que totalCount cambie
      if (newCount > this.amount) {
        this.isDebit = false;
      }
    },
  },
  created() {
    // Inicializar la propiedad altitude con un valor predeterminado (por ejemplo, 1)
    //this.altitude = this.altitudesOptions[1];
  },
  methods: {
    validarEmail(email) {
      return /.+@.+\..+/.test(email); // Validación básica de formato de correo electrónico
    },
    updateTotalCount() {
      if (this.altitude.value !== null && this.typeStatus !== null && this.pricesSlots) {
        console.log("ejecuta", "this.ticketsCount esssss", this.ticketsCount)
        const price = this.getPriceForAltitudeAndType(this.altitude.value, this.typeStatus);
        let totalPrice = 0;
        if (price.value) {
          this.slotsCount = price.value * this.ticketsCount;
          totalPrice += price.value;
        }
        if (this.equipment) {
          const priceRentEquip = this.getRentPriceForType(this.typeStatus, this.equipment.category);
          if (priceRentEquip) {
            this.equipmentCount = priceRentEquip * this.ticketsCount;
            console.log("this.equipmentCount", this.equipmentCount);
            totalPrice += priceRentEquip;
          }
        }

        if (this.selfPackaging) {
          const equipmentCategory = this.equipment ? this.equipment.category : 3;
          const packagingPrice = this.calculatePackagingPrice(equipmentCategory);
          this.packingCount = packagingPrice * this.ticketsCount;
          totalPrice += packagingPrice;
        }

        if (this.ticketsCount > 0) {
          totalPrice *= this.ticketsCount;
        }
        
        this.totalCount = totalPrice;
        /*
                if (this.ticketsCount < 1) {
          console.log("es menor a 1")
          this.incTicketsCount()
        }
        */
      } else {
        console.log("mostrar error");
      }
    },
    resetEquipment() {
      this.equipment = null;
    },
    calculatePackagingPrice(equipmentCategory) {
      const packagingPriceItem = this.pricesPacking.find(item => item.Packing.typePacking === equipmentCategory);
      
      if (packagingPriceItem) {
        return packagingPriceItem.Packing.value;
      } else {
        return 0;
      }
    },
    getPriceForAltitudeAndType(altitude, typeStatus) {
      if(typeStatus === 0){
        //eventBus.$emit('toast', { show: true, text: "La categoría computada no es válida", color: "red" })
        return 0
      }
      const priceList = this.pricesSlots.find(priceItem => priceItem._id === altitude);

      if (priceList) {
        const price = priceList.prices.find(priceItem => priceItem.typeStatus === typeStatus);
        console.log("price 0", price)
        return price;
      }
      return 0;
    },
    getRentPriceForType(typeStatus, equipmentType) {
      if (typeStatus < 1 || typeStatus > 4) {
        //eventBus.$emit('toast', { show: true, text: "El tipo de usuario no es válido", color: "red" });
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
          //eventBus.$emit('toast', { show: true, text: "El tipo de equipo no es válido", color: "red" });
          return 0; // O maneja el caso según tus necesidades
      }
      const rentPrice = this.pricesRenEqu.find(priceItem => priceItem.rent.typeRent === typeRent);

      if (rentPrice) {
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
            //eventBus.$emit('toast', { show: true, text: "El tipo de usuario no es válido", color: "red" });
            return 0; 
        }
        return price;
      }
      //eventBus.$emit('toast', { show: true, text: "El tipo de equipo no tiene precios definidos", color: "red" });
      return 0;
    },
    saveAction() {
      this.$emit('start-loading-button', this.selectedButtonId);
      this.loading = true
      const selectedMonth = this.selectedMonth;
      if (this.mode === 'transaction') {
        this.$emit('saveTransaction'); // aun no encontre donde captura esta emision para pasarle this.isDebit
      } else if (this.mode === 'monthlyFee') {
        if (!this.selectedMonth) {
          // Mostrar un mensaje de error o realizar una validación adecuada aquí
          return;
        } else {
          this.$emit('saveMonthlyFee', selectedMonth, this.isDebit);
        }
      } else if (this.mode === 'paymentNewPartner') {
        this.$emit('savePayNewPartner');
      } else if (this.mode === 'paymentNewStudent') {
        this.$emit('savePayNewStudent', this.isDebit);
      } else if (this.mode === 'paymentDualTdm') { 
        this.$emit('savePaymentDualTdm', this.selectedInstructor, this.isDebit);
      } else if (this.mode === 'paymentTdm') { 
        this.$emit('savePaymentTdm', this.isDebit);
      } else if (this.mode === 'paymentGeneralTheory' && this.selectedInstructors.length > 0) { 
        this.$emit('savePayGeneralTheory', this.selectedInstructors, this.isDebit);
      } else if (this.mode === 'paymentDouble12') { 
        this.$emit('savePaymentDouble12', this.isDebit);
      } else if (this.mode === 'paymentDouble10') { 
        this.$emit('savePaymentDouble10', this.isDebit);
      } else if (this.mode === 'paymentSimple12') { 
        this.$emit('savePaymentSimple12', this.isDebit);
      } else if (this.mode === 'paymentSimple10') { 
        this.$emit('savePaymentSimple10', this.isDebit);
      } else if (this.mode === 'paymentSolo12') { 
        this.$emit('savePaymentSolo12', this.isDebit);
      } else if (this.mode === 'paymentSolo10') { 
        this.$emit('savePaymentSolo10', this.isDebit);
      } else if (this.mode === 'paymentSolo8') { 
        this.$emit('savePaymentSolo8', this.isDebit);
      } else if (this.mode === 'paymentSolo5') { 
        this.$emit('savePaymentSolo5', this.isDebit);
      } 
      
      else if (this.mode === 'SelectedTransactions') {
        if(this.emailEnabled){
          if (!this.validarEmail(this.email)) {
            this.emailError = 'El correo electrónico debe ser válido';
            this.loading = false; // Detener el proceso de guardado
            return;
          } else {
            this.emailError = null;
          }
        }
        this.$emit('saveEmail', this.email);
      } else if (this.mode === 'paymentJumps') {
        console.log("ALTITUD Q ENVIO TEXT", this.altitude.text)
        console.log("this.equipmentCount", this.equipmentCount)
        this.$emit('savePayJump', this.totalCount, this.altitude.text, this.slotsCount, this.ticketsCount, this.equipmentCount, this.packingCount, this.isDebit);
        /*
        if(this.jumpsEnabled){
          if (!this.validarEmail(this.email)) {
            this.jumpsError = 'Debe ingresar una opción válida';
            this.loading = false;
            return;
          } else {
            this.jumpsError = null;
          }
        }
        */
      } 
      else if(this.mode === 'paymentpackA'){
        this.$emit('savePayPackA', this.isDebit);
      } else if(this.mode === 'paymentpackB'){
        this.$emit('savePayPackB', this.isDebit);
      }
      this.loading = false
      this.$emit('close');
    },
    incTicketsCount() {
      this.ticketsCount++;
      console.log("CUANTO ESS ", this.ticketsCount)
    },
    decTicketsCount() {
      if (this.ticketsCount > 0) {
        this.ticketsCount--;
      }
    },
    closeConfirmationModal() {
      this.totalCount = null
      this.$emit('close');
    },
    totalArgs(value) {
      console.log("value", value)
      if (value !== null) {
        return convertToArgs(value, this.dolarBlue);
      }
      return 0;
    }
  },
  computed: {
    equipmentDisabled() {
      return !this.jumpsEnabled || !this.equipment;
    }
  },
};
</script>
