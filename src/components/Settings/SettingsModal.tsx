import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
import { Dropdown } from "@components/Dropdown";
import { DropdownOption } from "@components/Dropdown/Dropdown";
import { ModalProps } from "@components/Modal";
import { Slider } from "@components/Slider";
import { Switcher } from "@components/Switcher";
import { Tabs } from "@components/Tabs";
import { Text } from "@components/Text";
import { useConnection } from "@solana/wallet-adapter-react";
import { getAssetIcon, isEqual } from "@utils/general";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useEffect, useMemo, useState } from "react";
import {
  FeePriorityLevel,
  RpcProviderType,
  useUserSettings,
} from "stores";
import { FormField, FormSection, FormSubSection } from "../Form";
import { CustomRpcProviderInput } from "./CustomRpcProviderInput";
import {
  ButtonsContainer,
  CancelButton,
  Loader,
  LoaderContainer,
  LoaderWrap,
  PriorityTab,
  RpcProviderTab,
  SliderContainer,
  StyledSettingsModal,
  Title,
  TitleButton,
  TitleContainer,
  FeesContainer
} from "./styles";

export type SettingsModalProps = Pick<ModalProps, "open" | "onClose">;

const DROPDOWN_ASSETS: DropdownOption<Asset>[] = [
  { value: Asset.SOL, label: Asset.SOL, data: Asset.SOL, icon: getAssetIcon(Asset.SOL, 24) },
  { value: Asset.BTC, label: Asset.BTC, data: Asset.BTC, icon: getAssetIcon(Asset.BTC, 24) },
  { value: Asset.ETH, label: Asset.ETH, data: Asset.ETH, icon: getAssetIcon(Asset.ETH, 24) },
  { value: Asset.APT, label: Asset.APT, data: Asset.APT, icon: getAssetIcon(Asset.APT, 24) },
  { value: Asset.ARB, label: Asset.ARB, data: Asset.ARB, icon: getAssetIcon(Asset.ARB, 24) },
];
const PRIORITY_TABS = [FeePriorityLevel.NONE, FeePriorityLevel.LOW, FeePriorityLevel.HIGH];
const RPC_PROVIDER_TABS = [RpcProviderType.TRITON, RpcProviderType.CUSTOM];


