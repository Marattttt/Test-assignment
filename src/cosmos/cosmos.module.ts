import { Module } from '@nestjs/common';
import CosmosRPCService from './cosmosrpc/cosmosrps.service';
import { CosmosConnectionProvider } from './cosmosrpc/cosmosconnection.provider';
import CosmosController from './cosmos.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [CosmosRPCService, CosmosConnectionProvider],
  controllers: [CosmosController],
  imports: [ConfigModule],
})
export default class CosmosModule {}
