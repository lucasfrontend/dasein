<template>
  <v-container fluid>
    <v-container class="text-center">
      <v-row class="d-flex flex-column">
        <v-progress-circular
          v-if="loadingStart"
          :size="74"
          color="pink"
          class="mx-auto align-center ma-8"
          indeterminate
        ></v-progress-circular>
        <BarriDataPicker
          v-else
          @dates-updated="handleDatesUpdated" 
        />
        <v-btn 
          v-if="!loadingStart"
          :loading="loading"
          color="black"
          dark 
          block
          class="mb-4"
          @click="searchUser" 
        >
          <span class="yellow--text">Buscar</span>
        </v-btn>
      </v-row>
    </v-container>
    
    <v-container>
      <div class="text-center">
        <BarriTitle 
          :titleText="`Vuelos`"
          :subtitle="subtitleText"
          :titleSize="56"
          :totalValue="finallySum"
          class="py-4"
        />
      </div>
      <!-- TOTALES VUELOS-->
      <v-row v-if="showGraph">
        <!-- Tarjeta 5k -->
        <v-col cols="3">
          <barri-mini-card :total="q_5" :text="'5K'"/>
          <!--
          <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
          -->
        </v-col>
        <!-- Tarjeta 8k -->
        <v-col cols="3">
          <barri-mini-card :total="q_8" :text="'8K'"/>
          <!--
            <barri-semi-circle :chartColor="'#00FF00'" :chartSeries="q_8" :title="'8 k'" :total="q_8"/>
          -->
        </v-col>
        <!-- Tarjeta 10k -->
        <v-col cols="3">
          <barri-mini-card :total="q_10" :text="'10K'"/>
          <!--
            <barri-semi-circle :chartColor="'#0000FF'" :chartSeries="chartS10" :title="'10 k'"/>
          -->
        </v-col>
  
        <!-- Tarjeta 12k -->
        <v-col cols="3">
          <barri-mini-card :total="q_12" :text="'12K'"/>
          <!--
            <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="chartS12" :title="'12 k'"/>
          -->
        </v-col>
      </v-row>
    </v-container>

    <BarriTitle
      v-if="showGraph" 
      :titleText="`Plazas Deportivos`"
      :subtitle="'Slots'"
      class="py-4"
      :totalValue="totalDep"
    />

    <!-- TOTAL DEPORTIVOS -->
    <v-row v-if="showGraph">
      <v-col xs="12" sm="6" md="6" lg="6" xl="6">
        <barri-simple-donut 
        :chartSeries="seriesData5k" 
        :title="chartTitle5" 
        :total="totalUSD5k" 
        :totalSlots="totalSlots5k" 
        :free="t_fd5" 
        :sum="sum5"
        />
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="6" xl="6">
        <barri-simple-donut 
          :chartSeries="seriesData8k" 
          :title="chartTitle8" 
          :total="totalUSD8k" 
          :totalSlots="totalSlots8k" 
          :free="t_fd8" 
          :sum="sum8"
        />
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="6" xl="6">
        <barri-simple-donut 
          :chartSeries="seriesData10k" 
          :title="chartTitle10" 
          :total="totalUSD10k"  
          :totalSlots="totalSlots10k" 
          :free="t_fd10" 
          :sum="sum10"
        />
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="6" xl="6">
        <barri-simple-donut 
          :chartSeries="seriesData12k" 
          :title="chartTitle12" 
          :total="totalUSD12k" 
          :totalSlots="totalSlots12k" 
          :free="t_fd12" 
          :sum="sum12"
        />
      </v-col>
    </v-row>

    <BarriTitle 
      v-if="showGraph"
      class="py-4"
      :titleText="`Total Escuela`"
      :subtitle="'Slots'"
      :totalValue="totalStudUSD"
    />
    
    <v-row v-if="showGraph">
      <v-col xs="12" sm="6" md="6" lg="6" xl="6">
        <barri-radial-bar 
          :chartSeries="seriesStud" 
          :title="'Escuela'" 
          :total="totalStudUSD" 
          :totalSlots="totalSlotStud" 
          :sum="sumStud"
          :sum5="s_s5"
          :sum8="s_s8"
          :sum10="s_s10"
          :sum12="s_s12"
        />
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="6" xl="6" class="">
        <v-row>
          <v-col cols="6">
            <barri-mini-card 
            :total="totalDataEquip.t_eq_tal" 
            :text="'TDMs'"
          />
            <!--
            <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="t_is3" 
              :text="'Dobles Asistidos'"
            />
            <!--
            <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
          -->
        </v-col>
        <v-col cols="6">
          <barri-mini-card 
            :total="t_is2" 
            :text="'Asistidos simples'"
          />
          <!--
            <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
          -->
        </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="t_is1" 
              :text="'En Etapa 3'"
            />
            <!--
              <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!--
      <v-col cols="12" md="6" lg="3">
        <donut :data="instructorsTable"></donut>
      </v-col>
    -->
    
    <BarriTitle
      v-if="showGraph" 
      :titleText="`Total TDMs`"
      :subtitle="'Slots????'"
      :totalValue="totalTdms"
    />
    
    <v-row v-if="showGraph">
      <v-col xs="12" sm="6" md="6" lg="6" xl="6" class="">
        <v-row>
          <v-col cols="6">
            <barri-mini-card 
              :total="isCam10" 
              :text="'Cam 10k'"
            />
            <!--
            <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="isCam12" 
              :text="'Cam 12k'"
            />
            <!--
            <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
          -->
          </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="q_pas" 
              :text="'Pasajeros'"
            />
            <!--
              <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="t_is1" 
              :text="'Otro'"
            />
            <!--
              <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="is_int" 
              :text="'Internos S/D'"
            />
            <!--
              <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
          <v-col cols="6">
            <barri-mini-card 
              :total="is_ext" 
              :text="'Externos'"
            />
            <!--
              <barri-semi-circle :chartColor="'#FF0000'" :chartSeries="q_5" :title="'5 k'" :total="q_t"/>
            -->
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="6" xl="6">
        <v-row>
          <v-container>
            <barri-polar-area 
              v-if="showGraph" 
              :chartSeries="seriesTdms" 
              :title="'Tandems'" 
              :totalData="totalDataTdms" 
              :totalSlots="totalSlotTdms"
              :seriesUSD="seriesUSDTDM"
              :labels="labelsTDMWithPrices"
            />
          </v-container>
        </v-row>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="6">
        <barri-bar 
          v-if="showGraph" 
          :chartSeries="equipCountByOwner" 
          :title="'Total Equipos'" 
          :colors="['#1ab7ea', '#0084ff', '#39539E', '#0077B5']" 
          :total="0"
          :totalData="totalDataEquip"
          />
      </v-col>

      <v-col cols="6">
        <!--
        <v-row>
          <v-container>
            <v-img v-if="logoPath" :src="logoPath" width="100" height="100" class="orange--text text-center"></v-img>
            <span class="custom-font pink--text pl-4" style="font-size: 2rem;">Totales</span>
            <barri-multi-radial-bar v-if="showGraph" :chartSeries="totalTandas" :title="'Total Tandas'" :total="q_t"/>
          </v-container>
        </v-row>
        -->
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
//import VueApexCharts from 'vue-apexcharts'
//import donut from '../graphics/donut.vue'
import BarriTitle from "../app/BarriTitle.vue";
import BarriDataPicker from "../app/BarriDataPicker.vue";
import moment from 'moment';
//import BarriTandasTable from "../app/BarriTandasTable.vue";
import BarriMiniCard from "../app/BarriMiniCard.vue";
//import BarriMultiRadialBar from "./BarriMultiRadialBar.vue";
import BarriSimpleDonut from "./BarriSimpleDonut.vue";
import BarriPolarArea from "./BarriPolarArea.vue";
import BarriBar from "./BarriBar.vue";
//import BarriSemiCircle from './BarriSemiCircle.vue';
import BarriRadialBar from './BarriRadialBar.vue';

