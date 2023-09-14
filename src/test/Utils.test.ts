import { getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  // it or test are the same
  it('Should return uppercase', () => {
    // arrange
    const sut = toUpperCase;
    const expected = 'TEST';

    // act
    const actual = sut('test');

    // assert
    expect(actual).toBe(expected);
  });

  describe('getStringInfo for arg test should', () => {
    test('return right length', () => {
      const expected = 4;
      const actual = getStringInfo('test');

      expect(actual.length).toBe(expected);
    });

    test('return right lowerCase', () => {
      const actual = getStringInfo('test');

      expect(actual.lowerCase).toBe('test');
    });

    test('return right upperCase', () => {
      const actual = getStringInfo('test');

      expect(actual.upperCase).toBe('TEST');
    });

    test('return right characters', () => {
      const actual = getStringInfo('test');

      expect(actual.characters).toEqual(['t', 'e', 's', 't']);
      expect(actual.characters).toContain<string>('e');
      expect(actual.characters).not.toContain<string>('a');
      expect(actual.characters).toEqual(
        expect.arrayContaining(['t', 'e', 's', 't'])
      );
    });

    test('return defined extraInfo', () => {
      const actual = getStringInfo('test');
      expect(actual.extraInfo).toEqual({});
    });

    test('return right extraInfo', () => {
      const actual = getStringInfo('test');
      expect(actual.extraInfo).not.toBe(undefined);
      expect(actual.extraInfo).toBeDefined();
      expect(actual.extraInfo).toBeTruthy();
    });
  });
});
