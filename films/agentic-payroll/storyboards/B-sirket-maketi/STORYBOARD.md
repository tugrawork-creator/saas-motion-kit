# Storyboard — Agentic Payroll · B · Şirket Maketi

Tema referansı: 057 Isometric World + 027 Tilt-Shift Diorama + 070 Hex Tile Cartogram + 099 Overhead Desk · Format: 3840×2160 (16:9 master) · Süre: 58 sn · Ses: müzik + UI sesleri

> **Yönün özü:** Şirketin tamamı karanlık bir mimar masasında duran hassas bir maket. İstanbul kulesi, Ankara binası ve Çanakkale kampüsü buzlu akrilikten; katlar departman, **pencereler çalışan**. Sohbet penceresi masanın kenarında duran cam bir tablet ve maket, yazılan her soruya ışıkla cevap verir. Brief'teki "İstanbul ofisi", "Ankara ofisi", "Çanakkale ofisi" burada gerçekten yer olur. İK direktörü için "bütün şirket tek bakışta" duygusu verir.

## Message & tone
- **Cümle:** "Agentic Payroll bütün şirketinizi tarar, eksiği tam yerinde gösterir ve karar için size getirir" demek istiyorum. Bunu sakin, hassas ve güven veren bir tonla söylüyorum ki izleyici bütün şirkete yukarıdan bakan birinin rahatlığını hissetsin.
- **Ton yayı:** bold → premium → calm → technical → trustworthy → calm → bold → warm
- accent: orange
- **Motif:** Pencere ışığı (`motif:window-light`). Hook'ta maketin pencereleri kapalıdır. Bulgularda tek bir pencere kırmızı noktayla karanlık kalır. Tamamlanınca bütün pencereler yanar. Kapanışta ışıklar tek tek söner ve yalnızca logonun ışığı kalır.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | hook | bold | slab-stack-rise | tilt-shift-rack | expo.out | bottom-up | navy+blue | kaide çevresinde yavaş crane-up | plinth, acrylic-numeral-45, day-tiles | | bass-hit+clack | "%45" heykeli masadan akrilik plakalar hâlinde kat kat yükselir; masadaki gün karoları kayıp sıkışır. Metin 1 |
| 2 | 0:03 | 3.0 | hook | premium | focus-band-reveal | crane-dolly-down | sine.inOut | center | navy+blue+grey | tilt-shift odak bandı 2. satıra kayar | acrylic-numeral-45, headline | | air | "Agentic Payroll ile tanıştınız mı?"; kamera %'nin halkasından aşağı, maketin içine iner |
| 3 | 0:06 | 5.0 | ask | calm | rise-from-table | ripple-handoff | power2.out | right-to-left | navy+blue+grey | alçak açı, 35 mm, sığ alan derinliği | glass-tablet, ai-badge, motif:ai-core, company-model | | keyboard-soft | Ön planda cam tablet (sohbet), arkada flu şirket maketi. Prompt harf harf yazılır |
| 4 | 0:11 | 3.0 | ask | bold | press-ripple | scan-plane-wipe | expo.out | radial | orange+navy | sabit, tabletten maketi rack | send-button, table-ripple | | click+ring | surprise: turuncu dalga tabletten masaya geçer, halka halka yayılıp binalara çarpar: soru şirkete ulaşır |
| 5 | 0:14 | 6.0 | think | technical | lamp-swell | pin-rise-carry | power1.inOut | top-down | navy+blue | 45°'ye crane-up, yavaş orbit | motif:ai-core, scan-plane, company-model, status-leader | | drone-soft | Maketin üstündeki çekirdek-lamba büyür; yatay ışık düzlemi binaları kat kat tarar, pencereler taranırken titrer. Etiketler lider çizgileriyle maketin üstünde |
| 6 | 0:20 | 8.0 | findings | trustworthy | pin-and-rise | crane-dolly-in | power3.out | bottom-up | navy+blue+red | İstanbul kulesine yavaş push | window-timesheet, finding-card×3, red-dot, review-button | window-timesheet | pop-soft×3 | Üç iğne maketten yükselir; cam kartlar pencerelerden katman katman çıkar, gölgelerini maketin üstüne düşürür |
| 7 | 0:28 | 5.0 | complete | calm | slab-slide-in | orbit-rise-reveal | sine.inOut | left-to-right | navy+green+blue | İstanbul kulesinde makro, sabit | spreadsheet-slab, row-light, motif:window-light | | slide+chime-run | surprise: makro ölçeğe geçiş. Yarı saydam .xlsx levhası masada kayıp kuleye girer, satırlar ışık olarak katlara tırmanır, karanlık pencereler tek tek yanar |
| 8 | 0:33 | 5.0 | complete | trustworthy | terminal-rise | floor-lift-carry | power2.inOut | radial | navy+blue+green | 60°'ye orbit-rise, geniş plan | pdks-terminals-generic, street-light-lines, status-pill | | hum+confirm | Her binanın girişinde genel PDKS terminali belirir, sokak çizgileri boyunca ışık tablete akar. Metin + yeşil hap |
| 9 | 0:38 | 5.5 | report | premium | floor-extrude | parallax-slide | power3.inOut | right-to-left | navy+blue+grey | Çanakkale kampüsüne push | prompt, floor-bar-chart, try-sheet, dept-card | | keyboard+whoosh | Ürün geliştirme katı binadan dışarı kayar; pencereleri 3D bar grafiğe dizilir, yanında ₺ özet tablosu açılır |
| 10 | 0:43.5 | 4.0 | report | bold | beat-extrude | overhead-dolly-rise | expo.inOut | left-to-right | navy+blue | üç binanın önünden parallax kayış | prompt×3, overtime-floors, sgk-skyline, severance-monolith | | kick-hat | surprise: tempo ikiye katlanır; her prompt bir binayı rapora çevirir |
| 11 | 0:47.5 | 2.5 | report | premium | plan-settle | iris-close | power2.inOut | top-down | navy+blue+grey | 90° tepeden plan görünümü | report-plan, legend | | swell | Bütün raporlar masada bir şehir planı gibi yan yana |
| 12 | 0:50 | 4.0 | close | premium | sink-and-glow | graphic-match-color | power4.inOut | z-in | navy+blue | sabit plan, yavaş push | motif:window-light, motif:ai-core, agentic-payroll-logo-png | | reverse-swell | Raporlar masaya gömülür, pencereler tek tek söner; lamba masaya iner ve ışık havuzu Agentic Payroll logosunu (PNG) masaya düşürür |
| 13 | 0:54 | 4.0 | cta | warm | title-block-draw | end | sine.inOut | center | navy+orange+blue | sabit plan | title-block, headline, datassist-logo-png, cta-button, url | | soft-note | Mimari pafta künyesi düzeninde kapanış; turuncu CTA. Son 1 sn sabit |

