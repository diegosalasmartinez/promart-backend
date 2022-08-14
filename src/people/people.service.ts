import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person = await this.personModel.create(createPersonDto);
    return person;
  }

  async findAll() {
    const people = await this.personModel.find();
    let mean = 0;
    let std = 0;
    if (people.length > 0) {
      const ages = people.map((p) => p.age);
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
    return { people, mean, std };
  }

  async findOne(id: string) {
    const person = await this.personModel.findById(id);
    if (!person) {
      throw new NotFoundException(`Usuario ${id} no existe`);
    }
    const people = await this.findAll();
    const maxAge = people.mean + people.std;
    const ageLeft = maxAge - person.age;
    return { person, ageLeft };
  }
}
