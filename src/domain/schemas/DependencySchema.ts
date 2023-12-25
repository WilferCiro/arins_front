import { CompanySchema } from "./CompanySchema";

export interface DependencySchema {
  _id?: string;
  name: string;
  description: string;
  code: string;
  company: CompanySchema;
  company_id: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
