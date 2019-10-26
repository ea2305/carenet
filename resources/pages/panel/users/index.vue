<template lang="pug">
  .column.is-12
    .columns.is-multiline.is-mobile.is-centered
      //- Search
      .column.is-11-desktop.is-12-mobile.mt-2
        Search( @sendSearch="sendSearch", :data="$store.state.users.collection.data" )

      //- Filtros
      .column.is-11-desktop.is-12-mobile
        .columns.is-multiline.is-mobile
          p Filtros

      //- Tabla users data
      .column.is-11-desktop.is-12-mobile
        b-table(
          :data='$store.state.users.collection.data',
          :mobile-cards="true"
          :paginated='true',
          :per-page='$store.state.users.collection.perPage',
          :total.sync="$store.state.users.collection.total"
          :current-page.sync="page"
          :backend-pagination='true'
          :hoverable="true"
        )
          template(slot-scope='props')
            b-table-column(field="id" label="ID" width="10" sortable) {{ props.row.id }}
            b-table-column(field="username" label="Nombre de usuario" width="40" sortable) {{ props.row.username }}
            b-table-column(field="email" label="Email" width="50") {{ props.row.email }}
            b-table-column(field="rol" label="Rol" width="50") {{ props.row.rol }}
            //- b-table-column(field="created_at" label="Creado" width="10") {{ $moment(props.row.created_at).format('D/M/YYYY') }}
            //- b-table-column(field="updated_at" label="Modificado" width="10" sortable) {{ $moment(props.row.updated_at).format('D/M/YYYY') }}
            
            //- b-table-column(field="id" label="Acciones" width="10" v-if="$auth.user.roles[0] === 'administrator' && $auth.user.permissions.map(e => e.slug).includes('user_management')")
              .is-flex.flex-center
                nuxt-link.button.is-rounded.is-outlined.is-primary.is-small(:to="`/panel/usuarios/${props.row.id}`") Editar
                button.button.is-rounded.is-outlined.is-danger.is-small.ml-1(@click="showDeleteModal(props.row.id)") Eliminar
        

</template>

<script>
import Search from '~/components/BaseSearch'
export default {
  // layout: 'panel',
	// loading: false,
	// middleware: ['auth'],
	components: {
		Search
  },
  async asyncData ({ store }) {
		store.dispatch('users/list')
  },
  data: () => ({
    // Search filter
    search: '',

    // Entity
    entity: 'users',
    
    // Table
		page: 1
  }),
  watch: {
		search: {
			handler: 'fetch'
		},
		page: {
      handler: 'fetch',
      immediate: true
    }
  },
  methods: {
    /**
     * Search users
     */
		sendSearch( text ){
			this.page = 1;
      this.search = text;
      this.fetch();
    },
    
		/**
     * Get users data
     */
    fetch () {
      this.$store.commit('users/setPage', this.page)
      this.$store.commit('users/setSearch', this.search)
      this.$store.dispatch('users/list')
    },

    /**
		 * Show delete modal
		 * @param {Number} id : User id reference
		 */
		showDeleteModal (id) {
			this.idUserSelected = id
			this.isModalActive = true
		},

		/**
     * Delete element
     */
    deleteElement () {
      this.$store.dispatch('users/delete', this.idUserSelected)
      this.isModalActive = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>