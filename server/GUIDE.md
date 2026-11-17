# راهنمای کامل پوشه‌ی `server`

این فایل همه‌ی کدهای بک‌اند را قطعه‌قطعه توضیح می‌دهد: هر خط چه کاری می‌کند و چرا آنجاست. اول تصویر کلی را ببین، بعد فایل‌ها را به ترتیب مسیر یک درخواست بخوان.

## ۱. تصویر کلی

```
server/
├── package.json          معرفی پروژه، دستورها و کتابخانه‌ها
├── tsconfig.json         قوانین کامپایلر TypeScript
├── eslint.config.js      قوانین بررسی کیفیت کد
├── .env.example          نمونه‌ی تنظیمات (کپی آن می‌شود .env)
├── .gitignore            چیزهایی که به git نمی‌روند
├── data/                 فایل‌های JSON دیتابیس
└── src/
    ├── server.ts         نقطه‌ی شروع: سرور را روی یک پورت بالا می‌آورد
    ├── app.ts            برنامه‌ی Express و ترتیب میان‌افزارها
    ├── config/env.ts     خواندن و بررسی تنظیمات محیطی
    ├── lib/
    │   ├── AppError.ts       خطاهایی که خودمان پیش‌بینی می‌کنیم
    │   └── JsonCollection.ts ذخیره و خواندن یک لیست از فایل JSON
    ├── middleware/
    │   ├── notFound.ts       مسیرهای ناموجود
    │   └── errorHandler.ts   تبدیل همه‌ی خطاها به یک قالب JSON
    └── routes/
        ├── index.ts          فهرست مسیرهای /api
        └── health.ts         مسیر /api/health
```

### مسیر یک درخواست

وقتی مرورگر `GET /api/health` را می‌فرستد:

1. `server.ts` درخواست را به برنامه‌ی Express می‌دهد.
2. `app.ts` به ترتیب این میان‌افزارها را اجرا می‌کند: `helmet` (هدرهای امنیتی)، `cors` (اجازه‌ی آدرس سایت)، `express.json` (خواندن بدنه‌ی JSON)، `rateLimit` (محدودیت تعداد درخواست).
3. `routes/index.ts` مسیر `/health` را پیدا می‌کند و `routes/health.ts` جواب می‌دهد.
4. اگر هیچ مسیری جور نشد، `notFound` یک خطای ۴۰۴ می‌سازد.
5. اگر در هر جای این راه خطایی پیش آمد، `errorHandler` آن را به JSON تبدیل می‌کند.

«میان‌افزار» (middleware) تابعی است که بین رسیدن درخواست و فرستادن جواب اجرا می‌شود. هر کدام یا درخواست را به مرحله‌ی بعد می‌دهد (`next()`) یا خودش جواب می‌دهد.

---

## ۲. فایل‌های تنظیمات

### `package.json`

```json
"type": "module",
```
یعنی فایل‌های `.js` به سبک ESM هستند (`import` و `export`) نه سبک قدیمی `require`. TypeScript و Node هر دو با همین سبک کار می‌کنند.

```json
"engines": { "node": ">=20" },
```
اعلام می‌کند پروژه به Node نسخه‌ی ۲۰ یا بالاتر نیاز دارد. فقط هشدار است و جلوی اجرا را نمی‌گیرد.

```json
"dev": "tsx watch src/server.ts",
```
حالت توسعه. `tsx` فایل TypeScript را مستقیم اجرا می‌کند (بدون کامپایل جدا) و با `watch` هر بار فایلی عوض شد سرور را دوباره بالا می‌آورد.

```json
"build": "tsc",
"start": "node dist/server.js",
```
حالت نهایی (production). اول `tsc` همه‌ی کدهای `src` را به JavaScript در پوشه‌ی `dist` تبدیل می‌کند، بعد `node` همان فایل کامپایل‌شده را اجرا می‌کند.

```json
"typecheck": "tsc --noEmit",
"lint": "eslint ."
```
`typecheck` فقط نوع‌ها را بررسی می‌کند و فایلی نمی‌سازد. `lint` کیفیت و الگوی کد را بررسی می‌کند.

