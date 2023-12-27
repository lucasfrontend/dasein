<template>
  <div v-if="showSunset">
    <span>Hora del atardecer <icon-sunset /></span>
    <v-icon>iconSunset</v-icon>
    <v-icon>$iconSunset</v-icon>
    <div class="">{{ formattedSunset }}</div>
    <div class="d-flex" v-if="showCounter">
      <div class="">{{ hours }} :</div>
      <div class="">{{ minutes }} :</div>
      <div class="">{{ seconds }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
//import IconSunset from "@/components/Icons/IconSunset";
//import 'moment/locale/es';

export default {
  components: {
    //IconSunset
  },
  name: 'totalFlyer',
  data() {
    return {
      showSunset: false,
      showCounter: false,
      sunset: null,
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      endDate: null,
    };
  },
  mounted() {
    this.sunset = moment(this.$store.state.sunset, 'HH:mm:ss');
    console.log("this.sunset",this.sunset)

    if (!this.sunset) {
      this.getSunset();
      console.log("Nuevo llamado a sunset porque sunset es falsy");
    }

    this.updateCounter();

    // Actualiza el contador cada...
    setInterval(() => {
      this.updateCounter();
    }, 60000);
  },
  methods: {
    format(v) {
      return v.toString().padStart(2, '0');
    },
    updateCounter() {
      const currentMoment = moment();
      if (currentMoment.isBefore(this.sunset)) {
        const duration = moment.duration(this.sunset.diff(currentMoment));
        this.hours = this.format(duration.hours());
        this.minutes = this.format(duration.minutes());
        this.seconds = this.format(duration.seconds());
        this.showSunset = true;
      } else {
        // Realiza acciones cuando sea después del atardecer
        console.log("Después del atardecer");
        this.showSunset = false
      }
    },
    getSunset() {
      // Implementa tu lógica para obtener la hora del atardecer desde una API u otra fuente de datos
      // y actualiza el valor de this.sunset en consecuencia.
    },
  },
  computed: {
    formattedSunset() {
      return this.sunset.format('dddd D [de] MMMM [de] YYYY HH:mm:ss');
    },
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>
