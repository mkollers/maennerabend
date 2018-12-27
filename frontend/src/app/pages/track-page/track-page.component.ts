import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeWhile, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/helper/components/base.component';

import { HeaderService } from '../../shared/layout/services/header.service';
import { Observable } from 'rxjs';
import { LapTime } from 'src/app/shared/data-access/models/lap-time';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.scss']
})
export class TrackPageComponent extends BaseComponent {
  lapTimes$: Observable<LapTime[]>;
  displayedColumns = ['position', 'name', 'time'];

  constructor(
    private _header: HeaderService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _title: Title
  ) {
    super();
    this.setPageData();

    this.lapTimes$ = _route.data.pipe(
      map(data => data.lapTimes)
    );
  }

  setPageData() {
    const urlTree = this._router.createUrlTree(['..'], { relativeTo: this._route.parent });
    this._header.navigateBackUri = urlTree.toString();

    this._route.parent.params.pipe(
      takeWhile(() => this.alive),
      map(params => +params.trackId),
      tap(value => this._header.headline = `Track ${value.toString().padStart(3, '0')}`),
      tap(value => this._title.setTitle(`Track ${value.toString().padStart(3, '0')} - Männerabend 2.0`))
    ).subscribe();
  }
}
