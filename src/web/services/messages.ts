import { Subject } from 'rxjs/Subject'

const enum Messages {
  REFRESH_VISUALIZATION,
  CHANGE_STEP_SELECTION
}

let Subjects = {};

for(let key in Messages) {
  Subjects[key] = new Subject();
}

export {
  Messages,
  Subjects
}
