import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-system-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.scss'],
})
export class SystemDetailsComponent implements OnInit {
  systemDetails$?: Observable<any>;
  systemId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.systemDetails$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.systemId = params.get('id') ?? '';
        // Get systemDetails observable from service
        return of();
      })
    );
  }
}
