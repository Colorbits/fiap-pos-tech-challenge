import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('/health')
export class HealthApi {
  @Get('')
  async healthStatus(): Promise<string> {
    return 'System is up and running';
  }
}
