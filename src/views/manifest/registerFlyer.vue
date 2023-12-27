<template>
  <v-container fluid>
    <v-col cols="12" class="ma-0 pa-0">
      <v-row class="ma-0 pa-0" align="end" justify="end">
        <delete-button
          v-if="id"
          :show="true"
          :iconColor="'black'"
          :showDeleteButton="!id ? false : true"
          @click="showDialog = true"
        />
      </v-row>
    </v-col>
    <v-card-title class="mb-2">
      <v-row class="d-flex align-center">
        <v-col cols="6" class="d-flex">
          <v-card-tittle class="custom-font pink--text py-4" style="font-size: 2rem;" v-if="titleFN || titleLN">{{ titleFN }} {{ titleLN }}</v-card-tittle>
          <v-card-tittle class="custom-font pink--text py-4" style="font-size: 2rem;" v-else>Nuevo {{  getStatusText(formData.status) }}</v-card-tittle>
        </v-col>
        <v-col cols="6" class="ma-0 pa-0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-icon v-if="formData.status === 1" color="yellow">mdi-account-star</v-icon>
                <v-icon v-if="formData.status === 2" color="orange">mdi-account-heart</v-icon>
                <v-icon v-if="formData.status === 3 && formData.role.includes(8)" color="blue">mdi-school</v-icon>
                <v-icon v-else-if="formData.status === 3" color="green">mdi-account-check</v-icon>
                <v-icon v-if="formData.status === 4" color="purple">mdi-account-cash</v-icon>
              </v-expansion-panel-header>
              
              <v-expansion-panel-content>
                <v-select
                v-model="formData.status"
                :items="statusOptions"
                label="Seleccione categoría"
                @change="clearData"
                ></v-select>
                
                <v-select
                  v-if="formData.status === 1 || formData.status === 2 || formData.status === 3"
                  v-model="formData.role"
                  :items="formData.status === 3 ? socioRoleOptions : staffRoleOptions"
                  label="Asignar rol"
                  multiple 
                  chips
                  autofocus
                ></v-select>

                <v-checkbox 
                  v-model="formData.is_active" 
                  label="Paracaidista activo?" 
                />

                <!-- q carajo hace este input??-->
                <div v-if="formData.status === 3">
                  <!-- Aquí podrías asignar directamente el valor para Socio -->
                  <input type="hidden" v-model="formData.role" value="6" />
                </div>
                
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1" :color="stepColor">Datos personales</v-stepper-step>
    
        <v-divider></v-divider>
    
        <v-stepper-step v-if="!formData.role.includes(8)" :complete="step > 2" :color="stepColor" step="2">Licencias</v-stepper-step>
        <v-stepper-step v-else :complete="step > 2" step="2" :color="stepColor">Items Alumnos</v-stepper-step>
        <v-divider></v-divider>
    
        <v-stepper-step step="3" :color="stepColor">Guardar</v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- agregar cartelido de rol segun si tiene id-->
              <h2 v-if="formData.role.includes(8)">Nuevo Alumno</h2>
              <h2 v-else>Nuevo paracaidista </h2>
              
              <p>Datos personales</p>

              <v-text-field
                v-model="formData.first_name"
                prepend-inner-icon="mdi-account"
                placeholder="Nombre"
                outlined
                dense
                required
                class="logininput"
                :rules="[
                  v => !!v || 'Este campo es requerido',
                  v => /^[a-zA-Z\s]*$/.test(v) || 'Ingrese solo letras'
                ]"
              />
              <v-text-field
                v-model="formData.last_name"
                prepend-inner-icon="mdi-account-outline"
                placeholder="Apellido"
                outlined
                dense
                required
                class="logininput"
                :rules="[
                  v => !!v || 'Este campo es requerido',
                  v => /^[a-zA-Z\s]*$/.test(v) || 'Ingrese solo letras'
                ]"
              />
              <v-text-field
                v-model="formData.alias"
                prepend-inner-icon="mdi-account-circle"
                placeholder="Alias - nombre para mostrar en pantalla"
                outlined
                dense
                required
                class="logininput"
                :rules="[
                  v => !!v || 'Este campo es requerido',
                ]"
              />
              <v-text-field
                v-model="formData.email"
                prepend-inner-icon="mdi-email"
                placeholder="correo"
                outlined
                dense
                required
                class="logininput"
                :rules="[
                  (v) => !!v || 'El correo es obligatorio', 
                  (v) => /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido' 
                ]"
              />
              <!--
              <v-text-field
              v-model="formData.dni"
                prepend-inner-icon="mdi-card-account-details"
                placeholder="DNI"
                outlined
                dense
                required
                class="logininput"
                :rules="[
                  v => !!v || 'Este campo es requerido',
                  v => /^[0-9]+$/.test(v) || 'Ingrese solo números'
                ]"
              />
              -->
              <v-text-field
                v-model="formData.em_phone"
                prepend-inner-icon="mdi-phone"
                placeholder="Contacto en caso de emergencia"
                outlined
                dense
                class="logininput"
                :rules="[
                  v => /^[0-9]+$/.test(v) || 'Ingrese solo números'
                ]"
              />

              <v-alert
                v-if="errorMessage"
                type="error"
                border="left"
                colored-border
                dense
                outlined
                class="my-3 px-3"
              >
                {{ errorMessage }}
              </v-alert> 

              <v-btn color="black" dark block :disabled="!valid" @click="contunueTo2">
                <span class="yellow--text">Continuar</span>
              </v-btn>

              <v-btn color="green" dark block class="mt-2"  @click.native="clear">
                <span class="yellow--text">Limpiar</span>
              </v-btn>
          </v-form>
        </v-stepper-content>
    
        <v-stepper-content step="2">
          <v-form>
            <v-container>
              <span class="custom-font green--text" style="font-size: 1.3rem;">Psicofísico</span>
              <v-col cols="12" sm="3">
                <!--
                holii {{  formData.exp_cma }}
                <v-date-picker
                  v-model="formData.exp_cma"
                  :min="new Date()"
                  label="Fecha de Expiración CMA"
                ></v-date-picker>
                -->
                <date-input
                  v-model="formData.exp_cma"
                  label="Fecha de vencimiento"
                  :required="false"
                  :validationAge="false"
                  @changeDate="handleChangeDate"
                />
              </v-col>

              <v-divider></v-divider>
              <div>
                <v-select
                  v-if="formData.role.includes(5)"
                  v-model="formData.is_coach_q"
                  :items="coachOptions"
                  label="Coacg Categoría"
                  outlined
                  dense
                  prepend-inner-icon="mdi-numeric"
                ></v-select>
              </div>

              <v-divider></v-divider>
              <div v-if="formData.role.includes(8)">
                <v-select
                  v-model="formData.is_student.level"
                  :items="levelOptions"
                  label="Etapa alumno"
                  outlined
                  dense
                  prepend-inner-icon="mdi-numeric"
                ></v-select>
              </div>


              <div v-if="!formData.role.includes(8)">
                <!-- AGREGAR LICENCIAS 
                <span class="custom-font green--text" style="font-size: 1.3rem;">Licencias - <span class="red--text">NO HACE FALTA COMPLETAR</span></span>
                <v-col cols="12" sm="3">
                  <v-flex d-flex lg6 v-for="(license, index) in formData.license_numbers" :key="index">
                    <v-text-field 
                      v-model="license.lic_num" 
                      label="num de licencia" 
                      outlined 
                      dense
                      prepend-inner-icon="mdi-card-account-details"
                    />
                    <v-btn @click="removeLicenseNumber(index)">Eliminar licencia</v-btn>
                  </v-flex>
                  <v-btn @click="addLicenseNumber">Agregar licencia</v-btn>
                  <v-flex d-flex lg2></v-flex>
                  <v-flex d-flex lg4>
    
                  </v-flex>

                </v-col>
                -->
                <div>
    
                </div>
              </div>
              <v-btn color="black" dark block :disabled="!valid" @click="contunueTo3">
                  <span class="yellow--text">Continuar</span>
              </v-btn>
              <v-btn color="green" dark block class="mt-2"  @click="step=1">
                  <span class="yellow--text">Atras</span>
              </v-btn>
            </v-container>
          </v-form>
        </v-stepper-content>
        <!-- CARD SOCIO -->
        <v-stepper-content step="3">
          <v-card>
            <!-- Encabezado -->
            <v-card-title>
              <div class="d-flex flex-column">
                <span v-if="!formData.role.includes(8)" class="custom-font pink--text" style="font-size: 1.8rem;">Nuevo socio</span>
                <span v-else class="custom-font blue--text" style="font-size: 1.8rem;">Nuevo Alumno</span>
                
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-center justify-center">
                <v-icon v-if="formData.status === 1" color="yellow" size="90" class="pr-1">mdi-account-star</v-icon>
                <v-icon v-if="formData.status === 2" color="orange" size="90" class="pr-1">mdi-account-heart</v-icon>
                <v-icon v-if="formData.status === 3" :color="formData.role.includes(8) ? 'blue' : 'green'" size="90" class="pr-1">mdi-account-check</v-icon>
                <v-icon v-if="formData.status === 4" color="purple" size="90" class="pr-1">mdi-account-cash</v-icon>
                <div class="text-center">
                  <span v-if="formData.status === 1">Staff Vip</span>
                  <span v-if="formData.status === 2">Staff</span>
                  <span v-if="formData.status === 3">Socio</span>
                  <span v-if="formData.status === 4">No socio</span>
                </div>
                
              </div>
            </v-card-title>
            
            <v-divider></v-divider>
            <!-- Contenido  -->
            <v-card-text class="py-8">
              <!-- Información del Usuario -->
              <div class="d-flex flex-column">
                <v-row class="pb-4">
                  <v-col cols="6" class="d-flex ma-0 pa-0">
                    <div v-if="formData.role.includes(10)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-cane
                        </v-icon>
                        JUBILADO
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(2)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        MANIFIESTO
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(3)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        TDM
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(4)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        AFF
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(5)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        COACH
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(6)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        PACKER
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(7)">
                      <v-chip
                        class="ma-2"
                        color="pink"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        PILOTO
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(8)">
                      <v-chip
                        class="ma-2"
                        color="blue"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        ALUMNO
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(12)">
                      <v-chip
                        class="ma-2"
                        color="yellow"
                        label
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-label
                        </v-icon>
                        con PAQUETE
                      </v-chip>
                    </div>
                    <div v-if="formData.role.includes(8)">
                      <v-chip class="ma-2" color="blue" text-color="white">Etapa: {{ formData.is_student.level }}</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="6" class="d-flex">

                  </v-col>
                </v-row>
                <span v-if="formData.alias" class="custom-font">Alias: 
                  <span class="pink--text pl-2">{{ formData.alias }}</span>
                </span>
                <span class="custom-font">Nombre completo: 
                  <span class="gray--text pl-2">{{ formData.first_name }} {{ formData.last_name }}</span>
                </span>
                <span class="custom-font">Paracaidista Activo:
                  <v-icon v-if="formData.is_active" color="green" class="pl-2" size="30">mdi-check-circle</v-icon>
                  <v-icon v-else color="gray" class="pl-2" size="30">mdi-bed</v-icon>
                </span>
                <span class="custom-font" v-if="formData.email">Correo: 
                  <span class="green--text pl-2">{{ formData.email }}</span>
                </span>
                <span class="custom-font">Psicofísico:
                  <v-chip
                  class="pl-2"
                    size="small"
                    :color="'green'"
                  >
                    <v-icon
                      start
                      :icon="'mdi-security'"
                    ></v-icon>
                      {{ Object.keys(formData.exp_cma).length ? formData.exp_cma : "S/D" }}
                  </v-chip>
                </span>
                <!-- Categoría Coach-->
                <div v-if="formData.role.includes(5)">
                  <span class="custom-font">Categoría Coach: </span>
                  <v-chip color="pink" outlined small v-if="this.formData.is_coach_q === 1">
                    <span class="custom-font">A</span>
                  </v-chip>
                  <v-chip color="pink" outlined small v-else-if="this.formData.is_coach_q === 2">
                    <span class="custom-font">B</span>
                  </v-chip>
                  <v-chip color="pink" outlined small v-else-if="this.formData.is_coach_q === 3">
                    <span class="custom-font">C</span>
                  </v-chip>
                  <v-chip color="pink" outlined small v-else-if="this.formData.is_coach_q === 4">
                    <span class="custom-font">D</span>
                  </v-chip>
                  <v-chip color="pink" outlined v-else>
                    <span class="custom-font">S/D</span>
                  </v-chip>
                </div>

                <div v-if="formData.role.includes(8)">
                  <span class="custom-font">alumno Etapa: </span>
                  <span class="custom-font blue--text pl-2">{{ formData.is_student.level }}</span>
                </div>

                <div v-if="formData.role.includes(12)">
                  <span class="custom-font">socio con Paquete 
                    <v-icon color="pink" size="40">mdi-alpha-a</v-icon>
                  </span>
                </div>
                <div v-if="formData.role.includes(13)">
                  <span class="custom-font">Cobra comisiones</span>
                </div>
                <div v-if="formData.role.includes(14)">
                  <span class="custom-font">socio con Paquete 
                    <v-icon color="pink" size="40">mdi-alpha-b</v-icon>
                  </span>
                </div>
              </div>

              <!-- Sección de Cama/Emoticono 
              <div v-if="formData.is_active === false">
                <v-icon>mdi-bed</v-icon>
                <v-icon>mdi-sleep</v-icon>
                <v-icon>mdi-hotel</v-icon>
              </div>
              <div v-else>
                <v-icon>mdi-emoticon-happy</v-icon>
              </div>
            -->

              <!-- Secciones de Rol -->
              <div v-if="formData.role.includes(9)">
                Jubilado
              </div>
            </v-card-text>

            <!-- Botones de Acción -->
            <div>
              <v-btn color="black" dark block :disabled="!valid" @click="submitForm()">
                <span class="yellow--text">Continuar</span>
              </v-btn>
              <v-btn color="green" dark block class="mt-2"  @click="step=2">
                <span class="yellow--text">Atras</span>
              </v-btn>
            </div>
          </v-card>          
                  
          
          <!--
          <h2 v-if="!formData.role.includes(8)"> Nuevo socio </h2>
          <h2 v-else>Nuevo Alumno</h2>
          <v-img v-if="pilotLogo" :src="pilotLogo" width="50" height="50" class="orange--text text-center"></v-img>

          <span v-if="formData.is_active">Paraca Activo</span>
          <span v-if="formData.alias">{{ formData.alias }}</span>
          <span v-if="formData.email">{{  formData.email }}</span>
          <span v-if="formData.role">{{  formData.role }}</span>
          <span v-if="formData.is_student">{{  formData.is_student }}</span>

          <div v-if="formData.is_active === false">
            <v-icon>mdi-bed</v-icon> 
            <v-icon>mdi-sleep</v-icon> 
            <v-icon>mdi-hotel</v-icon> 
          </div>
          <div v-else>
            <v-icon>mdi-emoticon-happy</v-icon>
          </div>

          <div v-if="formData.role.includes(9)">
            Jubilado
            <v-icon color="primary">mdi-cane</v-icon>
          </div>

          <div v-if="formData.role.includes(10)">
            socio comun
            <v-icon color="primary">mdi-cane</v-icon>
          </div>
          <div v-if="formData.role.includes(11)">
            NO socio
            <v-icon color="primary">mdi-cane</v-icon>
          </div>
          <div v-if="formData.role.includes(5)">
            <span>Categoría {{  this.formData.is_coach_q }}</span>
            <v-icon color="primary">mdi-cane</v-icon>
          </div>
        -->
          <!--        
            <p>una plaza a 10 + el primer mes de cuota</p>  
          <v-col cols="12">
            <v-btn :loading="buttonLoading" @click="openPayNewPartner()"> <span>Cobrar alta de socio</span></v-btn>
          </v-col>
          <v-checkbox v-if="!id"
          v-model="formData.beer_bal"
          label="Cerveza nuevo usuario"
          ></v-checkbox>
      
          <v-btn color="black" dark block :disabled="!valid" @click="submitForm()">
            <span class="yellow--text">Continuar</span>
          </v-btn>
          <v-btn color="green" dark block class="mt-2"  @click="step=2">
            <span class="yellow--text">Atras</span>
          </v-btn>
            -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>eliminar Paracaidista</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar al paracaidista?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deleteParaca">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <barri-modal
      :showBarriModal="showConfirmationModal"
      :paymentNewPartnerData="paymentNewPartnerData"
      :mode="modalMode"
      @savePayNewPartner="updatePayNewPartner"
      @close="closeConfirmationModal"
    ></barri-modal>
  </v-container>
