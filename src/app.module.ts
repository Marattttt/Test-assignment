import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ethereumConfig from './config/ethereum.config';
import cosmosConfig from './config/cosmos.config';
import { EVMModule } from './evm/evm.module';
import CosmosModule from './cosmos/cosmos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ethereumConfig, cosmosConfig],
    }),
    EVMModule,
    CosmosModule,
  ],
})
export class AppModule {}
