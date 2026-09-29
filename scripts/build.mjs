import { readFile } from 'node:fs/promises';
const required=['public/index.html','public/panel.html','public/styles.css','public/app.js','worker/index.js','migrations/0001_init.sql'];
await Promise.all(required.map(path => readFile(path)));
const html=await readFile('public/index.html','utf8');
if(!html.includes('dir="rtl"')) throw new Error('RTL فعال نیست');
console.log('✓ ساخت VPPRV1 آماده است؛ فایل‌های ایستا و Worker اعتبارسنجی شدند.');
