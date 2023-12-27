<template>
  <v-card class="small-card" elevation="2">
    <v-card-title class="text-center">
    </v-card-title>
    <v-card-subtitle class="text-center custom-font pink--text" style="font-size: 2rem;">{{ total }}</v-card-subtitle>
    <v-card-subtitle class="text-center custom-font" style="font-size: 2rem;">{{ text }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
    },
  },
};
</script>