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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderItemService } from '../../domain';
import {
  FilterOrderItemDto,
  OrderItem,
  OrderItemDto,
} from '../../shared/models';

@ApiTags('Itens do Pedido')
@Controller('order-item')
export class OrderItemController {
  private readonly logger = new Logger(OrderItemController.name);

  constructor(
    @Inject('IService<OrderItem>')
    private orderItemService: OrderItemService,
  ) {}

  @ApiOperation({
    summary: 'Listar itens do pedido com filtro opcional',
    description:
      'Retorna uma lista de itens do pedido com base nos filtros aplicados, como o ID do pedido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de itens do pedido encontrada com sucesso.',
    type: [OrderItem],
  })
  @Get()
  find(@Query() filterOrderItemDto?: FilterOrderItemDto): Promise<OrderItem[]> {
    return this.orderItemService.find(filterOrderItemDto.orderId);
  }

  @ApiOperation({
    summary: 'Buscar item do pedido pelo ID',
    description:
      'Retorna os detalhes de um item do pedido específico baseado no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do item do pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Item do pedido encontrado com sucesso.',
    type: OrderItem,
  })
  @ApiResponse({
    status: 404,
    description: 'Item do pedido não encontrado.',
  })
  @Get('/:id')
  findById(@Param('id') id: number): Promise<OrderItem> {
    return this.orderItemService.findById(id);
  }

  @ApiOperation({
    summary: 'Criar novo item do pedido',
    description: 'Cria um novo item para um pedido com os dados fornecidos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Item do pedido criado com sucesso.',
    type: OrderItem,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para criação do item do pedido.',
  })
  @Post()
  async create(@Body() orderItemDto: OrderItemDto): Promise<OrderItem> {
    const createdOrder = await this.orderItemService.create(orderItemDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

  @ApiOperation({
    summary: 'Editar item do pedido existente',
    description:
      'Edita um item do pedido existente com base no ID e nos dados fornecidos.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do item do pedido a ser editado',
  })
  @ApiResponse({
    status: 200,
    description: 'Item do pedido atualizado com sucesso.',
    type: OrderItem,
  })
  @ApiResponse({
    status: 404,
    description: 'Item do pedido não encontrado para atualização.',
  })
  @Put(':id')
  async put(
    @Param('id') id: number,
    @Body() orderItemDto: OrderItemDto,
  ): Promise<OrderItem> {
    const editedOrderItem = await this.orderItemService.edit({
      ...orderItemDto,
      id,
    });
    this.logger.debug({ editedOrderItem });
    return editedOrderItem;
  }

  @ApiOperation({
    summary: 'Remover item do pedido',
    description: 'Remove um item específico de um pedido com base no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do item do pedido a ser removido',
  })
  @ApiResponse({
    status: 204,
    description: 'Item do pedido deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Item do pedido não encontrado para remoção.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderItemService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
