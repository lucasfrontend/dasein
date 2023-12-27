<template>
  <v-btn 
    v-if="show" 
    @click="handleClick" 
    color="red"
    :disabled="!showDeleteButton"
    >
    <TrashIcon :iconColor="'white'"/>
  </v-btn>
</template>

<script>
import TrashIcon from "@/components/Icons/TrashIcon";
export default {
  components: {
    TrashIcon,
  },
  props: {
    show: Boolean,     // Indica si se debe mostrar el botón
    iconColor: String, // Color del icono
    showDeleteButton: Boolean
  },
  methods: {
    handleClick() {
      // Lógica para manejar el clic en el botón de eliminación
      this.$emit('click');
    },
  },
};
</script>