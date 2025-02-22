import { Component } from '@angular/core';
import { DaxcsaTreeComponent } from './daxcsa-tree/daxcsa-tree.component';

@Component({
  selector: 'app-root',
  imports: [DaxcsaTreeComponent],
  standalone: true,
  template: `
    <div class="app-container">
      <daxcsa-tree></daxcsa-tree>
    </div>
  `,
  styles: [`
    .app-container {
      margin: 0 auto;
      max-width: 1200px;
      padding: 1rem;
    }
    /* Medium devices */
    @media (max-width: 768px) {
      .app-container {
        max-width: 90%;
        padding: 0.75rem;
      }
    }
    /* Small devices */
    @media (max-width: 480px) {
      .app-container {
        max-width: 100%;
        padding: 0.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'daxcsa-binary-tree';
}