## Yedi soru
1. **Ne söylüyorum, hangi tonla?** Yukarıdaki cümle. "Hassas" demek masadaki her şeyin ölçekli, düzenli ve kıpırtısız olması demek. Hareket kamerada; maket yalnızca ışıkla konuşur.
2. **Bir şey tekrar ediyor mu?** Denetim temiz. Tek bilinçli tekrar pencere ışığı ve o bir motif.
3. **Her geçiş ne anlatıyor?**
   - %45 → soru, **tilt-shift rack**: odak bandı rakamdan soruya kayar, sahne küçük bir dünya olduğunu ilk kez fısıldar.
   - soru → sohbet, **crane down**: yukarıdan şirketin içine iniş.
   - yazma → gönder, **ripple handoff**: soru tabletten masaya, masadan binalara geçer.
   - gönder → düşünme, **scan-plane wipe**: ışık düzlemi binaları kat kat keser, tarama kendisi geçiş olur.
   - düşünme → bulgular, **pin-rise carry**: iğneler bulguyu tam bulunduğu pencereden taşır.
   - bulgular → Excel, **crane-dolly in**: eksik penceresi olan kuleye yaklaşma.
   - Excel → PDKS, **orbit-rise reveal**: tek kuleden bütün şirkete; otomatik akış bütün binaları kapsar.
   - tamamlandı → rapor, **floor-lift carry**: kat, yani ekip, raporun kendisi olur.
   - rapor → hızlı raporlar, **parallax slide**: binaların önünden hızlı ama yumuşak geçiş.
   - hızlı raporlar → galeri, **overhead dolly rise**: kuş bakışı bütün tablo.
   - galeri → kapanış, **iris close**: ışık havuzu daralır.
   - kapanış → CTA, **graphic match: color**: mavi ışık havuzu CTA zeminine akar.
