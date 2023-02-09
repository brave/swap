// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import async from 'async'

// Options
import { SwapAndSendOptions } from '~/options/select-and-send-options'
import { gasFeeOptions } from '~/options/gas-fee-options'

// Hooks
import { useWalletDispatch, useWalletState } from '~/state/wallet'
import { useJupiter } from './useJupiter'
import { useZeroEx } from './useZeroEx'
import { useNativeAsset } from './useNativeAsset'
import { useSwapContext } from '~/context/swap.context'

// Types and constants
import {
  BlockchainToken,
  QuoteOption,
  WalletAccount,
  GasFeeOption,
  GasEstimate,
  CoinType,
  SwapParams,
  SwapValidationErrorType,
  NetworkInfo,
  RefreshBlockchainStateParams,
  RefreshPricesParams,
  SwapFee
} from '~/constants/types'

// Utils
import Amount from '~/utils/amount'
import { ZERO_EX_VALIDATION_ERROR_CODE } from '~/constants/magics'
import { getBalanceRegistryKey, makeNetworkAsset } from '~/utils/assets'

const hasDecimalsOverflow = (amount: string, asset?: BlockchainToken) => {
  if (!asset) {
    return false
  }

  const amountBaseWrapped = new Amount(amount).multiplyByDecimals(asset.decimals)
  if (!amountBaseWrapped.value) {
    return false
  }

  const decimalPlaces = amountBaseWrapped.value.decimalPlaces()
  return decimalPlaces !== null && decimalPlaces > 0
}

