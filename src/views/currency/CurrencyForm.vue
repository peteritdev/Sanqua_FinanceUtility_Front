<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Currency Form"
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
              md="5"
            >
              <v-text-field
                v-model="paramAPI.symbol"
                clearable
                :rules="symbolRule"
                label="Symbol"
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
              md="5"
            >
              <v-text-field
                v-model="paramAPI.code"
                clearable
                :rules="codeRule"
                label="Code"
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
          act: '',
          // id: null,
          code: '',
          symbol: '',
        },
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
        codeRule: [
          v => !!v || 'Code is required',
        ],
        symbolRule: [
          v => !!v || 'Symbol is required',
        ],
      }
    },

    watch: {
    },

    mounted () {
    },

    beforeMount () {},

    created () {
      if (this.$route.params.id) {
        this.paramAPI = {
          act: '',
          code: this.$store.state.currency.detail.code,
          symbol: this.$store.state.currency.detail.symbol,
        }
      }
    },

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
        this.paramAPI.act = this.$store.state.currency.act
        if (this.paramAPI.act === 'update') {
          Object.assign(this.paramAPI, { id: this.$route.params.id })
        }
        this.$store.dispatch('currency/saveCurrency', this.paramAPI)
          .then(
            data => {
              this.showMsgDialog('success', data.status_msg)
              this.resetForm()
              this.$router.push('/admin/pages/currency')
            },
            error => {
              console.log(error)
            },
          )
      },

      resetForm () {
        this.$store.commit('currency/actFormCurrency', 'add')
        this.paramAPI = {
          act: '',
          code: '',
          symbol: '',
        }
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
