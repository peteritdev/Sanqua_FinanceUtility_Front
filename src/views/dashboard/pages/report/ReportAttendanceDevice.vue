<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Report Attendance Device"
      class="px-5 py-3"
    >
      <filter-search @submitSearch="submitSearch" />
      <v-col
        cols="3"
        sm="6"
        md="3"
      >
        <download-excel
          class="btn btn-default"
          :data="accessDoorLog"
          :fields="excel_export_fields"
          worksheet="My Worksheet"
          name="ReportAccessDoor.xls"
        >
          <v-btn
            color="green"
            class="ma-2 white--text"
          >
            Export Excel
            <v-icon
              right
              dark
            >
              mdi-download
            </v-icon>
          </v-btn>
        </download-excel>
      </v-col>
      <v-data-table
        class="table"
        :headers="headers"
        :items="accessDoorLog"
        :rows-per-page-items="[10, 25]"
      >
        <template v-slot:item.body_temperature="{ item }">
          <v-chip
            :color="getTemperatureStatus(item.body_temperature)"
            dark
          >
            {{ item.body_temperature }}
          </v-chip>
        </template>
        <template v-slot:item.use_mask="{item}">
          <v-chip
            :color="getUseMaskStatus(item.use_mask)"
            green
          >
            {{ getUseMaskName(item.use_mask) }}
          </v-chip>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>

  // import FilterAccessDoorLog from '@/components/base/FilterSearchAccessDoorLog'

  export default {
    components: {
      FilterSearch: () => import('@/components/base/FilterSearchAttendanceDeviceLog'),
    },
    data () {
      return {

        paramAPI: {
          keyword: '',
          start_date: '',
          end_date: '',
          company_id: 0,
          temperature_type: null,
        },
        accessDoorLog: [],
        headers: [
          {
            text: 'Log Time',
            value: 'attendance_time',
            align: 'left',
            sortable: true,
          },
          {
            text: 'NIK',
            value: 'employee_code',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Name',
            value: 'employee_name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Mask',
            value: 'use_mask',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Temperature',
            value: 'body_temperature',
            align: 'center',
            sortable: true,
          },
        ],

        excel_export_fields: {
          'Log Time': 'attendance_time',
          NIK: 'employee_code',
          Name: 'employee_name',
          Mask: 'use_mask',
          Temperature: 'body_temperature',
        },

        excel_export_meta: [
          [
            {
              key: 'charset',
              value: 'utf-8',
            },
          ],
        ],

      }
    },

    created () {
      /* this.$store.dispatch('report/getAccessDoorLog', this.paramAPI).then(
        data => {
          // console.log(JSON.stringify(data));
          this.attendances = data
        },
        error => {
          console.log('Error View:' + error)
        },
      ) */
    },

    methods: {
      submitSearch (pMask, pStartDate, pEndDate, pKeyword, pCompanyId, pTemperatureType) {
        this.paramAPI.keyword = pKeyword
        this.paramAPI.start_date = pStartDate
        this.paramAPI.end_date = pEndDate
        this.paramAPI.mask = pMask.id
        this.paramAPI.company_id = pCompanyId
        this.paramAPI.temperature_type = pTemperatureType

        this.$store.dispatch('report/getAttendanceDeviceLog', this.paramAPI).then(
          data => {
            // console.log(JSON.stringify(data))
            this.accessDoorLog = data
          },
          error => {
            console.log('Error View:' + error)
          },
        )
      },

      getTemperatureStatus (pTemperature) {
        // if (pType === 'in') {
        if (pTemperature >= 37.3) {
          return 'red'
        } else {
          return ''
        }
        // }
      },

      getUseMaskStatus (pMask) {
        // if (pType === 'in') {
        if (pMask === 1) {
          return ''
        } else {
          return 'red'
        }
        // }
      },

      getUseMaskName (pMask) {
        // if (pType === 'in') {
        if (pMask === 1) {
          return 'YES'
        } else {
          return 'NO'
        }
        // }
      },
    },
  }
</script>

<style>
.table {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>
