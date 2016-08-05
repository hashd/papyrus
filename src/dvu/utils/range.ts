export class Range {
  static between(start: number, end: number): number[] {
    return (start < end) ?
      Array(end - start).map((_, idx) => start + idx) :
      Array(start - end).map((_, idx) => start - idx)
  }

  static of(start: number, end: number): number[] {
    return (start < end) ?
      Range.between(start, end + 1) :
      Range.between(start, end - 1)
  }
}
