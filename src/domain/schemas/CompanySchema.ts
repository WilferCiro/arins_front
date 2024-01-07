export interface CompanyAccessSchema {
  inventory?: {
    price: number;
    expiration: Date;
    active: boolean;
  };
  sales?: {
    price: number;
    expiration: Date;
    active: boolean;
  };
  entry?: {
    price: number;
    expiration: Date;
    active: boolean;
  };
}

export interface CompanySchema {
  _id?: string;
  name: string;
  nit: string;
  address: string;
  cellphone: string;
  email: string;
  webpage: string;
  type: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  access?: CompanyAccessSchema;
}
