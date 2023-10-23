
 
// this is an auto generated file. This will be overwritten

export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade(
    $id: ID
    $authority: String
    $asset: String
    $isBid: Boolean
    $isTaker: Boolean
  ) {
    onCreateTrade(
      id: $id
      authority: $authority
      asset: $asset
      isBid: $isBid
      isTaker: $isTaker
    ) {
      id
      authority
      marginAccount
      blockTime
      asset
      amount
      price
      isBid
      isTaker
      orderId
      clientOrderId
      signature
      __typename
    }
  }
`;
export const onCreateDeposit = /* GraphQL */ `
  subscription OnCreateDeposit($id: ID, $authority: String, $asset: String) {
    onCreateDeposit(id: $id, authority: $authority, asset: $asset) {
      id
      authority
      marginAccount
      blockTime
      asset
      amount
      signature
      __typename
    }
  }
`;
export const onCreateWithdrawal = /* GraphQL */ `
  subscription OnCreateWithdrawal($id: ID, $authority: String, $asset: String) {
    onCreateWithdrawal(id: $id, authority: $authority, asset: $asset) {
      id
      authority
      marginAccount
      blockTime
      asset
      amount
      signature
      __typename
    }
  }
`;
export const onCreateLiquidation = /* GraphQL */ `
  subscription OnCreateLiquidation(
    $id: ID
    $liquidatee: String
    $asset: String
  ) {
    onCreateLiquidation(id: $id, liquidatee: $liquidatee, asset: $asset) {
      id
      liquidatee
      liquidateeMarginAccount
      blockTime
      asset
      liquidator
      liquidatorMarginAccount
      amount
      isBid
      markPrice
      signature
      __typename
    }
  }
`;
