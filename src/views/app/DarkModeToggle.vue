<template>
  <v-container>
      <v-switch
        v-model="internalDarkMode"
        :color="internalDarkMode ? 'primary' : 'grey lighten-1'"
        hide-details
        @click="toggleDarkMode"
      ></v-switch>
  </v-container>
</template>

<script>
export default {
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      items: [
        { label: 'Light Mode', value: false },
        { label: 'Dark Mode', value: true }
      ],
      internalDarkMode: this.darkMode
    };
  },
  methods: {
    toggleDarkMode() {
      this.$nextTick(() => {
      this.internalDarkMode = !this.internalDarkMode;
      this.$emit('toggle-dark-mode', this.internalDarkMode);
    });
    }
  },
  watch: {
    darkMode(newVal) {
      this.internalDarkMode = newVal;
    }
  }
};
</script>
