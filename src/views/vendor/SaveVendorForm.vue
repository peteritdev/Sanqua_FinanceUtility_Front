<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Vendor Form"
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
              #{{ paramAPI.name }}
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
              md="6"
            >
              <v-text-field
                v-model="paramAPI.name"
                clearable
                :rules="vendorRule"
                label="Nama Vendor"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="2"
            />
            <v-col
              cols="12"
              sm="1"
              md="2"
            >
              <v-text-field
                v-model="paramAPI.Code"
                clearable
                label="Code"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="2"
            >
              <v-text-field
                v-model="paramAPI.interval_due_date"
                clearable
                :rules="dueDateRule"
                label="Interval Due Date"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="6"
            >
              <v-text-field
                v-model="paramAPI.account_number"
                clearable
                :rules="accountNumRule"
                label="Nomor Rekening"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="2"
            />
            <v-col
              cols="12"
              sm="1"
              md="2"
            >
              <v-select
                v-model="paramAPI.payment_method"
                :items="paymentMethods"
                item-text="name"
                item-value="id"
                label="Metode Pembayaran"
                persistent-hint
                :rules="paymentMethodRule"
                clearable
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="2"
            >
              <v-text-field
                v-model="paramAPI.bank_name"
                clearable
                :rules="bankRule"
                label="Bank"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="6"
            >
              <v-text-field
                v-model="paramAPI.account_name"
                clearable
                :rules="accountNameRule"
                label="Atas Nama"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="2"
            />
            <v-col
              cols="12"
              sm="1"
              md="2"
            />
            <v-col
              cols="12"
              sm="1"
              md="2"
            >
              <v-autocomplete
                v-model="paramAPI.currency_id"
                :loading="loadingAutocomplete"
                :items="currencyDropdown"
                :search-input.sync="searchCurrency"
                item-text="name"
                item-value="id"
                cache-items
                class="mx-1"
                flat
                hide-no-data
                hide-details
                label="Currency"
                :rules="currencyRule"
                return-object
                clearable
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </base-material-card>
  </v-container>
</template>

<script>
  // const _sessionUser = JSON.parse(localStorage.getItem('user'))

  export default {
    components: {
    },
    data () {
      return {

        paramAPI: {
          act: 'add',
          id: null,
          name: '',
          code: '',
          interval_due_date: '',
          status: 1,
          payment_method: '',
          bank_name: '',
          account_number: '',
          account_name: '',
          currency_id: null,
        },

        // Currency
        searchCurrency: null,
        currencyDropdown: [],

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

        loading: false,
        loadingAutocomplete: false,

        // Rules
        valid: false,
        vendorRule: [
          v => !!v || 'Nama vendor is required',
        ],
        dueDateRule: [
          v => !!v || 'Interval due date is required',
        ],
        accountNumRule: [
          v => !!v || 'Nomor rekening is required',
        ],
        accountNameRule: [
          v => !!v || 'Atas nama is required',
        ],
        paymentMethodRule: [
          v => !!v || 'Metode pembayaran is required',
        ],
        bankRule: [
          v => !!v || 'Bank is required',
        ],
        currencyRule: [
          v => !!v || 'Currency is required',
        ],
      }
    },

    watch: {
    },

    mounted () {
    },

    beforeMount () {},

    created () {},

    methods: {

      showMsgDialog (pModalType, pStatusMsg) {
        this.$fire({
          title: (pModalType === 'error' ? 'Failed' : 'Success'),
          text: pStatusMsg,
          type: pModalType,
          timer: 3000,
        }).then(r => {
        })
      },
      onSubmitHeader () {
        this.showMsgDialog('success', 'vendor has been created')
      },

      resetForm () {
        this.paramAPI.act = 'add'
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
