<template>
  <v-container>
    <v-alert v-if="!dolarBlue" type="red" dismissible>
      No hay valor del dolar cargado
    </v-alert>
    <v-card class="pa-4">
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <v-avatar
              tile
              color="white"
              size="80"
            >
              <v-icon v-if="userStatus === 1" color="yellow" size="40" class="pr-1">mdi-account-star</v-icon>
              <v-icon v-if="userStatus === 2" color="orange" size="40" class="pr-1">mdi-account-heart</v-icon>
              <v-icon v-if="userStatus === 3" color="green" size="40" class="pr-1">mdi-account-check</v-icon>
              <v-icon v-if="userStatus === 4" color="purple" size="40" class="pr-1">mdi-account-cash</v-icon>
              <!--
              <v-icon v-if="userRole.includes(8)" color="blue" size="40" class="pr-1">mdi-school</v-icon>
              -->
            </v-avatar>
          </v-col>
          <v-col cols="6">
            <v-row justify="end">
              <div class="d-flex flex-column">
                <span>{{ currentDate }}</span>
                <span>Blue hoy: {{ this.$store.state.dolarBlue }}</span>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
        <div class="">                      
          <div class="row d-flex align-center pl-4">
            <span class="px-2 custom-font" style="font-size: 2.5rem;">{{ titleFN }} {{ titleLN }}</span>
          </div>
          <v-row class="pl-4">
            <v-col cols="6" class="d-flex ma-0 pa-0">
              <div v-if="userRole.includes(10)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-cane
                  </v-icon>
                  JUBILADO
                </v-chip>
              </div>
              <div v-if="userRole.includes(2)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  MANIFIESTO
                </v-chip>
              </div>
              <div v-if="userRole.includes(3)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  TDM
                </v-chip>
              </div>
              <div v-if="userRole.includes(4)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  AFF
                </v-chip>
              </div>
              <div v-if="userRole.includes(5)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  COACH
                </v-chip>
              </div>
              <div v-if="userRole.includes(6)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  PACKER
                </v-chip>
              </div>
              <div v-if="userRole.includes(7)">
                <v-chip
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  PILOTO
                </v-chip>
              </div>
              <div v-if="userRole.includes(8)">
                <v-chip
                  class="ma-2"
                  color="blue"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  ALUMNO
                </v-chip>
              </div>
              <div v-if="userRole.includes(12)">
                <v-chip
                  class="ma-2"
                  color="yellow"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  con PAQUETE A
                </v-chip>
              </div>
              <div v-if="userRole.includes(14)">
                <v-chip
                  class="ma-2"
                  color="yellow"
                  label
                  text-color="white"
                >
                  <v-icon left>
                    mdi-label
                  </v-icon>
                  con PAQUETE B
                </v-chip>
              </div>
              <div v-if="userRole.includes(8)">
                <v-chip class="ma-2" color="blue" text-color="white">Etapa: {{ is_student.level }}</v-chip>
              </div>
            </v-col>
            <v-col cols="6" class="d-flex">

            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col cols="3">
            <v-card class="mt-4 pa-4">
              <div class="d-flex flex-column">
                <div>
                  <v-icon color="green" size="40">mdi-currency-usd</v-icon> 
                  <span class="custom-font green--text pr-2" style="font-size: 1.5rem;" >{{ tempAmount }}</span> 
                  <span class="green--text">USD</span>
                </div>
                <div>
                  <!--
                  <v-icon color="blue" size="30">mdi-currency-usd</v-icon> 
                  -->
                  <span class="custom-font blue--text pr-2" style="font-size: 1rem;" > {{ totalArgs(tempAmount) }} ARGs</span> 
                  <span class="blue--text">-</span>
                </div>
              </div>
            </v-card>
          </v-col>
          <!--
          <v-col cols="3">
            <v-card class="mt-4 pa-4" v-if="showUserPanel">
              <div class="d-flex flex-column">
                <div>
                  <v-icon color="blue" size="40">mdi-currency-usd</v-icon> 
                  <span class="custom-font blue--text pr-2" style="font-size: 1.5rem;" >{{ totalArgs(tempAmount) }}</span> 
                  <span class="blue--text">ARG</span>
                </div>
              </div>
            </v-card>
          </v-col>
          -->
        </v-row>


        <!-- SECTION SUMAR RESTAR SALDO -->
      <v-col cols="12">
        <template v-if="!showAddAmount">
          <v-row align="center">
            <v-col>
              <v-btn 
                color="yellow" 
                dark 
                fab 
                bottom 
                right 
                class="mt-5 black--text" 
                @click="isWithdrawing = false, showAddAmount = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
              v-if="tempAmount > 0"
                color="black"
                dark
                fab
                bottom
                right
                class="mt-5 ml-4 yellow--text"
                @click="isWithdrawing = true, showAddAmount = true"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-expand-x-transition>
            <v-form @submit.prevent="saveCash">
              <v-text-field
                v-model="valueCash"
                label="Monto"
                type="text"
                required   
                :rules="[rules.required, rules.onlyNumbersAndDecimals]"
              ></v-text-field>
              <v-messages :rules="[rules.required, rules.onlyNumbersAndDecimals]"></v-messages>

              <v-select 
                v-model="selectedCurrency" 
                :items="currencies" 
                label="Tipo de moneda"
              ></v-select>

              <v-textarea
                v-model="description"
                label="Descripción"
                :rows="2"                
              ></v-textarea>

              <v-col cols="12" class="d-flex justify-center mb-1" v-if="errorMessage">
                <v-alert color="red" dense outlined type="error" icon="mdi-alert-octagon-outline">
                    {{ errorMessage }}
                </v-alert>
              </v-col>
              
              <v-btn color="black" dark block @click="openConfirmationModal">
                <span class="yellow--text">Guardar</span>
              </v-btn>
              <v-btn color="red" class="mt-2" dark block @click="cancel">
                <span class="yellow--text">Cancelar</span>
              </v-btn>
            </v-form>
          </v-expand-x-transition>
        </template>
      </v-col>

    <!-- BOTONERA -->
    <div class="text-center">
      <barri-progress-circular
        :loading="!showUserPanel" 
        :size="80"
      />
    </div>
    <div v-if="showUserPanel && id && userRole.includes(8)">
      <student-panel 
        :id="id" 
        :userStatus="userStatus" 
        :tempAmount="parseAmount(tempAmount)"
        :is_student="is_student"
      />
    </div>
    <div v-else>
      <flyers-panel
        v-if="showUserPanel" 
        :id="id" 
        :userStatus="userStatus" 
        :tempAmount="parseAmount(tempAmount)" 
        :monthsNotPaid="monthsNotPaid" 
        :userRole="userRole"
      />
    </div>
      <v-card-title class="mb-2">
        <v-row align="center">

          <!--
          <v-col cols="12" v-if="monthsNotPaid.length > 0">
            <v-btn :loading="buttonLoading" @click="openMonthlyFeeModal()"> <span>Cobrar cuota</span></v-btn>
          </v-col>
          -->
          <v-col cols="6">
            <v-btn color="primary" @click="openSelectedTransactions" :loading="btnLoading" :disabled="selectedTransactions.length === 0">
              <span class="pr-2">Enviar</span>
              <v-icon>mdi-email</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-col cols="12" class="d-flex pl-15 pb-5 justify-center align-center">
        <v-divider :thickness="2" color="white"></v-divider>
      </v-col>
      <v-data-table
        :headers="transactionHeaders"
        :items="transactions"
        :loading="loading"
        :sort-by="['date']"
        :sort-desc="[true]"
      >
        <template v-slot:item.type="{ item }">
          {{ getTypeLabel(item.type) }}
        </template>
        <template v-slot:item.amount="{ item }">
          <span class="green--text">$</span> {{ item.amount }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ formatDateTime(item.date) }}
        </template>
        <template v-slot:item.description="{ item }">
          {{ item.description }}
        </template>
        <template v-slot:item.checkbox="{ item }">
          <input type="checkbox" v-model="selectedTransactions" :value="item" @change="handleSelectionChange" />
        </template>
      </v-data-table>

    </v-card>

    <barri-modal
      :showBarriModal="showConfirmationModal"
      :modalData="modalData"

      :selectedButtonId="selectedButtonId"
      
      :description="description"
      :otherData="selectedCurrency"
      :mode="modalMode"
      :instrOptions="instrOptions"

      :pricesSlots="pricesSlots"
      :pricesPacking="pricesPacking"
      :typeStatus="userStatus"
      :pricesRenEqu="pricesRenEqu"
      :equipmentRentOptions="equipmentRentOptions"
      @close="closeConfirmationModal"
      @saveTransaction="updateParaca"
      @saveMonthlyFee="chargeMonthlyFee"
      @saveEmail="sendSelectedTransactions"
    ></barri-modal>
    
    <!-- borrar prop :description="description" 
    <barri-modal
      :showBarriModal="showConfirmationModal"
      :modalData="modalData"
      :monthsNotPaid="monthsNotPaid"
      :selectedButtonId="selectedButtonId"
      @start-loading-button="startLoadingButton" 
      @stop-loading-button="stopLoadingButton"
      
      :description="description"
      :otherData="selectedCurrency"
      :mode="modalMode"
      :monthsNotPaid="monthsNotPaid"
      :instrOptions="instrOptions"

      :pricesSlots="pricesSlots"
      :pricesPacking="pricesPacking"
      :typeStatus="userStatus"
      :pricesRenEqu="pricesRenEqu"
      :equipmentRentOptions="equipmentRentOptions"
      @close="closeConfirmationModal"
      @saveTransaction="updateParaca"
      @saveMonthlyFee="chargeMonthlyFee"
      @savePayNewStudent="payInscription"
      @savePaymentDualTdm="payDualTdm"
      @savePaymentTdm="payTdm"
      @savePayGeneralTheory="payGeneralTheory"
      @savePaymentDouble12="payDouble12"
      @savePaymentDouble10="payDouble10"
      @savePaymentSimple12="paySimple12"
      @savePaymentSimple10="paySimple10"
      @savePaymentSolo12="paySolo12"
      @savePaymentSolo10="paySolo10"
      @savePaymentSolo8="paySolo8"
      @savePaymentSolo5="paySolo5"
      @saveEmail="sendSelectedTransactions"
    ></barri-modal>
    -->
  </v-container>
