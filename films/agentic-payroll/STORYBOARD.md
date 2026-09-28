---
format: 1920x1080
duration: 58s
message: "Agentic Payroll eksikleri ve raporları saniyeler içinde önünüze getirir; son karar sizde."
arc: Hook → Soru → Düşünme → Bulgular → Tamamlama → Rapor → Kapanış/CTA
audience: bordro uzmanları, bordro ve İK yöneticileri
mode: autonomous
---

# Storyboard — Agentic Payroll · Seçilen yön: A + D hook

Tema referansı: 061 Dark Keynote + 052 Depth / 3D + 093 One-Take Oner + 008 Calendar Timeline Scrub · Format: 3840×2160 (16:9 master) · Süre: 58 sn · Ses: müzik + UI sesleri

> **Yönün özü:** A · Cam Stüdyo'nun dünyası (karanlık stüdyoda yüzen, kalınlığı ve mavi kenar ışığı olan buzlu cam arayüzler, yansıtan zemin), D · Kapanış Tüneli'nin hook'uyla. Film, cam gün çerçevelerinden oluşan bir tünelde açılır; tünel teleskop gibi kısalır ve "%45" gözle görülür bir mimari değişime dönüşür. Sonra aynı cam dünyada sohbet, bulgular, onay tepsisi ve raporlar gelir. Kapanışta raporlar da hook'taki gibi teleskopla tek bir halkaya kapanır, halka çekirdeğe, çekirdek logoya dönüşür.
> Alternatif yönler ve eskiz kareleri: [`storyboards/`](storyboards).

