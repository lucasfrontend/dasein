<template>
  <v-container>
    <BarriTitle 
      :titleText="'Precios'"
    />
    <!-- Plazas -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Plazas</span>
          </v-card-title>
          <v-data-table
            :headers="headersSlots"
            :items="formattedPrice"
            :loading="loading"
            class="elevation-1"
            :no-data-text="'No hay datos disponibles'"
          >

            <template v-slot:item="{ item }">
              <tr>
                <td>{{ getTypeAlt(parseInt(item.altitude)) }}</td>
                <td>
                  <router-link v-if="item.priceId1" :to="{ name: 'pricesForm', params: { id: item.priceId1 } }">
                    <v-btn      
                      ><span class="pr-4"><span class="green--text">$</span> {{ item.q1 }}</span>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link v-if="item.priceId2" :to="{ name: 'pricesForm', params: { id: item.priceId2 } }">
                    <v-btn   
                    ><span class="pr-4"><span class="green--text">$</span> {{ item.q2 }}</span>                    
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link v-if="item.priceId3" :to="{ name: 'pricesForm', params: { id: item.priceId3 } }">
                    <v-btn                       
                    ><span class="pr-4"><span class="green--text">$</span> {{ item.q3 }}</span> 
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link v-if="item.priceId4" :to="{ name: 'pricesForm', params: { id: item.priceId4 } }">
                    <v-btn                       
                      ><span class="pr-4"><span class="green--text">$</span> {{ item.q4 }}</span> 
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link v-if="item.priceId5" :to="{ name: 'pricesForm', params: { id: item.priceId5 } }">
                    <v-btn                       
                      ><span class="pr-4"><span class="green--text">$</span> {{ item.q5 }}</span>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link v-if="item.priceId6" :to="{ name: 'pricesForm', params: { id: item.priceId6 } }">
                    <v-btn                       
                      ><span class="pr-4"><span class="green--text">$</span> {{ item.q6 }}</span>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link v-if="item.priceId7" :to="{ name: 'pricesForm', params: { id: item.priceId7 } }">
                    <v-btn                       
                      ><span class="pr-4"><span class="green--text">$</span> {{ item.q7 }}</span>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-row>
          <v-col>
            <router-link :to="{ name: 'pricesForm', params: { slot: true } }">
              <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text" >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- END Plazas -->
    
    <v-row>
      <!-- PLEGADOS -->
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Plegados</span>
          </v-card-title>
          <v-data-table
            :headers="headersPacking"
            :items="pricesPacking"
            :search="search"
            :loading="loading"
            :footer-props="{ showFirstLastPage: true }"
            :mobile-breakpoint="0"
            class="elevation-1"
            :no-data-text="'No hay datos disponibles'"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ getTypeAltWord(item.Packing.typePacking) }}</td>
                <td>
                  {{ item.Packing.value }}
                </td>
                <td>
                  <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                    <v-btn>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-row>
          <v-col>
            <router-link :to="{ name: 'pricesForm', params: { packing: true } }">
              <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-col>
      </v-row>
      </v-col>

      <!-- ALQUILER EQUIPOS -->
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Alquiler de Equipos</span>
          </v-card-title>
          <v-data-table
            :headers="headersRenEqu"
            :items="pricesRenEqu"
            :search="search"
            :loading="loading"
            :footer-props="{ showFirstLastPage: true }"
            :mobile-breakpoint="0"
            class="elevation-1"
            :no-data-text="'No hay datos disponibles'"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ getTypeRent(item.rent.typeRent) }}</td>
                <td>
                  {{ item.rent.valueStaffVip }} <!-- Precio para Staff Vip -->
                </td>
                <td>
                  {{ item.rent.valueStaff }} <!-- Precio para Staff -->
                </td>
                <td>
                  {{ item.rent.value }} <!-- Precio para Socio comun -->
                </td>
                <td>
                  {{ item.rent.valueNonMember }} <!-- Precio para no socios -->
                </td>
                <td>
                  <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                    <v-btn>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-row>
          <v-col>
            <router-link :to="{ name: 'pricesForm', params: { rent: true } }">
              <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <!-- Pago Pilotos -->
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Fee Coachs</span>            
          </v-card-title>
          <v-data-table
            :headers="headersPaymentCoachs"
            :items="pricesPaymentCoach"
            :loading="loading"
            :footer-props="{ showFirstLastPage: true }"
            :mobile-breakpoint="0"
            class="elevation-1"
            :no-data-text="'No hay datos disponibles'"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ getTypeAlt(item.coachPayment.typeAlt) }}</td>
                <td>
                  {{ item.coachPayment.value }}
                </td>
                <td>
                  {{ getTypeCatCoach(item.coachPayment.category_coach) }}
                </td>
                <td>
                  <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                    <v-btn>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
    
        <v-row>
          <v-col>
            <router-link :to="{ name: 'pricesForm', params: { coachPayment: true } }">
              <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
      <!-- Pago a Instructores TDM -->
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Pago a Instructores TDM</span>   
          </v-card-title>
          <v-data-table
            :headers="headertdmInstrPayment"
            :items="tdmInstrPayment"
            :search="search"
            :loading="loading"
            :footer-props="{ showFirstLastPage: true }"
            :mobile-breakpoint="0"
            class="elevation-1"
            :no-data-text="'No hay datos disponibles'"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ getTypeAlt(item.tdmInstrPayment.typeAlt) }}</td>
                <td>
                  {{ item.tdmInstrPayment.value }}
                </td>
                <td>
                  <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                    <v-btn>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-row>
          <v-col>
            <router-link :to="{ name: 'pricesForm', params: { InstrPayment: true } }">
              <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
 
      <!-- Pago a instructores-->
    <v-row>
    </v-row>
    
    <!-- ALUMNO Y bAUTISMOS -->
    <v-row>
        <v-col xs="12" sm="6">
          <v-card>
            <v-card-title>
              <span class="custom-font pink--text" style="font-size: 1.8rem;">TDMs</span>            
            </v-card-title>
            <v-data-table
              :headers="headerTdmPrices"
              :items="pricesTdmJumps"
              :search="search"
              :loading="loading"
              :footer-props="{ showFirstLastPage: true }"
              :mobile-breakpoint="0"
              class="elevation-1"
              :no-data-text="'No hay datos disponibles'"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ getTdmText(item.tandemJumps.typeAlt) }}</td>
                  <td>
                    {{ item.tandemJumps.value }}
                  </td>
                  <td>
                    <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                      <v-btn>
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                    </router-link>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
          <v-row>
            <v-col>
              <router-link :to="{ name: 'pricesForm', params: { TdmJumps: true } }">
                <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
        <v-col xs="12" sm="6">
          <v-card>
            <v-card-title>
              <span class="custom-font pink--text" style="font-size: 1.8rem;">Escuela</span>            
            </v-card-title>
            <v-data-table
              :headers="headerStudentPrices"
              :items="pricesStudents"
              :search="search"
              :loading="loading"
              :footer-props="{ showFirstLastPage: true }"
              :mobile-breakpoint="0"
              class="elevation-1"
              :no-data-text="'No hay datos disponibles'"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ getStudentsText(item.students.typeCategory) }}</td>
                  <td>
                    {{ item.students.value }}
                  </td>
                  <td>
                    <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                      <v-btn>
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                    </router-link>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
          <v-row>
            <v-col>
              <router-link :to="{ name: 'pricesForm', params: { students: true } }">
                <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    
      <v-row>
      <!-- Pago Pilotos -->
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Pago Pilotos</span>            
          </v-card-title>
          <v-data-table
            :headers="headersPaymentPilots"
            :items="pricesPaymentPilots"
            :search="search"
            :loading="loading"
            :footer-props="{ showFirstLastPage: true }"
            :mobile-breakpoint="0"
            class="elevation-1"
            :no-data-text="'No hay datos disponibles'"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ getTypeAlt(item.pilotPayment.typeAlt) }}</td>
                <td>
                  {{ item.pilotPayment.value }}
                </td>
                <td>
                  <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                    <v-btn>
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </router-link>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
    
        <v-row>
          <v-col>
            <router-link :to="{ name: 'pricesForm', params: { paymentPilots: true } }">
              <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
      <!-- Pago a Instructores TDM -->
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>
            <span class="custom-font pink--text" style="font-size: 1.8rem;">Otro</span>   
          </v-card-title>
        </v-card>

      </v-col>
    </v-row>
    
      <!--
      

    <v-card>
      <v-card-title>
        <span class="headline">Tandems</span>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col>
        <router-link :to="{ name: 'pricesForm', params: { equipment: true } }">
          <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text" >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>

     Ventana modal para editar o crear 
    <v-dialog v-model="showModal">
      <v-card>
        <v-card-title>
          {{ modalTitle }}
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-text-field v-model="formData.type" label="Cantidad" type="number"> holi</v-text-field>
              <v-text-field v-model="formData.rent" label="Altitud" type="number"></v-text-field>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="savePrice">Guardar</v-btn>
          <v-btn color="secondary" @click="closeModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    -->
  </v-container>
