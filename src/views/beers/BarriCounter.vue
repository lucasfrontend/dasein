<template>
  <div class="d-flex align-center">
    <v-btn
      color="black"
      dark
      fab
      class="yellow--text mr-2"
      @click="decrement"
      :disabled="currentCount <= 1"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <div class="custom-font pink--text mx-4" style="font-size: 3rem;">
      {{ currentCount  }}
    </div>

    <v-btn
      color="yellow"
      dark
      fab
      class="black--text ml-2"
      @click="increment"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    count: Number,
    initialValue: {
      type: Number,
      default: 0, // Valor predeterminado es 0
    },
  },
  data() {
    return {
      currentCount: this.initialValue, // Inicializa el contador con el valor proporcionado o 0 por defecto
    };
  },
  methods: {
    increment() {
      this.currentCount++;
      this.$emit('increment', this.currentCount);
    },
    decrement() {
      this.currentCount--;
      this.$emit('decrement', this.currentCount);
    },
  },
};
</script>

<style scoped>
.custom-font {
  font-size: 3rem;
}
</style>
