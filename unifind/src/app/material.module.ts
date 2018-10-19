import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule],
    exports: [MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule]
})

export class MaterialModule {}