# url-vuex-sync

This plugin syncs route query with specific params from Vuex state.

For example:  
You can have a route like '/products?type=fruits'  
And a param in vuex state "type".  
Plugin helps to sync them, so every time url param changes - the store is being update and vice versa.

### Usage

````
npm i url-vuex-sync
````
````
import sync from 'url-vuex-sync'
import store from './store' // your Vuex store
import router from './router' // your router

sync(store, router, [
  {
    name: 'stateParam', // state param or getter that should by synced
    as: 'aliasForUrl', // alias for url, not required
    mutation: 'setParam' // mutation
  }
]);
````

### How does it work

Firstly it moves all synced params from route query to vuex state.
Then it applies watchers on them, so every time state changes the route is being update.

### License

[MIT](http://opensource.org/licenses/MIT)