## Message & tone
- **Cümle:** "Agentic Payroll bordro kapanışını kısaltır: eksikleri ve raporları saniyeler içinde önünüze getirir, son karar sizde kalır" demek istiyorum. Bunu cesur bir açılış ve sakin, premium bir devamla söylüyorum ki izleyici uzun bir ay sonu koridorundan "her şey kontrol altında" ferahlığına çıksın.
- **Ton yayı:** bold → premium → technical → trustworthy → calm → bold → warm
- accent: orange
- **Motif 1:** AI çekirdeği (`motif:ai-core`). Üst barda küçük bir nefes olarak doğar, düşünürken büyür, kapanışta logoya dönüşür.
- **Motif 2:** Teleskop (`motif:telescope`). Hook'ta takvim tüneli iç içe geçip kısalır; kapanışta rapor galerisi aynı hareketle tek bir halkaya kapanır. İlkinde anlamı "süre kısalıyor", ikincisinde "her şey tek yerde toplanıyor".

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | hook | bold | trail-streak-in | ramp-down-landing | expo.out | z-in | navy+blue | hızlı fly-through, 24 mm | motif:telescope, day-frame-tunnel, light-trails, glass-numeral-45 | | bass-hit+whoosh | Kamera cam gün çerçevelerinden oluşan tünelde uçar; tünelin sonunda cam "%45"in içi mavi ışıkla dolar. Metin 1 |
| 2 | 0:03 | 3.0 | hook | premium | telescope-nest | portal-push-through | power3.inOut | z-out | navy+blue+grey | yavaşla, bekle, sonra dalış | telescoping-calendar, glass-numeral-45, headline | telescoping-calendar | glass-clinks | Tünel teleskop gibi iç içe geçip kısalır, her geçişte camda ışık tıkısı. "Agentic Payroll ile tanıştınız mı?"; kamera %'nin alt halkasından geçer |
| 3 | 0:06 | 5.5 | ask | premium | glass-condense | cursor-carry | sine.inOut | center | navy+blue+grey | %5 yavaş dolly-in | chat-window, ai-badge, motif:ai-core, input-box | | keyboard-soft | Halkanın içinde cam sohbet penceresi yoğunlaşır; prompt harf harf yazılır |
| 4 | 0:11.5 | 2.5 | ask | bold | press-depth | glass-refraction-wipe | expo.out | radial | orange+navy | sabit, tıkta mikro push | send-button, orange-wave | | click+swell | surprise: kamera 0,3 sn tamamen durur (sessizlik), buton 6 px içeri gömülür, turuncu ışık dalgası camın içinde halka halka yayılır |
| 5 | 0:14 | 6.0 | think | technical | orbit-in | object-carry | power2.inOut | orbit-ccw | navy+blue | cam yüzeyden içeri geçiş, yavaş orbit | motif:ai-core, employee-cards, timesheet-rows, regulation-docs, scan-light, status-label | | drone-soft | Çekirdek genişler; çalışan kartları, puantaj satırları ve mevzuat belgeleri yörüngeye girer; tarama ışığı geçer. Etiketler sırayla |
| 6 | 0:20 | 8.0 | findings | trustworthy | layer-rise-shadow | focal-iris | power3.out | bottom-up | navy+blue+red | %10 geri çekilme, sabit | finding-card×3, red-dot, review-button, approval-tray | approval-tray | pop-soft×3 | Üç cam kart katman katman yükselir, gölgesini düşürür ve alt kenardaki "Onayınıza hazır" tepsisine süzülür. Kırmızı nokta yalnızca eksik kayıtta |
| 7 | 0:28 | 5.0 | complete | calm | drag-drop-arc | dolly-out-reveal | sine.out | left-to-right | navy+green+blue | yazma kutusunda sabit, hafif crane-down | spreadsheet-file, table-rows, employee-card, red-to-green | | paper-slide+chime | surprise: kadraja dışarıdan tek ağır, fiziksel nesne girer: cam bir .xlsx kalıbı. Satırlar kartlara akar, kırmızı noktalar tek tek yeşile döner |
| 8 | 0:33 | 5.0 | complete | trustworthy | materialize-ring | line-to-horizon | power2.out | radial | navy+blue+green | %30 dolly-out, yavaş orbit | pdks-icons-generic, data-lines, status-pill | | hum+confirm | Genel PDKS ikonları cam nesneler olarak belirir, ışık hatları pencereye akar. Yeşil hap: "Puantaj tamamlandı · Bordro uzmanı onayına hazır" |
| 9 | 0:38 | 5.0 | report | premium | unfold-out-of-frame | speed-ramp | power3.inOut | right-to-left | navy+blue+grey | sola truck + push | prompt, bar-chart-3d, try-table, dept-card | | keyboard+whoosh | Yeşil tamam çizgisi grafiğin taban çizgisi olur. Yanıt pencereden dışarı, 3D alana açılır |
| 10 | 0:43 | 4.5 | report | bold | beat-stack | orbit-reveal | expo.inOut | left-to-right | navy+blue | hızlanan yumuşak pan'ler | prompt×3, report-outputs×3 | | kick-hat | surprise: tempo ikiye katlanır; üç prompt ritimle yazılır, her biri kendi çıktısını üretir |
| 11 | 0:47.5 | 2.5 | report | celebratory | settle-in-row | telescope-collapse-carry | power2.inOut | z-out | navy+blue+grey | galeri hattına 30° orbit | report-gallery, motif:telescope | | swell+clinks | Raporlar galeri gibi dizilir, sonra hook'taki takvim gibi iç içe geçip tek bir halkaya kapanır |
| 12 | 0:50 | 4.0 | close | premium | converge-to-core | match-morph | power4.inOut | z-in | navy+blue | yavaş push-in | motif:ai-core, agentic-payroll-logo-png | | reverse-swell | Halka çekirdeğe, çekirdek Agentic Payroll logosuna (orijinal PNG) dönüşür |
| 13 | 0:54 | 4.0 | cta | warm | lockup-rise | end | sine.inOut | top-down | navy+orange+blue | sabit | headline, datassist-logo-png, cta-button, url | | soft-note | Slogan, Datassist logosu ve satırı, turuncu CTA, datassist.com.tr. Son 1 sn sabit |

