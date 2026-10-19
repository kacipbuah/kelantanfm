# Radio Kelantan FM

PWA untuk dengar Radio Kelantan FM 102.9 (RTM) dan ~80 stesen radio Malaysia/Singapura lain secara langsung, dengan 9 gaya visual spectrum (Web Audio API + canvas) dan info lagu yang sedang/dah dimainkan.

Live: https://kelantanfm.vercel.app

## Ciri

- Main/henti, kawalan volume, sambung semula automatik bila stream putus
- 9 gaya visual: Bulat, Bar, Gelombang, Cermin, Bukit, Air Terjun, Zarah, Cincin, LED
- Tukar gaya: butang "Gaya", swipe kiri/kanan, atau kekunci ←/→
- Boleh install (PWA), kawalan lock screen melalui Media Session
- Pilih stesen (Kelantan FM default); stesen StreamTheWorld/revma main melalui HLS (hls.js) supaya tahan internet tak stabil
- Lagu sedang/dah dimainkan untuk stesen bertanda "♪ info lagu", dari `api/nowplaying.js` (baca senarai lagu radioonline.my, cache 30s)

## Jalankan

Fail statik + satu Vercel function (`api/nowplaying.js`), tiada build:

```sh
npx vercel dev
```

Deploy: `npx vercel deploy --prod`

Senarai stesen dalam `stations.js`. Hak siaran milik stesen masing-masing.
