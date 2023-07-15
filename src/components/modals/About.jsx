import { useModalData } from "./ModalContext";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

function About() {

   const { dispatch, state: { currentModal } } = useModalData();
   const { t } = useTranslation();

   if (currentModal !== "About") {
      return <></>
   }

   return (
      <div className="modal-background p-3 pointer-events-none">
         <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm" role="dialog" aria-modal="true">
            <div className="bg-custom-bg border border-custom-mg p-6 rounded">
               <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 pl-7">
                     <h2 className="thinFont h2title text-sm text-center text-custom-line font-bold">{t("about.title")}</h2>
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
               <div className="text">
                  <p className="thinFont text-center mb-3">{t("about.txt")}</p>
                  <p className="thinFont text-center mb-3">{t("about.txt2")}</p>
                  <p className="thinFont text-center text-sm mb-1 text-custom-line">{t("about.author")}</p>
                  <div className="justify-center flex py-2 mt-2">
                   <a
                     className="spotifybtn text-sm px-6 py-3 rounded-full font-bold border-none flex items-center bg-greenNew text-black"
                     href="https://ko-fi.com/pedroscf"
                     target="_blank"
                     rel="noreferrer"
                   >
                     {t("like.btn")}
                   </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default About;
