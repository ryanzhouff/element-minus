export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';
export type ButtonInstance = {
  ref: HTMLButtonElement;
};

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
}
