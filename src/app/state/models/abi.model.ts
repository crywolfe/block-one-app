export interface Abi {
  blockId: number; // head_block_num
  actions: string[]; // TODO not sure if this is the right type
  ricardianClauses: string;
  // TODO add more
}