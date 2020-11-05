<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Report Daily Attendance"
      class="px-5 py-3"
    >
      <!--v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Name
            </th>
            <th class="primary--text">
              Country
            </th>
            <th class="primary--text">
              City
            </th>
            <th class="text-right primary--text">
              Salary
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
            </td>
          </tr>
        </tbody>
      </v-simple-table-->
      <datepicker @submitSearch="submitSearch" />
      <!-- v-col
        cols="3"
        sm="3"
        md="3"
      >
        <download-excel
          class="btn btn-default"
          :data="attendances"
          :fields="excel_export_fields"
          worksheet="My Worksheet"
          name="ReportDailyAttendance.xls"
        >
          <v-btn
            color="green"
            class="ma-2 white--text"
          >
            Export Raw Data
            <v-icon
              right
              dark
            >
              mdi-download
            </v-icon>
          </v-btn>
        </download-excel>
      </v-col -->
      <v-col
        cols="3"
        sm="3"
        md="3"
      >
        <download-csv
          class="btn btn-default"
          :data="recapitulationAttendances"
          worksheet="My Worksheet"
          name="ReportRecapitulationAttendance.csv"
        >
          <v-btn
            color="green"
            class="ma-2 white--text"
          >
            Export Recapitulation
            <v-icon
              right
              dark
            >
              mdi-download
            </v-icon>
          </v-btn>
        </download-csv>
      </v-col>
      <v-data-table
        class="table"
        :headers="headers"
        :items="attendances"
        :rows-per-page-items="[10, 25]"
      >
        <template v-slot:item.clock_in="{ item }">
          <v-chip
            :color="getColorStatus(item.status_clock_in)"
            green
          >
            {{ item.clock_in }}
          </v-chip>
        </template>
        <template v-slot:item.clock_out="{ item }">
          <v-chip
            :color="getColorStatus(item.status_clock_out)"
            green
          >
            {{ item.clock_out }}
          </v-chip>
        </template>
        <template v-slot:item.body_temperature_in="{ item }">
          <v-chip
            :color="getTemperatureStatus(item.body_temperature_in)"
            green
          >
            {{ item.body_temperature_in }}
          </v-chip>
        </template>
        <template v-slot:item.use_mask_in="{ item }">
          <v-chip
            :color="getUseMaskStatus(item.use_mask_in)"
            green
          >
            {{ item.use_mask_in }}
          </v-chip>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>

  import Datepicker from '@/components/base/Datepicker'

  export default {
    components: {
      Datepicker,
    },
    data () {
      return {

        paramAPI: {
          keyword: '',
          start_date: '2020-08-28',
          end_date: '2020-08-28',
          company_id: null,
          department_id: null,
          status_clock_in: '',
        },
        attendances: [],
        recapitulationAttendances: [],
        headers: [
          {
            text: 'NIK',
            value: 'nik',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Name',
            value: 'employee_name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Att. Date',
            value: 'date',
            align: 'center',
            sortable: true,
          },
          /* {
          text: 'Company',
          value: 'company_name',
          align: 'center',
          sortable: false,
        }, */
          {
            text: 'Clock In',
            value: 'clock_in',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Temperature',
            value: 'body_temperature_in',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Mask',
            value: 'use_mask_in',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Clock Out',
            value: 'clock_out',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Working Hours',
            value: 'working_hours',
            align: 'center',
            sortable: true,
          },
        ],

        excel_export_fields: {
          NIK: 'nik',
          Name: 'employee_name',
          'Attendance Date': 'date',
          Company: 'company_name',
          'Clock In': 'clock_in',
          Temperature: 'body_temperature_in',
          Mask: 'use_mask_in',
          'Clock Out': 'clock_out',
          'Working Hours': 'working_hours',
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
      this.$store.dispatch('report/getDailyAttendance', this.paramAPI).then(
        data => {
          console.log(JSON.stringify(data))
          this.attendances = data
        },
        error => {
          console.log('Error View:' + error)
        },
      )

      this.$store.dispatch('report/getRecapitulationAttendance', this.paramAPI).then(
        data => {
          // console.log(JSON.stringify(data.formed_data))
          this.recapitulationAttendances = data.formed_data
        },
        error => {
          console.log('Error View:' + error)
        },
      )
    },

    methods: {
      submitSearch (pCompany, pStartDate, pEndDate, pStatusClockIn) {
        this.paramAPI.keyword = ''
        this.paramAPI.start_date = pStartDate
        this.paramAPI.end_date = pEndDate
        this.paramAPI.company_id = pCompany.id
        this.paramAPI.status_clock_in = pStatusClockIn.id

        this.$store.dispatch('report/getDailyAttendance', this.paramAPI).then(
          data => {
            // console.log(JSON.stringify(data))
            this.attendances = data
          },
          error => {
            console.log('Error View:' + error)
          },
        )

        this.$store.dispatch('report/getRecapitulationAttendance', this.paramAPI).then(
          data => {
            // console.log(JSON.stringify(data))
            // this.recapitulationAttendances = data
            console.log(JSON.stringify(data.formed_data))
            this.recapitulationAttendances = data.formed_data
          },
          error => {
            console.log('Error View:' + error)
          },
        )
      },

      getColorStatus (pStatus) {
        // if (pType === 'in') {
        if (pStatus === 'on_time' || pStatus === 'go_after_time') {
          return ''
        } else if (pStatus === 'late' || pStatus === 'go_before_time') {
          return 'red'
        }
      // }
      },

      getTemperatureStatus (pTemperature) {
        // if (pType === 'in') {
        if (pTemperature > 37.3) {
          return 'red'
        } else {
          return ''
        }
      // }
      },

      getUseMaskStatus (pMask) {
        // if (pType === 'in') {
        if (pMask === 'YES') {
          return ''
        } else if (pMask === 'NO') {
          return 'red'
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
