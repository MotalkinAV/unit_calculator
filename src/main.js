import { createApp} from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './assets/bootstrap.css';
import AppButton from "./components/AppButton.vue";
import AppInput from './components/AppInput.vue';


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.component('app-button', AppButton);
app.component('app-input', AppInput);


app.mount('#app');