کتابخانه‌های اصلی (`dependencies`) که در اجرای سرور لازم‌اند:

| کتابخانه | کار |
| --- | --- |
| `express` | خود وب‌سرور و مسیرها (نسخه‌ی ۵) |
| `cors` | اجازه‌دادن به سایت ما برای صدا زدن API |
| `helmet` | اضافه کردن هدرهای امنیتی به هر جواب |
| `express-rate-limit` | جلوگیری از ارسال تعداد زیاد درخواست از یک نفر |
| `dotenv` | خواندن فایل `.env` |
| `zod` | بررسی شکل داده‌ها در زمان اجرا |

کتابخانه‌های توسعه (`devDependencies`) فقط هنگام ساختن پروژه لازم‌اند: `typescript`، `tsx`، نوع‌های `@types/*` (برای اینکه TypeScript شکل Express و Node را بشناسد)، `eslint` و کمکی‌هایش.

### `tsconfig.json`

```json
"target": "ES2022",
"lib": ["ES2023"],
```
خروجی به زبان JavaScript نسخه‌ی ۲۰۲۲ ساخته می‌شود (Node ۲۰ آن را کامل می‌فهمد). `lib` مشخص می‌کند TypeScript کدام قابلیت‌های داخلی زبان را بشناسد.

```json
"module": "NodeNext",
"moduleResolution": "NodeNext",
```
قوانین `import` مثل خود Node. نتیجه‌اش این است که در کد باید پسوند `.js` را در import بنویسیم (مثلاً `'./app.js'`) حتی وقتی فایل اصلی `app.ts` است. چون Node پس از کامپایل دنبال `app.js` می‌گردد.

```json
"types": ["node"],
```
فقط نوع‌های Node را به‌صورت سراسری بارگذاری کن.

```json
"rootDir": "src", "outDir": "dist", "sourceMap": true,
```
کد در `src` است، خروجی به `dist` می‌رود، و فایل `.map` ساخته می‌شود تا خطاها به خط درست در فایل TypeScript اشاره کنند.

```json
"skipLibCheck": true,
```
فایل‌های نوع کتابخانه‌ها را دوباره بررسی نکن (سریع‌تر می‌شود).

بخش سخت‌گیری:

| گزینه | معنی |
| --- | --- |
| `strict` | همه‌ی بررسی‌های سخت‌گیرانه (مثلاً `null` را فراموش نکردن) |
| `noUncheckedIndexedAccess` | خواندن `array[0]` نوع `T \| undefined` دارد، چون ممکن است عنصری نباشد |
| `noImplicitOverride` | هنگام بازنویسی متد کلاس والد باید `override` نوشت |
| `noUnusedLocals` / `noUnusedParameters` | متغیر یا پارامتر بی‌استفاده خطاست |
| `noFallthroughCasesInSwitch` | فراموش کردن `break` در `switch` خطاست |
| `verbatimModuleSyntax` | import نوع‌ها حتماً با `import type` نوشته شود تا در خروجی حذف شوند |
| `isolatedModules` | هر فایل به‌تنهایی قابل کامپایل باشد (برای `tsx` لازم است) |
| `forceConsistentCasingInFileNames` | حروف بزرگ و کوچک نام فایل در import باید دقیق باشد (ویندوز و لینوکس فرق دارند) |

```json
"include": ["src"]
```
فقط فایل‌های داخل `src` کامپایل می‌شوند.

### `.env.example` و `.env`

`.env.example` نمونه‌ای است که در git می‌ماند. تو آن را به `.env` کپی می‌کنی و مقدارها را عوض می‌کنی. فایل `.env` به git نمی‌رود، چون ممکن است بعداً رمز و کلید داشته باشد.

- `NODE_ENV`: حالت اجرا (`development`، `production` یا `test`).
- `PORT`: پورت سرور. کلاینت در `vite.config.ts` درخواست‌های `/api` را به پورت ۴۰۰۰ می‌فرستد.
- `CLIENT_ORIGIN`: آدرس سایت که اجازه دارد API را صدا بزند (برای CORS).
- `DATA_DIR`: پوشه‌ی فایل‌های JSON، نسبت به پوشه‌ی `server`.

