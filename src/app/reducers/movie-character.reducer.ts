/* tslint:disable: no-switch-case-fall-through */
import {Action} from '@ngrx/store';

import {MovieCharacterActionTypes, MovieCharacterActions} from "../actions/movie-character.actions";

interface ICharacterData {
    "derp": string
}


export interface MovieCharactersState {
    characterData: {};
    characterSelected: any
}

export const initialState: MovieCharactersState = {
    characterData: {},
    characterSelected: ''
};

export function movieCharacterReducer(state = initialState, action: MovieCharacterActions): MovieCharactersState {

    console.log('got an action: ');
    console.log(action);
    switch (action.type) {

        case MovieCharacterActionTypes.ChangeCharacterSelected: {

            console.log('this one!')
            return {
                ...state,
                errorOccurred: false,
                characterSelected: action.payload
            };
        }

        case MovieCharacterActionTypes.LoadCharacterListSuccess: {

            console.log('this one!')
            return {
                ...state,
                errorOccurred: false,
                characterData: action.payload
            };
        }

        case MovieCharacterActionTypes.GetCharacterDataSuccess: {

            console.log('handling char success!')

            console.log('payload', action.payload);

            let tempState: any = state;

            tempState = {
                ...tempState,
                characterSelected: action.payload.movieCharacter,
                errorOccurred: false,
                characterData: tempState.characterData.map(characterObj => {

                    console.log('checking character ', characterObj.name);
                    console.log('against payload user', action.payload.movieCharacter);

                    if (characterObj.name === action.payload.movieCharacter) {
                        console.log('match!');

                        return {...characterObj, movies: action.payload.movies}

                    }
                    else {
                        return characterObj
                    }
                })
            }

            // return {
            //     ...state
            // };


            console.log('mold tempstate ', state)
            console.log('mnew tempstate ', tempState)
            return tempState;
        }

        case MovieCharacterActionTypes.GetCharacterDataFail: {

            console.log('handling char fail!')

            console.log('payload', action.movieCharacter);

            return {
                ...state,
                characterSelected: action.movieCharacter,
                errorOccurred: true
            };


            // return {
            //     ...state
            // };
            // console.log('mnew tempstate ', tempState)
            // return tempState;
        }

        default: {
            return state;
        }
    }
}

// export const getLoaded = (state: MovieCharactersState) => state.loaded;
