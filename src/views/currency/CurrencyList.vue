<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-currency-usd"
      title="Currency"
      class="px-5 py-3"
    >
      <filter-search
        @submitSearch="submitSearch"
      />
      <br><br>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="currency"
        :options.sync="options"
        :server-items-length="totalCurrencyData"
        :loading="loading"
      >
        <template v-slot:[`item.actions`]="{ item }">
          &nbsp;
          <v-btn
            color="red"
            dark
            @click.stop="showModalConfirmDelete(item)"
          >
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>

  export default {
    components: {
      FilterSearch: () => import('@/components/currency/FilterSearch'),
    },
    data () {
      return {

        paramAPI: {
          keyword: '',
          offset: 0,
          limit: 0,
          order_by: [],
          order_type: [],
        },
        currency: [],
        headers: [
          {
            text: 'No',
            value: 'no',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Currency Name',
            value: 'currency_name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Currency Symbol',
            value: 'currency_symbol',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Actions',
            value: 'actions',
            align: 'center',
            sortable: false,
          },
        ],
        showForm: false,
        currencyData: {},
        totalCurrencyData: 0,
        loading: true,
        options: {},
      }
    },

    watch: {
      options: {
        handler () {
          this.submitSearch('', 'table')
        },
      },
    },

    mounted () {
      this.submitSearch('', 'default')
    },

    methods: {
      submitSearch (pKeyword, pTrigerBy) {
        this.loading = true

        if (pTrigerBy === 'search_button') {
          this.paramAPI.keyword = pKeyword
        }

        this.paramAPI.offset = (this.options.page === 1 ? this.options.page - 1 : (((this.options.page - 1) + this.options.itemsPerPage) - 1))
        this.paramAPI.limit = this.options.itemsPerPage
        this.paramAPI.order_by = (this.options.sortBy.length === 0 ? '' : this.options.sortBy[0])
        this.paramAPI.order_type = (this.options.sortDesc.length === 0 ? 'desc' : (this.options.sortDesc[0] === true ? 'desc' : 'asc'))

        this.$store.dispatch('vendor/getVendorList', this.paramAPI).then(
          data => {
            console.log(JSON.stringify(data))
            this.currency = data.data
            this.totalCurrencyData = data.total_record
          },
          error => {
            // alert('Failed')
            console.log('Error View:' + error)
          },
        )
        this.loading = false
      },

      showMsgDialog (pModalType, pStatusMsg) {
        this.$fire({
          title: (pModalType === 'error' ? 'Failed' : 'Success'),
          text: pStatusMsg,
          type: pModalType,
          timer: 3000,
        }).then(r => {
        })
        this.submitSearch('')
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