### `.gitignore`

`node_modules` و `dist` به git نمی‌روند (قابل ساختن مجدد). `.env` و `.env.*` نمی‌روند ولی `.env.example` می‌ماند (`!` یعنی استثنا). فایل‌های `data/*.json` نمی‌روند چون محتوای زنده‌ی دیتابیس‌اند، ولی `data/.gitkeep` می‌ماند تا خود پوشه در git وجود داشته باشد. `data/*.tmp` فایل‌های موقتِ نوشتن است.

### `eslint.config.js`

```js
export default tseslint.config(
  { ignores: ['dist', 'data'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.{ts,js}'], languageOptions: { globals: globals.node } },
)
```
خط اول: پوشه‌های `dist` و `data` بررسی نشوند. خط دوم و سوم: قوانین پیشنهادی JavaScript و TypeScript. خط آخر: برای همه‌ی فایل‌ها بگو متغیرهای سراسری Node (مثل `process` و `console`) وجود دارند، تا ESLint آن‌ها را تعریف‌نشده نداند.

---

## ۳. `src/config/env.ts` : تنظیمات محیطی

هدف: همه‌ی تنظیمات را یک بار، هنگام شروع، بخوانیم و اعتبارسنجی کنیم. اگر مشکلی بود همان لحظه سرور بایستد، نه اینکه ساعت‌ها بعد در جای عجیبی خطا بدهد.

```ts
import 'dotenv/config'
```
با اجرای این خط، `dotenv` فایل `.env` را می‌خواند و مقدارهایش را در `process.env` می‌گذارد. باید قبل از هر خواندن `process.env` اجرا شود.

```ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
```
ابزار کار با مسیر فایل، تبدیل آدرس `file://` به مسیر معمولی، و `zod` برای اعتبارسنجی.

```ts
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
```
در ESM متغیر `__dirname` وجود ندارد. `import.meta.url` آدرس همین فایل است. `fileURLToPath` آن را مسیر معمولی می‌کند، `dirname` پوشه‌اش را می‌دهد (`src/config`) و دو بار `..` یعنی دو پوشه بالا = پوشه‌ی `server`. در حالت کامپایل‌شده هم (`dist/config`) نتیجه همین است.

```ts
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CLIENT_ORIGIN: z.url().default('http://localhost:5173'),
  DATA_DIR: z.string().min(1).default('data'),
})
```
شکل مجاز تنظیمات. `z.enum` فقط سه مقدار را قبول می‌کند. `PORT` در `.env` همیشه متن است، پس `z.coerce.number()` آن را به عدد تبدیل می‌کند و بعد باید صحیح و بین ۱ تا ۶۵۵۳۵ باشد. `z.url()` یعنی آدرس معتبر. `.default(...)` یعنی اگر تنظیم نبود، این مقدار.

```ts
const parsed = envSchema.safeParse(process.env)
```
`safeParse` به‌جای پرتاب خطا، نتیجه‌ای با `success` برمی‌گرداند.

```ts
if (!parsed.success) {
  console.error('Invalid environment variables:')
  console.error(z.prettifyError(parsed.error))
  process.exit(1)
}
```
اگر تنظیمات غلط بود، پیام خوانا چاپ کن و برنامه را با کد ۱ (یعنی شکست) ببند.

```ts
const { NODE_ENV, PORT, CLIENT_ORIGIN, DATA_DIR } = parsed.data
```
مقدارهای تمیز و تبدیل‌شده را بیرون می‌کشد. TypeScript اینجا می‌داند `PORT` عدد است.

```ts
export const env = {
  nodeEnv: NODE_ENV,
  isProduction: NODE_ENV === 'production',
  port: PORT,
  clientOrigin: CLIENT_ORIGIN,
  dataDir: path.resolve(serverRoot, DATA_DIR),
} as const
```
شیئی که بقیه‌ی برنامه import می‌کنند. `dataDir` به مسیر کامل تبدیل می‌شود تا مهم نباشد سرور از کدام پوشه اجرا شده. `as const` یعنی فقط‌خواندنی.

