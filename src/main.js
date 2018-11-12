// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCfm_4jw8mjW9QT2fNmKzKDWHfGYMl9FKM",
  authDomain: "my-vue-components.firebaseapp.com",
  databaseURL: "https://my-vue-components.firebaseio.com",
  projectId: "my-vue-components",
  storageBucket: "my-vue-components.appspot.com",
  messagingSenderId: "804712278261"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})




