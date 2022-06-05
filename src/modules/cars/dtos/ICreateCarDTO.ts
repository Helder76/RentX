import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  fine_amount: number;
  license_plate: string;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO }