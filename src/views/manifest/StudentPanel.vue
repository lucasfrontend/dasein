<template>
  <v-container>
    <!--
    <span>agregar datas de curso</span>
    -->
    <v-row style="display: flex; align-items: stretch;">
      <v-card
        v-for="item in studentButtons"
        :key="item.id"
        elevation="3"
        outlined
        class="rounded-lg d-flex justify-center align-center text-center ma-2"
        style="height: 130px"
        :class="{ 'disabled-button': item.disabled }"
        @click="item.action(item.id)"
      >
        <v-card-text
          class="primary--text" 
          style="display: flex; flex-direction: column; align-items: center; text-align: center;"
        >
          <v-img v-if="!isButtonLoading(item.id) && item.nameFile" :src="require(`../../assets/icons/${item.nameFile}`)" width="50" height="50" class="orange--text text-center"></v-img>
          <v-icon v-else-if="!isButtonLoading(item.id)" size="40" class="pb-4">{{ item.icon }}</v-icon>
          <barri-progress-circular :size="45" :loading="isButtonLoading(item.id)" :key="item.id"/>
          <h4 class="blue--text pt-2">{{ item.label }}</h4>
        </v-card-text>
      </v-card>
    </v-row>

    <barri-modal
      :showBarriModal="showConfirmationModal"
      :modalData="modalData"
    

      :selectedButtonId="selectedButtonId"
      @start-loading-button="startLoadingButton" 
      @stop-loading-button="stopLoadingButton"

      :amount="tempAmount"
      :mode="modalMode"
      :instrOptions="instrOptions"
      :pricesSlots="pricesSlots"
      :pricesPacking="pricesPacking"
      :typeStatus="userStatus"
      :pricesRenEqu="pricesRenEqu"
      :equipmentRentOptions="equipmentRentOptions"
      @close="closeConfirmationModal"
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
    ></barri-modal>
  </v-container>
</template>

