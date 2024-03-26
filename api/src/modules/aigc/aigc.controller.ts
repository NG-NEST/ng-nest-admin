import { AigcInput, AigcService } from '@api/services';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('aigc')
export class AigcController {
  constructor(private readonly aigcService: AigcService) {}

  @Post()
  textGeneration(@Body() input: AigcInput) {
    return this.aigcService.textGeneration(input);
  }
}
