export const PasswordErrors = {
  SHORT: 'Password is too short!',
  NO_UPPER_CASE: 'Upper case letter required!',
  NO_LOWER_CASE: 'Lower case letter required!',
  NO_NUMBER: 'At least one number required!',
} as const;

export type PasswordError =
  (typeof PasswordErrors)[keyof typeof PasswordErrors];

export interface CheckResult {
  valid: boolean;
  reasons: PasswordError[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordError[] = [];

    this.CheckForLength(password, reasons);
    this.CheckForUpperCase(password, reasons);
    this.CheckForLowerCase(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reasons);
    return {
      valid: basicCheck.reasons.length > 0 ? false : true,
      reasons: basicCheck.reasons,
    };
  }

  private checkForNumber = (password: string, reasons: PasswordError[]) => {
    const hasNumberRegex = /\d/;
    if (!hasNumberRegex.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  };

  private CheckForLength(password: string, reasons: PasswordError[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private CheckForUpperCase(password: string, reasons: PasswordError[]) {
    if (password.toUpperCase() === password) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private CheckForLowerCase(password: string, reasons: PasswordError[]) {
    if (password.toLowerCase() === password) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }
}
