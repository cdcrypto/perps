import { Button } from "@components/Button";
import { validateRpcEndpoint } from "@utils/connection";
import { useCallback, useEffect, useRef, useState } from "react";
import { notifications } from "../Notification";
import { RpcInputContainer, RpcUrlTextArea } from "./styles";

interface CustomRpcProviderInputProps {
  onChange: (rpcUrl: string) => void;
  value: string;
}

const TEXTAREA_PADDINGS = 24;

export const CustomRpcProviderInput = ({ onChange, value }: CustomRpcProviderInputProps) => {

  const [rpcUrl, setRpcUrl] = useState(value);

  const ref = useRef<HTMLTextAreaElement>(null);

  const setTextareaHeight = useCallback(() => {
    if (ref.current) {
      ref.current.style.height = "";
      ref.current.style.height = `${ref.current.scrollHeight - TEXTAREA_PADDINGS}px`;
    }
  }, []);

  const handleRpcUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRpcUrl(e.target.value);
    setTextareaHeight();
  };


  useEffect(() => { setTextareaHeight(); }, [setTextareaHeight]);

  const saveRpcUrl = async () => {
    const validationResult = await validateRpcEndpoint(rpcUrl);
    if (validationResult.status === "error") {
      notifications.notify({
        variant: "error",
        header: "Invalid Endpoint",
        body: validationResult.message,
      });
      return false;
    }
    notifications.notify({
      variant: "success",
      header: "Valid RPC endpoint",
      body: "Press \"Save changes\" to apply the new RPC endpoint.",
    });
    onChange(rpcUrl);
    return true;
  };

  const isInputTouched = value !== rpcUrl;


  return (
    <RpcInputContainer>
      <RpcUrlTextArea ref={ref} rows={1} placeholder="Enter a custom RPC endpoint" value={rpcUrl} onChange={handleRpcUrlChange} />
      <Button disabled={!isInputTouched} label={"Apply"} onClick={() => void saveRpcUrl()} />
    </RpcInputContainer >
  );
};
