export type OrderInputs = {
  contents: {
    productCode: number | string;
    productNumber: string;
    productName: string;
    price: number;
    quantity: number;
    comment: string;
  }[];
};