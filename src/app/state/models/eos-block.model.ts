export interface EosBlock {
  timestamp: string;
  producer: string;
  confirmed: number;
  previous: string;
  transaction_mroot: string;
  action_mroot: string;
  schedule_version: number;
  new_producers: null; // no longer contained in API
  producer_signature: string;
  transactions: string[];
  id: string;
  block_num: number;
  ref_block_prefix: number;
}
