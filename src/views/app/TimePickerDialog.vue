<template>
  <v-dialog v-model="pickerOpen" max-width="330">
    <v-card>
      <v-card-title>
        <span class="headline">Horario abordaje</span>
      </v-card-title>
      <v-card-text>
        <v-time-picker v-model="pickerSelectedTime"></v-time-picker>
      </v-card-text>
      <v-card-actions class="d-flex flex-column pb-4">
        <v-btn color="black" dark block @click="saveTime" class="mb-2">
          <span class="yellow--text" >Guardar</span>
        </v-btn>
        <v-btn color="red" dark block @click="closeDialog" class="ma-0">
          <span class="yellow--text">Cancelar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean, // Prop para controlar si el diálogo está abierto o cerrado
    selectedTime: String, // Hora seleccionada del componente principal
  },
  data() {
    return {
      pickerOpen: this.value,
      pickerSelectedTime: this.selectedTime
    };
  },
  mounted(){
    console.log("selectedTime en mounted", this.selectedTime)
    //this.pickerSelectedTime = this.selectedTime
    console.log("selectedTime en mounted", this.pickerSelectedTime)
  },
  watch: {
    value(newVal) {
      this.pickerOpen = newVal;
    },
    selectedTime(newVal) {
      this.pickerSelectedTime = newVal;
    }
  },
  methods: {
    closeDialog() {
      this.pickerOpen = false;
      this.$emit("input", this.pickerOpen); // Emitir evento para cerrar el diálogo
    },
    saveTime() {
      console.log("pickerSelectedTime isssssss", this.pickerSelectedTime)
      this.$emit("update-selected-time", this.pickerSelectedTime);
      // Realizar alguna acción con la hora seleccionada si es necesario
      this.pickerOpen = false;
      this.$emit("input", this.pickerOpen); // Emitir evento para cerrar el diálogo
    },
  },
};
</script>
