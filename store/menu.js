export const state = () => ({
  isMenuOpen: false,
})

export const getters = {
  isMenuOpen(state) {
    return state.isMenuOpen
  },
}

export const mutations = {
  TOGGLE_MENU(state) {
    state.isMenuOpen = !state.isMenuOpen
  },
}
