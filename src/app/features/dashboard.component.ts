import {Component, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ChangeCharacterSelected, LoadCharacterList, GetCharacterDataBegin} from "../actions/movie-character.actions";
import {MatAutocomplete} from "@angular/material";

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss', './../app.component.scss']
})

export class DashboardComponent {

    private characterSelected: string = "";
    private movieCharacters = [];
    private moviesDisplayed = [];
    private keys = [];
    private errorOccurred = false;
    myControl: FormControl = new FormControl();
    options = ['a', 'b', 'c']
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

    onKey(event) {
        if (event.key === 'Enter' && this.myControl.value === '') {
            this.store.dispatch(new ChangeCharacterSelected(''))
        }
    }

    characterChosen(movieCharacterChosen) {
        this.errorOccurred = false;
        this.movieCharacters.map((movieCharacter) => {
            if (movieCharacter.name === movieCharacterChosen) {
                if (movieCharacter.movies) {
                    if (movieCharacter.movies.length === 0) {
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

    constructor(private http: HttpClient, private store: Store<any>) {
        this.store.dispatch(new LoadCharacterList())
        this.store.select(state => state)
            .subscribe((state) => {
                if (state.movieCharacters.errorOccurred) {
                    this.errorOccurred = true;
                }
                this.movieCharacters = [];

                if (state.movieCharacters.characterSelected !== null) {
                    this.characterSelected = state.movieCharacters.characterSelected;
                }

                if (!this.characterSelected) {
                    this.characterSelected = '';
                }

                if (state.movieCharacters.characterData) {
                    this.movieCharacters = state.movieCharacters.characterData;

                    for (var i = 0; i < this.movieCharacters.length; i++) {
                        if (this.movieCharacters[i].name === this.characterSelected) {
                            this.moviesDisplayed = this.movieCharacters[i].movies;
                        }
                    }
                }
            })
    }

}
