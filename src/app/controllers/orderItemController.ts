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
import { ApiQuery } from '@nestjs/swagger';
import { OrderItemService } from '../../domain';
import {
  FilterOrderItemDto,
  OrderItem,
  OrderItemDto,
} from '../../shared/models';

@Controller('order-item')
export class OrderItemController {
  private readonly logger = new Logger(OrderItemController.name);
  constructor(
    @Inject('IService<OrderItem>')
    private orderItemService: OrderItemService,
  ) {}

  @Get()
  find(@Query() filterOrderItemDto?: FilterOrderItemDto): Promise<OrderItem[]> {
    return this.orderItemService.find(filterOrderItemDto.orderId);
  }

  @Get('/:id')
  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
  })
  findById(@Param('id') id: number): Promise<OrderItem> {
    return this.orderItemService.findById(id);
  }

  @Post()
  async create(@Body() orderItemDto: OrderItemDto): Promise<OrderItem> {
    const createdOrder = await this.orderItemService.create(orderItemDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

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

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderItemService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
