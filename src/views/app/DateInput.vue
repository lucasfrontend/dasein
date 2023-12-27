<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
    :nudge-top="25"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateFormatted"
        persistent-hint
        prepend-inner-icon="mdi-calendar"
        outlined
        clearable
        placeholder="DD/MM/AAAA"
        v-on="on"
        @click:prepend-inner="menu = !menu"
        dense
        :rules="rules"
        maxlength="10"
        :label="label"
      ></v-text-field>
    </template>
    <v-date-picker
      locale="es-ES"
      v-model="dateOfMenu"
      @input="emitDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
  },
  data() {
    return {
      dateOfMenu: null,
      dateFormatted: '',
      menu: false
    };
  },
  computed: {
    rules() {
      let formatDate = (v) => this.formatCorrect(v) || 'El formato fecha debe ser DD/MM/AAAA';
      let rules = [formatDate];
      if (this.required) rules.push((v) => !!v || 'La fecha es requerida');
      return rules;
    }
  },
  watch: {
    dateOfMenu(val) {
      this.dateFormatted = this.formatDate(val);
    }
  },
  methods: {
    formatCorrect(date) {
      if (!date || date.length !== 10) return false;
      let [day, month, year] = date.split("/");
      return day.length === 2 && month.length === 2 && year.length === 4;
    },
    formatDate(date) {
      return date ? this.$moment(date).format('DD/MM/YYYY') : null;
    },
    emitDate() {
      this.$emit('changeDate', this.dateOfMenu);
    }
  }
};
</script>
