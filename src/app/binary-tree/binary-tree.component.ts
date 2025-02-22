import { Component, OnInit } from '@angular/core';
import { DaxcsaDataService } from '../services/daxcsa-data.service';
import {D3TreeDirective} from '../d3-tree.directive';
import {CommonModule, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-binary-tree',
  template: `
    <!-- Container that hosts the D3 tree directive -->
    <div class="tree-container" appD3Tree [data]="data" (nodeSelected)="onNodeSelected($event)"></div>

    <!-- Display details for the selected node -->
    <div *ngIf="selectedNode" class="node-details">
      <h3>Selected Node Details</h3>
      <pre>{{ selectedNode | json }}</pre>
    </div>
  `,
  standalone: true,
  imports: [
    D3TreeDirective,
    JsonPipe,
    CommonModule
  ],
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit {
  data: any;
  selectedNode: any;

  constructor(private dataService: DaxcsaDataService) {}

  ngOnInit(): void {
    this.dataService.getTreeData().subscribe(json => {
      const attributes = json.data?.attributes || [];
      if (attributes.length > 0) {
        this.data = attributes[0];
      }
    });
  }

  onNodeSelected(node: any) {
    this.selectedNode = node;
  }
}
