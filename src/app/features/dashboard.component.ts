import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {TransferHttp} from '../../modules/transfer-http/transfer-http';

import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {User} from '../user/user.model';
import {Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as UserActions from '../user/user.actions';
import {ChangeCharacterSelected, LoadCharacterList, GetCharacterDataBegin} from "../actions/movie-character.actions";
import {MatAutocomplete} from "@angular/material";

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [`#my-logout-button { background: #F44336 }`],
    styleUrls: ['dashboard.component.scss', './../app.component.scss']
})

export class DashboardComponent implements OnDestroy, OnInit {

    private currentMovies = [{name: 'star wars'}]
    private name: string = "Jimbo"
    private characterSelected: string = "";
    private movieCharacters = [];
    private moviesDisplayed = [];
    private keys = [];
    private errorOccurred = false;
    myControl: FormControl = new FormControl();
    stateCtrl: FormControl;
    options = ['a', 'b', 'c']
    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    filteredStates: Observable<any[]>;
    states: string[] = ['Arkansas', 'Arkfornia', 'Florida', 'Texas'];
    @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

    filterStates(name: string): string[] {
        if (!name) {
            name = '';
        }
        if (this.movieCharacters) {
            if (this.movieCharacters.length > 0) {
                return this.movieCharacters.filter(state => {
                    return state.name.toLowerCase().indexOf(name.toLowerCase()) === 0;
                })
            }

        }
    }


    autocompleteBlurr() {
        console.log('autocomplete clurr!')
    }

    onKey(event) {
        console.log('onKey event', event);
        console.log(this.myControl.value);

        console.log(event.target)

        if (event.key === 'Enter' && this.myControl.value === '') {
            console.log('chyeaaaa')
            this.store.dispatch(new ChangeCharacterSelected(''))
        }
    }

    characterChosen(movieCharacterChosen) {


        this.errorOccurred = false;
        console.log('character chosen! ' + this.myControl.value)

        console.log('chosen ', movieCharacterChosen);


        this.movieCharacters.map((movieCharacter) => {

            if (movieCharacter.name === movieCharacterChosen) {
                console.log('derp: ');
                console.log(movieCharacter);
                console.log('call to', movieCharacter.url);
                console.log('call to', movieCharacter.movies);
                console.log('call to 3', movieCharacter.movies == []);

                if (movieCharacter.movies === []) {
                }


                if (movieCharacter.movies) {
                    console.log('calling for movies!')

                    if (movieCharacter.movies.length === 0) {
                        console.log('calling for movies2! ', movieCharacter.name)
                        this.store.dispatch(new GetCharacterDataBegin({
                            'name': movieCharacter.name,
                            'url': movieCharacter.url
                        }))
                    } else {
                        this.store.dispatch(new ChangeCharacterSelected(movieCharacter.name))
                    }

                }


            }
        })

    }

    //
    // console.log('filtering ', name)
    // return this.states;
    //
    // this.states.filter(state =>
    // state.toLowerCase().indexOf(name.toLowerCase()) === 0);


    chooseFirstOption(): void {
        this.matAutocomplete.options.first.select();
    }

    // this.people = _store.select('people');
    constructor(private http: HttpClient, private store: Store<any>) {

        this.store.dispatch(new LoadCharacterList())

        this.store.select(state => state)
            .subscribe((state) => {

            console.log('GETTING NEW STATE!')
            console.log(state)


            if (state.movieCharacters.errorOccurred) {
                this.errorOccurred = true;
            }

                // this.keys = Object.keys(this.movieCharacters);
                console.log('keys: ' + this.keys);
                this.movieCharacters = [];

                if (state.movieCharacters.characterSelected !== null) {
                    this.characterSelected = state.movieCharacters.characterSelected;
                    console.log('setting!!!!!!', this.characterSelected)
                }

                if (!this.characterSelected) {
                    this.characterSelected = '';
                }


                console.log('THIS ', this.movieCharacters);
                console.log('THIS2 ', state.movieCharacters.characterData);
                console.log('THIS2 ', state.movieCharacters.characterData);


                if (state.movieCharacters.characterData) {
                this.movieCharacters = state.movieCharacters.characterData;

                    for (var i = 0; i < this.movieCharacters.length; i++) {

                        console.log('oh yeah' + this.movieCharacters[i].name);
                        console.log('si' + this.characterSelected);
                        if (this.movieCharacters[i].name === this.characterSelected) {
                            this.moviesDisplayed = this.movieCharacters[i].movies;

                            console.log('setting movies! ', this.moviesDisplayed)
                        }
                    }
                }
            })
    }

        //
        // console.log('state here is: ' + state.movieCharacters.characterData);
        // console.log(state.movieCharacters.characterData);
        // console.log('state here is: ' + state.movieCharacters.characterSelected);
        // console.log(state);


    ngOnInit() {

    };


    ngOnDestroy() {
        // this.destroyed$.next();
    }

    characterClicked(character: string) {

        console.log('clickskies! ', character);


        this.store.dispatch(new ChangeCharacterSelected(character))
    }

}
