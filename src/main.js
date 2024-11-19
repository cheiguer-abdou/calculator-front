import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import AmplifyVue from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import router from './router';


const app = createApp(App);
app.use(AmplifyVue);
app.use(router);
app.mount('#app');
// import {Amplify} from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);
// console.log(Amplify.Logger);

// createApp(App).mount('#app')
