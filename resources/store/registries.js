import { ToastProgrammatic as Toast } from 'buefy/dist/components/toast'
import { LoadingProgrammatic } from 'buefy/dist/components/loading'

// Generic
const name = 'patients'

export const state = () => ({
  page: 1,
  perPage: 10,
  rol: 'doctor',
  search: '',
  index: null,
  entity: {},
  collection: {
    data: [],
    total: null,
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
    state.page = page
  },
  setSearch (state, search) {
    state.search = search
  },
	setIndex (state, index) {
    state.index = index
  },
  setPerPage (state, perPage) {
    state.perPage = perPage
  },
  setRole (state, role) {
    state.rol = role
  }
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
        commit('setEntity', data.patient)
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
  async list ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      const loader = LoadingProgrammatic.open()
      try {
        let params = {
          page: state.page,
          search: state.search,
          perPage: state.perPage,
          rol: state.rol
        }
        let { data } = await this.$axios.get(`/${name}/${patient_id}/registries`, { params })
        commit('setCollection', data.patients)
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
  async create ({ commit }, { form, patient_id }) {
    return new Promise(async (resolve, reject) => {
      const loader = LoadingProgrammatic.open()
      try {
        let { data } = await this.$axios.post(`/${name}/${patient_id}/registries`, form)
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
        const { data } = await this.$axios.post(`/${name}/${index}/password`, form)
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