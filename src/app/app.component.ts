import { Component } from '@angular/core';
//import { BinaryTreeComponent } from './binary-tree/binary-tree.component';
import { DaxcsaTreeComponent } from './daxcsa-tree/daxcsa-tree.component';

@Component({
  selector: 'app-root',
  imports: [DaxcsaTreeComponent],
  /*templateUrl: './app.component.html',*/
  /*template: `
    <h1>Daxcsa Binary Tree (Standalone Angular)</h1>
    <app-binary-tree></app-binary-tree>
  `,*/
  standalone: true,
  /*styleUrl: './app.component.css'*/
  template: `
    <div class="app-container">
      <!-- The tree component is used here -->
      <daxcsa-tree></daxcsa-tree>
    </div>
  `,
  styles: [`
    .app-container {
      margin: 0 auto;
      max-width: 1200px;
      padding: 1rem;
    }
  `]
})
export class AppComponent {
  title = 'daxcsa-binary-tree';
}
