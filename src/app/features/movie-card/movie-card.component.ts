import {Component, ViewChild, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ChangeCharacterSelected,
        LoadCharacterList,
        GetCharacterDataBegin} from '../../actions/movie-character.actions';
import {MatAutocomplete} from '@angular/material';

@Component({
    selector: 'movie-card',
    templateUrl: 'movie-card.component.html',
    styleUrls: ['movie-card.component.scss', '../../app.component.scss']
})

export class MovieCardComponent {

    @Input() movie: any;

}
