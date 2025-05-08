import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EtherRPCService from './etherrpc/etherrpc.service';
import EvmController from './evm.controller';

@Module({
  imports: [ConfigModule],
  providers: [EtherRPCService],
  controllers: [EvmController],
})
export class EVMModule {}
