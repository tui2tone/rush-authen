import { Test, TestingModule } from '@nestjs/testing';
import { OAuthProvidersController } from './oauth-providers.controller';

describe('OAuthProvidersController', () => {
  let controller: OAuthProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthProvidersController],
    }).compile();

    controller = module.get<OAuthProvidersController>(OAuthProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
