import { Repository } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRepository extends Repository<Address> {
    async saveAddress(address: Address) {
        
        this.save(address);
    }
}
