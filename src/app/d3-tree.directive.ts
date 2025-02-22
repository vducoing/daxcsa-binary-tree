import { Directive, ElementRef, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

// Extend D3's HierarchyNode type to include x0, y0, and _children.
interface ExtendedHierarchyNode<T> extends d3.HierarchyNode<T> {
  x0?: number;
  y0?: number;
  _children?: ExtendedHierarchyNode<T>[];
}

@Directive({
  standalone: true,
  selector: '[appD3Tree]'
})
export class D3TreeDirective implements OnChanges {

  @Input() data: any;
  @Output() nodeSelected = new EventEmitter<any>();

  private svg: any;
  private g: any;
  private width = 1200;
  private height = 800;
  private margin = { top: 20, right: 90, bottom: 30, left: 90 };

  // Only show N levels expanded initially.
  private MAX_DEPTH = 3;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.createSvg();
      this.updateTree();
    }
  }

  private createSvg(): void {
    // Clear any existing SVG elements.
    d3.select(this.el.nativeElement).selectAll('*').remove();

    // Create the main <svg> element.
    this.svg = d3.select(this.el.nativeElement)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    // Append a group for the tree.
    this.g = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private updateTree(): void {
    // Convert the data to a D3 hierarchy.
    const root: ExtendedHierarchyNode<any> = d3.hierarchy(this.data, (d: any) => d.children);

    // Collapse deeper levels initially.
    root.each((node: ExtendedHierarchyNode<any>) => {
      if (node.depth >= this.MAX_DEPTH) {
        node._children = node.children;
        node.children = undefined;
      }
    });

    // Prepare the tree layout.
    const treemap = d3.tree().size([this.width, this.height]);
    root.x0 = this.width / 2;
    root.y0 = 0;

    const update = (source: ExtendedHierarchyNode<any>) => {
      // Compute the new tree layout.
      const treeData = treemap(root);
      const nodes = treeData.descendants();
      const links = treeData.links();

      // Set each node's y position by its depth.
      nodes.forEach((d: any) => d.y = d.depth * 180);

      // ********** NODES **********
      const node = this.g.selectAll('g.node')
        .data(nodes, (d: any) => d.data.distributor_id);

      // Enter new nodes at the source's old position.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .on('click', (event: any, d: ExtendedHierarchyNode<any>) => {
          // Toggle children on click.
          if (d.children) {
            d._children = d.children;
            d.children = undefined;
          } else {
            d.children = d._children;
            d._children = undefined;
          }
          // Emit node details for further processing.
          this.nodeSelected.emit(d.data);
          update(d);
        });

      // Append circles for each node.
      nodeEnter.append('circle')
        .attr('r', 1e-6)
        .style('fill', (d: any) => d._children ? 'lightsteelblue' : '#fff')
        .transition()
        .duration(750)
        .attr('r', 8);

      // Append labels.
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', (d: any) => d.children || d._children ? -13 : 13)
        .attr('text-anchor', (d: any) => d.children || d._children ? 'end' : 'start')
        .text((d: any) => d.data.username)
        .style('fill-opacity', 1e-6)
        .transition()
        .duration(750)
        .style('fill-opacity', 1);

      // UPDATE existing nodes.
      const nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.transition()
        .duration(750)
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

      // Remove exiting nodes.
      const nodeExit = node.exit().transition()
        .duration(750)
        .attr('transform', () => `translate(${source.x},${source.y})`)
        .remove();
      nodeExit.select('circle').attr('r', 1e-6);
      nodeExit.select('text').style('fill-opacity', 1e-6);

      // ********** LINKS **********
      const link = this.g.selectAll('path.link')
        .data(links, (d: any) => d.target.data.distributor_id);

      // Enter new links.
      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // UPDATE links.
      const linkUpdate = linkEnter.merge(link);
      linkUpdate.transition()
        .duration(750)
        .attr('d', (d: any) => diagonal(d.source, d.target));

      // Remove exiting links.
      const linkExit = link.exit().transition()
        .duration(750)
        .attr('d', () => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach((d: ExtendedHierarchyNode<any>) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    // Helper function for drawing curved paths.
    const diagonal = (s: any, t: any) => {
      return `M ${s.x},${s.y}
              C ${(s.x + t.x) / 2},${s.y},
                ${(s.x + t.x) / 2},${t.y},
                ${t.x},${t.y}`;
    };

    update(root);
  }
}
