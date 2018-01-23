import { CardFilterHelper, CardFilterType } from '@src/commons/card/CardFilter';
import { CardColor, CardType, Factionv1 } from '@src/commons/card/CardStruct';
import { testCardSet } from '@test/commons/card/CardData';

const helper: CardFilterHelper = new CardFilterHelper();

test('Card filter test 1', () =>
{
  const filter: CardFilterType =
    {
      operator: 'AND',
      filters: [
        { cardColor: CardColor.BRONZE },
        { cardType: CardType.UNIT },
        { faction: Factionv1.MONSTERS }
      ]
    };

  const filtered = helper.filter(testCardSet, filter);

  expect(filtered.length).toBe(1);
  expect(filtered[0]).toBe(testCardSet[0]);

});

test('Card filter test 2', () =>
{
  const filter: CardFilterType =
    {
      operator: 'OR',
      filters: [
        {
          operator: 'AND',
          filters: [
            { cardColor: CardColor.BRONZE },
            { cardType: CardType.UNIT },
            { faction: Factionv1.MONSTERS }
          ]
        },
        {
          cardType: CardType.LEADER
        }
      ]
    };

  const filtered = helper.filter(testCardSet, filter);

  expect(filtered.length).toBe(2);
  expect(filtered[0]).toBe(testCardSet[0]);
  expect(filtered[1]).toBe(testCardSet[2]);
});

test('Card filter test 3', () =>
{
  const filter: CardFilterType =
    {
      operator: 'AND',
      filters: [
        {
          operator: 'OR',
          filters: [
            { cardColor: CardColor.BRONZE },
            { cardColor: CardColor.GOLD },
          ]
        },
        {
          operator: 'NOT',
          filters: [{ faction: Factionv1.NEUTRAL }]
        }
      ]
    };

  const filtered = helper.filter(testCardSet, filter);

  expect(filtered.length).toBe(1);
  expect(filtered[0]).toBe(testCardSet[0]);
});

test('Card filter test 4', () =>
{
  const filter: CardFilterType =
    {
      operator: 'AND',
      filters: []
    };

  const filtered = helper.filter(testCardSet, filter);

  expect(filtered.length).toBe(testCardSet.length);
});

test('Card filter test 5', () =>
{
  const filter: CardFilterType = {};
  const filtered = helper.filter(testCardSet, filter);

  expect(filtered.length).toBe(0);
});
