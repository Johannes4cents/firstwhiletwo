function createLootObject(d, item, string) {
  let concatList = lootAttributes.concat(specialAttributes);

  updateItemInStorageAndState(d, "kingdomItems", item, d.setKingdomItems);
  if (item.firstFound == null) {
    item.firstFound = dateToTimestamp(new Date());
    addCustomItem(d, item, "kingdomItems");
  } else updateCustomItem(d, item, "kingdomItems");

  // create the concrete attributes from the payloads
  const createdAttributes = [];
  for (let i = 0; i < item.attributes.length; i++) {
    const attribute = item.attributes[i];
    const lootAttribute = getItemById(attribute.id, concatList);
    const createdAttribute = lootAttribute.createAttribute(
      attribute.payload.one,
      attribute.payload.two,
      attribute.payload.three,
      attribute.payload.four
    );
    createdAttributes.push(createdAttribute);
  }

  // create the Loot object
  let loot = new Loot(
    item.name,
    createdAttributes,
    item.imgUrl,
    item.type,
    string
  );
  loot.kingdomItemId = item.id;
  return loot;
}

export { createLootObject };
