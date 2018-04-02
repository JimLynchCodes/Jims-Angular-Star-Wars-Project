/* tslint:disable: no-switch-case-fall-through */
import {MovieCharacterActionTypes, MovieCharacterActions} from '../actions/movie-character.actions';

export interface MovieCharactersState {
    characterData: {};
    characterSelected: any;
    errorOccurred: boolean;
}

export const initialState: MovieCharactersState = {
    characterData: {},
    characterSelected: '',
    errorOccurred: false
};

export function movieCharacterReducer(state = initialState,
    action: MovieCharacterActions): MovieCharactersState {

    switch (action.type) {

        case MovieCharacterActionTypes.ChangeCharacterSelected: {
            return {
                ...state,
                errorOccurred: false,
                characterSelected: action.payload
            };
        }

        case MovieCharacterActionTypes.LoadCharacterListSuccess: {
            return {
                ...state,
                errorOccurred: false,
                characterData: action.payload
            };
        }

        case MovieCharacterActionTypes.GetCharacterDataSuccess: {
            let tempState: any = state;

            tempState = {
                ...tempState,
                characterSelected: action.payload.movieCharacter,
                errorOccurred: false,
                characterData: tempState.characterData.map(characterObj => {
                    if (characterObj.name === action.payload.movieCharacter) {
                        return {...characterObj, movies: action.payload.movies};
                    } else {
                        return characterObj;
                    }
                })
            };

            return tempState;
        }

        case MovieCharacterActionTypes.GetCharacterDataFail: {
            return {
                ...state,
                characterSelected: action.payload.movieCharacter,
                errorOccurred: true
            };
        }

        default: {
            return state;
        }
    }
}
