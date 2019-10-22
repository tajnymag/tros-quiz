import Vue from 'vue';

//@ts-ignore
import { DropdownPlugin } from 'bootstrap-vue';
import App from './components/App.vue';

Vue.use(DropdownPlugin);

const app = new Vue({
	el: 'app',
	render: h => h(App)
});