---

## ۴. `src/lib/AppError.ts` : خطاهای پیش‌بینی‌شده

```ts
export class AppError extends Error {
```
کلاسی که از `Error` خود JavaScript ارث می‌برد. وقتی خطا از این نوع باشد، یعنی ما خودمان آن را عمداً پرتاب کرده‌ایم و می‌توانیم پیامش را با خیال راحت به کاربر بگوییم. هر خطای دیگر «غیرمنتظره» حساب می‌شود.

```ts
readonly statusCode: number
readonly code: string
readonly details: unknown
```
سه ویژگی: کد HTTP (مثل ۴۰۴)، یک کد متنی برای برنامه‌ها (مثل `NOT_FOUND`)، و جزئیات اختیاری. `readonly` یعنی بعد از ساخته شدن تغییر نمی‌کنند. `unknown` یعنی هر چیزی می‌تواند باشد و قبل از استفاده باید بررسی شود.

```ts
constructor(statusCode: number, code: string, message: string, details?: unknown) {
  super(message)
  this.name = 'AppError'
  this.statusCode = statusCode
  ...
}
```
سازنده. `super(message)` پیام را به `Error` اصلی می‌دهد. `this.name` اسم خطا را در لاگ‌ها خوانا می‌کند. بقیه‌ی خط‌ها مقدارها را ذخیره می‌کنند. (عمداً از «parameter property» استفاده نکردم، یعنی نوشتن `public` داخل پارامتر سازنده. این قابلیت فقط در TypeScript هست و ابزارهایی که فقط نوع‌ها را حذف می‌کنند، مثل حالت type stripping خود Node، آن را نمی‌فهمند. نوشتن ویژگی‌ها جداگانه همه‌جا کار می‌کند.)

```ts
export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(404, 'NOT_FOUND', message)
```
میان‌بر برای خطای ۴۰۴. همین الگو برای `BadRequestError` است که کد ۴۰۰ دارد و می‌تواند `details` (مثلاً فهرست فیلدهای غلط) هم بگیرد. بعداً می‌توانی کلاس‌های دیگر هم اضافه کنی، مثلاً `ConflictError` با کد ۴۰۹.

---

## ۵. `src/lib/JsonCollection.ts` : دیتابیس فایل JSON

این کلاس یک لیست از رکوردها (مثلاً همه‌ی نظرها) را در یک فایل `data/<name>.json` نگه می‌دارد. `<T>` یعنی نوع رکورد را موقع ساختن می‌دهی: `new JsonCollection<Review>(dir, 'reviews')`.

```ts
readonly #file: string
#queue: Promise<unknown> = Promise.resolve()
```
`#` یعنی فیلد خصوصی: از بیرون کلاس قابل دسترسی نیست. `#file` مسیر فایل است. `#queue` صفی از کارها است که با یک Promise که از قبل تمام‌شده شروع می‌شود.

```ts
constructor(dir: string, name: string) {
  this.#file = path.join(dir, `${name}.json`)
}
```
مسیر فایل را از پوشه و نام می‌سازد، مثلاً `data/reviews.json`.

### `read()`

```ts
const raw = await readFile(this.#file, 'utf8')
const data: unknown = JSON.parse(raw)
if (!Array.isArray(data)) throw new Error(...)
return data as T[]
```
فایل را به‌صورت متن می‌خواند، به JSON تبدیل می‌کند و بررسی می‌کند لیست باشد (اگر کسی فایل را دستی خراب کرده باشد، خطای روشن می‌دهد). `as T[]` یعنی به TypeScript می‌گوییم محتوا از نوع رکورد ماست. این تنها جایی است که به فایل اعتماد می‌کنیم.

```ts
} catch (error) {
  if (isNotFound(error)) return []
  throw error
}
```
اگر فایل هنوز وجود نداشت (کد `ENOENT`) یعنی هنوز هیچ رکوردی نداریم و لیست خالی برمی‌گردد. هر خطای دیگر (مثلاً JSON خراب) پرتاب می‌شود تا نادیده گرفته نشود.

### `update(change)`

