import { useModalData } from "./modals/ModalContext";
import i18n from "../i18n";

function Header() {

    const { dispatch } = useModalData();


    const openLike = () => {
        dispatch({ type: 'Like' })
    }

    const openAbout = () => {
        dispatch({ type: 'About' })
    }

     const openStats = () => {
         dispatch({ type: 'Stats' })
     }

    const openHowToPlay = () => {
        dispatch({ type: 'HowToPlay' })
    }
    const openSettings = () => {
        dispatch({ type: 'Settings' })
    }

    return (
        <div className="flex-none">
            <header className="border-b border-custom-line" role="banner">
                <div className="max-w-screen-md mx-auto ">
                    <div className="flex justify-evenly text-custom-fgcolor p-3 items-center">
                        <div className="flex flex-1">
                            <button
                                className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm"
                                onClick={openSettings} aria-label={i18n.t("main.settings")} title={i18n.t("main.settings")}>
                                 <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path>
                                </svg>
                            </button> 
                            <button
                                className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm"
                                onClick={openAbout} aria-label={i18n.t("main.about")} title={i18n.t("main.about")}>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                            </button> 
                        </div>
                        <h1 className="titulo font-serif text-3xl flex-grow text-center flex-2" alt="Heardle">{i18n.t("main.title")}</h1>
                        <div className="flex flex-1 justify-end">
                             <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm"
                                onClick={openStats} aria-label={i18n.t("main.support")} title={i18n.t("main.support")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20v-6M6 20V10M18 20V4"></path>
                                </svg>
                            </button> 
                            <button
                                className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm"
                                onClick={openHowToPlay} aria-label={i18n.t("main.howtoplay")} title={i18n.t("main.howtoplay")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;