<script>
import BarriProgressCircular from '../app/BarriProgressCircular.vue';
import BarriModal from '../app/BarriModal.vue';
import eventBus from '../../event-bus'
export default {
  components: {
    BarriModal,
    BarriProgressCircular
  },
  props: {
    id: String,
    userStatus: Number,
    is_student: Object,
    tempAmount: Number
    //tempAmount: Number,
    
  },
  data() {
    return {
      selectedButtonId: null, // Inicializa como null
      loadingButtons: {}, // Objeto para rastrear el estado del indicador de carga por botón
      //userStatus: null,
      //is_student: {},
      
      //tempAmount: null,
      amount: {
        type: 1,
        value: null
      },
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
      //showCounter: false,

      instrOptions: [],
      priceTDT: null,

      pricesStudents: [],
      totalStudents: null,
      equipmentRentOptions: null,
      pricesRenEqu: null,
      pricesPacking: null,
      pricesSlots: null,
      theoryValue: null,
      slotStudent10: null,
      slotStudent12: null,
      slotStudent8: null,
      slotStudent5: null,
      equipLevel1: null,
      equipLevel2: null,
      equipLevel3: null,
      packingTdmStudent: null,
      packingStudent: null,
      packingInstr: null,
      feeInstr: null,
      comisValue: null,
      comissUsers: null,
      studentButtons: [
        {
          id: 1,
          label: 'Ingreso a curso',
          //nameFile: "beer.png",
          icon: 'mdi-school',
          action: this.openPayInscription,
          disabled: false,
        },
        {
          id: 2,
          label: 'Teoría Dual TDM',
          //nameFile: "beer.png",
          icon: 'mdi-account-multiple',
          action: this.openPaymentDualTdm,
          disabled: false, // Agrega tu lógica de deshabilitación si es necesario
        },
        {
          id: 3,
          label: 'TDM de curso',
          //nameFile: "beer.png",
          icon: 'mdi-account-multiple',
          action: this.openPaymentTdm,
          disabled: false, // Agrega tu lógica de deshabilitación si es necesario
        },
        {
          id: 4,
          label: 'Teoría general',
          nameFile: "manijas.png",
          icon: 'mdi-lightbulb',
          action: this.openGeneralTheory,
          disabled: false, // Agrega tu lógica de deshabilitación si es necesario
        },
        {
          id: 5,
          label: 'DOBLE ASISTIDO 12K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPayDouble12,
          disabled: false,
        },
        {
          id: 6,
          label: 'DOBLE ASISTIDO 10K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPayDouble10,
          disabled: false,
        },
        {
          id: 7,
          label: 'ASISTIDO SIMPLE 12K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPaySimple12,
          disabled: false,
        },
        {
          id: 8,
          label: 'ASISTIDO SIMPLE 10K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPaySimple10,
          disabled: false,
        },
        {
          id: 9,
          label: 'SOLO 12K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPaySolo12,
          disabled: false,
        },
        {
          id: 10,
          label: 'SOLO 10K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPaySolo10,
          disabled: false,
        },
        {
          id: 11,
          label: 'SOLO 8K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPaySolo8,
          disabled: false,
        },
        {
          id: 12,
          label: 'SOLO 5K',
          nameFile: "ticket.png",
          icon: 'mdi-ticket-confirmation',
          action: this.openPaySolo5,
          disabled: false,
        }
        // Agrega más objetos de datos para otras tarjetas aquí
      ],
    };
  },
  mounted() {
    // si no se usa id borrar id y usar this.id igualando con lo recibido por parametro
    if (this.id) {
      this.getParaca();
      this.getComisionUsers()
      this.getPricesTDT()
      this.getInstOptions()
      this.getPricesStudents()
      this.updateButtonStates();
    } 
    this.getPricesSlots()
  },
  computed: {
    isButtonLoading() {
      return (buttonId) => this.loadingButtons[buttonId] || false;
    }
  },
  methods: {
    getParaca() {
      //this.$http.get(`http://localhost:8082/api/users/${this.id}`)
      this.$http.get(`${process.env.VUE_APP_USERS}/${this.id}`)

        .then(response => {
          const paraca = response.data.payload;
          console.log(paraca)
          //this.userStatus = paraca._doc.status;
          //this.amount.value = paraca._doc.balance;
          //this.tempAmount = this.amount.value.toFixed(2);
          //this.feePaid = paraca._doc.feePaid;
          //this.is_student = paraca._doc.is_student ? paraca._doc.is_student : {};
          //this.updateButtonStates();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateButtonStates() {
      this.studentButtons.forEach((button) => {
        //pay_inscript
        if (button.id === 1) {
          // Lógica para el botón con id 1
          button.disabled = this.is_student && this.is_student.pay_inscript === true;
        }
        /* borrar de la base de datos o modificar payment_status_t_t, al parecer NO SIRVE
        if (button.id === 2) {
          // Lógica para el botón con id 2
          button.disabled = this.is_student && this.is_student.payment_status_t_t === true;
        }
        */
        if (button.id === 4) {
          // Lógica para el botón con id 2
          button.disabled = this.is_student && this.is_student.pay_gr_t === true;
        }
        // Agrega lógica para otros botones si es necesario
      });
    },
    startLoadingButton(buttonId) {
      console.log("PADRE RECIBE ID startLoadingButton OK", buttonId)
      this.$set(this.loadingButtons, buttonId, true); // Activa el indicador de carga para el botón específico
    },
    // AUN NO SE ESTA USANDO EL Q CORTA EL LOADING
    stopLoadingButton(buttonId) {
      this.$set(this.loadingButtons, buttonId, false); // Desactiva el indicador de carga para el botón específico
    },
    getPricesStudents() {
      this.$http
        .get(`${process.env.VUE_APP_PRICES}`)
        .then((response) => {
          const prices = response.data.payload;
          const a10 = prices.find((price) => price.priceType === 1 && price.slot.altitude === 3 && price.slot.typeStatus === 3);
          const a12 = prices.find((price) => price.priceType === 1 && price.slot.altitude === 3 && price.slot.typeStatus === 4);
          this.price10Slot = a10.slot.value
          this.price12Slot = a12.slot.value
          /* codigo anterior
          this.pricesStudents = prices.filter((price) => {
            if (price.students && price.students.typeCategory) {
              return [1, 2, 3, 4, 6].includes(price.students.typeCategory);
            }
            return false; // Si no hay students o typeCategory, no se incluye en la lista.
          });

          
          */

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
                this.equipLevel1 = price.students.value; 
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
        console.log("this.totalStudents CUANDO CARGA ", this.totalStudents)


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
        });
    },
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
            reject(error);
          });
      });
    },
    // trae precios de CUOTA

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
      //this.$http.get(`http://localhost:8082/api/users?aff=true`)
      this.$http.get(`${process.env.VUE_APP_USERS}?aff=true`)
        .then(response => {
          this.instrOptions = response.data.payload;
          console.log("RESPUESTA INSTRUCTORES:", this.instrOptions)
        })
        .catch(error => {
          console.log(error)
        });
    },
    getComisionUsers(){
      this.$http
      //http://localhost:8082/api/
      //.get(`http://localhost:8082/api/users?comisiones=true`)
      this.$http.get(`${process.env.VUE_APP_USERS}?comisiones=true`)
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
    // ABRIR MODALES_________________________________________________________________________________________________________
    openModal(butId, modalMode, title, description, value) {
      this.selectedButtonId = butId;
      this.modalMode = modalMode;

      this.modalData = {
        title,
        description,
        value,
        showAlert: this.tempAmount >= value,
        alertMessage: `El usuario cuenta con: $ ${this.tempAmount} USD en su cuenta con los cuales puede abonar el monto.`,
      };

      this.showConfirmationModal = true;
    },
    openPayment(butId, modalMode, title, description, value) {
      this.openModal(butId, modalMode, title, description, value);
    },
    openPayInscription(butId) {
      const finalPrice = this.totalStudents;
      console.log("ABRO MODAL DE INSCRIPCION, PRECIO:", this.totalStudents)
      this.openPayment(
        butId,
        'paymentNewStudent',
        'Inscripción a curso',
        `Suma de items de Escuela - Comisión Club ($ ${this.comisValue} USD x ${this.comissUsers.length}), Manual, Libreta, Publicidad, Licencia FAI.`,
        finalPrice
      );
    },
    openPaymentDualTdm(butId) {
      const finalPrice = this.priceTDT;
      this.openPayment(
        butId,
        'paymentDualTdm',
        'Teoría Dual Tandem',
        `Pago de teoría dual TDM. Monto: ${this.priceTDT}`,
        finalPrice
      );
    },
    openPaymentTdm(butId) {
      const totalSlots = this.slotStudent10 + this.slotStudent10;
      const finalPrice = totalSlots + this.equipLevel1 + this.packingTdmStudent + this.feeInstr;
      this.openPayment(
        butId,
        'paymentTdm',
        'Tandem de curso',
        `Dos plazas a 10 ($ ${totalSlots}) + 1 equipo tdm ($ ${this.equipLevel1} USD} + 1 plegado tdm ($ ${this.packingTdmStudent} USD) + 1 fee instructor ($ ${this.feeInstr} USD)`,
        finalPrice
      );
    },
    openGeneralTheory(butId) {
      const finalPrice = this.theoryValue;
      this.openPayment(
        butId,
        'paymentGeneralTheory',
        'Teoría General',
        'Cobro de Teoría General',
        finalPrice
      );
    },
    openPayDouble12(butId) {
      const totalSlots = this.slotStudent12 + this.slotStudent12 + this.slotStudent12;
      const total2packInst = this.packingInstr + this.packingInstr;
      const total2Fee = this.feeInstr + this.feeInstr;
      const finalPrice = totalSlots + this.equipLevel2 + this.packingStudent + total2packInst + total2Fee;
      this.openPayment(
        butId,
        'paymentDouble12',
        'Doble Asistido a 12K',
        `3 plazas a 12.000 ($ ${totalSlots} USD) + 1 equipo Escuela Etapa 2 ($ ${this.equipLevel2}) + 1 plegado Esc ($ ${this.packingStudent}) + 2 plegados de instructor ($${total2packInst} ) + 2 fee instructor ${total2Fee}`,
        finalPrice
      );
    },
    openPayDouble10(butId) {
      const totalSlots = this.slotStudent10 + this.slotStudent10 + this.slotStudent10;
      const total2packInst = this.packingInstr + this.packingInstr;
      const total2Fee = this.feeInstr + this.feeInstr;
      const finalPrice = totalSlots + this.equipLevel2 + this.packingStudent + total2packInst + total2Fee;
      this.openPayment(
        butId,
        'paymentDouble10',
        'Doble Asistido a 10K',
        `3 plazas a 10.000 ($ ${totalSlots} USD) + 1 equipo Escuela Etapa 2 ($ ${this.equipLevel2}) + 1 plegado Esc ($ ${this.packingStudent}) + 2 plegados de instructor ($${total2packInst} ) + 2 fee instructor ${total2Fee}`,
        finalPrice
      );
    },
    openPaySimple12(butId) {
      const totalSlots = this.slotStudent12 + this.slotStudent12;
      const finalPrice = totalSlots + this.equipLevel2 + this.packingStudent + this.packingInstr + this.feeInstr;
      this.openPayment(
        butId,
        'paymentSimple12',
        'Asistido Simple a 12K',
        `2 plazas a 12k ($ ${totalSlots}) + 1 equipo Escuela ($ ${this.equipLevel2})- 1 plegado Esc ($ ${this.packingStudent}) + 1 plegados de instructor ($ ${this.packingInstr}) + 1 fee instructor ($ ${this.feeInstr})`,
        finalPrice
      );
    },
    openPaySimple10(butId) {
      const totalSlots = this.slotStudent10 + this.slotStudent10;
      const finalPrice = totalSlots + this.equipLevel2 + this.packingStudent + this.packingInstr + this.feeInstr;
      this.openPayment(
        butId,
        'paymentSimple10',
        'Asistido Simple a 10K',
        `2 plazas a 10k ($ ${totalSlots}) + 1 equipo Escuela ($ ${this.equipLevel2})- 1 plegado Esc ($ ${this.packingStudent}) + 1 plegados de instructor ($ ${this.packingInstr}) + 1 fee instructor ($ ${this.feeInstr})`,
        finalPrice
      );
    },
    openPaySolo12(butId) {
      const finalPrice = this.slotStudent12 + this.equipLevel3 + this.packingStudent;
      this.openPayment(
        butId,
        'paymentSolo12',
        'Solo a 12K',
        `1 plaza a 12k ($ ${this.slotStudent12}) + 1 equipo Escuela ($ ${this.equipLevel3}) + 1 plegado Esc ($ ${this.packingStudent})`,
        finalPrice
      );
    },
    openPaySolo10(butId) {
      const finalPrice = this.slotStudent10 + this.equipLevel3 + this.packingStudent;
      this.openPayment(
        butId,
        'paymentSolo10',
        'Solo a 10K',
        `1 plaza a 10k ($ ${this.slotStudent10}) + 1 equipo Escuela ($ ${this.equipLevel3}) + 1 plegado Esc ($ ${this.packingStudent})`,
        finalPrice
      );
    },
    openPaySolo8(butId) {
      const finalPrice = this.slotStudent8 + this.equipLevel3 + this.packingStudent;
      this.openPayment(
        butId,
        'paymentSolo8',
        'Solo a 8K',
        `1 plaza a 8k (NO HAY PRECIO DE PLAZA A 8 EN LA BASE DE DATOS, DEFECTO: $ ${this.slotStudent8}) + 1 equipo Escuela ($ ${this.equipLevel3}) + 1 plegado Esc ($ ${this.packingStudent})`,
        finalPrice
      );
    },
    openPaySolo5(butId) {
      const finalPrice = this.slotStudent5 + this.equipLevel3 + this.packingStudent;
      this.openPayment(
        butId,
        'paymentSolo5',
        'Solo a 5K',
        `1 plaza a 5k (NO HAY PRECIO DE PLAZA A 5 EN LA BASE DE DATOS, DEFECTO: $ ${this.slotStudent5}) + 1 equipo Escuela ($ ${this.equipLevel3}) + 1 plegado Esc ($ ${this.packingStudent})`,
        finalPrice
      );
    },
    // PAGOS_________________________________________________________________________________________________________ 
    payInscription(isDebit){
      // ACREDITA A CUENTA PROPIA DE ESTUDIANTE EL MONTO DE INGRESO
      console.log("isDebit", isDebit)
      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 0, // 2 se debita, 0 pago efectivo, no se acumula en su cuenta
            amount: this.totalStudents,
            description: isDebit ? `Débito por Inscripcion a curso $(${this.totalStudents} USD))` : `Pago por Inscripcion a curso $(${this.totalStudents} USD))`,
          },
        ],
        is_student: {
          ...this.is_student, // Copia independiente del objeto is_student
          pay_inscript: true,
        },
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((response) => {
          if (response.status === 200) {
            // DEBITO DE SU CUENTA EL MONTO INGRESADO
            this.comissUsers.forEach((user) => {
                    const comissionData = {
                      transactions: [
                        {
                          type: 1, // ingreso QUR DEBERIA PONER AQUI?
                          amount: this.comisValue, // El mismo monto que el estudiante
                          description: `Comisión por nuevo alumno ($ ${this.comisValue} USD)`,
                        },
                      ],
                    };
                    console.log("user DE COMISIONES", user)
                    console.log("{user._idÑ", user._id)
                    this.$http.put(`${process.env.VUE_APP_USERS}/${user}`, comissionData)
                    .then((comissionResponse) => {
                      if (comissionResponse.status === 200) {
                        console.log("Acreditación de comisión exitosa");
                      } else {
                        console.log("Respuesta NO es 200, usuario:", user._id);
                      }
                    })
                    .catch((comissionError) => {
                      eventBus.$emit('toast', {
                        show: true,
                        text: `Error AL acreditaR COMISION, usuario: ${user._id, comissionError}`,
                        color: "green",
                      });
                    });
                  })
                  this.$router.push('/manifest/flyersList');
            //this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Ingreso",
            color: "red",
          });
          console.log(error);
        });
    },
    payGeneralTheory(Idsparam, isDebit) {
      if (Idsparam && Idsparam.length > 0) {
        const finalPrice = this.theoryValue;
        const amountPerInstructor = finalPrice / Idsparam.length; // Calcula el monto por instructor

        Idsparam.forEach((InsParam) => {
          const newData = {
            transactions: [
              {
                type: 5, // pago a instructores aff
                amount: amountPerInstructor, // Usa el monto calculado por instructor
                description: `Se acreditaron $${amountPerInstructor} USD por Teoría General.`,
              },
            ]
          };

          this.$http.put(`${process.env.VUE_APP_USERS}/${InsParam}`, newData)
            .then((response) => {
              if (response.status === 200) {
                eventBus.$emit('toast', {
                  show: true,
                  text: "Pago a Instructor AFF ok",
                  color: "green",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
        // Realiza el pago o débito de cuenta de alumno
        const newData = {
          transactions: [
            {
              type: isDebit ? 2 : 0, // debito o ingreso muerto
              amount: finalPrice,
              description: isDebit ? `Débito por Teoría General: $${finalPrice} USD` : `Pago por Teoría General: $${finalPrice} USD`,
            },
          ],
          is_student: {
            ...this.is_student, // Copia independiente del objeto is_student
            pay_gr_t: true,
            gr_t_inst_id: Idsparam,
          }, 
        }
        this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
          .then((res) => {
            if (res.status === 200) {
              // DEBITO DE SU CUENTA EL MONTO INGRESADO
              eventBus.$emit('toast', {
                show: true,
                text: "Pago de Teoría General OK",
                color: "green",
              });
              this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Teoría General",
            color: "red",
          });
          console.log(error);
        });
      } else {
        eventBus.$emit('toast', { show: true, text: "No se encuentra al instructor seleccionado.", color: "red" });
      }
    },
    payDualTdm(InsParam, isDebit) {
      console.log("InsParam INSTRUCTOR DE TEORIA", InsParam)
      if(InsParam){
        //console.log("payment_status_t_t ESS", this.is_student.payment_status_t_t)
        let newData = {};
        //if (this.is_student.payment_status_t_t === false) {
          newData = {
            transactions: [
              {
                type: isDebit ? 20 : 0, // cobro de teoria dual tandem
                amount: this.priceTDT,
                description: isDebit ? `Se debitaron $${this.priceTDT} USD correspondientes al pago de la Teoria Dual Tandem de curso dada por ${InsParam.name}` : `Pago de Teoria Dual Tandem de curso dada por ${InsParam.name} $${this.priceTDT} USD.`,
              },
            ]
            /*
            is_student: {
              ...this.is_student, // Copia independiente del objeto is_student
              payment_status_t_t: true,
              t_t_inst_id: InsParam,
            },*/
          }
          this.$http
            .put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
            .then((response) => {
              console.log("hay respuesta de transaccion ")
              // si actualiza estado de alumno 
              if (response.status === 200) {
                console.log(" respuesta de 200 ")
                //se acredita a instructor
                  newData = {
                    transactions: [
                      {
                        type: 21, // pago de teoria dual tandem a instructores aff
                        amount: this.priceTDT,
                        description: `Se acreditaron $${this.priceTDT} USD por Teoria Dual Tandem a alumno.`,
                      },
                    ]
                  }
                  this.$http.put(`${process.env.VUE_APP_USERS}/${InsParam.id}`, newData)
                    .then(response => {
                      if(response.status === 200){
                        eventBus.$emit('toast', {
                          show: true,
                          text: "Transacciones Teoría Dual Tandem efectuadas correctamente",
                          color: "green",
                        });
                        this.$router.push('/manifest/flyersList');
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
              }
            })
            .catch((error) => {
              eventBus.$emit('toast', { show: true, text: "No se ha podido actualizar débito por Teoría Dual Tandem", color: "red" }) 
              console.log(error);
            });
         //} 
      } else {
        eventBus.$emit('toast', { show: true, text: "No se encuentra al instructor seleccinado.", color: "red" })
      }
    },
    payTdm(isDebit){
      const totalSlots = this.slotStudent10 + this.slotStudent10
      const finalPrice = totalSlots + this.equipLevel1 + this.packingTdmStudent + this.feeInstr
      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: finalPrice,
            description: isDebit ? `Debito por TDM de curso a 10k: $${finalPrice} USD` : `Ingreso a cuenta por TDM de curso a 10k: $${finalPrice} USD`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
              eventBus.$emit('toast', {
                show: true,
                text: "Pago de TDM de curso efectuado correctamente",
                color: "green",
              });
              this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por TDM de curso",
            color: "red",
          });
          console.log(error);
        });
    },
    payDouble12(isDebit){
      const totalSlots = this.slotStudent12 + this.slotStudent12 + this.slotStudent12
      const total2packInst = this.packingInstr + this.packingInstr
      const total2Fee = this.feeInstr + this.feeInstr
      const totalDouble = totalSlots + this.equipLevel2 + this.packingStudent + total2packInst + total2Fee

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: totalDouble,
            description: isDebit ? `Débito por salto de curso, Doble Asistido a 12k: $(${totalDouble} USD)` : `Ingreso a cuenta por salto de curso, Doble Asistido a 12k: $(${totalDouble} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
              eventBus.$emit('toast', {
                show: true,
                text: "Pago de DOBLE ASISTIDO a 12 OK",
                color: "green",
              });
              this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Doble Asistido a 12k",
            color: "red",
          });
          console.log(error);
        });
    },
    payDouble10(isDebit){
      const totalSlots = this.slotStudent10 + this.slotStudent10 + this.slotStudent10
      const total2packInst = this.packingInstr + this.packingInstr
      const total2Fee = this.feeInstr + this.feeInstr
      const totalDouble = totalSlots + this.equipLevel2 + this.packingStudent + total2packInst + total2Fee

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: totalDouble,
            description: isDebit ? `Débito por salto de curso, Doble Asistido a 10k: $(${totalDouble} USD)` : `Ingreso a cuenta por salto de curso, Doble Asistido a 10k: $(${totalDouble} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago realizado exitosamente",
              color: "green",
            });
            this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Doble Asistido a 10k",
            color: "red",
          });
          console.log(error);
        });
    },
    paySimple12(isDebit){
      const totalSlots = this.slotStudent12 + this.slotStudent12
      const totalSimple = totalSlots + this.equipLevel2 + this.packingStudent + this.packingInstr + this.feeInstr
      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: totalSimple,
            description: isDebit ? `Débito por salto de curso, Asistido Simple a 12k: $(${totalSimple} USD)` : `Ingreso a cuenta por salto de curso, Asistido Simple a 12k: $(${totalSimple} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago realizado exitosamente",
              color: "green",
            });
            this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Asistido Simple a 12k",
            color: "red",
          });
          console.log(error);
        });
    },
    paySimple10(isDebit){
      const totalSlots = this.slotStudent10 + this.slotStudent10
      const totalSimple = totalSlots + this.equipLevel2 + this.packingStudent + this.packingInstr + this.feeInstr
      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: totalSimple,
            description: isDebit ? `Débito por salto de curso, Asistido Simple a 10k: $(${totalSimple} USD))` : `Ingreso a cuenta por salto de curso, Asistido Simple a 10k: $(${totalSimple} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago realizado exitosamente",
              color: "green",
            });
            this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Asistido Simple a 10k",
            color: "red",
          });
          console.log(error);
        });
    },
    paySolo12(isDebit){
      console.log("solo a 12")
      const finalPrice = this.slotStudent12 + this.equipLevel3 + this.packingStudent

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: finalPrice,
            description: isDebit ? `Débito por salto solo de curso, a 12k: $(${finalPrice} USD))` : `Ingreso a cuenta por salto solo de curso, a 12k: $(${finalPrice} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
              eventBus.$emit('toast', {
                show: true,
                text: "Pago realizado exitosamente",
                color: "green",
              });
              this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por Salto Solo de curso a 12k",
            color: "red",
          });
          console.log(error);
        });
    },
    paySolo10(isDebit){
      const finalPrice = this.slotStudent10 + this.equipLevel3 + this.packingStudent

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: finalPrice,
            description: isDebit ? `Débito por salto solo de curso, a 10k: $(${finalPrice} USD))` : `Ingreso a cuenta por salto solo de curso, a 10k: $(${finalPrice} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago realizado exitosamente",
              color: "green",
            });
            this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por salto Solo de curso a 10k",
            color: "red",
          });
          console.log(error);
        });
    },
    paySolo8(isDebit){
      const finalPrice = this.slotStudent8 + this.equipLevel3 + this.packingStudent

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: finalPrice,
            description: isDebit ? `Débito por salto solo de curso, a 8k: $(${finalPrice} USD)` : `Ingreso a cuenta por salto solo de curso, a 8k: $(${finalPrice} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago realizado exitosamente",
              color: "green",
            });
            this.$router.push('/manifest/flyersList')
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por salto Solo de curso a 8k",
            color: "red",
          });
          console.log(error);
        });
    },
    paySolo5(isDebit){
      const finalPrice = this.slotStudent5 + this.equipLevel3 + this.packingStudent

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: finalPrice,
            description: isDebit ? `Débito por salto solo de curso, a 5k: $(${finalPrice} USD)` : `Ingreso a cuenta por salto solo de curso, a 5k: $(${finalPrice} USD)`,
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago realizado exitosamente",
              color: "green",
            });
            this.$router.push('/manifest/flyersList');
          } else {
            console.log("Respuesta NO es 200");
          }
        })
        .catch((error) => {
          eventBus.$emit('toast', {
            show: true,
            text: "No se ha podido efectuar el cobro por salto Solo de curso a 5k",
            color: "red",
          });
          console.log(error);
        });
    },
    // PAGO DE SALTOS

    /// CREO QUE ESTA PARA BORRAR ESTA FUNCION
    paymentJumps(){
      this.getOptionsEquipment()
      .then(({ equipmentRentOptions }) => {
        const filteredEquipmentRentOptions = equipmentRentOptions.filter(equip => equip.name_parachute !== 'PROPIO');
        console.log("filteredEquipmentRentOptions", filteredEquipmentRentOptions)
        this.equipmentRentOptions = filteredEquipmentRentOptions;
      })
      .catch(error => {
        console.error(error);
      });

      this.getPrices()
        .then(({ pricesPacking, pricesRenEqu, studPacking, coachPayment }) => {
          this.pricesPacking = pricesPacking
          console.log("Precios de packing:", pricesPacking);
          this.pricesRenEqu = pricesRenEqu
          console.log("Precios de alquiler de equipo:", pricesRenEqu);
          this.studPacking = studPacking
          console.log("Precio de stud packing:", studPacking);
          this.coachPayment = coachPayment
          console.log("Precio de coach payment:", coachPayment);
        })
        .catch(error => {
          // Manejar errores si es necesario
          console.error(error);
        });

      
      this.modalMode = 'paymentJumps';
      this.description = null;

      this.modalData= {
        title: `Comprar salto`,
        description: `Ingrese datos del salto a abonar`,
      };
      this.showConfirmationModal = true;
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
        })
        .catch((error) => {
          console.log(error);
        });
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
  },
};
</script>

<style>
.disabled-button {
  opacity: 0.5; /* Reduce la opacidad para que parezca deshabilitado */
  pointer-events: none; /* Deshabilita los eventos de clic y otros eventos del ratón */
  cursor: not-allowed; /* Cambia el cursor para indicar que está deshabilitado */
}
</style>