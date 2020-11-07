import { Test, TestingModule } from '@nestjs/testing';
import { OAuthProvidersService } from './oauth-providers.service';

describe('OAuthProvidersService', () => {
  let service: OAuthProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OAuthProvidersService],
    }).compile();

    service = module.get<OAuthProvidersService>(OAuthProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
