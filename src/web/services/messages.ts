import { Subject } from 'rxjs/Subject'

export const enum Messages {
  REMOVE_STEP,
  CHANGE_ELEMENT_SELECTION,
  CHANGE_STEP_SELECTION
}

export let Subjects = {};

for(let key in Messages) {
  Subjects[key] = new Subject();
}
