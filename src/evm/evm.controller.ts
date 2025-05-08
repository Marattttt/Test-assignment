import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import EtherRPCService from './etherrpc/etherrpc.service';
import HexStringPipe from './hashstring.pipe';

@Controller('evm')
class EvmController {
  constructor(private readonly rpcService: EtherRPCService) {}

  @Get('block/:height')
  async getBlockByHeight(
    @Param('height', ParseIntPipe) height: number,
  ): Promise<object> {
    const block = await this.rpcService.getBlockInfo(height);
    if (!block) {
      throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
    }
    return block;
  }

  @Get('transactions/:hash')
  async getTransactionByHash(
    @Param('hash', HexStringPipe) hash: string,
  ): Promise<object> {
    const tx = await this.rpcService.getTransactionInfo(hash);
    if (!tx) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return tx;
  }
}
export default EvmController;
