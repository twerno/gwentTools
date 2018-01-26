export function fillLeftStr(base: string, width: number, filler: string): string
{
  filler = filler || '0';
  base = base + '';
  return base.length >= width
    ? base
    : new Array(width - base.length + 1).join(filler) + base;
}

export function toCapitalizedLowerCase(str: string): string
{
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function lowerCaseCompare(str1: string, str2: string): boolean
{
  return str1.toLocaleLowerCase() === str2.toLocaleLowerCase();
}
