import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {
    console.log("ok");
  }

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
