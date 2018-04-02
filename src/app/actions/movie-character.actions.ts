import { Response } from '@angular/http';
import { Action } from '@ngrx/store';


export enum MovieCharacterActionTypes {
    ChangeCharacterSelected = 'Change Character Selected',
    GetCharacterDataBegin = '[Get Character Data] Begin',
    GetCharacterDataSuccess = '[Get Character Data] Success',
    GetCharacterDataFail = '[Get Character Data] Fail',
    LoadCharacterList = '[Load Character List] Begin',
    LoadCharacterListSuccess = '[Load Character List] Success',
    LoadCharacterListFail = '[Load Character List] Fail',
}



export class LoadCharacterList implements Action {
    readonly type = MovieCharacterActionTypes.LoadCharacterList;

    constructor() { }
}

export class LoadCharacterListSuccess implements Action {
    readonly type = MovieCharacterActionTypes.LoadCharacterListSuccess;

    constructor(public payload: string) { }
}

export class LoadCharacterListFail implements Action {
    readonly type = MovieCharacterActionTypes.LoadCharacterListFail;

    constructor() { }
}

export class ChangeCharacterSelected implements Action {
    readonly type = MovieCharacterActionTypes.ChangeCharacterSelected;

    constructor(public payload: string) { }
}

export class GetCharacterDataBegin implements Action {
    readonly type = MovieCharacterActionTypes.GetCharacterDataBegin;

    constructor(public payload: {name: string, url: string}) { }
}

export class GetCharacterDataSuccess implements Action {
    readonly type = MovieCharacterActionTypes.GetCharacterDataSuccess;

    constructor(public payload: {movieCharacter: string, movies: {}}) { }
}

export class GetCharacterDataFail implements Action {
    readonly type = MovieCharacterActionTypes.GetCharacterDataFail;

    constructor(public payload: {'movieCharacter': string}) { }
}

export type MovieCharacterActions =
| ChangeCharacterSelected
| GetCharacterDataBegin
| GetCharacterDataSuccess
| GetCharacterDataFail
| LoadCharacterList
| LoadCharacterListSuccess
| LoadCharacterListFail;
/**
 * Created by jameslynch on 3/31/18.
 */
