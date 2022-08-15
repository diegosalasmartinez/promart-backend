import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export abstract class ResponseListCustomers {
  @ApiProperty({
    type: [Customer],
  })
  customers: [Customer];

  @ApiProperty({
    example: 50,
    description: 'Promedio de la edad de los clientes',
  })
  mean: number;

  @ApiProperty({
    example: 3,
    description: 'Desviación estándar de la edad de los clientes',
  })
  std: number;
}

export abstract class ResponseGetCustomer {
  @ApiProperty({
    type: Customer,
  })
  customer: Customer;

  @ApiProperty({
    example: '2026-05-01T00:00:00.000Z',
    description: 'Posible fecha de fallecimiento del cliente',
  })
  deathDate: Date;
}
