export interface UserSchema {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
