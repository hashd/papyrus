import { Element, NaiveElement } from './element'

export class Group extends Element {
  children: NaiveElement[] = []

  constructor(name: string, elements: NaiveElement[]) {
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
