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


export interface UserPasswordSchema {
  last_password: string;
  password: string;
}