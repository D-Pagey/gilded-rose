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

  // generally I'm not a fan of mutating the original array
  // but in this case seemed quicker and cleaner than finding
  // and replacing the item in an array
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

    // Aged Brie increases in quality the older it gets
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

    // Quality increases by 2 when there are 10 days or less 
    if (item.sellIn <= 10) {
      item.quality++;
    }

    // Quality increases by 3 when there are 5 days or less
    if (item.sellIn <= 5) {
      item.quality++;
    }

    // Quality drops to 0 after the concert
    if (item.sellIn <= 0) {
      item.quality = 0;
    }

    item.sellIn--;
  };

  handleConjuredItem = (itemIndex: number) => {
    const item = this.items[itemIndex];

    // "Conjured" items degrade in Quality twice as fast as normal items
    if (item.quality < 50) {
      item.quality--;
      item.quality--;
    }

    item.sellIn--;
  };

  handleSulfuras = (itemIndex: number) => {
    const item = this.items[itemIndex];

    // potentially unneccessary but ensuring that if item
    // is added with wrong quality, then at least returns correct value
    item.quality = 80;
  };

  updateQuality = () => {
    this.items.forEach((item, index) => {
      // switch statement not as performant as if statement but readable
      // and easy to add / remove items in the future
      switch (item.name) {
        // the first few items share the handler for "standard" degredation
        case "+5 Dexterity Vest":
        case "Elixir of the Mongoose":
          this.handleStandardItem(index);
          break;
        case "Aged Brie": {
          this.handleAgedBrie(index);
          break;
        }
        case "Sulfuras, Hand of Ragnaros":
          this.handleSulfuras(index);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.handleBackstagePass(index);
          break;
        case "Conjured Mana Cake":
          this.handleConjuredItem(index);
          break;
        default:
          // quite a nice developer experience for if you pass in an item
          // that doesn't have a handler
          throw new Error(`No handler for ${item.name}`);
      }
    });

    return this.items;
  };
}
