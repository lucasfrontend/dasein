<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="pb-4">
        <h1 v-if="id && formData.number_tanda" class="custom-font pink--text" style="font-size: 2rem;">Tanda {{ formData.number_tanda }}</h1>
        <h1 v-else-if="id" class="custom-font pink--text" style="font-size: 2rem;">{{ formData.number_tanda || 'S/N' }}</h1>
        <h2 v-else class="custom-font pink--text" style="font-size: 2rem;">Nueva Tanda</h2>
        <v-spacer></v-spacer>
        <delete-button
          v-if="showDeleteButton && id"
          :show="true"
          :iconColor="'black'"
          @click="showDialog = true"
          :showDeleteButton="showDeleteButton"
        />
      </v-card-title>
      <v-card-text dense>
        <v-form @submit.prevent="submitForm">
            <v-row>
              <!-- Columna 1 -->
              <v-col cols="12" sm="6" md="3" class="d-flex">
                <v-text-field 
                  v-model="formData.number_tanda" 
                  type="number" 
                  label="Num" 
                  required 
                  outlined 
                  dense 
                  prepend-inner-icon="mdi-numeric"
                ></v-text-field>
              </v-col>

              <!-- Columna 2 -->
              <v-col cols="12" sm="6" md="3" class="d-flex">
                <v-select
                  v-model="formData.altitude"
                  label="Altura"
                  outlined
                  dense
                  :items="formData.istandem1 || formData.istandem2 ? altitudesOptionsTdms : altitudesOptions"
                  :value="formData.altitude"
                  return-object
                ></v-select>
              </v-col>

              <!-- Columna 3 -->
              <v-col cols="12" sm="6" md="3" class="d-flex">
                <v-text-field
                  v-model="formData.time"
                  label="Hora"
                  outlined
                  dense
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  :rules="timeValidationRules"
                ></v-text-field>
                <!--
                <v-icon @click="openTimePickerDialog">mdi-clock-time-four-outline</v-icon>
                -->
              </v-col>

              <!-- Columna 4 -->
              <v-col cols="12" sm="6" md="3" class="d-flex">
                <v-btn-toggle
                  v-model="formData.status"
                  dense
                  active-class
                  color="green"
                >
                <v-btn :value="1">
                  <v-icon :class="{ 'mdi-airplane-off': formData.status === 1 }">mdi-airplane-off</v-icon>
                </v-btn>

                <v-btn :value="2">
                  <v-icon :class="{ 'mdi-airplane-takeoff': formData.status === 2 }">mdi-airplane-takeoff</v-icon>
                </v-btn>

                <v-btn :value="3">
                  <v-icon :class="{ 'mdi-airplane-landing': formData.status === 3 }">mdi-airplane-landing</v-icon>
                </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row> 
          
          <v-row>
            <v-col cols="12" class="d-flex pa-0">
              <v-col cols="6" class="d-flex">
                <v-select
                  v-model="formData.pilot"
                  label="Piloto"
                  outlined
                  dense
                  :items="pilotOptions"
                  :item-text="'name'"
                  return-object
                ></v-select>
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-select
                  v-model="formData.plane"
                  label="Avion"
                  outlined
                  dense
                  :items="planesOptions"
                  :item-text="'name'"
                  return-object
                ></v-select>
              </v-col>
            </v-col>
          </v-row>
                              <!--
                opcion de botones para escuela
                                  <v-chip-group
                    v-model="student"
                    column
                  >
                    <v-chip
                      filter
                      outlined
                    >
                      Solo
                    </v-chip>
                    <v-chip
                      filter
                      outlined
                    >
                    Asistido Doble
                    </v-chip>
                    <v-chip
                      filter
                      outlined
                    >
                      Solo Coucheado
                    </v-chip>
                  </v-chip-group>
              -->
          <v-divider></v-divider>

          <template>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="3" xl="1" class="d-flex">
                <v-checkbox 
                  v-model="formData.istandem1" 
                  label="TDM 1" 
                  @change="updateOptions1"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3" xl="1" class="d-flex">
                <v-btn-toggle
                  v-if="formData.istandem1"
                  v-model="formData.selectedOption1"
                  dense
                  active-class
                  class="pt-0 pt-sm-4 pt-md-4 pt-lg-4"
                  color="green"
                  mandatory
                  style="pointer-events: auto;"
                >
                  <v-btn 
                    v-for="(option, index) in radioOptions" 
                    :key="index" 
                    :value="option.value"
                    @change="handleOptionsTdm1(option.value)" 
                    :class="{ 'yellow-tdm': option.value !== 5, 'blue-school': option.value === 5 }"
                  >
                    <v-icon>{{ option.icon }}</v-icon>
                    <v-icon v-if="option.value === 3" class="pl-4">{{ option.icon }}</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3" xl="1" class="d-flex" v-if="formData.selectedOption1 === null || formData.selectedOption1 === 1 || formData.selectedOption1 === 4 || formData.selectedOption1 === 5">
                <v-checkbox 
                  v-model="formData.istandem2" 
                  label="TDM 2" 
                  @change="updateOptions2"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3" xl="1" class="d-flex" v-if="formData.istandem2">
                <v-btn-toggle
                  v-if="formData.istandem2"
                  v-model="formData.selectedOption2"
                  dense
                  active-class
                  class="pt-0 pt-sm-4 pt-md-4 pt-lg-4 pb-6 pb-sm-0 pb-md-0 pb-lg-0"
                  color="green"
                  mandatory
                  style="pointer-events: auto;"
                >
                  <v-btn 
                    v-for="(option, index) in radioOptions2" 
                    :key="index" 
                    :value="option.value"
                  >
                  <v-icon>{{ option.icon }}</v-icon>
                  </v-btn>
                </v-btn-toggle>
              <!--
                <template>
                  <v-container
                    class="px-0"
                    fluid
                  >
                    <v-radio-group 
                      v-model="formData.selectedOption2"
                    >
                      <v-radio 
                        v-for="(option, index) in radioOptions2" 
                        :key="index" 
                        :label="option.label" 
                        :value="option.value"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>
                </template>
                -->
              </v-col>
            </v-row>
          </template>
         
          <v-divider></v-divider>

          <template>
            <v-row>
              <v-col cols="12" sm="6" md="3" class="d-flex">
                <v-checkbox
                  v-model="asistidoDoble"
                  label="Asistido Doble"
                  @change="handleIs2"
                ></v-checkbox>

              </v-col>
              <v-col cols="12" sm="6" md="3" class="d-flex">
                <v-checkbox
                  v-model="asistidoSimple"
                  label="Asistido Simple"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="3" class="d-flex">
                
              </v-col>
              <v-col cols="12" sm="6" md="3" class="d-flex pt-0 pt-sm-6 pt-md-6 pt-lg-6 pb-6">
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="cleanSlots" class="mr-2" v-bind="attrs" v-on="on">
                      <v-icon>mdi-account-remove</v-icon>
                    </v-btn>
                  </template>
                  <span>Borrar paracaidistas</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="cleanForm" v-bind="attrs" v-on="on">
                      <v-icon>mdi-broom</v-icon>
                    </v-btn>
                  </template>
                  <span>Borrar todo</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </template>

          <template>
            <v-expansion-panels>
              <!-- SLOT I -->
              <v-expansion-panel>
                <v-expansion-panel-header
                :class="{
                  tdmColor: formData.istandem1 || formData.istandem1 && formData.selectedOption1 !== 5,
                  iscoachStyles: !formData.istandem1 && formData.is_coach_a,
                  studentStyles: asistidoDoble || asistidoSimple || formData.istandem1 && formData.selectedOption1 === 5
                }"
                >
                <template v-slot:actions>
                  <v-icon color="primary">
                    $expand
                  </v-icon>
                </template>
                  <template v-slot:default="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4">
                        Slot I 
                      </v-col>
                      <v-col
                        cols="8"
                        class="text--secondary"
                      >
                        <v-fade-transition leave-absolute>
                          <div 
                            v-if="open"
                            key="0"
                          >
                            <span v-if="formData.istandem1">Plaza INSTRUCTOR</span>
                            <div v-else> 
                              <div v-if="formData.slot1 && formData.slot1.balance">
                                <v-chip color="gray" text-color="black">
                                  <span class="green--text pr-1">$</span> {{ formData.slot1.balance }}
                                </v-chip>
                              </div>
                            </div>
                          </div>
                          <div                             
                            v-else
                            key="1"
                            class="d-flex justify-space-between"
                          >
                            <div v-if="formData.slot1 && formData.slot1.name">
                              <v-chip
                                class="ma-0"
                                color="primary"
                                label
                                text-color="white"
                              >
                              <!--
                                <v-icon left>
                                  mdi-label
                                </v-icon>
                                -->
                                {{ formData.slot1.name }}
                              </v-chip>
                            </div>
                            <div class="mr-8" v-if="formData.equipment1">
                              <v-chip
                                class="ma-0"
                                color="primary"
                                label
                                text-color="white"
                              >
                                <!--
                                <v-icon left>
                                  mdi-label
                                </v-icon>
                                -->
                                {{ formData.equipment1.name_parachute }}
                              </v-chip>
                            </div>
                          </div>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="6" class="px-3">
                      <v-autocomplete
                        v-model="formData.slot1"
                        :items="asistidoSimple || asistidoDoble ? affInstructorsOptions : (formData.is_coach_a ? coachOptions : (formData.istandem1 ? instructorsOptions : flyersOptions))"
                        item-text="name"
                        item-value="id"
                        :label="formData.istandem1 ? 'Instructor' : 'Slot 1'"
                        outlined
                        dense
                        prepend-inner-icon="mdi-magnify"
                        class="mt-4"
                        filled
                        return-object
                        >
                        <!-- A VER Q ONDA SI LA QUITO @click="handleSelectChange" -->
                      </v-autocomplete>
                      <v-checkbox
                        v-if="!formData.istandem1 && !asistidoSimple && asistidoDoble === false"
                        v-model="formData.free1"
                        label="Slot Free"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                      slot1____ {{ formData.slot1 }}
                    </v-col>
                    
                    <v-col cols="12" md="6" class="px-3">
                      <v-select
                        v-model="formData.equipment1"
                        label="Equipos"
                        outlined
                        dense
                        class="mt-4"
                        :items="getEquipmentOptions(formData.istandem1)"
                        :item-text="'name_parachute'"
                        return-object
                      ></v-select>
                      formData.equipment1{{  formData.equipment1 }}
                      <v-checkbox
                        v-if="!formData.istandem1 && !asistidoSimple && asistidoDoble === false"
                        v-model="formData.is_coach_a"
                        label="Coach 1"
                        color="red"
                        class="ma-0"
                        @click="cleanCoachA"
                      ></v-checkbox>
                      <v-checkbox
                        v-if="!formData.istandem1 && !asistidoSimple && asistidoDoble === false"
                        v-model="formData.equipFree1"
                        label="Equipo Free unoooo"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" md="6" class="px-3" v-if="formData.slot1 && formData.slot1.role && formData.slot1.role.includes(8)">
                      <v-chip color="blue" text-color="white">Etapa: {{ formData.slot1.is_student.level }}</v-chip>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <!-- SLOT II -->
              <v-expansion-panel>
                <v-expansion-panel-header 
                  :class="{
                  tdmColor: formData.istandem1 || formData.istandem1 && formData.selectedOption1 !== 5,
                  iscoachStyles: formData.is_coachee_1_a,
                  studentStyles: asistidoDoble || asistidoSimple || formData.istandem1 && formData.selectedOption1 === 5
                }"
                >
                <template v-slot:actions>
                  <v-icon color="primary">
                    $expand
                  </v-icon>
                </template>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="4">
                      Slot II
                    </v-col>
                    <v-col
                      cols="8"
                      class="text--secondary"
                    >
                      <v-fade-transition leave-absolute>
                        <div 
                          v-if="open"
                          key="0"
                        >
                          <div v-if="formData.istandem1">
                            <span v-if="formData.selectedOption1 === 5">Plaza Alumno en Etapa I</span>
                            <span v-else>Plaza Pasajero</span>
                          </div>
                          <span v-else> 
                            <div v-if="formData.slot2 && formData.slot2.balance">
                              <v-chip color="gray" text-color="black">
                                <span class="green--text pr-1">$</span> {{ formData.slot2.balance }}
                              </v-chip>
                            </div>                            
                          </span>
                        </div>
                        <div                             
                          v-else
                          key="1"
                          class="d-flex justify-space-between"
                        >
                          <div v-if="formData.slot2 && formData.slot2.name">
                            <v-chip
                              class="ma-0"
                              color="primary"
                              label
                              text-color="white"
                              >
                              <!-- color para chip segun alumno e icono 
                                
                                :color="formData.slot2.is_student.level === 1 || formData.slot2.is_student.level === 2 || formData.slot2.is_student.level === 3 ? 'blue' : 'primary'"
                              <v-icon v-if="formData.slot2.is_student.level === 2" color="blue">mdi-numeric-2</v-icon>
                            -->
                            {{ formData.slot2.name }}
                          </v-chip>
                          </div>
                          <div class="mr-8" v-if="formData.istandem1 && formData.pasajero1">
                            <v-chip
                              class="ma-0"
                              color="primary"
                              label
                              text-color="white"
                            >
                            <!--
                              <v-icon left>
                                mdi-label
                              </v-icon>
                              -->
                              {{ formData.pasajero1.name }}
                            </v-chip>
                          </div>
                          <div class="mr-8" v-if="!formData.istandem1 && formData.equipment2">
                            <v-chip
                              class="ma-0"
                              color="primary"
                              label
                              text-color="white"
                            >
                            <!--
                              <v-icon left>
                                mdi-label
                              </v-icon>
                              -->
                              {{ formData.equipment2.name_parachute }}
                            </v-chip>
                          </div>
                        </div>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="6" class="px-3">
                      PASAJERO 1 DESDE FORMDATA {{ formData.pasajero1 }}

                      <v-autocomplete
                        v-if="!formData.istandem1 || formData.selectedOption1 === 5"
                        v-model="formData.slot2"
                        :items="asistidoSimple || asistidoDoble || formData.selectedOption1 === 5 ? studentsOptions : flyersOptions"
                        item-text="name"
                        item-value="id"
                        label="Slot 2"
                        outlined
                        dense
                        prepend-inner-icon="mdi-magnify"
                        class="mt-4"
                        filled
                        return-object
                      ></v-autocomplete>
                      formData.slot22222222222222 {{ formData.slot2 }} 
                      formData.pasajero1 {{ formData.pasajero1 }} 

                      <v-select
                        v-if="formData.istandem1 && formData.selectedOption1 !== 5"
                        label="Pasajero"
                        v-model="formData.pasajero1"
                        :items="newPassengers"
                        item-text="name"  
                        item-value="id"
                        outlined
                        dense
                        class="input-border pt-4"
                        prepend-inner-icon="mdi-account"
                        return-object
                      ></v-select>
                      <v-checkbox
                        v-if="!formData.istandem1"
                        v-model="formData.free2"
                        label="Slot Free"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                                           
                      <!--
                      formData.pasajero1: {{ formData.pasajero1}}
                      formData.selectedOption1: {{ formData.selectedOption1 }}
                      formData.istandem1... {{ formData.istandem1 }}
                      -->
                    </v-col>
  
                    <v-col cols="12" md="6" class="px-3">
                      <v-select
                        v-if="!formData.istandem1"
                        v-model="formData.equipment2"
                        label="Equipos"
                        outlined
                        dense
                        class="mt-4"
                        :items="getEquipmentOptions(formData.istandem1)"
                        :item-text="'name_parachute'"
                        return-object
                      ></v-select>
                      <v-checkbox
                        v-if="formData.is_coach_a"
                        v-model="formData.is_coachee_1_a"
                        label="coacheado por primer Coach"
                        color="red"
                        :value="true"
                        class="ma-0"
                      ></v-checkbox>
                      <v-checkbox
                        v-if="!formData.istandem1"
                        v-model="formData.equipFree2"
                        label="Equipo Free"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" md="6" class="px-3" v-if="formData.slot2 && formData.slot2.role && formData.slot2.role.includes(8)">
                      <v-chip color="blue" text-color="white">Etapa: {{ formData.slot2.is_student.level }}</v-chip>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <!-- SLOT III -->
              <v-expansion-panel>
                <!-- SI ES Con CAM SLOT 3 v-if="selectedOption1 === 2 || selectedOption1 === 3"-->
                <v-expansion-panel-header
                :class="{
                  tdmColor: formData.istandem2 || formData.selectedOption1 === 2 || formData.selectedOption1 === 3,
                  iscoachStyles2: !formData.istandem2 && formData.is_coach_b,
                  iscoachStyles: !formData.istandem2 && formData.is_coach_b || !formData.istandem2 && formData.is_coachee_2_a,
                  studentStyles: asistidoDoble || formData.istandem2 && formData.selectedOption2 === 5,
                }"
                >
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                  <template v-slot:default="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4">
                        Slot III <v-icon size="22" color="gray" class="pl-2" v-if="formData.istandem1 && formData.selectedOption1 === 2 ||formData.istandem1 && formData.selectedOption1 === 3">mdi-camera-gopro</v-icon>
                      </v-col>
                      <v-col
                        cols="8"
                        class="text--secondary"
                      >
                        <v-fade-transition leave-absolute>
                          <div 
                            v-if="open"
                            key="0"
                          >
                            <span v-if="formData.istandem2">Plaza INSTRUCTOR</span>
                            <span v-else-if="formData.istandem1 && formData.selectedOption1 === 2 ||formData.istandem1 && formData.selectedOption1 === 3">Plaza Cam</span>
                            <span v-else> 
                              <div v-if="formData.slot3 && formData.slot3.balance">
                                <v-chip color="gray" text-color="black">
                                  <span class="green--text pr-1">$</span> {{ formData.slot3.balance }}
                                </v-chip>
                              </div>
                            </span>                         
                          </div>
                          <div                             
                            v-else
                            key="1"
                            class="d-flex justify-space-between"
                          >
                            <div v-if="formData.slot3 && formData.slot3.name">
                              <v-chip
                                class="ma-0"
                                color="primary"
                                label
                                text-color="white"
                              >
                              <!--
                                <v-icon left>
                                  mdi-label
                                </v-icon>
                                -->
                                {{ formData.slot3.name }}
                              </v-chip>
                            </div>
                            <div class="mr-8" v-if="formData.equipment3">
                              <v-chip
                                class="ma-0"
                                color="primary"
                                label
                                text-color="white"
                              >
                              <!--
                                <v-icon left>
                                  mdi-label
                                </v-icon>
                                -->
                                {{ formData.equipment3.name_parachute }}
                              </v-chip>
                            </div>
                          </div>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="6" class="px-3">
                      <v-autocomplete
                        v-model="formData.slot3"
                        :items="asistidoDoble ? affInstructorsOptions : (formData.is_coach_b ? coachOptions : (formData.istandem2 ? instructorsOptions : flyersOptions))"
                        item-text="name"
                        item-value="id"
                        :label="formData.istandem2 ? 'Instructor' : 'Slot 3'"
                        outlined
                        dense
                        prepend-inner-icon="mdi-magnify"
                        class="mt-4"
                        filled
                        return-object
                      ></v-autocomplete>
                      <v-checkbox
                        v-model="formData.free3"
                        label="Slot Free"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                      formData.slot3: {{ formData.slot3 }}

                    </v-col>
  
                    <v-col cols="12" md="6" class="px-3">
                      <v-select
                        v-model="formData.equipment3"
                        label="Equipos"
                        outlined
                        dense
                        class="mt-4"
                        :items="getEquipmentOptions(formData.istandem2)"
                        :item-text="'name_parachute'"
                        return-object
                      ></v-select>
                      <v-checkbox
                        v-if="formData.is_coach_a && !formData.istandem2"
                        v-model="formData.is_coachee_2_a"
                        label="coacheado por 1"
                        color="red"
                        class="ma-0"
                        ></v-checkbox>
                        <v-checkbox
                          v-if="!formData.istandem2"
                          v-model="formData.equipFree3"
                          label="Equipo Free 3"
                          color="red"
                          class="ma-0"
                        ></v-checkbox>
                        <!--
                        @click="handleSwitchClick"
                      -->
                      <v-checkbox
                        v-if="!formData.istandem2"
                        v-model="formData.is_coach_b"
                        label="Coach 2"
                        color="red"
                        class="ma-0"
                        @click="cleanCoachB"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" md="6" class="px-3" v-if="formData.slot3 && formData.slot3.role && formData.slot3.role.includes(8)">
                      <v-chip color="blue" text-color="white">Etapa: {{ formData.slot3.is_student.level }}</v-chip>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <!-- SLOT IV-->
              <v-expansion-panel>
                <!-- Si es .... v-if="selectedOption1 === 3" -->
                <v-expansion-panel-header
                :class="{
                  tdmColor: formData.istandem2 || formData.selectedOption1 === 3,
                  iscoachStyles: !formData.istandem2 && formData.is_coachee_3_a,
                  iscoachStyles2: !formData.istandem2 && formData.is_coachee_1_b,
                  studentStyles: formData.istandem2 && formData.selectedOption2 === 5,
                }"
                >
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                  <template v-slot:default="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4" >
                        Slot IV <v-icon size="22" color="gray" class="pl-1" v-if="formData.istandem1 && formData.selectedOption1 === 3">mdi-camera-gopro</v-icon>
                      </v-col>
                      <v-col
                        cols="8"
                        class="text--secondary"
                      >
                        <v-fade-transition leave-absolute>
                          <div 
                            v-if="open"
                            key="0"
                          >
                            <div v-if="formData.istandem2">
                              <span v-if="formData.selectedOption2 === 5">Plaza Alumno en Etapa I</span>
                              <span v-else>Plaza Pasajero</span>
                            </div>
                            <span v-else-if="formData.istandem1 && formData.selectedOption1 === 3">Plaza Cam</span>
                            <span v-else> <div v-if="formData.slot4 && formData.slot4.balance">
                              <v-chip color="gray" text-color="black">
                                <span class="green--text pr-1">$</span> {{ formData.slot4.balance }}
                              </v-chip>
                            </div></span>  
                          </div>
                          <div                             
                            v-else
                            key="1"
                            class="d-flex justify-space-between"
                          >
                            <div v-if="formData.slot4 && formData.slot4.name">
                              <v-chip
                                class="ma-0"
                                color="primary"
                                label
                                text-color="white"
                              >
                              <!--
                                <v-icon left>
                                  mdi-label
                                </v-icon>
                                -->
                                {{ formData.slot4.name }}
                              </v-chip>
                            </div>
                            <div class="mr-8" v-if="formData.istandem2 && formData.pasajero2">
                            <v-chip
                              class="ma-0"
                              color="primary"
                              label
                              text-color="white"
                            >
                            <!--
                              <v-icon left>
                                mdi-label
                              </v-icon>
                              -->
                              {{ formData.pasajero2.name }}
                            </v-chip>
                          </div>
                            
                          <div v-if="formData.pasajero2">{{ getAliasById(formData.pasajero2) }}</div>


                            <div class="mr-8" v-if="!formData.istandem2 && formData.equipment4">
                              <v-chip
                              class="ma-0"
                              color="primary"
                              label
                              text-color="white"
                            >
                            <!--
                              <v-icon left>
                                mdi-label
                              </v-icon>
                              -->
                              {{ formData.equipment4.name_parachute }}
                            </v-chip>
                            </div>
                          </div>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="6" class="px-3">
                      <v-autocomplete
                        v-if="!formData.istandem2 || formData.selectedOption2 === 5"
                        v-model="formData.slot4"
                        :items="formData.selectedOption2 === 5 ? studentsOptions : flyersOptions"
                        item-text="name"
                        item-value="id"
                        label="Slot 2"
                        outlined
                        dense
                        prepend-inner-icon="mdi-magnify"
                        class="mt-4"
                        filled
                        return-object
                      ></v-autocomplete>

                      slot 4 {{ formData.slot4 }}
                      formData.pasajero2: {{ formData.pasajero2}}
                      <v-select
                        v-if="formData.istandem2 && formData.selectedOption2 !== 5"
                        label="Pasajero"
                        v-model="formData.pasajero2"
                        :items="newPassengers"
                        item-text="name"  
                        item-value="id"
                        outlined
                        dense
                        class="input-border pt-4"
                        prepend-inner-icon="mdi-account"
                        return-object
                      ></v-select>
                      <v-checkbox
                      v-if="!formData.istandem2"
                        v-model="formData.free4"
                        label="Slot Free"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" md="6" class="px-3">
                      <v-select
                        v-if="!formData.istandem2"
                        v-model="formData.equipment4"
                        label="Equipos"
                        outlined
                        dense
                        class="mt-4"
                        :items="getEquipmentOptions(formData.istandem2)"
                        :item-text="'name_parachute'"
                        return-object
                      ></v-select>
                      <v-checkbox
                        v-if="formData.is_coach_a && !formData.is_coach_b && !formData.istandem2"
                        v-model="formData.is_coachee_3_a"
                        label="coacheado TRES"
                        color="red"
                        class="ma-0"
                      ></v-checkbox>
                      <v-checkbox
                        v-if="formData.is_coach_b"
                        v-model="formData.is_coachee_1_b"
                        label="coacheado por segundo Coach"
                        color="red"
                        class="ma-0"
                        ></v-checkbox>

                        <v-checkbox
                        v-if="!formData.istandem2"
                          v-model="formData.equipFree4"
                          label="Equipo Free"
                          color="red"
                          class="ma-0"
                        ></v-checkbox>
                      <!--
                        @click="handleSlot4Click"
                      -->
                    </v-col>
                  </v-row>

                  <v-col cols="12" md="6" class="px-3" v-if="formData.slot4 && formData.slot4.role && formData.slot4.role.includes(8)">
                    <v-chip color="blue" text-color="white">Etapa: {{ formData.slot4.is_student.level }}</v-chip>
                  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
  
          <BarriAlert :errorMessage="errorMessage"/>

          <div class="pt-4">
            <v-btn type="submit" color="black" :loading="loading" dark block>
              <span class="yellow--text">{{ submitButtonTitle }}</span>
            </v-btn>
  
            <v-btn color="red" class="mt-2" dark block @click="goBack">
              <span class="yellow--text">Cancelar</span>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <BarriConfirmationDialog
      :showBarriConfirm="showDialog"
      :titleBarriModal="`¿Está seguro de que desea eliminar la tanda ${this.formData.number_tanda}?`"
      :showDeleteIcon="true"
      @save="deleteTanda"
      @close="closeConfirmationModal"
    ></BarriConfirmationDialog>

    <time-picker-dialog
      v-model="pickerOpen"
      :selectedTime="formData.time"
      @input="updateTime"
    ></time-picker-dialog>
  </v-container>