</template>

<script>
import DateInput from "../app/DateInput.vue";
import eventBus from '../../event-bus'
import moment from "moment";
import BarriModal from '../app/BarriModal.vue';
import DeleteButton from '../app/DeleteButton.vue'
//import { formatDate } from '../../utils/utils'
export default {
  components: {
    DateInput,
    BarriModal,
    DeleteButton
  },
  data () {
    return {
      id: null,
      step: 1,
      valid: true,
      loading: false,
      buttonLoading: false,
      showConfirmationModal: false,
      formData: {
        status: 3,
        is_active: true,
        first_name: null,
        last_name: null,
        alias: null,
        email: null,
        role: [],
        feePaid: [],
        is_student: {
          level: 1
        },
        em_phone: null,
        exp_cma: {},
        beer_bal: false,
        dni: null,
        is_instructor: false,
        is_packer: false,
        is_coach_q: null,
        license_numbers: [],
        balance: null,
      },
      errorMessage: null,
      select: null,
      statusOptions: [
        { text: "Staff VIP", value: 1 },
        { text: "Staff", value: 2 },
        { text: "Socio", value: 3 },
        { text: "No Socio", value: 4 },
      ],
      staffRoleOptions: [
        { text: "Manifiesto", value: 2 },
        { text: "Instructor TDM", value: 3 },
        { text: "Instructor AFF", value: 4 },
        { text: "Couch", value: 5 },
        { text: "Packer", value: 6 },
        { text: "Pilot", value: 7 },
        { text: "Cobra Comisiones", value: 13 },
        { text: "Editor", value: 15 }
        // 1 staff vip, NO DEBERIA GUARDARSE ESTE DATO, ES AL PEDO
        // 2 manifiesto, 
        // 3 instructores TMD, 
        // 4 instructor AFF, 
        // 5 couch, 
        // 6 packer, 
        // 7 pilot,
      ],
      socioRoleOptions: [
        { text: "Alumno", value: 8 },
        { text: "Jubilado", value: 9 },
        { text: "Socio con Paquete A", value: 12 },
        { text: "Socio con Paquete B", value: 14 },
        // 8 alumnos, 
        // 9 jubilado
        // 10 socio comun, NO DEBERIA GUARDARSE ESTE DATO, ES AL PEDO
        // 11 no socio NO DEBERIA GUARDARSE ESTE DATO, ES AL PEDO
      ],
      levelOptions: [
        { text: "Etapa 1", value: 1 },
        { text: "Etapa 2", value: 2 },
        { text: "Etapa 3", value: 3 }
      ],
      coachOptions: [
        { text: "Coach A", value: 1 },
        { text: "Coach B", value: 2 },
        { text: "Coach C", value: 3 },
        { text: "Coach D", value: 4 }
      ],
      checkbox: false,
      date: new Date().toISOString().substr(0, 10),
      titleFN: '',
      titleLN: '',
      showDialog: false,
      pricesStudents: [],
      headerStudentPrices: [
        {
          text: "Items",
          value: "altitude",
        },
        {
          text: "Precio",
          value: "additional_info",
        }
      ],

      modalMode: '',
      paymentNewPartnerData: {
        title: null,
        description: null,
      },
      price10Slot: null,
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.getParaca();
      this.submitButtonTitle = 'editar';
    }
  },
  computed: {
    stepColor() {
      if (this.formData.role.includes(8)) {
        return 'blue';
      } else if (this.formData.role.includes(10)) {
        return 'purple';
      } else if (this.formData.status === 1) {
        return 'yellow';
      } else if (this.formData.status === 2) {
        return 'orange';
      } else if (this.formData.status === 3) {
        return 'green';
      } else if (this.formData.status === 4) {
        return 'purple';
      } else {
        // Color por defecto si ninguna condición se cumple
        return 'green';
      }
    },
    getStudentsText() {
      return (typeCategory) => {
        switch (typeCategory) {
          case 1:
            return "COMISION CLUB";
          case 2:
            return "Manual";
          case 3:
            return "Libreta";
          case 4:
            return "Publicidad";
          case 5:
            return "cuota social";
          case 6:
            return "FAI";
          case 7:
            return "Teoría";
          case 8:
            return "Plazas a 5k";
          case 9:
            return "Plazas a 10k";
          case 10:
            return "Plazas a 12k";
          case 11:
            return "Instructor";
          case 12:
            return "EQUIPO Etapa 1";
          case 13:
            return "EQUIPO Etapa 2";
          case 14:
            return "EQUIPO Etapa 3";
          case 15:
            return "Plegado Tandem";
          case 16:
            return "Plegado ESC";
          case 17:
            return "Plegado Instructor";
          case 18:
            return "Teoría dual TDM";
          case 19:
            return "Teoria Coaching";
          /*
            case 20:
            return "Licencia COP A";
          */
            case 21:
            return "Teoria coaching a 5k";
          case 22:
            return "Plazas a 10k socio";
          default:
            return "Desconocido";
        }
      };
    }
  },
  methods: {
    getParaca() {
      this.loading = true;
      this.$http.get(`${process.env.VUE_APP_USERS}/${this.id}`)
        .then(response => {
          const paraca = response.data.payload._doc;
          console.log("PARACA paraca.is_coach_q", paraca.is_coach_q)
          this.formData.status = paraca.status ? paraca.status : 0; //chequear q no rompa
          this.formData.is_active = paraca.is_active;
          this.formData.first_name = paraca.first_name ? paraca.first_name : '';
          this.formData.last_name = paraca.last_name ? paraca.last_name : '';
          this.formData.alias = paraca.alias ? paraca.alias : '';
          this.formData.email = paraca.email ? paraca.email : '';
          this.formData.role = paraca.role ? paraca.role : [];
          this.formData.feePaid = paraca.feePaid;
          this.formData.is_student.level = paraca.is_student ? paraca.is_student.level : '';
          this.formData.em_phone = paraca.em_phone ? paraca.em_phone : '';
          this.formData.license_numbers = paraca.license_numbers ? paraca.license_numbers : '';
          this.formData.balance = paraca.balance ? paraca.balance : 0; //chequear q 0 no rompad
          this.formData.is_coach_q = paraca.is_coach_q ? paraca.is_coach_q : {}; //chequear q 0 no rompa nada
          this.titleFN = paraca.first_name.charAt(0).toUpperCase() + paraca.first_name.slice(1);
          this.titleLN = paraca.last_name.charAt(0).toUpperCase() + paraca.last_name.slice(1);
          this.formData.exp_cma = paraca.exp_cma ? new Date(paraca.exp_cma) : null;

          this.loading = false
            
        })
        .catch(error => {
          console.log(error);
          this.loading = false
        });
    },
    formatDateForDatePicker(date) {
      return date ? this.$moment(date).format('YYYY-MM-DD') : null;
    },
    clearData(){
      this.formData.role = []
      this.formData.is_instructor = false
      this.formData.is_packer = false
    },
    getStatusText(statusValue) {
      const selectedOption = this.statusOptions.find(option => option.value === statusValue);
      return selectedOption ? selectedOption.text : '';
    },
    addLicenseNumber() {
      this.formData.license_numbers.push({ lic_num: '' });
      console.log("this.formData.license_numbersÑ", this.formData.license_numbers)
    },
    removeLicenseNumber(index) {
      this.formData.license_numbers.splice(index, 1);
    },
    getLicenseNumbers() {
      return this.formData.cma_data.license_numbers.map(item => item.lic_num);
    },
    contunueTo2(){
      if(this.formData.first_name === null ||
        this.formData.last_name === null ||
        this.formData.alias === null ||
        this.formData.first_name === '' ||
        this.formData.last_name === '' ||
        this.formData.alias === ''){
          this.errorMessage = 'Debe completar todos los datos'
          this.step = 1      
        } else {
          if (this.formData.role.includes(3)) {
            this.formData.is_instructor = true;
          }

          if (this.formData.role.includes(6)) {
            this.formData.is_packer = true;
          }
          console.log("contunueToTw2")
          this.step = 2
        }
    },
    contunueTo3(){
      if(this.formData.exp_cma === null && this.formData.lic_num){
        this.errorMessage = 'Debe completar todos los datos'
        this.step = 2      
      } else {
        console.log("contunueTo3")
        this.step = 3
      }
    },
    handleChangeDate(date){
      console.log("date q recibo en habdleCangedate", date)
      this.formData.exp_cma = date
      console.log("formData.exp_cma", this.formData.exp_cma)
    },
    submitForm(){
      console.log("beer_bal", this.formData.beer_bal)
      const currentMonthYear = moment().format('MMMM YYYY');
      this.loading = true;
      let newUser = {
        status: this.formData.status,
        is_active: this.formData.is_active ? this.formData.is_active : false,
        role: this.formData.role,
        feePaid: [
          { month: currentMonthYear, paid: false },
        ],
        /*
        is_student: {
          level: this.formData.is_student ? this.formData.is_student.level : undefined
        },
        */
        first_name: this.formData.first_name,
        last_name: this.formData.last_name,
        alias: this.formData.alias,
        email: this.formData.email,
        //dni: this.formData.dni,
        beer_bal: !this.id && this.formData.beer_bal === true ? 1 : 0,
        b_transactions: !this.id && this.formData.beer_bal === true ? [
          {
            amount: 2,
            description: `Paracaidismo Chascomús & BarrySystem te dan la bienvenida a la base de datos de nuestro querido club. Debes una cerveza.`
          }
        ] : null,
        license_numbers: [{ lic_num: '' }],
      }
      if (this.formData.exp_cma !== null && this.formData.exp_cma !== '') {
        newUser.exp_cma = this.formData.exp_cma;
      }

      if (this.formData.em_phone !== null && this.formData.em_phone !== '') {
        newUser.em_phone = this.formData.em_phone;
      }

      if (this.formData.is_instructor === true) {
        newUser.is_instructor = true;
      }

      if (this.formData.is_instructor === true) {
        newUser.pilot = true;
      }

      if (this.formData.is_packer === true) {
        newUser.is_packer = true;
      }

      if(!this.formData.role.includes(7)){
        newUser.pilot = {
          bal_h: 0
        }
      }

      if (this.formData.is_student && this.formData.is_student.level !== null) {
        console.log("this.formData.is_student:", this.formData.is_student)
        newUser.is_student = {
          level: this.formData.is_student.level
        }
      }

      if(this.formData.role.includes(5)){
        newUser.is_coach_q = this.formData.is_coach_q
      }

      //const url = this.id ? `http://localhost:8082/api/users/${this.id}` : `http://localhost:8082/api/users/`;
      const url = this.id ? `${process.env.VUE_APP_USERS}/${this.id}` : `${process.env.VUE_APP_USERS}`;
      const method = this.id ? 'PUT' : 'POST';

      console.log("data a enviar NUEVO USUARIO:", newUser)

      this.$http({ method: method, url: url, data: newUser })
        .then(response => {
          if (response.status === 200) {
            console.log("status es 200")
            console.log("this.id", this.id)
            if(response.data.payload){
              console.log("entra en put")
              this.loading = false;
              this.clear()
              eventBus.$emit('toast', { show: true, text: "Usuario actualizado correctamente", color: "green" })
              this.$router.push({ name: 'flyersList' });
            } else if(response.data.user){
              console.log("hay response.data.user")
              console.log("entra en POST")
              let id = response.data.user._id
              console.log("id", id)
              console.log("response.data", response.data.user)
              console.log(response.status, "response.status")
              this.loading = false;
              eventBus.$emit('toast', { show: true, text: "Usuario registrado correctamente", color: "green" })
              this.clear()
              this.$router.push({ name: 'totalFlyer', params: { id: id } });

            }
            //this.step = 1;
          }
        })
        .catch((error) => {
          console.log("ERROR:", error);
          if (error.response.status === 400 && error.response.data.error === "El correo electrónico ya se encuentra registrado") {
            // El correo electrónico ya existe, muestra una notificación de error.
            eventBus.$emit('toast', { show: true, text: "El correo electrónico ya se encuentra registrado", color: "red" });
          } else {
            // Otro tipo de error, muestra un mensaje de error genérico.
            this.error = "Hubo un error al procesar la solicitud.";
          }
          this.loading = false;
          this.step = 1;
        })
    },
    /*
    openPayNewPartner(){
      this.modalMode = 'paymentNewPartner';
      this.description = null;

      this.paymentNewPartnerData = {
        title: `Alta de Socio`,
        description: `Alta de socio ${this.price10Slot + this.cuota}. Slot a 10.000 ($${this.price10Slot} USD) + cuota ($${this.cuota} USD - pasar a ARG)`,
      };
      this.showConfirmationModal = true;
    },
    */
    updatePayNewPartner(){
      console.log("guarda nuevo socio ok")
    },
    closeConfirmationModal(){
      this.paymentNewStudentData = {
        title: null,
        description: null,
      }
      this.paymentNewPartnerData = {
        title: null,
        description: null,        
      }
      this.showConfirmationModal = false
    },
    clear () {
        this.$refs.form.reset()
        this.errorMessage = null
    },
    deleteParaca(){
      this.$http.delete(`${process.env.VUE_APP_USERS}/${this.id}`)
        .then(response => {
          if(response.status === 200){
            this.showDialog = false
            eventBus.$emit('toast', { show: true, text: "Usuario eliminado", color: "green" });
            this.$router.push({ name: 'flyersList' });
          }
          this.loading = false
        })
        .catch(error => {
          console.log(error);
          this.loading = false
        });
    }
  }
}
</script>