import { useModalData } from "./ModalContext";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import React, { useState } from 'react'

function Settings() {

   const { dispatch, state: { currentModal } } = useModalData();
   const { t } = useTranslation();
   const [isDarkMode, setIsDarkMode] = useState(false);

   if (currentModal !== "Settings") {
      return <></>
   }

   function changeLanguage(lng) {
     i18n.changeLanguage(lng);
     window.location.reload();
   }

   function toggleDarkMode() {
      setIsDarkMode(!isDarkMode);
    }    

   return (
      <div className="modal-background p-3 pointer-events-none">
         <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm" role="dialog" aria-modal="true">
            <div className="bg-custom-bg border border-custom-mg p-6 rounded">
               <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 pl-7">
                     <h2 className="thinFont h2title text-sm text-center text-custom-line font-bold">{t("settings.title")}</h2>
                  </div>
                  <div className="justify-self-end flex">
                     <button autofocus="" className="border-none text-custom-mg" type="button" aria-label={t("main.close")} title={t("main.close")}
                        onClick={() => { dispatch({ type: 'Reset' }) }}>
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="18" y1="6" x2="6" y2="18"></line>
                           <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                     </button>
                  </div>
               </div>
               <div className="text flex flex-row items-center">
                 <p className="thinFont mb-3 pt-3 mr-2">{t("settings.languagestxt")}</p>
                 <select
                   className="spotifybtn ml-auto text-sm px-6 py-3 rounded-full font-bold border-none bg-greenNew text-black appearance-none pr-6"
                   value={i18n.language.split("-")[0]}
                   onChange={(event) => changeLanguage(event.target.value)}
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M3.5 5l2.5 2.5 2.5-2.5z' fill='%23202020'/%3E%3C/svg%3E")`,
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'right 0.5rem center',
                     backgroundSize: '20px'
                   }}
                 >
                   {Object.keys(i18n.options.resources).map((lng) => (
                     <option key={lng} value={lng}>
                       {t(`languages.${lng}`)}
                     </option>
                   ))}
                 </select>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Settings;
