export interface TokenSchema {
  _id: string;
  sub: string;
  exp: number;
  companies?: {
    _id: string;
    name: string;
    active?: boolean;
  }[];
}
