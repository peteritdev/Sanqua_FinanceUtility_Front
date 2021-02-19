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
        class="elevation-1 row-pointer"
        :headers="headers"
        :items="currency"
        :options.sync="options"
        :server-items-length="totalCurrencyData"
        :loading="loading"
        @click:row="rowClick"
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
        },
        currency: [],
        headers: [
          {
            text: 'Code',
            value: 'code',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Symbol',
            value: 'symbol',
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
        this.$store.dispatch('currency/getCurrencyList', this.paramAPI).then(
          data => {
            this.currency = data.data
            console.log(this.currency)
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

      showModalConfirmDelete (pValue) {
        this.$confirm('Are you sure you want delete this data?.', 'Confirmation', 'question')
          .then(() => {
            const paramAPIDelete = {
              id: pValue.id,
            }

            this.$store.dispatch('currency/deleteCurrency', paramAPIDelete)
              .then(
                data => {
                  this.showMsgDialog('success', data.status_msg)
                },
                error => {
                  console.log('Error delete:' + error)
                },
              )
          })
          .catch(() => {
            console.log('Cancel delete')
          })
      },

      rowClick (pItem) {
        this.$store.commit('currency/actFormCurrency', 'update')
        this.$store.commit('currency/detailCurrency', pItem)
        this.$router.push('/admin/pages/currency/form/id/' + pItem.id)
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
  .row-pointer>.v-data-table__wrapper>table>tbody>tr :hover {
    cursor: pointer;
  }
</style>
