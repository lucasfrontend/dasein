<template>
  <v-container>
    <!--
    <SunsetCounter></SunsetCounter>
    -->
    <v-row style="display: flex; align-items: stretch;">
      <v-col 
        v-for="button in buttons" 
        :key="button.id" 
        cols="6"
      >
        <v-tooltip bottom v-if="button.action !== null && button.action !== ''">
          <template v-slot:activator="{ on }">
            <v-card 
              elevation="3" 
              outlined 
              v-on="on" 
              class="rounded-lg d-flex justify-center align-center text-center" 
              style="height: 130px;"
              @click="openTableScreenInNewTab(button)"
               
            >
            <!-- @click="$router.push(button.path)" -->
              <v-card-text 
                class="primary--text" 
                style="display: flex; flex-direction: column; align-items: center; text-align: center;"
              >
                <v-img v-if="button.nameFile" :src="require(`../assets/icons/${button.nameFile}`)" width="50" height="50" class="orange--text text-center"></v-img>

                <v-icon v-else size="40" color="primary">{{ button.icon }}</v-icon>
               
                <h4 class="">{{ button.description  }}</h4>
              </v-card-text>
            </v-card>
          </template>
          <span v-if="button.action">{{ button.action  }}</span>  
        </v-tooltip>
        <v-card v-else 
          elevation="4" 
          outlined 
          @click="$router.push(button.path)" 
          class="rounded-lg d-flex justify-center align-center text-center" 
          style="height: 130px;"
        >
          <v-card-text class="">
            <v-icon size="40" class="orange--text pb-4">{{ button.icon }}</v-icon>
            <h4>{{ button.description }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
//import SunsetCounter from './app/SunsetCounter.vue';
export default {
  name: "Dasboard",
  components: {
    //SunsetCounter
  },
  data() {
    return {
     buttons: null
    };
  },
  mounted() {
    this.getButtons();
  },
  methods: {
    getButtons() {
      this.$http.post(`${process.env.VUE_APP_BUTTONS}`, this.$store.getters.userRoles)
        .then(response => {
          console.log("response en buttons", response.data.buttons)
          this.buttons = response.data.buttons;
          //
        })
        .catch(error => {
          console.log(error)
          //
        });
    },
    openTableScreenInNewTab(button) {
      if (button.path === '/tableScreen') {
        const newTab = window.open(button.path, '_blank');
        newTab.focus();
      } else {
        this.$router.push(button.path);
      }
    }
  },
};
</script>

<style>
.card {
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}

.text {
  text-align: center;
  font-size: 16px;
  color: white;
  margin-top: 5px;
  padding: 20px;
}
</style>