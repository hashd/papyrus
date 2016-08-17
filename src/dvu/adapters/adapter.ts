import { convertObjectModelToSVG } from './svg/adapter'

export enum AdapterTypes {
  SVG
}

export function convertObjectModel(type: AdapterTypes, ...params) {
  let result

  if (type !== undefined) {
    switch (type) {
      case AdapterTypes.SVG:
        result = convertObjectModelToSVG(params[0], params[1], params[2], params[3])
      break
      default:
        // no op
    }
  }

  return result
}
