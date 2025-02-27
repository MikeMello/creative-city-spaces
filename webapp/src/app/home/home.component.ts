import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';

import {DataPointsService} from '../data-points.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  points: [any];
  interestTypes: [any];

  constructor(private dp: DataPointsService) {}

  ngOnInit() {
    this.dp.getDistinctTypes().subscribe(d => this.interestTypes = d);
  }

  refreshPoints(ev) {
    this.dp.getDataPoints(ev.value).subscribe(d => {
      this.points = d.map(i => {
        let p: any = i;
        let z = p.coordinates.split(' ');
        p.lat = z[0];
        p.lng = z[1];
        return p;
      });
    });
  }
}
