<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Vendor"
      class="px-5 py-3"
    >
      <filter-search
        @submitSearch="submitSearch"
      />
      <br><br>
      <v-data-table
        class="elevation-1 row-pointer"
        :headers="headers"
        :items="vendors"
        :options.sync="options"
        :server-items-length="totalVendorData"
        :loading="loading"
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
          </v-btn -->
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
      FilterSearch: () => import('@/components/vendor/FilterSearch'),
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
        vendors: [],
        headers: [
          {
            text: 'Code',
            value: 'code',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Name',
            value: 'name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Interval Due (Days)',
            value: 'interval_due_date',
            align: 'right',
            sortable: false,
          },
          {
            text: 'Payment Method',
            value: 'payment_method',
            align: 'center',
            sortable: false,
          },
          {
            text: 'Bank',
            value: 'bank_name',
            align: 'center',
            sortable: false,
          },
          {
            text: 'Account No.',
            value: 'account_number',
            align: 'center',
            sortable: false,
          },
          {
            text: 'Account Name',
            value: 'account_name',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Currency',
            value: 'currency_name',
            align: 'center',
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
        vendorData: {},
        totalVendorData: 0,
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
            this.vendors = data.data
            this.totalVendorData = data.total_record
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

            this.$store.dispatch('vendor/deleteVendor', paramAPIDelete)
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

      // editItem (value) {
      //   value.act = 'update'
      //   this.vendorData = value
      // },
      rowClick (pItem) {
        this.$store.commit('vendor/actFormVendor', 'update')
        this.$store.commit('vendor/detailVendor', pItem)
        this.$router.push('/admin/pages/vendor/form/id/' + pItem.id)
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
