import { Item, GildedRose } from "./gilded-rose";

describe("Gilded Rose", () => {
  it.each`
    itemName
    ${"+5 Dexterity Vest"}
    ${"Elixir of the Mongoose"}
  `(
    "$itemName should decrease in quality and sellIn each update",
    ({ itemName }) => {
      const sellIn = 10;
      const quality = 20;

      const gildedRose = new GildedRose([new Item(itemName, sellIn, quality)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toStrictEqual(quality - 1);
      expect(items[0].sellIn).toStrictEqual(sellIn - 1);
    }
  );

  it.each`
    itemName
    ${"+5 Dexterity Vest"}
    ${"Elixir of the Mongoose"}
  `(
    "$itemName should decrease in quality twice as fast once sell by date is passed",
    ({ itemName }) => {
      const sellIn = 1;
      const quality = 20;

      const gildedRose = new GildedRose([new Item(itemName, sellIn, quality)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      // only updated twice but degraded by 3
      expect(items[0].quality).toStrictEqual(quality - 3);
      expect(items[0].sellIn).toStrictEqual(sellIn - 2);
    }
  );

  it.each`
    itemName
    ${"+5 Dexterity Vest"}
    ${"Elixir of the Mongoose"}
  `("$itemName should never have a negative quality value", ({ itemName }) => {
    const sellIn = 2;
    const quality = 2;

    const gildedRose = new GildedRose([new Item(itemName, sellIn, quality)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toStrictEqual(0);
    expect(items[0].sellIn).toStrictEqual(sellIn - 7);
  });

  it("Aged Brie increases in quality each time updated", () => {
    const name = "Aged Brie";
    const sellIn = 5;
    const quality = 0;

    const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toStrictEqual(quality + 1);
    expect(items[0].sellIn).toStrictEqual(sellIn - 1);
  });

  it("Aged Brie should not have a quality value greater than 50", () => {
    const sellIn = 2;
    const quality = 50;

    const gildedRose = new GildedRose([new Item("Aged Brie", sellIn, quality)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    // despite increasing in quality, should be capped at 50
    expect(items[0].quality).toStrictEqual(50);
    expect(items[0].sellIn).toStrictEqual(sellIn - 4);
  });

  it("Sulfuras should not decrease in quality or reduce sellIn value", () => {
    const sellIn = 2;
    const quality = 50;

    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", sellIn, quality),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toStrictEqual(50);
    expect(items[0].sellIn).toStrictEqual(0);
  });

  it("Backstage passes should increase in quality as sellIn approaches", () => {
    const sellIn = 15;
    const quality = 20;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toStrictEqual(quality + 4);
    expect(items[0].sellIn).toStrictEqual(sellIn - 4);
  });

  it("Backstage passes should increase in quality by 2 when sellIn value between 5 and 10", () => {
    const sellIn = 10;
    const quality = 20;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    // updated 3 times but increased by 3*2
    expect(items[0].quality).toStrictEqual(quality + 6);
    expect(items[0].sellIn).toStrictEqual(sellIn - 3);
  });

  it("Backstage passes should increase in quality by 3 when sellIn value <= 5", () => {
    const sellIn = 5;
    const quality = 20;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    // updated 3 times but increased by 3*3
    expect(items[0].quality).toStrictEqual(quality + 9);
    expect(items[0].sellIn).toStrictEqual(sellIn - 3);
  });

  it("Backstage passes should decrease quality to 0 sellIn value <= 0", () => {
    const sellIn = 1;
    const quality = 20;

    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toStrictEqual(0);
    expect(items[0].sellIn).toStrictEqual(sellIn - 5);
  });
});
