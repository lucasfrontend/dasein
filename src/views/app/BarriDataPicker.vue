<template>
  <div>
    <v-date-picker 
      v-model="dates" 
      range 
      :range-delimiter="customRangeDelimiter"
        :range-picker-label="customRangePickerLabel"
      @input="emitDateRange"
    ></v-date-picker>
  </div>
</template>

<script>
export default {
  data: () => ({
    dates: [],
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
  },
  methods: {
    emitDateRange() {
      const [startDate, endDate] = this.dates;
      console.log("startDate", startDate, " y endDate", endDate);
      this.$emit('dates-updated', { startDate, endDate });
    },
    customRangeDelimiter() {
      return ' ~ '; // Cambia el separador del rango según tus preferencias
    },
    customRangePickerLabel(date) {
      return date.toDateString(); // Puedes personalizar cómo se muestra la fecha del rango
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  created() {
    // Inicializa dates en el método created
    this.dates = [this.getCurrentDate(), this.getCurrentDate()];
  },
};
</script>
