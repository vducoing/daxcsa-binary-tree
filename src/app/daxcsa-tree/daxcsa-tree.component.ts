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
        // Use the first object as the root
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

  // Flatten nested JSON data using d3.hierarchy.
  flattenData(root: any): any[] {
    // Create a hierarchy. d3.hierarchy automatically uses a function to access children.
    const hierarchy = d3.hierarchy(root, d => d.children);
    // Map each node to a flat object and add a parentId property.
    const flat = hierarchy.descendants().map(n => ({
      ...n.data,
      depth: n.depth,
      height: n.height,
      // If n.parent is null, then this is the root; set parentId to null.
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
      // Pass the flat array of nodes
      .data(flatData)
      // Specify the unique id accessor
      .nodeId((d: any) => d.distributor_id)
      // Specify the parent id accessor so the chart can rebuild the hierarchy.
      .parentNodeId((d: any) => d.parentId)
      .nodeWidth(() => 250)
      .nodeHeight(() => 175)
      .childrenMargin(() => 40)
      .compactMarginBetween(() => 15)
      .compactMarginPair(() => 80)
      .initialZoom(0.7)
      .nodeContent((d: any) => {
        // Use a placeholder image if none is provided.
        const imageUrl = d.imageUrl || 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/YEGVFNBR5ZIJTPY6BWUR4R2P2E.jpg';//'https://via.placeholder.com/60';
        return `
          <div style="padding-top:30px;margin-left:1px;height:${175 + 32}px;border-radius:2px;overflow:visible">
            <div style="height:${175}px;padding-top:0;background-color:white;border:1px solid lightgray;">
              <img src="${imageUrl}"
                   style="margin-top:-30px;margin-left:${(250 / 2 - 30)}px;border-radius:100px;width:60px;height:60px;" />
              <div style="margin-right:10px;margin-top:15px;float:right">${d.distributor_id}</div>
              <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${250 - 2}px;border-radius:1px"></div>
              <div style="padding:20px; padding-top:35px;text-align:center">
                <div style="color:#111672;font-size:16px;font-weight:bold">${d.full_name}</div>
                <div style="color:#404040;font-size:16px;margin-top:4px">${d.username}</div>
              </div>
              <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                <div>Manages: ${d.num_children} 👤</div>
                <div>Oversees: N/A 👤</div>
              </div>
            </div>
          </div>
        `;
      })
      .render();
  }
}
