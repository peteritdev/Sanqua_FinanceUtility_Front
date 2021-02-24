<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Upload Vendor"
      class="px-5 py-3"
    >
      <v-form
        ref="entryForm"
        v-model="valid"
        @submit.prevent="onSubmit"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              Please download template for upload <a @click="downloadTemplate">here</a>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-progress-linear v-model="progress" />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
              sm="6"
              md="10"
            >
              <v-file-input
                show-size
                label="File input"
                @change="selectFile"
              />
            </v-col>
            <v-col cols="2">
              <v-btn
                color="blue darken-1"
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                @click="upload"
              >
                Upload
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions />
      </v-form>
    </base-material-card>
    <base-material-card
      icon="mdi-clipboard-text"
      title="List Import"
      class="px-5 py-3"
    >
      <v-row>
        <v-col cols="12">
          <v-data-table
            class="table"
            :headers="headers"
            :items="uploadItems"
            :rows-per-page-items="[10,25]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            color="blue darken-1"
            class="ma-2"
            :loading="loading"
            :disabled="loading"
            @click="importItem"
          >
            Import
          </v-btn>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>

  import UploadService from '../../services/uploadservice.js'
  import axios from 'axios'

  export default {
    name: 'UploadVendorForm',
    components: {

    },
    props: {
      value: Boolean,
    },
    data () {
      return {
        valid: false,
        selectedFiles: undefined,
        currentFile: undefined,
        progress: 0,
        message: '',

        fileInfos: [],

        loader: null,
        loading: false,

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
            text: 'Interval Due Date',
            value: 'interval_due_date',
            align: 'right',
            sortable: true,
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
        uploadItems: [],
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
    methods: {
      selectFile (file) {
        this.progress = 0
        this.selectedFiles = file
      },
      upload () {
        this.progress = 0
        this.currentFile = this.selectedFiles
        UploadService.uploadVendorFromTemplate(this.currentFile, event => {
          this.progress = Math.round((100 * event.loaded) / event.total)
        })
          .then(response => {
            this.progress = 0
            this.message = response.data.message
            this.uploadItems = response.data.data
            // alert(JSON.stringify(response.data.data))
          })
          .catch(() => {
            this.progress = 0
            this.message = 'Could not upload the file'
            this.currentFile = undefined
          })

        this.selectedFiles = undefined
      },

      importItem () {
        const xParamAPI = {
          act: 'add',
          data: this.uploadItems,
        }

        this.$store.dispatch('vendor/batchSaveVendor', xParamAPI).then(
          response => {
            // alert(JSON.stringify(response))
            if (response.status_code === '00' && response.line_duplicate.length > 0) {
              let xResponseMsg = 'You have successfully import data. <br>There are some data that can not imported. Here is the data : '
              xResponseMsg += '<strong>' + JSON.stringify(response.line_duplicate) + '</strong>'

              this.showMsgDialogHtml('success', xResponseMsg)
            } else {
              this.showMsgDialogHtml('success', response.status_msg)
            }
          },
          error => {
            alert('failed : ' + error)
          },
        )
      },

      showMsgDialogHtml (pModalType, pStatusMsg) {
        this.$fire({
          title: (pModalType === 'error' ? 'Failed' : 'Success'),
          html: pStatusMsg,
          type: pModalType,
          timer: 3000,
        }).then(r => {
        })
        this.submitSearch('')
      },

      downloadTemplate (pParam) {
        axios({
          url: 'http://l10.10.20.8:6189/api/sanqua_fautility/v1/download/template/' + pParam,
          method: 'GET',
          responseType: 'blob',
        })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]))
            var fileLink = document.createElement('a')

            fileLink.href = fileURL
            fileLink.setAttribute('download', 'master_vendor_v1.0.xlsx')
            document.body.appendChild(fileLink)

            fileLink.click()
          })
      },
    },
  }
</script>
