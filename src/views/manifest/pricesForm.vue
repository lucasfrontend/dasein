<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>{{ getTitleText }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="savePrice">
          <v-row>
            <v-col cols="12" v-if="priceType === 1 || slot === true">
              <v-select
                v-model="typeStatusSlots"
                :items="typeStatusOptions"
                label="Tipo segun cateogía"
                required
                item-text="text"
                item-value="value"
                prepend-inner-icon="mdi-compass-outline"
              ></v-select>

              <!-- :disabled="id"-->
            </v-col>
            <v-col cols="12" v-if="priceType === 1 || priceType === 5 || slot === true || InstrPayment === true">
              <v-select
                v-model="altitude"
                :items="(priceType === 5 || InstrPayment === true) ? altitudeOptionsInstructors : (priceType === 1 || slot === true) ? altitudeOptions : []"
                label="Altura en FT"
                required
                item-text="text"
                item-value="value"
                prepend-inner-icon="mdi-compass-outline"
              ></v-select>
            </v-col>

            <v-col cols="12" v-if="priceType === 2 || packing === true">
              <v-select
                v-model="typePacking"
                :items="packingOptions"
                label="Tipo de packing"
                required
                prepend-inner-icon="mdi-parachute"
              ></v-select>
            </v-col>

            <v-col cols="12" v-if="priceType === 3 || rent === true">
              <v-select
                v-model="typeRent"
                :items="rentOptions"
                label="Tipo de Equipo"
                required
                prepend-inner-icon="mdi-parachute"
              ></v-select>
            </v-col>

            <v-col cols="12" v-if="priceType === 3 || rent === true">
              <v-text-field
                v-model="valueStaffVip"
                label="Alquiler Staff Vip"
                required
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-if="priceType === 3 || rent === true">
              <v-text-field
                v-model="valueStaff"
                label="Alquiler Staff"
                required
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-if="TdmJumps || priceType === 6">
              <v-select
                v-model="typeAlt"
                :items="tandemJumpsOptions"
                label="Tipo de TdmJumps"
                required
                prepend-inner-icon="mdi-parachute" 
              ></v-select>
            </v-col>
            <v-col cols="12" v-else-if="priceType === 4 || paymentPilots === true">
              <v-select
                v-model="typeAlt"
                :items="altitudeOptions"
                label="Altura"
                required
                prepend-inner-icon="mdi-parachute" 
              ></v-select>
            </v-col>
            <v-col cols="12" v-else-if="priceType === 8 || coachPayment === true">
              <v-select
                v-model="typeAlt"
                :items="altitudeOptions"
                label="Altura"
                required
                prepend-inner-icon="mdi-parachute" 
              ></v-select>
            </v-col>

            <v-col cols="12" v-if="priceType === 8 || coachPayment === true">
              <v-select
                v-model="category_coach"
                :items="coachOptions"
                label="Tipo de coach"
                required
                prepend-inner-icon="mdi-parachute"
              ></v-select>
            </v-col>

            <v-col cols="12" v-if="students || priceType === 7">
              <v-select
                v-model="typeCategory"
                :items="studentsOptions"
                label="Items Escuela"
                required
                prepend-inner-icon="mdi-parachute" 
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="value"
                :label="priceType === 4 || paymentPilots ? 'Precio en ARG' : 'Precio en USD'"
                required
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
          </v-row>
  
          <v-col cols="12" v-if="priceType === 3 || rent === true">
            <v-text-field
              v-model="valueNonMember"
              label="Alquiler NO socio"
              required
              prepend-inner-icon="mdi-currency-usd"
            ></v-text-field>
          </v-col>
          
          <v-row>
            <v-btn color="black" type="submit" dark block>
              <span class="yellow--text">{{ buttonText }}</span>
            </v-btn>
            <v-btn v-if="id" @click="showDialog = true" color="red" dark block class="mt-2">
              <span class="yellow--text">Eliminar</span>
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar este precio?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deletePrice" :loading="loadingDelete">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script>
import eventBus from '../../event-bus'
export default {
  name: "pricesForm",
  /*props: {
  
    id: {
      type: Number,
      default: null,
    },
  },*/
  data() {
    return {
      id: this.$route.params.id,
      showDialog: false,
      slot: this.$route.params.slot,
      packing: this.$route.params.packing,
      rent: this.$route.params.rent,
      paymentPilots: this.$route.params.paymentPilots,
      coachPayment: this.$route.params.coachPayment,
      InstrPayment: this.$route.params.InstrPayment,
      TdmJumps: this.$route.params.TdmJumps,
      students: this.$route.params.students,
      priceType: null,
      value: null,
      valueNonMember: null,
      valueStaff: null,
      valueStaffVip: null,
      altitude: null,
      typeStatusSlots: null,
      typePacking: null,
      typeRent: null,
      typeAlt: null,
      typeCategory: null,
      category_coach: null,
      //pricePacking: null,
      //buttonText: "Guardar",
      typeStatusOptions: [
        { text: "Staff VIP", value: 1 },
        { text: "Staff", value: 2 },
        { text: "Socio", value: 3 },
        { text: "No Socio", value: 4 },
        { text: "Jubilado", value: 5 },
        { text: "Socio con paquete A", value: 6 },
        { text: "Socio con paquete B", value: 7 }
      ],
      altitudeOptions: [
        { value: 1, text: '5000 ft' },
        { value: 2, text: '8000 ft' },
        { value: 3, text: '10000 ft' },
        { value: 4, text: '12000 ft' },
      ],
      altitudeOptionsInstructors: [
        { value: 2, text: '8000 ft' },
        { value: 3, text: '10000 ft' },
        { value: 4, text: '12000 ft' },
      ],
      packingOptions: [
        { value: 1, text: "Tandem" },
        { value: 2, text: "Escuela" },
        { value: 3, text: "Deportivo" },
      ],
      rentOptions: [
        { value: 1, text: "Escuela" },
        { value: 2, text: "Deportivo" },
      ],
      tandemJumpsOptions: [
        { value: 1, text: "HandyCam" },
        { value: 2, text: "HandyCam con Tarjeta" },
        { value: 3, text: "HandyCam PXL" },
        { value: 4, text: "HandyCam PXL con Tarjeta" },
        { value: 5, text: "CON CAMAROGRAFO" },
        { value: 6, text: "Camarografo con Tarjeta" },
        { value: 7, text: "Camarografo PXL" },
        { value: 8, text: "Camarografo PXL con Tarjeta" },
        { value: 9, text: "VIP" },
        { value: 10, text: "VIP con Tarjeta" },
        { value: 11, text: "LOW COST" },
        { value: 12, text: "LOW COST Con Tarjeta" },
        { value: 13, text: "Low Cost PXL" },
        { value: 14, text: "Low Cost PXL con tarjeta" },
        { value: 15, text: "PROMO CAM" },
        { value: 16, text: "PROMO HANDYC" },
        { value: 17, text: "PROMO CAM con Tarjeta" },
        { value: 18, text: "PROMO HANDYC con Tarjeta" },
        // agregado recientemento
        { value: 19, text: "Fee Camarógrafo TDMs" }, 
        { value: 20, text: "Comisión TDMs" }, 
        { value: 21, text: "alquiler equipos TDMs" }, 
        { value: 30, text: "Slot TDM 8k" }, 
        { value: 31, text: "Slot TDM 10k" }, 
        { value: 32, text: "Slot TDM 12k" }, 
        { value: 33, text: "Edición video" },
      ],
      coachOptions: [
        { value: 1, text: "Coach A" },
        { value: 2, text: "Coach B" },
        { value: 3, text: "Coach C" },
        { value: 4, text: "Coach D" },
      ],
      studentsOptions: [
        { text: "COMISION CLUB", value: 1 },
        { text: "Manual", value: 2 },
        { text: "Libreta", value: 3 },
        { text: "Publicidad", value: 4 },
        { text: "cuota social", value: 5 },
        { text: "FAI", value: 6 },
        { text: "Teoría", value: 7 },
        { text: "Plazas a 5k", value: 8 },
        { text: "Plazas a 10k", value: 9 },
        { text: "Plazas a 12k", value: 10 },
        { text: "Instructor", value: 11 },
        { text: "EQUIPO Etapa 1", value: 12 },
        { text: "EQUIPO Etapa 2", value: 13 },
        { text: "EQUIPO Etapa 3", value: 14 },
        { text: "Plegado Tandem", value: 15 },
        { text: "Plegado ESC", value: 16 },
        { text: "Plegado Instructor", value: 17 },
        { text: "Teoría dual TDM", value: 18 },
        { text: "Teoria Coaching", value: 19 },
        // agregado recientemento
        { text: "Plaza a 8k", value: 20 },
        { text: "Teoria coaching a 5k", value: 21 },
        { text: "Plazas a 10k socio", value: 22 }
      ],
      loadingDelete: false
    };
  },
  created() {
    console.log("CREATED")
    if (this.id) {
      console.log("hay idddd")
      // Si se está editando un precio, obtener sus datos
      this.$http
        .get(`${process.env.VUE_APP_PRICES}/${this.id}`)
        .then((response) => {
          let data = response.data.payload;
          console.log("data es:", data)
          this.priceType = data.priceType;
          console.log("this.priceType es:", this.priceType)

          if (this.priceType === 1) {
            this.altitude = data.slot.altitude;
            this.value = data.slot.value;
            this.typeStatusSlots = data.slot.typeStatus;
            console.log("this.altitude", this.altitude, "y this.value", this.value, "this.typeStatusSlots", this.typeStatusSlots)
          } else if (this.priceType === 2) {
            this.typePacking = data.Packing.typePacking;
            this.value = data.Packing.value;
          } else if (this.priceType === 3) {
            this.typeRent = data.rent.typeRent;
            this.value = data.rent.value;
            this.valueNonMember = data.rent.valueNonMember;
            this.valueStaff = data.rent.valueStaff;
            this.valueStaffVip = data.rent.valueStaffVip
          } else if (this.priceType === 4) {
            this.typeAlt = data.pilotPayment.typeAlt;
            this.value = data.pilotPayment.value;
          } else if (this.priceType === 5) {
            this.typeAlt = data.tdmInstrPayment.typeAlt;
            this.value = data.tdmInstrPayment.value;
          } else if (this.priceType === 6) {
            this.typeAlt = data.tandemJumps.typeAlt;
            this.value = data.tandemJumps.value;
          } else if (this.priceType === 7) {
            this.typeCategory = data.students.typeCategory;
            this.value = data.students.value;
          } else if (this.priceType === 8) {
            this.typeCategory = data.coachPayment.typeAlt;
            this.category_coach = data.coachPayment.category_coach;
            this.value = data.coachPayment.value;
          }
    
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (this.slot) {
        this.priceType = 1;
      } else if (this.packing) {
        this.priceType = 2;
      } else if (this.rent) {
        this.priceType = 3;
      } else if (this.paymentPilots) {
        this.priceType = 4;
      } else if (this.InstrPayment) {
        this.priceType = 5;
      } else if (this.TdmJumps) {
        this.priceType = 6;
      } else if (this.students) {
        this.priceType = 7;
      } else if (this.coachPayment) {
        this.priceType = 8;
      }
    }
  },
  computed: {
    buttonText() {
      console.log(this.id, "id")
      return this.id ? "Actualizar" : "Crear";
    },
    getTitleText() {
      if (this.slot || this.priceType == '1') {
        return "Precio Plazas";
      } else if (this.packing || this.priceType == '2') {
        return "Precio Plegados";
      } else if (this.rent || this.priceType == '3') {
        return "Precio Alquiler Equipos";
      } else if (this.paymentPilots || this.priceType == '4') {
        return "Precio Pago a pilotos";
      } else if (this.InstrPayment || this.priceType == '5') {
        return "Precio Pago a instructores";
      } else if (this.TdmJumps || this.priceType == '6') {
        return "Precios de bautismos";
      } else if (this.students || this.priceType == '7') {
        return "Precios Escuela";
      } else if (this.coachPayment || this.priceType == '8') {
        return "Precios Coachs";
      } else {
        return "titulito dinamico";
      }
    },
  },
  methods: {
    savePrice() {
      console.log("this.priceType", this.priceType)
      let data = {
        priceType: this.priceType, // Agrega el priceType al objeto data
      };

      // Agrega otros campos de acuerdo al tipo de precio
      if (this.priceType === 1) {
        console.log("priceType es 1")
        data.slot = {
          altitude: this.altitude,
          typeStatus: this.typeStatusSlots,
          value: this.value,
        };
      } else if (this.priceType === 2) {
        console.log("priceType es 2")
        data.Packing = {
          typePacking: this.typePacking,
          value: this.value,
        };
      } else if (this.priceType === 3) {
        console.log("priceType es 3")
        data.rent = {
          typeRent: this.typeRent,
          value: this.value,
          valueNonMember: this.valueNonMember,
          valueStaff: this.valueStaff,
          valueStaffVip: this.valueStaffVip
        };
      } else if (this.priceType === 4) {
        console.log("priceType es 4")
        data.pilotPayment = {
          typeAlt: this.typeAlt,
          value: this.value,
        };

      } else if (this.priceType === 5) {
        console.log("priceType es 5")
        data.tdmInstrPayment = {
          typeAlt: this.altitude,
          value: this.value,
        };
      } else if (this.priceType === 6) {
        console.log("priceType es 6")
        data.tandemJumps = {
          typeAlt: this.typeAlt,
          value: this.value,
        };
      } else if (this.priceType === 7) {
        console.log("priceType es 7")
        data.students = {
          typeCategory: this.typeCategory,
          value: this.value,
        };
      } else if (this.priceType === 8) {
        console.log("priceType es 8")
        data.coachPayment = {
          typeAlt: this.typeAlt,
          category_coach: this.category_coach,
          value: this.value,
        };
      }

      const method = this.id ? "put" : "post";
      const url = this.id
        ? `${process.env.VUE_APP_PRICES}/${this.id}`
        : `${process.env.VUE_APP_PRICES}`;

      this.$http[method](url, data)
        .then((response) => {
          console.log(response, "response");
          eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
          this.$router.push('/manifest/pricesList');
        })
        .catch((error) => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          console.log(error);
          // Mostrar mensaje de error al usuario
        });
    },

    deletePrice(){
      if (this.id) {
        this.$http.delete(`${process.env.VUE_APP_PRICES}/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/pricesList')
          })
          .catch(error => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
            console.log(error)
          });
      }
    }
  }
};
</script>