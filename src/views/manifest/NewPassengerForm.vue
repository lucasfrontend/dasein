<template>
  <v-container>
    <v-card>
      <v-card-title class="custom-font pink--text pl-8 pt-4" style="font-size: 1.5rem;">
        {{ this.id ? this.passenger.alias : 'Nuevo Pasajero' }}
        <v-spacer></v-spacer>
        <delete-button
          v-if="id"
          :show="true"
          :iconColor="'black'"
          :showDeleteButton="!id ? false : true"
          @click="showDialog = true"
        />
      </v-card-title>

      <v-card-text>
        <div v-if="this.id && !this.newPassId" class="d-flex flex-column">
          <span class="black--text pa-4" style="font-size: 1rem;">Saldo Actual: {{  this.passenger.balance }}</span>
          <span class="black--text pa-4" style="font-size: 1rem;">Tipo de salto: {{  getTypeAltText(this.passenger.chargedType) }}</span>
          
          <v-data-table
            :headers="headers"
            :items="passenger.transactions"
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
          </v-data-table>
        </div>
        
        <v-form @submit.prevent="submitForm" v-if="!this.id">
        <!-- valor de tipo de tandem -->
          <v-select
            v-model="passenger.chargedType"
            :items="formattedPricesData"
            label="Tipo de salto"
            item-text="text"
            item-value="typeAlt"
            required
            outlined 
            dense 
            @change="onChargedTypeChange"
          ></v-select>
        
          <v-text-field 
            v-model="passenger.first_name" 
            label="Nombre/s" 
            required
            outlined 
            dense
            prepend-inner-icon="mdi-account-circle"
          ></v-text-field>

          <v-text-field 
            v-model="passenger.last_name" 
            label="Apellido/s" 
            required
            outlined 
            dense
            prepend-inner-icon="mdi-account-circle"
          ></v-text-field>

          <v-text-field 
            v-model="passenger.alias" 
            label="Alias" 
            required
            outlined 
            dense
            prepend-inner-icon="mdi-account-circle"
          ></v-text-field>

          <div v-if="this.passenger.chargedType" class="d-flex justify-center align-center pa-2 text-center">
            <v-card width="450" 
              :loading="loadingCard" 
            >
              <v-card-title class="d-flex justify-space-between">
                <div class="d-flex flex-column">
                  <span>
                    {{ getTypeAltText(passenger.chargedType) }} 
                    <v-icon size="20">mdi-account-supervisor</v-icon>
                  </span>
                  <!--
                  <Visa v-if="showCreditCard" :size="40"/>
                -->
                </div>
                <span v-if="passenger.chargedType !== null" style="font-size: 0.8rem;">{{ selectedAltitudeText }}</span>
              </v-card-title>
              <v-card-text>
                <div class="d-flex justify-center align-center">
                  <v-icon color="green" size="50">mdi-currency-usd</v-icon>
                  <span style="font-size: 3rem;">
                    {{ getSelectedValue(passenger.chargedType) }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div v-if="isLowCost">
            <v-card-title class="custom-font pink--text pt-4" style="font-size: 1.5rem;">
              Pasajero 2 Low Cost
            </v-card-title> 

            <v-text-field 
              v-model="passenger2.first_name" 
              label="Nombre/s" 
              required
              outlined 
              dense
              prepend-inner-icon="mdi-account-circle"
            ></v-text-field>

            <v-text-field 
              v-model="passenger2.last_name" 
              label="Apellido/s" 
              required
              outlined 
              dense
              prepend-inner-icon="mdi-account-circle"
            ></v-text-field>

            <v-text-field 
              v-model="passenger2.alias" 
              label="Alias" 
              required
              outlined 
              dense
              prepend-inner-icon="mdi-account-circle"
            ></v-text-field>
          </div>
        
        <!-- RESUMEN -->
        <div v-if="this.passenger.chargedType && !this.id" class="d-flex flex-column">
          Resumen
          <v-divider></v-divider>
          <div class="d-flex align-center">
            <span> Valor Total de Slots: <v-icon color="green" size="20">mdi-currency-usd</v-icon>{{ priceSlotSelected * multi}} USD</span>
            <v-icon v-for="index in multiIcons" :key="index" size="20">mdi-account</v-icon>
            <span> Valor de Slot: <v-icon color="green" size="20">mdi-currency-usd</v-icon>{{ priceSlotSelected }} USD</span>
          </div>

          <span>
            Fee Instructor: 
            <span v-if="[11, 12, 13, 14].includes(this.passenger.chargedType)"> a 8K 
              <v-icon color="green" size="20">mdi-currency-usd</v-icon> {{ payInstValue8 * 2 }} USD
            </span>
            <span v-else> a 10K 
              <v-icon color="green" size="20">mdi-currency-usd</v-icon> {{ payInstValue10 }} USD
            </span>
          </span> 

          <div v-if="[5, 6, 7, 8, 15, 17].includes(this.passenger.chargedType)" class="d-flex flex-column">
            <span>
              Fee Cam: <v-icon color="green" size="20">mdi-currency-usd</v-icon>{{ feeCam }} USD <v-icon size="20">mdi-camera-gopro</v-icon>
            </span>
            <span>
              Packing Cam: 
              <v-icon color="green" size="20">mdi-currency-usd</v-icon> {{ camPackingVal }} USD                 
              <v-icon size="20">mdi-camera-gopro</v-icon>
            </span>
          </div>    
          <span v-if="[9, 10].includes(this.passenger.chargedType)" class="d-flex flex-column">
            <span>
              Fee cam: 
              <v-icon color="green" size="20">mdi-currency-usd</v-icon>
              {{ feeCam * 2 }} USD
              <v-icon size="20">mdi-camera-gopro</v-icon> 
              <v-icon size="20">mdi-camera-gopro</v-icon>
            </span>
            <span>Packing Cam: <v-icon color="green" size="20">mdi-currency-usd</v-icon> 
              {{ camPackingVal * 2 }} USD                 <v-icon size="20">mdi-camera-gopro</v-icon> 
              <v-icon size="20">mdi-camera-gopro</v-icon>
            </span>
          </span> 
          <span>Equipo TDM: <v-icon color="green" size="20">mdi-currency-usd</v-icon>{{ equipmentRentVal }} USD</span>
          <span>Packing TDM: <v-icon color="green" size="20">mdi-currency-usd</v-icon> {{ packingVal }} USD</span>
          <v-divider></v-divider>
          <span>
            Edición:  
            <v-icon color="green" size="20">mdi-currency-usd</v-icon>   
            {{ videoEditVal }} USD
            <v-icon size="20">mdi-movie</v-icon>
          </span>
          <div class="d-flex align-center">
            <span>Valor Total comisiones: <v-icon color="green" size="20">mdi-currency-usd</v-icon>{{ comisionVal * comissUsers.length }} USD</span> <v-icon v-for="index in comissUsers.length" :key="index" size="20">mdi-account</v-icon>
          </div>
        </div>

          <div>
            <BarriAlert :errorMessage="errorMessage"/>
            <v-btn 
              color="black"
              class="yellow--text" 
              block type="submit"
              :loading="loading"
              :disabled="isButtonDisabled"
            >
              {{ id ? 'Actualizar' : 'Cobrar' }}
            </v-btn>
          </div>
        </v-form>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import eventBus from '../../event-bus';
import DeleteButton from '../app/DeleteButton.vue'
import BarriAlert from '../app/BarriAlert.vue';
//import Visa from '../../components/Icons/Visa.vue'
import moment from "moment";
// hasta aca is okkkk
export default {
  components: {
    DeleteButton,
    BarriAlert,
  },
  data() {
    return {
      id: null,
      errorMessage: null,
      showCreditCard: true,
      pricesData: [],
      comissUsers: [],
      editors: [],
      typeSelected: null,
      multi: null,
      headers: [
        { text: 'Tipo de Transacción', value: 'type' },
        { text: 'Monto', value: 'amount' },
        { text: 'Fecha', value: 'date' },
        { text: 'Descripción', value: 'description' },
      ],
      passenger: {
        first_name: null,
        last_name: null,
        alias: null,
        a_alias: null,
        //email: "",
        chargedType: null, // tipo de salto
        chargedValue: null, // valor del salto
        jumped: false,
        balance: null,
        transactions: [],
      },
      passenger2: {
        first_name: null,
        last_name: null,
        alias: null,
        a_alias: 'OTRO',
        chargedType: null, // tipo de salto
        chargedValue: null, // valor del salto
        jumped: false,
        balance: null,
        transactions: [],
        payerId: null
      },
      selectedValue: null,
      loading: false,
      loadingCard: false,
      isLowCost: false,
      feeCam: null,
      comisionVal: null,
      equipmentRentVal: null,
      videoEditVal: null,
      packingVal: null,
      camPackingVal: null,
      payInstValue8: null,
      payInstValue10: null,
      payInstValue12: null,
      pricesArrayTdms: [],
      priceSlotSelected: null,
      newPassId: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.id = id;
      this.$http
        .get(`${process.env.VUE_APP_PASSENGERS}/${id}`)
        .then((response) => {
          this.passenger = response.data.payload[0];
          console.log("response.data.payload", this.passenger.alias)
          console.log(this.passenger, "PASAJERO DESDE GET");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.getPrices()
      this.getPricesPacking()
      this.getPricesInstructors()
      this.getComisionUsers()
      this.getEditors()
    }
  },
  computed: {
    formattedPricesData() {
      return this.pricesData.map(price => ({
        typeAlt: price.typeAlt,
        text: this.getTypeAltText(price.typeAlt),
      }));
    },
    isButtonDisabled() {
      if (this.isLowCost) {
        // If isLowCost is true, check conditions for passenger2
        return (
          this.passenger.first_name === null ||
          this.passenger.last_name === null ||
          this.passenger.chargedType === null ||
          this.passenger.alias === null ||
          this.passenger2.first_name === null ||
          this.passenger2.last_name === null ||
          this.passenger2.alias === null
        );
      } else {
        // If isLowCost is false, check conditions for passenger
        return (
          this.passenger.first_name === null ||
          this.passenger.last_name === null ||
          this.passenger.chargedType === null ||
          this.passenger.alias === null
        );
      }
    },
    multiIcons() {
      return Array.from({ length: this.multi }, (_, index) => index);
    },
    creditCardStyle(){
      return {
        backgroundColor: '#3E4251',
        color: 'white',
        borderRadius: '8px',
      };
    },
    selectedAltitudeText() {
      if (
        //si son low cost
        [11, 12, 13, 14].includes(this.passenger.chargedType)
      ) {
        return '2500 metros de altura';
      } else {
        return '3000 metros de altura';
      }
    },

  },
  methods: {
    getTypeLabel(type) {
      if (
        [1].includes(type)
      ) {
        return 'Ingreso a cuenta';
      } else if (
        [2].includes(type)
      ) {
        return 'Débito';
      } else {
        // Manejar otros casos si es necesario
        return 'S/D';
      }
    },
    formatDateTime(dateTime) {
      return moment(dateTime).format('HH:mm DD-MM-YYYY'); // Ajusta el formato según tus preferencias
    },
    onChargedTypeChange() {
      const selectedType = this.passenger.chargedType;
      console.log("selectedType", selectedType)
      this.isLowCost = [11, 12, 13, 14].includes(selectedType);
      if ([1, 2, 3, 4, 11, 12, 13, 14, 16, 18].includes(selectedType)) {
        this.multi = 2
      } else if([5, 6, 7, 8, 15, 17].includes(selectedType)){
        this.multi = 3
      } else if([9, 10].includes(selectedType)){
        this.multi = 4
      }

      // Determina la posición en pricesArrayTdms según la opción seleccionada
      const i = [11, 12, 13, 14].includes(selectedType) ? 0 : 1;

      // Asigna el valor correspondiente de pricesArrayTdms a priceSlotSelected
      this.priceSlotSelected = this.pricesArrayTdms[i];
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
    // TRAE PRECIOS DE TANDEMS
    getPrices() {
      //this.loadingCard = true;
      this.$http
      .get(`${process.env.VUE_APP_PRICES}?tipo=6`)
      .then((response) => {
        this.pricesData = response.data.payload.filter(price => price.typeAlt !== 19 && price.typeAlt !== 20 && price.typeAlt !== 21 && price.typeAlt !== 30 && price.typeAlt !== 31 && price.typeAlt !== 32);
        // Si encuentra un valor con typeAlt igual a 13, asignarlo a feeCam
        // Busca el valor con typeAlt igual a 13 y guarda el valor del camara
        const feeCam = response.data.payload.find(price => price.typeAlt === 19);
        if (feeCam) {
          this.feeCam = feeCam.value;
        }
        const comisionVal = response.data.payload.find(price => price.typeAlt === 20);
        if (comisionVal) {
          this.comisionVal = comisionVal.value;
          console.log("comisionVal", this.comisionVal)
        }

        const equipmentRent = response.data.payload.find(price => price.typeAlt === 21);
        if (equipmentRent) {
          this.equipmentRentVal = equipmentRent.value;
          console.log("equipmentRent", this.equipmentRentVal)
        }

        const videoEdit = response.data.payload.find(price => price.typeAlt === 33);
        if (videoEdit) {
          this.videoEditVal = videoEdit.value;
          console.log("videoEditVal", this.videoEditVal)
        }

        const priceSlotsTdms = response.data.payload.filter(price => [30, 31, 32].includes(price.typeAlt));
        if (priceSlotsTdms.length > 0) {
          this.pricesArrayTdms = priceSlotsTdms.map(price => price.value);
        }
      })
      .catch((error) => {
        console.log(error);
        //this.loadingCard = false;
      });
    },
    getPricesPacking() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=2`)
        .then((response) => {
          const packingPrices = response.data.payload;
          
          // Encuentra el precio con typePacking igual a 1
          const tdmPacking = packingPrices.find(item => item.typePacking === 1);

          // Accede al valor (value) si se encuentra
          if (tdmPacking) {
            this.packingVal = tdmPacking.value;
            console.log("Value:", this.packingVal);
            // Aquí puedes hacer lo que necesites con el valor
          } else {
            console.log("No se encontró un precio con typePacking igual a 1");
          }

          const camPacking = packingPrices.find(item => item.typePacking === 3);
          if (camPacking) {
            this.camPackingVal = camPacking.value;
            console.log("Value:", this.camPackingVal);
            // Aquí puedes hacer lo que necesites con el valor
          } else {
            console.log("No se encontró un precio con camPackingVal");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPricesInstructors(){
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=5`)
        .then((response) => {
          const instPayments = response.data.payload;
          instPayments.forEach(item => {
            if (item.typeAlt === 2) {
              this.payInstValue8 = item.value;
            } else if (item.typeAlt === 3) {
              this.payInstValue10 = item.value;
            } else if (item.typeAlt === 4) {
              this.payInstValue12 = item.value;
            }
          });

          console.log("payInstValue8:", this.payInstValue8);
          console.log("payInstValue10:", this.payInstValue10);
          console.log("payInstValue12:", this.payInstValue12);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    getEditors(){
      this.$http
      //http://localhost:8082/api/
      //.get(`http://localhost:8082/api/users?editors=true`)
      .get(`${process.env.VUE_APP_USERS}?editors=true`)
      .then((res) => {
        if(res.status === 200){
          this.editors = res.data.payload;
          console.log("USUARIOS EDITORES:", this.editors)
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getSelectedValue(typeAlt) {
      const selectedPrice = this.pricesData.find(price => price.typeAlt === typeAlt);
      this.passenger.chargedValue = selectedPrice ? selectedPrice.value : '';
      return selectedPrice ? selectedPrice.value : '';
    },
    /*
    formValidate(){
      console.log("entra en validacion")
      if(this.passenger.first_name === null || this.passenger.last_name  === null || this.passenger.chargedType === null){
        this.errorMessage = 'Faltan completar campos obligatorios';
        return
      } 
    },
    */
    async updateEditors() {
      const promesasEditores = this.editors.map(editorId => {
        return new Promise((resolve, reject) => {
          // Lógica para actualizar balance de editores
          const newData = {
            transactions: [
              {
                type: 1, // número para pago de comisiones
                amount: this.videoEditVal,
                description: `Se acreditaron $ ${this.videoEditVal} USD por edición de video de ${this.passenger.alias}`,
              },
            ],
          };

          this.updateUserBalance(editorId, newData)
            .then(() => {
              eventBus.$emit('toast', { show: true, text: "edición acreditada", color: "green" });
              resolve();
            })
            .catch(error => {
              console.error('Error al actualizar el balance del editor', error);
              reject(error);
            });
        });
      });

      await Promise.all(promesasEditores);
    },
    async updateUserComiss() {
      const newData = {
        transactions: [
          {
            type: 22, // número para pago de comisiones
            amount: this.comisionVal,
            description: `Se acreditaron $ ${this.comisionVal} USD por comisión TDM de ${this.passenger.alias}`,
          },
        ],
      };

      const promesasComisiones = this.comissUsers.map(userId => {
        return new Promise((resolve, reject) => {
          this.updateUserBalance(userId, newData)
            .then(() => {
              eventBus.$emit('toast', { show: true, text: "Comisión acreditada", color: "green" });
              resolve();
            })
            .catch(error => {
              console.error('Error al actualizar el balance del usuario', error);
              reject(error);
            });
        });
      });

      await Promise.all(promesasComisiones);
    },
    async updatePassenger(){
      //const userQ = this.comissUsers.length
      //const totalComisionVal = this.comisionVal * userQ
      const newTransaction = {
        balance: 0,
        transactions: [
          {
            type: 1,
            amount: this.passenger.chargedValue - this.videoEditVal,
            description: `${this.passenger.alias}: Acreditación a cuenta por Salto de Bautismo (${this.passenger.chargedValue} USD) menos monto por edición de video ($ ${this.videoEditVal} USD).`,
          },
        ],
      };

      await this.updatePassengerBalance(this.newPassId, newTransaction);
      this.loadingCard = false;
      this.loading = false;
      this.$router.push('/manifest/tableTdms');
    },
    async updatePassengerWithComiss(){
      const userQ = this.comissUsers.length
      const totalComisionVal = this.comisionVal * userQ
      const newTransaction = {
        balance: 0,
        transactions: [
          {
            type: 1,
            amount: this.passenger.chargedValue - totalComisionVal - this.videoEditVal,
            description: `${this.passenger.alias}: Acreditación a cuenta por Salto de Bautismo (${this.passenger.chargedValue} USD) menos monto por comisiones ($ ${this.comisionVal * this.comissUsers.length} USD) y edición de video ($ ${this.videoEditVal} USD).`,
          },
        ],
      };

      await this.updatePassengerBalance(this.newPassId, newTransaction);
      this.loadingCard = false;
      this.loading = false;
      this.$router.push('/manifest/tableTdms');
    },
    async responseData(){
      console.log("B")
      await this.updateEditors();
      if (
        this.passenger.chargedType !== 3 &&
        this.passenger.chargedType !== 4 &&
        this.passenger.chargedType !== 7 &&
        this.passenger.chargedType !== 8 &&
        this.passenger.chargedType !== 13 &&
        this.passenger.chargedType !== 14
      ) {
        await this.updateUserComiss();
        console.log("D")
        await this.updatePassengerWithComiss();
      } else {
        await this.updatePassenger();
      }
    },
    createPassenger2(newPassenger2){
      return this.$http.post(`${process.env.VUE_APP_PASSENGERS}`, newPassenger2)
        .then((response) => {
          console.log(response.data.payload, "RESPUESTA CREACION DE PASAJERO 2");
          return true; // Retorna los datos de respuesta
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR CREACION DE PASAJERO 2");
          eventBus.$emit('toast', { show: true, text: "error al crear segundo pasajero", color: "red" })
          throw err; // Lanza el error para que sea manejado por la función que llama a updateUserBalance
        });
    },
    submitForm() {
      console.log("entra en submitForm")
      this.errorMessage = null
      try {
        //this.formValidate();
        const url = this.id ? `${process.env.VUE_APP_PASSENGERS}/${this.id}` : `${process.env.VUE_APP_PASSENGERS}`;
        const method = this.id ? 'PUT' : 'POST';

        this.loadingCard = true;

        this.loading = true;

        if (this.isLowCost) {
          // If isLowCost is true, set a_alias from passenger2.alias
          this.passenger.a_alias = this.passenger2.alias;
        } else {
          // If isLowCost is false, do not send a_alias
          delete this.passenger.a_alias;
        }
        
        this.$http({ method: method, url, data: this.passenger })
          .then((res) => {
            if (res.status === 201) {
              this.newPassId = res.data.payload._id
              this.passenger2.payerId = this.newPassId
              console.log("A")
              this.responseData(res);
              if(this.isLowCost){
                const newPassenger2 = {
                  first_name: this.passenger2.first_name,
                  last_name: this.passenger2.last_name,
                  alias: this.passenger2.alias,
                  a_alias: this.passenger.alias,
                  chargedType: this.passenger.chargedType, // tipo de salto
                  chargedValue: 0, // valor del salto
                  jumped: false,
                  balance: 0,
                  transactions: [],
                  payerId: this.newPassId
                }
                this.createPassenger2(newPassenger2)
                  .then((result) => {
                    console.log("result", result);
                  })
                  .catch((error) => {
                    console.error("Error al crear el pasajero 2:", error);
                  });
              }
            } else {
              console.log('El estado de la respuesta no es 201');
            }
          })
          .catch((error) => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" });
            console.log(error);
          })
          .finally(() => {
            //this.loadingCard = false;
            //this.loading = false;
          });
      } catch (error) {
        eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" });
        console.log(error);
      }
    },
    updateUserBalance(userId, newData) {
      return this.$http.put(`${process.env.VUE_APP_USERS}/${userId}`, newData)
        .then((response) => {
          console.log(response.data.payload, "respuesta users de pagos");
          console.log("SE EFECTUO DEBITO");
          return response.data; // Retorna los datos de respuesta
        })
        .catch((err) => {
          console.log(err);
          console.log("aqui ERRORRRR")
          eventBus.$emit('toast', { show: true, text: "No se ha podido acreditar comisión", color: "red" })
          throw err; // Lanza el error para que sea manejado por la función que llama a updateUserBalance
        });
    },
    async updatePassengerBalance(userId, newData) {
      try {
        //const response = await this.$http.put(`http://localhost:8082/api/passengers/${userId}`, newData)
        const response = await this.$http.put(`${process.env.VUE_APP_PASSENGERS}/${userId}`, newData);
        return response.data;
      } catch (err) {
        console.log(err);
        eventBus.$emit('toast', { show: true, text: "No se ha podido actualizar la cuenta del pasajero", color: "red" });
      }
    }
  },
};
</script>
