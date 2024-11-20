export enum TransactionStatus {
  Idle = 'Idle',
  Sending = 'Transaction sent, waiting for confirmation...',
  Confirmed = 'Transaction confirmed!',
  Failed = 'Transaction failed!',
}

export enum BountyType {
  TECH = 'TECH',
  DESIGN = 'DESIGN',
  MARKETING = 'MARKETING',
  OTHER = 'OTHER',
}

export enum BountyStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
