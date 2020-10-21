import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalFieldsService } from './additional-fields.service';

describe('AdditionalFieldsService', () => {
  let service: AdditionalFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalFieldsService],
    }).compile();

    service = module.get<AdditionalFieldsService>(AdditionalFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
