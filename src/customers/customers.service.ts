import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

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
    const maxAge = customers.mean + customers.std;
    const ageLeft = maxAge - customer.age;
    return { customer, ageLeft };
  }
}