</template>

<script>
import BarriTitle from '../app/BarriTitle.vue';
export default {
  components: { 
    BarriTitle 
  },
  name: "pricesList",
  data() {
    return {
      search: "",
      loading: false,
      pricesSlots: [],
      formattedPrice: [],
      headersSlots: [
        {
          text: "Altura",
          value: "altitude",
          sortable: true, // Puedes habilitar la ordenación si es necesario
          filterable: false, // Puedes habilitar la filtración si es necesario
          "checkbox-color": "primary", // Color del checkbox de selección
          "sort-icon": "$sort", // Icono de ordenación
        },
        {
          text: "Staff VIP",
          value: "q",
          sortable: false,
          icon: 'mdi-pencil',
          key: 'otro'
        },
        {
          text: "Staff",
          value: "q",
          sortable: false,
          icon: "mdi-earth",
          key: 'adsd'
        },
        {
          text: "Socio",
          value: "q",
          sortable: false,
          icon: "mdi-earth",
          key: 'bla'
        },
        {
          text: "No Socio",
          value: "q",
          sortable: false,
          icon: "mdi-earth",
          key: 'asd'
        },
        {
          text: "Jubilado",
          value: "q",
          sortable: true,
          icon: "mdi-earth",
          key: 'calos'
        },
        {
          text: "Paquete A",
          value: "q",
          sortable: true,
          icon: "mdi-earth",
        },
        {
          text: "Paquete B",
          value: "q7",
          sortable: true,
          icon: "mdi-earth",
        }
        // 1 Staff VIP 
        // 2 Staff
        // 3 Socio
        // 4 No Socio
        // 5 Jubilado
        // 6 socio con packete A
        // 7 socio con packete B
      ],
      
      pricesPacking: [],
      headersPacking: [
        {
          text: "Tipo",
          value: "altitude",
        },
        {
          text: "USD",
          value: "additional_info",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      pricesRenEqu: [],
      headersRenEqu: [
        {
          text: "Equipos",
          value: "altitude",
        },
        {
          text: "Staff Vip",
          value: "valueStaffVip",
        },
        {
          text: "Staff",
          value: "valueStaff",
        },
        {
          text: "Socios",
          value: "additional_info",
        },
        {
          text: "No Socios",
          value: "valueNonMember",
        },
        {
          text: "editar",
          value: "actions",
        },
      ],
      pricesPaymentCoach: [],
      headersPaymentCoachs: [
        {
          text: "Altura",
          value: "altitude",
        },
        {
          text: "USD ?",
          value: "additional_info",
        },
                {
          text: "tipo de Coach",
          value: "category_coach",
        },
        {
          text: "Editar",
          value: "actions",
        },
      ],
      headersPaymentPilots: [
        {
          text: "Altura",
          value: "altitude",
        },
        {
          text: "ARG",
          value: "additional_info",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      pricesPaymentPilots: [],
      headertdmInstrPayment: [
        {
          text: "Tipo",
          value: "...................",
        },
        {
          text: "USD",
          value: "....................",
        },
        {
          text: "ARG",
          value: "....................",
        },
        {
          text: "",
          value: "actions",
        }, 
      ],
      tdmInstrPayment: [],
      headerTdmPrices: [
        {
          text: "Tipo",
          value: "...................",
        },
        {
          text: "USD",
          value: "....................",
        },
        {
          text: "ARG",
          value: "....................",
        },
        {
          text: "",
          value: "actions",
        },
         // 1 es HandyCam
          // 2 es es HandyCam con Tarjeta
          // 3 es HandyCam PXL
          // 4 es HandyCam PXL con Tarjeta

          // 5 es CON CAMAROGRAFO
          // 6 es es camarografo con Tarjeta
          // 7 es camarografo PXL
          // 8 es camarografo PXL con Tarjeta

          // 9  es VIP
          // 10 es VIP con Tarjeta

          // 11 es LOW COST
          // 12 es LOW COST Con Tarjeta
          // 13 es Low Cost PXL
          // 14 es Low Cost PXL con tarjeta

          // 15 es PROMO CAM
          // 16 es PROMO HANDYC
          // 17 es PROMO CAM con Tarjeta
          // 18 es PROMO HANDYC con Tarjeta

          //19 FEE CAM
          //20 comisiones TDMS
      ],
      pricesTdmJumps: [],
      headerStudentPrices: [
      {
          text: "Items",
          value: "altitude",
        },
        {
          text: "ARG",
          value: "additional_info",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      pricesStudents: [],
      showModal: false,
      modalTitle: "",
      priceData: {},
      item: {}
    };
  },
  created() {
    this.getPricesSlots();
    this.getPrices();
  },
  computed: {
    // funcion repetida, poner en utils.js o algo asi
          // 1 es TMB 
      // 2 es escuela 
      // 3 es deportivo
    getTypeAltWord() {
      return (typeAlt) => {
        switch (typeAlt) {
          case 1:
            return 'TDM';
          case 2:
            return 'Escuela';
          case 3:
            return 'Deportivo';
          case 4:
            return '1Esto no se deberia ver';
          default:
            return 'S/D';
        }
      }
    },
    getTypeCatCoach(){
      return (category_coach) => {
        switch (category_coach) {
          case 1:
            return 'A';
          case 2:
            return 'B';
          case 3:
            return 'C';
          case 4:
            return 'D';
          default:
            return 'S/D';
        }
      }
    },
    getTdmText(){
      return (typeTdm) => {
        switch (typeTdm) {
          case 1:
            return "HandyCam";
          case 2:
            return "HandyCam con Tarjeta";
          case 3:
            return "HandyCam PXL";
          case 4:
            return "HandyCam PXL con Tarjeta";
          case 5:
            return "Camarógrafo";
          case 6:
            return "Camarógrafo con Tarjeta";
          case 7:
            return "Camarógrafo PXL";
          case 8:
            return "Camarógrafo PXL con Tarjeta";
          case 9:
            return "VIP";
          case 10:
            return "VIP con Tarjeta";
          case 11:
            return "LOW COST";
          case 12:
            return "LOW COST Con Tarjeta";
          case 13:
            return "Low Cost PXL";
          case 14:
            return "Low Cost PXL con tarjeta";
          case 15:
            return "PROMO CAM";
          case 16:
            return "PROMO HANDYC";
          case 17:
            return "PROMO CAM con Tarjeta";
          case 18:
            return "PROMO HANDYC con Tarjeta";
          case 19:
            return "Fee Cámara TDMs";
          case 20:
            return "Comisión TDMs";
          case 21:
            return "Alquiler TDMs";
          case 30:
            return "slot TDMs 8k";
          case 31:
            return "slot TDMs 10k";
          case 32:
            return "slot TDMs 12k";
          case 33:
            return "Edición Video";
          default:
            return "Desconocido";
        }
      };
    },

    getTypeAlt(){
      return (altitude) => {
        switch (altitude) {
          case 1:
            return '5.000 ft';
          case 2:
            return '8.000 ft';
          case 3:
            return '10000 ft';
          case 4:
            return '12.000 ft';
          default:
            return 'S/D';
        }
      };
    },
    getTypeRent(){
      return (rent) => {
        switch (rent) {
          case 1:
            return 'Escuela';
          case 2:
            return 'Deportivo';
          default:
            return 'S/D';
        }
      };
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
            return "Teoría general";
          case 8:
            return "Plazas a 5k";
          case 9:
            return "Plazas a 10k";
          case 10:
            return "Plazas a 12k";
          case 11:
            return "Fee Instructor AFF";
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
            return "Teoría Coaching";
          case 20:
            return "Plaza a 8k";
          case 21:
            return "Teoría coaching a 5k";
          case 22:
            return "Plazas a 10k socio";
          default:
            return "Desconocido";
        }
      };
    }

  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    savePrice() {
      this.showModal = false;
    },
    getPricesSlots() {
      this.loading = true;
      this.$http
        .get(`${process.env.VUE_APP_PRICES}?tipo=1`)
        .then((response) => {
          const responseData = response.data.payload;
          // Crear un objeto para organizar los datos
          const formattedData = {};
          // Recorre la respuesta y organiza los datos en el objeto
          responseData.forEach((item) => {
            const altitude = item._id;

            item.prices.forEach((price) => {
              const typeStatus = price.typeStatus;
              const value = price.value;
              const priceId = price._id; // Acceso al _id del precio en el objeto price

              // Si la altura no existe en el objeto, crea un objeto vacío para ella
              if (!formattedData[altitude]) {
                formattedData[altitude] = {};
              }

              // Establece el valor en la columna correspondiente (typeStatus) y agrega el ID del precio
              formattedData[altitude][typeStatus] = { value, priceId };
            });
          });
          // Convierte el objeto en un arreglo de objetos y agrega las alturas como propiedad
          const formattedPrice = Object.keys(formattedData).map((altitude) => {
            const rowData = {
              altitude: altitude,
            };
            // Agrega las columnas correspondientes a rowData
            [1, 2, 3, 4, 5, 6, 7].forEach((typeStatus) => {
              if (formattedData[altitude] && formattedData[altitude][typeStatus]) {
                const data = formattedData[altitude][typeStatus];
                rowData[`q${typeStatus}`] = data.value;
                rowData[`priceId${typeStatus}`] = data.priceId;
              } else {
                rowData[`q${typeStatus}`] = 0;
                rowData[`priceId${typeStatus}`] = null;
              }
            });

            // Agrega el ID del precio (ajusta esto según cómo estén almacenados los IDs)
            if (formattedData[altitude] && formattedData[altitude][1]) {
              rowData.priceId = formattedData[altitude][1].priceId; // Supongamos que el typeStatus 1 contiene el ID
            } else {
              rowData.priceId = null;
            }
            // Supongamos que el typeStatus 1 contiene el ID
            console.log("rowData", rowData)
            return rowData;
          });

          this.formattedPrice = formattedPrice;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    getPrices() {
      this.loading = true;
      this.$http
        .get(`${process.env.VUE_APP_PRICES}`)
        .then((response) => {
          const prices = response.data.payload;
          //this.pricesSlots = prices.filter((price) => price.priceType === 1);
          this.pricesPacking = prices.filter((price) => price.priceType === 2);
          this.pricesRenEqu = prices.filter((price) => price.priceType === 3);
          console.log("this.pricesRenEqu", this.pricesRenEqu)
          this.pricesPaymentPilots = prices.filter((price) => price.priceType === 4);
          this.tdmInstrPayment = prices.filter((price) => price.priceType === 5);
          this.pricesTdmJumps = prices.filter((price) => price.priceType === 6);
          this.pricesStudents = prices.filter((price) => price.priceType === 7);
          this.pricesPaymentCoach = prices.filter((price) => price.priceType === 8);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>

