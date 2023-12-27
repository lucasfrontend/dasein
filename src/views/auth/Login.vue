<template>
  <v-card 
    color="black" 
    dark 
    elevation="0" 
    height="100%" 
    class="d-flex rounded-0 justify-center align-center"
  >
    <div v-if="showSpinner">
      <AltimeterSpinner />
    </div>
    <v-card 
      color="transparent" 
      elevation="0" 
      :max-width="($vuetify.breakpoint.mdAndUp) ? '500' : ''"
    >
      <v-row 
        class="justify-center align-center"
      >
        <v-col 
          cols="12" 
          class="d-flex justify-center pt-0 align-center"
        >
          <v-card-title class="d-flex flex-column ma-0 pa-0">
            <div class="d-flex flex-column align-center">
              <div>
                <span class="custom-font">BARRY</span> <span class="pink--text custom-font">SYSTEM</span>
              </div>
              <span class="" style="font-size: 10px;">2.0 v Alpha</span>
            </div>
            <span>&</span>
            <img style="max-width: 250px; color: yellow" :src="logo">
          </v-card-title>
        </v-col>

        <!--
        <v-col 
          cols="12" 
          class="d-flex justify-center pt-0 align-center"
        >
          <img style="max-width: 250px; color: yellow" :src="logo">
        </v-col>
        -->
        <v-col cols="6" class="d-flex pl-15 pb-5 justify-center align-center">
          <v-divider :thickness="2" color="white"></v-divider>
        </v-col>

        <v-col cols="6" class="d-flex pr-15 pb-5 justify-center align-center">
          <v-divider :thickness="2" color="white"></v-divider>
        </v-col>

        <v-col cols="12">
          <v-form ref="formLogin" method="POST">
            <v-row class="px-15" no-gutters>
              <v-col cols="12">
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  placeholder="correo"
                  outlined
                  dense
                  class="logininput"
                  v-model="email"
                  :rules="[
                    (v) => !!v || 'El correo es obligatorio', 
                    (v) => /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido' 
                  ]"
                />
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  prepend-inner-icon="mdi-key"
                  placeholder="Contraseña"
                  outlined
                  dense
                  v-model="password"
                  :type="showPassword?'text':'password'"
                  @click:append="showPassword = !showPassword"
                  @keydown.enter="login"
                  :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'" 
                  :rules="[
                    (v) => !!v || 'La contraseña es requerida',
                    (v) => (v && v.length >= 6) || 'La contraseña debe tener al menos 6 caracteres'
                  ]"
                >
                  </v-text-field>
                </v-col>

                <v-col cols="12" class="d-flex justify-center mb-1" v-if="errorMessage">
                  <v-alert color="white" dense outlined type="error" icon="mdi-alert-octagon-outline">
                     {{ errorMessage }}
                  </v-alert>
                </v-col>

                <v-col cols="12">
                  <v-btn large block :loading="loading" color="yellow" class="black--text font-weight-bold" @click="login">
                    Iniciar Sesión
                  </v-btn>
                </v-col>

                <v-col cols="12" class="text-center mt-2">
                  <span style="font-size: 0.8rem;">¿Aún no estás registrado? <router-link to="/register">Regístrate aquí</router-link></span>
                </v-col>

              </v-row>
            </v-form>
          </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import AltimeterSpinner from '../app/AltimeterSpinner.vue'
//import { calcDistance } from "../../helpers/index";

