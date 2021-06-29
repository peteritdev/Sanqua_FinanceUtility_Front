<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-if="cookieUser.sanqua_company_id===0"
        cols="12"
        md="12"
      >
        <base-material-card
          color="blue"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Filter By Company
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Silahkan pilih PT yang ingin ditampilkan di dashboard ({{ cookieUser.sanqua_company_id }})
            </div>
          </template>
          <v-card-text>
            <v-select
              v-model="company"
              :items="companyItems"
              item-text="name"
              item-value="id"
              label="Select"
              persistent-hint
              return-object
              single-line
              @change="onChangeCompany"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="1"
      />

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          :value="summaryAttendances[0].total_attend"
          color="info"
          icon="mdi-account"
          title="TOTAL KEHADIRAN"
          sub-icon="mdi-calendar"
          :sub-text="summaryAttendances[0].att_date"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="1"
      />

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="red"
          icon="mdi-alarm"
          title="TOTAL KARYAWAN TERLAMBAT"
          :value="summaryAttendances[0].total_late"
          sub-icon="mdi-calendar"
          :sub-text="summaryAttendances[0].att_date"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="2"
      />
      <v-col
        cols="12"
        sm="6"
        lg="1"
      />

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="TOTAL KARYAWAN PULANG AWAL"
          :value="summaryAttendances[0].total_leave_early"
          sub-icon="mdi-calendar"
          :sub-text="summaryAttendances[0].att_date"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="1"
      />

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-calendar-clock"
          title="TOTAL KARYAWAN LEMBUR"
          :value="summaryAttendances[0].total_overtime"
          sub-icon="mdi-calendar"
          :sub-text="summaryAttendances[0].att_date"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'DashboardDashboard',

    data () {
      return {

        // Attendances Variable
        // total_attend: 0,
        summaryAttendances: [{
          att_date: '',
          total_attend: 0,
          total_late: 0,
          total_leave_early: 0,
          total_overtime: 0,
        }],
        paramAPISummaryAttendance: {},

        company: { id: '6', name: 'SMI' },
        companyItems: [
          { id: '1', name: 'IMP' },
          { id: '2', name: 'TMP' },
          { id: '3', name: 'GIT' },
          { id: '4', name: 'KAJ' },
          { id: '5', name: 'WIM' },
          { id: '6', name: 'SMI' },
        ],
        cookieUser: null,

        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Salary',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Country',
            value: 'country',
            align: 'right',
          },
          {
            sortable: false,
            text: 'City',
            value: 'city',
            align: 'right',
          },
        ],
        items: [
          {
            id: 1,
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            salary: '$35,738',
          },
          {
            id: 2,
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            salary: '$23,738',
          },
          {
            id: 3,
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            salary: '$56,142',
          },
          {
            id: 4,
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            salary: '$38,735',
          },
          {
            id: 5,
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            salary: '$63,542',
          },
        ],
        tabs: 0,
        tasks: {
          0: [
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: false,
            },
            {
              text: 'Create 4 Invisible User Experiences you Never Knew About',
              value: true,
            },
          ],
          1: [
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: false,
            },
          ],
          2: [
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    created () {
      this.getSummaryAttendance()
      this.cookieUser = JSON.parse(localStorage.getItem('user'))
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },

      onChangeCompany () {
        this.getSummaryAttendance()
      },

      getSummaryAttendance () {
        // alert(this.company.id)
        this.paramAPISummaryAttendance = {
          company_id: this.company.id,
        }
        this.$store.dispatch('report/getSummaryAttendance', this.paramAPISummaryAttendance).then(
          data => {
            console.log(JSON.stringify(data))
            this.summaryAttendances = data
          },
          error => {
            console.log('Error View:' + error)
          },
        )
      },
    },
  }
</script>
