export interface EosBlock {
  block_num: number;
  timestamp: string;
  transactions: string[];
  id: string;
  // TODO consider others
}
