# Storyboard — Agentic Payroll · D · Kapanış Tüneli

Tema referansı: 093 One-Take Oner + 008 Calendar Timeline Scrub + 097 Speed Ramp + 039 Long-Exposure Light Trails · Format: 3840×2160 (16:9 master) · Süre: 58 sn · Ses: müzik + UI sesleri

> **Yönün özü:** Ay sonu kapanışı, içinden geçilen bir mekân. Kapanış dönemi buzlu cam **gün çerçevelerinden** oluşan bir tünel: her çerçevede ince, büyük bir gün numarası var, zeminde uzun pozlama ışık izleri akıyor. Film, tünelin kısalmasını gösterir: zaman kazancı soyut bir vaat değil, gözle görülen bir mimari değişim. Kamera ileri doğru yolculuk eder; hız yalnızca hook'ta ve raporlarda açılır.

## Message & tone
- **Cümle:** "Agentic Payroll kapanış dönemini kısaltır: eksikleri yolda bulur, raporları siz daha sormadan hazır eder" demek istiyorum. Bunu cesur ama kontrollü, sinematik bir tonla söylüyorum ki izleyici uzun bir koridordan ferah bir alana çıkmış gibi hafiflesin.
- **Ton yayı:** bold → premium → calm → technical → trustworthy → calm → bold → warm
- accent: orange
- **Motif:** Gün çerçeveleri (`motif:day-frames`). Hook'ta tünel, düşünürken çekirdeğin çevresinde bir saat kadranı, raporlarda galeri duvarı, kapanışta teleskop gibi iç içe geçip tek bir halkaya, logoya dönüşür.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | hook | bold | trail-streak-in | ramp-down-landing | expo.out | z-in | navy+blue | hızlı fly-through, 24 mm | motif:day-frames, light-trails, trail-numeral-45 | | bass-hit+whoosh | Kamera cam gün çerçevelerinden oluşan tünelde hızla uçar; zemindeki ışık izleri tünelin sonunda "%45"i yazar. Metin 1 |
| 2 | 0:03 | 3.0 | hook | premium | telescope-nest | portal-push-through | power3.inOut | z-out | navy+blue+grey | yavaşla, bekle, sonra push | telescoping-calendar, headline | telescoping-calendar | glass-clinks | Tünel teleskop gibi iç içe geçip kısalır, her geçişte camda ışık "tıkı" olur. "Agentic Payroll ile tanıştınız mı?"; kamera %'nin halkasından geçer |
| 3 | 0:06 | 5.0 | ask | calm | monolith-rise | keystroke-handoff | sine.inOut | bottom-up | navy+blue+grey | sabit, 50 mm, hafif push | chat-terminal-monolith, ai-badge, motif:ai-core | | keyboard-soft | Tünelin sonundaki odada sohbet terminali cam bir monolit gibi yükselir; prompt harf harf yazılır |
| 4 | 0:11 | 3.0 | ask | bold | press-flash | turntable-180 | expo.out | right-to-left | orange+navy | sabit, sonra yavaş 180° dönüş | send-button, orange-trail | | click+whoosh-long | surprise: turuncu ışık zemindeki izlerden tünelin başına koşar, kamera yavaşça 180° dönüp onu izler. Bütün kapanış dönemi soruyu duyar |
| 5 | 0:14 | 6.0 | think | technical | frames-orbit | clock-sweep-wipe | power1.inOut | orbit-cw | navy+blue | geri çekilme, 30° tepeden | motif:day-frames, motif:ai-core, scan-light, status-label | | drone-soft | Gün çerçeveleri tünelden kopar, çekirdek-halkanın çevresinde bir saat kadranı gibi döner; tarama ışığı akrep gibi ilerler. Etiketler sırayla |
| 6 | 0:20 | 8.0 | findings | trustworthy | step-out-layers | day-return-carry | power3.out | z-in | navy+blue+red | işaretli günlere push-in | day-frame, finding-card×3, red-dot, review-button | | pop-soft×3 | Tarama ışığının durduğu günlerde kartlar çerçevelerden kameraya doğru katman katman çıkar; eksik puantaj günü kırmızı noktalı |
| 7 | 0:28 | 5.0 | complete | calm | slab-fly-slot | dolly-out-exit | sine.inOut | z-in | navy+green+blue | levhanın arkasından takip | spreadsheet-slab, day-frame, red-to-green, runway-lights | | chime-sequence | surprise: .xlsx levhası tünelin içinde uçup kırmızı günlere oturur; çerçeveler pist ışıkları gibi arka arkaya yeşile döner ve kameraya doğru koşar |
| 8 | 0:33 | 5.0 | complete | trustworthy | station-rise | glass-unfold | power2.inOut | left-to-right | navy+blue+green | dolly-out, tünele dışarıdan bakış | tunnel-exterior, pdks-stations-generic, data-lines, status-pill | | hum+confirm | Kamera tünelin dışına çıkar: boşlukta yüzen cam bir zaman çizelgesi. Boyunca genel PDKS istasyonları ışık hatlarıyla besler. Metin + yeşil hap |
| 9 | 0:38 | 5.5 | report | premium | wall-panel-open | lateral-speed-ramp | power3.inOut | right-to-left | navy+blue+grey | koridora giriş, duvar boyunca truck | prompt, gallery-wall, bar-chart-3d, try-table, dept-card | | keyboard+whoosh | Tünel duvarları galeri koridoruna açılır; rapor duvardaki çerçeveden dışarı açılır |
| 10 | 0:43.5 | 4.0 | report | bold | beat-light-frames | corridor-dolly-back | expo.inOut | left-to-right | navy+blue | hızlanan yanal truck | prompt×3, report-frames×3 | | kick-hat | surprise: tempo ikiye katlanır; her vuruşta yeni prompt ve yeni rapor çerçevesi yanar |
| 11 | 0:47.5 | 2.5 | report | premium | frames-align | telescope-collapse-carry | power2.inOut | center | navy+blue+grey | tek kaçış noktasına dolly-back | report-gallery-corridor | | swell | Bütün raporlar tek kaçış noktalı bir galeri koridorunda |
| 12 | 0:50 | 4.0 | close | premium | telescope-collapse | ring-to-logo-match | power4.inOut | z-out | navy+blue | sabit, yavaş push | motif:day-frames, motif:ai-core, agentic-payroll-logo-png | | reverse-swell+clinks | Bütün koridor teleskop gibi tek bir halkaya kapanır; halka Agentic Payroll logosuna (PNG) dönüşür |
| 13 | 0:54 | 4.0 | cta | warm | lockup-fade-rise | end | sine.out | bottom-up | navy+orange+blue | sabit | headline, datassist-logo-png, cta-button, url | | soft-note | Slogan, Datassist logosu + satırı, turuncu CTA, datassist.com.tr. Son 1 sn sabit |

