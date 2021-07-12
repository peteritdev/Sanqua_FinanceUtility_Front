<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700px"
    @close="resetForm"
  >
    <template v-slot:activator="{ on, attrs }">
      <p
        id="invoiceDetailForm"
        v-bind="attrs"
        v-on="on"
        @click="setDetail"
      >
      </p>
    </template>
    <v-card>
      <v-form
        ref="entryForm"
        v-model="valid"
        @submit.prevent="onSubmitDetail"
      >
        <v-card-title>
          <span class="text-h5">Edit Invoice</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-show="false"
            v-model="paramAPI.act"
          />
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.invoice_no"
                  label="No. Invoice"
                  readonly
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
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="selectedInvoice.description"
                  label="Keterangan"
                  :rules="descRules"
                />
              </v-col>
            </v-row>
          </v-container>

          <v-btn
            color="red darken-1"
            class="ma-2"
            text
            @click.stop="dialog = false"
            :loading="loading"
            :disabled="loading"
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
    props: ['detailInovice'],
    data () {
      return {
        dialog: false,
        paramAPI: {
          act: 'update',
          ref_type: 'invoice',
        },
        loadingAutocomplete: false,
        invoicesDropDown: [],
        valid: false,
        selectedInvoice: {
          act: '',
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
          // created_at: '',
          // updated_at: '',
          description: '',
        },
        loading: false,
        descRules: [],
      }
    },

    watch: {
      'selectedInvoice.total_after_tax'() {
        this.selectedInvoice.debt_value = this.selectedInvoice.total_after_tax - this.selectedInvoice.deduction
      },
      'selectedInvoice.deduction'() {
        this.selectedInvoice.debt_value = this.selectedInvoice.total_after_tax - this.selectedInvoice.deduction
      },
    },

    methods: {
      setDetail() {
        this.selectedInvoice = {
          act: this.paramAPI.act,
          id: this.detailInovice.id,
          invoice_date: this.detailInovice.invoice_date,
          invoice_no: this.detailInovice.invoice_no,
          invoice_due_date: this.detailInovice.invoice_due_date,
          vendor_id: this.detailInovice.vendor_id,
          vendor_code: this.detailInovice.vendor_code,
          vendor_name: this.detailInovice.vendor_name,
          total_after_tax: this.detailInovice.total_after_tax,
          receive_invoice_date: this.detailInovice.receive_invoice_date,
          deduction: this.detailInovice.deduction,
          debt_value: this.detailInovice.debt_value,
          // created_at: this.detailInovice.created_at,
          // updated_at: this.detailInovice.updated_at,
          description: this.detailInovice.description !== null ? this.detailInovice.description : '',
        }
      },
      onSubmitDetail() {
        this.descRules = [v => (v || '').length <= 20 || 'Max 20 character']
        const self = this
        setTimeout(function () {
          if (self.$refs.entryForm.validate()) {
            self.loading = true
            self.$store.dispatch('invoice/saveInvoice', self.selectedInvoice).then(
              response => {
                self.loading = false
                self.$emit('showMsgDialog', 'success', response.status_msg)
                self.resetForm()
              },
            )

            self.loading = false
            self.dialog = false
          }
        })
      },

      resetForm () {
        // this.invoicesDropDown = []
        this.dialog = false
        this.descRules = []
        this.selectedInvoice = {
          act: '',
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
          // created_at: '',
          // updated_at: '',
          description: '',
        }
      },
    },
  }
</script>

<style>

</style>
