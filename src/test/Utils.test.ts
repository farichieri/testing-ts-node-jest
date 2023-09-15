import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils';

// Jest Hooks
// Hooks inside describe blocks
describe('Utils test suite', () => {
  describe.only('StringUtils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
    });

    // afterAll(() => {
    // });

    // it.todo('testing todo');

    it('Should return correct uppercase', () => {
      const actual = sut.toUpperCase('test');
      const expected = 'TEST';
      expect(actual).toBe(expected);
    });

    it('Should throw error on invalid argument - function', () => {
      function expectError() {
        const actual = sut.toUpperCase('');
        return actual;
      }
      expect(expectError).toThrow();
      expect(expectError).toThrowError('Invalid argument!');
    });

    it('Should throw error on invalid argument - arrow function', () => {
      expect(() => {
        sut.toUpperCase('');
      }).toThrowError('Invalid argument!');
    });

    it('Should throw error on invalid argument - try catch block', (done) => {
      try {
        sut.toUpperCase('');
        done('Should throw error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument!');
        done();
      }
    });
  });

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

  // Parameterized tests
  describe('ToUpperCase examples', () => {
    it.each([
      { input: 'test', expected: 'TEST' },
      { input: 'test1', expected: 'TEST1' },
      { input: 'My-String', expected: 'MY-STRING' },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
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
