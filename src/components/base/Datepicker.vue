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
          v-model="company"
          :items="items"
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
          v-model="status_clockin"
          :items="items_status_clockin"
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
    name: 'Datepicker',
    data () {
      return {
        start_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
        menu1: false,
        modal: false,
        menu2: false,

        company: { id: '6', name: 'SMI' },
        items: [
          { id: '1', name: 'IMP' },
          { id: '2', name: 'TMP' },
          { id: '3', name: 'GIT' },
          { id: '4', name: 'KAJ' },
          { id: '5', name: 'WIM' },
          { id: '6', name: 'SMI' },
        ],
        status_clockin: { id: null, name: '- All Status -' },
        items_status_clockin: [
          { id: null, name: '- All Status -' },
          { id: 'on_time', name: 'On Time' },
          { id: 'late', name: 'Late' },
        ],

      }
    },
    created () {
      const xLocalStorage = JSON.parse(localStorage.getItem('user'))
      if (xLocalStorage.sanqua_company_id !== 0) {
        this.company = { id: xLocalStorage.sanqua_company_id, name: xLocalStorage.sanqua_company_name }
        this.items = [
          { id: xLocalStorage.sanqua_company_id, name: xLocalStorage.sanqua_company_name },
        ]
      }
    },
    methods: {
      submitSearch () {
        this.$emit('submitSearch', this.company, this.start_date, this.end_date, this.status_clockin)
      },
    },
  }
</script>
