import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import Toast from "vue-toastification";
import store from './store'
import "vue-toastification/dist/index.css";
import './index.css'


Vue.config.productionTip = false
Vue.use(Toast, { position: "bottom-right" });
Vue.prototype.$axios = axios;
Vue.prototype.$moderator = false;


new Vue({
  store,
  beforeCreate: function () {
    axios
      .get("http://127.0.0.1:8000/api/moderator")
      .then((response) => {
        Vue.prototype.$moderator = response.data
      })
  },
  render: h => h(App),
}).$mount('#app')