4. **Renkler zamanla ne yapıyor?** Pencereler ilk 20 sn boyunca soluk. Kırmızı yalnızca tek pencerede, yeşil 28–38 sn arasında bütün kuleye yayılır. Turuncu yalnızca gönder'de ve CTA'da.
5. **Daha önce hiç yapmadığım bileşen hangisi?** **Pencere puantajı** (Kare 4).
6. **Sürpriz nerede?** 11 sn: masada yayılan turuncu halka. 28 sn: makro ölçeğe geçiş. 43,5 sn: tempo ikiye katlanır.
7. **Son filmimi tekrar ediyor mu?** Geçmiş kaydı yok; ilk film.

## Kareler

### Kare 1 · Hook: %45 (0–6 sn)
- **Ana görsel:** Karanlık mimar masası, üstünde lacivert bir kaide. "%45" akrilik plakalar hâlinde kat kat yükselen bir heykel; plakaların kenarlarında ince mavi ışık. Masada küçük gün karoları kayıp sıkışır.
- **Ekrandaki metin:** "Bordro dönem kapanışınızı %45 hızlandıracak" → "Agentic Payroll ile tanıştınız mı?"
- **Kamera:** Crane-up, ardından tilt-shift odak bandı ikinci satıra kayar. %'nin halkasından aşağı iniş.

### Kare 2 · Soru sor (6–14 sn)
- **Ana görsel:** Masanın kenarında duran cam tablet (üst bar: Agentic Payroll + "AI Destekli" + küçük çekirdek). Arkada flu bir maket: kule, orta bina, alçak kampüs.
- **Ekrandaki metin:** "Eylül ayı döneminde eksik puantaj bilgisi var mı?"
- **Etkileşim:** Gönder'e basılır. Turuncu dalga tabletten masaya geçer ve binalara çarpan bir halkaya dönüşür.

### Kare 3 · Düşünüyor (14–20 sn)
- **Ana görsel:** Maketin üstünde asılı çekirdek-lamba büyür. Yatay bir ışık düzlemi binaları yukarıdan aşağı, kat kat tarar (tomografi gibi). Pencereler taranırken bir an titrer.
- **Ekrandaki metin:** Durum etiketleri lider çizgileriyle maketin üstünde sırayla değişir.

### Kare 4 · Bulgular, kanıt anı (20–28 sn)
- **Yeni bileşen: Pencere puantajı.** Organizasyon şemasının bina hâli: katlar departman, pencereler çalışan (312 pencere). Puantajı eksik çalışanın penceresi yanmaz, üstünde kırmızı nokta durur. Onay bekleyen fazla mesai mavi halkalı iki pencere; mevzuattan etkilenen 14 pencere mavi etiketli. Pencereden bir iğne yükselir ve üstünde cam bulgu kartı açılır.
  - Hareket imzası: iğne `power3.out` ile yükselir, kart iğnenin tepesinde katlanarak açılır, gölgesi maketin çatısına düşer.
- **Ekrandaki metin:** Üç bulgu kartı ve "İncele".

### Kare 5 · Puantajı tamamla (28–38 sn)
- **5A:** "Çalışanların puantaj bilgilerini gir." Yarı saydam bir .xlsx levhası masada kayıp İstanbul kulesine girer. Satırlar ışık olarak katlara tırmanır, karanlık pencereler tek tek yanar, kırmızı nokta yeşile döner.
- **5B:** Kamera yükselir. Her binanın girişinde genel bir PDKS terminali (turnike/kart okuyucu) belirir, sokak çizgileri boyunca ışık tablete akar. "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin." → yeşil hap.

### Kare 6 · Rapor üret (38–50 sn)
- **Ana görsel:** Çanakkale kampüsünün ürün geliştirme katı binadan dışarı kayar, pencereleri 3D bar grafiğe dizilir, yanında cam bir ₺ özet tablosu ve departman kartı açılır.
- **Hızlanan bölüm:** Fazla mesai maliyetinde katlar yatay uzar. SGK 6 ay karşılaştırmasında altı cam levha bir silüet çizer. Kıdem tazminatında kampüs tek, katmanlı bir monolite dönüşür. Sonda tepeden plan: bütün raporlar masada bir şehir planı gibi.

### Kare 7 · Kapanış ve CTA (50–58 sn)
- **Ana görsel:** Raporlar masaya gömülür, pencereler söner, lamba iner ve ışığı Agentic Payroll logosunu (PNG) masaya düşürür.
- **Düzen:** Mimari pafta künyesi: slogan, Datassist logosu + satırı, turuncu "Ücretsiz Demo Talep Edin →", datassist.com.tr. Son 1 sn sabit.
