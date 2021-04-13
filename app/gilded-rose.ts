export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  handleStandardItem = (itemIndex: number) => {
    const item = this.items[itemIndex];

    if (item.quality > 0) {
      item.quality--;
    }

    if (item.quality > 0 && item.sellIn <= 0) {
      item.quality--;
    }

    item.sellIn--;
  };

  handleAgedBrie = (itemIndex: number) => {
    const item = this.items[itemIndex];

    if (item.quality < 50) {
      item.quality++;
    }

    item.sellIn--;
  };

  handleBackstagePass = (itemIndex: number) => {
    const item = this.items[itemIndex];

    if (item.quality < 50) {
      item.quality++;
    }

    if (item.sellIn <= 10) {
      item.quality++;
    }

    if (item.sellIn <= 5) {
      item.quality++;
    }

    if (item.sellIn <= 0) {
      item.quality = 0;
    }

    item.sellIn--;
  };

  handleConjuredItem = (itemIndex: number) => {
    const item = this.items[itemIndex];

    if (item.quality < 50) {
      item.quality--;
      item.quality--;
    }

    item.sellIn--;
  };

  updateQuality = () => {
    this.items.forEach((item, index) => {
      switch (item.name) {
        case "+5 Dexterity Vest":
        case "Elixir of the Mongoose":
          this.handleStandardItem(index);
          break;
        case "Aged Brie": {
          this.handleAgedBrie(index);
          break;
        }
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.handleBackstagePass(index);
          break;
        case "Conjured Mana Cake":
          this.handleConjuredItem(index);
          break;
        default:
          throw new Error(`No handler for ${item.name}`);
      }
    });

    return this.items;
  };
}
