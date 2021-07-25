import axios from 'axios'

export const state = () => ({
  deals: [],
})

export const getters = {
  deals(state) {
    return state.deals
  },
}

export const mutations = {
  PUSH_DEALS(state, data) {
    state.deals.push(...data)
  },
}

export const actions = {
  async fetchDeals({ commit }, endpoint) {
    let response = await axios.get(`${process.env.baseUrl}/${endpoint}`)
    commit('PUSH_DEALS', response.data.data)
  },
}
