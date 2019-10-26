import { ToastProgrammatic as Toast } from 'buefy/dist/components/toast'
import { LoadingProgrammatic } from 'buefy/dist/components/loading'

// Generic
const name = 'users'

export const state = () => ({
  search: '',
  index: null,
  entity: {},
  collection: {
    data: [],
    total: null,
    page: 1,
    perPage: 20,
    type: null,
    modality: null
  }
})

export const mutations = {
  setCollection (state, collection) {
    state.collection = collection
  },
  setEntity (state, entity) {
    state.entity = entity
  },
  setPage (state, page) {
    state.collection.page = page
  },
  setSearch (state, search) {
    state.search = search
  },
	setIndex (state, index) {
    state.index = index
  },
}

export const actions = {
  /**
   *
   * @param {Object} ctx : Nuxt context
   * @param {Number} page Page element
   */
  page ({ commit }, page) {
    commit('setPage', page)
  },

  /**
   *
   * @param {Object} ctx : Nuxt context
   * @param {String} search Page element
   */
  search ({ commit }, search) {
    commit('setSearch', search)
  },

  /**
   *
   * @param {Object} ctx : Nuxt context
   * @param {Number} index : Entity Id
   */
  async show ({ commit }, index) {
    return new Promise(async (resolve, reject) => {
      const loader = LoadingProgrammatic.open()
      try {
        let { data } = await this.$axios.get(`/${name}/${index}`)
        commit('setEntity', data)
        resolve(data)
      } catch (error) {
        reject(error)
      } finally {
        loader.close()
      }
    })
  },

  /**
   *
   * @param {Object} ctx : Nuxt context
   */
  async list ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const loader = LoadingProgrammatic.open()
      try {
        let { data } = await this.$axios.get(`/${name}`)
        commit('setCollection', data.users)
        resolve(data)
      } catch (error) {
        reject(error)
      } finally {
        loader.close()
      }
    })
  },

	/**
   *
   * @param {Object} ctx : Nuxt context
   * @param {Object} form : Entity Id
   */
  async create ({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      const loader = LoadingProgrammatic.open()
      try {
        let { data } = await this.$axios.post(`/${name}`, form)
        commit('setIndex', data.id)
        Toast.open({ message: 'Elemento creado', type: 'is-success' })
        resolve(data)
      } catch (error) {
        Toast.open({ message: 'Elemento no creado', type: 'is-danger' })
        reject(error)
      } finally {
        loader.close()
      }
    })
  },

  /**
   *
   * @param {Object} ctx : Nuxt context
   * @param {Object} params.form : Form information
   * @param {Object} params.index : Form information
   */
  async update ({ commit }, { form, index }) {
    const loader = LoadingProgrammatic.open()

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.put(`/${name}/${index}`, form)
        // notification
        Toast.open({ message: 'Elemento actualizado', type: 'is-success' })
        resolve(data)
      } catch (error) {
        Toast.open({ message: 'Elemento no actualizado', type: 'is-danger' })
        reject(error)
      } finally {
        loader.close()
      }
    })
  },

  /**
   *
   * @param {Object} ctx : Nuxt context
   * @param {Object} params.form : Form information
   * @param {Object} params.index : Form information
   */
  async updatePassword ({ commit }, { form, index }) {
    const loader = LoadingProgrammatic.open()

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.put(`/${name}/${index}/password`, form)
        // notification
        Toast.open({ message: 'Elemento actualizado', type: 'is-success' })
        resolve(data)
      } catch (error) {
        Toast.open({ message: 'Elemento no actualizado', type: 'is-danger' })
        reject(error)
      } finally {
        loader.close()
      }
    })
  },

  /**
   * Delete one element
   * @param {Object} ctx : Nuxt context
   * @param {Number} index : Entity Id
   */
  async delete ({ dispatch }, index) {
    const loader = LoadingProgrammatic.open()

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.delete(`/${name}/${index}`)
        // consultar nuevamente información
        dispatch('list')
        // Notificación exito
        Toast.open({ message: 'Usuario eliminado', type: 'is-success' })

        resolve(data)
      } catch (error) {
        Toast.open({ message: 'Usuario no eliminado', type: 'is-danger' })
        reject(error)
      } finally {
        loader.close()
      }
    })

  },
}