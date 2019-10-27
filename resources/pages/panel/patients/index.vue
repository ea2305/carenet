<template lang="pug">
  main
    Title(title="Listado de pacientes" subtitle="")

    .columns.is-multiline.is-mobile.is-centered

      //- Search
      .column.is-11-desktop.is-11-mobile.mt-2
        Search( @sendSearch="sendSearch", :data="$store.state.patients.collection.data" )

      //- Filtros
      .column.is-11-desktop.is-11-mobile
        .columns.is-multiline.is-mobile
          p Filtros

      //- Tabla users data
      .column.is-11-desktop.is-11-mobile
        b-table(
          :data='$store.state.patients.collection.data',
          :mobile-cards="true"
          :paginated='true',
          :per-page='$store.state.patients.collection.perPage',
          :total.sync="$store.state.patients.collection.total"
          :current-page.sync="page"
          :backend-pagination='true'
          :hoverable="true"
        )
          template(slot-scope='props' v-if="props.row.active")
            b-table-column(field="id" label="ID" width="10" sortable) {{ props.row.id }}
            b-table-column(field="name" label="Nombre de paciente" width="40" sortable) {{ props.row.name }}
            b-table-column(field="bed" label="Número de cama" width="50") {{ props.row.bed }}
            b-table-column(field="doctor" label="Doctor" width="50" sortable) {{ (props.row.doctor) ? props.row.doctor.username : '' }}
            b-table-column(field="created_at" label="Creado" width="10") {{ $moment(props.row.created_at).format('D/M/YYYY') }}
            b-table-column(field="updated_at" label="Modificado" width="10" sortable) {{ $moment(props.row.updated_at).format('D/M/YYYY') }}

            b-table-column(field="id" label="Acciones" width="10" v-if="$auth.user.rol === 'admin'")
              .is-flex.flex-center
                nuxt-link.button.is-rounded.is-outlined.is-primary.is-small(:to="`/panel/patients/${props.row.id}`") Editar
                button.button.is-rounded.is-outlined.is-danger.is-small.ml-1(@click="showDeleteModal(props.row.id)") Eliminar

      b-modal(:active.sync="isModalActive")
        .card.is-flex.flex-center.flex-column.p-2
          h3.title Eliminar Paciente
          h4.subtitle ¿Estás seguro que deseas eliminar el recurso?
          p.is-size-5 Antes de proceder, recuerda:
          p.is-size-6.has-text-danger Esta acción no se puede revertir

          div.mt-2
            button.button.is-danger(@click="deleteElement") Eliminar
            button.button.is-primary.ml-1(@click="isModalActive = false") Cancelar
</template>

<script>
import Title from '~/components/Layout/Title'
import Search from '~/components/BaseSearch'
export default {
  layout: 'auth',
  middleware: 'auth',
	components: {
    Search,
    Title
  },
  async asyncData ({ store }) {
    store.dispatch('users/list')
  },
  data: () => ({
    // Search filter
    search: '',

    // Entity
    entity: 'patients',

    // Table
    page: 1,
    idUserSelected: null,
    isModalActive: false
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
      this.$store.commit('patients/setPage', this.page)
      this.$store.commit('patients/setSearch', this.search)
      this.$store.dispatch('patients/list')
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
      this.$store.dispatch('patients/delete', this.idUserSelected)
      this.isModalActive = false
    }
  },
  /**
	* Filter to truncate string, accepts a length parameter
	*/
	filters: {
		truncate: (val, len) => val.length > len ? `${val.substr(0, len)}...` : val
  }
}
</script>
<style lang="sass" scoped>
</style>