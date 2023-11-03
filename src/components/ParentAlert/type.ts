export interface IProps {
  message: string;
  type: TMessage;
  title?: string | undefined;
}

export enum EMessage {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export type TMessage = 'error' | 'info' | 'warning';
