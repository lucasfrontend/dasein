<template>
  <v-container fluid>
    <v-col cols="12" md="6" lg="3">
      <!--
        <donut :data="instructorsTable"></donut>
      -->
      </v-col>
    <v-expansion-panels accordion class="mb-4" flat>
      <v-expansion-panel 
        v-for="tanda in tandas" 
        :key="tanda._id"
        :class="{ 'panel-disabled': isTandaDisabled(tanda) }"
      >
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters class="">
              <v-col cols="2" sm="1" class="custom-number pink--text custom-font">
                <div class=""> <!-- Centra vertical y horizontalmente -->
                  <span class="custom-font pink--text">{{ tanda.number_tanda }}</span> <!-- Aplica estilos de fuente según tus preferencias -->
                </div>
              </v-col>
              <v-col cols="10" sm="11">
                <v-fade-transition leave-absolute>
                  <div v-if="open" key="0">
                    <span></span>
                  </div>
                  <div v-else key="1"> <!-- Centra vertical y horizontalmente -->
                    <v-row>
                      <div
                        v-for="slot in tanda.slots"
                        :key="slot._id"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                      >
                        <div class="my-4">
                          <span v-if="slot.slot.name" class="custom-font primary--text pr-2">{{ slot.slot.name }}</span>
                          <v-icon v-if="slot.slot.packing" color="green" class="pl-2">mdi-check-circle-outline</v-icon>
                        </div>
                      </div>
                    </v-row>
                  </div>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12">
              <div v-for="slot in tanda.slots" :key="slot._id" class="d-flex">
                <v-col cols="6">
                  <v-card v-if="slot.slot && slot.slot.equipment"
                    elevation="3"  
                    outlined 
                    class="rounded-lg d-flex justify-center align-center text-center" 
                    style="height: 100px;"
                    @click="openModalPackers(slot, tanda)"
                  >
                    <v-card-text class="custom-font pink--text d-flex flex-column" style="font-size: 1rem;">
                      <!--
                      <v-img v-if="logoEquip" :src="logoEquip" width="40" height="40" class="orange--text"></v-img>
                      -->
                      <span>{{ slot.slot.equipment.name_parachute }}</span>
                      <span v-if="slot.slot" class="custom-font primary--text">{{ slot.slot.name }}</span>
                      <div v-if="slot.slot && slot.slot.equipment">{{ getTypeAltWord(slot.slot.equipment.category) }}</div>
                      <span v-if="slot.slot.packing">{{ slot.slot.packing.name }} <v-icon color="green">mdi-check-circle-outline</v-icon></span>
                    </v-card-text>
                  </v-card>
                </v-col>
              </div>
              <v-btn @click="packEnd(tanda)" color="primary" dark>
                <v-icon>mdi-check</v-icon>
                Finalizar
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row>
      <v-col cols="12" v-for="(pack, index) in packers" :key="index">
        <v-card class="mb-4">
          <v-card-title>Plegados: {{ pack.alias }}</v-card-title>
          <v-data-table
            :headers="headersPackers"
            class="elevation-1"
            :items="pack.packerData"
          >
          <template v-slot:item.category="{ item }">
            {{ getTypeAltWord(item.category) }}
          </template>
        </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>Otros plegados</span>
            </v-expansion-panel-header>
    
            <v-expansion-panel-content>
              <v-select
                v-model="selectedPackerId"
                :items="optionsPackers"
                label="Packer"
                item-text="name"
                item-value="id_packer"
                @change="updatePacker"
              ></v-select>
              <v-select
                v-if="isSecondSelectorExpanded"
                v-model="selectedOption"
                :items="secondSelectorOptions"
                label="Opción"
                @change="handleSecondSelectChange"
              ></v-select>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>Precios</span>
            </v-expansion-panel-header>
    
            <v-expansion-panel-content>
                <v-data-table
                  :headers="pricesHeaders"
                  :items="pricesData"
                >
                  <!-- Utiliza una ranura para mostrar la palabra correspondiente -->
                  <template v-slot:item.typeAlt="{ item }">
                    {{ getTypeAltWord(item.typePacking) }}
                  </template>
                </v-data-table>
    
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    
    <v-dialog v-model="showEditModal" persistent max-width="500px">
      <!-- v-if="selectedSlot && optionsPackers.length > 0" -->
      <v-card class="rounded-lg">
        <v-card-title class="d-flex flex-column">
          <span v-if="selectedSlot" class="custom-font pink--text pr-2">{{ selectedSlot.slot.name }}</span>
          <span v-if="selectedSlot" class="primary--text pr-2">{{ selectedSlot.slot.equipment.name_parachute }}</span>
        </v-card-title>
        <v-card-text>
          <v-select 
            v-model="selectedPackerId"
            :items="optionsPackers" 
            label="Packer"
            item-text="name"
            item-value="id_packer"
            @change="updatePacker"
          ></v-select>
          <v-checkbox
            v-model="noCommands"
            label="No hizo los comandos"
          ></v-checkbox>
        </v-card-text>

        <v-card-actions class="pb-4 d-flex flex-column">
          <v-spacer></v-spacer>
          <v-btn dark block class="yellow--text mb-2" @click="updatePlegados" :loading="loadingBtn">guardar</v-btn>
          <v-btn block color="red" class="yellow--text ma-0" @click="showEditModal = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <barri-confirmation-dialog
      :showBarriConfirm="endconfirmation"
      :titleBarriModal="'¿Todos los equipos fueron plegados?'"
      @save="endPacking"
      @close="closeConfirmationModal"
    ></barri-confirmation-dialog>

  </v-container>