export default {
  name: 'Total',
  components: {
    //BarriTandasTable,
    BarriMiniCard,
    //BarriMultiRadialBar,
    BarriTitle,
    BarriSimpleDonut,
    BarriDataPicker,
    BarriPolarArea,
    BarriBar,
    //BarriSemiCircle,
    BarriRadialBar
  },
  data() {
    return {
      loadingStart: true,
      searchPerformed: false,
      // primer grafico A 5k
      chartTitle5: '5 K',
      totalUSD5k: 0,
      seriesData5k: 0,
      totalSlots5k: [],
      sum5: 0,

      // grafico 8 k
      chartTitle8: '8 K',
      totalUSD8k: 0,
      seriesData8k: [],
      totalSlots8k: [],
      sum8: 0,

      //graficos 10 k
      chartTitle10: '10 K',
      totalUSD10k: 0,
      seriesData10k: [],
      totalSlots10k: [],
      sum10: 0,

      //graficos 12 k
      chartTitle12: '12 K',
      totalUSD12k: 0,
      seriesData12k: [],
      totalSlots12k: [],
      sum12: 0,

      //ESCUELA 
      totalStudUSD: 0,
      totalDep: 0,
      seriesStud: [],
      totalSlotStud: [],
      sumStud: 0,
      isCam10: 0,
      isCam12: 0,
      s_s5: 0,
      s_s8: 0,
      s_s10: 0, 
      s_s12: 0,

      //TDMS
      totalTdms: 0,
      seriesTdms: [ 0, 0, 0],
      totalSlotTdms: [],
      seriesUSDTDM: [],
      labelsTDMWithPrices: [],
      totalDataTdms: {
        t_q_s8: 0,
        t_q_s10: 0,
        t_q_s12: 0,
        totalUSD: 0,
      },
      q_pas: 0, // total pasajeros
      is_ext: 0,
      is_int: 0,

      // EQUIPOS boorrar
      /*
      headersEquip: [
        {
          text: "Dueño",
          value: 'alias',
        },
        {
          text: "Dueño",
          value: 'eq_t',
        },
        {
          text: "Dueño",
          value: 'alias',
        },
      ],
      */
      equipCountByOwner: [],
      t_eq_dep_soUSD: 0,
      t_eq_dep_noUSD: 0,
      t_eq_so: 0,
      t_eq_no: 0,
      totalDataEquip: {
        t_eq_dep_soUSD: 0,
        t_eq_dep_noUSD: 0,
        t_eq_so: 0,
        t_eq_no: 0,
        t_eq_tb: 0,
        t_eq_tal: 0,
        eq_tdm_alUSD: 0,
        t_free: 0,
      },


      finallySum: 0,

      loading: false,
      receivedDates: [],
      startDate: null,
      titleStartDate: null,
      endDate: null,
      titleEndDate: null,
      tandas: [],
      headers: [
        {
          text: "Numero",
          value: 'number_tanda',
        },
        {
          text: "Slot 1",
          value: 'slots[0].slot.name',
        },
        {
          text: "Slot 2",
          value: 'slots[1].slot.name',
        },
        {
          text: "Slot 3",
          value: 'slots[2].slot.name',
        },
        {
          text: "Slot 4",
          value: 'slots[3].slot.name',
        },
        {
          text: "Hora",
          value: 'time',
        },
        {
          text: "Piloto",
          value: 'pilot',
        },
        {
          text: "Avión",
          value: 'plane',
        },
        {
          text: "FT",
          value: 'altitude.value',
        },
        {
          text: "Estado",
          value: 'activate',
        },
        {
          text: "Editar",
          value: 'actions',
          sortable: false,
        },
      ],
      search: '',
      logoPath: require("../../assets/icons/graficos.png"),

      //graficos
      chartData: {
        q_sv: 0,
        q_st: 0,
        q_so: 0,
        q_ns: 0,
      },
      chartColors: ["#ffeb3b", "#ff9800", "#4CAF50", "#9c27b0"],
      showGraph: false,

      totalTandas: 0,
      q_t: 0, // total tandas
      q_5: 0, // total tandas a 5
      q_8: 0,
      q_10: 0,
      q_12: 0,

      // free ESTOS ESTOY USANDO
      t_fd5: 0, // free deportivos a 5
      t_fd8: 0, // free deportivos a 8
      t_fd10: 0, // free deportivos a 10
      t_fd12: 0, // free deportivos a 12


      //ESCUELA
      //tdms de curso
      //t_ts: 0,
      t_is3: 0,
      t_is2: 0,
      t_is1: 0,
      // NO SE USAN, BORRAR?
      chartS5: [],
      chartS8: [],
      chartS10: [],
      chartS12: [],
    }
  },
  created () {
    this.initializeDates()
    this.searchUser()
  },
  
  computed: {
    subtitleText() {
      if (this.searchPerformed) {
        return `del ${this.formatMoment(this.startDate)} al ${this.formatMoment(this.endDate)}`;
      } else {
        return `${this.formatMoment(new Date())}`;
      }
    },
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
    formattedChartData() {
      // Realiza el mapeo de nombres de etiquetas aquí
      const labelMappings = {
        q_sv: 'Staff Vip',
        q_st: 'Staff',
        q_so: 'Socios',
        q_ns: 'No Socios',
      };

      // Copia los datos originales a un nuevo objeto y cambia las etiquetas
      const formattedData = { ...this.chartData };
      for (const key in formattedData) {
        formattedData[labelMappings[key] || key] = formattedData[key];
        delete formattedData[key];
      }

      return formattedData;
    },
  },
  methods: {
    initializeDates() {
      if (!this.searchPerformed) {
        this.startDate = moment().startOf('day').toDate();
        this.endDate = moment().endOf('day').toDate();
      }
      //this.searchUser()
    },
    formatMoment(dateString) {
      //return moment(dateString).format('DD/MM/YYYY HH:mm');
      return moment(dateString).format('DD/MM/YYYY');
    },
    handleDatesUpdated({ startDate, endDate }) {
      // Aquí puedes usar startDate y endDate como desees
      console.log('Fecha de inicio:', startDate);
      this.startDate = startDate
      console.log('Fecha de fin:', endDate);
      this.endDate = endDate

      // Puedes realizar otras operaciones o hacer una solicitud al servidor con estas fechas
    },
    searchTandas() {
      this.loading = true;
        //this.$http.get(`${process.env.VUE_APP_TANDAS}?dates=${datesParam}`)
        //this.$http.get(`${process.env.VUE_APP_TANDAS}/tandasSummary/${this.startDate}/${this.endDate}`)
        this.$http.get(`http://localhost:8082/api/tandas/tandasSummary/${this.startDate}/${this.endDate}`)
          .then(res => {
            console.log("RESPUESTA", res)
            //total Tandas
            this.q_t = res.data.summary.q_t
            this.q_5 = res.data.summary.q_5; // total plazas??
            this.q_8 = res.data.summary.q_8;
            this.q_10 = res.data.summary.q_10;
            this.q_12 = res.data.summary.q_12;
            this.totalTandas = [ this.q_5, this.q_8, this.q_10, this.q_12 ]
            // DATOS USDSS
            //_________________ 5 k _______________________________
            const depStaffVipUSD5 = res.data.resUSD.udsA5.usd_t_sv5
            const depStaffUSD5 = res.data.resUSD.udsA5.usd_t_st5
            const depSociosUSD5 = res.data.resUSD.udsA5.usd_t_so5
            const depNoSocUSD5 = res.data.resUSD.udsA5.usd_t_ns5
            const depJubUSD5 = res.data.resUSD.udsA5.usd_t_ju5
            const coachUSD5 = res.data.resUSD.udsA5.usd_t_coach5
            this.seriesData5k = [depStaffVipUSD5, depStaffUSD5, depSociosUSD5, depNoSocUSD5, depJubUSD5, coachUSD5]

            this.totalUSD5k = res.data.resUSD.totalUSD.usd_tot_5
            // DATOS CANTIDAD DE SLOTSS a 5
            const sSV5 = res.data.summary.t_sv5
            const sST5 = res.data.summary.t_st5
            const sSO5 = res.data.summary.t_so5
            const sNS5 = res.data.summary.t_ns5
            const sJU5 = res.data.summary.t_ju5
            const coach5 = res.data.summary.t_coach5

            this.totalSlots5k = [ sSV5, sST5, sSO5, sNS5, sJU5, coach5 ]
            this.sum5 = sSV5 + sST5 + sSO5 + sNS5 + sJU5 + coach5
            console.log("total de slots a 5 ", this.totalSlots5k)
            //DATOS USD
            //_______________ 8 K _________________________________
            const depStaffVipUSD8 = res.data.resUSD.udsA8.usd_t_sv8
            const depStaffUSD8 = res.data.resUSD.udsA8.usd_t_st8
            const depSociosUSD8 = res.data.resUSD.udsA8.usd_t_so8
            const depNoSocUSD8 = res.data.resUSD.udsA8.usd_t_ns8
            const depJubUSD8 = res.data.resUSD.udsA8.usd_t_ju8
            const coachUSD8 = res.data.resUSD.udsA8.usd_t_coach8
            

            this.seriesData8k = [ depStaffVipUSD8, depStaffUSD8, depSociosUSD8, depNoSocUSD8, depJubUSD8, coachUSD8 ]
            console.log("this.seriesData8k", this.seriesData8k)
            this.totalUSD8k = res.data.resUSD.totalUSD.usd_tot_8
            // DATOS CANTIDAD DE SLOTSS a 8
            const sSV8 = res.data.summary.t_sv8
            const sST8 = res.data.summary.t_st8
            const sSO8 = res.data.summary.t_so8
            const sNS8 = res.data.summary.t_ns8
            const sJU8 = res.data.summary.t_ju8
            const coach8 = res.data.summary.t_coach8
            this.totalSlots8k = [ sSV8, sST8, sSO8, sNS8, sJU8, coach8 ]
            console.log("total de slots a 8 ", this.totalSlots8k)
            this.sum8 = sSV8 + sST8 + sSO8 + sNS8 + sJU8 + coach8
            //DATOS USD
            //_______________ 10 K _________________________________
            const depStaffVipUSD10 = res.data.resUSD.udsA10.usd_t_sv10
            const depStaffUSD10 = res.data.resUSD.udsA10.usd_t_st10
            const depSociosUSD10 = res.data.resUSD.udsA10.usd_t_so10
            const depNoSocUSD10 = res.data.resUSD.udsA10.usd_t_ns10
            const depJubUSD10 = res.data.resUSD.udsA10.usd_t_ju10
            const coachUSD10 = res.data.resUSD.udsA10.usd_t_coach10
            console.log("coachUSD10", coachUSD10)
            

            this.seriesData10k = [depStaffVipUSD10, depStaffUSD10, depSociosUSD10, depNoSocUSD10, depJubUSD10, coachUSD10]
            console.log("this.seriesData10k", this.seriesData10k)
            this.totalUSD10k = res.data.resUSD.totalUSD.usd_tot_10
            // DATOS CANTIDAD DE SLOTSS a 10
            const sSV10 = res.data.summary.t_sv10
            const sST10 = res.data.summary.t_st10
            const sSO10 = res.data.summary.t_so10
            const sNS10 = res.data.summary.t_ns10
            const sJU10 = res.data.summary.t_ju10
            const coach10 = res.data.summary.t_coach10
            console.log("COACH A 10", coach10)
            
            this.totalSlots10k = [ sSV10, sST10, sSO10, sNS10, sJU10, coach10 ]
            console.log("total de slots a 10 ", this.totalSlots10k)
            this.sum10 = sSV10 + sST10 + sSO10 + sNS10 + sJU10 
            //DATOS USD
            //_______________ 12 K _________________________________
            const depStaffVipUSD12 = res.data.resUSD.udsA12.usd_t_sv12
            const depStaffUSD12 = res.data.resUSD.udsA12.usd_t_st12
            const depSociosUSD12 = res.data.resUSD.udsA12.usd_t_so12
            const depNoSocUSD12 = res.data.resUSD.udsA12.usd_t_ns12
            const depJubUSD12 = res.data.resUSD.udsA12.usd_t_ju12
            const coachUSD12 = res.data.resUSD.udsA12.usd_t_coach12


            this.seriesData12k = [depStaffVipUSD12, depStaffUSD12, depSociosUSD12, depNoSocUSD12, depJubUSD12, coachUSD12]
            console.log("this.seriesData12k", this.seriesData12k)
            this.totalUSD12k = res.data.resUSD.totalUSD.usd_tot_12
            // DATOS CANTIDAD DE SLOTSS a 12
            const sSV12 = res.data.summary.t_sv12
            const sST12 = res.data.summary.t_st12
            const sSO12 = res.data.summary.t_so12
            const sNS12 = res.data.summary.t_ns12
            const sJU12 = res.data.summary.t_ju12
            const coach12 = res.data.summary.t_coach12
            
            this.totalSlots12k = [ sSV12, sST12, sSO12, sNS12, sJU12, coach12 ]
            console.log("total de slots a 12 ", this.totalSlots12k)
            this.sum12 = sSV12 + sST12 + sSO12 + sNS12 + sJU12 + coach12

            this.totalDep = this.totalUSD5k + this.totalUSD8k + this.totalUSD10k + this.totalUSD12k
            //DATOS USD
            //_______________ ESCUELA __________________
            const studUSD5 = res.data.resUSD.udsStud.usd_t_sSt5
            const studUSD8 = res.data.resUSD.udsStud.usd_t_sSt8
            const studUSD10 = res.data.resUSD.udsStud.usd_t_sSt10
            const studUSD12 = res.data.resUSD.udsStud.usd_t_sSt12
            this.seriesStud = [ studUSD5, studUSD8, studUSD10, studUSD12 ] // totales por altura
            this.totalStudUSD =  studUSD5 + studUSD8 + studUSD10 + studUSD12 // suma total en dolares esc
            //_____________ ESCUELA totales cantidades ___________________
            console.log("summary", res.data.summary)
            this.s_s5 = res.data.summary.s_s5
            this.s_s8 = res.data.summary.s_s8
            this.s_s10 = res.data.summary.s_s10
            this.s_s12 = res.data.summary.s_s12

            this.totalSlotStud = [ this.s_s5, this.s_s8, this.s_s10, this.s_s12]
            this.sumStud = this.s_s5 + this.s_s8 + this.s_s10 + this.s_s12

            this.totalDataTdms = {
              t_q_s8: res.data.summary.t_q_s8,
              t_q_s10: res.data.summary.t_q_s10,
              t_q_s12: res.data.summary.t_q_s12,
              totalUSD: res.data.summary.slots8USDTDM + res.data.summary.slots10USDTDM + res.data.summary.slots12USDTDM
            };

            //totales q se muestran en tooltipsz
            this.totalSlotTdms = [ this.totalDataTdms.t_q_s8, this.totalDataTdms.t_q_s10, this.totalDataTdms.t_q_s12 ] 
            const slots8USDTDM = res.data.summary.slots8USDTDM
            const slots10USDTDM = res.data.summary.slots10USDTDM
            const slots12USDTDM = res.data.summary.slots12USDTDM
            this.seriesUSDTDM = [ slots8USDTDM, slots10USDTDM, slots12USDTDM] // completar total en dolares TDS SLOTS!!!

            const priceSlot8kTDM = res.data.summary.priceSlot8kTDM
            console.log("priceSlot8kTDM", priceSlot8kTDM)
            const priceSlot10kTDM = res.data.summary.priceSlot10kTDM
            const priceSlot12kTDM = res.data.summary.priceSlot12kTDM
            const pricesTdmsSlots = [priceSlot8kTDM, priceSlot10kTDM, priceSlot12kTDM]
            console.log("pricesTdmsSlots", pricesTdmsSlots)

            const labels = ['Slots 8k', 'Slots 10k', 'Slots 12k'];

            this.labelsTDMWithPrices = labels.map((label, index) => {
              const price = pricesTdmsSlots[index];
              return `${label} (${price} USD)`;
            });

            // `labelsWithPrices` ahora contiene los labels con los precios en USD
            console.log("LABELS CON PRECIO EN USD", this.labelsWithPrices);

            this.isCam10 = res.data.summary.isCam10
            this.isCam12 = res.data.summary.isCam12




            // deberia pasar esto al grafico 
            //this.t_ts = res.data.summary.t_ts //Tdms de Escuela
            this.t_is3 = res.data.summary.t_is3 // total doble asistidos
            this.t_is2 = res.data.summary.t_is2 // total asistidos simples
            this.t_is1 = res.data.summary.t_is1 // total alumnos solos


            const totslotStud = [ this.s_s5, this.s_s8, this.s_s10, this.s_s12]
            console.log("slots de ESCUELA", totslotStud)
            // _____________TDMS __________________________
            const t_q_8 = res.data.summary.t_q_8 // cantidad de tdms a 8
            const t_q_10 = res.data.summary.t_q_10 // cantidad de tdms a 10
            const t_q_12 = res.data.summary.t_q_12 // cantidad de tdms a 12
            console.log("Tdsm", t_q_8, t_q_10, t_q_12)
            this.seriesTdms = [t_q_8, t_q_10, t_q_12 ] // pasar totales en dolares

            const t_p_t8 = res.data.summary.t_p_t8 // cantidad pasajeros a 8
            const t_p_t10 = res.data.summary.t_p_t10 // cantidad pasajeros a 10
            const t_p_t12 = res.data.summary.t_p_t12 // cantidad pasajeros a 12
            this.q_pas = t_p_t8 + t_p_t10 + t_p_t12
            this.is_ext = res.data.summary.is_ext
            this.is_int = res.data.summary.is_int // hacer funcionar este

            //_____________ EQUIPOS ______________________
            this.equipCountByOwner = res.data.summary.equipCountByOwner
            console.log("equipCountByOwner", this.equipCountByOwner)
            this.t_eq_dep_soUSD = res.data.summary.t_eq_dep_soUSD
            this.t_eq_dep_noUSD = res.data.summary.t_eq_dep_noUSD
            this.t_eq_so = res.data.summary.t_eq_so // cantidad de alquileres socios
            this.t_eq_no = res.data.summary.t_eq_no // cantidad de alquileres no socios

            console.log("t_eq_dep_soUSD", this.t_eq_dep_soUSD)
            this.totalDataEquip = {
              t_eq_so: res.data.summary.t_eq_so, // total cantidad de equipos alquilados SOCIOS, suma escuela y deportivos
              t_eq_dep_soUSD: res.data.summary.t_eq_dep_soUSD, // total USDs alquiler SOCIOS, suma escuela y deportivos
              t_eq_no: res.data.summary.t_eq_no, // total cantidad de equipos alquilados NO SOCIOS, suma escuela y deportivos
              t_eq_dep_noUSD: res.data.summary.t_eq_dep_noUSD, // total UDS alquiler NO SOCIOS, suma escuela y deportivos
              t_eq_tb: res.data.summary.eq_tdm, // total equipos tdms (Bautismos)
              eq_tdm_USD: res.data.summary.eq_tdm_USD, // total en USD de eq tdms de bautismo
              t_eq_tal: res.data.summary.t_ts, // total equipos tandems de escuela 
              eq_tdm_alUSD: res.data.summary.eq_tdm_alUSD,
              eq_stud: res.data.summary.eq_stud,
              t_eq2_3: res.data.summary.t_eq2_3,
              t_free: res.data.summary.t_free
            },
            console.log("t_eq_dep_soUSD", this.totalDataEquip.t_eq_dep_soUSD)
            



            //______________ TOTAL FREE _____________________ y esto????
            //this.t_f5 = res.data.summary.t_f5
            //this.t_f8 = res.data.summary.t_f8
            //this.t_f10 = res.data.summary.t_f10
            //this.t_f12 = res.data.summary.t_f12
            //console.log(this.t_f5, this.t_f8, this.t_f10, this.t_f12)
            this.t_fd5 = res.data.summary.t_fd5
            this.t_fd8 = res.data.summary.t_fd8
            this.t_fd10 = res.data.summary.t_fd10
            this.t_fd12 = res.data.summary.t_fd12
            console.log(this.t_fd5, this.t_fd8, this.t_fd10, this.t_fd12)


            this.searchPerformed ? this.showGraph = true : false
            this.titleStartDate = this.formatMoment(this.startDate) 
            this.titleEndDate = this.formatMoment(this.startDate) 
            this.loading = false
            this.loadingStart = false
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
    },
    searchUser() {
      const inicioUser = moment(this.startDate).utc().format();
      const endUser = moment(this.endDate).utc().format();
      this.startDate = inicioUser
      this.endDate = endUser
      this.searchPerformed = true;
      this.searchTandas();
    },
    /*
    searchTandas() {
        this.loading = true;
        console.log("Realizar búsqueda con datos:", this.receivedDates);
          // Formatea las fechas usando Moment.js en formato ISO 8601 (con zona horaria)
          const formattedDates = this.receivedDates.map(date => {
            const utcDate = moment(date).utc().format(); // Formatea a UTC
            return utcDate;
          });

        const datesParam = formattedDates.join(','); // Convierte el array en una cadena
        console.log("datesParam:", datesParam)

        //this.$http.get(`${process.env.VUE_APP_TANDAS}?dates=${datesParam}`)
        this.$http.get(`http://localhost:8082/api/tandas?dates=${datesParam}`)
          .then(response => {
            this.tandas = response.data.payload;
            this.receivedDates = []
            this.loading = false;
            this.showGraph = true
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
    }
    */
  }
}
</script>
