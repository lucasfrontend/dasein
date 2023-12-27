<template>
    <v-container>
      <v-row class="ma-5">        
        <v-col cols="12" sm="6" class="ma-0 pa-0">
          <v-card class="pa-4 text-center" elevation="3">
            <v-progress-circular
              v-if="loadingDebt"
              :size="74"
              color="pink"
              class="mt-8"
              indeterminate
            ></v-progress-circular>
            <div class="mx-10 my-4" v-if="!loadingDebt">
              <v-card-title class="mb-0 d-flex flex-column">
                <span style="font-size: 2rem;">
                  {{ capitalizedSlotName(debtor.alias) }}
                </span>
                <span style="font-size: 1rem;">{{ capitalizedSlotName(debtor.first_name) + ' ' + capitalizedSlotName(debtor.last_name) }}</span>
              
              </v-card-title>
              <span class="custom-font" style="font-size: 2rem;">Deuda: </span>
              <span v-if="debtor" class="custom-font pink--text" 
              style="font-size: 3rem;">
              {{ debtor.beer_bal  }}
              </span>
            </div>
            <v-row>
              <v-col v-for="t in transactions" :key="t._id" cols="12">
                <v-btn @click="openModalCancelB(t._id)">
                  {{ t.description }}
                  {{ t.amount  }}
                </v-btn>
              </v-col>
            </v-row>

            <!--
            <delete-button
              v-if="id"
              :show="true"
              :iconColor="'black'"
              :showDeleteButton="!id ? false : true"
              @click="openModalCancelB"
            />
          -->
          <!--
            <v-btn 
              v-if="!loadingDebt"
              color="primary" 
              class="mt-3"
              @click="openModalCancelB" 
              :disabled="debtor.beer_bal === 0"
              >
              Eliminar deuda
            </v-btn>
          -->
            <div class="d-flex flex-column" v-if="showChecked">
              <span>Deuda Eliminada</span>
              <v-icon color="green" class="pl-2" :size="40">mdi-check-circle-outline</v-icon>
            </div>
            
            <v-card-text class="text-center">
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-center align-center text-center my-4">
          <barri-counter
            :count="beerCount"
            @increment="incrementBeerCount"
            @decrement="decrementBeerCount"
          />
        </v-col>
        <!--
        <v-col cols="12" sm="6" class="d-flex justify-center align-center text-center my-4">
          <v-btn 
            color="black" 
            dark 
            fab 
            class="yellow--text mr-2" 
            @click="decrementBeerCount()"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <div v-if="beerCount > 0"
            class="custom-font pink--text mx-4" 
            style="font-size: 3rem;"
            >
            {{ beerCount }}
          </div>
        
          <v-btn 
            color="yellow" 
            dark 
            fab 
            class="black--text ml-2" 
            @click="incrementBeerCount()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        -->
        <v-container cols="12" sm="6" class="d-flex justify-center align-center text-center my-4">
          <div v-if="!loadingDebt"
            class="primary--text" 
            style="display: flex; flex-direction: row; align-items: center; text-align: center; justify-content: center;"
          >
          <div
            v-for="index in beerCount"
            :key="index"
            class="d-inline"
          >
            <v-img v-if="beerImg" :src="beerImg" class="orange--text text-center custom-beer mx-1"></v-img>
          </div>

          </div>
        </v-container>
        <v-container class="d-flex flex-column pa-0">
          <v-textarea 
            v-model="reason" 
            label="Motivo" 
            class="mt-5"
            outlined 
            dense 
            required 
            :rows="2"
            :max-rows="2"
            prepend-inner-icon="mdi-comment-text-outline"
          ></v-textarea>
  
          <v-alert
            v-if="errorMessage"
            type="error"
            border="left"
            colored-border
            dense
            outlined
            class="my-3 px-3"
            >
              {{ errorMessage }}
            </v-alert>   
        </v-container>

        <v-btn 
          color="black"
          dark block 
          class=""
          :loading="loadingBtn" 
          @click="openAddBeer" 
        >
          <span class="yellow--text">Guardar</span>
        </v-btn>
        
        <v-btn 
          color="red" 
          class="mt-2" 
          dark 
          block 
          @click="goBack"
        >
          <span class="yellow--text">Cancelar</span>
        </v-btn>
        <!--
        <v-col cols="12">
          <div class="background-pelu"></div>
        </v-col>
        -->
      </v-row>
      <BarriConfirmationDialog
        :showBarriConfirm="showDialog"
        :titleBarriModal="titleBarriModal"
        :barriModalMessage="barriModalMessage"
        :showDeleteIcon="showDeleteIcon"
        :actionType="actionType"
        @saveCancel="deleteBeers"
        @saveAdd="updateBeers"
        @close="closeConfirmationModal"
        ></BarriConfirmationDialog>
        <!--
        @save="deleteBeers"
      -->
    </v-container>
    
  </template>
  
  
  
