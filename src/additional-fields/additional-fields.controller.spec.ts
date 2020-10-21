import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalFieldsController } from './additional-fields.controller';

describe('AdditionalFieldsController', () => {
  let controller: AdditionalFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalFieldsController],
    }).compile();

    controller = module.get<AdditionalFieldsController>(AdditionalFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
