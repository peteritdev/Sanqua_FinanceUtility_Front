<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start_date"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="start_date"
            @input="menu1 = false"
          />
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="end_date"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="end_date"
            @input="menu2 = false"
          />
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="1"
        md="2"
      >
        <v-select
          v-model="mask"
          :items="items"
          item-text="name"
          item-value="id"
          label="Select"
          persistent-hint
          return-object
          single-line
        />
      </v-col>
      <!-- v-col
        cols="12"
        sm="1"
        md="2"
      >
        <v-text-field
          v-model="keyword"
          label="Keyword"
          prepend-icon=""
        />
      </v-col-->
      <v-col
        cols="12"
        sm="1"
        md="2"
      >
        <v-select
          v-model="company"
          :items="itemCompanies"
          item-text="name"
          item-value="id"
          label="Select"
          persistent-hint
          return-object
          single-line
        />
      </v-col>
      <v-col
        cols="12"
        sm="1"
        md="2"
      >
        <v-select
          v-model="temperatureType"
          :items="itemTemperature"
          item-text="name"
          item-value="id"
          label="Select"
          persistent-hint
          return-object
          single-line
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="1"
      >
        <v-btn
          color="blue"
          class="ma-2 white--text"
          @click="submitSearch"
        >
          Search
          <v-icon
            right
            dark
          >
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'FilterAttendanceLog',
    data () {
      return {
        start_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
        menu1: false,
        modal: false,
        menu2: false,

        mask: { id: '', name: 'MASK' },
        items: [
          { id: '', name: 'MASK (YES & NO)' },
          { id: '0', name: 'NO' },
          { id: '1', name: 'YES' },
        ],
        keyword: '',
        company: { id: '6', name: 'SMI' },
        itemCompanies: [
          { id: '1', name: 'IMP' },
          { id: '2', name: 'TMP' },
          { id: '3', name: 'GIT' },
          { id: '4', name: 'KAJ' },
          { id: '5', name: 'WIM' },
          { id: '6', name: 'SMI' },
        ],
        temperatureType: { id: '', name: 'All Temperature' },
        itemTemperature: [
          { id: '', name: 'All Temperature' },
          { id: '0', name: 'Abnormal Temperature' },
          { id: '1', name: 'Normal Temperature' },
        ],

      }
    },
    created () {
      const xLocalStorage = JSON.parse(localStorage.getItem('user'))
      if (xLocalStorage.sanqua_company_id !== 0) {
        this.company = { id: xLocalStorage.sanqua_company_id, name: xLocalStorage.sanqua_company_name }
        this.itemCompanies = [
          { id: xLocalStorage.sanqua_company_id, name: xLocalStorage.sanqua_company_name },
        ]
      }
    },
    methods: {
      submitSearch () {
        this.$emit('submitSearch', this.mask, this.start_date, this.end_date, this.keyword, this.company, this.temperatureType)
      },
    },
  }
</script>
