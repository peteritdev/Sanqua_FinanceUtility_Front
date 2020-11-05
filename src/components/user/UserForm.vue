<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        @click.stop="resetForm"
      >
        <v-icon
          left
          dark
        >
          mdi-account-plus
        </v-icon>
        &nbsp;&nbsp;
        Tambah User
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="entryForm"
          v-model="valid"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-show="false"
            v-model="userData.act"
          />
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="userData.name"
                  label="User Name"
                  :rules="usernameRules"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="userData.email"
                  label="Email*"
                  required
                  :rules="emailRules"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="userData.password"
                  label="Password*"
                  type="password"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="userData.confirmPassword"
                  label="Confirm Password*"
                  type="password"
                  name="confirm"
                  :rules="(userData.act == 'add' ? confirmPasswordRules : '')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="1"
                md="12"
              >
                <v-select
                  v-model="userData.company"
                  :items="itemsFrmCompany"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                  :rules="companyRules"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
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
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

  export default {
    name: 'UserForm',
    components: {

    },
    props: {
      value: Boolean,
      userData: {
        type: Object,
        default () {
          return {
            id: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            company: {
              id: '',
              name: '',
            },
            status: 0,
            act: 'add',
          }
        },
      },
    },
    data () {
      return {

        paramAPI: {},

        valid: false,

        frmUsername: '',
        usernameRules: [
          v => !!v || 'Name is required',
        ],

        frmEmail: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid',
        ],

        frmPassword: '',

        frmConfirmPassword: '',
        confirmPasswordRules: [
          () => (this.userData.password === this.userData.confirmPassword) || 'Confirm Password must match with Password',
          v => !!v || 'Confirm password is required',
        ],

        frmCompany: { id: '0', name: 'All Company' },
        companyRules: [
          v => !!v || 'Company is required',
        ],
        itemsFrmCompany: [
          { id: '0', name: 'All Company' },
          { id: '1', name: 'IMP' },
          { id: '2', name: 'TMP' },
          { id: '3', name: 'GIT' },
          { id: '4', name: 'KAJ' },
          { id: '5', name: 'WIM' },
          { id: '6', name: 'SMI' },
        ],

        loader: null,
        loading: false,

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

    created () {
      this.frmUsername = 'Peter Susanto'
      this.frmEmail = 'peter.itdev@gmail.com'
    },

    methods: {
      onSubmit () {
        const self = this
        setTimeout(function () {
          if (self.$refs.entryForm.validate()) {
            // other codes
            // self.$emit('showMsgDialog', true)

            self.loading = true

            self.paramAPI = {
              name: self.userData.name,
              email: self.userData.email,
              password: (self.userData.password === undefined ? '' : self.userData.password),
              method: 'conventional',
              company_id: (self.userData.company.id === '' ? null : self.userData.company.id),
              type: 1,
              status: 1,
              act: self.userData.act,
              id: self.userData.id,
            }

            self.$store.dispatch('user/saveUser', self.paramAPI).then(
              response => {
                if (response.status_code === '-99') {
                  self.$emit('showMsgDialog', 'error', response.status_msg + '(' + response.error_msg + ')')
                } else {
                  console.log(JSON.stringify(response))
                  self.$emit('showMsgDialog', 'success', response.status_msg)
                }
              },
              error => {
                console.log(error)
              },
            )

            self.loading = false
            self.dialog = false
            self.resetForm()
          }
        })
      },

      resetForm () {
        this.$refs.entryForm.reset()
        this.userData.act = 'add'
      },
    },
  }
</script>

<style>

</style>
