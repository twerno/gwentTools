import { Unit } from '@src/duelCalc/DuelCalcComponent';

export interface IDuelist
{
  initial: {
    strength: number;
    armor: number;
  };

  remaining: {
    strength: number;
    armor: number;
  };
}

export interface IDuelResult
{
  id: string;
  points: number;
  duelist1: IDuelist;
  duelist2: IDuelist;
}

export class DuelCalcService
{

  private cache: { [key: string]: IDuelResult } = {};
  private cacheSize: number = 0;
  private readonly cacheLimit: number = 1000;

  public calculate(units: Unit[]): IDuelResult[]
  {
    const scores: IDuelResult[] = [];

    units.forEach(
      (unit1, index1) => units.forEach((unit2, index2) =>
      {
        if (index1 !== index2
          && (unit1.strength || 0) !== 0
          && (unit2.strength || 0) !== 0)
        {
          scores.push(this.calculateScore(unit1, unit2));
        }
      }));

    return this.removeDuplicates(scores)
      .sort(DuelCalcService.sort);
  }

  private calculateScore(unit1: Unit, unit2: Unit): IDuelResult
  {
    const duelist1 = this.unit2Duelist(unit1);
    const duelist2 = this.unit2Duelist(unit2);
    const id: string = this.score2Key(duelist1, duelist2);

    return this.cache[id]
      || this.internalCalculateScore(id, duelist1, duelist2);
  }

  private internalCalculateScore(id: string, duelist1: IDuelist, duelist2: IDuelist): IDuelResult
  {
    let points: number = 0;
    let turn: boolean = true;

    while (duelist1.remaining.strength > 0 && duelist2.remaining.strength > 0)
    {
      points += turn
        ? this.duel(duelist1, duelist2)
        : this.duel(duelist2, duelist1);
      turn = !turn;
    }

    const result = { id, points, duelist1, duelist2 };
    this.add2Cache(result);
    return result;
  }

  private unit2Duelist(unit: Unit): IDuelist
  {
    return {
      initial: {
        strength: unit.strength || 0,
        armor: unit.armor || 0
      },
      remaining: {
        strength: unit.strength || 0,
        armor: unit.armor || 0
      }
    };
  }

  private duel(duelist1: IDuelist, duelist2: IDuelist): number
  {
    const power: number = duelist1.remaining.strength;
    const powerReduction: number = Math.min(power, duelist2.remaining.armor);
    duelist2.remaining.armor -= powerReduction;

    const score: number = Math.min(power - powerReduction, duelist2.remaining.strength);
    duelist2.remaining.strength -= score;

    return score;
  }

  private removeDuplicates(scores: IDuelResult[]): IDuelResult[]
  {
    const keys: { [key: string]: IDuelResult } = {};

    return scores.filter((score, index) =>
    {
      if (keys[score.id] === undefined)
      {
        keys[score.id] = score;
        return true;
      }
      return false;
    });
  }

  private score2Key(duelist1: IDuelist, duelist2: IDuelist): string
  {
    return JSON.stringify({
      duelist1: duelist1.initial,
      duelist2: duelist2.initial
    });
  }

  private add2Cache(result: IDuelResult): void
  {
    if (this.cacheSize >= this.cacheLimit)
    {
      this.cache = {};
      this.cacheSize = 0;
    }

    this.cache[result.id] = result;
    this.cacheSize++;
  }

  private static sort(a: IDuelResult, b: IDuelResult): number
  {
    const sortFnList = [
      () => b.points - a.points,
      () => b.duelist1.initial.strength - a.duelist1.initial.strength,
      () => b.duelist1.initial.armor - a.duelist1.initial.armor,
      () => b.duelist2.initial.strength - a.duelist2.initial.strength,
      () => b.duelist2.initial.armor - a.duelist2.initial.armor,
      () => b.duelist1.remaining.strength - a.duelist1.remaining.strength,
      () => b.duelist1.remaining.armor - a.duelist1.remaining.armor,
      () => b.duelist2.remaining.strength - a.duelist2.remaining.strength,
      () => b.duelist2.remaining.armor - a.duelist2.remaining.armor
    ];

    for (const sortFn of sortFnList)
    {
      const result = sortFn.apply(undefined);

      if (result !== 0)
      {
        return result;
      }
    }

    return 0;
  }

}
