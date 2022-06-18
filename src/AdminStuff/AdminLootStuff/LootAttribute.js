import React, { useEffect, useState } from "react";

export default class LootAttribute {
  constructor(
    name,
    imgUrl,
    payloads = 0,
    id,
    spawnChance = 1000,
    createAttribute = () => {}
  ) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.payloads = payloads;
    this.spawnChance = spawnChance;
    this.createAttribute = createAttribute;
  }
}
