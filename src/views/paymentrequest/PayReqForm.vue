<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Payment Request Form"
      class="px-5 py-3"
    >
      <v-form
        ref="headerForm"
        v-model="valid"
        @submit.prevent="onSubmitHeader"
      >
        <v-row>
          <v-col
            cols="12"
            sm="1"
            md="12"
          >
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="blue darken-1"
                class="ma-2"
                :loading="loading"
                :disabled="loading"
              >
                Simpan
              </v-btn>
              <v-btn
                type="button"
                color="green darken-1"
                class="ma-2"
                :loading="loadingExportPDF"
                :disabled="loadingExportPDF"
                @click.stop="exportPDF"
              >
                Export PDF
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="1"
            md="6"
          >
            <div class="font-weight-medium text-h1">
              #{{ payReqNo }}
            </div>
          </v-col>
        </v-row>
        <v-divider />

        <v-text-field
          v-show="false"
          v-model="paramAPI.act"
        />

        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="3"
            />
            <v-col
              cols="12"
              sm="1"
              md="3"
            />
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-select
                v-model="companiesSelect"
                label="Pilih PT"
                :items="companiesDropdown"
                item-value="id"
                item-text="name"
                :rules="companyRule"
                return-object
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-menu
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="paramAPI.date"
                    label="Tgl. Pengajuan"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    :rules="dateRule"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="paramAPI.date"
                  @input="menu1 = false"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-model="paramAPI.requester_name"
                label="Nama Pemohon"
                readonly
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-select
                v-model="paramAPI.payment_method"
                :items="paymentMethods"
                item-text="name"
                item-value="id"
                label="Jenis Pembayaran"
                persistent-hint
                :rules="paymentMethodRule"
                @change="selectPaymentMethod(paramAPI.payment_method)"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="6"
            >
              <v-text-field
                v-model="paramAPI.note"
                label="Untuk Pembayaran"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-model="paramAPI.department_name"
                label="Department"
                readonly
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-show="isNotCash"
                v-model="paramAPI.bank_name"
                label="Nama Bank"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-model="paramAPI.type_of_payment_request"
                label="Jenis Payment Request"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-model="paramAPI.position_name"
                label="Jabatan"
                readonly
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-show="isNotCash"
                v-model="paramAPI.account_number"
                label="No. Rekening"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-model="paramAPI.source_of_fund"
                label="Sumber Dana"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-autocomplete
                v-model="vendorsSelect"
                :loading="loadingAutocomplete"
                :items="vendorsDropdown"
                :search-input.sync="searchVendor"
                item-text="name"
                item-value="id"
                cache-items
                class="mx-1"
                flat
                hide-no-data
                hide-details
                :label="paramAPI.vendor_name"
                :rules="vendorRule"
                return-object
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="3"
            >
              <v-text-field
                v-show="isNotCash"
                v-model="paramAPI.account_name"
                label="Atas Nama"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-row>
          <v-col
            cols="12"
            sm="1"
            md="12"
          >
            <pay-req-detail-list
              v-if="isRouterId"
              ref="payReqDetailList"
              :pay-req-header-id="paramAPI.id"
              @getPayReqHeaderById="getPayReqHeaderById"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="1"
            md="8"
          />
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
            <v-simple-table>
              <tr>
                <th>
                  <div class="font-weight-medium text-h3">
                    Total
                  </div>
                </th>
                <td>
                  <div class="text-h3">
                    {{ totalDebtValue }}
                  </div>
                </td>
              </tr>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-form>
    </base-material-card>
  </v-container>
</template>

