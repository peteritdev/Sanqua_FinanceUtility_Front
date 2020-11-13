<template>
  <v-app
    id="login"
    class="secondary"
  >
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
          lg="4"
        >
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img
                  src="../static/login-logo.png"
                  alt="Vue Material Admin"
                  width="180"
                >
                <h1 class="flex my-4 primary--text">
                  FAT Utility System
                </h1>
              </div>
              <v-form>
                <v-text-field
                  v-model="user.email"
                  append-icon="mdi-account"
                  name="login"
                  label="Login"
                  type="text"
                  :error="error"
                  :rules="[rules.required]"
                />
                <v-text-field
                  id="password"
                  v-model="user.password"
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'mdi-account-key' : 'mdi-account-off'"
                  name="password"
                  label="Password"
                  :rules="[rules.required]"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                block
                color="primary"
                :loading="loading"
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="showResult"
      :timeout="2000"
      top
    >
      {{ result }}
    </v-snackbar>
  </v-app>
</template>

<script>
  import User from '../models/user'
  export default {
    data () {
      return {
        loading: false,
        // user: new User('peter.susanto@sanqua.co.id', 'P455uu0rd^^ok'),
        user: new User('', ''),
        hidePassword: true,
        error: false,
        showResult: false,
        result: '',
        rules: {
          required: value => !!value || 'Required.',
        },
      }
    },

    created () {
      if (this.$store.state.auth.status.loggedIn) {
        this.logout()
      }
    },

    methods: {
      login () {
        if (!this.user.email || !this.user.password) {
          this.result = 'Email and password can not be empty'
          this.showResult = true
          return
        }

        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push({ name: 'Dashboard' })
          },
          error => {
            this.error = true
            this.result = (error.response && error.response.data.status_msg) || error.message || error.toString()
            this.showResult = true
            console.log(this.result)
          },
        )
      },

      logout () {
        this.$store.dispatch('auth/logout').then(
          () => {

          },
          error => {
            this.error = true
            this.result = (error.response && error.response.data.status_msg) || error.message || error.toString()
            this.showResult = true
            console.log(this.result)
          },
        )
      },
    },
  }
</script>

<style>

</style>
