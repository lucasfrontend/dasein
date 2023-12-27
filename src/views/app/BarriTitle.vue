<template>
  <v-row align="center" justify="center">
    <!-- Línea negra izquierda -->
    <v-col cols="3">
      <v-divider class="linea-negra"></v-divider>
    </v-col>
    
    <!-- Título centrado -->
    <v-col cols="auto" class="d-flex flex-column">
      <span class="custom-font pink--text" style="font-size: 2.2rem;">
        {{ titleText }} 
        
        <v-icon v-if="totalValue" class="mr-1" color="green" size="50">mdi-currency-usd</v-icon>
        <span v-if="totalValue" class="custom-font green--text">{{ totalValue }} USD</span>
      </span>
      <span class="custom-font gray--text text-center">{{ subtitle }}</span>
    </v-col>
    
    <!-- Línea negra derecha -->
    <v-col cols="3">
      <v-divider class="linea-negra"></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    titleText: String, 
    subtitle: String,
    totalValue: Number
  },
};
</script>

<style>
.linea-negra {
  background-color: black;
  height: 2px; /* Ajusta la altura de la línea según sea necesario */
}
</style>
