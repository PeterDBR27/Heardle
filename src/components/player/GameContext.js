import * as React from 'react'
import { getDayStr } from '../utils'

const GameContext = React.createContext();

let DEFAULT_TODAY_GUEST_LIST = [{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
}];

const MAX_GUESS_INDEX = 5;


function saveState(state) {
    let now = new Date();

    let stateKey = state.day || getDayStr();
    state.ls = now.getTime();

    localStorage.setItem(stateKey, JSON.stringify(state));
}

function loadState() {
    let stateKey = getDayStr();

    let state = localStorage.getItem(stateKey);
    if (state) {
        return JSON.parse(state);
    }

    return {
        guessList: DEFAULT_TODAY_GUEST_LIST,
        lastStep: 0,
        openedStep: 0,
        finished: false
    }
}

function saveMaxStreak(currentStreak, gameWin) {
    let maxStreak = parseInt(localStorage.getItem('max-streak') || 0);
    let allWins = parseInt(localStorage.getItem('all-wins') || 0);
    if (gameWin === false) { // usuário errou o último jogo e resetou a currentStreak
        allWins = allWins + currentStreak;
    } else {
        if (currentStreak > maxStreak) {
            localStorage.setItem('max-streak', currentStreak);
        }
        allWins = allWins + 1;
        localStorage.setItem('all-wins', allWins);
    }
}

function modalReducer(state, action) {
    let latestState = state;

    switch (action.type) {
        case 'SKIP': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;
            let wrongAttempts = parseInt(localStorage.getItem('wrong-attempts')) || 0;

            // Increment the number of wrong attempts and save it in localStorage
            localStorage.setItem('wrong-attempts', wrongAttempts + 1);

            guessList[lastStep].isSkipped = true;

            let finished = state.finished;
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1
            } else {
                finished = true
                localStorage.setItem('wrongOnes', parseInt(localStorage.getItem('wrongOnes') || 0) + 1);
                localStorage.setItem('wrong-attempts', 0);
                localStorage.setItem('no-win', 7);
            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep,
                openedStep: openedStep + 1,
                finished: finished
            }
            break
        }
        case 'SUBMIT-WRONG': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;
            let wrongAttempts = parseInt(localStorage.getItem('wrong-attempts')) || 0;

            guessList[lastStep].answer = action.payload.answer;

            let finished = state.finished;
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1;
                localStorage.setItem('wrong-attempts', wrongAttempts + 1);
            } else {
                finished = true;

                localStorage.setItem('wrongOnes', parseInt(localStorage.getItem('wrongOnes') || 0) + 1);
                let expires = new Date();
                expires.setTime(expires.getTime() + 5000 * 24 * 60 * 60 * 1000);

                // Increment the number of wrong attempts and save it in localStorage
                wrongAttempts = parseInt(wrongAttempts) + 1;
                localStorage.setItem('wrong-attempts', wrongAttempts);

                // get the current values of game-wins and max-streak from localStorage
                const gameWins = parseInt(localStorage.getItem('game-wins')) || 0;
                const maxStreak = parseInt(localStorage.getItem('max-streak')) || 0;

                // update the game-wins, no-win, and game-played in localStorage
                localStorage.setItem('game-wins', 0);
                localStorage.setItem('no-win', 7);
                localStorage.setItem('game-played', parseInt(localStorage.getItem('game-played') || 0) + 1);

                // update the max-streak localStorage if necessary
                if (gameWins > maxStreak) {
                    localStorage.setItem('max-streak', gameWins);
                }
            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep,
                finished: finished,
                openedStep: openedStep + 1,
            };

            break
        }
        case 'SUBMIT-CORRRECT': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;
            let wrongAttempts = parseInt(localStorage.getItem('wrong-attempts')) || 0;
          
            guessList[lastStep].isCorrect = true;
            guessList[lastStep].answer = action.payload.answer;
          
            if (lastStep !== MAX_GUESS_INDEX) {
              lastStep = lastStep + 1
            }
          
            latestState = {
              ...state,
              guessList: guessList,
              lastStep: lastStep + 1,
              openedStep: openedStep + 1,
              finished: true
            };
          
            // Save data to localStorage
            localStorage.setItem('game-wins', localStorage.getItem('game-wins') ? parseInt(localStorage.getItem('game-wins')) + 1 : 1);
            localStorage.setItem('game-played', localStorage.getItem('game-played') ? parseInt(localStorage.getItem('game-played')) + 1 : 1);
          
            // Save the number of wrong attempts to localStorage
            localStorage.setItem('last-win-attempts', wrongAttempts + 1);
          
            // Check if the number of attempts is equal to 1, 2, 3, 4, 5 or 6
            let attempts = wrongAttempts + 1;
            if (attempts === 1 || attempts === 2 || attempts === 3 || attempts === 4 || attempts === 5 || attempts === 6) {
              let winAttempts = parseInt(localStorage.getItem(`win-${attempts}`)) || 0;
              localStorage.setItem(`win-${attempts}`, winAttempts + 1);
            }
          
            // Reset the wrong-attempts localStorage item
            localStorage.setItem('wrong-attempts', 0);
            localStorage.setItem('no-win', 0);
          
            let currentStreak = parseInt(localStorage.getItem('game-wins') || 0);
            saveMaxStreak(currentStreak);
            break;
          }          
          case 'FINISH': {
            let guessList = state.guessList;
            guessList[MAX_GUESS_INDEX].isSkipped = true;
        
            // get the current values of game-wins and max-streak from localStorage
            const gameWins = parseInt(localStorage.getItem('game-wins') || 0);
            const maxStreak = parseInt(localStorage.getItem('max-streak') || 0);
        
            // update the game-wins and game-played in localStorage
            localStorage.setItem('game-wins', 0);
            localStorage.setItem('game-played', parseInt(localStorage.getItem('game-played') || 0) + 1);
        
            // update the max-streak if necessary
            if (gameWins > maxStreak) {
                localStorage.setItem('max-streak', gameWins);
            }
        
            // Reset the wrong-attempts in localStorage
            localStorage.setItem('wrongOnes', parseInt(localStorage.getItem('wrongOnes') || 0) + 1);
            localStorage.setItem('wrong-attempts', 0);
            localStorage.setItem('no-win', 7);
            localStorage.setItem('last-win-attempts', 0);
        
            latestState = {
                ...state,
                guessList: guessList,
                lastStep: MAX_GUESS_INDEX,
                finished: true
            };
        
            break;
        }        
        case 'RESET': {
            //load from localstorage
            latestState = {
                ...state,
                guessList: DEFAULT_TODAY_GUEST_LIST,
                lastStep: 0,
                openedStep: 0,
                finished: false
            }
            break
        }
        case 'SAVE': {
            //load from localstorage
            latestState = {
                ...state
            }
            break
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`)
            latestState = {
                guessList: DEFAULT_TODAY_GUEST_LIST,
                lastStep: 0,
                openedStep: 0,
                finished: false
            }
            break
        }
    }

    saveState(latestState);

    return latestState;
}

function GameContextProvider({ children }) {
    //load from localstorage
    const [state, dispatch] = React.useReducer(modalReducer, loadState())
    const value = { state, dispatch }
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGameData() {
    const context = React.useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGameData must be used within a GameContextProvider')
    }
    return context
}


export { GameContextProvider, useGameData }