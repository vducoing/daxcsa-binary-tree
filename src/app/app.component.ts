import { Component } from '@angular/core';
import { BinaryTreeComponent } from './binary-tree/binary-tree.component';

@Component({
  selector: 'app-root',
  imports: [BinaryTreeComponent],
  /*templateUrl: './app.component.html',*/
  template: `
    <h1>Daxcsa Binary Tree (Standalone Angular)</h1>
    <app-binary-tree></app-binary-tree>
  `,
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daxcsa-binary-tree';
}
