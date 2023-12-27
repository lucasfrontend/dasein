<template>
  <v-container>
    <p>{{  instructors }}</p>
     <v-row>
      <v-col cols="6" v-for="(i, index) in instructors" :key="index">
        <v-card class="mb-4">
          <v-card-title>Bautismos: {{ i.alias }}</v-card-title>
          <div>{{ i }}</div>
          <v-data-table
            :headers="headersInstructors"
            class="elevation-1"
            :items="i.instructorsData"
          >
        </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        optionInstructors: [],
        headersInstructors: [
        { text: 'Categoría', value: 'category' },
        { text: 'Cantidad', value: 'count' },
        { text: 'USD', value: 'usd' },
        ],
        pricesHeaders: [
          { text: 'altura', value: 'typeAlt' },
          { text: 'Precio ARG', value: 'value' },
        ],
        instructors: []
      }
    },
    mounted() {
      this.getInstructors()
      //this.getTandas()
      //this.getPrices()
      //this.getEquipment()
    },
    methods: {
      getInstructors() {
        this.loading = true;
        //this.$http.get(`http://localhost:8082/api/instructors`)
        this.$http.get(`${process.env.VUE_APP_INSTRUCTORS}`)
          .then(response => {
          this.optionInstructors = response.data.payload;
          
          this.optionInstructors.forEach((inst) => {
            console.log("inst", inst)
            console.log("inst._id", inst._id)
            console.log("inst.alias", inst.alias)
            this.getTotalInstructor(inst._id, inst.alias);
          });
          this.loading = false;
          //
          })
          .catch(error => {
            this.loading = false;
            console.log(error)
          //
          });
      },
      getTotalInstructor(idInstructor, alias){
        console.log("alias:", alias)
        this.loading = true;
        this.$http.get(`${process.env.VUE_APP_INSTRUCTORS}/countInstructors/${idInstructor}`)
          .then(response => {
            console.log("respuesta:", response.data.payload)
            const instructorsData = response.data.payload
            console.log("instructorsData:", instructorsData)
            this.instructors.push({ alias, instructorsData });
            console.log("instructors:", this.instructors)
            this.loading = false;
          })
          .catch(error => {
            // Manejar errores aquí si es necesario
            this.loading = false;
            console.error(`Error para el INSTRUCTOR ${idInstructor}:`, error);
          });
      },
      /*
      getInstructos(){
        this.loading = true;
        this.$http.get(`http://localhost:8082/api/packers?names=true`)
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
      */
      getTandas () {
        this.loading = true;
        //this.$http.get(`http://localhost:8082/api/tandas?today=true`)
        this.$http.get(`${process.env.VUE_APP_TANDAS}?today=true`)
        .then(response => {
            this.tandas = response.data.payload.sort((a, b) => b.number_tanda - a.number_tanda);
            console.log("this.tandas", this.tandas)
            this.tandas.forEach(tanda => {
              tanda.slots.forEach(slot => {
                if (slot.slot && slot.slot.packing && slot.slot.packing.id_packer) {
                  this.selectedPackerId = slot.slot.packing.id_packer;
                  console.log("entro:", this.selectedPackerId)
                  console.log("selectedPackerId:", this.selectedPackerId);
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
          //.get(`http://localhost:8082/api/prices?tipo=2`)
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
        return tanda.status.f_status === 1 || tanda.status.f_status === 2;
      },
      openModalPackers(item, tanda){
        this.selectedSlot = item; // slot seleccionado
        this.selectedtanda = tanda; // tanda seleccionada
        let tandaId = tanda._id;

        this.selectedTandaId = tandaId;
        this.showEditModal = true
      },
      updatePlegados() {
        if (this.selectedSlot && this.packer) {
          const tandaId = this.selectedTandaId;
          const slotsActualizados = this.selectedtanda.slots.map(slot => {
            if (slot._id === this.selectedSlot._id) {
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

          this.$http.put(`http://localhost:8082/api/tandas/${tandaId}`, tandaActualizada)
            .then(response => {
              console.log(response.data.payload, "respuesta de edición");
              this.showEditModal = false;
              this.packers = [],
              this.getTandas()
              this.getPackers()
            })
            .catch(err => {
              console.log(err);
              // Maneja el error
            });
        }
      },
      closeSwitchStatus(){
        let id = this.selectedSlot._id;
        let newData = {
          flight_status: this.selectedSlot.flight_status === 3 ? 2 : 3
        };
        this.$http.put(`http://localhost:8082/api/tandas/${id}`, newData)
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
      }
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