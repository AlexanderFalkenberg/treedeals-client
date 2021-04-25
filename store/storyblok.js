export const state = () => ({
  deals: [],
})

export const getters = {
  deals(state) {
    return state.deals
  },
}

export const mutations = {
  SET_ARTICLES(state, data) {
    state.deals = data
  },
}
