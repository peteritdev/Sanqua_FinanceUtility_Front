<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="1"
        md="5"
      >
        <v-text-field
          v-model="keyword"
          label="Keyword Search..."
          v-bind="attrs"
        />
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
    name: 'FilterUserList',
    data () {
      return {
        start_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
        menu1: false,
        modal: false,
        menu2: false,

        company: { id: '', name: 'All' },
        items: [
          { id: '', name: 'All' },
          { id: '1', name: 'IMP' },
          { id: '2', name: 'TMP' },
          { id: '3', name: 'GIT' },
          { id: '4', name: 'KAJ' },
          { id: '5', name: 'WIM' },
          { id: '6', name: 'SMI' },
        ],
        keyword: '',

      }
    },
    methods: {
      submitSearch () {
        this.$emit('submitSearch', this.company, this.keyword)
      },
    },
  }
</script>
