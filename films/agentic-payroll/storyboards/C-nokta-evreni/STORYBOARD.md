# Storyboard — Agentic Payroll · C · Nokta Evreni

Tema referansı: 035 Point Cloud + 010 Powers-of-Ten Zoom + 036 Sonar Sweep + 063 Isotype Unit Chart · Format: 3840×2160 (16:9 master) · Süre: 58 sn · Ses: müzik + UI sesleri

> **Yönün özü:** Datassist'in nokta ızgarası motifi filmin maddesi olur: **her nokta bir çalışan kaydı**. Düz marka ızgarası havaya kalkar, 3D bir nokta evrenine dönüşür. Çekirdek bu evrenin yıldızıdır. Kamera sahneler arasında ölçek değiştirerek gezer (tek bir noktanın içine dalar, bütün şirketi bir galaksi olarak görür). Cam yalnızca sohbet penceresinde ve kartlarda kullanılır; geri kalan her şey ışık noktası.

## Message & tone
- **Cümle:** "Agentic Payroll 312 kaydın her birine bakar, cevap vermeyen tek noktayı bulur ve size getirir" demek istiyorum. Bunu merak uyandıran, teknolojik ve güven veren bir tonla söylüyorum ki izleyici "hiçbir şey gözden kaçmıyor" diye rahatlasın.
- **Ton yayı:** mysterious → premium → calm → technical → trustworthy → calm → bold → warm
- accent: orange
- **Motif:** Nokta ızgarası (`motif:dot-grid`). Açılışta düz ve sakin bir marka ızgarası, ortada 312 noktalık canlı bir sayım, kapanışta yine düz ızgara. Ama bu kez içinde tek bir turuncu nokta var ve o nokta CTA butonu olur.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.5 | hook | mysterious | swarm-assemble | orbit-swirl | power2.inOut | radial | navy+blue | 30° yavaş orbit (saat yönü tersi) | motif:dot-grid, dot-numeral-45, month-dot-grids | | sub-bass | Düz marka ızgarasındaki noktalar kalkıp dev bir 3D "%45"e toplanır; arkada ay ızgaraları (7×5 nokta) sıkışır. Metin 1 |
| 2 | 0:03.5 | 2.5 | hook | premium | dots-scatter-reform | powers-of-ten-zoom | expo.in | z-in | navy+blue+grey | orbit sürer, sonra tek noktaya logaritmik zoom | dot-numeral-45, headline | | air-rise | Rakam dağılır; "Agentic Payroll ile tanıştınız mı?"; kamera tek bir noktanın içine dalar |
| 3 | 0:06 | 5.5 | ask | calm | dot-to-glass-condense | dot-pulse-handoff | sine.inOut | center | navy+blue+grey | sabit, mikro kayma | chat-window-dot-glass, ai-badge, motif:ai-core | | keyboard-soft | surprise: ölçek sıçraması, noktanın içinde bir cam sohbet penceresi var. Prompt harf harf yazılır |
| 4 | 0:11.5 | 2.5 | ask | bold | press-pulse | dither-pixel-sort | expo.out | radial | orange+navy | sabit | send-button, orange-dot-wave | | click+ring | Gönder'e basılınca turuncu noktalardan bir halka ızgarada dalga olur |
| 5 | 0:14 | 6.0 | think | technical | orbit-spawn | sonar-iris | power1.inOut | orbit-cw | navy+blue | geri çekilme, yavaş orbit | motif:ai-core, dot-census, orbit-rings, sonar-ring, status-label | dot-census | drone-soft | Pencere noktalara ayrışır; 312 nokta = 312 çalışan, çekirdek-yıldızın çevresinde üç yörüngeye dizilir; sonar halkası tarar. Etiketler sırayla |
| 6 | 0:20 | 8.0 | findings | trustworthy | ember-lift-unfold | ember-carry | power3.out | bottom-up | navy+blue+red | kıvılcımlara yavaş push-in | dot-census, red-ember, finding-card×3, review-button | | pop-soft×3 | surprise: bütün yörünge 0,4 sn donar (sessizlik); tek nokta kırmızı kalır, yukarı süzülür ve cam karta açılır. Diğer iki bulgu mavi halkalı |
| 7 | 0:28 | 5.0 | complete | calm | file-to-stream | zoom-out-constellation | sine.out | left-to-right | navy+green+blue | sabit, hafif kayma | spreadsheet-file, dot-stream, red-to-green | | stream+chime | .xlsx dosyası kadraja girer, hücreleri noktalara ayrışıp nehir gibi kartlara akar; kırmızı noktalar yeşile döner |
| 8 | 0:33 | 5.0 | complete | trustworthy | constellation-link | constellation-morph-match | power2.inOut | radial | navy+blue+green | logaritmik zoom-out | pdks-constellations-generic, dot-trails, status-pill | | hum+confirm | surprise: ölçek sıçraması, pencere genel PDKS ikonlarından oluşan takımyıldızların ortasında bir yıldız olur; nokta kuyrukları içeri akar. Metin + yeşil hap |
| 9 | 0:38 | 5.5 | report | premium | dots-stack-chart | beat-freeze-morph | power3.inOut | bottom-up | navy+blue+grey | grafiğe push-in | prompt, dot-bar-chart, try-table, dept-card | | keyboard+whoosh | Takımyıldız çizgileri grafiğin eksenleri olur, noktalar 3D nokta-sütunlara istiflenir; ₺ özet tablosu |
| 10 | 0:43.5 | 4.0 | report | bold | morph-on-beat | orbit-ring | expo.inOut | right-to-left | navy+blue | her vuruşta yumuşak pan | prompt×3, dot-charts×3 | | kick-hat | surprise: tempo ikiye katlanır; her vuruşta noktalar 2 kare donar ve yeni grafiğe akar |
| 11 | 0:47.5 | 2.5 | report | premium | ring-arrange | collapse-carry | power2.inOut | orbit-ccw | navy+blue+grey | rapor halkasının çevresinde orbit | report-ring | | swell | Bütün raporlar çekirdeğin çevresinde bir halkaya dizilir |
| 12 | 0:50 | 4.0 | close | premium | implosion | grid-dissolve | power4.inOut | z-in | navy+blue | yavaş push-in | motif:ai-core, agentic-payroll-logo-png | | reverse-swell | Bütün noktalar çekirdeğe akar; çekirdek Agentic Payroll logosuna (PNG) dönüşür |
| 13 | 0:54 | 4.0 | cta | warm | grid-settle | end | sine.inOut | top-down | navy+orange+blue | sabit | motif:dot-grid, headline, datassist-logo-png, cta-button, url | | soft-note | Noktalar logodan yayılıp düz marka ızgarasına yerleşir; tek turuncu nokta CTA butonuna dönüşür. Son 1 sn sabit |