</template>

<script>
  import eventBus from '../../event-bus'
  import DeleteButton from '../app/DeleteButton.vue';
  import TimePickerDialog from "../app/TimePickerDialog.vue";
  import BarriAlert from '../app/BarriAlert.vue';
  import BarriConfirmationDialog from "../app/BarriConfirmationDialog.vue";
  import { getData } from '../../utils/gets';
  //import moment from 'moment-timezone';
  export default {
    components: {
      DeleteButton,
      BarriAlert,
      TimePickerDialog,
      BarriConfirmationDialog
    },
    name: 'tandasForm',
    data() {
      return {
        radioOptions: [
          { label: "HC", value: 1, icon: "mdi-thumb-up"},
          { label: "Cam", value: 2, icon: "mdi-camera-gopro"},
          { label: "VIP", value: 3, icon: "mdi-camera-gopro"},
          //{ label: "Low Cost", value: 4 },
          { label: "ESC etapa 1", value: 5, icon: "mdi-school" }
          // agrego opcion 5
        ],
        radioOptionsStudents: [
          { label: "Handy Cam", value: 1 },
        ],
        radioOptions2: [
          { label: "Handy Cam", value: 1, icon: "mdi-thumb-up" },
          { label: "ESC etapa 1", value: 5, icon: "mdi-school" }
        ],
        id: null,
        showDeleteButton: false,
        errorMessage: null,
        search: "",
        loading: false,
        showDialog: false,
        pickerOpen: false,
        submitButtonTitle: '',
        form: '',
        dolarBlue: null, 
        formData: {
          number_tanda: null,
          type_coach: null,
          selectedOption1: null,
          selectedOption2: null,
          is_coach_a: false,
          is_coachee_1_a: false,
          is_coachee_2_a: false,
          is_coachee_3_a: false,
          is_coach_b: false,
          is_coachee_1_b: false,
          tandemOptions: {
            is_ext: false,
            t_status: null,
            //is_ext2: false,
            t_status2: null,            
          },
          slot1: {},
          equipment1: {},
          istandem1: false,
          handyCam: false,
          conCamarografo: false,
          vip: false,
          lowCost: false,
          pasajero1: {
            id: null,
            name: '',
            is_ext: null, // Agrega is_ext aquí
            chargedType: null,
            payerId: null
          },
          free1: false,
          equipFree1: false,
          
          slot2: {},
          equipment2: {},
          free2: false,
          equipFree2: false,

          slot3: {},
          equipment3: {},
          istandem2: false,
          pasajero2: {
            id: null,
            name: '',
            is_ext: null, // Agrega is_ext aquí
            chargedType: null,
            payerId: null
          },
          handyCam2: false,
          conCamarografo2: false,
          lowCost2: false,
          free3: false,
          equipFree3: false,

          slot4: {},
          equipment4: {},
          free4: false,
          equipFree4: false,

          time: null,
          pilot: {},
          plane: null,
          altitude: {},
          status: null
        },
        passengers: [],
        newPassengers: [],
        flyersOptions: [], 
        studentsOptions: [],
        equipmentTandemsOptions: [],
        equipmentRentOptions: [],
        instructorsOptions: [],
        affInstructorsOptions: [],
        coachOptions: [],
        pilotOptions: [],
        planesOptions: [],
        altitudesOptions: [
          { text: '5.000', value: 1 },
          { text: '8.000', value: 2 },
          { text: '10.000', value: 3 },
          { text: '12.000', value: 4 }
          // 1 es a 5000 ft en ARG
          // 2 es a 8000 ft en ARG
          // 3 es a 10000 ft en ARG
          // 4  es a 12000 ft en ARG
        ],
        altitudesOptionsTdms: [
          { text: '8.000', value: 2 },
          { text: '10.000', value: 3 },
          { text: '12.000', value: 4 }
          // 1 es a 5000 ft en ARG
          // 2 es a 8000 ft en ARG
          // 3 es a 10000 ft en ARG
          // 4  es a 12000 ft en ARG
        ],
        statusOptions: [
          { text: 'En tierra', value: 1 },
          { text: 'Ascenso', value: 2 },
          { text: 'Finalizado', value: 3 }
        ],
        open: false,
  
        asistidoSimple: false,
        asistidoDoble: false
      };
    },

    mounted() {
      this.dolarBlue = this.$store.state.dolarBlue;
      this.id = this.$route.params.id;
      this.initializeData();
    },
    computed: {
      tStatusValue() {
        if (this.formData.handyCam) {
          return 1; // Valor correspondiente a Handy Cam en el modelo
        } else if (this.formData.conCamarografo) {
          return 2; // Valor correspondiente a Con camarógrafo en el modelo
        } else if (this.formData.vip) {
          return 3; // Valor correspondiente a VIP en el modelo
        } else if (this.formData.lowCost) {
          return 4; // Valor correspondiente a Low Cost en el modelo
        } else {
          return 0; // Valor por defecto si no se selecciona ninguna opción
        }
      },
      tStatusValue2() {
        if (this.formData.handyCam2) {
          return 1; // Valor correspondiente a Handy Cam en el modelo
        } else if (this.formData.conCamarografo2) {
          return 2; // Valor correspondiente a Con camarógrafo en el modelo
        }  else if (this.formData.lowCost2) {
          return 4; // Valor correspondiente a Low Cost en el modelo
        } else {
          return 0; // Valor por defecto si no se selecciona ninguna opción
        }
      },
      timeValidationRules() {
        return [
          (value) => /^\d{1,2}:\d{2}$/.test(value) || 'Formato de hora inválido. Ejemplo válido: 12:34',
        ];
      }
    },
    watch: {
      asistidoSimple: function (newValue) {
        if (newValue) {
          this.asistidoDoble = false;
          this.formData.istandem1 = false;
          this.formData.is_coach_a = false
          this.formData.is_coachee_1_a = false
        }
      },
      asistidoDoble: function (newValue) {
        if (newValue) {
          this.asistidoSimple = false;
          this.formData.istandem1 = false;
          this.formData.istandem2 = false;
          this.formData.is_coach_a = false
          this.formData.is_coachee_1_a = false
        }
      }
    },
    methods: {
      async initializeData() {
        await this.getPassengers();
        this.getOptionsFlyers();
        this.getOptionsInstructors();
        this.getOptionsEquipment();
        this.getOptionsPilots();
        this.getOptionsPlanes();

        const id = this.$route.params.id;
        if (id) {
          await this.getTanda();
          this.showDeleteButton = true;
          this.submitButtonTitle = 'Actualizar Tanda';
        } else {
          this.submitButtonTitle = 'Agregar tanda';
        }
        // También puedes realizar otras operaciones después de cargar los datos
        this.id = id;
      },
      async getTanda() {
        this.loading = true;
        this.$http.get(`${process.env.VUE_APP_TANDAS}/${this.id}`)
          .then(response => {
            const tanda = response.data.payload;
              console.log("SOLT 1, tanda.slots[0].slot", tanda.slots[0].slot)
              console.log("SLOT 2, tanda.slots[1].slot", tanda.slots[1].slot)
              console.log("SLOT 3, tanda.slots[2].slot", tanda.slots[2].slot)
              console.log("SLOT 4, tanda.slots[3].slot", tanda.slots[3].slot)
              this.formData.number_tanda = tanda.number_tanda ? tanda.number_tanda : ''; // correccion 'SIN DATOS', debo borrar el condificonal?
              this.type_coach = tanda.type_coach ? tanda.type_coach : 0 // si no hay es null, esta bien?
              this.formData.altitude = tanda.altitude ? tanda.altitude : null
              //this.formData.altitude = this.altitudesOptions.find(option => option.value === tanda.altitude.value);
              this.formData.time = tanda.time ? tanda.time : null;
              this.formData.pilot = tanda.pilot ? tanda.pilot : null;
              this.formData.plane = tanda.plane ? tanda.plane : null;
              this.asistidoDoble = tanda.is_3 ? tanda.is_3 : false,
              this.asistidoSimple = tanda.is_2 ? tanda.is_2 : false,            
              ///__________________________________________________
              this.formData.istandem1 = tanda.slots[0].slot.is_tandem || tanda.slots[0].slot.is_tandem_al ? true: false;  
              //this.formData.selectedOption1 = tanda.slots[1].slot && tanda.slots[0].slot.tandemOptions ? tanda.slots[0].slot.tandemOptions.t_status : null;
              if (
                tanda.slots[0].slot.is_tandem &&
                tanda.slots[1].slot.tandemOptions.chargedType &&
                [1, 2, 3, 4, 11, 12, 13, 14, 16, 18].includes(tanda.slots[1].slot.tandemOptions.chargedType)
                ) {
                  this.formData.selectedOption1 = 1;
                  // Actualizar opciones de botones si es necesario
                  // this.radioOptions[...] = ...;
              } else if (
                tanda.slots[0].slot.is_tandem &&
                tanda.slots[1].slot.tandemOptions.chargedType &&
                [5, 6, 7, 8, 15, 17].includes(tanda.slots[1].slot.tandemOptions.chargedType)
                ) {
                  this.formData.selectedOption1 = 2;
                  // Actualizar opciones de botones si es necesario
                  // this.radioOptions[...] = ...;
              } else if (
                tanda.slots[0].slot.is_tandem &&
                tanda.slots[1].slot.tandemOptions.chargedType &&
                [9, 10].includes(tanda.slots[1].slot.tandemOptions.chargedType)
                ) {
                  this.formData.selectedOption1 = 3;
                  // Actualizar opciones de botones si es necesario
                  // this.radioOptions[...] = ...;
                }
              else if(tanda.slots[0].slot.is_tandem_al){
                this.formData.selectedOption1 = 5;
              }
              console.log("this.formData.selectedOption1 ESSSSSSSS", this.formData.selectedOption1) 
              //this.formData.radioOptions = tanda.slots[0].slot && tanda.slots[0].slot.tandemOptions ? tanda.slots[0].slot.tandemOptions.t_status : null;
              //SLOT 1
              const slot1 = tanda.slots[0].slot
              this.formData.slot1 = slot1 ? slot1 : null
              //corregir aqui con arreglo de coachs
              this.formData.slot1.id = slot1 && slot1.id_slot ? slot1.id_slot : '' 
              this.formData.slot1.typeStatus = tanda.slots[0].slot && tanda.slots[0].slot.typeStatus ? tanda.slots[0].slot.typeStatus : null 
              this.formData.equipment1 = slot1 ? slot1.equipment : null
              this.formData.free1 = slot1 && slot1.fr ? true : false
              this.formData.equipFree1 = slot1.equipment && slot1.equipment.e_fr ? slot1.equipment.e_fr : false
              //this.formData.equipment1.ow = slot1 ? slot1.equipment.ow : null

              ////////////_________________________
              this.formData.is_coach_a = slot1 && slot1.is_coach ? tanda.slots[0].slot.is_coach : false // aqui lo puse en false 4/10
              //SLOT 2
              const slot2 = tanda.slots[1].slot;
              this.formData.slot2 = slot2 ? slot2 : null
              this.formData.slot2.id = slot2 && slot2.id_slot ? slot2.id_slot : '' 
              this.formData.slot2.typeStatus = slot2 && slot2.typeStatus ? slot2.typeStatus : null 
              if (this.formData.selectedOption1 === 5) {
                console.log("entra en selectedOption1 === 5")
                // Si selectedOption1 es igual a 5, toma el valor de studentsOptions
                //this.formData.slot2 = slot2 ? this.studentsOptions.find(option => option.id === slot2.id_slot) : null;
                this.formData.slot2 = slot2 ? slot2 : null
              } else {
              console.log("selectedOption1 NO ES 5")
                if (tanda.slots[1].slot.tandemOptions && tanda.slots[1].slot.tandemOptions.pass_id) {
                  console.log("ID DEL PASAJERO", tanda.slots[1].slot.tandemOptions.pass_id)
                  console.log("this.newPassengers", this.newPassengers)
                  const selectedPassenger = this.newPassengers.find((passenger) => passenger.id === String(tanda.slots[1].slot.tandemOptions.pass_id));
                  console.log("PASAJERO ENCONTRADO", selectedPassenger)
                  if (selectedPassenger) {
                    this.formData.pasajero1 = selectedPassenger
                    // Aquí puedes hacer algo con el pasajero encontrado, por ejemplo, asignarlo a una variable
                    const selectedPassengerName = selectedPassenger.name;
                    console.log(`Pasajero encontrado: ${selectedPassengerName}`);
                  }
                }
                // En caso contrario, toma el valor de flyersOptions
                //this.formData.slot2 = slot2 ? this.flyersOptions.find(option => option.id === slot2.id_slot) : null;
                this.formData.slot2 = slot2 ? slot2 : null
                console.log("si no hay selectedOption 1, SOLOT 2:", this.formData.slot2)
              }
              //this.formData.slot2 = slot2 ? this.findOption(slot2, this.flyersOptions) : null; // dejo este condicional?
              this.formData.equipment2 = slot2 ? slot2.equipment : null;
              this.formData.free2 = slot2 && slot2.fr ? true : false;
              this.formData.equipFree2 = slot2.equipment && slot2.equipment.e_fr ? slot2.equipment.e_fr : false
              /*
              if(slot2.tandemOptions){
                const passId = slot2.tandemOptions.pass_id;
                const selectedPassenger = this.newPassengers.find(passenger => passenger.id === passId);
                this.formData.pasajero1 = {
                  name: selectedPassenger ? selectedPassenger.name : null,
                  id: selectedPassenger ? selectedPassenger.id : null,
                  is_ext: selectedPassenger ? selectedPassenger.is_ext : false,
                  chargedType: selectedPassenger ? selectedPassenger.chargedType :null,
                };
              }
              */
        
              // esto va____??
              this.formData.istandem2 = tanda.slots[2].slot.is_tandem || tanda.slots[2].slot.is_tandem_al ? true: false;
              ////////////_________________________
              this.formData.is_coachee_1_a = slot2 && slot2.is_coachee ? slot2.is_coachee : false // aqui lo puse en false 4/10
              this.formData.selectedOption2 = tanda.slots[2].slot.tandemOptions ? tanda.slots[2].slot.tandemOptions.t_status : null
              
              //SLOT 3
              const slot3 = tanda.slots[2].slot;
              this.formData.slot3 = slot3 ? slot3 : null
              this.formData.slot3.id = slot3 && slot3.id_slot ? slot3.id_slot : '' 
              this.formData.slot3.typeStatus = slot3 && slot3.typeStatus ? slot3.typeStatus : null 
              /*
              if (slot3.is_tandem) {
                this.formData.slot3 = slot3 ? this.findOption(slot3, this.instructorsOptions) : null;
              } else if (slot3.is_coach) {
                console.log("es coach", slot3.is_coach);              
                this.formData.slot3 = slot3 ? this.findOption(slot3, this.coachOptions) : null;
              } else {
                console.log("ni tandem ni coach slot 3", slot3.name);              
                this.formData.slot3 = slot3 ? this.findOption(slot3, this.flyersOptions) : null;
              }
              */

              this.formData.equipment3 = slot3 ? tanda.slots[2].slot.equipment : null
              this.formData.free3 = slot3 && slot3.fr ? true : false
              this.formData.equipFree3 = slot3.equipment && slot3.equipment.e_fr ? slot3.equipment.e_fr : false
              this.formData.is_coachee_2_a = slot3 && slot3.is_coachee ? slot3.is_coachee : false // aqui lo puse en false 4/10
              this.formData.is_coach_b = slot3 && slot3.is_coach_b ? slot3.is_coach_b : false 
              //this.formData.slot3 = tanda.slots[2].slot || {};

              //SLOT 4
              const slot4 = tanda.slots[3].slot;
              this.formData.slot4 = slot4 ? slot4 : null;
              this.formData.slot4.id = slot4 && slot4.id_slot ? slot4.id_slot : '' 
              this.formData.slot4.typeStatus = slot4 && slot4.typeStatus ? slot4.typeStatus : null
              //this.formData.slot4 = slot4 ? this.findOption(slot4, this.flyersOptions) : null;
              this.formData.equipment4 = slot4 ? tanda.slots[3].slot.equipment : null;
              this.formData.free4 = slot4 && slot4.fr ? true : false
              this.formData.equipFree4 = slot4.equipment && slot4.equipment.e_fr ? slot4.equipment.e_fr : false
              this.formData.is_coachee_3_a = slot4 && slot4.is_coachee ? slot4.is_coachee : false
              // aqui hay error
              this.formData.is_coachee_1_b = slot4  && slot4.is_coachee_2 ? slot4.is_coachee_2 : false 

              if(slot4.tandemOptions){
                const passId2 = slot4.tandemOptions.pass_id;
                console.log("this.newPassengers:",this.newPassengers)
                const selectedPassenger2 = this.newPassengers.find(passenger => passenger.id === passId2);
                console.log("selectedPassenger", selectedPassenger2)
  
                this.formData.pasajero2 = {
                  name: selectedPassenger2 ? selectedPassenger2.name : null,
                  id: selectedPassenger2 ? selectedPassenger2.id : null,
                  is_ext: selectedPassenger2 ? selectedPassenger2.is_ext : false,
                  chargedType: selectedPassenger2 ? selectedPassenger2.chargedType :null,
                };
              }

              this.formData.status = tanda.status.f_status;
              // HACER QUE FUNCIONE
              if (tanda.status.f_status === 1 || tanda.status.f_status === 2) {
                this.showDeleteButton = true;
                // HACER QUE FUNCIONE
              } else if (tanda.status.f_status === 3) {
                this.showDeleteButton = false;
                // HACER QUE FUNCIONE
              }
              //this.titleFN = paraca.first_name.charAt(0).toUpperCase() + paraca.first_name.slice(1);
              //this.titleLN = paraca.last_name.charAt(0).toUpperCase() + paraca.last_name.slice(1);
            this.loading = false
            console.log("slot1:", slot1)
            console.log("RESPUESTA DE GET: this.formData.slot1:", this.formData.slot1)
          })
          .catch(error => {
            console.log(error);
            this.loading = false
          });
      },
      submitForm() {
        if (this.performInitialValidations() === false) {
          return;
        }
        if(this.formData.istandem1){
          this.validationsTdms()
          if(this.validationsTdms() === false){
            return;
          }
        }
        this.validationsCoachs()
        this.errorMessage = null
        this.loading = true;
        let tC = this.calculateTypeCoach(this.formData);
        //console.log("typeCoach desde form:", tC)
        //console.log(typeof tC)

        const fechaAlmacenadaEnUTC = new Date();
        const fechaLocal = fechaAlmacenadaEnUTC.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

        console.log("fechaLocal", fechaLocal)
        //const argentinaTime = moment().tz('America/Argentina/Buenos_Aires');
        //console.log(argentinaTime.format());
        console.log("DEBERIA TENER ID DE PASAJERO LOW COST", this.formData.pasajero1.payerId)
        console.log("tipo de dato", typeof this.formData.pasajero1.payerId)
        let data = {
          number_tanda: this.formData.number_tanda ? this.formData.number_tanda : 0,
          type_coach: tC, // si pongo condicional me guarda null
          is_3: this.asistidoDoble ? this.asistidoDoble : false,
          is_2: this.asistidoSimple ? this.asistidoSimple : false,
          slots: [
            { 
              slot: // SLOT 1
              { 
                name: this.formData.slot1 ? this.formData.slot1.name : '', 
                id_slot: this.formData.slot1 ? this.formData.slot1.id : '',
                typeStatus: this.formData.slot1 && this.formData.slot1.typeStatus ? this.formData.slot1.typeStatus : null, 
                role: this.formData.slot1 ? this.formData.slot1.role : '',

                is_coach: this.formData.is_coach_a ? this.formData.is_coach_a : false,
                
                is_tandem: this.formData.istandem1 && this.formData.selectedOption1 !== 5 ? this.formData.istandem1 : false ,
                is_tandem_al: this.formData.istandem1 && this.formData.selectedOption1 === 5 ? this.formData.istandem1 : false,
                is_aff: (this.asistidoSimple || this.asistidoDoble) && this.formData.slot1 && this.formData.slot1.role && this.formData.slot1.role.includes(4) ? true : false,
                is_student: {
                  level: this.formData.slot1 && this.formData.slot1.role && this.formData.slot1.role.includes(8) ? 
                  this.formData.slot1.is_student.level : 
                  null,
                  q_jump: this.formData.slot1 && this.formData.slot1.role && this.formData.slot1.role.includes(8) ? 
                  this.formData.slot1.is_student.q_jump : 
                  null,
                },
                fr: this.formData.free1 ? this.formData.free1 : false,
                //CHEQUEAR QUE FUNCIONE ESTA LINEA
                equipment: this.formData.equipment1 ? {
                  _id: this.formData.equipment1._id ? this.formData.equipment1._id : '',
                  name_parachute: this.formData.equipment1.name_parachute ? this.formData.equipment1.name_parachute : '',
                  category: this.formData.equipment1.category ? this.formData.equipment1.category : '', //BORRAR??
                  not_r: this.formData.equipment1.name_parachute && this.formData.equipment1.name_parachute === 'PROPIO' ? true : false,
                  owner: this.formData.equipment1.owner ? this.formData.equipment1.owner : {},
                  e_fr: this.formData.equipFree1 ? this.formData.equipFree1 : null,
                  //owner: this.formData.equipment1.owner ? this.formData.equipment1.owner : '', //BORRAR??
                } : undefined,
                tandemOptions: this.formData.istandem1 ? {
                  //is_ext: this.formData.tandemOptions.is_ext,
                  t_status: this.formData.selectedOption1 ? this.formData.selectedOption1 : null
                } : null
              }
            },
            { 
              slot: // SLOT 2
              { 
                //name: this.formData.istandem1 && this.formData.selectedOption1 !== 5 ? this.getAliasById(this.formData.pasajero1.id) : this.formData.slot2 ? this.formData.slot2.name : 'S/D',
                name:  this.formData.slot2 ? this.formData.slot2.name : '', 
                id_slot: this.formData.slot2 ? this.formData.slot2.id : '',
                typeStatus: this.formData.slot2 && this.formData.slot2.typeStatus? this.formData.slot2.typeStatus : null, 
                role: this.formData.slot2 ?this.formData.slot2.role : '',
                is_coachee: this.formData.is_coachee_1_a ? this.formData.is_coachee_1_a : false,
                is_student: {
                  level: this.formData.slot2 && this.formData.slot2.role && this.formData.slot2.role.includes(8) ? 
                  this.formData.slot2.is_student.level : 
                  undefined,
                  q_jump: this.formData.slot2 && this.formData.slot2.role && this.formData.slot2.role.includes(8) ? 
                  this.formData.slot2.is_student.q_jump : 
                  undefined,
                  is_3: this.asistidoDoble ? this.asistidoDoble : false,
                  is_2: this.asistidoSimple ? this.asistidoSimple : false
                },
                equipment: this.formData.equipment2 ? {
                  _id: this.formData.equipment2._id ? this.formData.equipment2._id : '',
                  name_parachute: this.formData.equipment2.name_parachute ? this.formData.equipment2.name_parachute : '',
                  category: this.formData.equipment2.category ? this.formData.equipment2.category : '',
                  not_r: this.formData.equipment2.name_parachute && this.formData.equipment2.name_parachute === 'PROPIO' ? true : false,
                  owner: this.formData.equipment2.owner ? this.formData.equipment2.owner : {},
                  e_fr: this.formData.equipFree2 ? this.formData.equipFree2 : null,
                  //owner: this.formData.equipment2.owner ? this.formData.equipment2.owner.id : {}
                } : undefined,
                fr: this.formData.free2 ? this.formData.free2 : false,
                tandemOptions: this.formData.istandem1 ? {
                  passengers_name: this.formData.pasajero1 ? this.formData.pasajero1.name : '',
                  chargedType: this.formData.pasajero1 && this.formData.pasajero1.chargedType ? this.formData.pasajero1.chargedType : null,
                  pass_id: this.formData.pasajero1 ? this.formData.pasajero1.id : null,
                  is_ext: this.formData.pasajero1 && this.formData.pasajero1.is_ext ? this.formData.pasajero1.is_ext : false,
                  isLC: this.formData.pasajero1 && this.formData.pasajero1.payerId ? this.formData.pasajero1.payerId : null
                } : null
              } 
            },
            { slot: // SLOT 3
              { 
                name: this.formData.slot3 ? this.formData.slot3.name : '', 
                id_slot: this.formData.slot3 ? this.formData.slot3.id : '',
                typeStatus: this.formData.slot3 && this.formData.slot3.typeStatus ? this.formData.slot3.typeStatus : null,
                role: this.formData.slot3 ? this.formData.slot3.role : '',

                is_coach_b: this.formData.is_coach_b ? this.formData.is_coach_b : false,
                is_coachee: this.formData.is_coach_b ? false : (this.formData.is_coachee_2_a ? this.formData.is_coachee_2_a : false),

                is_tandem: this.formData.istandem2 && this.formData.selectedOption2 !== 5 || false,
                is_tandem_al: this.formData.istandem2 && this.formData.selectedOption2 === 5 ? this.formData.istandem2 : false,
                is_aff: (this.asistidoSimple2 || this.asistidoDoble) && this.formData.slot3 && this.formData.slot3.role && this.formData.slot3.role.includes(4) ? true : false,
                is_student: {
                  level: this.formData.slot3 && this.formData.slot3.role && this.formData.slot3.role.includes(8) ? 
                  this.formData.slot3.is_student.level : 
                  undefined,
                  q_jump: this.formData.slot3 && this.formData.slot3.role && this.formData.slot3.role.includes(8) ? 
                  this.formData.slot3.is_student.q_jump : 
                  undefined,
                },
                fr: this.formData.free3 ? this.formData.free3 : false,
                is_cam: this.formData.istandem1 && this.formData.selectedOption1 === 2 || this.formData.istandem1 && this.formData.selectedOption1 === 3 ? true : false,
                // is_student: this.formData.slot3 && this.formData.slot3.role && this.formData.slot3.role.includes(8) ? true : undefined,
                equipment: this.formData.equipment3 ? {
                  _id: this.formData.equipment3._id ? this.formData.equipment3._id : '',
                  name_parachute: this.formData.equipment3.name_parachute ? this.formData.equipment3.name_parachute : '',
                  category: this.formData.equipment3.category ? this.formData.equipment3.category : '',
                  not_r: this.formData.equipment3.name_parachute && this.formData.equipment3.name_parachute === 'PROPIO' ? true : false,
                  owner: this.formData.equipment3.owner ? this.formData.equipment3.owner : {},
                  e_fr: this.formData.equipFree3 ? this.formData.equipFree3 : null,
                  //owner: this.formData.equipment3.owner ? this.formData.equipment3.owner.id : {}
                } : undefined,


                //________________por q esto????????????????????????????????????????????????????????
                //___________________________________
                //??????????????????????????????????????????/
                //??????????????????????????????????
                tandemOptions: this.formData.istandem2 ? {
                  //is_ext: this.formData.tandemOptions.is_ext2, //es correcto el string vacio?
                  t_status: this.formData.selectedOption2
                } : null,
              } },
            { 
              slot: // SLOT 4
              { 
                name: this.formData.istandem2 && this.formData.selectedOption2 !== 5 ? this.getAliasById(this.formData.pasajero2.id) : this.formData.slot4 ? this.formData.slot4.name : '', 
              //  name: this.formData.istandem2 ? this.getAliasById(this.formData.pasajero2) : this.formData.slot4 ? this.formData.slot4.name : '', 
                id_slot: this.formData.slot4 ? this.formData.slot4.id : '',
                typeStatus: this.formData.slot4 && this.formData.slot4.typeStatus ? this.formData.slot4.typeStatus : null, 
                role: this.formData.slot4 ?this.formData.slot4.role : '',

                is_coachee: this.formData.is_coachee_3_a ? this.formData.is_coachee_3_a : false,
                is_coachee_2: this.formData.is_coachee_1_b ? this.formData.is_coachee_1_b : false,
                is_cam: this.formData.istandem1 && this.formData.selectedOption1 === 3 ? true : false,
                is_student: {
                  level: this.formData.slot4 && this.formData.slot4.role && this.formData.slot4.role.includes(8) ? 
                  this.formData.slot4.is_student.level : 
                  undefined,
                  q_jump: this.formData.slot4 && this.formData.slot4.role && this.formData.slot4.role.includes(8) ? 
                  this.formData.slot4.is_student.q_jump : 
                  undefined,
                },
                fr: this.formData.free4 ? this.formData.free4 : false,
                // is_student: this.formData.slot4 && this.formData.slot4.role && this.formData.slot4.role.includes(8) ? true : undefined,
                equipment: this.formData.equipment4 ? {
                  _id: this.formData.equipment4._id ? this.formData.equipment4._id : '',
                  name_parachute: this.formData.equipment4.name_parachute ? this.formData.equipment4.name_parachute : '',
                  category: this.formData.equipment4.category ? this.formData.equipment4.category : '',
                  not_r: this.formData.equipment4.name_parachute && this.formData.equipment4.name_parachute === 'PROPIO' ? true : false,
                  owner: this.formData.equipment4.owner ? this.formData.equipment4.owner : {},
                  e_fr: this.formData.equipFree4 ? this.formData.equipFree4 : null,
                  //owner: this.formData.equipment4.owner ? this.formData.equipment4.owner.id : {}
                } : undefined,
                tandemOptions: this.formData.istandem2 ? {
                  passengers_name: this.formData.pasajero2 ? this.formData.pasajero2.name : '',
                  chargedType: this.formData.pasajero2 && this.formData.pasajero2.chargedType ? this.formData.pasajero2.chargedType : null,
                  pass_id: this.formData.pasajero2 ? this.formData.pasajero2.id : null,                
                  is_ext: this.formData.pasajero2 && this.formData.pasajero2.is_ext ? this.formData.pasajero2.is_ext : false,
                  isLC: this.formData.pasajero2 && this.formData.pasajero2.payerId ? this.formData.pasajero2.payerId : null
                } : null
              } 
            },
          ],
          time: this.formData.time,
          pilot: this.formData.pilot ? this.formData.pilot : { name: '', id: '' },
          plane: this.formData.plane ? this.formData.plane : { name: '', id: '' },
          altitude: this.formData.altitude ? { altitude: this.formData.altitude.text, value: this.formData.altitude.value } : { altitude: '', value: '' },
          status: { f_status: this.formData.status ? this.formData.status.value : 1 },
          date: new Date(),
          dolarToday: this.dolarBlue
        };
        console.log("FECHA DE TANDA", data.date)
        
        
        if (this.id) {
          try {
            this.$http.put(`http://localhost:8082/api/tandas/${this.id}`, data)
            //  this.$http.put(`${process.env.VUE_APP_TANDAS}/${this.id}`, data)
                .then(response => {
                  console.log("RESPUESTA PARA ACTUALIZAR ESTADO ", response.data.payload);
                  localStorage.setItem('tandas', JSON.stringify(response.data.payload));
                  eventBus.$emit('toast', { show: true, text: "Tanda editada correctamente", color: "green" })
                  //console.log('Estado actual de Vuex:', this.$store.state.dataTable);
                  //this.$store.dispatch('getDataTable');
                  //console.log('Estado actual de Vuex 2:', this.$store.state.dataTable);
                  this.$router.push('/tandasMain')
                })
                .catch(error => {
                  console.error("Error al realizar la solicitud PUT:", error);
                  // Manejar el error, mostrar un mensaje de tostada de error, etc.
                });
            } catch (error) {
              console.error("Error en el bloque try-catch:", error);
              // Manejar el error, mostrar un mensaje de tostada de error, etc.
            }
        } else {
          this.$http.post(`http://localhost:8082/api/tandas`, data)
          //this.$http.post(`${process.env.VUE_APP_TANDAS}`, data)
            .then(response => {
              console.log(response, "response");
              localStorage.setItem('tandas', JSON.stringify(response.data.payload));
              eventBus.$emit('toast', { show: true, text: "Tanda creada correctamente", color: "green" })
              this.$store.commit('setDataTable', response.data.payload);
              this.$router.push('/tandasMain')
            })
            .catch(error => {
              console.log(error);
              eventBus.$emit('toast', { show: true, text: `${error.response.data.error}`, color: "red" })
            });
        }
      },
      performInitialValidations() {

        /*
        if(this.formData.slot2.is_student.level === 2 && this.asistidoDoble === false || this.formData.slot2.is_student.level === 2 && this.asistidoSimple === false
        || this.formData.slot4.is_student.level === 2 && this.asistidoDoble === false || this.formData.slot4.is_student.level === 2 && this.asistidoSimple === false){
          this.errorMessage = 'Alumno en etapa 2 solo puede ser incluido en saltos asistidos';
          return false;          
        }
        if(this.formData.slot1.is_student.level === 1 || this.formData.slot3.is_student.level === 1 || this.formData.slot1.is_student.level === 2 || this.formData.slot3.is_student.level === 2){
          this.errorMessage = 'El alumno en nivel 1 o 2 debe ser ingresado en el slot II';
          return false;
        }
        */
        //console.log("this.asistidoDoble", this.asistidoDoble, "y this.formData.slot2.is_student.level", this.formData.slot2.is_student.level)
        if (
          (this.asistidoDoble === true && (this.formData.slot2.is_student.level === 1 || this.formData.slot2.is_student.level === 3)) ||
          (this.asistidoSimple === true && (this.formData.slot2.is_student.level === 1 || this.formData.slot2.is_student.level === 3))
        ) {
          this.errorMessage = 'El Alumno debe estar en etapa 2 para ir en un salto asistido';
          return false;
        } 
        /*
        else if (
          (this.asistidoDoble === false && (this.formData.slot1.is_student.level === 1 || this.formData.slot1.is_student.level === 2)) ||
          (this.asistidoSimple === false && (this.formData.slot1.is_student.level === 1 || this.formData.slot1.is_student.level === 2)) || (this.asistidoDoble === false && (this.formData.slot2.is_student.level === 1 || this.formData.slot2.is_student.level === 2)) ||
          (this.asistidoSimple === false && (this.formData.slot2.is_student.level === 1 || this.formData.slot2.is_student.level === 2))
          || (this.asistidoDoble === false && (this.formData.slot3.is_student.level === 1 || this.formData.slot3.is_student.level === 2)) ||
          (this.asistidoSimple === false && (this.formData.slot3.is_student.level === 1 || this.formData.slot3.is_student.level === 2)) || (this.asistidoDoble === false && (this.formData.slot4.is_student.level === 1 || this.formData.slot4.is_student.level === 2)) ||
          (this.asistidoSimple === false && (this.formData.slot4.is_student.level === 1 || this.formData.slot4.is_student.level === 2))
        ) {
          this.errorMessage = 'El Alumno debe estar en etapa 3 para ir en un salto solo';
          return false;
        } 
        */
        else if (
          (this.asistidoDoble === true || this.asistidoSimple === true) && !this.formData.slot2.role.includes(8)
        ) {
          this.errorMessage = 'Estás cargando un salto asistido de curso, la segunda plaza corresponde a un alumno.';
          return false;
        } else if (
          (this.formData.selectedOption1 === 5 && (this.formData.slot2.is_student.level === 2 || this.formData.slot2.is_student.level === 3)) ||
          (this.formData.selectedOption2 === 5 && (this.formData.slot4.is_student.level === 2 || this.formData.slot4.is_student.level === 3))
        ) {
          this.errorMessage = 'Para ir en un TDM de escuela el alumno debe estar en etapa 1';
          return false;
        } else if (
          (this.formData.selectedOption1 === 5 && [1, 2, 4].includes(this.formData.altitude.value)) ||
          (this.formData.selectedOption2 === 5 && [1, 2, 4].includes(this.formData.altitude.value))
        ) {
          this.errorMessage = 'Los TDMs de Escuela solo pueden ir a 10k';
          return false;
        } else if (
          (this.asistidoDoble === true || this.asistidoSimple === true) && [1, 2].includes(this.formData.altitude.value)
        ) {
          this.errorMessage = 'Los saltos de curso asistidos solo pueden ir a 10k o 12k';
          return false;
        }

        return true;
      },
      validationsTdms(){
        if (this.formData.selectedOption1 === 5) {
          console.log("SOLT UNOOOOOOO", !this.formData.slot1.role.includes(8))
          if(!this.formData.slot2.role.includes(8)){
            console.log("this.formData.slot1.role.includes(8)", this.formData.slot2.role.includes(8))
            this.errorMessage = `Seleccionaste un TDM de Escuela, deberías cargar un Alumno`;
              return false;
          } else{
            console.log("formData.slot2 ROL", this.formData.slot2.role)
          }
        } else {
          const chargedTypeDescriptions = {
            1: "HandyCam",
            2: "HandyCam con Tarjeta",
            3: "HandyCam PXL",
            4: "HandyCam PXL con Tarjeta",
            5: "Bautismo CON CAMAROGRAFO",
            6: "Camarógrafo con Tarjeta",
            7: "Camarógrafo PXL",
            8: "Camarógrafo PXL con Tarjeta",
            9: "VIP",
            10: "VIP con Tarjeta",
            11: "LOW COST",
            12: "LOW COST Con Tarjeta",
            13: "Low Cost PXL",
            14: "Low Cost PXL con tarjeta",
            15: "PROMO CAM",
            16: "PROMO HANDYC",
            17: "PROMO CAM con Tarjeta",
            18: "PROMO HANDYC con Tarjeta",
          };

          console.log("validaciones tamdens")
          if(this.formData.selectedOption1 === 1){
            const validChargedTypes = [1, 2, 3, 4, 11, 12, 13, 14, 16, 18];
            if (this.formData.pasajero1.chargedType != undefined && !validChargedTypes.includes(this.formData.pasajero1.chargedType)) {
              // El chargedType no es válido, muestra un error y retorna false
              this.errorMessage = `El pasajero ha comprado un ${chargedTypeDescriptions[this.formData.pasajero1.chargedType]} y lo estás cargando como Handy Cam`;
              return false;
            }
          } else if(this.formData.selectedOption1 === 2){
            const validChargedTypes = [5, 6, 7, 8, 15, 17];
            if (this.formData.pasajero1.chargedType != undefined && !validChargedTypes.includes(this.formData.pasajero1.chargedType)) {
              // El chargedType no es válido, muestra un error y retorna false
              this.errorMessage = `El pasajero ha comprado un ${chargedTypeDescriptions[this.formData.pasajero1.chargedType]} y lo estás cargando en un salto con Camarógrafo`;
              return false;
            }
          } else if(this.formData.selectedOption1 === 3){
            console.log("vip")
            const validChargedTypes = [9, 10];
            if (this.formData.pasajero1.chargedType != undefined && !validChargedTypes.includes(this.formData.pasajero1.chargedType)) {
              // El chargedType no es válido, muestra un error y retorna false
              this.errorMessage = `El pasajero ha comprado un ${chargedTypeDescriptions[this.formData.pasajero1.chargedType]} y lo estás cargando en un salto VIP`;
              return false;
            }
          } else {
            return true;
          }
        }
      },
      validationsCoachs(){
        console.log("validaciones, Alumno en etapa 2 debe solo puede ir en saltos asistidos")
      },
      handleIs2(){
        console.log(" ")
      },
      getOptionsFlyers() {
        this.loading = true; 
        // EL FILTRADO POR BALANCE DEBERIA TMB TENER POR PARACAS ACTIVOS, HACER DESDE EL BACKEND
        const url = `${process.env.VUE_APP_USERS}?names=true`;
        //const url = `http://localhost:8082/api/users?names=true`;
        this.$http
          .get(url)
          .then((response) => {
            const paracas = response.data.payload;

            this.flyersOptions = paracas.map(paraca => ({
              id: paraca.id,
              name: paraca.alias,
              balance: paraca.balance,
              typeStatus: paraca.status,
              role: paraca.role,
              is_student: paraca.is_student
            }));

              /*
            this.flyersOptions = paracas
            .filter(paraca => paraca.balance <= 0)
            .map(paraca => ({
              id: paraca.id,
              name: paraca.alias,
              balance: paraca.balance,
              typeStatus: paraca.status,
              role: paraca.role,
              is_student: paraca.is_student
            }));
            */

            console.log("LISTADO flyersOptions", this.flyersOptions)
            /*
              this.flyersOptions = paracas.filter(paraca => paraca.balance > 0).map(paraca => ({
                id: paraca.id,
                name: paraca.alias,
                balance: paraca.balance,
                typeStatus: paraca.status,
                role: paraca.role,
                is_student: paraca.is_student
              }));
              */

              this.studentsOptions = paracas
                .filter((paraca) => paraca.is_student && paraca.balance > 0 && [1, 2, 3].includes(paraca.is_student.level))
                .map((paraca) => ({
                  id: paraca.id,
                  name: paraca.alias,
                  balance: paraca.balance,
                  typeStatus: paraca.status,
                  role: paraca.role,
                  is_student: paraca.is_student,
                }));

              const coachUsers = paracas.filter((paraca) => paraca.role.includes(5));
              // Actualiza coachOptions con los usuarios que son coachs
              this.coachOptions = coachUsers.map((coach) => ({
                id: coach.id,
                name: coach.alias,
                balance: coach.balance,
                typeStatus: coach.status,
                role: coach.role,
                is_student: coach.is_student,
              }));

              const aff = paracas.filter((paraca) => paraca.role.includes(4));
              this.affInstructorsOptions = aff.map((affIns) => ({
                id: affIns.id,
                name: affIns.alias,
                balance: affIns.balance,
                typeStatus: affIns.status,
                role: affIns.role,
                is_student: affIns.is_student,
              }));
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      getOptionsInstructors(){
        this.$http.get(`${process.env.VUE_APP_INSTRUCTORS}`)
          .then(response => {
            const instructors = response.data.payload;
            this.instructorsOptions = instructors.map((instructor) => ({
              id: instructor._id,
              name: `${instructor.alias}`,
              balance: instructor.balance,
              typeStatus: instructor.status,
              role: instructor.role,
            }));
            this.loading = false;
          //
          })
          .catch(error => {
            console.log(error)
          //
          });
      },
      getOptionsEquipment(){
        this.$http.get(`${process.env.VUE_APP_EQUIPMENT}`)
          .then(response => {
            const equipment = response.data.payload;
            this.equipmentTandemsOptions = equipment.filter(equip => equip.category === 1);
            this.equipmentRentOptions = equipment.filter(equip => equip.category === 2 || equip.category === 3);

            this.loading = false;
          })
          .catch(error => {
            console.log(error)
          });
      },
      getOptionsPilots() {
        this.loading = true;
        const url = `${process.env.VUE_APP_PILOTS}`;
        this.$http.get(url)
          .then((response) => {
            const pilots = response.data.payload;
            this.pilotOptions = pilots.map((pilot) => ({
              id: pilot._id,
              name: `${pilot.alias}`
            }));
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      getOptionsPlanes(){
        this.loading = true;
        const url = `${process.env.VUE_APP_PLANES}?list=true`;
        getData.call(this, url)
          .then(data => {
            this.planesOptions = data;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false;
          });
      },
      async getPassengers() {
        console.log("getPassengers ejecutado");
        this.loading = true;
        //const url = `${process.env.VUE_APP_PASSENGERS}?jumped=false`;
        const url = `http://localhost:8082/api/passengers?jumped=false`;

        try {
          const response = await this.$http.get(url);
          const passengers = response.data.payload;
          console.log("PASAJEROS TIENE NUEVO CAMPO?", passengers);
          this.newPassengers = passengers
          /*
          this.newPassengers = passengers.map((passenger) => ({
            name: passenger.alias,
            id: passenger._id,
            is_ext: passenger.is_ext,
            chargedType: passenger.chargedType
          })).concat(
            this.passengers.filter((passenger) => passenger.a_alias).map((passenger) => ({
              name: passenger.a_alias,
              id: `${passenger._id}`,
            }))
          );
          */
          
          this.newPassengers = passengers.map((passenger) => ({
            name: passenger.alias,
            id: passenger._id,
            is_ext: passenger.is_ext,
            chargedType: passenger.chargedType,
            payerId: passenger.payerId ? passenger.payerId : null
          }));

          /*
          this.newPassengers = this.newPassengers.concat(
            this.passengers.filter((passenger) => passenger.a_alias).map((passenger) => ({
              name: passenger.a_alias,
              id: `${passenger._id}`,
              is_ext: passenger.is_ext, // Asegúrate de agregar las propiedades necesarias aquí
              chargedType: passenger.chargedType, // Asegúrate de agregar las propiedades necesarias aquí
            }))
          );
          */

          console.log("PASAJEROSSSSSSSSSSSSSSSSSSSSSSSSSS", this.newPassengers);
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
          // Manejar el error si es necesario
        }
      },
      // BORRRARRR ___________ ???????????????????????????????????????????????????????????
      handleSelectChange() {
        if (this.formData.slot1) {
          this.formData.slot1.typeStatus = this.formData.slot1.status;
        }
        if (this.formData.slot2) {
          this.formData.slot2.typeStatus = this.formData.slot2.status;
        }
        if (this.formData.slot3) {
          this.formData.slot3.typeStatus = this.formData.slot3.status;
        }
        if (this.formData.slot4) {
          this.formData.slot4.typeStatus = this.formData.slot4.status;
        }
      },
      handleOptionsTdm1(optionValue){
        if (optionValue === 2 || optionValue === 3) {
          this.formData.istandem2 = null;
          // Si se selecciona "Camarógrafo" o "VIP", limpiar selectedOption2
          this.formData.selectedOption2 = null;
        }
      },
      findOption(slot, options) {
        return options.find(option => option.id === slot.id_slot);
      },
      findAltitude(altitude, options) {
        return options.find(option => option._id === altitude._id);
      },
      getAliasById(pasajeroId) {
        const pasajero = this.passengers.find(p => p.id === pasajeroId);
        return pasajero ? pasajero.alias : '';
      },
      openTimePickerDialog() {
        this.pickerOpen = true;
      },
      updateTime(newTime) {
        this.formData.time = newTime;
      },
      updateOptions1() {
        this.formData.slot1 = ''
        this.formData.equipment1 = ''
        this.formData.equipFree1 = false
        this.formData.slot2 = ''
        this.formData.equipment2 = ''
        this.formData.equipFree2 = false
        this.formData.is_coach_a = false
        this.formData.is_coachee_1_a = false
        this.formData.is_coachee_2_a = false
        this.formData.is_coachee_3_a = false
        this.formData.is_coach_b = false
        //this.formData.tandemOptions.is_ext = null
        this.formData.selectedOption1 = null
        this.formData.pasajero1 = ''
        this.asistidoDoble = false
        this.asistidoSimple = false
        //
      },
      updateOptions2(){
        this.formData.slot3 = ''
        this.formData.equipment3 = ''
        this.formData.equipFree3 = false
        this.formData.slot4 = ''
        this.formData.equipment4 = ''
        this.formData.equipFree4 = false
        this.formData.is_coach_b = false
        this.formData.is_coachee_1_b = false
        this.formData.is_coachee_2_a = false
        this.formData.is_coachee_3_a = false
        //this.formData.tandemOptions.is_ext2 = null
        this.formData.selectedOption2 = null
        this.formData.pasajero2 = ''
      },
      getEquipmentOptions(istandem) {
        return istandem ? this.equipmentTandemsOptions : this.equipmentRentOptions;
      },
      calculateTypeCoach(formData){
        let coachCount = 0;
        let coacheeCount = 0;

        // Verifica los campos is_coach_a y is_coachee_1_a
        if (formData.is_coach_a) {
          coachCount++;
          coacheeCount++;
        } else if (formData.is_coachee_1_a) {
          coacheeCount++;
        }

        // Repite el proceso para los otros campos is_coach_b e is_coachee_2_a
        if (formData.is_coach_b) {
          coachCount++;
          coacheeCount++;
        } else if (formData.is_coachee_2_a) {
          coacheeCount++;
        }
        // Calcula el valor de type_coach según reglas de db
        if (coachCount === 0 && coacheeCount === 0) {
          return 0;
        } else if (coachCount === 1 && coacheeCount === 1) {
          return 1;
        } else if (coachCount === 1 && coacheeCount === 2) {
          return 2;
        } else if (coachCount === 1 && coacheeCount === 3) {
          return 3;
        } else if (coachCount === 2 && coacheeCount === 2) {
          return 4;
        }
        return 0;
      },
      closeConfirmationModal(){
        this.showDialog = false
      },
      deleteTanda(){
          if (this.id) {
          this.loadingDel = true;
          this.$http.delete(`${process.env.VUE_APP_TANDAS}/${this.id}`)
            .then(response => {
              console.log(response, "response")
              eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
              this.$router.push('/tandasMain')
            //
            })
            .catch(error => {
              eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
              console.log(error)
            //
            })
            .finally(() => {
            this.loadingDel = false; 
          });
        }
      },
      goBack() {
        this.$router.push('/tandasMain');
      },
      cleanCoachA(){
        if(this.formData.is_coach_a === false){
          this.formData.is_coach_a = false
          this.formData.is_coachee_1_a = false
          this.formData.is_coachee_2_a = false
          this.formData.is_coachee_3_a = false
        }
      },
      cleanCoachB(){
        if(this.formData.is_coach_b === false){
          this.formData.is_coachee_1_b = false
        }
      },
      cleanForm(){
        this.asistidoDoble = false
        this.asistidoSimple = false
        this.asistidoSimple2 = false
        this.formData.selectedOption1 = null
        this.formData.selectedOption2 = null
        this.formData.is_coach_a = false
        this.formData.is_coachee_1_a = false
        this.formData.is_coachee_2_a = false
        this.formData.is_coachee_3_a = false
        this.formData.is_coach_b = false
        this.formData.is_coachee_1_b = false
        this.formData.istandem1 = false
        this.formData.handyCam = false
        this.formData.conCamarografo = false
        this.formData.vip = false
        this.formData.lowCost = false
        this.formData.pasajero1 = false
        this.formData.istandem2 = false
        this.formData.pasajero2 = false
        this.formData.handyCam2 = false
        this.formData.lowCost2 = false
        this.errorMessage = null
      },
      cleanSlots(){
        this.formData.slot1 = {}
        this.formData.equipment1 = null
        this.formData.slot2 = {}
        this.formData.equipment2 = null
        this.formData.slot3 = {}
        this.formData.equipment3 = null
        this.formData.slot4 = {}
        this.formData.equipment4 = null
        this.formData.is_coach_a = false
        this.formData.is_coachee_1_a = false
        this.formData.is_coachee_2_a = false
        this.formData.is_coachee_3_a = false
        this.formData.is_coach_b = false
        this.formData.is_coachee_1_b = false
        this.errorMessage = null
      }
    }
  };
</script>

<style scoped>
.v-btn-toggle {
  pointer-events: none;
  cursor: default;
}

</style>