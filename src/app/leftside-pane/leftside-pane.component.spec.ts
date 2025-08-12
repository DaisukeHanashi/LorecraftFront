import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsidePaneComponent } from './leftside-pane.component';

describe('LeftsidePaneComponent', () => {
  let component: LeftsidePaneComponent;
  let fixture: ComponentFixture<LeftsidePaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftsidePaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftsidePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
