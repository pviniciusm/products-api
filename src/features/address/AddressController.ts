import { Connection, getConnection, Repository } from "typeorm";
import { Address } from "../../database/entities/Address";
import { Client } from "../../database/entities/Client";
import { AddressRepository } from "../../database/repositories/AddressRepository";

export class AddressController {
    private readonly connection: Connection;
    private readonly repository: Repository<Address>;

    constructor() {
        this.connection = getConnection();
        // this.repository = this.connection.getRepository(Address);
        this.repository = new AddressRepository();
    }

    async create(uid: string, street: string, number: number) {
        try {
            //uid, street, "number", "client_uid"
            let newAddress = this.repository.create({
                uid, street, number
            });

            let newUser = getConnection().manager.create(Client, {
                uid: "3333",
                age: 20,
                name: "teste post address"
            });

            // await getConnection().manager.save(newUser);
            newUser.save();

            newAddress.client = newUser;
            // await this.repository.save(newAddress);
            newAddress.save();

            new AddressRepository().save(newAddress);
    
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }

    async list() {
        let result2 = await this.repository.find({
            relations: ['client']
        });

        let resultClient = await getConnection().manager.find(Client, {
            relations: ['address']
        })

        return {
            ok: true,
            data: result2,
            client: resultClient
        }
    }
}