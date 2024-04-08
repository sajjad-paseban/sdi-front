import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
VueViewer.setDefaults({
    zIndex: 20000000021,
});
import CKEditor from '@ckeditor/ckeditor5-vue';
import vuetify from './plugins/vuetify';
import primevue from './plugins/primevue';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css';
import '@photo-sphere-viewer/core/index.css';
import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';
createApp(App)
    .use(router)
    .use(CKEditor)
    .use(store)
    .use(vuetify)
    .use(primevue)
    .use(VueViewer)
    .directive('tooltip', Tooltip)
    .use(ToastService)
    .use(ConfirmationService)
    .use(OpenLayersMap)
    .component('date-picker', VuePersianDatetimePicker)
    .mount('#app');
//# sourceMappingURL=main.js.map