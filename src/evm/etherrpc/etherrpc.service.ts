import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
class EtherRPCService {
  private readonly rpcUrl: string;
  private readonly evm: ethers.JsonRpcProvider;
  private readonly logger = new Logger(EtherRPCService.name);

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('ethereum.rpcurl');
    if (!url) throw new Error('ethereum.rpcurl is undefined');
    this.rpcUrl = url;

    this.evm = new ethers.JsonRpcProvider(url);
  }

  getRPCURL(): string {
    return this.rpcUrl;
  }

  async getBlockInfo(height: number): Promise<ethers.Block | null> {
    try {
      return await this.evm.getBlock(height);
    } catch (e) {
      this.logger.log('Error getting ethereum block info by height', {
        height,
        error: e instanceof Error ? e : JSON.stringify(e),
      });
      return null;
    }
  }

  async getTransactionInfo(
    hash: string,
  ): Promise<ethers.TransactionResponse | null> {
    try {
      // Note for code review:
      // During testing, the sei rpc node always returned null, regardless of
      // transaction hash.
      // Not sure why
      return await this.evm.getTransaction(hash);
      // This does not work as well
      // return await this.evm.send('eth_getTransactionByHash', [
      //   hash.toLowerCase(),
      // ]);
    } catch (e) {
      this.logger.log('Error getting ethereum transaction info by hash', {
        hash,
        error: e instanceof Error ? e : JSON.stringify(e),
      });
      return null;
    }
  }
}

export default EtherRPCService;
