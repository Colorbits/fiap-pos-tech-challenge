import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerDto, CustomerResponseDto } from '../../shared/models/customer';
import { CustomerService } from '../../application/customer';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Clientes')
@Controller('customer')
export class CustomerApi {
  private readonly logger = new Logger(CustomerApi.name);

  constructor(
    @Inject('ICustomerService') private customerService: CustomerService,
  ) {}
  @ApiOperation({
    summary: 'Buscar cliente por ID ou outras informações',
    description:
      'Retorna um cliente específico com base no ID, nome, documento ou número de telefone.',
  })
  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
    description: 'ID do cliente a ser buscado',
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Nome do cliente a ser buscado',
  })
  @ApiQuery({
    name: 'document',
    type: String,
    required: false,
    description: 'Documento do cliente a ser buscado',
  })
  @ApiQuery({
    name: 'phoneNumber',
    type: String,
    required: false,
    description: 'Número de telefone do cliente a ser buscado',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar o cliente.',
  })
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  find(@Param('id') id: string): Promise<CustomerResponseDto> {
    return this.customerService.findById(id);
  }

  @ApiOperation({
    summary: 'Criar um novo cliente',
    description: 'Cria um novo cliente associado no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos para criação.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao criar o cliente.',
  })
  @Post()
  async create(@Body() customerDto: CustomerDto): Promise<CustomerResponseDto> {
    this.logger.debug(customerDto);
    const customer =
      await this.customerService.createUserAndCustomer(customerDto);
    this.logger.debug({ customer });
    return customer;
  }
}
