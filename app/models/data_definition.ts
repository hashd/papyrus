
export class DataDefinition {
  id: string
  name: string
  type: string
  
  constructor() {
    this.id = `dd-${+new Date()}`
  }
}
