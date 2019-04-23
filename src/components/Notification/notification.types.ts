export type AlertTypes = 'error' | 'success' | 'warning';

export interface NotificationType {
  readonly alertType?: AlertTypes;
  readonly message?: string;
  readonly title?: string;
}

export interface NotificationProps {
  readonly alertType?: AlertTypes;
  readonly message?: string;
  readonly onClick?: () => void;
  readonly title?: string;
}
