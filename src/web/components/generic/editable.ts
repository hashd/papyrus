import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FocusMe } from '../../directives/focus_me'

@Component({
  selector: 'pa-editable',
  template: `
    <span class="ib editable-data" *ngIf="!isBeingEdited" (dblclick)="edit()">
      {{data}}
    </span>
    <input class="ib editable-input"
      type="text"
      *ngIf="isBeingEdited"
      [(ngModel)]="data"
      (blur)="saveName($event)"
      (keydown)="clearEdit($event)"
      focus-me
    />
  `
})
export class EditableField {
  @Input() data: string

  prevData: string
  isBeingEdited: boolean = false

  @Output() edited: EventEmitter<Object> = new EventEmitter<Object>()

  edit() {
    this.prevData = this.data
    this.isBeingEdited = true
  }

  clearEdit({ keyCode }) {
    if (keyCode === 13) {
      this.isBeingEdited = false
    }
  }

  saveName(e) {
    if (this.data === '') {
      this.data = this.prevData
      this.prevData = undefined
    } else if (this.data !== this.prevData) {
      this.edited.emit({
        value: this.data,
        prevValue: this.prevData
      })
    }

    this.isBeingEdited = false
  }
}
