
let generator: number = 0;

export function nextId(): string
{
  return '' + (generator++);
}
