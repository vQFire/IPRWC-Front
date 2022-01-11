import {ComponentFixture, TestBed} from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should have 1 id for the input and the label', () => {
    const holder: HTMLElement = fixture.nativeElement.querySelector(".input-holder")

    const label = holder.querySelector("label")!
    const input = holder.querySelector("input")!

    expect(label.getAttribute("for")).toEqual(input.id)
  })

  it('Label should get active class when input is focussed',() => {
    const holder: HTMLElement = fixture.nativeElement.querySelector(".input-holder")

    const label = holder.querySelector("label")!

    component.updateLabel()

    expect(label.classList).toContain("input-label--active")
  })
});