## Yedi soru
1. **Ne söylüyorum, hangi tonla?** Yukarıdaki cümle. Her morfoloji değişimi okunur bir şekle varmalı: rakam, pencere, yörünge, kart, grafik, logo. Anlamsız "AI tozu" yok (035'in uyarısı).
2. **Bir şey tekrar ediyor mu?** Denetim temiz. Ölçek sıçramaları bilinçli bir dil: üç kez ve her biri farklı yöne (içe, dışa, çekirdeğe).
3. **Her geçiş ne anlatıyor?**
   - %45 → soru, **orbit swirl**: noktalar kameranın dönüşüyle girdaba dönüşür.
   - soru → sohbet, **powers-of-ten zoom**: tek bir çalışan kaydının içine girmek.
   - yazma → gönder, **dot-pulse handoff**: soru, nokta nokta ızgaraya yayılır.
   - gönder → düşünme, **dither / pixel sort**: pencere noktalara çözülür. AI'ın "düşünmesi" için atlastaki doğru yer.
   - düşünme → bulgular, **sonar iris**: tarama halkası daralıp üç kıvılcımda durur.
   - bulgular → Excel, **ember carry**: kırmızı kıvılcım gözü yazma kutusuna taşır.
   - Excel → PDKS, **zoom-out constellation**: tek pencereden bütün entegrasyon göğüne.
   - tamamlandı → rapor, **constellation morph match**: takımyıldız çizgileri grafiğin eksenleri olur.
   - rapor → hızlı raporlar, **beat-freeze morph**: her vuruşta iki kare donma, müziğe kilitli.
   - hızlı raporlar → galeri, **orbit ring**: raporlar çekirdeğin yörüngesinde.
   - galeri → kapanış, **collapse carry**: her şey yıldıza döner.
   - kapanış → CTA, **grid dissolve**: logo sakin marka ızgarasına açılır.
4. **Renkler zamanla ne yapıyor?** Bütün film mavi-lacivert bir gece. Kırmızı tek bir kıvılcım, yeşil bir nehir, turuncu iki kez: bir dalga ve tek bir nokta (CTA).
5. **Daha önce hiç yapmadığım bileşen hangisi?** **Nokta sayımı** (Kare 3–4).
6. **Sürpriz nerede?** 6 sn: noktanın içinden pencere çıkar. 20 sn: yörüngenin donması. 33 sn: galaksi ölçeği. 43,5 sn: tempo.
7. **Son filmimi tekrar ediyor mu?** Geçmiş kaydı yok; ilk film.

## Kareler

### Kare 1 · Hook: %45 (0–6 sn)
- **Ana görsel:** Zeminde sakin marka ızgarası (6 px nokta, 30 px aralık). Noktalar havalanıp derinlik katmanlarıyla dev bir "%45"e toplanır; yakındaki noktalar yumuşak bokeh diskleri olur. Arkada 7×5 noktalık ay ızgaraları sıkışır.
- **Ekrandaki metin:** "Bordro dönem kapanışınızı %45 hızlandıracak" → "Agentic Payroll ile tanıştınız mı?"
- **Kamera:** Yavaş orbit, sonra "4"ün tek bir noktasına logaritmik zoom.

### Kare 2 · Soru sor (6–14 sn)
- **Ana görsel:** Noktanın içinde, ince nokta dokulu cam bir sohbet penceresi. Üst bar: Agentic Payroll + "AI Destekli" + yıldız gibi parlayan küçük çekirdek.
- **Ekrandaki metin:** "Eylül ayı döneminde eksik puantaj bilgisi var mı?"
- **Etkileşim:** Gönder, turuncu noktalardan bir halkanın ızgarada yayılması.

### Kare 3 · Düşünüyor (14–20 sn)
- **Yeni bileşen: Nokta sayımı.** Markanın nokta ızgarası canlı bir sayıma dönüşür: 312 nokta = 312 çalışan. Noktalar üç yörüngeye dizilir (çalışanlar, puantaj satırları, mevzuat belgeleri). Sonar halkası geçtikçe her nokta bir an parlar ve "cevap verir".
  - Hareket imzası: tarama geçtikten sonra 1 → 0,35 opaklık sönümü. Cevap vermeyen nokta sönmez, kırmızı kalır ve iki kez nabız atar.
- **Ekrandaki metin:** Üç durum etiketi sırayla.

### Kare 4 · Bulgular, kanıt anı (20–28 sn)
- **Ana görsel:** Yörünge 0,4 sn donar. Tek kırmızı nokta yukarı süzülür ve cam bir karta açılır; nokta kartın durum noktası olur. İki mavi halkalı nokta da onay bekleyen ve bilgi kartlarına açılır. Kartlar katman katman durur.
- **Ekrandaki metin:** Üç bulgu kartı ve "İncele".

### Kare 5 · Puantajı tamamla (28–38 sn)
- **5A:** "Çalışanların puantaj bilgilerini gir." .xlsx dosyası kadraja girer, hücreleri noktalara ayrışıp nehir gibi kartlara akar. Kırmızı nokta yeşile döner.
- **5B:** Logaritmik zoom-out. Pencere, genel PDKS ikonlarından (turnike, kart okuyucu, bulut) oluşan takımyıldızların ortasında bir yıldız olur, nokta kuyrukları içeri akar. Metin → yeşil hap.

### Kare 6 · Rapor üret (38–50 sn)
- **Ana görsel:** Takımyıldız çizgileri eksenlere dönüşür, noktalar isotype gibi istiflenmiş 3D nokta-sütunlar olur. Yanında ₺ özet tablosu ve departman kartı.
- **Hızlanan bölüm:** Her vuruşta 2 kare donma, ardından yeni grafik: fazla mesai (sütunlar), SGK 6 ay (nokta çizgisi), kıdem tazminatı (yığın alan). Sonda bütün raporlar çekirdeğin çevresinde bir halkada.

### Kare 7 · Kapanış ve CTA (50–58 sn)
- **Ana görsel:** Bütün noktalar çekirdeğe akar (implosion). Çekirdek Agentic Payroll logosuna (PNG) dönüşür. Noktalar yeniden yayılıp sakin, düz ızgaraya oturur; içlerinden tek turuncu nokta CTA butonuna dönüşür.
- **Ekrandaki metin:** slogan, Datassist logosu + satırı, "Ücretsiz Demo Talep Edin →", datassist.com.tr. Son 1 sn sabit.