## Yedi soru
1. **Ne söylüyorum, hangi tonla?** Yukarıdaki cümle. Cesur olan kamera, sakin olan malzeme: ince çerçeveler, büyük ama hafif rakamlar, tek renk ışık.
2. **Bir şey tekrar ediyor mu?** Denetim temiz. Tünel hareketi motif; her dönüşünde başka bir şekle girer (tünel → kadran → galeri → halka).
3. **Her geçiş ne anlatıyor?**
   - %45 → soru, **ramp-down landing**: hız, rakamın önünde yumuşakça sıfırlanır.
   - soru → sohbet, **portal push-through**: %'nin halkası tünelin kapısı olur.
   - yazma → gönder, **keystroke handoff**: son tuş, ışığı zemine teslim eder.
   - gönder → düşünme, **turntable 180**: kamera dönüp sorunun dönem boyunca yayılışını izler.
   - düşünme → bulgular, **clock-sweep wipe**: akrep geçtiği günleri açar.
   - bulgular → Excel, **day-return carry**: kart geldiği güne geri döner.
   - Excel → PDKS, **dolly-out exit**: tünelin dışına çıkıp bütün akışı görmek.
   - tamamlandı → rapor, **glass unfold**: tünelin duvarı galeriye açılır.
   - rapor → hızlı raporlar, **lateral speed ramp**: raporlar ardı ardına.
   - hızlı raporlar → galeri, **corridor dolly-back**: bütün koridor tek bakışta.
   - galeri → kapanış, **telescope-collapse carry**: dönem tek bir halkaya kapanır.
   - kapanış → CTA, **ring-to-logo match**: halka logonun kendisi olur.
