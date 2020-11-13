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
    name: 'FilterPayReqList',
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
