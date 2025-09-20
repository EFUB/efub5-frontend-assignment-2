// 1. 알림 핸들러 타입 정의
type NotificationHandler =
    | { type: "email"; hander: () => { success: true; to: string } }
    | { type: "sms"; hander: () => { sent: true; number: string } }
    | { type: "push"; hander: () => { delivered: boolean; } }
    | { type: "slack"; hander: () => { ok: boolean; channel: string } };

// 2. 이메일 알림만 추출
type EmailHandler = Extract<NotificationHandler, { type: "email" }>;

// 3. push 알림을 제외한 나머지 추출
type NonPushHandler = Exclude<NotificationHandler, { type: "push" }>;