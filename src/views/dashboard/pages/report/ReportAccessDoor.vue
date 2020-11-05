<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Report Access Door"
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
      />
    </base-material-card>
  </v-container>
</template>

<script>

  // import FilterAccessDoorLog from '@/components/base/FilterSearchAccessDoorLog'

  export default {
    components: {
      FilterSearch: () => import('@/components/base/FilterSearchAccessDoorLog'),
    },
    data () {
      return {

        paramAPI: {
          keyword: '',
          start_date: '',
          end_date: '',
          company_id: 0,
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
            value: 'nik',
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
            text: 'Company',
            value: 'company_name',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Door',
            value: 'door_name',
            align: 'center',
            sortable: false,
          },
        ],

        excel_export_fields: {
          'Log Time': 'attendance_time',
          NIK: 'nik',
          Name: 'employee_name',
          Company: 'company_name',
          Door: 'door_name',
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
      submitSearch (pCompany, pStartDate, pEndDate, pKeyword) {
        this.paramAPI.keyword = pKeyword
        this.paramAPI.start_date = pStartDate
        this.paramAPI.end_date = pEndDate
        this.paramAPI.company_id = pCompany.id

        this.$store.dispatch('report/getAccessDoorLog', this.paramAPI).then(
          data => {
            // console.log(JSON.stringify(data))
            this.accessDoorLog = data
          },
          error => {
            console.log('Error View:' + error)
          },
        )
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
