# Styleframes: A + D hook

Seçilen yönün ([`../STORYBOARD.md`](../STORYBOARD.md)) üç anahtar karesi, gerçek 3D ışık, cam ve yansımayla (three.js). Bu sahneler build aşamasında HyperFrames kompozisyonunun başlangıç noktası olacak: kamera, malzeme ve ışık ayarları buradan taşınır.

| Kare | Sahne | Dosya |
|---|---|---|
| SF1 | Hook: cam gün çerçevelerinden tünel, ışıkla dolan cam "%45" | [`out/sf1-3840.jpg`](out/sf1-3840.jpg) |
| SF2 | Kanıt anı: bulgu kartları ve onay tepsisi | [`out/sf2-3840.jpg`](out/sf2-3840.jpg) |
| SF3 | Rapor: yanıt pencereden 3D alana açılır | [`out/sf3-3840.jpg`](out/sf3-3840.jpg) |

`out/` altında her karenin 1920 px önizlemesi de var.

## Nasıl üretilir

```bash
cd films/agentic-payroll/styleframes
NODE_PATH=$(npm root -g) node render.cjs 3840        # üç kare, 4K
NODE_PATH=$(npm root -g) node render.cjs 1920 2      # yalnızca SF2, önizleme
python tools/make_typeface.py 800 "%0123456789"       # 3D rakam fontu (Inter 800, çakışmalar temizlenmiş)
```

`render.cjs` klasörü yerel bir portta sunar (ES modülleri `file://` üzerinden yüklenmez), sayfayı açar ve `window.__ready` gelince ekran görüntüsü alır. Bu ortamda WebGL, SwiftShader (yazılımsal GPU) ile çalışıyor: 4K bir kare yaklaşık 27 sn sürüyor. Gerçek GPU'lu bir makinede saniyenin altına iner.

## Yapı

- `sf.js`: sahneler (`sf1`, `sf2`, `sf3`) ve ortak parçalar: buzlu cam malzemesi, mavi kenar ışığı, cam panel + basılı arayüz, AI çekirdeği, yansıtan zemin + nokta ızgarası, bokeh, ışıkla dolan cam rakam.
- `ui.js`: panellerin üstüne basılan 2D arayüz (sohbet penceresi, bulgu kartı, tablo, departman kartı, tepsi etiketi). Yerleşimler panel yüksekliğine orantılı olduğu için her boyutta keskin.
- `assets/inter-800.typeface.json`: `tools/make_typeface.py` ile Inter'den üretilen 3D rakam fontu. `assets/fonts/`: Inter (latin + latin-ext, SIL OFL).
- `vendor/three/`: three.js 0.186.1 (MIT) ve kullanılan eklentiler. İnternete bağımlılık yok.

Kurallar: her şey tohumlu (seeded) ve deterministik; arayüz yazıları ayrı bir katmanda, bu yüzden zemin yansımasında ters yazı görünmez; renkler BRIEF.md'deki marka token'larından.
