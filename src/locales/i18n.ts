import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { storageKeys } from "@/shared/constants"
import en from "./en.json"
import ru from "./ru.json"
import uz from "./uz.json"

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en }
    },
    lng: localStorage.getItem(storageKeys.LANG) ?? "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  })
  .catch(err => {
    console.error(err)
  })

export default i18n
