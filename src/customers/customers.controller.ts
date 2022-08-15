import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Customer } from './entities/customer.entity';
import {
  ResponseListCustomers,
  ResponseGetCustomer,
} from './responses/api-response.responses';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'El cliente fue creado',
    type: Customer,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: ResponseListCustomers,
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalle del cliente',
    type: ResponseGetCustomer,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'El cliente no se encontró',
  })
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.customersService.findOne(id);
  }

  @Get('seed/generate')
  generateSeed() {
    return this.customersService.generateSeed();
  }

  @Get('seed/delete')
  deleteRecords() {
    return this.customersService.deleteRecords();
  }
}