export const SettingsModal = (props: SettingsModalProps) => {
  const { open, onClose } = props;

  const userSettings = useUserSettings();

  const settings = useMemo(() => ({
    displayWalletAddress: userSettings.displayWalletAddress,
    enableTooltips: userSettings.enableTooltips,
    defaultAsset: userSettings.defaultAsset,
    marketOrderSlippage: userSettings.marketOrderSlippage,
    feePriorityLevel: userSettings.feePriorityLevel,
    rpcProvider: userSettings.rpcProvider,
    customRpcUrl: userSettings.customRpcUrl,
  }), [userSettings]);

  const [formSettings, setFormSettings] = useState(settings);
  const touched = !isEqual(settings, formSettings);


  const { connection } = useConnection();


  const [medianPriorityFee, setMedianPriorityFee] = useState<number>(0);

  useEffect(() => {
    if (!open) {
      return;
    }
    void connection.getRecentPrioritizationFees().then((fees) => {
      const feesSorted = fees
        .sort((a, b) => b.slot - a.slot)
        .slice(0, 20)
        .map((obj) => obj.prioritizationFee)
        .sort((a, b) => a - b);

      const half = Math.floor(feesSorted.length / 2);

      if (feesSorted.length === 0) {
        return;
      }
      
      if (feesSorted.length === 1) {
        setMedianPriorityFee(feesSorted[0]);
        return;
      }
      
      const median = feesSorted.length % 2
        ? feesSorted[half]
        : (feesSorted[half - 1] + feesSorted[half]) / 2;

      setMedianPriorityFee(median);
    });
  }, [connection, open]);


  const [isLoaderVisible, setLoaderVisible] = useState(false);

  const selectedAsset = DROPDOWN_ASSETS.find((asset) => asset.data === formSettings.defaultAsset);

  const slippageStr = `${formSettings.marketOrderSlippage}%`;

  const priorityLevelIndex = PRIORITY_TABS.indexOf(formSettings.feePriorityLevel);

  const setDisplayWalletAddress = (value: boolean) => {
    setFormSettings((prev) => ({ ...prev, displayWalletAddress: value }));
  };

  const setEnableTooltips = (value: boolean) => {
    setFormSettings((prev) => ({ ...prev, enableTooltips: value }));
  };

  const setDefaultAsset = (value: Asset) => {
    setFormSettings((prev) => ({ ...prev, defaultAsset: value }));
  };

  const setmarketOrderSlippage = (value: number) => {
    setFormSettings((prev) => ({ ...prev, marketOrderSlippage: value }));
  };

  const setFeePriorityLevel = (priorityLevelIndex: number) => {
    setFormSettings((prev) => ({ ...prev, feePriorityLevel: PRIORITY_TABS[priorityLevelIndex] }));
  };

  const setRpcCustomUrl = (customRpcUrl: string) => {
    setFormSettings((prev) => ({ ...prev, customRpcUrl }));
  };

  const setRpcProviderType = (providerTabIndex: number) => {
    setFormSettings((prev) => ({ ...prev, rpcProvider: RPC_PROVIDER_TABS[providerTabIndex] }));
  };

  const closeModal = () => {
    setLoaderVisible(false);
    setFormSettings(settings);
    onClose?.();
  };

  const applySettings = () => {
    const settings = useUserSettings.getState();
    const { rpcProvider, customRpcUrl } = settings;

    const isCustomRpc = formSettings.rpcProvider === RpcProviderType.CUSTOM && !!formSettings.customRpcUrl;

    const newSettings = {
      ...formSettings,
      rpcProvider: isCustomRpc ? RpcProviderType.CUSTOM : rpcProvider,
      customRpcUrl: isCustomRpc ? formSettings.customRpcUrl : customRpcUrl,
    };
    const isRpcChanged = rpcProvider !== newSettings.rpcProvider || customRpcUrl !== newSettings.customRpcUrl;

    userSettings.setSettings(newSettings);

    if (isRpcChanged) {
      setLoaderVisible(true);
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    } else {
      closeModal();
    }
  };

  const rpcProviderIndex = useMemo(() => RPC_PROVIDER_TABS.indexOf(formSettings.rpcProvider), [formSettings.rpcProvider]);


  let computerUnit = 0;
  if (formSettings.feePriorityLevel === FeePriorityLevel.LOW) {
    computerUnit = medianPriorityFee;
  } else if (formSettings.feePriorityLevel === FeePriorityLevel.HIGH) {
    computerUnit = 1000 + medianPriorityFee * 2;
  }
  // Fees approximations
  const estimateFees = computerUnit * 0.0000000002;
  const estimateFeesStr = estimateFees.toLocaleString(undefined, { maximumFractionDigits: 9 });


  return (
    <>
      <StyledSettingsModal open={open} onClose={closeModal}>
        <TitleContainer>
          <Title variant="display" color="white">Settings</Title>
          <ButtonsContainer>
            <CancelButton onClick={closeModal} label="Cancel" />
            <TitleButton onClick={applySettings} disabled={!touched} variant="primary" label="Save changes" />
          </ButtonsContainer>
        </TitleContainer>
        <FormSection title="Personalization">
          <FormSubSection>
            <FormField title="Display Wallet Address">
              <Switcher
                checked={formSettings.displayWalletAddress}
                onSwitch={setDisplayWalletAddress}
              />
            </FormField>
            <FormField title="Enable Tooltips">
              <Switcher
                checked={formSettings.enableTooltips}
                onSwitch={setEnableTooltips}
              />
            </FormField>
          </FormSubSection>
        </FormSection>
        <FormSection title="Trading">
          <FormSubSection>
            <FormField title="Default Market">
              <Dropdown
                styles={{
                  valueContainer: (provided) => ({ ...provided, width: "128px" })
                }}
                value={selectedAsset} onChange={(v) => { if (v?.data) { setDefaultAsset(v.data); } }}
                options={DROPDOWN_ASSETS} />
            </FormField>
            <FormField title="Market Order Slippage">
              <SliderContainer>
                <Slider
                  min={0.5}
                  max={5}
                  onChange={setmarketOrderSlippage}
                  value={formSettings.marketOrderSlippage}
                  precision={2}
                  step={0.5}
                  tagValue={slippageStr}
                />
              </SliderContainer>
            </FormField>
            <FormField title="Priority Fees">
              <Tabs
                selectedIndex={priorityLevelIndex}
                onChange={setFeePriorityLevel}
              >
                {PRIORITY_TABS.map((level) => (<PriorityTab key={level}>{level}</PriorityTab>))}
              </Tabs>
              <FeesContainer>
                <Text variant="caption" color="secondary">Est. Fees: {estimateFeesStr} SOL</Text>
              </FeesContainer>
            </FormField>
            <FormField $border={false} title="RPC Provider">
              <Tabs
                selectedIndex={rpcProviderIndex}
                onChange={setRpcProviderType}
              >
                {RPC_PROVIDER_TABS.map((level) => (<RpcProviderTab key={level}>{level}</RpcProviderTab>))}
              </Tabs>
            </FormField>
            {
              formSettings.rpcProvider === RpcProviderType.CUSTOM &&
              <CustomRpcProviderInput value={formSettings.customRpcUrl ?? ""} onChange={setRpcCustomUrl} />
            }
          </FormSubSection>
        </FormSection>
        {isLoaderVisible && (
          <LoaderWrap>
            <ZetaFullLogo />
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          </LoaderWrap >
        )}
      </StyledSettingsModal>

    </>
  );
};
