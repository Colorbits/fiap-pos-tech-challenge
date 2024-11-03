import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentDto } from '../../shared/models/payment';
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
}
