import { AssetAssessment } from "../enums/AssetAssessment";
import { AssetStatus } from "../enums/AssetStatus";
import { DependencySchema } from "./DependencySchema";

export interface AssetSchema {
  _id?: string;
  name: string;
  description: string;
  plate: string;
  serial: string;
  category: string;
  price: number;
  acquisitionDate: Date;
  dependency: DependencySchema;
  dependency_id: string;
  assessment: AssetAssessment;
  status: AssetStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
