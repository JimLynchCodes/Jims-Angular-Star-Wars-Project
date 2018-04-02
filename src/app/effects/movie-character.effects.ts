import {Effect, Actions, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MovieCharacterActionTypes} from '../actions/movie-character.actions';
import 'rxjs/add/observable/forkJoin';
import {Store} from '@ngrx/store';

@Injectable()
export class MovieCharacterEffects {

    @Effect() loadCharacterList$ = this.actions$
        .ofType(MovieCharacterActionTypes.LoadCharacterList)
        .map((action: any) => JSON.stringify(action.payload))
        .switchMap(payload => {
            return this.http.get('./../../../assets/characters.json')
                .switchMap((res: any) => {
                    return Observable.of({
                        type: MovieCharacterActionTypes.LoadCharacterListSuccess,
                        payload: res.characters.map((movieCharacter: any) => {
                            movieCharacter.movies = [];
                            return movieCharacter;
                        })
                    });
                })
                .catch((error) => {
                    return Observable.of({type: MovieCharacterActionTypes.LoadCharacterListFail});
                });
        });

    @Effect() loadCharacterDetails$ = this.actions$
        .ofType(MovieCharacterActionTypes.GetCharacterDataBegin)
        .map((action: any) => JSON.stringify(action.payload))
        .switchMap((payload: any) => {
            payload = JSON.parse(payload);
            return this.http.get(payload.url)
                .switchMap((res: any) => {
                    return Observable.forkJoin(res.films.map((film: any) => {
                        return this.http.get(film)
                            .map(filmResponse => {
                                return {...filmResponse, 'movieUrl': film};
                            });
                    })).switchMap((response) => {
                        return Observable.of({
                            'type': MovieCharacterActionTypes.GetCharacterDataSuccess,
                            'payload': {'movieCharacter': payload.name, 'movies': response}
                        });
                    });
                })
                .catch((error) => {
                    return Observable.of({
                        type: MovieCharacterActionTypes.GetCharacterDataFail,
                        payload: {'movieCharacter': payload.name}
                    });
                });
        });

        constructor(private http: HttpClient, private actions$: Actions,
            private store: Store<any>) { }
}
