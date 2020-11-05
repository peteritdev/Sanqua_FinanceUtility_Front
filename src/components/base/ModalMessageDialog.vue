<template>
  <v-dialog
    :value="value"
    max-width="290"
    @input="$emit('input')"
  >
    <v-card>
      <v-card-title class="headline">
        Use Google's location service?
      </v-card-title>

      <v-card-text>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          text
          @click.native="$emit('input')"
        >
          Disagree
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click.native="$emit('input')"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'ModalMessageDialog',
    // props: ['value', 'message'],
    props: {
      value: Boolean,
      /* message: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: {
          modal_type: '',
          status_msg: '',
        },
      }, */
      message: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        // show: this.openMsgDialog,
      }
    },
    computed: {
      show: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        },
      },
    },
    created () {
      console.log('>>> Created')
      // console.log(this.message)
    },
  }
</script>

<style>

</style>
