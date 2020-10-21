import { Module } from '@nestjs/common';
import { AdditionalFieldsController } from './additional-fields.controller';
import { AdditionalFieldsService } from './additional-fields.service';

@Module({
  controllers: [AdditionalFieldsController],
  providers: [AdditionalFieldsService]
})
export class AdditionalFieldsModule {}
