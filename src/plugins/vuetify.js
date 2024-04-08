// Styles
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
// Vuetify
import { createVuetify } from 'vuetify';
import * as labsComponents from 'vuetify/labs/components';
const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#fc3838',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        white: '#ffffff',
        dialogBar: '#7a7a7a',
        themeBars: '#f3f3f3',
        active: '#272822',
        error_back: '#ffe7e6',
        success_back: '#e4f8f0',
        primary_active: '#ece2fc',
        primary_active2: '#d4b1f6',
        card_active: '#E3F2FD',
        // /----------
        dark_blue: '#0055ff',
        //---------
        survey_app_bar: 'rgba(33,150,243,0.71)',
        //--------
        haffari_app_bar: '#FF6F00',
        haffari_primary: '#FB8C00',
        haffari_side_back: '#FFE0B2'
    }
};
export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        }
    },
    components: {
        ...labsComponents,
    },
});
//# sourceMappingURL=vuetify.js.map