import { Block, IndexedTx, StargateClient } from '@cosmjs/stargate';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
class CosmosRPCService {
  private readonly logger = new Logger(CosmosRPCService.name);

  constructor(
    @Inject('COSMOS_CLIENT')
    private readonly client: StargateClient,
  ) {}

  async getBlockByHeight(height: number): Promise<Block | null> {
    try {
      return await this.client.getBlock(height);
    } catch (e) {
      this.logger.log('Error getting cosmos block info by height', {
        height,
        error: e instanceof Error ? e : JSON.stringify(e),
      });
      return null;
    }
  }

  async getTransactionInfo(hash: string): Promise<IndexedTx | null> {
    try {
      return await this.client.getTx(hash);
    } catch (e) {
      this.logger.log('Error getting cosmos transaction info by height', {
        hash,
        error: e instanceof Error ? e : JSON.stringify(e),
      });
      return null;
    }
  }
}
export default CosmosRPCService;