```ts
update<R = void>(change: (items: T[]) => { items: T[]; result: R }): Promise<R> {
```
تنها راه تغییر دادن داده. تابع `change` لیست فعلی را می‌گیرد و باید لیست جدید (`items`) و یک نتیجه (`result`) برگرداند؛ مثلاً لیست با نظر تازه و خود نظر تازه. `R` نوع آن نتیجه است.

```ts
const run = this.#queue.then(async () => {
  const { items, result } = change(await this.read())
  await this.#write(items)
  return result
})
```
هر تغییر پشت سر تغییر قبلی اجرا می‌شود (`.then` روی صف). چرا؟ اگر دو نفر همزمان نظر بفرستند و هر دو اول بخوانند و بعد بنویسند، تغییر یکی گم می‌شد. با صف، دومی بعد از تمام شدن نوشتن اولی می‌خواند.

```ts
this.#queue = run.catch(() => undefined)
return run
```
صف را به نسخه‌ای از `run` که خطا را می‌بلعد وصل می‌کنیم، تا اگر یک تغییر شکست خورد، تغییرهای بعدی گیر نکنند. ولی به صدازننده خود `run` را برمی‌گردانیم، تا خطا را ببیند.

### `#write(items)`

```ts
await mkdir(path.dirname(this.#file), { recursive: true })
const temp = `${this.#file}.tmp`
await writeFile(temp, JSON.stringify(items, null, 2), 'utf8')
await rename(temp, this.#file)
```
اول پوشه را (اگر نبود) می‌سازد. بعد داده را در یک فایل موقت (`.tmp`) می‌نویسد و آخر آن را با `rename` جای فایل اصلی می‌گذارد. `rename` یک عمل یکباره است؛ پس اگر برق وسط نوشتن برود، فایل اصلی یا کامل قدیمی است یا کامل جدید، هرگز نیمه‌نوشته نیست. `null, 2` یعنی JSON با تورفتگی خوانا ذخیره شود.

```ts
function isNotFound(error: unknown) {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}
```
بررسی اینکه خطا از نوع «فایل پیدا نشد» است. چون نوع `unknown` است، قدم به قدم بررسی می‌کنیم تا TypeScript اجازه‌ی خواندن `code` را بدهد.

> محدودیت: این روش برای یک پردازه‌ی سرور و چند هزار رکورد مناسب است. اگر چند سرور همزمان روی یک فایل بنویسند، صف کار نمی‌کند. آن‌وقت باید به یک دیتابیس واقعی رفت و فقط همین کلاس عوض می‌شود.

---

## ۶. `src/middleware`

### `notFound.ts`

```ts
export const notFound: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`))
}
```
این میان‌افزار بعد از همه‌ی مسیرها قرار می‌گیرد. اگر درخواستی به اینجا رسید یعنی هیچ مسیری با آن جور نشده. پس یک `NotFoundError` می‌سازد و با `next(error)` به مدیر خطا می‌دهد. `_res` با خط‌زیر یعنی پارامتر را استفاده نمی‌کنم (ESLint گیر نمی‌دهد).

### `errorHandler.ts`

Express خطاهایی را که با `next(error)` برسند (یا در مسیرهای async پرتاب شوند، در نسخه‌ی ۵) به میان‌افزاری با **چهار** پارامتر می‌دهد. این فایل همین است و آخرین میان‌افزار برنامه است.

```ts
type ErrorBody = { status: 'error'; code: string; message: string; details?: unknown }
```
شکل یکسان جواب خطا. کلاینت همیشه همین را می‌گیرد.

```ts
export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) { next(error); return }
```
اگر جواب قبلاً شروع به ارسال شده، دیگر نمی‌شود وضعیت و هدر تغییر داد؛ خطا را به مدیر پیش‌فرض Express می‌دهیم که ارتباط را ببندد.

```ts
if (error instanceof AppError) {
  const body: ErrorBody = { status: 'error', code: error.code, message: error.message }
  if (error.details !== undefined) body.details = error.details
  res.status(error.statusCode).json(body)
  return
}
```
خطای خودمان: با همان کد و پیامی که خودمان نوشته‌ایم جواب بده. `details` فقط اگر وجود داشت اضافه می‌شود.

```ts
if (error instanceof z.ZodError) {
  res.status(400).json({ ..., details: z.flattenError(error).fieldErrors } satisfies ErrorBody)
```
اگر یک schema از Zod (مثلاً بررسی بدنه‌ی نظر) شکست خورد، کد ۴۰۰ بده. `flattenError(...).fieldErrors` خطاها را به شکل `{ name: ['...'], text: ['...'] }` درمی‌آورد. `satisfies ErrorBody` یعنی TypeScript بررسی کند شکل درست است ولی نوع دقیق را عوض نکند.

```ts
if (isBodyParserError(error)) {
  res.status(error.status).json({ ... code: 'BAD_REQUEST', message: 'The request body could not be read' })
```
خطاهای `express.json()` (JSON خراب یا بدنه‌ی خیلی بزرگ) نوعی دارند که با `entity.` شروع می‌شود و خودشان کد HTTP را همراه دارند (۴۰۰ یا ۴۱۳). این‌ها را هم به قالب خودمان تبدیل می‌کنیم.

```ts
console.error(error)
res.status(500).json({
  ...
  message: env.isProduction || !(error instanceof Error) ? 'Something went wrong' : error.message,
})
```
هر چیز دیگر یعنی باگ ما. جزئیات کامل در لاگ سرور چاپ می‌شود. به کاربر در حالت production فقط یک پیام کلی می‌دهیم (تا چیزی از ساختار داخلی لو نرود). در حالت توسعه پیام واقعی را می‌دهیم تا اشکال‌زدایی راحت باشد.

```ts
function isBodyParserError(error: unknown): error is { status: number; type: string } {
```
تابع «نگهبان نوع» (type guard): اگر `true` بدهد، TypeScript از آن به بعد خطا را از نوع `{status, type}` می‌داند. شرط‌ها: شیء باشد، `type` رشته باشد و با `entity.` شروع شود، و `status` عدد باشد.

---

## ۷. `src/routes`

### `health.ts`

```ts
export const healthRouter = Router()
healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', uptime: Math.round(process.uptime()) })
})
```
`Router()` یک «زیر برنامه»ی مسیرهاست. این مسیر برای بررسی زنده بودن سرور است: `status` را برمی‌گرداند و `uptime` که تعداد ثانیه‌های روشن بودن پردازه است (`process.uptime()` گرد می‌شود). سرویس‌های میزبانی از این مسیر برای فهمیدن اینکه سرور سالم است استفاده می‌کنند.

### `index.ts`

```ts
export const apiRouter = Router()
apiRouter.use('/health', healthRouter)
```
`apiRouter` فهرست همه‌ی مسیرهای API است. `use('/health', ...)` یعنی هر چیزی که با `/health` شروع شود را به `healthRouter` بده. چون در `app.ts` این روتر زیر `/api` نصب شده، آدرس نهایی می‌شود `/api/health`.

خط کامنت آخر نشان می‌دهد نظرها بعداً کجا وصل می‌شوند: `apiRouter.use('/reviews', reviewsRouter)`.

---

## ۸. `src/app.ts` : برنامه‌ی Express

`createApp()` یک تابع است که برنامه را می‌سازد و برمی‌گرداند. جدا بودن آن از `server.ts` یعنی بعداً می‌توان در تست‌ها برنامه را بدون باز کردن پورت ساخت.

```ts
const app = express()
app.disable('x-powered-by')
```
`x-powered-by: Express` را از هدرها حذف می‌کند. لازم نیست مهاجم بداند از چه فریم‌ورکی استفاده می‌کنیم.

```ts
app.use(helmet())
```
چند هدر امنیتی استاندارد اضافه می‌کند (مثلاً `X-Content-Type-Options` و `Content-Security-Policy`).

```ts
app.use(cors({ origin: env.clientOrigin }))
```
مرورگر به‌صورت پیش‌فرض اجازه نمی‌دهد یک سایت (آدرس A) به API آدرس دیگر (B) درخواست بزند. این خط می‌گوید فقط `CLIENT_ORIGIN` (آدرس سایت ما) مجاز است. (در حالت توسعه چون Vite درخواست‌ها را پروکسی می‌کند اصلاً CORS درگیر نیست، ولی در production لازم می‌شود.)

```ts
app.use(express.json({ limit: '10kb' }))
```
بدنه‌ی درخواست‌هایی که `Content-Type: application/json` دارند را می‌خواند و در `req.body` می‌گذارد. سقف ۱۰ کیلوبایت، چون API فقط متن کوتاه می‌گیرد و جلوی فرستادن بدنه‌های بزرگ را می‌گیرد.

```ts
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { status: 'error', code: 'RATE_LIMITED', message: '...' },
  }),
  apiRouter,
)
```
همه‌ی آدرس‌های `/api` اول از محدودکننده می‌گذرند و بعد به `apiRouter` می‌رسند. هر آی‌پی در هر ۱۵ دقیقه (`windowMs` به میلی‌ثانیه) حداکثر ۳۰۰ درخواست مجاز است؛ بیشتر از آن جواب ۴۲۹ می‌گیرد. `standardHeaders` اطلاعات محدودیت را با هدرهای استاندارد (`RateLimit`) می‌فرستد و `legacyHeaders: false` هدرهای قدیمی `X-RateLimit-*` را خاموش می‌کند. `message` همان قالب خطای ماست. برای ثبت نظر بعداً محدودیت سخت‌گیرانه‌تر و جداگانه‌ای می‌گذاریم.

```ts
app.use(notFound)
app.use(errorHandler)
return app
```
ترتیب مهم است: Express میان‌افزارها را به ترتیب ثبت اجرا می‌کند. `notFound` باید بعد از همه‌ی مسیرها باشد و `errorHandler` باید آخر از همه، تا خطای همه‌ی بخش‌های بالاتر را بگیرد.

> اگر روزی پشت یک پروکسی (مثل nginx) اجرا شود، باید `app.set('trust proxy', 1)` اضافه شود، وگرنه محدودکننده همه را یک آی‌پی (آی‌پی پروکسی) می‌بیند.

---

## ۹. `src/server.ts` : شروع سرور

```ts
const server = createApp().listen(env.port, () => {
  console.log(`API ready on http://localhost:${env.port} (${env.nodeEnv})`)
})
```
برنامه را می‌سازد و روی پورت تنظیم‌شده به درخواست‌ها گوش می‌دهد. تابع دوم وقتی اجرا می‌شود که سرور آماده است. نتیجه‌ی `listen` را در `server` نگه می‌داریم تا بعداً بتوانیم ببندیمش.

```ts
function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`)
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 10_000).unref()
}
```
خاموش کردن مرتب. `server.close` دیگر درخواست تازه‌ای نمی‌پذیرد و وقتی درخواست‌های در جریان تمام شدند، `process.exit(0)` (موفق) اجرا می‌شود. اگر ظرف ۱۰ ثانیه تمام نشد، با کد ۱ بسته می‌شود تا سرور برای همیشه آویزان نماند. `.unref()` یعنی خود این تایمر مانع بسته شدن عادی برنامه نشود.

```ts
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
```
`SIGINT` وقتی است که تو `Ctrl+C` می‌زنی و `SIGTERM` سیگنالی است که سرویس‌های میزبانی (و Docker) برای خاموش کردن می‌فرستند. هر دو به همان تابع می‌روند.

---

## ۱۰. بعد از این چه می‌شود؟

وقتی API نظرها را بخواهی، معمولاً این فایل‌ها اضافه می‌شوند:

- `src/schemas/review.ts`: schema های Zod برای نظر ورودی (همان حدهای نام ۲ تا ۴۰ و متن ۱۰ تا ۵۰۰ حرف که در کلاینت هست).
- `src/services/reviews.ts`: ساختن `JsonCollection<Review>` و توابع «خواندن لیست» و «افزودن نظر».
- `src/routes/reviews.ts`: مسیرهای `GET /api/reviews` و `POST /api/reviews`، و ثبتشان در `routes/index.ts`.
