import {
  BaseSignerWalletAdapter,
  TransactionOrVersionedTransaction,
  WalletAdapterEvents,
  WalletName,
  WalletReadyState
} from "@solana/wallet-adapter-base";
import { PublicKey, Transaction, TransactionVersion, VersionedTransaction } from "@solana/web3.js";
import "react-loading-skeleton/dist/skeleton.css";

import { ZetaTestwallet } from "../../e2e/cypress/wallet/wallet";

interface TestWalletWindow extends Window {
  zetaTestWallet?: ZetaTestwallet
}

declare const window: TestWalletWindow;


export
  class TestWalletAdapter extends BaseSignerWalletAdapter {
  sendTransaction(): Promise<string> {
    throw new Error("Method sendTransaction not implemented.");
  }
  signTransaction<T extends TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>>(transaction: T): Promise<T> {
    if (window.zetaTestWallet) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return window.zetaTestWallet.signTransaction(transaction as unknown as VersionedTransaction);
    }

    throw new Error("No test wallet found");
  }

  signAllTransactions<T extends TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>>(transactions: T[]): Promise<T[]> {
    return Promise.all(transactions.map((transaction) => this.signTransaction(transaction)));
  }

  name: WalletName<string> = "Zeta Wallet" as WalletName<string>;
  url = "https://dex.zeta.market";
  icon = "";
  readyState: WalletReadyState = "zetaTestWallet" in window ? WalletReadyState.Installed : WalletReadyState.Unsupported;
  connecting = false;
  supportedTransactionVersions: ReadonlySet<TransactionVersion> = new Set([0]);
  private _connected = false;

  get connected(): boolean {
    return this._connected;
  }

  autoConnect(): Promise<void> {
    return this.connect();
  }

  connect(): Promise<void> {
    if (window.zetaTestWallet) {
      this._connected = true;
      this.emit("connect", window.zetaTestWallet.keypair.publicKey);
    }

    return Promise.resolve();
  }

  get publicKey(): PublicKey | null {
    return window.zetaTestWallet?.keypair.publicKey || null;
  }

  disconnect(): Promise<void> {
    throw new Error("Method disconnect not implemented.");
  }
  protected prepareTransaction(): Promise<Transaction> {
    throw new Error("Method prepareTransaction not implemented.");
  }
  eventNames(): (keyof WalletAdapterEvents)[] {
    throw new Error("Method eventNames not implemented.");
  }
  listenerCount(): number {
    throw new Error("Method listenerCount not implemented.");
  }
  removeAllListeners(): this {
    throw new Error("Method removeAllListeners not implemented.");
  }
}
