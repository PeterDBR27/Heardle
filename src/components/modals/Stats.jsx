import { useModalData } from "./ModalContext";
import i18n from "../../i18n";

function Stats() {
  const {
    dispatch,
    state: { currentModal },
  } = useModalData();

  const onClose = () => {
    dispatch({ type: "Reset" });
  };

  // Obtenha os valores do localStorage
  const gameWins = localStorage.getItem("game-wins") || 0;
  const gamePlayed = localStorage.getItem("game-played") || 0;
  const maxStreak = localStorage.getItem("max-streak") || 0;
 
  const lastWin = localStorage.getItem("last-win-attempts") || 0;
  const wrongAttempt = localStorage.getItem("wrong-attempts") || 0;
  const noWin = localStorage.getItem("no-win") || 0;
  const allWins = localStorage.getItem('all-wins') || 0; 

  const wrongOnes = localStorage.getItem('wrongOnes') || 0; 

  const win1 = parseInt(localStorage.getItem('win-1') || 0); 
  const win2 = parseInt(localStorage.getItem('win-2') || 0); 
  const win3 = parseInt(localStorage.getItem('win-3') || 0); 
  const win4 = parseInt(localStorage.getItem('win-4') || 0); 
  const win5 = parseInt(localStorage.getItem('win-5') || 0); 
  const win6 = parseInt(localStorage.getItem('win-6') || 0);

  const isNoWinSeven = noWin == 7;
  
  const winPercentage = gamePlayed > 0 ? Math.round(parseInt(allWins) / gamePlayed * 100) : 0;

  if (currentModal !== "Stats") {
    return <></>;
  }

  return (
    <div className="modal-background p-3 pointer-events-none">
      <div
        className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-custom-bg border border-custom-mg p-6 rounded">
          <div className="flex items-center justify-center mb-6">
            <div className="flex-1 pl-7">
              <h2 className="thinFont h2title text-sm text-center text-custom-line font-bold">
              {i18n.t("stats.title")}
              </h2>
            </div>
            <div className="justify-self-end flex">
              <button
                autofocus=""
                className="border-none text-custom-mg"
                type="button"
                onClick={onClose}
              >
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between py-3">
            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
                {win1 > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{win1}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {win1 >= 1 && (
                    <div>
                    {[...Array(Math.min(25, Math.max(Math.floor((win1 + 3) / 4), 1)))].map((_, index) => (
                      <div
                        key={index}
                        className={`bg-greenNew w-full py-0.5 text-xs ${
                          lastWin == 2 ? "bg-greenNew" : ""
                        }`}
                        style={{ bottom: "0.8", border: ".75px solid black" }}
                      ></div>
                    ))}
                  </div> 
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {lastWin == 1 ? <span className="text-greenNew">1°</span> : <span>1°</span>}
              </div>
            </div>
            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
                {win2 > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{win2}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {win2 >= 1 && (
                    <div>
                    {[...Array(Math.min(25, Math.max(Math.floor((win2 + 3) / 4), 1)))].map((_, index) => (
                      <div
                        key={index}
                        className={`bg-greenNew w-full py-0.5 text-xs ${
                          lastWin == 2 ? "bg-greenNew" : ""
                        }`}
                        style={{ bottom: "0.8", border: ".75px solid black" }}
                      ></div>
                    ))}
                  </div>                  
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {lastWin == 2 ? <span className="text-greenNew">2°</span> : <span>2°</span>}
              </div>
            </div>
            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
                {win3 > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{win3}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {win3 >= 1 && (
                    <div>
                    {[...Array(Math.min(25, Math.max(Math.floor((win3 + 3) / 4), 1)))].map((_, index) => (
                      <div
                        key={index}
                        className={`bg-greenNew w-full py-0.5 text-xs ${
                          lastWin == 2 ? "bg-greenNew" : ""
                        }`}
                        style={{ bottom: "0.8", border: ".75px solid black" }}
                      ></div>
                    ))}
                  </div> 
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {lastWin == 3 ? <span className="text-greenNew">3°</span> : <span>3°</span>}
              </div>
            </div>
            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
                {win4 > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{win4}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {win4 >= 1 && (
                    <div>
                    {[...Array(Math.min(25, Math.max(Math.floor((win4 + 3) / 4), 1)))].map((_, index) => (
                      <div
                        key={index}
                        className={`bg-greenNew w-full py-0.5 text-xs ${
                          lastWin == 2 ? "bg-greenNew" : ""
                        }`}
                        style={{ bottom: "0.8", border: ".75px solid black" }}
                      ></div>
                    ))}
                  </div> 
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {lastWin == 4 ? <span className="text-greenNew">4°</span> : <span>4°</span>}
              </div>
            </div>
            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
                {win5 > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{win5}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {win5 >= 1 && (
                    <div>
                    {[...Array(Math.min(25, Math.max(Math.floor((win5 + 3) / 4), 1)))].map((_, index) => (
                      <div
                        key={index}
                        className={`bg-greenNew w-full py-0.5 text-xs ${
                          lastWin == 2 ? "bg-greenNew" : ""
                        }`}
                        style={{ bottom: "0.8", border: ".75px solid black" }}
                      ></div>
                    ))}
                  </div> 
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {lastWin == 5 ? <span className="text-greenNew">5°</span> : <span>5°</span>}
              </div>
            </div>
            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
                {win6 > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{win6}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {win6 >= 1 && (
                  <div>
                  {[...Array(Math.min(25, Math.max(Math.floor((win6 + 3) / 4), 1)))].map((_, index) => (
                    <div
                      key={index}
                      className={`bg-greenNew w-full py-0.5 text-xs ${
                        lastWin == 2 ? "bg-greenNew" : ""
                      }`}
                      style={{ bottom: "0.8", border: ".75px solid black" }}
                    ></div>
                  ))}
                </div> 
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {lastWin == 6 ? <span className="text-greenNew">6°</span> : <span>6°</span>}
              </div>
            </div>

            <div className="flex flex-col items-stretch">
              <div className="h-32 relative w-9 flex justify-center items-end">
              <div className="absolute bg-custom-mg w-6 stats-bar" style={{background: "none"}}>
              {wrongOnes > 0 && <p className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}>{wrongOnes}</p>}
              <div className="h-full bg-custom-mg text-center w-full py-1 text-xs" style={{background: "none"}}></div>
                {wrongOnes >= 1 && (
                  <div>
                    {[...Array(Math.min(25, Math.max(Math.floor((wrongOnes) / 4), 1)))].map((_, index) => (
                      <div
                        key={index}
                        className={`bg-red w-full py-0.5 text-xs ${
                          noWin == 7 ? "bg-red" : ""
                        }`}
                        style={{ bottom: "0.8", border: ".75px solid black" }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              </div>
              <div className="text-center border-right text-xs pt-1 text-custom-line">
              {noWin == 7 ? <svg
                className="mx-auto mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg> : <svg
                className="mx-auto mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>}
              </div>
            </div>
          </div>
          <div className="thinFont text-center text-sm font-bold text-gray">
          {i18n.t("stats.subtitle")}
          </div>
          <div className="flex justify-between text-center w-full py-3">
            <div className="flex-1">
              <div className="thinFont text-2xl font-semibold">
              {allWins}/{gamePlayed}
              </div>
              <div className="thinFont text-custom-line text-sm ">{i18n.t("stats.correct")}</div>
            </div>
            <div className="flex-1">
              <div className="thinFont text-2xl font-semibold">
                {winPercentage}%
              </div>
              <div className="thinFont text-custom-line text-sm">
              {i18n.t("stats.percentage")}
              </div>
            </div>
            <div className="flex-1">
              <div className="thinFont text-2xl font-semibold">
                {gameWins} : {maxStreak}
              </div>
              <div className="thinFont text-custom-line text-sm">
              {i18n.t("stats.current")}:{i18n.t("stats.max")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
