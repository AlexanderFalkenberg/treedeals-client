import axios from 'axios'

export const state = () => ({
  deals: [],
  currentPage: 1,
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
  SET_CURRENT_PAGE(state) {
    state.currentPage = 10
  },
}

export const actions = {
  async fetchDeals({ commit }, url) {
    let response = await axios.get(url)
    commit('PUSH_DEALS', response.data.data)
    commit('SET_CURRENT_PAGE')

    return response.data
  },
}
