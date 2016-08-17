import { Subject } from 'rxjs/Subject'

enum Messages {
  REMOVE_STEP,
  CHANGE_ELEMENT_SELECTION,
  CHANGE_STEP_SELECTION,
  CHANGE_BLOCK_SELECTION
}

let subjects = {}

for (let key in Messages) {
  if (Messages.hasOwnProperty(key)) {
    subjects[key] = new Subject()
  }
}

export {
  Messages,
  subjects
}
