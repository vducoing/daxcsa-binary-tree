import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';
import { DaxcsaDataService } from '../services/daxcsa-data.service';

@Component({
  selector: 'daxcsa-tree',
  standalone: true,
  template: `
    <div class="tree-wrapper">
      <h2>Daxcsa Binary Tree</h2>
      <div #chartContainer class="chart-container"></div>
    </div>
  `,
  styles: [`
    .tree-wrapper {
      width: 100%;
      height: 1200px;
      background-color: #f6f6f6;
      overflow: auto;
    }
    .chart-container {
      width: 100%;
      height: 100%;
    }
    h2 {
      text-align: center;
      margin: 20px;
    }
    @media (max-width: 600px) {
      .tree-wrapper { height: 800px; }
    }
  `]
})
export class DaxcsaTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  treeData: any;
  currentRoot: any;

  constructor(private dataService: DaxcsaDataService) {}

  ngOnInit() {
    this.dataService.getTreeData().subscribe(data => {
      console.log('Fetched data:', data);
      this.treeData = data;
      if (data && data.data && data.data.attributes && data.data.attributes.length > 0) {
        // Use the first element as the root.
        this.currentRoot = data.data.attributes[0];
        this.renderChart();
      } else {
        console.error('Data is empty or not in the expected format.');
      }
    });
  }

  ngAfterViewInit() {
    if (this.currentRoot) {
      this.renderChart();
    }
  }

  // Flatten nested data using d3.hierarchy.
  flattenData(root: any): any[] {
    const hierarchy = d3.hierarchy(root, d => d.children);
    const flat = hierarchy.descendants().map(n => ({
      ...n.data,
      depth: n.depth,
      height: n.height,
      parentId: n.parent ? n.parent.data.distributor_id : null
    }));
    return flat;
  }

  renderChart() {
    if (!this.currentRoot) {
      console.error('No root data to display.');
      return;
    }
    // Flatten the nested data
    const flatData = this.flattenData(this.currentRoot);
    console.log('Flat data:', flatData);
    // Clear container
    this.chartContainer.nativeElement.innerHTML = '';

    (new OrgChart() as any)
      .container(this.chartContainer.nativeElement)
      .data(flatData)
      .nodeId((d: any) => d.distributor_id)
      .parentNodeId((d: any) => d.parentId)
      .nodeWidth(() => 250)
      .nodeHeight(() => 175)
      .childrenMargin(() => 40)
      .compactMarginBetween(() => 15)
      .compactMarginPair(() => 80)
      .initialZoom(0.7)
      // Use d.data.* to access the original node info.
      .nodeContent((d: any) => {
        const info = d.data;
        return `
          <div style="padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 5px; width: 250px; font-family: Arial, sans-serif;">
            <div style="text-align: center; font-weight: bold; font-size: 16px; color: #111672; margin-bottom: 5px;">
              ${info.full_name}
            </div>
            <div style="text-align: center; color: #404040; font-size: 14px; margin-bottom: 10px;">
              ${info.username}
            </div>
            <div style="font-size: 13px; margin-bottom: 3px;"><strong>ID:</strong> ${info.distributor_id}</div>
            <div style="font-size: 13px; margin-bottom: 3px;"><strong>Status:</strong> ${info.status}</div>
            <div style="font-size: 13px; margin-bottom: 3px;"><strong>Product:</strong> ${info.product_name || 'N/A'}</div>
            <div style="font-size: 13px; margin-bottom: 3px;"><strong>Category:</strong> ${info.category_name || 'N/A'}</div>
            <div style="font-size: 13px; margin-bottom: 3px;"><strong>Binary:</strong> ${info.binary_placement}</div>
            <div style="font-size: 13px;"><strong># Children:</strong> ${info.num_children}</div>
          </div>
        `;
      })
      .render();
  }
}
