class Offers {
  private productType: string;
  private offerQuantity: number;
  private discount: number;
  private extra: number;

  constructor(pt: string, oq: number, disc: number, extr: number) {
    this.productType = pt;
    this.offerQuantity = oq;
    this.discount = disc;
    this.extra = extr;
  }

  getProductType(): string {
    return this.productType;
  }

  getOfferQuantity(): number {
    return this.offerQuantity;
  }

  getDiscount(): number {
    return this.discount;
  }

  getExtra(): number {
    return this.extra;
  }
}

class PricingModel {
  private prices: Map<string, number>;
  private mapping: Map<string, Offers[]>;

  constructor() {
    this.prices = new Map<string, number>();
    this.mapping = new Map<string, Offers[]>();
  }

  clearPricingRules(customer: string): void {
    this.mapping.set(customer, []);
  }

  addPricingRules(customer: string, productType: string, offerQuantity: number, discount: number, extra: number): void {
    const pricingRules = new Offers(productType, offerQuantity, discount, extra);
    const rules = this.mapping.get(customer) || [];
    rules.push(pricingRules);
    this.mapping.set(customer, rules);
  }

  updatePrice(productType: string, price: number): void {
    this.prices.set(productType, price);
  }

  getPrice(itemName: string): number | undefined {
    return this.prices.get(itemName);
  }

  getOffers(customer: string): Offers[] | undefined {
    return this.mapping.get(customer);
  }
}

const pc = new PricingModel();

class Checkout {
  private customer: string;
  private items: Map<string, number>;

  constructor(cust = "default") {
    this.customer = cust;
    this.items = new Map<string, number>();
  }

  addItem(itemName: string): void {
    const count = this.items.get(itemName) || 0;
    this.items.set(itemName, count + 1);
  }

  total(): number {
    let bill = 0.0;
    const offers = pc.getOffers(this.customer);

    for (const [name, count] of this.items.entries()) {
      const itemOffers = offers || [];
      for (const offer of itemOffers) {
        if (offer.getProductType() === name) {
          if (offer.getDiscount() === 0) {
            bill += pc.getPrice(name) * count;
            bill -= (count / offer.getOfferQuantity()) * pc.getPrice(name);
          } else {
            bill += offer.getDiscount() * count;
          }
        }
      }
    }

    return bill;
  }
}

const main = (): void => {
  // Code execution starts here
};

main();