export const useSwap = () => {
  // Wallet State
  const {
    state: { tokenBalances, spotPrices }
  } = useWalletState()
  const {
    getLocale,
    getTokenPrice,
    getTokenBalance,
    getBalance,
    assetsList,
    network,
    account,
    defaultBaseCurrency,
    walletAccounts
  } = useSwapContext()
  const { dispatch } = useWalletDispatch()

  // State
  const [fromToken, setFromToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [toToken, setToToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [fromAmount, setFromAmount] = React.useState<string>('')
  const [toAmount, setToAmount] = React.useState<string>('')
  const [selectingFromOrTo, setSelectingFromOrTo] = React.useState<'from' | 'to' | undefined>(
    undefined
  )
  const [selectedQuoteOptionIndex, setSelectedQuoteOptionIndex] = React.useState<number>(0)
  const [selectedSwapAndSendOption, setSelectedSwapAndSendOption] = React.useState<string>(
    SwapAndSendOptions[0].name
  )
  const [swapAndSendSelected, setSwapAndSendSelected] = React.useState<boolean>(false)
  const [toAnotherAddress, setToAnotherAddress] = React.useState<string>('')
  const [userConfirmedAddress, setUserConfirmedAddress] = React.useState<boolean>(false)
  const [selectedSwapSendAccount, setSelectedSwapSendAccount] = React.useState<
    WalletAccount | undefined
  >(account)
  const [useDirectRoute, setUseDirectRoute] = React.useState<boolean>(false)
  const [slippageTolerance, setSlippageTolerance] = React.useState<string>('0.5')
  const [selectedGasFeeOption, setSelectedGasFeeOption] = React.useState<GasFeeOption>(
    gasFeeOptions[1]
  )
  const [initialized, setInitialized] = React.useState<boolean>(false)

  const nativeAsset = useNativeAsset()
  const resetSelectedAssets = React.useCallback(() => {
    setFromToken(nativeAsset)
    setToToken(undefined)
    setFromAmount('')
    setToAmount('')
  }, [nativeAsset])

  // Reset FROM asset when network changes
  React.useEffect(resetSelectedAssets, [resetSelectedAssets])

  const jupiter = useJupiter({
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    slippagePercentage: new Amount(slippageTolerance).toNumber()
  })
  const zeroEx = useZeroEx({
    takerAddress: swapAndSendSelected
      ? selectedSwapAndSendOption === 'to-account'
        ? selectedSwapSendAccount?.address || account?.address
        : toAnotherAddress
      : account?.address,
    fromAmount,
    toAmount: '',
    fromToken,
    toToken,
    slippagePercentage: new Amount(slippageTolerance).div(100).toNumber()
  })

  const quoteOptions: QuoteOption[] = React.useMemo(() => {
    if (network.coin === CoinType.Solana) {
      return jupiter.quoteOptions
    }

    return zeroEx.quoteOptions
  }, [network.coin, jupiter.quoteOptions, zeroEx.quoteOptions])

  const onSelectQuoteOption = React.useCallback(
    (index: number) => {
      const option = quoteOptions[index]
      if (network.coin === CoinType.Solana) {
        if (jupiter.quote && jupiter.quote.routes.length > index && toToken) {
          const route = jupiter.quote.routes[index]
          jupiter.setSelectedRoute(route)
          setToAmount(option.toAmount.format(6))
        }
      } else if (network.coin === CoinType.Ethereum) {
        if (zeroEx.quote && toToken) {
          setToAmount(option.toAmount.format(6))
        }
      }

      setSelectedQuoteOptionIndex(index)
    },
    [quoteOptions, jupiter.quote, zeroEx.quote, network.coin]
  )

  const refreshSpotPrices = React.useCallback(
    (overrides: Partial<RefreshPricesParams>) => {
      const overriddenParams: RefreshPricesParams = {
        nativeAsset: makeNetworkAsset(network),
        fromAsset: fromToken,
        toAsset: toToken,
        ...overrides
      }

      ;(async () => {
        const fromAssetPrice =
          overriddenParams.fromAsset && (await getTokenPrice(overriddenParams.fromAsset))
        const toAssetPrice =
          overriddenParams.toAsset && (await getTokenPrice(overriddenParams.toAsset))

        const nativeAssetPrice = overriddenParams.fromAsset?.isToken
          ? await getTokenPrice(overriddenParams.nativeAsset)
          : fromAssetPrice

        await dispatch({
          type: 'updateSpotPrices',
          payload: {
            nativeAsset: Amount.normalize(nativeAssetPrice || ''),
            makerAsset: Amount.normalize(fromAssetPrice || ''),
            takerAsset: Amount.normalize(toAssetPrice || '')
          }
        })
      })()
    },
    [network, fromToken, toToken, getTokenPrice]
  )

  // Methods
  const getNetworkAssetsList = React.useCallback(
    (networkInfo: NetworkInfo) => {
      const nativeAsset = makeNetworkAsset(networkInfo)
      return [nativeAsset, ...assetsList].filter(
        asset => asset.coin === networkInfo.coin && asset.chainId === networkInfo.chainId
      )
    },
    [assetsList]
  )

  const getAssetBalanceFactory = React.useCallback(
    (account: WalletAccount, network: NetworkInfo) => async (asset: BlockchainToken) => {
      const balanceRegistryKey = getBalanceRegistryKey(asset)

      try {
        const result = asset.isToken
          ? await getTokenBalance(
            asset.contractAddress,
            account.address,
            account.coin,
            asset.chainId
          )
          : await getBalance(account.address, network.coin, network.chainId)

        return {
          key: balanceRegistryKey,
          value: Amount.normalize(result)
        }
      } catch (e) {
        console.log(`Error querying balance: error=${e} asset=`, JSON.stringify(asset))
        return {
          key: balanceRegistryKey,
          value: ''
        }
      }
    },
    [getBalance, getTokenBalance]
  )

  const refreshBlockchainState = React.useCallback(
    async (overrides: Partial<RefreshBlockchainStateParams>) => {
      let overriddenParams = {
        network,
        account,
        ...overrides
      }

      if (overriddenParams.account?.coin !== overriddenParams.network.coin) {
        overriddenParams = {
          ...overriddenParams,
          account:
            walletAccounts.find(account => account.coin === overriddenParams.network.coin) ||
            overriddenParams.account
        }
      }

      if (!overriddenParams.account) {
        return
      }

      const networkAssets = getNetworkAssetsList(overriddenParams.network)
      const iterator = getAssetBalanceFactory(overriddenParams.account, overriddenParams.network)

      async function drainChunk (chunk: BlockchainToken[]) {
        const balances = await async.mapLimit(chunk, 10, iterator)

        // In the following code block, we're doing the following transformation:
        // {key: string, value: string}[] => { [key]: value }
        //
        // The balances array can be quite big, and copying the accumulated object
        // for each .reduce() pass can result in an overheard. We're therefore using
        // a mutable accumulator object, instead of Object.assign() or spread syntax.
        //
        // We also return a comma expression, which evaluates the expression
        // before the comma and returns the expression after the comma. This prevents
        // unnecessary assignments and object copy.
        //
        // We also filter out balance results from the array that could not be
        // fetched.
        const payload = balances
          .filter(item => item.value !== '')
          .reduce((obj, item) => (((obj as any)[item.key] = item.value), obj), {})

        dispatch({
          type: 'updateTokenBalances',
          payload
        })
      }

      const chunkSize = 10
      for (let i = 0; i < networkAssets.length; i += chunkSize) {
        const chunk = networkAssets.slice(i, i + chunkSize)
        await drainChunk(chunk)
      }
    },
    [
      getTokenPrice,
      getBalance,
      getTokenBalance,
      dispatch,
      getNetworkAssetsList,
      walletAccounts,
      network,
      account
    ]
  )

  React.useEffect(() => {
    ;(async () => {
      // Do not trigger refresh functions if assetsList is still not available.
      if (assetsList.length === 0) {
        return
      }

      if (!initialized) {
        await refreshBlockchainState({})
        await refreshSpotPrices({})
        setInitialized(true)
      }
    })()
  }, [refreshBlockchainState, refreshSpotPrices, initialized, assetsList])

  const handleJupiterQuoteRefresh = React.useCallback(
    async (overrides: Partial<SwapParams>) => {
      const quote = await jupiter.refresh(overrides)
      if (!quote) {
        return
      }

      const token = overrides.toToken || toToken
      if (token && quote.routes.length > 0) {
        setToAmount(
          new Amount(quote.routes[0].outAmount.toString())
            .divideByDecimals(token.decimals)
            .format(6)
        )
      }
    },
    [jupiter.refresh, jupiter.reset, toToken]
  )

  const handleZeroExQuoteRefresh = React.useCallback(
    async (overrides: Partial<SwapParams>) => {
      if (overrides.fromAmount === '') {
        setFromAmount('')
      }
      if (overrides.toAmount === '') {
        setToAmount('')
      }

      const quote = await zeroEx.refresh(overrides)
      if (!quote) {
        return
      }

      if (overrides.fromAmount === '') {
        const token = overrides.fromToken || fromToken
        if (token) {
          setFromAmount(new Amount(quote.sellAmount).divideByDecimals(token.decimals).format(6))
        }
      }

      if (overrides.toAmount === '') {
        const token = overrides.toToken || toToken
        if (token) {
          setToAmount(new Amount(quote.buyAmount).divideByDecimals(token.decimals).format(6))
        }
      }
    },
    [zeroEx.refresh, toToken, fromToken]
  )

  const handleOnSetFromAmount = React.useCallback(
    async (value: string) => {
      setFromAmount(value)
      if (!value) {
        setToAmount('')
      }

      if (network.coin === CoinType.Solana) {
        await handleJupiterQuoteRefresh({
          fromAmount: value
        })
      } else {
        await handleZeroExQuoteRefresh({
          fromAmount: value,
          toAmount: ''
        })
      }
    },
    [network.coin, handleJupiterQuoteRefresh, handleZeroExQuoteRefresh]
  )

  const handleOnSetToAmount = React.useCallback(
    async (value: string) => {
      // Setting to amount is not supported on Jupiter
      if (network.coin !== CoinType.Ethereum) {
        return
      }

      setToAmount(value)
      await handleZeroExQuoteRefresh({
        fromAmount: '',
        toAmount: value
      })
    },
    [network.coin, handleZeroExQuoteRefresh]
  )

  const getCachedAssetBalance = React.useCallback(
    (token: BlockchainToken): Amount => {
      const balanceRegistryKey = getBalanceRegistryKey(token)

      return tokenBalances ? new Amount(tokenBalances[balanceRegistryKey] ?? '0') : Amount.zero()
    },
    [tokenBalances]
  )

  const fromAssetBalance = fromToken && getCachedAssetBalance(fromToken)
  const nativeAssetBalance = getCachedAssetBalance(nativeAsset)

  const onClickFlipSwapTokens = React.useCallback(async () => {
    setFromToken(toToken)
    setToToken(fromToken)

    if (network.coin === CoinType.Solana) {
      await jupiter.reset()
    } else {
      await zeroEx.reset()
    }

    if (toToken && account) {
      const balance = await getAssetBalanceFactory(account, network)(toToken)
      dispatch({
        type: 'updateTokenBalances',
        payload: {
          [balance.key]: balance.value
        }
      })
    }

    await refreshSpotPrices({ fromAsset: toToken, toAsset: fromToken })
    await handleOnSetFromAmount('')
  }, [
    fromToken,
    toToken,
    handleOnSetFromAmount,
    refreshSpotPrices,
    getAssetBalanceFactory,
    account,
    network,
    jupiter.reset,
    zeroEx.reset
  ])

  const onSelectToToken = React.useCallback(
    async (token: BlockchainToken) => {
      setToToken(token)
      setSelectingFromOrTo(undefined)
      await refreshSpotPrices({ toAsset: token })

      if (network.coin === CoinType.Solana) {
        await jupiter.reset()
        await handleJupiterQuoteRefresh({
          toToken: token
        })
      } else if (network.coin === CoinType.Ethereum) {
        await zeroEx.reset()
        await handleZeroExQuoteRefresh({
          toToken: token,
          toAmount: ''
        })
      }
    },
    [
      network.coin,
      handleJupiterQuoteRefresh,
      handleZeroExQuoteRefresh,
      refreshSpotPrices,
      jupiter.reset,
      zeroEx.reset
    ]
  )

  const onSelectFromToken = React.useCallback(
    async (token: BlockchainToken) => {
      setFromToken(token)
      setSelectingFromOrTo(undefined)

      if (account) {
        const balance = await getAssetBalanceFactory(account, network)(token)
        dispatch({
          type: 'updateTokenBalances',
          payload: {
            [balance.key]: balance.value
          }
        })
      }

      await refreshSpotPrices({ fromAsset: token })

      if (network.coin === CoinType.Solana) {
        await jupiter.reset()
        await handleJupiterQuoteRefresh({
          fromToken: token
        })
      } else if (network.coin === CoinType.Ethereum) {
        await zeroEx.reset()
        await handleZeroExQuoteRefresh({
          fromToken: token,
          fromAmount: ''
        })
      }
    },
    [
      network.coin,
      handleZeroExQuoteRefresh,
      handleJupiterQuoteRefresh,
      refreshSpotPrices,
      getAssetBalanceFactory,
      account,
      network,
      jupiter.reset,
      zeroEx.reset
    ]
  )

  const onSetSelectedSwapAndSendOption = React.useCallback((value: string) => {
    if (value === 'to-account') {
      setToAnotherAddress('')
    }
    setSelectedSwapAndSendOption(value)
  }, [])

  const handleOnSetToAnotherAddress = React.useCallback((value: string) => {
    setToAnotherAddress(value)
  }, [])

  const onCheckUserConfirmedAddress = React.useCallback(
    (id: string, checked: boolean) => {
      setUserConfirmedAddress(checked)
    },
    [userConfirmedAddress]
  )

  // Memos
  const fiatValue: string | undefined = React.useMemo(() => {
    if (fromAmount && spotPrices.makerAsset) {
      return new Amount(fromAmount).times(spotPrices.makerAsset).formatAsFiat(defaultBaseCurrency)
    }
  }, [spotPrices.makerAsset, fromAmount, defaultBaseCurrency])

  const gasEstimates: GasEstimate = React.useMemo(() => {
    // ToDo: Setup getGasEstimate Methods
    return {
      gasFee: '0.0034',
      gasFeeGwei: '36',
      gasFeeFiat: '17.59',
      time: '1 min'
    }
  }, [])

  const feesWrapped = React.useMemo(() => {
    if (network.coin === CoinType.Ethereum) {
      if (zeroEx.networkFee.isUndefined()) {
        return Amount.zero()
      } else {
        return zeroEx.networkFee
      }
    } else if (network.coin === CoinType.Solana) {
      if (jupiter.networkFee.isUndefined()) {
        return Amount.zero()
      } else {
        return jupiter.networkFee
      }
    }

    return Amount.zero()
  }, [network.coin, zeroEx.networkFee, jupiter.networkFee])

  const swapValidationError: SwapValidationErrorType | undefined = React.useMemo(() => {
    // No validation to perform when From and To amounts are empty, since quote
    // is not fetched.
    if (!fromAmount && !toAmount) {
      return
    }

    if (fromToken && fromAmount && hasDecimalsOverflow(fromAmount, fromToken)) {
      return 'fromAmountDecimalsOverflow'
    }

    if (toToken && toAmount && hasDecimalsOverflow(toAmount, toToken)) {
      return 'toAmountDecimalsOverflow'
    }

    // No balance-based validations to perform when FROM/native balances
    // have not been fetched yet.
    if (!fromAssetBalance || !nativeAssetBalance) {
      return
    }

    if (!fromToken) {
      return
    }

    const fromAmountWeiWrapped = new Amount(fromAmount).multiplyByDecimals(fromToken.decimals)
    if (fromAmountWeiWrapped.gt(fromAssetBalance)) {
      return 'insufficientBalance'
    }

    if (feesWrapped.gt(nativeAssetBalance)) {
      return 'insufficientFundsForGas'
    }

    if (
      fromToken.symbol === network.symbol &&
      fromAmountWeiWrapped.plus(feesWrapped).gt(fromAssetBalance)
    ) {
      return 'insufficientFundsForGas'
    }

    // 0x specific validations
    if (network.coin === CoinType.Ethereum) {
      if (fromToken.isToken && !zeroEx.hasAllowance) {
        return 'insufficientAllowance'
      }

      if (zeroEx.error === undefined) {
        return
      }

      if (zeroEx.error.isInsufficientLiquidity) {
        return 'insufficientLiquidity'
      }

      return 'unknownError'
    }

    // Jupiter specific validations
    if (network.coin === CoinType.Solana) {
      if (jupiter.error?.isInsufficientLiquidity || jupiter.quote?.routes?.length === 0) {
        return 'insufficientLiquidity'
      }

      if (jupiter.error === undefined) {
        return
      }

      return 'unknownError'
    }

    return undefined
  }, [
    fromToken,
    fromAmount,
    toToken,
    toAmount,
    network.coin,
    feesWrapped,
    zeroEx,
    jupiter,
    fromAssetBalance,
    nativeAssetBalance
  ])

  const onSubmit = React.useCallback(async () => {
    if (network.coin === CoinType.Ethereum) {
      if (zeroEx.hasAllowance) {
        await zeroEx.exchange({}, async function () {
          setFromAmount('')
          setToAmount('')
        })
      } else {
        await zeroEx.approve()
      }
    } else if (network.coin === CoinType.Solana) {
      await jupiter.exchange(async function () {
        setFromAmount('')
        setToAmount('')
      })
    }
  }, [network.coin, zeroEx, jupiter])

  const submitButtonText = React.useMemo(() => {
    if (!account) {
      return getLocale('braveSwapConnectWallet')
    }

    if (!fromToken) {
      return getLocale('braveSwapReviewOrder')
    }

    if (swapValidationError === 'insufficientBalance') {
      return getLocale('braveSwapInsufficientBalance').replace('$1', fromToken.symbol)
    }

    if (swapValidationError === 'insufficientFundsForGas') {
      return getLocale('braveSwapInsufficientBalance').replace('$1', network.symbol)
    }

    if (network.coin === CoinType.Ethereum) {
      if (swapValidationError === 'insufficientAllowance') {
        return getLocale('braveSwapApproveToken').replace('$1', fromToken.symbol)
      }
    }

    if (swapValidationError === 'insufficientLiquidity') {
      return getLocale('braveSwapInsufficientLiquidity')
    }

    return getLocale('braveSwapReviewOrder')
  }, [fromToken, network.coin, swapValidationError, account])

  const isSubmitButtonDisabled = React.useMemo(() => {
    return (
      // Prevent creating a swap transaction with stale parameters if fetching
      // of a new quote is in progress.
      zeroEx.loading ||
      jupiter.loading ||
      // If 0x swap quote is empty, there's nothing to create the swap
      // transaction with, so Swap button must be disabled.
      (network.coin === CoinType.Ethereum && zeroEx.quote === undefined) ||
      // If Jupiter quote is empty, there's nothing to create the swap
      // transaction with, so Swap button must be disabled.
      (network.coin === CoinType.Solana && jupiter.quote === undefined) ||
      // FROM/TO assets may be undefined during initialization of the swap
      // assets list.
      fromToken === undefined ||
      toToken === undefined ||
      // Amounts must be defined by the user, or populated from the swap quote,
      // for creating a transaction.
      new Amount(toAmount).isUndefined() ||
      new Amount(toAmount).isZero() ||
      new Amount(fromAmount).isUndefined() ||
      new Amount(fromAmount).isZero() ||
      // Disable Swap button if native asset balance has not been fetched yet,
      // to ensure insufficientFundsForGas error (if applicable) is accurate.
      nativeAssetBalance === undefined ||
      // Disable Swap button if FROM asset balance has not been fetched yet,
      // to ensure insufficientBalance error (if applicable) is accurate.
      fromAssetBalance === undefined ||
      // Unless the validation error is insufficientAllowance, in which case
      // the transaction is an ERC20Approve, Swap button must be disabled.
      (swapValidationError &&
        network.coin === CoinType.Ethereum &&
        swapValidationError !== 'insufficientAllowance')
    )
  }, [network.coin, zeroEx, jupiter, fromToken, toToken, fromAmount, toAmount, swapValidationError])

  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (network.coin === CoinType.Solana) {
        await handleJupiterQuoteRefresh({})
      } else {
        await handleZeroExQuoteRefresh({})
      }
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [network.coin, handleJupiterQuoteRefresh, handleZeroExQuoteRefresh])

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    fromAssetBalance: fromAssetBalance || Amount.zero(),
    fiatValue,
    isFetchingQuote: zeroEx.loading || jupiter.loading,
    quoteOptions,
    selectedQuoteOptionIndex,
    selectingFromOrTo,
    swapAndSendSelected,
    selectedSwapAndSendOption,
    selectedSwapSendAccount,
    toAnotherAddress,
    userConfirmedAddress,
    selectedGasFeeOption,
    slippageTolerance,
    useDirectRoute,
    gasEstimates,
    onSelectFromToken,
    onSelectToToken,
    getCachedAssetBalance,
    onSelectQuoteOption,
    setSelectingFromOrTo,
    handleOnSetFromAmount,
    handleOnSetToAmount,
    onClickFlipSwapTokens,
    setSwapAndSendSelected,
    handleOnSetToAnotherAddress,
    onCheckUserConfirmedAddress,
    onSetSelectedSwapAndSendOption,
    setSelectedSwapSendAccount,
    setSelectedGasFeeOption,
    setSlippageTolerance,
    setUseDirectRoute,
    onSubmit,
    submitButtonText,
    isSubmitButtonDisabled,
    swapValidationError,
    refreshBlockchainState,
    getNetworkAssetsList
  }
}
export default useSwap
