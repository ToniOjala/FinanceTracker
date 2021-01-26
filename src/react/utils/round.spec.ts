import { expect } from 'chai';
import { roundToDecimals, roundToDecimalsAsNumber } from './round';

describe('roundToDecimals', () => {
  it('returns correct value if is passed 0', () => {
    const roundedValue = roundToDecimals(0, 2);
    expect(roundedValue).equal('0.00');
  })

  it('returns correct value if is passed decimal value', () => {
    const roundedValue = roundToDecimals(214.12341, 3);
    expect(roundedValue).equal('214.123');
  })

  it('returns correct value if told to round to 0 decimals', () => {
    const roundedValue = roundToDecimals(2713.84, 0);
    expect(roundedValue).equal('2714');
  })
})

describe('roundToDecimalsAsNumber', () => {
  it('returns correct value if is passed 0', () => {
    const roundedValue = roundToDecimalsAsNumber(0, 2);
    expect(roundedValue).equal(0);
  })

  it('returns correct value if is passed decimal value', () => {
    const roundedValue = roundToDecimalsAsNumber(214.12341, 3);
    expect(roundedValue).equal(214.123);
  })

  it('returns correct value if told to round to 0 decimals', () => {
    const roundedValue = roundToDecimalsAsNumber(2713.84, 0);
    expect(roundedValue).equal(2714);
  })
})