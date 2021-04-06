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
  async getDeals({ commit }) {
    let response = await axios.get(process.env.baseUrl + '/api/home')
    commit('PUSH_DEALS', response.data.data)
  },
}
