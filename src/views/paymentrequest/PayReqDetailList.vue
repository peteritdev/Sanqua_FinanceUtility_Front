<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-data-table
      :headers="headers"
      :items="payReqDetailData"
      :options.sync="options"
      :server-items-length="totalPayReqDetailData"
      :loading="loading"
      class="elevation-1 row-pointer"
      @click:row="rowClick"
    >
      <template v-slot:[`item.actions`]="{ item }">
      <!-- <template v-slot:item.actions="{ item }"> -->
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
    </v-data-table><br>
    <pay-req-detail-form
      ref="payReqDetailForm"
      v-model="showForm"
      :header-id="payReqHeaderId"
      @showMsgDialog="showMsgDialog"
    />
  </v-container>
</template>

<script>

  // import FilterAccessDoorLog from '@/components/base/FilterSearchAccessDoorLog'

  export default {
    components: {
      PayReqDetailForm: () => import('@/components/payreq/PayReqDetailForm'),
    },
    props: ['payReqHeaderId'],
    data () {
      return {

        paramAPI: {
          header_id: null,
          keyword: '',
          offset: 0,
          limit: 0,
          order_by: [],
          order_type: [],

        },
        payReqDetailData: [],
        headers: [
          {
            text: 'Invoice No.',
            value: 'invoice.invoice_no',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Tgl. Invoice',
            value: 'invoice.invoice_date',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Tgl. Terima Faktur',
            value: 'invoice.receive_invoice_date',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Tgl. Jatuh Tempo',
            value: 'invoice.invoice_due_date',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Nilai Faktur',
            value: 'invoice.total_after_tax',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Potongan',
            value: 'invoice.deduction',
            align: 'right',
            sortable: true,
          },
          {
            text: 'Hutang',
            value: 'invoice.debt_value',
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

        totalPayReqDetailData: 0,
        loading: true,
        options: {},

        showForm: false,

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
    //   this.submitSearch('', 'default')
    },

    created () {
    //   alert('Detail List : ' + this.payReqHeaderId)
    },

    methods: {
      submitSearch (pKeyword, pTrigerBy) {
        this.loading = true
        this.paramAPI.header_id = this.payReqHeaderId

        if (pTrigerBy === 'search_button') {
          this.paramAPI.keyword = pKeyword
        }
        this.paramAPI.offset = (this.options.page === 1 ? this.options.page - 1 : (((this.options.page - 1) + this.options.itemsPerPage) - 1))
        this.paramAPI.limit = this.options.itemsPerPage
        this.paramAPI.order_by = (this.options.sortBy.length === 0 ? '' : this.options.sortBy[0])
        this.paramAPI.order_type = (this.options.sortDesc.length === 0 ? 'desc' : (this.options.sortDesc[0] === true ? 'desc' : 'asc'))
        this.$store.dispatch('payreq/getPayReqDetail', this.paramAPI).then(
          data => {
            console.log(data)
            // console.log(JSON.stringify(data.data))
            this.payReqDetailData = data.data
            this.totalPayReqDetailData = data.total_record
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
        this.submitSearch('', 'table')
        this.$emit('getPayReqHeaderById', this.payReqHeaderId)
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

            this.$store.dispatch('payreq/deletePayReqDetail', paramAPIDelete)
              .then(
                data => {
                  this.showMsgDialog('success', data.status_msg)
                  this.submitSearch('', 'table')
                  this.$emit('getPayReqHeaderById', this.payReqHeaderId)
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

      rowClick (pItem) {
        this.$router.push('/admin/pages/paymentrequest/form/id/' + pItem.id)
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
