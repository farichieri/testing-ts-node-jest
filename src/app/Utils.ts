export class StringUtils {
  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error('Invalid argument!');
    }
    return arg.toUpperCase();
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: object | undefined;
};

/* istanbul ignore next */
export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: arg.split(''),
    length: arg.length,
    extraInfo: {},
  };
}