## Yedi soru
1. **Ne söylüyorum, hangi tonla?** Yukarıdaki cümle. Açılış cesur (hız, tünel), gövde sakin ve premium (az hareket, uzun kuyruklu ease'ler, aynı anda tek ışık).
2. **Bir şey tekrar ediyor mu?** Denetim temiz: 13 farklı giriş, 12 farklı geçiş, altı geçiş ailesinin hepsi. Tekrarlar yalnızca iki motif (çekirdek, teleskop), ikisi de dönüşerek geri gelir.
3. **Her geçiş ne anlatıyor?**
   - tünel → %45, **ramp-down landing**: hız rakamın önünde yumuşakça sıfırlanır; "hız" duygusu bir sayıya bağlanır.
   - %45 → sohbet, **portal push-through**: %'nin halkası ürünün kapısı olur.
   - yazma → gönder, **cursor carry**; gönder → düşünme, **glass refraction wipe**: camın içinden geçip AI'ın zihnine girmek.
   - düşünme → bulgular, **object carry**; bulgular → Excel, **focal iris**: çözüm, sebebin (eksik kayıt) olduğu yerde başlar.
   - Excel → PDKS, **dolly-out reveal**; tamamlandı → rapor, **line-to-horizon**: veri hazırsa rapor hazırdır.
   - rapor → hızlı raporlar, **speed ramp**: brief'in izin verdiği ikinci hızlanma.
   - hızlı raporlar → galeri, **orbit reveal**; galeri → kapanış, **telescope-collapse carry**: açılıştaki hareketin dönüşü.
   - kapanış → CTA, **match morph**: çekirdek logonun kendisi olur.
4. **Renkler zamanla ne yapıyor?** Lacivert ve mavi ana ton. Turuncu ilk kez gönder'de bir renk olayı olarak patlar, CTA'ya kadar saklanır. Kırmızı yalnızca 20–30 sn arasında tek kartta. Yeşil 28 sn'de doğar, 33 sn'de hap olur, 38 sn'de ufuk çizgisine dönüşür.
5. **Daha önce hiç yapmadığım bileşen hangisi?** İki tane: **teleskop takvim** (Kare 1) ve **onay tepsisi** (Kare 4).
6. **Sürpriz nerede?** 3–6 sn: tünelin kısalması. 11,5 sn: tam duruş ve sessizlik. 28 sn: dışarıdan giren tek ağır nesne. 43 sn: tempo.
7. **Son filmimi tekrar ediyor mu?** Geçmiş kaydı yok; bu ilk film. Teslimde `--append` ile geçmişe yazılacak.

## Kareler

HyperFrames'in plan biçimi (`/hyperframes` → `storyboard-format.md`): her kare bir `## Frame N` bloğu. Tek plan hissi için 3D dünya tek bir katmandır (`assets/js/world.js`, `hf-seek` ile zamandan çizilir); `src`, o karenin HTML yazı katmanıdır. Yazı katmanı olmayan kareler (2 ve 4) tamamen 3D dünyada yaşar, bu yüzden `src` kök kompozisyonu gösterir. Hareket adları repodaki dizinlerden: `hyperframes-animation` → `blueprints-index.md`, `rules-index.md`.

## Frame 1 — Hook: %45 (0–6 sn)

- status: animated
- src: compositions/frames/01-hook.html
- duration: 6s
- poster: 2.2
- transition_in: fade-from-navy
- scene: Cam gün çerçevelerinden tünel; ekim günleri teleskop gibi iç içe geçer; cam "%45" mavi ışıkla dolar
- shots: 1–2
- blueprint: camera-journey (B · imleçsiz uçuş) + dataviz-countup (soğuk açılışta tek istatistik)
- rules: 3d-camera-flight (yumuşak iniş), motion-blur-streak (zemindeki ışık izleri), ambient-glow-bloom, kinetic-type-beats (başlık yerinde değişir)

Kamera eylül günlerinden (EYL 22–30) hızla uçar, rakamın önünde yumuşakça iner. Rakamın arkasında ekim günleri (EKİ 1–9) uzayıp gider: bitmeyen kapanış. **Yeni bileşen, teleskop takvim:** 3,1 sn'den itibaren ekim çerçeveleri en yakından başlayarak birbirinin içine kayar, tünel kısalır; her kilitlenmede kenarda iki karelik ışık tıkısı. Cam "%45" aşağıdan yukarı mavi ışıkla dolar. Metin 1: "Bordro dönem kapanışınızı %45 hızlandıracak" → metin 2: "Agentic Payroll ile tanıştınız mı?". Kamera %'nin alt halkasına dalar; halkanın içi ışıkla dolar (portal).

## Frame 2 — Soru sor (6–14 sn)

- status: animated
- src: index.html
- duration: 8s
- poster: 9.5
- transition_in: portal-push-through
- scene: Halkadan çıkınca cam sohbet penceresi ışık zerreciklerinden yoğunlaşır; soru yazılır, gönder'de tam duruş ve turuncu dalga
- shots: 3–4
- blueprint: prompt-type-submit-generate
- rules: discrete-text-sequence (insan ritminde yazma), context-sensitive-cursor, press-release-spring (6 px gömülme, zıplama yok), cursor-click-ripple (turuncu dalga)

Portal halkası kameranın arkasında kalır; pencere zerreciklerden yoğunlaşır, üst barda küçük çekirdek nefes alır. AI karşılar: "Eylül dönemi açık. Size nasıl yardımcı olabilirim?" Soru yazılır: "Eylül ayı döneminde eksik puantaj bilgisi var mı?" İmleç gönder'e taşınır (cursor carry). **Sürpriz:** 11,5 sn'de kamera 0,3 sn tamamen durur; buton içeri gömülür ve filmin ilk turuncusu olur; turuncu dalga camın içinde halka halka yayılır. Kamera camın boş üst kısmına dalar (glass-refraction-wipe).

## Frame 3 — Düşünüyor (14–20 sn)

- status: animated
- src: compositions/frames/03-think.html
- duration: 6s
- poster: 2.0
- transition_in: glass-refraction-wipe
- scene: Camın arkasında AI çekirdeği büyür; çalışan kartları, puantaj satırları, mevzuat belgeleri üç eğik yörüngede; tarama halkaları geçer
- shots: 5
- blueprint: agent-progress-theater
- rules: orbit-3d-entry (yörüngeye giriş), ambient-glow-bloom (çekirdek), discrete-text-sequence (durum etiketleri)

Çekirdek düşünürken büyür. Nesneler uzaktan yörüngeye girer; çekirdekten çıkan tarama halkaları geçtiği her şeyi aydınlatır. Durum etiketleri sırayla: "312 çalışan taranıyor…" → "Puantaj kayıtları kontrol ediliyor…" → "Eylül mevzuat değişiklikleri eşleştiriliyor…". İlerleme çubuğu yok. Kamera saat yönünün tersine yavaşça döner. Sonda "Ahmet Yılmaz" kartı yörüngeden kopar ve ilk bulguya taşınır (object carry).

## Frame 4 — Bulgular, kanıt anı (20–28 sn)

- status: animated
- src: index.html
- duration: 8s
- poster: 23.5
- transition_in: object-carry
- scene: Üç cam bulgu kartı yükselir, çekirdekten ışık iplikleri iner; kartlar tek tek cam onay tepsisine süzülür; iris kırmızı noktaya kapanır
- shots: 6
- blueprint: agent-progress-theater (makbuz kartları) + grid-card-assemble
- rules: svg-path-draw (ışık iplikleri), depth-of-field-blur (odak irisi), ambient-glow-bloom

Kırmızı nokta yalnızca eksik kayıtta. **Yeni bileşen, onay tepsisi:** "Onayınıza hazır · Karar uzmanda" yazan alçak cam tepsi; kartlar sırayla içine yatar, sayaç 1-2-3 olur. Tepsi hiçbir şeyi kendisi göndermez. Geçiş: focal iris kırmızı noktaya kapanır (çözüm sebebin olduğu yerde başlar), yazma kutusunda açılır.

## Frame 5 — Puantajı tamamla (28–38 sn)

- status: animated
- src: compositions/frames/05-pdks.html
- duration: 10s
- poster: 1.6
- transition_in: focal-iris
- scene: 5A · dışarıdan ağır bir cam .xlsx kalıbı girer, satırlar listeye akar, noktalar yeşile döner · 5B · genel PDKS cihazları halka olur, yeşil ışık hatları pencereye akar
- shots: 7–8
- blueprint: camera-journey (A · eylem → sonuç) + constellation-hub (5B)
- rules: cursor-drag (sürükle-bırak yayı, zıplamasız oturma), control-target-sync (satır → nokta), svg-path-draw (veri hatları)

**Sürpriz (28,5 sn):** kadraja dışarıdan tek ağır, fiziksel nesne girer: cam bir .xlsx kalıbı (Excel logosu yok, genel tablo ikonu). Dosya çipi yazma kutusuna düşer, komut yazılır: "Çalışanların puantaj bilgilerini gir." Işık satırları listeye akar; üç kırmızı nokta tek tek yeşile döner. 5B: kamera geri çekilir; genel PDKS cihazları (parmak izi, kartlı geçiş, yüz tanıma, turnike, mobil, vardiya) cam karolar olarak belirir, veri paketleri hatlardan pencereye akar. "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin." → yeşil hap "Puantaj tamamlandı · Bordro uzmanı onayına hazır". Hap bir çizgiye kapanır ve zemine iner (line-to-horizon).

## Frame 6 — Rapor üret (38–50 sn)

- status: animated
- src: compositions/frames/06-prompts.html
- duration: 12s
- poster: 4.5
- transition_in: line-to-horizon
- scene: Yeşil çizgi grafiğin taban çizgisi olur; yanıt pencereden 3D alana açılır; tempo ikiye katlanır, üç hızlı rapor; galeri teleskopla tek halkaya kapanır
- shots: 9–11
- blueprint: prompt-type-submit-generate (tam döngü) + dataviz-countup + grid-card-assemble (galeri)
- rules: stat-bars-and-fills (ışıkla dolan cam sütunlar), counting-dynamic-scale (₺ değerleri), nudge-curve (hızlanan pan'ler), kinetic-type-beats (ritimli promptlar)

"Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla." Pencere sola kayar; ışıkla dolan cam sütunlar yeşil taban çizgisinde yükselir, ₺ değerleri sayar, özet tablo ve departman kartı açılır. **Sürpriz (43 sn):** tempo ikiye katlanır; üç prompt ritimle yazılır, her biri kendi çıktısını yerinde üretir: fazla mesai maliyeti, 6 aylık SGK prim karşılaştırması, kıdem tazminatı yükümlülüğü. Raporlar galeri gibi dizilir, sonra hook'taki takvim gibi iç içe geçer ve tek bir halka kalır (telescope-collapse carry). Rakamlar temsilidir.

## Frame 7 — Kapanış ve CTA (50–58 sn)

- status: animated
- src: compositions/frames/07-close.html
- duration: 8s
- poster: 6.5
- transition_in: telescope-collapse-carry
- scene: Halka çekirdeğe kapanır, çekirdek bir ışık noktasına dönüşür ve yerini logoya bırakır; slogan, Datassist logosu, turuncu CTA, datassist.com.tr
- shots: 12–13
- blueprint: logo-assemble-lockup + cta-morph-press
- rules: ambient-glow-bloom, titlecard-reveal (tek hareketli kilitlenme)

Halka çekirdeğe, çekirdek Agentic Payroll logosuna dönüşür (match-morph). Kilitlenme yükselir: "Bordronun kontrolü sizde, hız Agentic Payroll'da." · Datassist logosu (beyaz PNG) + "Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri" · turuncu "Ücretsiz Demo Talep Edin" + datassist.com.tr. Son 1 sn sabit. Logo yuvaları orijinal PNG'ler gelene kadar kesikli çerçeve; logolar asla yeniden çizilmez.
