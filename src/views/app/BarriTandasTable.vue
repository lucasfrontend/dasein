<template>
  <v-data-table 
    :headers="headers" 
    :items="tandas" 
    :loading="loading" 
    :no-data-text="noDataText"
    :search="search"
  >

    <template v-slot:item.number_tanda="{ item }">
      <span class="custom-number primary--text pa-0 ma-0" >{{ item.number_tanda }}</span>
    </template>
    
    <!-- Slot 1 -->
    <template v-slot:item.slots[0].slot.name="{ item }">
      <td :class="{
        'tdmColor': item.slots[0].slot.is_tandem, 
        'studentStyles': item.slots[0].slot.is_tandem_al || item.slots[0].slot.is_aff || (item.slots[0].slot.is_student && (item.slots[0].slot.is_student.level === 1 || item.slots[0].slot.is_student.level === 2 || item.slots[0].slot.is_student.level === 3)), 
        'iscoachStyles': item.slots[0].slot.is_coach, 
        }">
        {{ item.slots[0].slot.name }}
      </td>
    </template>
    
    <!-- Slot 2 -->
    <template v-slot:item.slots[1].slot.name="{ item }">
      <td :class="{
        'tdmColor': item.slots[1].slot && item.slots[1].slot.tandemOptions,
        'iscoachStyles': item.slots[1].slot.is_coachee,
        'studentStyles': item.slots[1].slot.is_tandem_al || item.slots[1].slot.is_aff || (item.slots[1].slot.is_student && (item.slots[1].slot.is_student.level === 1 || item.slots[1].slot.is_student.level === 2 || item.slots[1].slot.is_student.level === 3)),              
        }">
        {{ item.slots[1].slot.name }}
        <span v-if="item.slots[1].slot.tandemOptions && item.slots[1].slot.tandemOptions.passengers_name">
          {{ item.slots[1].slot.tandemOptions.passengers_name }}
        </span>
      </td>
    </template>

    <!-- Slot 3 -->
    <template v-slot:item.slots[2].slot.name="{ item }">
      <td :class="{
        'tdmColor': item.slots[2].slot.is_tandem || item.slots[2].slot.is_cam,
        'iscoachStyles': item.slots[2].slot.is_coachee,
        'iscoachStyles2': item.slots[2].slot.is_coach_b,
        'studentStyles': item.slots[2].slot.is_tandem_al || item.slots[2].slot.is_aff || (item.slots[2].slot.is_student && (item.slots[2].slot.is_student.level === 1 || item.slots[2].slot.is_student.level === 2 || item.slots[2].slot.is_student.level === 3)),
        }" >
        <v-icon size="22" color="gray" v-if="item.slots[2].slot.is_cam">mdi-camera-gopro</v-icon> {{ item.slots[2].slot.name }}
      </td>
    </template>

    <!-- Slot 4 -->
    <template v-slot:item.slots[3].slot.name="{ item }">
      <td :class="{
        'tdmColor': item.slots[3].slot && item.slots[3].slot.tandemOptions || item.slots[3].slot.is_cam,
        'iscoachStyles': item.slots[3].slot.is_coachee,
        'iscoachStyles2': item.slots[3].slot.is_coachee_2,
        'studentStyles': item.slots[3].slot.is_tandem_al || item.slots[3].slot.is_aff || (item.slots[3].slot.is_student && (item.slots[3].slot.is_student.level === 1 || item.slots[3].slot.is_student.level === 2 || item.slots[3].slot.is_student.level === 3)),
        }">
        <v-icon size="22" color="gray" v-if="item.slots[3].slot.is_cam">mdi-camera-gopro</v-icon> {{ item.slots[3].slot.name }} 
        <span v-if="item.slots[3].slot.tandemOptions && item.slots[3].slot.tandemOptions.passengers_name">
          {{ item.slots[3].slot.tandemOptions.passengers_name }}
        </span>
      </td>
    </template>

    <template v-slot:item.time="{ item }">
      <td v-if="item.time">
      <v-btn @click="openTimePicker(item)" :disabled="item.status.f_status === 3">{{ item.time }}</v-btn>
      </td>
      <td v-else>-</td>
    </template>

    <template v-slot:item.altitude.value="{ item }">
      <td v-if="item.altitude">{{ getTypeAltWord(item.altitude.value) }}</td>
      <td v-else>-</td>
    </template>

    <template v-slot:item.pilot="{ item }">
      <td v-if="item.pilot">{{ item.pilot.name }}</td>
      <td v-else>-</td>
    </template>

    <template v-slot:item.plane="{ item }">
      <v-btn
        @click="changePlane(item)"
        :disabled="item.status.f_status === 3"
      >{{ item.plane.name }}
      </v-btn>
    </template>

    <template v-slot:item.activate="{ item }">
      <v-btn
        @click="item.status.f_status === 1 || item.status.f_status === 2 ? showLandingConfirmation(item) : ''"
        :disabled="item.status.f_status === 3 || 
                  item.altitude.value === undefined || 
                  item.plane.name === undefined || item.pilot.name === undefined"
      >
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="green">
              <!-- Mostrar el icono de avión en tierra si flight_status es 1 -->
              <template v-if="item.status.f_status === 1">
                mdi-airplane-off
              </template>
              <!-- Mostrar el icono de despegue si flight_status es 2 -->
              <template v-else-if="item.status.f_status === 2">
                mdi-airplane-takeoff
              </template>
              <!-- Mostrar el icono de aterrizaje si flight_status es 3 -->
              <template v-else-if="item.status.f_status === 3">
                mdi-airplane-landing
              </template>
              <!-- Mostrar el icono de hastag si flight_status no es 1, 2 ni 3 -->
              <template v-else>
                mdi-pound
              </template>
            </v-icon>
          </template>
          <span>
            <template v-if="item.status.f_status === 1">
              En tierra
            </template>
            <template v-else-if="item.status.f_status === 2">
              En ascenso
            </template>
            <template v-else-if="item.status.f_status === 3">
              Finalizado
            </template>
          </span>
        </v-tooltip>
      </v-btn>
    </template>

    <template v-slot:item.actions="{ item }" hide-headers>
      <router-link :to="{ name: 'tandasForm', params: { id: item._id } }">
        <v-btn class="mr-2" :disabled="item.status.f_status === 3">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
export default {
  components: {
  },
  props: {
    headers: Array,
    tandas: Array, 
    loading: Boolean,
    noDataText: String
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    getTypeAltWord() {
      return (altitude) => {
        switch (altitude) {
          case 1:
            return '5.000 ft';
          case 2:
            return '8.000 ft';
          case 3:
            return '10.000 ft';
          case 4:
            return '12.000 ft';
          default:
            return 'S/D';
        }
      };
    }
  },
  methods: {
  },
};
</script>