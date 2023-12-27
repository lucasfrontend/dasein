import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/lib/locale/es'
import '@mdi/font/css/materialdesignicons.css'
//import colors from 'vuetify/lib/util/colors';
//import DeleteIcon from '../views/components/icons/DeleteIcon.vue'; 
import IconMoon from "@/components/Icons/IconMoon";
import TrashIcon from "@/components/Icons/TrashIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
  },
  icons:{
    iconfont:"mdi",
    icons: {
      values: {
        moon: {
          component: IconMoon,
        },
        trash: {
          component: TrashIcon,
        }
      },
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#FFA500', // Verde Spotify
        secondary: '#FFFFFF', // Negro
        accent: '#191414', // Blanco
        error: '#FF0000', // Rojo
        info: '#00BFFF', // Azul claro
        success: '#00FF00', // Verde claro
        warning: '#FFA500', // Naranja
        consultauser: '#ECEFF1', // Gris claro
        consultaadmin: '#F5F5F5', // Gris más claro
        bottomTabActiveColor: '#1DB954', // Verde Spotify oscuro
        dark1: '#121212', // Gris oscuro
        //pink: '#FF69B4'
      },
      dark: {
        primary: '#FFA000', // Naranja claro
        secondary: '#2196F3', // Azul
        accent: '#FFEB3B', // Amarillo
        error: '#F44336', // Rojo
        info: '#00BCD4', // Turquesa
        success: '#8BC34A', // Verde claro
        warning: '#FF5722', // Naranja
        consultauser: '#333', // Gris oscuro
        consultaadmin: '#666', // Gris más oscuro
        bottomTabActiveColor: '#009688', // Verde oscuro
        dark1: '#000', // Negro
        //pink: '#FF69B4'

      }      
      /*
      light: {
        //cambiar color aqui
        primary: '#ce5044', //naranja
        orange: '#ce5044',
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.base,
        purple: '#7052fb',
        belgrano: "#199FDF",
        consultauser: "#ebe7fd",
        consultaadmin: "#f0f0f0",
        bottomTabActiveColor:'#0096E3',
        green: '#2b8a06',
        red: '#E21519',
        dark1: '#0E0E0E'
      },
      dark: {
        primary: '#FFCA28',
        secondary: '#199FDF',
        anchor: "#fff",
        consultauser: "#000000",
        consultaadmin: "#000038",
        green: '#4CAF50',
        red: '#E21519',
        dark1: '#0E0E0E'
      },
      */
    }
  }
});
