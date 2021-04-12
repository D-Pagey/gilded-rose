import { Item, GildedRose } from "./gilded-rose";

describe("Gilded Rose", () => {
  it("Aged Brie increases in quality each time updated", () => {
    const name = "Aged Brie";
    const sellIn = 5;
    const quality = 0;

    const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toStrictEqual(quality + 1);
    expect(items[0].sellIn).toStrictEqual(sellIn - 1);
  });

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
});
