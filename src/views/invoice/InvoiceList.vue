<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Invoice"
      class="px-5 py-3"
    >
      <filter-search
        @submitSearch="submitSearch"
      />
      <br><br>
      <v-data-table
        :headers="headers"
        :items="invoices"
        :options.sync="options"
        :server-items-length="totalInvoiceData"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <!-- v-btn
            color="primary"
            dark
            @click.stop="showForm=true,editItem(item)"
          >
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn-->
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

  // import FilterAccessDoorLog from '@/components/base/FilterSearchAccessDoorLog'

  export default {
    components: {
      FilterSearch: () => import('@/components/invoice/FilterSearch'),
      // UserForm: () => import('@/components/user/UserForm'),
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
        invoices: [],
        headers: [
          {
            text: 'Inv. Date',
            value: 'invoice_date',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Inv. No',
            value: 'invoice_no',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Vendor Code',
            value: 'vendor_code',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Vendor Name',
            value: 'vendor_name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Total After Tax',
            value: 'total_after_tax',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Receive Invoice Date',
            value: 'receive_invoice_date',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Potongan',
            value: 'deduction',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Sisa Hutang',
            value: 'debt_value',
            align: 'right',
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
        invoiceData: {},

        totalInvoiceData: 0,
        loading: true,
        options: {},
      }
    },

    watch: {
      options: {
        handler () {
          this.submitSearch('', 'table')
        },
        deep: true,
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

        this.$store.dispatch('invoice/getInvoiceList', this.paramAPI).then(
          data => {
            // alert('Success')
            console.log(JSON.stringify(data))
            this.invoices = data.data
            this.totalInvoiceData = data.total_record
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

      /* showImportDialog () {
        this.$fire({
          title: 'Import Data',
          html: 'Please klik "<b>Import Now</b>" if you want to upload file.<br> If you need the template, please click <a  @click=downloadTemplate(\'master_vendor\')>here</a>',
          type: 'info',
          confirmButtonText: 'Import Now',
        })
          .then(r => {

          })
      }, */

      showModalConfirmDelete (pValue) {
        this.$confirm('Are you sure you want delete this data?.', 'Confirmation', 'question')
          .then(() => {
            const paramAPIDelete = {
              id: pValue.id,
            }

            this.$store.dispatch('invoice/deleteInvoice', paramAPIDelete)
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

      editItem (value) {
        value.act = 'update'
        this.invoiceData = value
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
