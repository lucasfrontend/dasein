<template>
  <v-container>
    <v-row style="display: flex; align-items: stretch;">
      <v-card
        v-for="item in flyersButtons"
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
      :showCounter="showCounter"

      :monthsNotPaid="monthsNotPaid"
      :selectedButtonId="selectedButtonId"
      @start-loading-button="startLoadingButton" 
      @stop-loading-button="stopLoadingButton"

      :amount="tempAmount"
      :mode="modalMode"
      :pricesSlots="pricesSlots"
      :pricesPacking="pricesPacking"
      :typeStatus="userStatus"
      :pricesRenEqu="pricesRenEqu"
      :equipmentRentOptions="equipmentRentOptions"
      @savePayJump="payJump"
      @savePayPackA="payPackA"
      @savePayPackB="payPackB"
      @saveMonthlyFee="chargeMonthlyFee"
      @close="closeConfirmationModal"
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
    userRole: {
      type: Array, 
      required: true,
    },
    tempAmount: Number,
    monthsNotPaid: {
      type: Array, 
      required: true,
    },
  },
  data() {
    return {
      flyersButtons: [
        {
          id: 1,
          label: 'TICKETS',
          nameFile: "ticket.png",
          icon: 'mdi-pencil-plus',
          action: this.openPayJumps,
          disabled: false,
        },
        {
          id: 2,
          label: 'CUOTA',
          nameFile: "ticket.png",
          icon: 'mdi-pencil-plus',
          action: this.openMonthlyFeeModal,
          disabled: false,
        },
        {
          id: 3,
          label: 'Comprar Paquete A',
          nameFile: "ticket.png",
          icon: 'mdi-pencil-plus',
          action: this.openPayA,
          disabled: false,
        },
        {
          id: 4,
          label: 'Comprar Paquete B',
          nameFile: "ticket.png",
          icon: 'mdi-pencil-plus',
          action: this.openPayB,
          disabled: false,
        }
      ],
      modalMode: '',
      showCounter: false,
      loadingButtons: {},
      slot12k: null,
      selectedButtonId: null, // Inicializa como null
      showConfirmationModal: null,
      modalData: {
        title: null,
        description: null,
        value: null,
        html: null,
        showAlert: false,
        alertMessage: null
      },
      pricesSlots: null,
      equipmentRentOptions: null,
      pricesPacking: null,
      pricesRenEqu: null,
      studPacking: null,
      altitudesOptions: [
        { text: '5.000', value: 1 },
        { text: '8.000', value: 2 },
        { text: '10.000', value: 3 },
        { text: '12.000', value: 4 }
      ],
      cuota: null,
      total25j: null,
      total50j: null,
    };
  },
  mounted() {
    this.getPricesSlots()
    this.getPriceCuota()
    this.updateButtonStates();
    console.log("this.monthsNotPaid en TOTALfLYER", this.monthsNotPaid)
  },
  computed: {
    isButtonLoading() {
      return (buttonId) => this.loadingButtons[buttonId] || false;
    },
  },
  methods: {
    updateButtonStates() {
      this.flyersButtons.forEach((button) => {
        console.log("monthsNotPaid", this.monthsNotPaid)
        console.log("this.userRole", this.userRole)
        //pay_inscript
        if (button.id === 1) {
          // Lógica para el botón con id 1
          //button.disabled = this.is_student && this.is_student.pay_inscript === true;
          console.log("1")
        }
        if (button.id === 2) {
          // Lógica para el botón con id 2
          button.disabled = this.monthsNotPaid.length === 0;
        }
        if(button.id === 3){
          console.log("Deberia verse boton paquete A", this.userRole.includes(12))
          button.disabled = !this.userRole.includes(12)
        }
        if(button.id === 4){
          button.disabled = !this.userRole.includes(14)
        }
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
    openPayJumps(butId){
      this.showCounter = true
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
          //this.pricesSlots = pricesSlots
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
      //this.modalMode = 'paymentJumps';
      /*
      this.modalData= {
        title: `Comprar salto`,
        description: `Ingrese datos del salto a abonar`,
      };
      */
      //this.showConfirmationModal = true;
      this.openPayment(
        butId,
        'paymentJumps',
        'Comprar salto',
        'Seleccionar tipo de salto y cantidad',
      );
    },
    openMonthlyFeeModal(butId) {
      this.showCounter = false
      const finalPrice = `${parseFloat(this.cuota)}`;
      this.openPayment(
        butId,
        'monthlyFee',
        'Seleccione cuota a debitar',
        `Monto a debitar: $ ${parseFloat(this.cuota)} ARGs.`,
        finalPrice
      );
    },
    async openPayA(butId) {
      try {
        this.showCounter = false;
        const { pricesSlots } = await this.getPrices();
        const packAPrice = pricesSlots.find(
          slot => slot.slot.altitude === 3 && slot.slot.typeStatus === 6
        );
        console.log("Precio encontrado:", packAPrice.slot.value);
        this.total25j = packAPrice.slot.value * 25;
        console.log("total25j", this.total25j);

        this.openPayment(
          butId,
          'paymentpackA',
          'Comprar paquete A',
          `25 saltos a 10K`,
          this.total25j
        );
      } catch (error) {
        console.error(error);
      }
    },
    //237
    async openPayB(butId){
      try {
        this.showCounter = false;
        const { pricesSlots } = await this.getPrices();
        const packBPrice = pricesSlots.find(
          slot => slot.slot.altitude === 3 && slot.slot.typeStatus === 7
        );
        console.log("Precio encontrado B:", packBPrice.slot.value);
        this.total50j = packBPrice.slot.value * 50;
        console.log("this.total50j", this.total50j);

        this.openPayment(
          butId,
          'paymentpackA',
          'Comprar paquete A',
          `50 saltos a 10K`,
          this.total50j
        );
      } catch (error) {
        console.error(error);
      }
    },
    payPackA(isDebit){
      console.log("total25j", this.total25j);
      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: this.total25j,
            description: isDebit ? `Débito por compra de pack - 25 saltos a 10k (${this.total25j} USD)` : `Compra de pack - 25 saltos a 10k (${this.total25j} USD)`
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago de PACK realizado exitosamente",
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
            text: "No se ha podido efectuar el cobro por PACK",
            color: "red",
          });
          console.log(error);
        });
    },
    payPackB(isDebit){
      console.log("this.total50j", this.total50j);
      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // 
            amount: this.total50j,
            description: isDebit ? `Débito por compra de pack - 50 saltos a 10k (${this.total50j} USD)` : `Compra de pack - 50 saltos a 10k (${this.total50j} USD)`
          },
        ]
      }
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((res) => {
          if (res.status === 200) {
            eventBus.$emit('toast', {
              show: true,
              text: "Pago de PACK realizado exitosamente",
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
            text: "No se ha podido efectuar el cobro por PACK",
            color: "red",
          });
          console.log(error);
        });
    },
    payJump(Qparam, AltParam, SlotsParam, TickParam, RentParam, packParam, isDebit){
      console.log("SlotsParam", SlotsParam, "RentParam:", RentParam, "packParam", packParam)
      let description = `Total: $(${Qparam} USD). Plaza a ${AltParam} (${SlotsParam} USD).`;
      if (TickParam > 1) {
        description = `Total: $(${Qparam} USD). ${TickParam} plazas a ${AltParam} (${SlotsParam} USD).`;
      }
      if (RentParam > 0) {
        description += ` Alquiler de ${TickParam} equipos: $${RentParam} USD.`;
      }
      if (packParam > 0) {
        description += ` ${TickParam} plegados: ${packParam} USD`;
      }

      const newData = {
        transactions: [
          {
            type: isDebit ? 2 : 1, // ingreso a su cuenta de monto
            amount: Qparam,
            description: isDebit ? `Débito. ` + description : `Ingreso a cuenta. ` + description
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
            text: "No se ha podido efectuar el cobro por Doble Asistido a 12k",
            color: "red",
          });
          console.log(error);
        });
    },
    chargeMonthlyFee(selectedMonth, isDebit) {
      console.log("QUe hago con isDebit", isDebit)
      console.log("selectedMonth recibido desde el modal", selectedMonth)
      if (selectedMonth) {
        console.log("selectedMonth llega a padre:",selectedMonth, "tipo de dato selectedMonth:", typeof selectedMonth);

        const newData = {
          transactions: [
            {
              type: isDebit === true ? 3 : 0, // 3 es cobro de cuota de socio, se resta de la cuenta corriente
              amount: parseFloat(this.cuota),
              description: isDebit === true ? `Se debitaron $${this.cuota} ARG correspondientes a la cuota de ${selectedMonth}` : `Pago en mano por $${this.cuota} USD correspondientes a la cuota de ${selectedMonth}`,
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
            const pricesSlots = prices.filter((price) => price.priceType === 1);
            const pricesPacking = prices.filter((price) => price.priceType === 2);
            const pricesRenEqu = prices.filter((price) => price.priceType === 3);
            const studPacking = pricesPacking.find((price) => price.Packing.typePacking === 2).Packing.value;
            const coachPayment = prices.filter((price) => price.priceType === 8);
            // Resuelve la promesa con los listados de precios
            resolve({ pricesPacking, pricesRenEqu, studPacking, coachPayment, pricesSlots });
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            reject(error);
          });
      });
    },
    getPriceCuota(){
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=7`)
        .then((response) => {
          this.cuota = response.data.payload;
          const selectedPrice = this.cuota.find((price) => [5].includes(price.students.typeCategory));
          if (selectedPrice) {
            this.cuota = selectedPrice.students.value;
          } else {
            console.log("No se encontraron objetos que cumplan con el filtro");
          }
        })
        .catch((error) => {
          console.log(error);
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
    closeConfirmationModal(){
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