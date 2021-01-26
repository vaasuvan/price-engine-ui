export class Product {
  constructor(public id: number,
              public productName: string,
              public numberOfUnitInCarton: number,
              public cartonPrice: number,
              public quantity: number,
              public ultimatePrice: number
  ) {}
}
