type NotificationHandeler=
    |{type:"email";handeler:()=>{success:true;to:string}}
    |{type:"sms";handeler:()=>{sent:true;number:string}}
    |{type:"push";handeler:()=>{delevered:boolean}}
    |{type:"slack";handeler:()=>{ok:boolean;channel:string}};

    type EmailHandeler= Extract<NotificationHandeler,{type:"email"}>;
    type NonpushHandeler= Exclude<NotificationHandeler,{type:"push"}>;
