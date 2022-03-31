import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// importing material ui items
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const MatModuleItems = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ...MatModuleItems
  ], 
  exports: [
    BrowserAnimationsModule,
    ...MatModuleItems
  ]
})
export class MaterialModule { }
