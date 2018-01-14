export function fillLeftStr(base: string, width: number, filler: string): string
{
  filler = filler || '0';
  base = base + '';
  return base.length >= width
    ? base
    : new Array(width - base.length + 1).join(filler) + base;
}