</template>

<script>
import StudentPanel from './StudentPanel.vue';
import FlyersPanel from './FlyersPanel.vue';
import BarriProgressCircular from '../app/BarriProgressCircular.vue';
import BarriModal from '../app/BarriModal.vue';
import { getCurrentDate, convertToDollars, convertToArgs } from '../../utils/utils';
import eventBus from '../../event-bus'
import moment from "moment";
export default {
  components: {
    BarriModal,
    BarriProgressCircular,
    StudentPanel,
    FlyersPanel
  },
  data() {
    return {
      id: null,
      showUserPanel: false,
      dolarBlue: this.$store.state.dolarBlue,
      selectedButtonId: null, // Inicializa como null
      loadingButtons: {}, // Objeto para rastrear el estado del indicador de carga por botón
      loading: false,
      buttonLoading: false,
      cuota: null,
      currentDate: getCurrentDate(),
      titleFN: '',
      titleLN: '',
      userStatus: null,
      is_student: {},
      is_student_active: null,
      userRole: [],
      isWithdrawing: false,
      email: '',
      
      showAddAmount: false,
      amount: {
        type: 1,
        value: null
      },
      valueCash: null,
      description: null,
      selectedCurrency: 'USD',
      currencies: ['USD', 'ARG'],
      tempAmount: null,

      transactions: [],
      editedValue: '',
      totalPacking: 10,
      transactionHeaders: [
        { text: 'Tipo de Transacción', value: 'type' },
        { text: 'Monto', value: 'amount' },
        { text: 'Fecha', value: 'date' },
        { text: 'Descripción', value: 'description' },
        { text: 'Enviar', value: 'checkbox' },
      ],
      rules: {
        required: value => !!value || 'Este campo es obligatorio',
        onlyNumbersAndDecimals: value => {
          const regex = /^\d+([.,]\d*)?$/;
          return regex.test(value) || 'Solo se permiten números enteros o decimales con punto';
        },
      },
      errorMessage: null,
      modalMode: '',
      showConfirmationModal: false,
      modalData: {
        title: null,
        description: null,
        value: null,
        html: null,
        showAlert: false,
        alertMessage: null
      },

      monthsNotPaid: [],
      instrOptions: [],
      priceTDT: null,
      selectedTransactions: [],
      btnLoading: false,

      //pricesStudents: [],
      //totalStudents: null,

      equipmentRentOptions: null,
      pricesRenEqu: null,
      pricesPacking: null,
      pricesSlots: null,
      //theoryValue: null,
      //price10Slot: null,
      //price12Slot: null,
      //slotStudent10: null,
      //slotStudent12: null,
      /////////////////////////////////////////////// faltan precios
      //slotStudent8: null,
      //slotStudent5: null,
      ///////////////////////////////////////////////////
      //equipLevel1: null,
      //equipLevel2: null,
      //equipLevel3: null,
      //packingTdmStudent: null,
      //packingStudent: null,
      //packingInstr: null,
      //feeInstr: null,
      //comisValue: null,
      //comissUsers: null,
    };
  },
  mounted() {
    // si no se usa id borrar id y usar this.id igualando con lo recibido por parametro
    this.id = this.$route.params.id
    if (this.id) {
      this.getParaca();
      this.getTransactionsUser()
      this.submitButtonTitle = 'editar';
      this.getPricesTDT()
      this.getInstOptions()
      //this.getPricesStudents()
    } else {
      this.$router.push({name: 'flyersList'})
    }
    this.getPricesSlots()
  },
  computed: {
    convertedAmount() {
      if (this.amount.type === 2 && this.selectedCurrency === 'USD') {
        const converted = convertToDollars(this.amount.value, this.$store.state.dolarBlue);
        return converted ? parseFloat(converted).toFixed(2) : '';
      }
      return this.amount.value;
    },
    /*
    isButtonLoading() {
      return (buttonId) => this.loadingButtons[buttonId] || false;
    }
     */
  },
  methods: {
    totalArgs(value) {
      if (value !== null) {
        try {
          return convertToArgs(value, this.dolarBlue);
        } catch (error) {
          console.error("Error en totalArgs:", error.message);
          return 0;
        }
      }
      return 0;
    },
    parseAmount(amount) {
      // Convierte la cadena a un número
      return parseFloat(amount);
    },
    getParaca() {
      this.loading = true;
      //this.$http.get(`http://localhost:8082/api/users/${this.id}`)
      this.$http.get(`${process.env.VUE_APP_USERS}/${this.id}`)
        .then(response => {
          const paraca = response.data.payload;

          this.userStatus = paraca._doc.status;
          this.email = paraca._doc.email;
          this.userRole = paraca._doc.role;
          console.log("this.userRole EN PADRE", this.userRole)
          this.amount.value = paraca._doc.balance;
          this.tempAmount = this.amount.value.toFixed(2);
          console.log(typeof this.tempAmount, "tipo de dato tempAmount")
          this.titleFN = this.capitalizeFirstLetter(paraca._doc.first_name);
          this.titleLN = this.capitalizeFirstLetter(paraca._doc.last_name);
          this.feePaid = paraca._doc.feePaid;
          console.log("meses cuando carga getUser", this.feePaid);
          this.is_student = paraca._doc.is_student ? paraca._doc.is_student : {};
          this.is_student_active = paraca._doc.role.includes(8);
          this.monthsNotPaid = this.feePaid.filter(month => !month.paid);
          console.log("this.monthsNotPaid en TOTALfLYER", this.monthsNotPaid)
          /*
          if (paraca._doc.transactions) {
            this.transactions = paraca._doc.transactions;
          } else {
            this.transactions = [];
          }
          */

          
          /*
          if(this.userRole.includes(8)){
            this.getComisionUsers()
          }
          */
          /*
          const monthsPaidKeys = Object.keys(this.feePaid);
          // Recorrer el array de claves
          monthsPaidKeys.forEach(monthYear => {
            if (this.feePaid[monthYear] === false) {
              // Agregar el mes no pagado al array
              this.monthsNotPaid.push(monthYear);
            }
          });
          */
          //this.updateButtonStates();
          this.loading = false;
          this.showUserPanel = true
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    getTypeLabel(type) {
      if (
        [1, 5, 6, 7, 9, 21, 22, 23, 8].includes(type)
      ) {
        return 'Ingreso a cuenta';
      } else if (
        [2, 3, 10, 11, 20, 40].includes(type)
      ) {
        return 'Débito';
      } else {
        // Manejar otros casos si es necesario
        return 'Otro tipo';
      }
    },
    /*
   startLoadingButton(buttonId) {
     console.log("PADRE RECIBE ID startLoadingButton OK", buttonId)
     this.$set(this.loadingButtons, buttonId, true); // Activa el indicador de carga para el botón específico
   }, 
   */
   /*
    */
    // AUN NO SE ESTA USANDO EL Q CORTA EL LOADING
    /*
    stopLoadingButton(buttonId) {
      this.$set(this.loadingButtons, buttonId, false); // Desactiva el indicador de carga para el botón específico
    },
    */
    getTransactionsUser(){
      this.loading = true;
      //this.$http.get(`http://localhost:8082/api/users/transactions/${this.id}?page=1&pageSize=10`)
      this.$http.get(`${process.env.VUE_APP_USER_TRANSACTIONS}/${this.id}?page=1&pageSize=10`)
      //this.$http.get(`http://localhost:8082/api/users/transactions/${this.id}?page=1&pageSize=10`)
        .then(response => {
          const transactions = response.data.transactions; // Acceder a 'transactions' en lugar de 'payload'
          console.log("Respuesta de transacciones:", transactions);
          this.transactions = transactions
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    getPricesStudents(){

    },
    /*
    getPricesStudents() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}`)
        .then((response) => {
          const prices = response.data.payload;
          const a10 = prices.find((price) => price.priceType === 1 && price.slot.altitude === 3 && price.slot.typeStatus === 3);
          const a12 = prices.find((price) => price.priceType === 1 && price.slot.altitude === 3 && price.slot.typeStatus === 4);
          this.price10Slot = a10.slot.value
          this.price12Slot = a12.slot.value
          this.pricesStudents = prices.filter((price) => {
            if (price.students && price.students.typeCategory) {
              if (price.students.typeCategory === 1) {
                this.comisValue = price.students.value;
                return true; // Incluye el precio con typeCategory igual a 1.
              } else if (price.students.typeCategory === 7) {
                this.theoryValue = price.students.value; // Guarda el precio con typeCategory igual a 7.
                return false; // No lo incluye en la lista.
              } else if (price.students.typeCategory === 9) {
                this.slotStudent10 = price.students.value; // plaza a 10 escuela
                return false; 
              } else if (price.students.typeCategory === 20) {
                this.slotStudent8 = price.students.value; // plaza a 8 escuela // NO HAY
                return false;                 
              } else if (price.students.typeCategory === 10) { // plaza a 12
                this.slotStudent12 = price.students.value; 
                return false; 
              } else if (price.students.typeCategory === 12) { // equipo Escuela ETAPA I
                this.// = price.students.value; 
                return false;
              } else if (price.students.typeCategory === 13) { // equipo Escuela ETAPA II
                this.equipLevel2 = price.students.value; 
                return false;
              } else if (price.students.typeCategory === 14) { // equipo Escuela ETAPA III
                this.equipLevel3 = price.students.value; 
                return false;
              } else if (price.students.typeCategory === 15) { // Plegado TDM de curso
                this.packingTdmStudent = price.students.value; 
                return false;
              } else if (price.students.typeCategory === 16) { // Plegado Escuela
                this.packingStudent = price.students.value; 
                return false;
              } else if (price.students.typeCategory === 17) { // Plegado Instructor
                this.packingInstr = price.students.value; 
                return false;
              } else if (price.students.typeCategory === 11) { // Plegado Instructor
                this.feeInstr = price.students.value; 
                return false;
              }
              
              else {
                return [2, 3, 4, 6].includes(price.students.typeCategory);
              }
            }
            return false; // Si no hay students o typeCategory, no se incluye en la lista.
          });

          this.totalStudents = this.pricesStudents.reduce((total, price) => {
            if (price.students) {
              if (price.students.typeCategory === 1) {
                if (this.comissUsers !== null) { // Verifica si this.comissUsers no es null
                  console.log("typeof comision", typeof this.comissUsers.length);
                  return total + (price.students.value * this.comissUsers.length);
                } else {
                  console.log("this.comissUsers is null");
                  // Aquí puedes manejar el caso en el que this.comissUsers sea null, por ejemplo, retornar un valor predeterminado o lanzar una excepción.
                }
              } else {
                return total + price.students.value;
              }
            }
            return total;
          }, 0);

          const cuotaPrice = prices.find((price) => {
            return price.priceType === 7 && price.students && price.students.typeCategory === 5;
          });

          if (cuotaPrice) {
            this.cuota = cuotaPrice.students.value;
          } else {
            // Manejar la situación en la que no se encontró un precio con typeCategory igual a 5
            this.cuota = 0; // O un valor predeterminado apropiado
          }

          console.log("cuota:", this.cuota)

        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
 /
 */
    getOptionsEquipment() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${process.env.VUE_APP_EQUIPMENT}`)
          .then(response => {
            const equipment = response.data.payload;
            const equipmentRentOptions = equipment.filter(equip => equip.category === 2 || equip.category === 3);
            this.loading = false;

            // Resuelve la promesa con los listados de equipos
            resolve({ equipmentRentOptions });
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    getPrices() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${process.env.VUE_APP_PRICES}`)
          .then((response) => {
            const prices = response.data.payload;
            //const pricesSlots = prices.filter((price) => price.priceType === 1);
            const pricesPacking = prices.filter((price) => price.priceType === 2);
            const pricesRenEqu = prices.filter((price) => price.priceType === 3);
            const studPacking = pricesPacking.find((price) => price.Packing.typePacking === 2).Packing.value;
            const coachPayment = prices.filter((price) => price.priceType === 8);
            // Resuelve la promesa con los listados de precios
            resolve({ pricesPacking, pricesRenEqu, studPacking, coachPayment });
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            reject(error);
          });
      });
    },
    // trae precios de CUOTA
    getPrice(){
      this.buttonLoading = true
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=7`)
        .then((response) => {
          this.cuota = response.data.payload;
          const selectedPrice = this.cuota.find((price) => [5].includes(price.students.typeCategory));
          if (selectedPrice) {
            // Si se encuentra un objeto que cumple con el filtro, obtener su 'value'
            this.cuota = selectedPrice.students.value;
          } else {
            // Si no se encuentra un objeto que cumple con el filtro, puedes manejarlo aquí
            console.log("No se encontraron objetos que cumplan con el filtro");
            // Asignar un valor predeterminado o mostrar un mensaje de error, según sea necesario
            // this.cuota = ValorPredeterminado; // o this.cuota = null; o this.cuota = "No encontrado";
          }
          this.buttonLoading = false
        })
        .catch((error) => {
          console.log(error);
          this.buttonLoading = false
        });
    },
    getPricesSlots() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=1`)
        .then((response) => {
          this.pricesSlots = response.data.payload;
          console.log("responseData de getSLOTS:", this.prices)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getInstOptions(){
      this.$http.get(`${process.env.VUE_APP_USERS}?aff=true`)
        .then(response => {
          const instructors = response.data.payload;
          console.log("instructors 1:", instructors)
          this.instrOptions = instructors.map((instructor) => ({
            id: instructor.id,
            name: `${instructor.alias}`
          }));
          console.log("instructors 2:", this.instrOptions)
        })
        .catch(error => {
          console.log(error)
        });
    },
    /*
    getComisionUsers(){
      this.$http
      //http://localhost:8082/api/
      //.get(`http://localhost:8082/api/users?comisiones=true`)
      .get(`${process.env.VUE_APP_USERS}?comisiones=true`)
      .then((res) => {
        if(res.status === 200){
          this.comissUsers = res.data.payload;
          console.log("USUARIOS Q COBRAN COMISION:", this.comissUsers)
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    */
    handleSelectionChange() {
      // Aquí puedes realizar acciones adicionales si es necesario
      console.log('Transacciones seleccionadas:', this.selectedTransactions);
    },
    formatDateTime(dateTime) {
      return moment(dateTime).format('HH:mm DD-MM-YYYY'); // Ajusta el formato según tus preferencias
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /*
    openMonthlyFeeModal() {
      this.modalMode = 'monthlyFee';
      this.description = null;

      this.modalData = {
        title: `Seleccione cuota a debitar`,
        description: `Monto a debitar: $ ${parseFloat(this.cuota)} ARGs.`,
        value:  `${parseFloat(this.cuota)}`,
      };
      this.showConfirmationModal = true;
    },
    */
    openSelectedTransactions() {
      this.modalMode = 'SelectedTransactions';
      this.description = null;

      this.modalData = {
        title: `Enviar notificación`,
        description: `Se notificarán las transacciones a:`, 
        html: `<strong class="red--text">${this.email}</strong>`
      };

      this.showConfirmationModal = true;
    },
    openConfirmationModal() {
      this.modalMode = 'transaction';

      this.modalData = {
        title: null,
        description: null,
        html: null
      }
      if (this.valueCash) {
        const value = parseFloat(this.valueCash);
        this.tempAmount = this.amount.value;
        if (!isNaN(value)) {
          if (this.selectedCurrency === 'USD') {
            if (this.isWithdrawing) {
              // Realizar la operación de retiro
              this.modalData = {
                title: 'Confirmar Transacción',
                description: `Monto a restar $: ${value}`,
                value: value
              },  
              this.amount.value -= value;
            } else {
              this.modalData = {
                title: 'Confirmar Transacción',
                description: `Monto ingresado $: ${value}`,
                value: value
              },
              // Realizar la operación de depósito
              this.amount.value += value;
            }
            this.showConfirmationModal = true;
            //this.updateParaca();
            //this.valueCash = '';
            //this.showAddAmount = false;

          } else if (this.selectedCurrency === 'ARG') {
            //this.amount.type = 2;
            const converted = convertToDollars(value, this.$store.state.dolarBlue);
            if (converted) {
              if (this.isWithdrawing) {
              // Realizar la operación de retiro

              this.amount.value -= parseFloat(converted);
            } else {
              // Realizar la operación de depósito
              this.amount.value += parseFloat(converted);
            }
              this.showConfirmationModal = true;
              //this.updateParaca();
              //this.valueCash = '';
              //this.showAddAmount = false;
            }
          }
        }
        else {
          this.errorMessage = 'El monto debe contener un valor válido'
        }
      } else {
        this.errorMessage = 'El monto debe contener un valor válido'
      }
    },
    closeConfirmationModal(){
      this.description = null
      this.modalData = {
        title: null,
        description: null,
        value: null,
        html: null        
      }
      this.showConfirmationModal = false
    },

    // actualizaciones de DB
    updateParaca() {
      console.log("Ingresa en updateParaca")
      const newData = {
        transactions: [
          {
            type: this.isWithdrawing ? 2 : 1,
            amount: parseFloat(this.valueCash), //parseFloat(this.valueCash).toFixed(2) pruebo quitarle tofiex
            description: this.description,
          }
        ]
      };
      console.log("newData a enviar:", newData)

      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then(response => {
          console.log("respuesta de ATUALIZAION de paraca:", response)
          if(response.status === 200){
            eventBus.$emit('toast', { show: true, text: "Transacción efectuada correctamente", color: "green" })
            this.$router.push('/manifest/flyersList');
          }
        })
        .catch(error => {
          console.log("POR QUER HAY ERROR AQUI?");
          console.log(error);
        });
    },
    chargeMonthlyFee(selectedMonth) {
      if (selectedMonth) {
        console.log("selectedMonth llega a padre:",selectedMonth, "tipo de dato selectedMonth:", typeof selectedMonth);

        const newData = {
          transactions: [
            {
              type: 3, // 3 es cobro de cuota de socio, se resta de la cuenta corriente
              amount: parseFloat(this.cuota),
              description: `Se debitaron $${this.cuota} ARG correspondientes a la cuota de ${selectedMonth}`,
            },
          ],
          feePaid: [
            {
              month: selectedMonth,
              paid: true,
            },
          ],
        };
        console.log("newData a enviar", newData);
        this.$http
          .put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
          .then((response) => {
            if (response.status === 200) {
              eventBus.$emit('toast', {
                show: true,
                text: "Transacción efectuada correctamente",
                color: "green",
              });
              console.log("RESPONSE pago CUOTA:", response.data.payload);
              this.$router.push('/manifest/flyersList');
            } else {
              console.log("no entro a response.status igual 200");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getPricesTDT(){
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=7`)
        .then((response) => {
          const prices = response.data.payload;
          const priceTDM = prices.find((price) => price.students.typeCategory === 18);
          if (priceTDM) {
            this.priceTDT = priceTDM.students.value
          } else {
            console.log("Precio Teoria dual TDM no encontrado.");
          }
          console.log("priceTDM", this.priceTDT)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.valueCash = '';
      this.showAddAmount = false
    },
    saveEditedValue(){
      console.log("aqui debo saber si transactionConfirmation tiene contenido o si monthlyFeeModalData tiene contenido")
    },
    sendSelectedTransactions(emailParam) {
      console.log(emailParam)
      let to = 'lucasfrontenddev@gmail.com'
      this.btnLoading = true
      if(emailParam !== ''){
        to = emailParam
      } else {
        to = this.email
      }
      console.log("TOOOO:", to)
      const selectedTransactions = this.selectedTransactions;
      console.log(selectedTransactions)
 
      if (selectedTransactions.length !== 0) {
        this.$http.post(`${process.env.VUE_APP_EMAIL}`, { to, transactions: selectedTransactions })
          .then(response => {
            // Verificar si el servidor respondió con un correo electrónico HTML
            if(response.status === 200){
              // Limpiar las transacciones seleccionadas
              this.selectedTransactions = [];
              this.btnLoading = false
              eventBus.$emit('toast', { 
                show: true, 
                text: "Transacciones enviadas con éxito", 
                color: "green" 
              });
            }
          })
          .catch(error => {
            this.btnLoading = false
            // Manejar los errores en caso de que la solicitud falle
            console.error('Error al enviar transacciones:', error);
            eventBus.$emit('toast', { 
              show: true, 
              text: "Error al enviar transacciones", 
              color: "red" 
            });
          });
      }
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.disabled-button {
  opacity: 0.5; /* Reduce la opacidad para que parezca deshabilitado */
  pointer-events: none; /* Deshabilita los eventos de clic y otros eventos del ratón */
  cursor: not-allowed; /* Cambia el cursor para indicar que está deshabilitado */
}

</style>