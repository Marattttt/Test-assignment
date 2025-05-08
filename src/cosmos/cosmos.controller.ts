import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import CosmosRPCService from './cosmosrpc/cosmosrps.service';
import CosmosTxHashPipe from './txhash.pipe';

@Controller('cosmos')
class CosmosController {
  constructor(private readonly cosmosService: CosmosRPCService) {}

  @Get('block/:height')
  async getBlockByHeight(
    @Param('height', ParseIntPipe) height: number,
  ): Promise<any> {
    const block = await this.cosmosService.getBlockByHeight(height);
    if (!block) {
      throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
    }
    return block;
  }

  @Get('transactions/:hash')
  async getTransactionByHash(
    @Param('hash', CosmosTxHashPipe) hash: string,
  ): Promise<object> {
    const tx = await this.cosmosService.getTransactionInfo(hash);
    if (!tx) {
      throw new HttpException('transaction not found', HttpStatus.NOT_FOUND);
    }
    return tx;
  }
}
export default CosmosController;
