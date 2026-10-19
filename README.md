# Radio Kelantan FM

PWA untuk dengar Radio Kelantan FM 102.9 (RTM) secara langsung, dengan 9 gaya visual spectrum (Web Audio API + canvas).

Live: https://kelantanfm.vercel.app

## Ciri

- Main/henti, kawalan volume, sambung semula automatik bila stream putus
- 9 gaya visual: Bulat, Bar, Gelombang, Cermin, Bukit, Air Terjun, Zarah, Cincin, LED
- Tukar gaya: butang "Gaya", swipe kiri/kanan, atau kekunci ←/→
- Boleh install (PWA), kawalan lock screen melalui Media Session

## Jalankan

Fail statik sahaja, tiada build. Contoh:

```sh
npx serve .
```

Deploy: `npx vercel deploy --prod`

Stream: StreamTheWorld `KELANTAN_FMAAC.aac`. Hak siaran milik RTM.
