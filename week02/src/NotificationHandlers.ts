// NotificationHandlers.ts

type NotificationHandler =
  | { type: 'email'; handler: () => { success: true; to: string } }
  | { type: 'sms'; handler: () => { sent: true; number: string } }
  | { type: 'push'; handler: () => { delivered: boolean } }
  | { type: 'slack'; handler: () => { ok: boolean; channel: string } };

// Extract: 특정 타입 추출
type EmailHandler = Extract<NotificationHandler, { type: 'email' }>;

// Exclude: 특정 타입 제외
type NonPushHandlers = Exclude<NotificationHandler, { type: 'push' }>;
