import Vue from 'vue';

//@ts-ignore
import { Dropdown } from 'bootstrap-vue/es/components';
import App from './components/App.vue';

Vue.use(Dropdown);

const app = new Vue({
	el: 'app',
	render: h => h(App)
});
