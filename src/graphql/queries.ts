
 
// this is an auto generated file. This will be overwritten

export const getTrade = /* GraphQL */ `
  query GetTrade($authority: String!, $id: ID!) {
    getTrade(authority: $authority, id: $id) {
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
export const listTrade = /* GraphQL */ `
  query ListTrade(
    $filter: TableTradeFilterInput
    $first: Int
    $nextToken: String
  ) {
    listTrade(filter: $filter, first: $first, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const queryTradeByAuthorityBlockTimeIndex = /* GraphQL */ `
  query QueryTradeByAuthorityBlockTimeIndex(
    $authority: String!
    $first: Int
    $after: String
  ) {
    queryTradeByAuthorityBlockTimeIndex(
      authority: $authority
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const queryTradeByAssetBlockTimeIndex = /* GraphQL */ `
  query QueryTradeByAssetBlockTimeIndex(
    $asset: String!
    $first: Int
    $after: String
  ) {
    queryTradeByAssetBlockTimeIndex(
      asset: $asset
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const queryDepositByAuthorityBlockTimeIndex = /* GraphQL */ `
  query QueryDepositByAuthorityBlockTimeIndex(
    $authority: String!
    $first: Int
    $after: String
  ) {
    queryDepositByAuthorityBlockTimeIndex(
      authority: $authority
      first: $first
      after: $after
    ) {
      items {
        id
        authority
        marginAccount
        blockTime
        asset
        amount
        signature
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const queryWithdrawalByAuthorityBlockTimeIndex = /* GraphQL */ `
  query QueryWithdrawalByAuthorityBlockTimeIndex(
    $authority: String!
    $first: Int
    $after: String
  ) {
    queryWithdrawalByAuthorityBlockTimeIndex(
      authority: $authority
      first: $first
      after: $after
    ) {
      items {
        id
        authority
        marginAccount
        blockTime
        asset
        amount
        signature
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const queryLiquidationByLiquidateeBlockTimeIndex = /* GraphQL */ `
  query QueryLiquidationByLiquidateeBlockTimeIndex(
    $liquidatee: String!
    $first: Int
    $after: String
  ) {
    queryLiquidationByLiquidateeBlockTimeIndex(
      liquidatee: $liquidatee
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMarketStats = /* GraphQL */ `
  query GetMarketStats($asset: String!) {
    getMarketStats(asset: $asset) {
      asset
      timestamp
      trade_count_24h
      volume_24h
      __typename
    }
  }
`;
export const getAggregateMarketStats = /* GraphQL */ `
  query GetAggregateMarketStats {
    getAggregateMarketStats {
      asset
      timestamp
      trade_count_24h
      volume_24h
      __typename
    }
  }
`;
export const getPnl = /* GraphQL */ `
  query GetPnl($authority: String!) {
    getPnl(authority: $authority) {
      authority
      timestamp
      balance
      unrealized_pnl
      cumulative_pnl
      equity
      __typename
    }
  }
`;
export const queryPnlHourly = /* GraphQL */ `
  query QueryPnlHourly(
    $authority: String!
    $startTimestamp: AWSTimestamp!
    $first: Int
    $after: String
  ) {
    queryPnlHourly(
      authority: $authority
      startTimestamp: $startTimestamp
      first: $first
      after: $after
    ) {
      authority
      timestamp
      balance
      unrealized_pnl
      cumulative_pnl
      equity
      __typename
    }
  }
`;
export const queryPnlDaily = /* GraphQL */ `
  query QueryPnlDaily(
    $authority: String!
    $startTimestamp: AWSTimestamp!
    $first: Int
    $after: String
  ) {
    queryPnlDaily(
      authority: $authority
      startTimestamp: $startTimestamp
      first: $first
      after: $after
    ) {
      authority
      timestamp
      balance
      unrealized_pnl
      cumulative_pnl
      equity
      __typename
    }
  }
`;
export const getMadwarsPnlIndividual = /* GraphQL */ `
  query GetMadwarsPnlIndividual($authority: String!) {
    getMadwarsPnlIndividual(authority: $authority) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsPnlLeaderboardIndividual = /* GraphQL */ `
  query QueryMadwarsPnlLeaderboardIndividual($startRank: Int!, $endRank: Int!) {
    queryMadwarsPnlLeaderboardIndividual(
      startRank: $startRank
      endRank: $endRank
    ) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsRoiLeaderboardIndividual = /* GraphQL */ `
  query QueryMadwarsRoiLeaderboardIndividual($startRank: Int!, $endRank: Int!) {
    queryMadwarsRoiLeaderboardIndividual(
      startRank: $startRank
      endRank: $endRank
    ) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsVolumeLeaderboardIndividual = /* GraphQL */ `
  query QueryMadwarsVolumeLeaderboardIndividual(
    $startRank: Int!
    $endRank: Int!
  ) {
    queryMadwarsVolumeLeaderboardIndividual(
      startRank: $startRank
      endRank: $endRank
    ) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsPnlLeaderboardIntrateam = /* GraphQL */ `
  query QueryMadwarsPnlLeaderboardIntrateam(
    $team: String!
    $startRank: Int!
    $endRank: Int!
  ) {
    queryMadwarsPnlLeaderboardIntrateam(
      team: $team
      startRank: $startRank
      endRank: $endRank
    ) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsRoiLeaderboardIntrateam = /* GraphQL */ `
  query QueryMadwarsRoiLeaderboardIntrateam(
    $team: String!
    $startRank: Int!
    $endRank: Int!
  ) {
    queryMadwarsRoiLeaderboardIntrateam(
      team: $team
      startRank: $startRank
      endRank: $endRank
    ) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsVolumeLeaderboardIntrateam = /* GraphQL */ `
  query QueryMadwarsVolumeLeaderboardIntrateam(
    $team: String!
    $startRank: Int!
    $endRank: Int!
  ) {
    queryMadwarsVolumeLeaderboardIntrateam(
      team: $team
      startRank: $startRank
      endRank: $endRank
    ) {
      authority
      timestamp
      pnl
      roi
      volume
      pnl_rank_global
      roi_rank_global
      volume_rank_global
      pnl_rank_team
      roi_rank_team
      volume_rank_team
      team
      backpack_username
      multiplier
      __typename
    }
  }
`;
export const queryMadwarsPnlLeaderboardTeam = /* GraphQL */ `
  query QueryMadwarsPnlLeaderboardTeam($startRank: Int!, $endRank: Int!) {
    queryMadwarsPnlLeaderboardTeam(startRank: $startRank, endRank: $endRank) {
      team
      timestamp
      pnl
      roi
      volume
      pnl_rank
      roi_rank
      volume_rank
      __typename
    }
  }
`;
export const queryMadwarsRoiLeaderboardTeam = /* GraphQL */ `
  query QueryMadwarsRoiLeaderboardTeam($startRank: Int!, $endRank: Int!) {
    queryMadwarsRoiLeaderboardTeam(startRank: $startRank, endRank: $endRank) {
      team
      timestamp
      pnl
      roi
      volume
      pnl_rank
      roi_rank
      volume_rank
      __typename
    }
  }
`;
export const queryMadwarsVolumeLeaderboardTeam = /* GraphQL */ `
  query QueryMadwarsVolumeLeaderboardTeam($startRank: Int!, $endRank: Int!) {
    queryMadwarsVolumeLeaderboardTeam(
      startRank: $startRank
      endRank: $endRank
    ) {
      team
      timestamp
      pnl
      roi
      volume
      pnl_rank
      roi_rank
      volume_rank
      __typename
    }
  }
`;
export const checkV2BetaWhitelist = /* GraphQL */ `
  query CheckV2BetaWhitelist($authority: String!) {
    checkV2BetaWhitelist(authority: $authority)
  }
`;
