import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Button } from 'src/app/model/button';
import { System } from 'src/app/model/system/system';
import { PreviewSystem } from 'src/app/data/preview-system';
import { SystemsDataService } from 'src/app/services/systems-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-system',
  templateUrl: './new-system.component.html',
  styleUrls: ['./new-system.component.scss'],
})
export class NewSystemComponent {
  titleButtons: Button[] = [
    {
      icon: 'arrow_back',
      text: 'Impianti',
      color: 'is-primary is-light',
      url: '/systems',
    },
  ];
  iconsList = [
    'home',
    'apartment',
    'store',
    'storefront',
    'account_balance',
    'work',
    'fax',
    'shopping_bag',
  ];

  colorsList = [
    'is-dark',
    'is-light',
    'is-primary',
    'is-link',
    'is-info',
    'is-success',
    'is-warning',
    'is-danger',
  ];
  selectedIconIndex?: number;
  selectedColorIndex?: number;
  previewSystem: System;

  constructor(
    private systemsDataService: SystemsDataService,
    private router: Router
  ) {
    this.selectedIconIndex = 0;
    this.selectedColorIndex = 0;
    // Initialize preview system
    this.previewSystem = PreviewSystem;
    this.previewSystem.name = '';
    this.previewSystem.icon = this.iconsList[this.selectedIconIndex];
    this.previewSystem.color = this.colorsList[this.selectedColorIndex];
  }

  onIconClick(index: number): void {
    this.selectedIconIndex = index;
    this.previewSystem.icon = this.iconsList[this.selectedIconIndex];
  }

  onColorClick(index: number): void {
    this.selectedColorIndex = index;
    this.previewSystem.color = this.colorsList[this.selectedColorIndex];
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    // const newSystem: AddSystemRequest = {
    //   name: this.previewSystem.name,
    //   color: this.previewSystem.color,
    //   icon: this.previewSystem.icon,
    // };
    this.systemsDataService.addSystem(this.previewSystem).subscribe(() => {
      // TODO: Display confirm popup
      this.router.navigate(['/systems']);
    });
  }
}
