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

### Kare 1 · Hook: %45 (0–6 sn)
- **Ana görsel:** Kapanış dönemi, buzlu cam gün çerçevelerinden oluşan bir tünel; her çerçevede ince, büyük bir gün numarası. Zeminde uzun pozlama mavi ışık izleri. Tünelin sonunda kalın cam bir "%45", içi aşağıdan yukarı mavi ışıkla dolar.
- **Yeni bileşen: Teleskop takvim.** Çerçeveler teleskop gibi birbirinin içine kayar ve tünel gözle görülür biçimde kısalır; her geçişte çerçeve kenarında 2 karelik ışık tıkısı ve cam tınısı.
- **Ekrandaki metin:** "Bordro dönem kapanışınızı %45 hızlandıracak" → "Agentic Payroll ile tanıştınız mı?"
- **Kamera:** Hızlı fly-through, rakamın önünde yavaşlama, %'nin alt halkasından dalış.

### Kare 2 · Soru sor (6–14 sn)
- Halkanın içinde cam sohbet penceresi yoğunlaşır (Agentic Payroll + "AI Destekli" + nefes alan çekirdek). Prompt: "Eylül ayı döneminde eksik puantaj bilgisi var mı?" Gönder'de 0,3 sn tam duruş, buton içeri gömülür, turuncu dalga camın kalınlığı içinde yayılır.

### Kare 3 · Düşünüyor (14–20 sn)
- Kamera cam yüzeyden içeri geçer. Çekirdek genişler; çalışan kartları, puantaj satırları ve mevzuat belgeleri üç eğik yörüngede döner, tarama ışığı geçer. Durum etiketleri sırayla; ilerleme çubuğu yok.

### Kare 4 · Bulgular, kanıt anı (20–28 sn)
- Üç cam bulgu kartı katman katman yükselir; yalnızca eksik kayıt kırmızı noktalı. Kartlar kadrajın alt kenarındaki cam **onay tepsisine** ("Onayınıza hazır") süzülür. Tepsi hiçbir şeyi kendisi göndermez; kontrol uzmandadır.

### Kare 5 · Puantajı tamamla (28–38 sn)
- 5A: "Çalışanların puantaj bilgilerini gir." Cam bir .xlsx kalıbı pencereye bırakılır (Excel logosu yok), satırlar kartlara akar, kırmızı noktalar yeşile döner.
- 5B: Geri çekilme; genel PDKS ikonları cam nesneler olarak belirir, ışık hatları pencereye akar. "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin." → yeşil hap.

### Kare 6 · Rapor üret (38–50 sn)
- Yeşil çizgi grafiğin taban çizgisi olur. "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla." Yanıt pencereden dışarı, 3D alana açılır: ışıkla dolu cam sütunlar, ₺ özet tablo, departman kartı. Ardından üç hızlı prompt, sonda galeri; galeri teleskopla tek halkaya kapanır.

### Kare 7 · Kapanış ve CTA (50–58 sn)
- Halka çekirdeğe, çekirdek Agentic Payroll logosuna (PNG) dönüşür. "Bordronun kontrolü sizde, hız Agentic Payroll'da." · Datassist logosu (beyaz PNG) + "Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri" · turuncu "Ücretsiz Demo Talep Edin →" + datassist.com.tr. Son 1 sn sabit.
