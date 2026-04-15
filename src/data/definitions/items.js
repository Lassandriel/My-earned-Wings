export const itemDb = {
  // Crafted Tools
  'craft-wanderstock': {
    id: 'craft-wanderstock',
    title: 'Wanderstock',
    desc: 'Ein einfacher Stock, der das Gehen am Boden erleichtert.',
    image: 'img/Crafting_walkingstick.webp',
    consumable: false
  },
  'craft-axe': {
    id: 'craft-axe',
    title: 'Steinaxt',
    desc: 'Unerlässlich für das Fällen von Bäumen.',
    image: 'img/Crafting_axe_1.webp',
    consumable: false
  },
  'craft-pickaxe': {
    id: 'craft-pickaxe',
    title: 'Spitzhacke',
    desc: 'Damit lassen sich auch härtere Felsen bezwingen.',
    image: 'img/Crafting_pickaxe_1.webp',
    consumable: false
  },
  'craft-bow': {
    id: 'craft-bow',
    title: 'Jagdbogen',
    desc: 'Deine Stimme im Wald. Erfordert Geschick.',
    image: 'img/Crafting_bow.webp',
    consumable: false
  },
  
  // Consumables (Quest Rewards)
  'Fresh Bread': {
    id: 'Fresh Bread',
    title: 'Frisches Brot',
    desc: 'Duftet herrlich und sättigt gut.',
    image: 'img/Item_Bread.webp',
    consumable: true,
    effect: { satiation: 25 }
  },
  'Massive Cookie': {
    id: 'Massive Cookie',
    title: 'Riesenkeks',
    desc: 'Ein Geschenk des Bäckers. Unglaublich süß.',
    image: 'img/Item_Cookie.webp',
    consumable: true,
    effect: { satiation: 40, energy: 5 }
  },
  'Dried Meat': {
    id: 'Dried Meat',
    title: 'Trockenfleisch',
    desc: 'Zäh, aber nahrhaft. Perfekt für lange Wanderungen.',
    image: 'img/Item_DriedMeat.webp',
    consumable: true,
    effect: { satiation: 15, energy: 15 }
  },
  
  // Key Items
  'Official Land Deed': {
    id: 'Official Land Deed',
    title: 'Offizielle Landurkunde',
    desc: 'Ein Dokument, das dir den Besitz deines Landes bestätigt.',
    image: 'img/Item_Deed.webp',
    consumable: false
  },
  'Book of Knowledge': {
    id: 'Book of Knowledge',
    title: 'Buch des Wissens',
    desc: 'Enthält die Geheimnisse des ersten Lichts.',
    image: 'img/Item_BookKnowledge.webp',
    consumable: false
  },
  'Ancient Scroll': {
    id: 'Ancient Scroll',
    title: 'Alte Schriftrolle',
    desc: 'Schwer zu entziffern, aber voller magischer Energie.',
    image: 'img/Item_Scroll.webp',
    consumable: false
  },
  'Whetstone': {
    id: 'Whetstone',
    title: 'Wetzstein',
    desc: 'Hält deine Klingen scharf und deinen Willen hart.',
    image: 'img/Item_Whetstone.webp',
    consumable: false
  },
  'Arrowhead': {
    id: 'Arrowhead',
    title: 'Pfeilspitze',
    desc: 'Ein Relikt des Jägers. Sehr präzise gefertigt.',
    image: 'img/Item_Arrowhead.webp',
    consumable: false
  },
  'Gilded Chisel': {
    id: 'Gilded Chisel',
    title: 'Vergoldeter Meißel',
    desc: 'Ein Werkzeug für wahre Meister der Formgebung.',
    image: 'img/Item_Chisel.webp',
    consumable: false
  }
};
