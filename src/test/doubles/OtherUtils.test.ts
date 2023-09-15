import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe.skip('OtherUtils test suite', () => {
  describe('OtherStringUtils tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('Use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('abc');
      expect(toUpperCaseSpy).toBeCalledWith('abc');
      expect(toUpperCaseSpy).toBeCalledTimes(1);
    });

    test('Use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toBeCalledWith('abc');
    });

    test('Use a spy to replace the implementation of a method', () => {
      jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
        console.log('Calling mocked implementation!!!');
      });
      sut.callExternalService();
    });
  });

  // Way 1 to use mocks
  describe('Tracking callbacks with Jest mocks', () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('ToUpperCase - calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith('Invalid argument!');
      expect(callBackMock).toBeCalledTimes(1);
    });

    it('ToUpperCase - calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(callBackMock).toBeCalledWith('called function with abc');
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  // Way 2 to use mocks
  describe('Tracking callbacks', () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      // clearing tracking fields
      cbArgs = [];
      timesCalled = 0;
    });

    it('ToUpperCase - calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain('Invalid argument!');
      expect(timesCalled).toBe(1);
    });

    it('ToUpperCase - calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).toContain('called function with abc');
      expect(timesCalled).toBe(1);
    });
  });

  it('ToUpperCase - calls callback for invalid argument', () => {
    const actual = toUpperCaseWithCb('', () => {});
    expect(actual).toBeUndefined();
  });

  it('ToUpperCase - calls callback for valid argument', () => {
    const actual = toUpperCaseWithCb('abc', () => {});
    expect(actual).toBe('ABC');
  });

  it('Calculates complexity', () => {
    // This is a Stub
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someOtherInfo',
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
