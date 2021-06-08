export const state = () => ({
  shops: [],
})

export const getters = {
  categories(state) {
    return state.shops
  },
}

export const mutations = {
  SET_SHOPS(state, data) {
    state.shops = data
  },
}
