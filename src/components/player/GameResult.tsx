import { useGameData } from "./GameContext";
import copy from 'copy-to-clipboard';
import NextTimer from "./NextTimer";
import { useState } from "react";
import { GAME_RESULT_FAILED_MESSAGE, GAME_RESULT_MESSAGES, HEARDLE_SPOTIFY_LIST_URL, HEARDLE_WEB_URL } from "../game/Constants";
import { getDayFormattedText } from "../utils";
import moment from 'moment';
import i18n from "../../i18n";

const buildScore = (guessList: any[]): number => {
  let max = 6;

  const isCorrect = guessList.some((guess) => guess.isCorrect);
  if (isCorrect === false) {
    return 0;
  }

  for (let i = 0; i < guessList.length; i++) {
    if (guessList[i].isSkipped) {
      max = max - ((guessList.length - i) * 2);
    }
  }

  return max;
}

const buildBoxIcons = (guessList: any[]) => {
  let icons = guessList.map((item, i) => {
    if (item.isSkipped) {
      return "⬛"
    }
    if (item.isCorrect) {
      return "🟩"
    }
    if (item.isSkipped === false && item.isCorrect === false && item.answer) {
      return "🟥"
    }
    return "⬜️"
  }).join("");

  return icons;
}

const divIcons = (guessList: any[]) => {
  let icons = guessList.map((item, i) => {
    let colorClass = "";
    if (item.isSkipped) {
      colorClass = "bg-custom-mg";
    } else if (item.isSkipped === false && item.isCorrect === false && item.answer) {
      colorClass = "bg-custom-negative";
    } else if (item.isCorrect) {
      colorClass = "bg-greenNew";
    } else {
      colorClass = "bg-custom-mg";
    }
    return <div className={`w-4 h-1 m-0.5 ${colorClass} justify-center`} />;
  });

  return icons;
}

const getSpeakerIcon = (score: number) => {
  if (score === 100) {
    return "🔊";
  } else if (score === 0) {
    return "🔇";
  } else if (score < 50) {
    return "🔈";
  } else {
    return "🔉";
  }
}

const getResultIcons = (guessList: any[]) => {
  let score = buildScore(guessList);
  console.log("score:", score)
  return buildBoxIcons(guessList);
}

const buildShareText = (guessList: any[]) => {
  let score = buildScore(guessList);
  console.debug(score)

  let icons = getSpeakerIcon(score) + getResultIcons(guessList);
  let today = moment();
  let start = moment('2023-05-05'); //YYYY-MM-DD
  let day = today.diff(start, 'days') + 1;
  let todayStr = `#${day}`;

  return `#Heardle ${todayStr} \n${icons} \n\n${HEARDLE_WEB_URL}`;
}

function GameResult({ songConfig }: { songConfig: any }) {

  const { state: { guessList } } = useGameData();
  const guessScore = guessList.findIndex((guess: any) => guess.isCorrect);

  const [showCopied, setShowCopied] = useState(false);

  const onCopyClicked = () => {
    const text = buildShareText(guessList);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000)

    copy(text, {
      debug: true,
      message: 'Aperte #{key} para copiar',
    });
  }

  /*const onTwitterShareClicked = () => {
    const text = buildShareText(guessList);
    const url = `https://twitter.com/intent/tweet?original_referer=${HEARDLE_WEB_URL}&text=${encodeURIComponent(text)}`;

    const winProxy = window.open(url, '_blank');
    if (winProxy) {
      winProxy.focus();
    }
  }*/

  const embedLink = songConfig.soundSpotifyLink;
  const trackLink = embedLink.replace("embed/", "");

  return (
    <div className="w-full flex flex-col flex-grow relative">
      <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
        <br></br>
        <div className="text-center px-3">
        <a>
        <img 
        title={i18n.t("result.listen") + songConfig.musicaNome + i18n.t("result.by") + songConfig.musicaArtista + i18n.t("result.onspotify")}
        className="imageCenter max-w-[184px] max-h-[184px] place-content-center" 
        src={songConfig.image} 
        alt={"" + songConfig.musicaNome + i18n.t("result.by") + songConfig.musicaArtista} 
        onClick={() => window.open(trackLink, '_blank')}/>
        </a>
        <br></br>
          <a title={i18n.t("result.listen") + songConfig.musicaNome + i18n.t("result.by") + songConfig.musicaArtista + i18n.t("result.onspotify")} href={trackLink} target="_blank" style={{ display: "block" }}><b>{songConfig.musicaNome}</b></a>
          <a title={i18n.t("result.listen") + songConfig.musicaNome + i18n.t("result.by") + songConfig.musicaArtista + i18n.t("result.onspotify")} href={trackLink} target="_blank" className="leading-5 thinFont text-gray textSong" style={{ display: "block" }}>{songConfig.musicaArtista}</a>
          <a title={i18n.t("result.listen") + songConfig.musicaNome + i18n.t("result.by") + songConfig.musicaArtista + i18n.t("result.onspotify")} href={trackLink} target="_blank" className="leading-5 thinFont text-gray textSong" style={{ display: "block" }}>{songConfig.musicaAno}</a>
        </div>
        <div className="text-center px-3">
          {
            guessScore > -1 && guessScore < 6 &&
            <>
              <p className="text-white text-3xl">{GAME_RESULT_MESSAGES[guessScore]}</p>
            </>
          }
          {
            guessScore < 0 &&
              <p className="text-white text-lg">{GAME_RESULT_FAILED_MESSAGE}</p>
          }

          <div className="flex justify-center my-2">
            {
              divIcons(guessList)
            }
          </div>
          <p className="thinFont text-white text-base">
            {(() => {
              const lastWin = parseInt(localStorage.getItem("last-win-attempts") || "0");
              switch (lastWin) {
                case 0:
                  return i18n.t("phrases.failedTime");
                case 1:
                  return i18n.t("phrases.firstTime");
                case 2:
                  return i18n.t("phrases.secondTime");
                case 3:
                  return i18n.t("phrases.thirdTime");
                case 4:
                  return i18n.t("phrases.fourthTime");
                case 5:
                  return i18n.t("phrases.fifthTime");
                case 6:
                  return i18n.t("phrases.sixthTime");
                default:
                  return ``;
              }
            })()}
          </p>
          <div className="flex flex-col justify-center items-center mt-3 pt-3">
            <a title={i18n.t("result.listen") + songConfig.musicaNome + i18n.t("result.by") + songConfig.musicaArtista + i18n.t("result.onspotify")} className="spotifybtn text-sm px-7 py-3 mb-2 font-bold border-none rounded-full content-center bg-greenNew text-black"
              href={trackLink} target="_blank" rel="noreferrer">
              {i18n.t("result.btn")}
            </a>
            <button className="copiarbtn text-sm w-60 h-10 px-2 py-2 mb-2 font-bold border-none rounded-full content-center bg-none text-greenNew"
              onClick={onCopyClicked}>
              {showCopied ? i18n.t("result.copied") : i18n.t("result.share")}
            </button>
          </div>
        </div>
        <div>
          <NextTimer />
        </div>
      </div>
    </div>
  );
}

export default GameResult;