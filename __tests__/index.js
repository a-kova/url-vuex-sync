const Vue = require('vue');
const Vuex = require('vuex');
const VueRouter = require('vue-router');
const sync = require('../index');

Vue.use(Vuex);
Vue.use(VueRouter);

test('State and route are synced', () => {
    const store = new Vuex.Store({
        state: {
            param: 'a'
        },
        mutations: {
            setParam(state, value) {
                state.param = value;
            }
        }
    });

    const router = new VueRouter({
        mode: 'abstract',
        routes: [
            {path: '', component: {}}
        ]
    });

    router.afterEach((to, from) => {
        expect(to.query).toEqual(store.state);
    });

    sync(store, router, [
        {
            name: 'param',
            mutation: 'setParam'
        }
    ]);

    router.push({path: '', query: {param: 'a'}});

    store.commit('setParam', 'b');
});
