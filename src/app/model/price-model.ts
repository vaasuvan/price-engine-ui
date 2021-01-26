export class Price {
  constructor(public id: number,
              public productName: string,
              public numberOfUnitInCarton: number,
              public cartonPrice: number,
              public ultimatePrice: number,
              public quantity: number
  ) {}
}
