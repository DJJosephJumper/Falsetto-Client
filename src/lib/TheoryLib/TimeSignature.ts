import { precondition } from '../Core/Dbc';

export class TimeSignature {
  public static parse(str: string): TimeSignature {
    const splitStr = str.split('/');
    return new TimeSignature(parseInt(splitStr[0], 10), parseInt(splitStr[1], 10));
  }

  public constructor(public numBeats: number, public beatNoteValue: number) {
    precondition(numBeats > 0);
    precondition(beatNoteValue > 0);
  }
  public toString(): string {
    return `${this.numBeats}/${this.beatNoteValue}`;
  }
}