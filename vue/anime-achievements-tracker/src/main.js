import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueNotification from 'vue-notification'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueAnime from 'vue-animejs'
import anime from 'animejs'
import router from './router'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  //http://localhost:5000/graphql
  uri:'https://anime-achievements-tracker.herokuapp.com/graphql'
});

const apolloClient = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache()
});

Vue.use(VueApollo);
Vue.use(Vuex);
Vue.use(anime);
Vue.use(VueAnime);
Vue.use(VueNotification);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
