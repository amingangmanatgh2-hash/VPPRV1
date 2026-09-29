import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
test('رابط اصلی فارسی و RTL است',async()=>{const s=await readFile('public/index.html','utf8');assert.match(s,/lang="fa" dir="rtl"/);assert.match(s,/VPPRV1/)});
test('پنل دارای فرم ورود امن است',async()=>{const s=await readFile('public/panel.html','utf8');assert.match(s,/autocomplete="current-password"/);assert.match(s,/ورود به پنل/)});
test('کلید خصوصی در migration ذخیره نمی‌شود',async()=>{const s=await readFile('migrations/0001_init.sql','utf8');assert.doesNotMatch(s,/private_key/i);assert.match(s,/public_key/)});
test('انتخاب بهترین سرور وضعیت و بار را لحاظ می‌کند',async()=>{const s=await readFile('worker/index.js','utf8');assert.match(s,/status='active'/);assert.match(s,/latency \+ load\*2/)});
