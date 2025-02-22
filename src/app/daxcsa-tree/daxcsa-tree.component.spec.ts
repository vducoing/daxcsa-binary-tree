import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaxcsaTreeComponent } from './daxcsa-tree.component';

describe('DaxcsaTreeComponent', () => {
  let component: DaxcsaTreeComponent;
  let fixture: ComponentFixture<DaxcsaTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaxcsaTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaxcsaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
