<template lang="pug">
  .column.is-12
    .columns.is-multiline.is-mobile.is-centered
      //- Search
      .column.is-11-desktop.is-12-mobile.mt-2
        Search( @sendSearch="sendSearch", :data="data" )
        //- :data="$store.state.users.collection.data"

      //- Filtros
      .column.is-11-desktop.is-12-mobile
        .columns.is-multiline.is-mobile
          p Filtros

      //- Tabla users data
      .column.is-11-desktop.is-12-mobile
        p Tabla

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
		store.dispatch('users/get')
  },
  data: () => ({
    data:[{}],
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
      // immediate: true
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