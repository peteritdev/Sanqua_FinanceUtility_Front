<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Payment Request"
      class="px-5 py-3"
    >
      <filter-search
        @submitSearch="submitSearch"
      />
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="1"
        >
          <v-btn
            color="green"
            class="ma-2 white--text"
            href="#/admin/pages/paymentrequest/form"
          >
            Tambah
            <v-icon
              right
              dark
            >
              mdi-file-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="payReqData"
        :options.sync="options"
        :server-items-length="totalPayReqData"
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
      FilterSearch: () => import('@/components/payreq/FilterSearch'),
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
        payReqData: [],
        headers: [
          {
            text: 'No.',
            value: 'payreq_no',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Nama PT',
            value: 'company_name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Date',
            value: 'date',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Vendor',
            value: 'vendor_name',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Pemohon',
            value: 'requester_name',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Dept.',
            value: 'department_name',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Total',
            value: 'total',
            align: 'right',
            sortable: true,
          },
        ],

        totalPayReqData: 0,
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

    created () {

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
        this.$store.dispatch('payreq/getPayReqHeader', this.paramAPI).then(
          data => {
            console.log(JSON.stringify(data))
            console.log(JSON.stringify(this.options))

            this.payReqData = data.data
            this.totalPayReqData = data.total_record
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
