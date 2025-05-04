import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { IService } from '../../application/iService';
import { FilterOrderDto, Order, OrderDto } from '../../shared/models';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Pedidos')
@Controller('order')
export class OrderApi {
  private readonly logger = new Logger(OrderApi.name);

  constructor(
    @Inject('IService<Order>') private orderService: IService<Order>,
  ) {}

  @ApiOperation({
    summary: 'Listar pedidos com filtro opcional',
    description:
      'Retorna uma lista de pedidos com base nos filtros aplicados, como o ID do cliente e o status do pedido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos encontrada com sucesso.',
    type: [Order],
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'customerId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: String,
    required: false,
    enum: OrderStatusEnum,
  })
  @Get()
  find(@Query() filterOrderDto: FilterOrderDto): Promise<Order[]> {
    return this.orderService.find(filterOrderDto.userId, filterOrderDto.status);
  }

  @ApiOperation({
    summary: 'Buscar pedido pelo ID',
    description: 'Retorna os detalhes de um pedido específico baseado no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado com sucesso.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado.',
  })
  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  findById(@Param('id') id?: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @ApiOperation({
    summary: 'Confirmar pedido',
    description: 'Confirma um pedido específico com base no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser confirmado',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido confirmado com sucesso.',
    type: Order,
  })
  @Put('/confirm/:id')
  confirmOrder(@Param('id') id?: number): Promise<Order> {
    return this.orderService.edit({ id, status: OrderStatusEnum.CONFIRMED });
  }

  @ApiOperation({
    summary: 'Atualizar pedido para "Em progresso"',
    description:
      'Atualiza o status do pedido para "Em progresso" com base no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser atualizado para "Em progresso"',
  })
  @ApiResponse({
    status: 200,
    description: 'Status do pedido atualizado para "Em progresso" com sucesso.',
    type: Order,
  })
  @Put('/in-progress/:id')
  orderInProgres(@Param('id') id?: number): Promise<Order> {
    return this.orderService.edit({ id, status: OrderStatusEnum.IN_PROGRESS });
  }

  @ApiOperation({
    summary: 'Finalizar pedido',
    description:
      'Atualiza o status do pedido para "Finalizado" com base no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser finalizado',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido finalizado com sucesso.',
    type: Order,
  })
  @Put('/finish/:id')
  finishOrder(@Param('id') id?: number): Promise<Order> {
    return this.orderService.edit({ id, status: OrderStatusEnum.FINISHED });
  }

  @ApiOperation({
    summary: 'Cancelar pedido',
    description: 'Atualiza o status do pedido para "Cancelado" com base no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser cancelado',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido cancelado com sucesso.',
    type: Order,
  })
  @Put('/cancel/:id')
  cancelOrder(@Param('id') id?: number): Promise<Order> {
    return this.orderService.edit({ id, status: OrderStatusEnum.CANCELED });
  }

  @ApiOperation({
    summary: 'Criar novo pedido',
    description: 'Cria um novo pedido com os dados fornecidos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para criação do pedido.',
  })
  @Post()
  async create(@Body() orderDto: OrderDto): Promise<Order> {
    const createdOrder = await this.orderService.create(orderDto);
    return createdOrder;
  }

  @ApiOperation({
    summary: 'Remover pedido',
    description: 'Remove um pedido específico com base no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser removido',
  })
  @ApiResponse({
    status: 204,
    description: 'Pedido removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado para remoção.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
  }
}