export default {
  name: "Login",
  components: {
    AltimeterSpinner
  },
  data(){
    return{
      logo: require('@/assets/logo_amarillo.png'),
      loading: false,
      errorMessage: null,
      showPassword: false,
      email: '',
      password: '',
      showSpinner: false,
      sunset: null,


      geoLocal: null,
      distance: null,
      resultDistan: null
    }
  },
  mounted() {
    const locationChascomus = {
        lat: -35.54088856168718, // Latitud de Chascomús
        lng: -58.04879661672019, // Longitud de Chascomús
      };
      this.resultDistan = this.calcDistance(locationChascomus)
      console.log("resultDistan", this.resultDistan)
  },
  methods: {
    async getSunset() {
      try {
        //const res = await this.$http.get(`http://localhost:8082/api/settings/?sunset=true`);
        const res = await this.$http.get(`${process.env.VUE_APP_SETTINGS}?sunset=true`);
        this.sunset = res.data.sunset;
        console.log("res sunset", this.sunset);
        this.$store.commit('SET_SUNSET', this.sunset);
      } catch (error) {
        console.error(error);
      }
    },
    /*
    async getButtons(roles){
      console.log("roles desde getButtons:", roles)
      try {
        // `${VUE_APP_SETTINGS}?sunset=true`
        const res = await this.$http.post(`http://localhost:8082/api/buttons`, roles);
        console.log("RESPUESTA BUTTONS", res.data.buttons);
        //console.log("res sunset", this.sunset);
        //this.$store.commit('SET_SUNSET', this.sunset);
      } catch (error) {
        console.error(error);
      }
    },
    */
    calcDistance(location){
      return new Promise((resolve) => {
        this.getCurrentLocation().then((currentLocation) =>  {
          let lejos = this.getDistance(currentLocation.lat, currentLocation.lng, location.lat, location.lng).toFixed(0);
          this.distance = lejos
          console.log("this.distance", this.distance)
          //lejos= 0.5 //OJOOO
          resolve(lejos);
        }).catch(function () {
          resolve('--');
        });
      });
    },
    getDistance(lat1, lon1, lat2, lon2, unit = 'K'){
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }	else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
      }
    },
    async getCurrentLocation(){
      //console.log('llamando a getCurrentLocation');
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          geolocation => {
            this.geoLocal = geolocation
            console.log('this.geoLocal', this.geoLocal);
            resolve({
              lat: geolocation.coords.latitude,
              lng: geolocation.coords.longitude,
              accuracy: geolocation.coords.accuracy
            });
          },
          (e) => {
            console.log('Error CurrentLocation', e);
            reject(null);
          }
        );
      });
    },
    async login() {
      if (this.email && this.password) {
        this.loading = true;
        try {
          const res = await this.$http.post(process.env.VUE_APP_LOGIN_URI, {
          //const res = await this.$http.post('http://localhost:8082/api/session/login', {
            email: this.email,
            password: this.password,
            resultDistan: this.distance
          });
          if (res.status === 200) {
            console.log("RESPUESTA DE LOGIN:", res, "LUEGO GUARDA access_token")
            this.getSunset()
            localStorage.setItem('token', res.data.access_token)
            const token = res.data.access_token;
            console.log("EL TOKEN ES", token, "LUEGO GUARDA TOKEN EN STORE Y DATA DE USER EN SET SESSION")
            this.$store.commit('setToken', token);
            this.$store.commit('setSession', res.data.data.user)
            this.showSpinner = true;
            this.loading = false;
            //const roles = res.data.data.user.role
            // Retraso de 3 segundos antes de redireccionar
            
            setTimeout(() => {
              this.$router.push({ path: '/home' });
            }, 1500); //cambie a 100, estaba en 2500
            //this.getButtons(roles)

          } else {
            console.log("nosep")
            this.loading = false;
          }
        } catch (error) {
          console.error(error);
          this.errorMessage = "Error al conectar con el servidor. Por favor, inténtalo nuevamente más tarde.";
          this.loading = false;
        }
      } else {
        if (!this.email) this.errorMessage = "El correo es requerido"
        if (!this.password) this.errorMessage = "La contraseña es requerida"
      }
    }
  }
};
</script>

<style>

.fullscreen-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* ajusta la opacidad del fondo */
  z-index: 9999; /* asegura que el spinner esté por encima de todo lo demás */
}
</style>