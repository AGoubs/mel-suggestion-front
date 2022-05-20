import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

import './index.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;


new Vue({
  beforeCreate: function () {
    axios
      .get("http://127.0.0.1:8000/api/moderator")
      .then((response) => {
        Vue.prototype.$moderator = response.data
      })
  },
  render: h => h(App),
}).$mount('#app')
