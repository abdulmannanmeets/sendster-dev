const store = new vuex.Store({
    state: {
      userData: null,
    },
    mutations: {
      setUserData(state, userData) {
        state.userData = userData;
      },
    },
    actions: {
      fetchUserData({ commit }) {
        // Implement your logic to fetch user data here
        // Example: commit('setUserData', fetchedUserData);
      },
    },
    getters: {
      isLoggedIn(state) {
        // Define a getter to check if the user is logged in based on state.userData
        return !!state.userData;
      },
    },
  });
  