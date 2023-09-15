import {
  PasswordChecker,
  PasswordErrors,
} from '../../app/pass_checker/PasswordChecker';

// A password is invalid if
// it is less than 8 characters long
// it does not contain at least one upper case letter
// it does not contain at least one lower case letter

// Requirement 2:
// Should return reasons why a password is invalid

// Requirement 3:
// refactor
// Admin password should also contain a number

describe('PasswordChecker', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('Password with less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it('Password with more than 8 chars is ok', () => {
    const actual = sut.checkPassword('12345678Ab');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('Password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('1234ABCD');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Password with lower case letter is ok', () => {
    const actual = sut.checkPassword('abcd');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('abcd');
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('Password with upper case letter is ok', () => {
    const actual = sut.checkPassword('abcD');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Complex password is valid', () => {
    const actual = sut.checkPassword('1abcDefgh');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toEqual([]);
  });

  it('Admin password with no number is invalid', () => {
    const actual = sut.checkAdminPassword('abcdABCD');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  });

  it('Admin password with number is ok', () => {
    const actual = sut.checkAdminPassword('abcdABCD1');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toEqual([]);
  });
});
