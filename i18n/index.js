import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization';
import en from "./lang/en";
import ru from "./lang/ru";

i18n.use(initReactI18next)
    .init({
        resources: {
            en,
            ru,
        },
        lng: Localization.locale.replace(/-(.*)/, ""),
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
console.log("HELLO")
export default i18n;