<script>
import BarriConfirmationDialog from "../app/BarriConfirmationDialog.vue";
import BarriCounter from "./BarriCounter.vue";
//import DeleteButton from "../app/DeleteButton.vue";
import eventBus from '../../event-bus'
export default {
  name: 'DebtorDetails',
  components: {
    //DeleteButton,
    BarriConfirmationDialog,
    BarriCounter
  },
  props: {
  },
  data() {
    return {
      id: null,
      loadingDebt: true,
      loadingBtn: false,
      value: 0,
      debtor: '',
      deuda: null,
      beerCount: null,
      reason: null,
      errorMessage: null,
      showDialog: false,
      showChecked: false,
      showDeleteIcon: null,
      titleBarriModal: null,
      barriModalMessage: null,
      actionType: null,
      selectedTId: null,
      transactions: [],
      beerImg: require("../../assets/beer.png"),
    }
  },
  mounted() {
    this.id = this.$route.params.id
    console.log("id", this.id)
    if (this.id) {
      this.$http.get(`${process.env.VUE_APP_USERS}/${this.id}`)
        .then(response => {
          this.debtor = response.data.payload._doc
          this.loadingDebt = false
          this.deuda = this.debtor.beer_bal
          this.transactions = this.debtor.b_transactions
        })
        .catch(error => {
          console.log(error)
          this.loadingDebt = false
        });
    } 
  },
  computed: {
    updatedDebtor() {
      const updatedDebtor = { ...this.debtor };
      updatedDebtor.beers.beers_q = updatedDebtor.beers.beers_q + this.beerCount;
      return updatedDebtor;
    },
    capitalizedSlotName() {
      return (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1);
      };
    },
  },
  methods: {
    incrementBeerCount(currentCount) {
      this.beerCount = currentCount;
    },
    decrementBeerCount(currentCount) {
      this.beerCount = currentCount;
    },
    /*
    incrementBeerCount() {
      this.beerCount++;
    },
    decrementBeerCount() {
      if (this.beerCount > 0) {
        this.beerCount--;
      }
    },
    */
    openModalCancelB(idParam){
      this.selectedTId = idParam;
      this.showDialog = true
      this.showDeleteIcon = true
      this.titleBarriModal = 'Cancelar deuda'
      this.barriModalMessage = `Se cancelará la deuda por ${this.deuda} cerveza${this.deuda > 1 ? 's' : ''}.`
      this.actionType = 'cancel'
    },
    openAddBeer(){
      if(!this.beerCount){
        this.errorMessage = "No ha ingresado nuevas cervezas"
        return
      }
      if(!this.reason){
        this.errorMessage = "Debe proporcionar un motivo"
        return
      }
      this.showDialog = true
      this.showDeleteIcon = false
      this.titleBarriModal = 'Confirmar'
      this.barriModalMessage = `Suma ${this.beerCount} cerveza${this.beerCount > 1 ? 's ' : ' '}por: "${this.reason}""`
      this.actionType = 'add'
    },
    deleteBeers(){
      console.log("entra en updateBeers")
      //this.$http.delete(`http://localhost:8082/api/users/${this.id}/transactions/${this.selectedTId}`)
      this.$http.delete(`${process.env.VUE_APP_USERS}/${this.id}/transactions/${this.selectedTId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("respuesta status si es ok:", res.status, "y res", res)
            eventBus.$emit('toast', {
              show: true,
              text: `Cuenta del moroso actualizada.`,
              color: "green",
            });
            this.$router.push('/beer');
          } else {
            console.log("no entro a res.status igual 200");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.showDialog = false
      this.showChecked = true
    },
    updateBeers(){
      console.log("updateBeers")
      const newData = {
        b_transactions: [
          {
            type: 1, // suma cerveza
            amount: this.beerCount,
            description: this.reason,
            //isBalTr: true, 
          },
        ],
      }
      //this.$http.put(`http://localhost:8082/api/users/${this.id}`, newData)
      this.$http.put(`${process.env.VUE_APP_USERS}/${this.id}`, newData)
        .then((response) => {
          if (response.status === 200) {
            console.log("respuesta ok, por que??", response.status)
            eventBus.$emit('toast', {
              show: true,
              text: `Se sumó ${this.beerCount} cerveza${this.beerCount > 1 ? 's ' : ' '}con motivo: "${this.reason}""`,
              color: "green",
            });
            this.$router.push('/beer');
          } else {
            console.log("no entro a response.status igual 200");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeConfirmationModal(){
      this.showDialog = false
    },
    goBack() {
      this.$router.push('/beer');
    },
  }
};
</script>

<style>
.background-pelu {
  height: 500px;
  background-image: url('../../../public/img/pelu_beer_1.png');
  background-size: cover;
  background-position: center;
}

.custom-beer {
  max-width: 50px; /* Toma el 100% del ancho del contenedor */
  max-height: 195px; /* Toma el 100% del alto del contenedor */
  object-fit: contain;
}
</style>