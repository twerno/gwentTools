import { CardRarity, CardColor, Factionv1 } from '@src/commons/card/CardStruct';
import { fillLeftStr } from '@src/commons/String.helper';

export function cardRarity2Gem(rarity: CardRarity): string
{
  switch (rarity)
  {
    case CardRarity.COMMON: return 'asset_gem_common';
    case CardRarity.RARE: return 'asset_gem_rare';
    case CardRarity.EPIC: return 'asset_gem_epic';
    case CardRarity.LEGENDARY: return 'asset_gem_legendary';
  }
  return '';
}

export function cardColor2Border(cardColor: CardColor): string
{
  switch (cardColor)
  {
    case CardColor.BRONZE: return 'asset_border_bronze';
    case CardColor.SILVER: return 'asset_border_silver';
    case CardColor.GOLD: return 'asset_border_gold';
  }
  return '';
}

export function cardColor2BorderWide(cardColor: CardColor): string
{
  switch (cardColor)
  {
    case CardColor.BRONZE: return 'asset_wide_border_bronze';
    case CardColor.SILVER: return 'asset_wide_border_silver';
    case CardColor.GOLD: return 'asset_wide_border_gold';
  }
  return '';
}

export function cardFaction2Frame(faction: Factionv1): string
{
  switch (faction)
  {
    case Factionv1.MONSTERS: return 'asset_frame_monster';
    case Factionv1.NEUTRAL: return 'asset_frame_neutral';
    case Factionv1.NILFGAARD: return 'asset_frame_nilfgaard';
    case Factionv1.NORTHERN_REALMS: return 'asset_frame_northern';
    case Factionv1.SCOIATAEL: return 'asset_frame_scoiatael';
    case Factionv1.SKELLIGE: return 'asset_frame_skellige';
  }
  return '';
}

export function cardFaction2FrameWide(faction: Factionv1): string
{
  switch (faction)
  {
    case Factionv1.MONSTERS: return 'asset_frame_monster_wide';
    case Factionv1.NEUTRAL: return 'asset_frame_neutral_wide';
    case Factionv1.NILFGAARD: return 'asset_frame_nilfgaard_wide';
    case Factionv1.NORTHERN_REALMS: return 'asset_frame_northern_wide';
    case Factionv1.SCOIATAEL: return 'asset_frame_scoiatae_widel';
    case Factionv1.SKELLIGE: return 'asset_frame_skellige_wide';
  }
  return '';
}

export function cardFaction2BanerBasic(faction: Factionv1): string
{
  switch (faction)
  {
    case Factionv1.MONSTERS: return 'asset_banner_basic_monster';
    case Factionv1.NEUTRAL: return 'asset_banner_basic_neutral';
    case Factionv1.NILFGAARD: return 'asset_banner_basic_nilfgaard';
    case Factionv1.NORTHERN_REALMS: return 'asset_banner_basic_northern';
    case Factionv1.SCOIATAEL: return 'asset_banner_basic_scoiatael';
    case Factionv1.SKELLIGE: return 'asset_banner_basic_skellige';
  }
  return '';
}

export function gwentNumber(num: number): string
{
  return `asset_number_${num}`;
}

export function bgColor(faction: Factionv1): string
{
  switch (faction)
  {
    case Factionv1.MONSTERS: return 'asset_faction_color_monster';
    case Factionv1.NEUTRAL: return 'asset_faction_color_neutral';
    case Factionv1.NILFGAARD: return 'asset_faction_color_nilfgaard';
    case Factionv1.NORTHERN_REALMS: return 'asset_faction_color_northern';
    case Factionv1.SCOIATAEL: return 'asset_faction_color_scoiatael';
    case Factionv1.SKELLIGE: return 'asset_faction_color_skellige';
  }
  return '';
}

export function getSmallImgUrl(id: string, remote: boolean = false): string
{
  id = fillLeftStr(id, 5, '0');

  if (remote || process.env.NODE_ENV === 'production')
  {
    return `https://s3-eu-west-1.amazonaws.com/gwenttools/cards/small/${id}.jpg`;
  }
  return `./remoteAssets/small/${id}.jpg`;
}

export function getMediumImgUrl(id: string): string
{
  id = fillLeftStr(id, 5, '0');

  if (process.env.NODE_ENV === 'production')
  {
    return `./remoteAssets/medium/${id}.jpg`;
    // return `https://s3-eu-west-1.amazonaws.com/gwenttools/cards/${id}.jpg`;
  }
  return `./remoteAssets/medium/${id}.jpg`;
}

function getRandomInt(max: number): number
{
  return Math.floor(Math.random() * Math.floor(max));
}
