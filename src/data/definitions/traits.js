export const traitDb = {
  woodcutter: {
    id: 'woodcutter',
    title: 'Woodcutter',
    desc: 'You have learned the rhythm of the forest.',
    requirement: 100,
    counter: 'wood',
    bonusText: '+10% Wood Yield',
    bonusType: 'yield_wood',
    bonusMultiplier: 1.1
  },
  prospector: {
    id: 'prospector',
    title: 'Prospector',
    desc: 'Every crack in the stone tells you where to strike.',
    requirement: 100,
    counter: 'stone',
    bonusText: '+10% Stone Yield',
    bonusType: 'yield_stone',
    bonusMultiplier: 1.1
  },
  meditator: {
    id: 'meditator',
    title: 'High-Seeker',
    desc: 'The sky is no longer just a void to you.',
    requirement: 50,
    counter: 'magic',
    bonusText: '+20% Magic Gain',
    bonusType: 'yield_magic',
    bonusMultiplier: 1.2
  },
  survivor: {
    id: 'survivor',
    title: 'Ground Survivor',
    desc: 'Berries and wild roots are your allies.',
    requirement: 50,
    counter: 'food',
    bonusText: 'Satiation drops 15% slower',
    bonusType: 'satiation_decay',
    bonusMultiplier: 0.85
  },
  merchant: {
    id: 'merchant',
    title: 'Shard Merchant',
    desc: 'You know exactly what they value up there.',
    requirement: 500,
    counter: 'shards',
    bonusText: '+5% Shards from Trading',
    bonusType: 'shards_bonus',
    bonusMultiplier: 1.05
  }
};
