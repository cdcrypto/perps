import { Id, ToastOptions, toast } from "react-toastify";
import { Notification, NotificationType } from "./Notification";

const NOTIFICATION_CLOSE_TIME = 3000;

const defaultNotifParams: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  closeButton: false,
  closeOnClick: false,
  icon: false,
};

type NotificationBodyFunction<T> = (data?: T) => string;

type NotificationText = {
  header: string;
  body: string;
};

export type NotificationPromiseText<T = unknown> = {
  header: string;
  body: string | NotificationBodyFunction<T>;
}


type NotificationPromiseParams<TData, TErr = unknown, TPending = unknown> = {
  promise: Promise<TData>;
  text: {
    loading: NotificationPromiseText<TPending>;
    success: NotificationPromiseText<TData>;
    error: NotificationPromiseText<TErr>;
  }
  txDigestGetter?: (data?: TData | TErr | TPending) => string | undefined;
}


export type NotifyParams = {
  variant: NotificationType;
  header: string;
  body: string;
  transactionDigest?: string;
}

export type NotificationInterface = {
  notify: (params: NotifyParams) => Id;
  promise: <TData, TErr = unknown, TPending = unknown>(params: NotificationPromiseParams<TData, TErr, TPending>) => Promise<TData>;
  loading: (text: NotificationText) => Id;
  update: (id: Id, type: NotificationType, text: NotificationText) => void;
};


export const notifications: NotificationInterface = {
  notify: ({ variant, header, body, transactionDigest }: NotifyParams) => {
    switch (variant) {
      case "success":
        return toast.success(
          <Notification removeClose variant="success" header={header} body={body} transactionDigest={transactionDigest} />,
          defaultNotifParams
        );
      case "error":
        return toast.error(
          <Notification removeClose variant="error" header={header} body={body} transactionDigest={transactionDigest} />,
          defaultNotifParams
        );
      case "info":
        return toast.info(
          <Notification removeClose variant="info" header={header} body={body} transactionDigest={transactionDigest} />,
          defaultNotifParams
        );
      case "warning":
        return toast.warning(
          <Notification removeClose variant="warning" header={header} body={body} transactionDigest={transactionDigest} />,
          defaultNotifParams
        );
      case "loading":
        return toast(
          <Notification
            variant="loading"
            header={header}
            body={body}
            removeClose
            transactionDigest={transactionDigest}
          />,
          { ...defaultNotifParams, autoClose: false, closeOnClick: false }
        );
    }
  },

  promise: <TData, TErr = unknown, TPending = unknown>({ promise, text: { loading, success, error }, txDigestGetter: txIdGetter }: NotificationPromiseParams<TData, TErr, TPending>) => {
    return toast.promise<TData, TErr, TPending>(promise, {
      pending: {
        render: ({ data }) => (
          <Notification
            variant="loading"
            header={loading.header}
            body={typeof loading.body === "function" ? loading.body(data) : loading.body}
            removeClose
            transactionDigest={txIdGetter?.(data)}
          />
        ),
        icon: undefined,
        closeButton: false,
        isLoading: false,
        position: "bottom-right",
      },
      success: {
        render: ({ data }) => (
          <Notification
            variant="success"
            header={success.header}
            body={typeof success.body === "function" ? success.body(data) : success.body}
            transactionDigest={txIdGetter?.(data)}
            removeClose
          />
        ),
        icon: false,
        closeButton: false,
        position: "bottom-right",
      },
      error: {
        render: ({ data }) => (
          <Notification
            variant="error"
            header={error.header}
            body={typeof error.body === "function" ? error.body(data) : error.body}
            transactionDigest={txIdGetter?.(data)}
            removeClose
          />
        ),
        icon: false,
        closeButton: false,
        position: "bottom-right",
      },
    });
  },

  loading: (text: NotificationText): Id => {
    const id = toast.loading(
      <Notification header={text.header} body={text.body} removeClose />,
      {
        icon: undefined,
        closeButton: false,
        isLoading: false,
        position: "bottom-right",
      }
    );

    return id;
  },

  update: (id: Id, type: NotificationType, text: NotificationText) => {
    return toast.update(id, {
      render: (
        <Notification variant={type} header={text.header} body={text.body} />
      ),
      type: type === "loading" ? "default" : type,
      icon: false,
      position: "bottom-right",
      closeOnClick: true,
      hideProgressBar: false,
      autoClose: NOTIFICATION_CLOSE_TIME,
      // Delay can be added to demonstrate something is processing between loading() and update()
      // delay: 2000,
    });
  },

  // return { notify, promise, loading, update };
};
