import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLanguage from "@/app/_translation/langs/en.json";
import tsLanguage from "@/app/_translation/langs/ts.json";
import scLanguage from "@/app/_translation/langs/sc.json";

const browserLang = navigator.language.toLowerCase();

let appLang: "en" | "sc" | "tc" = "en";

if (browserLang.startsWith("zh")) {
  if (
    browserLang.includes("tw") ||
    browserLang.includes("hk") ||
    browserLang.includes("mo")
  ) {
    appLang = "tc";
  } else {
    appLang = "sc";
  }
} else if (browserLang.startsWith("en")) {
  appLang = "en";
}

localStorage.setItem("userLang", appLang);

const resources = {
  en: {
    translation: enLanguage,
  },
  tc: {
    translation: tsLanguage,
  },
  sc: {
    translation: scLanguage,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: appLang,
  fallbackLng: "en",
  // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
