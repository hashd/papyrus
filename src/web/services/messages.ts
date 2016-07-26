import { Subject } from 'rxjs/Subject'

const enum Messages {
  REFRESHVISUALIZATION
}

let Subjects = {};

for(let key in Messages) {
  Subjects[key] = new Subject();
}

export {
  Messages,
  Subjects
}
