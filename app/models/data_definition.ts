
export class DataDefinition {
  id: string
  name: string
  type: string
  defaultValue: number | string | Array<any>
  
  constructor() {
    this.id = `dd-${+new Date()}`
  }
}
