module.exports = (store, router, params = []) => {
  router.onReady(route => {
    // Move params from route to state
    const paramsForPush = {};

    params.forEach(param => {
      const urlParam = param.as || param.name;

      if (route.query.hasOwnProperty(urlParam)) {
        store.commit(param.mutation, route.query[urlParam]);
      } else {
        paramsForPush[urlParam] = store.state[param.name];
      }
    });

    router.push({
      query: {
        ...route.query,
        ...paramsForPush
      }
    });
  });

  // Watch state
  params.forEach(param => {
    let urlParam = param.as || param.name;

    store.watch(
      (state, getters) => state[param.name] || getters[param.name],
      newValue => {
        router.push({ query: { ...router.currentRoute.query, [urlParam]: newValue } })
      }
    );
  });
};
