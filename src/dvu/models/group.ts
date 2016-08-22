import { BasicElement, Element } from './element'

export class Group extends BasicElement {
  children: Element[] = []

  constructor(name: string, elements: Element[]) {
    super(name)
    this.children = [...elements]

    this.setMagnets()
  }

  protected setMagnets() {
    this.magnets = this.children.reduce((magnets, child) => {
      return [...magnets, ...child.getMagnets().map(magnet => magnet.clone(`${child.name}'s ${magnet.name}`))]
    }, [])
  }
}
