<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="User"
      class="px-5 py-3"
    >
      <filter-search
        @submitSearch="submitSearch"
      />
      <user-form
        v-model="showForm"
        :user-data="userData"
        @showMsgDialog="showMsgDialog"
      /><br><br>
      <v-data-table
        class="table"
        :headers="headers"
        :items="users"
        :rows-per-page-items="[10, 25]"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            dark
            @click.stop="showForm=true,editItem(item)"
          >
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>
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
      FilterSearch: () => import('@/components/user/FilterSearchUser'),
      UserForm: () => import('@/components/user/UserForm'),
    },
    data () {
      return {

        paramAPI: {
          keyword: '',
          start_date: '',
          end_date: '',
          company_id: 0,
        },
        users: [],
        headers: [
          {
            text: 'Name',
            value: 'name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Email',
            value: 'email',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Company',
            value: 'company_name',
            align: 'left',
            sortable: false,
          },
          {
            text: '',
            value: '',
            align: 'center',
            sortable: false,
          },
          {
            text: 'Actions',
            value: 'actions',
            align: 'center',
            sortable: false,
          },
        ],
        showForm: false,
        userData: {},
      }
    },

    created () {
      /* this.$store.dispatch('report/getAccessDoorLog', this.paramAPI).then(
        data => {
          // console.log(JSON.stringify(data));
          this.attendances = data
        },
        error => {
          console.log('Error View:' + error)
        },
      ) */
      this.submitSearch({ id: '', name: 'All' }, '')
    },

    methods: {
      submitSearch (pCompany, pKeyword) {
        this.paramAPI.keyword = pKeyword
        this.paramAPI.company_id = pCompany.id

        this.$store.dispatch('user/getUserList', this.paramAPI).then(
          data => {
            // console.log(JSON.stringify(data))
            this.users = data
          },
          error => {
            console.log('Error View:' + error)
          },
        )
      },

      showMsgDialog (pModalType, pStatusMsg) {
        /* this.modalMsg = {
          modal_type: pModalType,
          status_msg: pStatusMsg,
        }
        this.modalMsg2 = 'test 123'
        this.openMsgDialog = pStatus */
        this.$fire({
          title: (pModalType === 'error' ? 'Failed' : 'Success'),
          text: pStatusMsg,
          type: pModalType,
          timer: 3000,
        }).then(r => {
        })
        this.submitSearch({ id: '', name: 'All' }, '')
      },

      showModalConfirmDelete (pValue) {
        this.$confirm('Are you sure you want delete this data?.', 'Confirmation', 'question')
          .then(() => {
            const paramAPIDelete = {
              id: pValue.id,
            }

            this.$store.dispatch('user/deleteUser', paramAPIDelete)
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

      editItem (value) {
        value.company = {
          id: (value.company_id !== null ? (value.company_id).toString() : value.company_id),
          name: value.company_name,
        }
        value.act = 'update'
        this.userData = value
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
