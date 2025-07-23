import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLanguage from "@/app/_translation/langs/en.json";
import tcLanguage from "@/app/_translation/langs/tc.json";
import scLanguage from "@/app/_translation/langs/sc.json";

// const browserLang = navigator.language.toLowerCase();

// let appLang: "en" | "sc" | "tc" = "en";

// if (browserLang.startsWith("zh")) {
//   if (
//     browserLang.includes("tw") ||
//     browserLang.includes("hk") ||
//     browserLang.includes("mo")
//   ) {
//     appLang = "tc";
//   } else {
//     appLang = "sc";
//   }
// } else if (browserLang.startsWith("en")) {
//   appLang = "en";
// }

// localStorage.setItem("userLang", appLang);

const resources = {
  en: {
    translation: enLanguage,
  },
  tc: {
    translation: tcLanguage,
  },
  sc: {
    translation: scLanguage,
  },
};

export const changeLanguage = (lng: "en" | "tc" | "sc") => {
  i18n.changeLanguage(lng);
  localStorage.setItem("userLang", lng);
};

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("userLang") : null;
const initialLang = savedLang ?? "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
