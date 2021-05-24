<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        @click.stop="resetForm"
      >
        Add Line
      </v-btn>
    </template>
    <v-card>
      <v-form
        ref="entryForm"
        v-model="valid"
        @submit.prevent="onSubmitDetail"
      >
        <v-card-title>
          <span class="headline">Add Line Payment Request</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-show="false"
            v-model="this.paramAPI.act"
          />
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-autocomplete
                  v-model="selectedInvoice"
                  :loading="loadingAutocomplete"
                  :items="invoicesDropDown"
                  :search-input.sync="searchInvoice"
                  item-text="invoice_no"
                  item-value="id"
                  cache-items
                  class="mx-1"
                  flat
                  hide-no-data
                  hide-details
                  label="Search Invoice"
                  return-object
                  @change="changeSelectInvoice"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="selectedInvoice.invoice_date"
                  label="Tgl.Invoice"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="selectedInvoice.invoice_due_date"
                  label="Tgl.Jatuh Tempo"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="selectedInvoice.receive_invoice_date"
                  label="Tgl. Terima Invoice"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.vendor_code"
                  label="Kode Vendor"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.vendor_name"
                  label="Nama Vendor"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.total_after_tax"
                  label="Total"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.deduction"
                  label="Potongan"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.debt_value"
                  label="Hutang"
                  readonly
                />
              </v-col>
            </v-row>
          </v-container>

          <v-btn
            color="red darken-1"
            class="ma-2"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            type="submit"
            color="blue darken-1"
            class="ma-2"
            :loading="loading"
            :disabled="loading"
          >
            Simpan
          </v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      headerId: {
        type: String,
        default () {
          return ''
        },
      },
    },
    data () {
      return {
        paramAPI: {
          act: 'add',
          header_id: '',
          ref_type: 'invoice',
          ref_id: '',
          description: '',
          total: 0,
          note: '',
        },
        loadingAutocomplete: false,
        invoicesDropDown: [],
        searchInvoice: null,
        valid: false,
        selectedInvoice: {
          id: '',
          invoice_date: '',
          invoice_no: '',
          invoice_due_date: '',
          vendor_id: '',
          vendor_code: '',
          vendor_name: '',
          total_after_tax: '',
          receive_invoice_date: '',
          deduction: 0,
          debt_value: 0,
          created_at: '',
          updated_at: '',
        },
        loading: false,
        /* invoiceRule: [
          v => v.data.id !== '' || 'Vendor is required',
        ], */
      }
    },

    computed: {
      dialog: {
        get () {
          return this.value
        },

        set (value) {
          this.$emit('input', value)
        },
      },
    },

    watch: {
      searchInvoice (val) {
        val && val !== this.vendorsSelect && this.getInvoiceDropDown(val)
      },
    },

    created () {
    },

    methods: {
      onSubmitDetail () {
        const self = this
        setTimeout(function () {
          self.loading = true
          self.$store.dispatch('payreq/savePayReqDetail', self.paramAPI).then(
            response => {
              self.loading = false
              self.$emit('showMsgDialog', 'success', response.status_msg)
            },
          )

          self.loading = false
          self.dialog = false
        })
      },

      getInvoiceDropDown (pKeyword) {
        this.loadingAutocomplete = true
        this.$store.dispatch('invoice/getInvoiceList', { keyword: pKeyword, offset: 0, limit: 20, order_type: 'ASC', order_by: 'invoice_no', header_id: this.headerId, mode: 'drop_down' }).then(
          response => {
            this.invoicesDropDown = response.data
            this.loadingAutocomplete = false
          },
        )
      },
      changeSelectInvoice () {
        // alert(JSON.stringify(this.selectedInvoice))
        this.paramAPI.act = 'add'
        this.paramAPI.header_id = this.headerId
        this.paramAPI.ref_type = 'invoice'
        this.paramAPI.ref_id = this.selectedInvoice.id
        this.paramAPI.description = this.selectedInvoice.invoice_no
        this.paramAPI.total = this.selectedInvoice.debt_value
        this.paramAPI.note = ''
      },

      resetForm () {
        this.$refs.entryForm.reset()
        this.invoicesDropDown = []
      },
    },
  }
</script>

<style>

</style>
