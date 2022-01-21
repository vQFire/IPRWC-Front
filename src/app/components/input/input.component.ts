import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'input-label',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements AfterViewInit {

  @Input("type") type = "text";
  @Input("label") label = ""
  @Input("class") class = ""
  @Input("control") control: FormControl = new FormControl();
  @Output()
  inputChanged: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild("input") input: any;
  focussed = false;
  id: string;

  private value: Boolean | null = null;

  alwaysActiveType = ["date", "textarea"]

  constructor() {
    this.id = this.randomString()
  }

  randomString (length = 16) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }

    return result;
  }

  /**
   * Each time a input is focussed or blurred this method is called.
   * When the input has a value it stays in the focussed state.
   */
  updateLabel(): void {
    const element = this.input.nativeElement
    const label = element.parentElement.querySelector("label")

    if (this.alwaysActiveType.includes(element.type)) return;

    this.focussed = element.value.length > 0 ? true : !this.focussed

    if (this.focussed) {
      label.classList.add("input-label--active")
    } else {
      label.classList.remove("input-label--active")
    }
  }

  ngAfterViewInit(): void {
    if (this.input && this.input.nativeElement.value.length != 0) {
      this.updateLabel()
    }
    if (this.input && this.alwaysActiveType.includes(this.input.nativeElement.type)) {
      const element = this.input.nativeElement
      const label = element.parentElement.querySelector("label")

      label.classList.add("input-label--active")
    }
  }

  updateCheck(event: any): void {
    if (this.value === null) {
      this.value = event.target.value === "true";
    }

    this.value = !this.value
    this.control.setValue(this.value)
  }

  inputUpdated (event: Event): void {
    if (this.type === "checkbox") {
      this.updateCheck(event)
    }

    this.inputChanged.emit(event)
  }
}