</template>
  
<script>
import eventBus from "../../event-bus";
import BarriConfirmationDialog from '../app/BarriConfirmationDialog.vue';
//import donut from '../graphics/donut.vue'
export default {
  components: {
    BarriConfirmationDialog
    //donut: donut,
  },
  data() {
    return {
      headersPackers: [
        { text: 'Categoría', value: 'category' },
        { text: 'Cantidad', value: 'count' },
        { text: 'USD', value: 'usd' },
      ],
      pricesHeaders: [
        { text: 'altura', value: 'typeAlt' },
        { text: 'Precio en USD', value: 'value' },
      ],
      pricesData: [],
      open: false,
      isDisabled: false,
      tandas: [],
      loading: true,
      loadingBtn: false,
      selectedSlot: null,
      selectedtanda: null,
      selectedTandaId: null,
      endTanda: null,
      showDialog: false,
      optionsPackers: [],
      packerData: {},
      packer: {},
      packers: [],
      selectedPackerId: null,

      landingConfirmation: false,
      endconfirmation: false,
      errorMesagge: null,
      showEditModal: false,

      isSecondSelectorExpanded: false,
      secondSelectorOptions: [],
      selectedOption: null,
      noCommands: null,

      logoVector: require('@/assets/anillas.png'),
      logo: require('@/assets/aerodyne.jpg'),
      logoEquip: require('@/assets/icons/arnes.png')
    }
  },
  mounted() {
    this.getPackers()
    this.getTandas()
    this.getPrices()
    //this.getEquipment()
  },
  methods: {
    getPackers(){
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_PACKERS}?names=true`)
        .then(response => {
          this.optionsPackers = response.data.payload

          this.optionsPackers.forEach((packer) => {
          console.log("packer.alias de getPackers:", packer.name)
            this.getTotalPackers(packer.id_packer, packer.name);
          });
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    },
    getTotalPackers(idPacker, alias){
      console.log("alias:", alias)
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_PACKERS}/countPackings/${idPacker}`)
        .then(response => {
          console.log("respuesta:", response.data.payload)
          const packerData = response.data.payload.totalPackers;
          this.packers.push({ alias, packerData });
          //console.log("packers:", this.packers)
          this.loading = false;
        })
        .catch(error => {
          // Manejar errores aquí si es necesario
          this.loading = false;
          console.error(`Error para el packer ${idPacker}:`, error);
        });
    },
    getTandas() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_TANDAS}?today=true`)
        .then(response => {
          localStorage.setItem('tandas', JSON.stringify(response.data.payload));
          this.tandas = response.data.payload.sort((a, b) => b.number_tanda - a.number_tanda);
          console.log("this.tandas", this.tandas)
          this.tandas.forEach(tanda => {
            tanda.slots.forEach(slot => {
              if (slot.slot && slot.slot.packing && slot.slot.packing.id_packer) {
                this.selectedPackerId = slot.slot.packing.id_packer;
              }
            });
          });
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    },
    getPrices() {
      this.loading = true;
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=2`)
        .then((response) => {
          this.pricesData = response.data.payload;
          console.log("this.pricesData", this.pricesData)
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    handleSecondSelectChange() {
      // Lógica para manejar el cambio en el segundo selector
    },
    updatePacker() {
      const selectedPacker = this.optionsPackers.find(packer => packer.id_packer === this.selectedPackerId);
      if (selectedPacker) {
        this.packer = selectedPacker;
        console.log("packers:", this.packer);
      }
    },
    /*
    getEquipment(){
      this.$http.get(`http://localhost:8082/api/equipment`)
        .then(response => {
          const equipment = response.data.payload;
          console.log("equipment", equipment )
          this.loading = false;
        })
        .catch(error => {
          console.log(error)
        });
    },
    */
    isTandaDisabled(tanda) {
      // Comprueba el valor de status.type y devuelve true o false
      return tanda.status.f_status === 1 || tanda.status.f_status === 2 || tanda.status.f_status === 4;
    },
    openModalPackers(item, tanda){
      console.log("abre modal")
      this.selectedSlot = item; // slot seleccionado
      this.selectedtanda = tanda; // tanda seleccionada
      let tandaId = tanda._id;

      this.selectedTandaId = tandaId;
      this.showEditModal = true
    },
    updatePlegados() {
      this.loadingBtn = true
      console.log("uno")
      if (this.selectedSlot && this.packer) {
        console.log("dos")
        const tandaId = this.selectedTandaId;
        const slotsActualizados = this.selectedtanda.slots.map(slot => {
          if (slot._id === this.selectedSlot._id) {
            console.log("3, this.selectedSlot", this.selectedSlot)
            return {
              ...slot,
              slot: {
                ...slot.slot,
                packing: {
                  name: this.packer.name,
                  id_packer: this.packer.id_packer
                }
              }
              
            };
          }
          return slot;
        });

        const tandaActualizada = {
          ...this.selectedtanda,
          slots: slotsActualizados
        };
        console.log("4, tandaActualizada", tandaActualizada)

        this.$http.put(`${process.env.VUE_APP_TANDAS}/${tandaId}`, tandaActualizada)
          .then(response => {
            console.log(response.data, "respuesta ACTUALIZACION PACKERS");
            this.loadingBtn = false
            this.showEditModal = false;
            this.selectedTanda = null
            this.packers = [],
            this.getTandas()
            this.getPackers()
          })
          .catch(err => {
            this.loadingBtn = false
            console.log(err);
          });
      }
    },
    // esta funcion no se usa??????????????????????????????
    closeSwitchStatus(){
      let id = this.selectedSlot._id;
      let newData = {
        flight_status: this.selectedSlot.flight_status === 3 ? 2 : 3
      };
      this.$http.put(`${process.env.VUE_APP_TANDAS}/${id}`, newData)
        .then((response) => {
          console.log(response.data.payload, "respuesta de ediciin");

          // Cambiar el icono del botón según el nuevo valor de flight_status
          this.selectedSlot.flight_status = newData.flight_status;
          this.getTandas()

        }).catch((err) => {
          console.log(err);
          // Realizar acciones en caso de error
          // ...
        });
      this.landingConfirmation = false;
    },
    packEnd(tanda){
      console.log(tanda)
      this.endTanda = tanda;
      this.endconfirmation = true
    },
    endPacking(){
      this.selectedTanda = this.endTanda;
      console.log("SLOT SELECCIONADO", this.selectedTanda);

      const updateUserPromises = this.selectedTanda.slots
        .filter(slot => slot.slot && slot.slot.packing && slot.slot.packing.id_packer)
        .map(slot => {
          const userId = slot.slot.packing.id_packer;
          const not_r = slot.slot.equipment.not_r;
          let price;
          let packType;
          const categoryToPlegadoType = {
            1: 'TDM',
            2: 'Escuela',
            3: 'Deportivo',
            // Agrega más mapeos según sea necesario
          };

          if (not_r) {
            price = this.pricesData.find(item => item.typePacking === 3);
            packType = 'Equipo Propio';
            console.log("precio cuando not_r es true", price);
          } else {
            price = this.pricesData.find(item => item.typePacking === slot.slot.equipment.category);
            console.log("price cuando not_r es false", price);
            packType = categoryToPlegadoType[slot.slot.equipment.category] || 'desconocido';
          }

          console.log("typeof price", typeof price.value);

          const newData = {
            transactions: [
              {
                type: 8, // pago a packers
                amount: price.value,
                description: `Se acreditaron $ ${price.value} USD por plegado ${packType}`,
              },
            ],
          };

          return this.updateUserBalance(userId, newData);
        });

      Promise.all(updateUserPromises)
        .then(() => {
          console.log("Todas las actualizaciones de usuarios fueron exitosas");
          console.log("actualizacion STATUS DE TANDAAA");
            let id = this.selectedTanda._id;
            console.log("id de tanda", this.selectedTanda._id)
            console.log("STATUS ANTES DE GUARDAR EN DB this.selectedTanda.f_status", this.selectedTanda.status.f_status)
            let newData = {
              status: {
                f_status: 4
              }
            };
            this.$http.put(`${process.env.VUE_APP_TANDAS}/${id}`, newData)
              .then((response) => {
                console.log("RESPUESTA DE CAMBIO DE STATUS DE TANDA",  response)          
                this.getTandas()
              }).catch((err) => {
                console.log(err);
              });
          // Aquí puedes ejecutar la siguiente función después de que todas las actualizaciones de usuario sean exitosas
        })
        .catch(err => {
          console.error("Al menos una actualización de usuario falló", err);
          // Maneja el error si alguna de las actualizaciones de usuario falla
          eventBus.$emit('toast', { show: true, text: "Hubo un error al actualizar las cuentas de los paracaidistas", color: "red" });
        });
    },
    closeConfirmationModal(){
      this.endconfirmation = false;
      //this.selectedTanda = null //agregue esta linea para solucionar quizas ambos modales abiertos
    },
    //////////////////////////////////
    updateUserBalance(userId, newData) {
      console.log("entra en actualizacion de balance")
      return this.$http.put(`${process.env.VUE_APP_USERS}/${userId}`, newData)
        .then((response) => {
          console.log("hizo la peticion put")
          console.log(response.data.payload, "respuesta users de pagos");
          console.log("SE EFECTUO DEBITO");
          return response.data; // Retorna los datos de respuesta
        })
        .catch((err) => {
          console.log(err);
          console.log("aqui ERRORRRR")
          eventBus.$emit('toast', { show: true, text: "No se ha podido actualizar la cuenta del paracaidista", color: "red" })
          throw err; // Lanza el error para que sea manejado por la función que llama a updateUserBalance
        });
    },
  },
  computed: {
    // funcion repetida, poner en utils.js o algo asi
    // 1 es TMB 
    // 2 es escuela 
    // 3 es deportivo
    getTypeAltWord() {
      return (category) => {
        switch (category) {
          case 1:
            return 'TDM';
          case 2:
            return 'Escuela';
          case 3:
            return 'Deportivo';
          case 4:
            return 'Esto no se deberia ver';
          default:
            return 'S/D';
        }
      }
    }
  },
}

</script>

<style scoped>
.panel-disabled {
  opacity: 0.6; /* Opacidad reducida para indicar que está deshabilitado */
  pointer-events: none; /* Evita interacciones con el panel deshabilitado */
  /* Otros estilos de diseño según sea necesario */
}
</style>