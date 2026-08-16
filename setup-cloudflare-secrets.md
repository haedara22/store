# إعداد Secrets في Cloudflare (من PowerShell)

بعد نجاح البناء في GitHub Actions، قم بتشغيل هذه الأوامر في PowerShell:

```powershell
# 1. تسجيل الدخول (إذا لم تكن قد سجلت)
wrangler login

# 2. إضافة DATABASE_URL
wrangler secret put DATABASE_URL --name alhamed-store

# عندما يطلب منك، الصق:
# postgresql://neondb_owner:npg_Qxo38FgzaDRt@ep-icy-dust-axg4cqjq-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# 3. إضافة ADMIN_USERNAME  
wrangler secret put ADMIN_USERNAME --name alhamed-store
# اكتب: admin

# 4. إضافة ADMIN_PASSWORD
wrangler secret put ADMIN_PASSWORD --name alhamed-store
# اكتب كلمة مرور قوية

# 5. التحقق من المتغيرات
wrangler deployments list --name alhamed-store
```

## أو من Cloudflare Dashboard:

1. اذهب إلى: https://dash.cloudflare.com/
2. Workers & Pages → alhamed-store
3. Settings → Variables and Secrets
4. أضف المتغيرات كما موضح في DEPLOYMENT_INSTRUCTIONS.md
