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
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="2"
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
      <v-col
        cols="12"
        sm="3"
        md="2"
      >
        <v-btn
          color="green"
          class="ma-2 white--text"
          href="#/admin/pages/invoice/upload"
        >
          Upload
          <v-icon
            right
            dark
          >
            mdi-arrow-up-bold
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'FilterInvoiceList',
    data () {
      return {
        keyword: '',

      }
    },
    methods: {
      submitSearch () {
        this.$emit('submitSearch', this.keyword, 'search_button')
      },

    },
  }
</script>
