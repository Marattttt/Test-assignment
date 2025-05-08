import { StargateClient } from '@cosmjs/stargate';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const CosmosConnectionProvider: Provider = {
  provide: 'COSMOS_CLIENT',
  useFactory: async (configService: ConfigService) => {
    const url = configService.get<string>('cosmos.rpcurl');
    if (!url) throw new Error('cosmos.rpcurl is undefined');
    return await StargateClient.connect(url);
  },
  inject: [ConfigService],
};
