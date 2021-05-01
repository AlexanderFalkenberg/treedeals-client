export const state = () => ({
  categories: [],
})

export const getters = {
  categories(state) {
    return state.categories
  },
}

export const mutations = {
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
}
