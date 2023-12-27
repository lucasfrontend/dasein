<template>
  <v-dialog v-model="showBarriConfirm" persistent max-width="500px">
    <v-card >
      <v-card-title>{{ titleBarriModal }}</v-card-title>
      <v-card-text class="pa-4">
        <div
          v-if="showFlighStatusIcons" 
          class="text-center pb-4"
        >
          <v-icon v-if="showIcon1" size="60" class="pr-4">mdi-airplane-off</v-icon>
          <v-icon v-if="showIcon1" size="60" class="pr-4">mdi-arrow-right</v-icon>
          <v-icon v-if="showIcon2" size="60" :color="showIcon1 ? 'green' : ''">mdi-airplane-takeoff</v-icon>
          <v-icon v-if="showIcon3" size="60">mdi-arrow-right</v-icon>
          <v-icon v-if="showIcon3" size="60" class="pr-4" :color="showIcon3 ? 'green' : ''">mdi-airplane-landing</v-icon>
        </div>
        <div
          v-if="showDeleteIcon" 
          class="text-center"
        >
          <TrashIcon :iconColor="'gray'" :size="'50'"/>
        </div>
        <p v-if="barriModalMessage"> {{ barriModalMessage }}</p>
      </v-card-text>
      <v-card-actions class="pb-4 d-flex flex-column">
        <v-spacer></v-spacer>
        <v-btn dark block class="yellow--text mb-2" @click="saveEditedValue">Aceptar</v-btn>
        <v-btn block color="red" class="yellow--text ma-0" @click="closeConfirmationModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TrashIcon from "@/components/Icons/TrashIcon";
export default {
  components: {
    TrashIcon,
  },
  props: {
    showBarriConfirm: Boolean,
    titleBarriModal: String,
    barriModalMessage: String,
    showFlighStatusIcons: Boolean,
    showDeleteIcon: Boolean,
    showIcon1: Boolean,
    showIcon2: Boolean,
    showIcon3: Boolean,
    actionType: String,
  },
  data() {
    return {
    };
  },
  methods: {
    saveEditedValue() {
      if (this.actionType === 'cancel') {
        this.$emit('saveCancel'); // Emitir un evento específico para la acción de cancelar
      } else if (this.actionType === 'add') {
        this.$emit('saveAdd'); // Emitir un evento específico para la acción de agregar
      } else {
        // Emitir un evento para indicar que se deben guardar los valores editados
        this.$emit('save');
        // Cerrar el modal de edición
        this.$emit('close');
      }
      /*
      // Emitir un evento para indicar que se deben guardar los valores editados
      this.$emit('save');
      // Cerrar el modal de edición
      this.$emit('close');
      */
    },
    closeConfirmationModal() {
      // Emitir un evento para cancelar la edición
      this.$emit('close');
    }
  },
};
</script>