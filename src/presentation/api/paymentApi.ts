import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentCallbackDto, PaymentDto } from '../../shared/models/payment';
import { IPaymentService } from '../../application';

@ApiTags('Pagamentos')
@Controller('/payment')
export class PaymentApi {
  private readonly logger = new Logger(PaymentApi.name);

  constructor(
    @Inject('IPaymentService') private paymentService: IPaymentService,
  ) {}

  @ApiOperation({
    summary: 'Processar pagamento de um pedido',
    description: 'Gera uma URL de pagamento para o pedido especificado.',
  })
  @ApiResponse({
    status: 200,
    description: 'URL de pagamento gerada com sucesso.',
    schema: {
      type: 'string',
      example: 'https://gateway.pagamento.com/pay/12345',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para o pagamento.',
  })
  @Post()
  async pay(@Body() paymentDto: PaymentDto): Promise<string> {
    return this.paymentService.payOrder(paymentDto);
  }

  @ApiOperation({
    summary: 'Confirmar pagamento de um pedido',
    description: 'Endpoint para confirmar o pagamento de um pedido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do pedido',
    schema: {
      type: 'string',
      example: 'https://gateway.pagamento.com/pay/12345',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para o pagamento.',
  })
  @Post('/callback')
  async paymentCallback(@Body() paymentDto: PaymentCallbackDto) {
    return this.paymentService.paymentCallback(paymentDto);
  }

  @ApiOperation({
    summary: 'Status de pagamento do pedido.',
    description: 'Consultar status de pagamento de um pedido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do pedido',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para o pagamento.',
  })
  @Get('/:orderId')
  async getPayment(@Param('orderId') orderId?: number) {
    return this.paymentService.getPayment(orderId);
  }
}
