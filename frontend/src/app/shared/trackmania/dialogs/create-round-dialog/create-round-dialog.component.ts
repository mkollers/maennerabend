import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@shared/helper/components/base.component';
import storage from 'local-storage-fallback';
import { distinctUntilChanged, map, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'trackmania-create-round-dialog',
  templateUrl: './create-round-dialog.component.html',
  styleUrls: ['./create-round-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoundDialogComponent extends BaseComponent {
  fg: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public names: string[] = [],
    private _dialogRef: MatDialogRef<CreateRoundDialogComponent>,
    private _fb: FormBuilder,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    super();
    this._initFormGroup();
    this._updateQueryParams();
  }

  private _updateQueryParams() {
    this.fg.get('players').valueChanges.pipe(
      takeWhile(() => this.alive),
      map((values: { name: string }[]) => values.map(v => v.name)),  // flatten objects
      map(names => names.filter(n => !!n)),                          // remove empty string from list
      map(names => names.join(',')),                                 // join to comma seperated string
      distinctUntilChanged(),
      tap(names => storage.setItem('names', names)),
      tap(names => this._location.go(`${this._router.url.split('?')[0]}?names=${names}`))
    ).subscribe();
  }

  private _initFormGroup() {
    // Prefill data from query params or localstorage
    let names: string[];
    names = this._route.snapshot.queryParams.names.split(',');

    const players = [this._createPlayer(true, names[0]), this._createPlayer(true, names[1])];

    for (let i = 2; i < names.length; i++) {
      const player = this._createPlayer(true, names[i]);
      players.push(player);
    }

    this.fg = this._fb.group({
      players: this._fb.array(players)
    });
  }

  getCssGridRows() {
    const rows: number = this.fg.get('players')['controls'].length + 2;
    return new Array(rows).fill('auto').join(' ') + ' 1fr';
  }

  private _createPlayer(required = false, name = '') {
    const validators = [];
    if (required) {
      validators.push(Validators.required);
    }

    return this._fb.group({
      name: this._fb.control(name, validators)
    });
  }

  addPlayer() {
    const players = this.fg.get('players') as FormArray;
    players.push(this._createPlayer());
  }

  next() {
    const players: { name: string }[] = this.fg.get('players').value;
    const names = players.map(p => p.name);
    this._dialogRef.close(names);
  }
}
