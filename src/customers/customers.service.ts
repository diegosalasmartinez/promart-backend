import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import * as moment from 'moment';
import { faker } from '@faker-js/faker';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerModel.create(createCustomerDto);
    return customer;
  }

  async findAll() {
    const customers = await this.customerModel.find();
    let mean = 0;
    let std = 0;
    if (customers.length > 0) {
      const ages = customers.map((p) => p.age);
      mean =
        ages.reduce((acc, curr) => {
          return acc + curr;
        }, 0) / ages.length;
      std = Math.sqrt(
        ages
          .map((a) => Math.pow(a - mean, 2))
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0) / ages.length,
      );
    }
    return { customers, mean, std };
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException(`Usuario ${id} no existe`);
    }
    const customers = await this.findAll();
    const maxAge = Math.ceil(customers.mean + customers.std);
    const ageLeft = maxAge - customer.age;
    const deathDate = moment(customer.birthday).add(
      customer.age + ageLeft,
      'years',
    );
    return { customer, deathDate };
  }

  async generateSeed() {
    const customers = [];
    for (let i = 0; i < 10; i++) {
      const date = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
      const customer = {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: moment().diff(date, 'years'),
        birthday: date,
      } as CreateCustomerDto;

      customers.push(customer);
    }
    await this.customerModel.insertMany(customers);
    return 'Seed executed';
  }

  async deleteRecords() {
    await this.customerModel.deleteMany();
    return 'Records deleted';
  }
}
