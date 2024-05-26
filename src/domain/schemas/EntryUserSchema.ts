export interface EntryUserSchema {
  _id?: string;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  active: boolean;
  faceUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}