4. **Renkler zamanla ne yapıyor?** Mavi ışık izleri filmin nabzı. Turuncu yalnızca gönder'de (tünel boyunca koşan tek iz) ve CTA'da. Kırmızı tek bir gün çerçevesinde. Yeşil pist ışıkları gibi dalga olur.
5. **Daha önce hiç yapmadığım bileşen hangisi?** **Teleskop takvim** (Kare 1 ve Kare 7).
6. **Sürpriz nerede?** 11 sn: 180° dönüş. 28 sn: yeşile koşan pist ışıkları. 43,5 sn: tempo.
7. **Son filmimi tekrar ediyor mu?** Geçmiş kaydı yok; ilk film.

## Kareler

### Kare 1 · Hook: %45 (0–6 sn)
- **Ana görsel:** Tek kaçış noktalı bir tünel; buzlu cam gün çerçeveleri (25 Eylül → 5 Ekim), her birinde ince büyük gün numarası. Zeminde mavi uzun pozlama izleri tünelin sonunda "%45"i yazar.
- **Yeni bileşen: Teleskop takvim.** Kapanış dönemi iç içe geçebilen çerçevelerden oluşur. Beklemeler kalktıkça çerçeveler teleskop gibi birbirinin içine kayar ve tünel gözle görülür biçimde kısalır.
  - Hareket imzası: kademeli iç içe geçme; her geçişte çerçeve kenarında 2 karelik ışık "tıkı" ve cam tınısı.
- **Ekrandaki metin:** "Bordro dönem kapanışınızı %45 hızlandıracak" → "Agentic Payroll ile tanıştınız mı?"
- **Kamera:** Hızlı fly-through, rakamın önünde yavaşlama, %'nin halkasından geçiş.

### Kare 2 · Soru sor (6–14 sn)
- **Ana görsel:** Tünelin sonundaki odada, zeminden yükselen cam bir monolit: sohbet terminali (Agentic Payroll + "AI Destekli" + halka biçimli çekirdek).
- **Ekrandaki metin:** "Eylül ayı döneminde eksik puantaj bilgisi var mı?"
- **Etkileşim:** Gönder'e basılır. Turuncu bir ışık zemindeki izlerden tünelin başına koşar, kamera yavaşça 180° dönüp onu izler.

### Kare 3 · Düşünüyor (14–20 sn)
- **Ana görsel:** Gün çerçeveleri tünelden kopar, çekirdek-halkanın çevresinde bir saat kadranı gibi döner. Tarama ışığı akrep gibi ilerler, geçtiği günler bir an parlar.
- **Ekrandaki metin:** Üç durum etiketi sırayla.

### Kare 4 · Bulgular, kanıt anı (20–28 sn)
- **Ana görsel:** Tarama ışığının durduğu günlerde kartlar çerçeveden kameraya doğru, katman katman çıkar. Eksik puantajın olduğu gün çerçevesinin kenarı kırmızı nokta taşır; diğerleri mavi halkalı.
- **Ekrandaki metin:** Üç bulgu kartı ve "İncele".

### Kare 5 · Puantajı tamamla (28–38 sn)
- **5A:** "Çalışanların puantaj bilgilerini gir." Bir .xlsx levhası tünelin içinde uçup kırmızı günlere oturur. Çerçeveler pist ışıkları gibi arka arkaya yeşile döner ve kameraya doğru koşar.
- **5B:** Kamera tünelin dışına çıkar. Tünel, boşlukta yüzen cam bir zaman çizelgesi; boyunca genel PDKS istasyonları ışık hatlarıyla besler. Metin → yeşil hap.

### Kare 6 · Rapor üret (38–50 sn)
- **Ana görsel:** Tünel duvarları bir galeri koridoruna açılır. Prompt yazılır, rapor duvardaki çerçeveden dışarı açılır (3D bar grafik, ₺ özet tablo, departman kartı).
- **Hızlanan bölüm:** Yanal truck hızlanır; her vuruşta yeni prompt ve yeni rapor çerçevesi. Sonda tek kaçış noktalı galeri.

### Kare 7 · Kapanış ve CTA (50–58 sn)
- **Ana görsel:** Koridor teleskop gibi tek bir halkaya kapanır, halka Agentic Payroll logosuna (PNG) dönüşür.
- **Ekrandaki metin:** slogan, Datassist logosu + satırı, turuncu "Ücretsiz Demo Talep Edin →", datassist.com.tr. Son 1 sn sabit.