<script>

  // import FilterAccessDoorLog from '@/components/base/FilterSearchAccessDoorLog'
  // import VueHtml2pdf from 'vue-html2pdf'

  const _sessionUser = JSON.parse(localStorage.getItem('user'))

  export default {
    components: {
      PayReqDetailList: () => import('@/views/paymentrequest/PayReqDetailList'),
      // VueHtml2pdf,
      // PayReqPdf: () => import('@/components/payreq/PayReqPdf'),
    },
    data () {
      return {
        isRouterId: false,

        requesterName: '',

        payReqHeaderId: '',
        payReqNo: '',
        totalDebtValue: 0,

        paramAPI: {
          act: 'add',
          // id: null,
          requester_id: null,
          requester_name: '',
          department_id: null,
          department_name: '',
          position_id: null,
          position_name: '',

          vendor_id: null,
          vendor_name: 'Please Select Vendor',

          date: new Date().toISOString().substr(0, 10),
          payment_method: '', // 'cash',
          bank_name: '', // 'BCA',
          account_number: '', // '33865472434',
          account_name: '', // 'PETER',
          note: '', // 'Test 123',

          type_of_payment_request: '', // 'Pelunasan PO',
          source_of_fund: '', // Kas Besar',

          company_id: null,
          company_name: '',
          company_code: '',
        },
        payReqHeader: {
          type: Object,
          default () {
            return {
              vendor: {
                id: '',
                name: '',
              },
            }
          },
        },
        payReqDetails: [],
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
            text: 'Actions',
            value: 'actions',
            align: 'center',
            sortable: false,
          },
        ],

        // Vendor
        vendorsSelect: {
          id: '',
          name: '',
        },
        searchVendor: null,
        vendorsDropdown: [],

        // Payment method
        paymentMethods: [
          {
            id: 'cash',
            name: 'Cash',
          },
          {
            id: 'giro',
            name: 'Giro',
          },
          {
            id: 'check',
            name: 'Check',
          },
          {
            id: 'transfer',
            name: 'Transfer',
          },
        ],
        selectedPaymentMethod: null,

        // Company
        companiesSelect: {
          id: '',
          name: '',
          code: '',
        },
        companiesDropdown: [],

        isNotCash: false,

        loading: false,
        loadingAutocomplete: false,
        loadingExportPDF: false,

        // Rules
        valid: false,
        vendorRule: [
          v => v.id !== '' || 'Vendor is required',
          // v => (v.id !== '' && this.paramAPI.act !== 'update') || 'Vendor is required',
        ],
        paymentMethodRule: [
          v => !!v || 'Jenis Pembayaran is required',
        ],
        dateRule: [
          v => !!v || 'Tgl.Pengajuan is required',
        ],
        companyRule: [
          v => v.id !== '' || 'Nama PT is required',
        ],
      }
    },

    watch: {
      searchVendor (val) {
        val && val !== this.vendorsSelect && this.getVendorDropDown(val)
      },
    },

    mounted () {
      // this.$refs.html2Pdf.generatePdf()
    },

    beforeMount () {},
    updated () {
      // this.updateData()
    },

    created () {
      this.getCompanyDropDown()
      if (!this.$route.params.id) {
        this.$store.commit('payreq/setAddLine', false)
        this.paramAPI.requester_name = _sessionUser.employee.name
        this.paramAPI.department_name = _sessionUser.employee.department.name
        this.paramAPI.department_id = _sessionUser.employee.department.id
        this.paramAPI.position_id = _sessionUser.employee.level.id
        this.paramAPI.position_name = _sessionUser.employee.level.name
        this.paramAPI.requester_id = _sessionUser.employee_id
        this.paramAPI.act = 'add'
      } else {
        this.$store.commit('payreq/setAddLine', true)
        this.payReqHeaderId = this.$route.params.id
        this.paramAPI.id = this.$route.params.id
        // Object.assign(this.paramAPI, { id: this.$route.params.id })
        this.paramAPI.act = 'update'
        this.getPayReqHeaderById(this.$route.params.id)
        // this.$refs.payReqDetailList.submitSearch('', 'default')
      }
      this.isRouterId = this.$store.state.payreq.showButton
    },

    methods: {
      updateData (id) {
        this.getCompanyDropDown()
        this.$store.commit('payreq/setAddLine', true)
        this.payReqHeaderId = id
        this.paramAPI.id = id
        this.paramAPI.act = 'update'
        this.getPayReqHeaderById(id)
        this.isRouterId = this.$store.state.payreq.showButton
      },

      showMsgDialog (pModalType, pStatusMsg) {
        this.$fire({
          title: (pModalType === 'error' ? 'Failed' : 'Success'),
          text: pStatusMsg,
          type: pModalType,
          timer: 3000,
        }).then(r => {
        })
      },

      getVendorDropDown (pKeyword) {
        this.loadingAutocomplete = true
        this.$store.dispatch('vendor/getVendorDropDown', { keyword: pKeyword }).then(
          response => {
            this.vendorsDropdown = response
            this.loadingAutocomplete = false
            this.paramAPI.payment_method = ''
            this.paramAPI.account_name = ''
            this.paramAPI.account_number = ''
            this.paramAPI.bank_name = ''
            this.isNotCash = false
          },
        )
      },

      getCompanyDropDown () {
        this.$store.dispatch('company/getCompanyDropDown', { keyword: '' }).then(
          response => {
            console.log(JSON.stringify(response))
            this.companiesDropdown = response
          },
        )
      },

      selectPaymentMethod (pVal) {
        if (pVal === 'cash') {
          this.isNotCash = false
          this.paramAPI.bank_name = ''
          this.paramAPI.account_number = ''
          this.paramAPI.account_name = ''
        } else {
          this.getVendorById(this.vendorsSelect.id)
          this.isNotCash = true
        }
      },

      onSubmitHeader () {
        const self = this
        setTimeout(function () {
          if (self.$refs.headerForm.validate()) {
            self.paramAPI.vendor_id = self.vendorsSelect.id
            self.paramAPI.vendor_name = self.vendorsSelect.name
            self.paramAPI.company_id = self.companiesSelect.id
            self.paramAPI.company_name = self.companiesSelect.name
            self.paramAPI.company_code = self.companiesSelect.code

            self.loading = true
            self.$store.dispatch('payreq/savePayReqHeader', self.paramAPI).then(
              response => {
                if (self.paramAPI.act === 'add') {
                  self.resetForm()
                  self.$router.push('/admin/pages/paymentrequest/form/id/' + response.encrypted_id)
                  // self.getPayReqHeaderById(response.encrypted_id)
                  self.updateData(response.encrypted_id)
                  // // self.$store.commit('payreq/setAddLine', true)
                } else {
                  self.getPayReqHeaderById(self.$route.params.id)
                }

                self.loading = false
                self.showMsgDialog('success', response.status_msg)
              },
              error => {
                self.loading = false
                self.showMsgDialog('error', 'Error : ' + error)
              },
            )
          }
        })
      },

      getVendorById (pId) {
        this.$store.dispatch('vendor/getVendorById', { id: pId }).then(
          response => {
            if (response.data.payment_method !== '') {
              this.paramAPI.bank_name = response.data.bank_name
              this.paramAPI.account_number = response.data.account_number
              this.paramAPI.account_name = response.data.account_name
            }
          },
          error => {
            self.loading = false
            self.showMsgDialog('error', 'Error : ' + error)
          },
        )
      },

      getPayReqHeaderById (pId) {
        this.$store.dispatch('payreq/getPayReqHeaderById', { id: pId }).then(
          response => {
            console.log(JSON.stringify(response))
            this.payReqNo = response.payreq_no
            this.paramAPI.requester_id = response.requester_id

            this.paramAPI.requester_name = response.requester_name

            this.paramAPI.department_id = response.department_id
            this.paramAPI.department_name = response.department_name
            this.paramAPI.position_id = response.position_id
            this.paramAPI.position_name = response.position_name
            this.paramAPI.vendor_id = response.vendor_id
            this.paramAPI.vendor_name = response.vendor_name

            this.paramAPI.company_id = response.company_id
            this.paramAPI.company_name = response.company_name
            this.companiesSelect = response.company
            this.paramAPI.payment_method = response.payment_method

            if (response.payment_method !== 'cash') {
              this.isNotCash = true
              this.paramAPI.bank_name = response.bank_name
              this.paramAPI.account_number = response.account_number
              this.paramAPI.account_name = response.account_name
            }

            this.paramAPI.note = response.note
            this.paramAPI.type_of_payment_request = response.type_of_payment_request
            this.paramAPI.source_of_fund = response.source_of_fund

            this.totalDebtValue = response.total
          },
        )
      },

      resetForm () {
        // this.$refs.entryForm.reset()
        this.$store.commit('payreq/setAddLine', false)
        this.paramAPI.act = 'add'
      },

      // generateReport () {
      //   this.$refs.html2Pdf.generatePdf()
      // },

      exportPDF () {
        this.$store.dispatch('payreq/exportToPDF', { id: this.payReqHeaderId, no: this.payReqNo }).then(
          response => {
            console.log(response)
          },
        )
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
