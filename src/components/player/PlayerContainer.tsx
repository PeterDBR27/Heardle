import { useEffect, useState } from "react";

import AsyncSelect from 'react-select/async';

import GamePlayground from "./GamePlayground";
import GameResult from "./GameResult";

import { useGameData } from "./GameContext";

import MusicPlayer from "../music/MusicPlayer";
import { checkAnswer, cleanUpText } from "../game/Utils";
import { OnChangeValue } from "react-select";
import { SongConfig } from "../game/Models";
import { StylesConfig, MenuProps } from 'react-select';
import i18n from "../../i18n";


type AudioscrobblerResult = {
    artist: string
    name: string
}

function PlayerContainer({ songConfig }: { songConfig: SongConfig }) {

    const [answer, setAnswer] = useState("");
    const [selectedSong, setSelectedSong] = useState("");

    const { dispatch, state: { openedStep, finished } } = useGameData();

    const onSkipClicked = () => {
        dispatch(({ type: "SKIP", payload: { step: openedStep } }))
    }

    const onSendClicked = () => {
        if (!answer) {
            return;
        }

        let score = checkAnswer(songConfig, answer);
        console.debug("checkAnswer ", score)

        if (score) {
            dispatch(({ type: "SUBMIT-CORRRECT", payload: { step: openedStep, answer: answer } }));
        } else {
            dispatch(({ type: "SUBMIT-WRONG", payload: { step: openedStep, answer: answer } }));
        }

        setAnswer("");
        setSelectedSong("")
    }

    const onFinishClicked = () => {
        dispatch(({ type: "FINISH" }));
    }

    const loadOptions = (inputValue: string, callback: (res: any[]) => void) => {
        if (!inputValue || inputValue.trim().length < 1) {
            callback([]);
            return;
        }

        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=bc154d3f6d87bf4b88758451188015f8&format=json&track=` + inputValue)
            .then(response => response.json())
            .then((response) => {
                let result = [];
                if (response && response.results && response.results.trackmatches && response.results.trackmatches.track) {
                    result = response.results.trackmatches.track
                        .filter((item: any) => {
                            return (item && item.artist.indexOf("unknown") === -1 && item.name.indexOf("unknown") === -1)
                        })
                        .map((item: AudioscrobblerResult) => {
                            let value = item.artist + " " + item.name;
                            value = cleanUpText(value, false);
                            return { label: value, value: value }
                        });
                }
                callback(result)
                return result;
            })
            .catch((err) => {
                console.error(err)
            });
    };      

    const handleInputChange = (newValue: OnChangeValue<any, any>) => {
        if (newValue) {
            setSelectedSong(newValue);
            setAnswer(newValue.value);
        }
    };

type CustomMenuProps = MenuProps<string, false, any> & { menuIsOpen?: boolean };

const customStyles: StylesConfig<string, false, CustomMenuProps> = {
    control: (provided, state) => ({
        ...provided,
        fontFamily: "Spotify-Thin",
        backgroundColor: '#121212',
        color: '#fff',
        border: '1px solid #878787',
        borderColor: state.isFocused ? '#00FF00' : '#878787',
        '&:hover': {
            borderColor: state.isFocused ? '#00FF00' : '#1ED760',
            cursor: 'pointer'
        },
        '&:focus': {
            borderColor: '#00FF00',
            boxShadow: 'none'
        }
    }),
      option: (provided, state) => ({
        ...provided,
        fontFamily: "Spotify-Thin",
        borderBottom: '1px solid #fff',
        backgroundColor: state.isSelected ? '#292929' : '#121212',
        color: '#fff',
        '&:hover': {
          backgroundColor: state.isSelected ? '#292929' : '#292929',
          cursor: 'pointer',
          color: '#fff'
        },
      }),
      input: (provided, state) => ({
        ...provided,
        fontFamily: "Spotify-Thin",
        color: state.selectProps.inputValue ? '#fff' : '#c4c4c4',
      }),
      menu: (provided, state) => ({
        ...provided,
        fontFamily: "Spotify-Thin",
        backgroundColor: '#121212',
        zIndex: 2,
        borderColor: '#1ED760',
        borderWidth: '0 1px 1px 1px',
        borderTop: '1px solid #1ED760',
        borderStyle: 'solid'
      }),
      menuList: (provided, state) => ({
        ...provided,
        padding: 0,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#fff'
      }),
};
    return (
        <>
            {
                finished ?
                    (<GameResult songConfig={songConfig} />) :
                    (<GamePlayground />)
            }
            <MusicPlayer songConfig={songConfig} />
            {
                finished === false &&
                <div className="max-w-screen-sm w-full mx-auto flex-col">
                    <div className="m-3 mt-0">
                        <div>
                            <div className="">
                                <div className="thinFont bg-black text-white autoComplete_wrapper" role="form">
                                    <AsyncSelect defaultOptions
                                        menuPlacement="top"
                                        cacheOptions
                                        components={{
                                            DropdownIndicator: () => null,
                                            IndicatorSeparator: () => null
                                        }}
                                        noOptionsMessage={({ inputValue }) => !inputValue.trim() ? i18n.t("main.placeholder2") : i18n.t("main.placeholder3")}
                                        placeholder={i18n.t("main.placeholder")}
                                        loadOptions={loadOptions}
                                        value={selectedSong}
                                        menuPortalTarget={document.body}
                                        styles={customStyles}
                                        onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="flex justify-between pt-3">
                                {
                                    openedStep < songConfig.breaks.length - 1 &&
                                    <button className="pularbtn text-sm px-6 py-3 tracking-widest bg-none border-none flex items-center font-bold rounded-full text-black"
                                        type="submit"
                                        onClick={onSkipClicked}>
                                        {i18n.t("main.skip")}
                                    </button>
                                }
                                {
                                    openedStep === songConfig.breaks.length - 1 &&
                                    <button className="pularbtn text-sm px-6 py-3 tracking-widest bg-none border-none flex items-center font-bold rounded-full text-black"
                                        type="submit"
                                        onClick={onFinishClicked}>
                                        {i18n.t("main.giveup")}
                                    </button>
                                }
                                {
                                    openedStep < songConfig.breaks.length &&
                                    <button className="enviarbtn px-6 py-3 uppercase tracking-widest border-none flex items-center font-bold text-sm rounded-full bg-greenNew text-black"
                                        type="submit"
                                        onClick={onSendClicked}>
                                        {i18n.t("main.submit")}
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default PlayerContainer;