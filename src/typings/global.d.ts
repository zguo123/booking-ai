export type ErrorType = {
  message:
    | string
    | {
        [key: string]: string | undefined;
      };
};

export type APIRet = {
  success: boolean;
  error?: ErrorType;
  status: number;
};

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
