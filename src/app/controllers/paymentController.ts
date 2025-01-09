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
import { PaymentDataDto, PaymentDto } from '../../shared/models/payment';
import { IPaymentService } from '../../domain';

@ApiTags('Pagamentos')
@Controller('/payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

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
    const paymentUrl = await this.paymentService.payOrder(paymentDto);
    this.logger.debug({ paymentUrl });
    return paymentUrl;
  }

  @ApiOperation({
    summary: 'Status de pagamento do pedido.',
    description: 'Consultar status de pagamento de um pedido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Status do pedido',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para o pagamento.',
  })
  @Get('/status/:orderId')
  async paymentStatus(@Param('orderId') orderId?: number): Promise<string> {
    const orderStatus = await this.paymentService.paymentStatus(orderId);
    this.logger.debug({ orderStatus });
    return orderStatus;
  }

  @ApiOperation({
    summary: 'Confirma pagamento do pedido.',
    description:
      'Altera status de um pedido para pagamento aprovado ou pagamento nao aprovado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Status do pedido',
    schema: {
      type: 'string',
      example: 'approved',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Pedido não encontrado.',
  })
  @Post('/confirm/:orderId')
  async paymentConfirmation(
    @Param('orderId') orderId: number,
    @Body() paymentDataDto: PaymentDataDto,
  ): Promise<void> {
    const orderStatus = await this.paymentService.paymentConfirmation(
      orderId,
      paymentDataDto,
    );
    this.logger.debug({ orderStatus });
  }
}
