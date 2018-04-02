import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MovieCharacterActionTypes} from "../actions/movie-character.actions";
import 'rxjs/add/observable/forkJoin'
import {Store} from "@ngrx/store";

@Injectable()
export class MovieCharacterEffects {

    constructor(private http: HttpClient, private actions$: Actions, private store: Store<any>) { }

    @Effect() LoadCharacterList$ = this.actions$
        .ofType(MovieCharacterActionTypes.LoadCharacterList)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => {
            return this.http.get('./../../../assets/characters.json')
                .switchMap(res => {
                    return Observable.of({
                        type: MovieCharacterActionTypes.LoadCharacterListSuccess,
                        payload: res.characters.map((movieCharacter) => {
                            movieCharacter.movies = [];
                            return movieCharacter;
                        })
                    })
                })
                .catch((error) => {
                    Observable.of({type: MovieCharacterActionTypes.LoadCharacterListFail})
                });

        });

    @Effect() LoadCharacterDetails$ = this.actions$
        .ofType(MovieCharacterActionTypes.GetCharacterDataBegin)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => {
            payload = JSON.parse(payload);
            return this.http.get(payload.url)
                .switchMap(res => {
                    return Observable.forkJoin(res.films.map(film => {
                        return this.http.get(film)
                            .map(filmResponse => {
                                return {...filmResponse, 'movieUrl': film}
                            })
                    })).switchMap((res) => {
                        return Observable.of({
                            'type': MovieCharacterActionTypes.GetCharacterDataSuccess,
                            'payload': {'movieCharacter': payload.name, 'movies': res}
                        })
                    })
                })
                .catch((error) => {
                    return Observable.of({
                        type: MovieCharacterActionTypes.GetCharacterDataFail,
                        'movieCharacter': payload.name
                    })
                });
        })

    constructor(private actions$: Actions,
                private router: Router,
                private location: Location) {
    }
}
