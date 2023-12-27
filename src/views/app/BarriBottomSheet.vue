<template>
  <div class="text-center" style="min-height: 80vh;">
    <v-bottom-sheet
      v-model="showBarriBottomSheet"
      persistent
      inset
      overlay-opacity
    >

      <v-sheet
        class="text-center"
        height="450px"
      >
        <v-btn
          color="green"
          class="yellow--text my-4"
          @click="showBarriBottomSheet = false"
        >
          close
        </v-btn>
        <v-container class="d-flex flex-column pa-0">
          <div class="">
            <div class="bottom-sheet-container">
              <div v-if="summary.length > 0">
                <div v-for="(entry, index) in summary" :key="index" class="">
                  <div class="text-center">
                    <span class="custom-font pink--text">{{ entry.name }}</span>
                    <span v-if="entry.amount" class="custom-font green--text pl-4">{{ entry.amount }} USD</span>
                    <span v-if="entry.status" class="pl-4">{{ entry.status }}</span>
                  </div>
                  <div class="entry-description">{{ entry.description }}</div>
                </div>
              </div>
              <div v-else>No hay elementos para mostrar</div>
            </div>
            <h4>{{ messageHsPlane }}</h4>
            <h4>{{ messageHsPilot }}</h4>
            <h4>{{ messageEquipRent }}</h4>
          </div>
        </v-container>
        <v-spacer></v-spacer>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    selectedTanda: Object,
    showBarriBottomSheet: Boolean,
    summary: Array,
    messageHsPlane: String,
    messageHsPilot: String,
    messageEquipRent: String,

  },
  data() {
    return {
      localShowBarriBottomSheet: this.showBarriBottomSheet,
    };
  },
  methods: {
    saveEditedValueBottomSheet() {
      this.localShowBarriBottomSheet = this.showBarriBottomSheet;
      console.log("this.localShowBarriBottomSheet", this.localShowBarriBottomSheet)
      // Emitir un evento para indicar que se deben guardar los valores editados
      this.$emit('saveBottomSheet');

      // Cerrar el modal de edición
      this.$emit('closeBottomSheet');
    },
    closeConfirmationModalBottomSheet() {
      this.localShowBarriBottomSheet = false;
      // Emitir un evento para cancelar la edición
      this.$emit('closeBottomSheet');
    }
  },
};
</script>


<style scoped>
.entry-description {
  white-space: pre-line; /* Mantiene los saltos de línea en la descripción */
}
</style>