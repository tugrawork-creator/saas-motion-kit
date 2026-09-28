---
workflow: general-video        # URL yakalama yok: sohbet arayüzü brief'e göre tasarlanacak (hayali bileşen)
flow: automation               # HyperFrames brief sözleşmesi: yön seçildi, "bu repoya göre yap" → ajan yürütür
storyboard: no                 # plan kitin 4. aşamasında onaylandı (A + D hook); taslak turu tekrarlanmaz
message: "Agentic Payroll eksikleri ve raporları saniyeler içinde önünüze getirir; son karar sizde."
destination: web-hero, LinkedIn, etkinlik ekranı
aspect: 1920x1080              # kompozisyon boyutu; 4K master: render --resolution landscape-4k
language: tr
audience: bordro uzmanları, bordro ve İK yöneticileri
length: 58s
angle: tek plan 3D cam stüdyo (A · Cam Stüdyo + D · Kapanış Tüneli hook'u)
format: 3840x2160              # master 16:9 · 1920x1080, 1080x1350, 1080x1080, 1080x1920 aynı sahnelerden
duration: 58s
audio: music                   # müzik + UI sesleri · seslendirme opsiyonel (yalnızca hook ve kapanış)
loop: false                    # stant ekranı için ayrıca döngü kesimi yapılabilir
theme: "A + D hook (seçildi), bkz. STORYBOARD.md ve storyboards/"
---

# Agentic Payroll — "Sağ kol" tanıtım filmi

**Tek mesaj:** Agentic Payroll eksikleri ve raporları saniyeler içinde önünüze getirir; son karar sizde.

**Amaç:** Farkındalık + demo talebi. İzleyici "bordro kapanışında bana zaman kazandıracak bir asistan var" düşüncesiyle ayrılmalı.

**Hedef kitle ve kanal**
- Ana izleyici: bordroyu her ay kapatan bordro uzmanları, bordro/İK yöneticileri. İkincil: bütçeyi onaylayan İK direktörleri ve finans yöneticileri.
- Kanallar: LinkedIn (organik + reklam), datassist.com.tr ürün sayfası hero alanı, etkinlik/stant ekranları, satış sunumları.
- Ses: LinkedIn'de çoğu kişi sessiz izler. Film **sesi kapalıyken de eksiksiz anlaşılmalı**; ses yalnızca zenginleştirir.

**Duygu ve ton:** "Ay sonu stresi" → "her şey kontrol altında". Startup hızında ve cesur, ama 25+ yıllık bordro uzmanlığının güvenini taşıyan; kararlı ve net, asla agresif ya da küçümseyici değil. Teknoloji öncüsü, sakin, premium.

**Doğruluk kaynağı:** Bu brief (Datassist müşteri dokümanı) ve datassist.com.tr ürün sayfası. Ekrandaki bütün isimler, rakamlar ve ofis bilgileri **kurgusaldır**; gerçek müşteri ya da çalışan verisi kullanılmaz.
> ⚠ datassist.com.tr bu çalışma ortamından erişime kapalı, bu yüzden "%45" iddiası kaynaktan doğrulanamadı. Yayından önce belgelenmiş bir kaynağı olmalı (bkz. Açık maddeler 1).

**Kanıt anı:** Sahne 4, Bulgular. Yapay zekâ eksik puantajı, onay bekleyen fazla mesaiyi ve mevzuattan etkilenen çalışanları bulur, kartlar hâlinde uzmanın önüne koyar. Her kartta "İncele" var, karar uzmanda.

## Senaryo (bütün yönlerde ortak)

| # | Sahne | Süre | Ekrandaki metin (değişmez) |
|---|---|---|---|
| 1 | Hook: %45 | 0–6 sn | "Bordro dönem kapanışınızı %45 hızlandıracak" → "Agentic Payroll ile tanıştınız mı?" |
| 2 | Soru sor | 6–14 sn | Prompt: "Eylül ayı döneminde eksik puantaj bilgisi var mı?" (alternatif: "Eylül ayında değişen mevzuatlardan etkilenen personel var mı?") |
| 3 | Düşünüyor | 14–20 sn | "312 çalışan taranıyor…" → "Puantaj kayıtları kontrol ediliyor…" → "Eylül mevzuat değişiklikleri eşleştiriliyor…" |
| 4 | Bulgular | 20–28 sn | "İstanbul ofisi · Marketing — Ahmet Yılmaz: 3 günlük puantaj kaydı eksik" · "Ankara ofisi · Finans — 2 çalışanın fazla mesai kaydı onay bekliyor" · "Eylül mevzuat güncellemesinden etkilenen 14 çalışan tespit edildi" · buton: "İncele" |
| 5 | Puantajı tamamla | 28–38 sn | 5A: "Çalışanların puantaj bilgilerini gir." · 5B: "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin." → "Puantaj tamamlandı · Bordro uzmanı onayına hazır" |
| 6 | Rapor üret | 38–50 sn | "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla." → "Departman bazında fazla mesai maliyetini göster." · "Son 6 ayın SGK prim karşılaştırmasını çıkar." · "Şirket geneli kıdem tazminatı yükümlülük özetini hazırla." |
| 7 | Kapanış ve CTA | 50–58 sn | "Bordronun kontrolü sizde, hız Agentic Payroll'da." · Datassist logosu + "Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri" · "Ücretsiz Demo Talep Edin →" + datassist.com.tr |

## Bileşenler (temiz ya da hayali)

Sohbet arayüzü brief gereği Agentic Payroll'a özel tasarlanacak; gerçek ekran yakalanmayacak. Bu yüzden arayüz bileşenlerinin hepsi **hayali**: ürünün gerçekten yaptığı işi sade biçimde gösteren bileşenler.

| Bileşen | Gerçek / hayali | Not |
|---|---|---|
| Sohbet penceresi (üst bar: Agentic Payroll + "AI Destekli" hap rozeti, mesaj alanı, yazma kutusu, gönder) | hayali | ChatGPT/Claude'un kopyası değil; üçüncü taraf öğe yok |
| AI çekirdeği (nefes alan mavi küre / ışık halkası) | hayali | robot, beyin, kod yağmuru yok |
| Durum etiketleri (tarama adımları) | hayali | ilerleme çubuğu yok (kit kuralı) |
| Bulgu kartları + "İncele" | hayali | yalnızca eksik kayıt kırmızı noktalı; onay bekleyen ve bilgi kartları mavi |
| Tablo dosyası (.xlsx) | hayali | genel tablo ikonu; Microsoft Excel logosu yok |
| PDKS cihazları ve sistemleri | hayali | genel ikonlar; firma logosu yalnızca yazılı izinle |
| Rapor çıktıları (3D bar grafik, ₺ özet tablo, departman kartı, 3 hızlı rapor) | hayali | rakamlar temsili |
| Agentic Payroll logosu, Datassist logosu | **gerçek** | yalnızca orijinal PNG; asla yeniden çizilmez |

## Marka

- **Logolar:** `assets/brand/` klasörüne konacak (henüz yok, bkz. Açık maddeler 2). Datassist logosu koyu zeminde beyaz sürüm.
- **Renkler:** sahne zemini #0A0E1A → #111827 · Datassist mavisi #1C5FD4 (ışık, AI çekirdeği, ana vurgu) · turuncu #E8500A (CTA ve kritik vurgu) · yeşil #10B981 (tamamlandı) · kırmızı #EF4444 (yalnızca eksik/hata, az) · metin #D1D5DB–#E5E7EB.
- **Yazı:** Inter (değişken, `latin` + `latin-ext` alt kümeleri yerel olarak paketli). Alternatif: Geist. Başlıklar Bold/Black, arayüz Regular/Medium.
- **Türkçe:** ç, ğ, ı, İ, ö, ş, ü kırpılmadan görünmeli. Büyük harfli metin elle büyük yazılır; CSS `text-transform: uppercase` kullanılmaz (i/İ bozulur).

## Yapılacaklar / yapılmayacaklar

- **En kritik kural:** Yapay zekâ bordro **hesaplamaz**. "AI bordronuzu hesapladı / yönetti" anlamına gelen metin ya da görsel yok; hesap makinesi, "hesaplanıyor…" gibi ifadeler yok. AI eksikleri ve riskleri bulur, veriyi hazırlar, rapor üretir; kontrol ve son karar uzmanda. Bulgu ve puantaj sahnelerinde "uzman onayına hazır" vurgusu korunur.
- İnsansı robot, beyin ikonu, kod yağmuru, jenerik stok "AI" görselleri yok.
- Excel'i aşağılayan ya da korkuya dayanan anlatım yok.
- Kit kuralları: ilerleme çubuğu yok, gradyan yazı yok, saf #000/#fff yok, arayüzde bounce/elastic ease yok; az kelime.
- Kamera: tek kesintisiz plan hissi; yavaş dolly, orbit, dalış. Hız yalnızca %45 ve rapor sahnelerinde kontrollü olarak artar.
- Opsiyonel: ekranın köşesinde küçük bir "Görseldeki veriler temsilidir." notu.
- Türkçe metinler yayından önce imla ve karakter kontrolünden geçer.

## Teslimatlar

| Sürüm | Oran | Çözünürlük | Süre | Kullanım |
|---|---|---|---|---|
| Master | 16:9 | 3840×2160 (+1920×1080) | 55–60 sn | web sitesi, etkinlik, YouTube |
| Akış | 4:5 | 1080×1350 | 30 sn | LinkedIn akışı |
| Kare | 1:1 | 1080×1080 | 30 sn | LinkedIn reklam |
| Dikey | 9:16 | 1080×1920 | 15 sn | Reels / Shorts / Story |

- 60 fps render, 30 fps teslim. MP4 (H.264, yüksek bit hızı) + ProRes master.
- Altyazılı/altyazısız ve müzikli/müziksiz sürümler.
- Ek: ses stem'leri, 3 styleframe, 1 kapak görseli.
- Süreç: styleframe'ler → animatik (storyboard + geçici ses) → ara render onayı → final render; her aşamada bir revizyon turu. Teslim tarihi netleşecek.

**Bu kitle üretilebilirlik notları**
- Kaynak proje HyperFrames kompozisyonu olur (HTML + GSAP + Three.js). Blender, Cinema 4D ya da After Effects proje dosyası **üretilmez**. Bu dosyalar şartsa, 3D sahneler o araçlarda ayrıca kurulmalı.
- ProRes master, 4K render'dan ffmpeg ile (`prores_ks`) çıkarılabilir. Altyazılı/altyazısız, müzikli/müziksiz sürümler, stem'ler, styleframe'ler ve kapak görseli bu akışta üretilebilir.
- Dikey ve kare kesimler aynı sahnelerden **yeniden kadrajlanır**: her yön için metin ve arayüz güvenli alanda kalacak şekilde ayrı kompozisyon ayarı gerekir.

## Açık maddeler (karar ya da dosya gerekiyor)

1. **"%45" iddiasının kaynağı.** Belgelenmiş bir kaynak (müşteri ortalaması, vaka çalışması, iç ölçüm) ve gerekirse ekranda küçük bir dipnot. Kaynak yoksa hook rakamsız kurulur.
2. **Logo dosyaları.** Agentic Payroll logosu (şeffaf PNG, 4K için en az 2000 px; varsa SVG/PDF) ve Datassist logosunun beyaz sürümü → `assets/brand/`.
3. **Müzik.** Lisanslı parça (100–110 BPM) ya da kütüphane seçimi. Kitteki MusicGen CC-BY-NC lisanslıdır; ticari işte kullanılamaz.
4. **Seslendirme.** Kullanılacak mı? Kullanılacaksa kadın mı erkek mi, metin yalnızca hook ve kapanış mı?
5. **Yön seçimi.** `storyboards/` altındaki A–E yönlerinden biri (ya da iki yönün karışımı).
