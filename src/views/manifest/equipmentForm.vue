<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title v-if="this.form.name_parachute" class="custom-font pink--text" style="font-size: 1.7rem;"> {{ this.form.name_parachute }}</v-toolbar-title>
      <v-toolbar-title v-else class="custom-font pink--text" style="font-size: 1.7rem;">Nuevo Equipo</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-form ref="form">
          <v-text-field 
            v-model="form.name_parachute" 
            label="Nombre del paracaídas" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-parachute">
          </v-text-field>

          <v-select 
            v-model="form.category" 
            label="Tipo" 
            :items="categories" 
            item-text="text" 
            item-value="value" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-account-outline">
              <template #selection="{ item }">
                  {{ item.text }}
              </template>
              <template #item="{ item }">
                  <v-list-item-content> {{ item.text}}</v-list-item-content>
              </template>
          </v-select>

          <v-select
            v-model="form.owner"
            :items="ownerOptions"
            item-text="alias"
            item-value="id"
            label="Dueño"
            outlined
            dense
            required
            prepend-inner-icon="mdi-account"
            return-object
          ></v-select>
          form.owner : {{  form.owner }}

          <v-text-field 
            v-model="form.canopy.name" 
            label="Canopy" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-parachute">
          </v-text-field>

          <v-text-field 
            v-model="form.canopy.jumps" 
            label="Cantidad de saltos" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-parachute">
          </v-text-field>
          
          <v-select 
            v-model="form.harness"
            :items="harnessOptions"
            label="Arnés"
            outlined
            dense
            required
            prepend-inner-icon="mdi-parachute"
          ></v-select>
          
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field 
              v-model="form.reserve.name" 
              label="Reserva" 
              outlined 
              dense 
              required 
              prepend-inner-icon="mdi-parachute">
            </v-text-field>
          </v-col>
          
          <v-col cols="12" sm="3">
            <v-text-field 
              v-model="form.reserve.y" 
              label="Año Reserva" 
              outlined 
              dense 
              required 
              prepend-inner-icon="mdi-parachute">
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
            <date-input 
              v-model="form.reserve.packing_date" 
              :required="true" 
              :validationAge="false" 
              :label="fechaPlegado" 
              @changeDate="handleChangeDate"
            />
          </v-col>
        </v-row>
          
          <v-btn @click="saveEquipment" :loading="loading" color="black" dark block>
            <span class="yellow--text">Guardar</span>
          </v-btn>
          <v-btn v-if="id !== null" @click="showDialog = true" color="red" class="mt-2" dark block>
            <span class="yellow--text">Eliminar</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea Eliminar este equipo?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deleteEquipment">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
 
<script>
import DateInput from '../app/DateInput.vue';
import eventBus from '../../event-bus'
export default {
  components: {
    'date-input': DateInput
  },
  data() {
    return {
      id: null,
      showDialog: false,
      harnessOptions: [
        { text: "S/D", value: 0 },
        { text: "Vector", value: 1 },
        { text: "Icon", value: 2 },
        { text: "Sigma", value: 3 },
        { text: "Microsigma", value: 4 },
        { text: "Microsigma", value: 5 },
      ],
      form: {
        name_parachute: '',
        owner: {
          id: '',
          alias: ''
        },
        category: null,
        canopy: {
          name: '',
          jumps: ''
        },
        harness: null,
        reserve: {
          name: '',
          packing_date: null,
          y: ''
        }
      },
      categories: [
        { value: 1, text: 'Tandem' },
        { value: 2, text: 'Escuela' },
        { value: 3, text: 'Deportivo' }
      ],
      loading: false,
      fechaPlegado: "Fecha replegado",
      ownerOptions: []
    }
  },
  mounted() {
    const id = this.$route.params.id
    this.getOwners()
    if (id) {
      this.id = id
      this.$http.get(`${process.env.VUE_APP_EQUIPMENT}/${id}`)
        .then(response => {
          this.form = response.data.payload;
        //
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  methods: {
    getOwners(){
      this.$http
        .get(`${process.env.VUE_APP_USERS}`)
        .then((response) => {
          const resp = response.data.payload;
          console.log("resp:", resp)
          console.log("respuesta filtrada", resp.filter((user) => user.status === 1)    )
          this.ownerOptions = resp
            .filter((user) => user.status === 1)
            .map((user) => ({
              alias: user.first_name, // Cambia "alias" por el campo adecuado
              id: user.id        // Cambia "id" por el campo adecuado
            }));
            console.log("this.ownerOptions", this.ownerOptions)
        })
        .catch((error) => {
          console.log("error al cargar owners");          
          console.log(error);
        });
    },
    handleChangeDate(date) {
      console.log("date handleChangeDate:", date)
      this.form.reserve.packing_date = date
    },
    saveEquipment() {
      const dataToSend = {
        name_parachute: this.form.name_parachute,
        category: this.form.category,
        owner: this.form.owner,
        canopy: this.form.canopy,
        harness: this.form.harness,
        q_jumps: this.form.q_jumps,
        reserve: this.form.reserve,
      };
      
      console.log("data a enviar:", dataToSend)
      this.loading = true
      const url = this.id ? `${process.env.VUE_APP_EQUIPMENT}/${this.id}` : `${process.env.VUE_APP_EQUIPMENT}`;
      // const url = this.id ? `${process.env.VUE_APP_EQUIPMENT}/${this.id}` : `${process.env.VUE_APP_EQUIPMENT}`;
      const method = this.id ? 'PUT' : 'POST';
      
      this.$http({ method: method, url: url, data: this.form })
        .then(response => {
          console.log(response, this.id ? 'actualiza ok' : 'guarda ok');
          eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
          this.$refs.form.reset();
          this.$router.push('/manifest/equipmentList')
        })
        .catch(error => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          this.loading = false
          console.log(error);
        });
    },
    deleteEquipment(){
      if (this.id) {
        this.$http.delete(`${process.env.VUE_APP_EQUIPMENT}/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/equipmentList')
          //
          })
          .catch(error => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
            console.log(error)
          //
          });
      }
    }
  }
}
</script>
