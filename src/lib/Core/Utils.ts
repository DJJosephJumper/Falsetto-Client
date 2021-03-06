import { reverseString } from './StringUtils';
import { precondition } from './Dbc';

export function identity<T>(value: T): T {
  return value;
}

export function unwrapValueOrUndefined<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new Error("Tried to unwrap an undefined value.");
  }

  return value;
}
export function unwrapMaybe<T>(value: T | null): T {
  if (value === null) {
    throw new Error("Tried to unwrap a null value.");
  }

  return value;
}

// TODO: add tests
export function reverseInt(x: number): number {
  return parseInt(reverseString(x.toString()), 10);
}

// TODO: add tests
export function getNonConstEnumValues(enumType: any): any[] {
  return Object.keys(enumType)
    .map(key => parseInt(enumType[key], 10))
    .filter(value => !isNaN(value));
}

// TODO: add tests
export function setBitIndicesToInt(setBitIndices: number[]): number {
  let result = 0;

  for (const bitIndex of setBitIndices) {
    result |= (1 << bitIndex);
  }

  return result;
}

export function isBitSet(bits: number, bitIndex: number): boolean {
  precondition(bitIndex >= 0);

  return (bits & (1 << bitIndex)) !== 0;
}

// TODO: add tests
export function getRomanNumerals(x: number): string {
  switch (x) {
    case 1: return "I";
    case 2: return "II";
    case 3: return "III";
    case 4: return "IV";
    case 5: return "V";
    case 6: return "VI";
    case 7: return "VII";
    case 8: return "VIII";
    case 9: return "IX";
    case 10: return "X";
    default:
      throw new Error(`Failed converting ${x} to a roman numeral.`);
  }
}