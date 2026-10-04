# saas-motion-kit (Türkçe)

**Yazılım ürünleri için tanıtım ve motion videolarını [HyperFrames](https://github.com/heygen-com/hyperframes) ve Claude Code ile üretme kiti.**

Kit üç şeyden oluşuyor: aşamalı bir süreç, bir bileşen stratejisi ve **101 görsel tema**. Amaç, "bir lansman videosuna ihtiyacımız var" noktasından render alınmış bir MP4'e, sonuç yapay zekâ işi gibi görünmeden ulaşmak.

[English README →](README.md) · [Tema galerisi →](https://tugrawork-creator.github.io/saas-motion-kit/) · [Geçiş atlası →](https://tugrawork-creator.github.io/saas-motion-kit/transitions/) · [Yaratıcı kas →](creative) · [Altı film →](examples/six-films) · [Örnek proje →](examples/acme-suite-loop)

> Bu repodaki bütün örneklerde **Acme** adında hayali bir şirket ve onun hayali ürünleri kullanılıyor; Acme ile ilgili tüm rakamlar uydurmadır. Tek istisna, açıkça etiketlenmiş [spec film](examples/spec-apple-tv-tr): gerçek bir lansmanı anlatıyor ve yalnızca kaynağı belli bilgileri söylüyor.

> **Tek kural: hiçbir video bir öncekinin kopyası gibi hissettirmemeli.** Efektleri, geçişleri ve bileşenleri tekrar etmeyin. Her videoda yeni bir bileşen icat edin. Tek bir efekt seçmeden önce mesajı ve tonu belirleyin.

**Yeni: [gerçek bir prompt ile başlayın](examples/prompts).** Bitmiş, 35 saniyelik maskotlu bir tanıtım videosunu üreten prompt'un kendisi, doldurulabilir şablonu ve her kapıda neler olduğu.

## v1.3'te neler yeni: donanım reklamları, yazılım için

![Apple TV artık Türkiye'de: resmî olmayan konsept filmden dört anahtar kare](docs/spec-apple-tv-tr.jpg)

- **Yeni tema ailesi: donanım reklamı dili (hardware-ad grammar).** Apple'ın ünlendirdiği sade donanım reklamlarının dilini yazılım filmlerine çeviriyor. İlk tema **[101 Noise Cancelling](https://tugrawork-creator.github.io/saas-motion-kit/themes/101-noise-cancelling.html)**: 38 dashboard ince dalga çizgileri hâlinde uğulduyor, ürün çevresinde sessiz bir alan açıyor ve sessizliği yalnızca tek bir sinyal bozuyor. Film tek bir ses tasarımı anına dayanıyor: drop'ta tam sessizliğe kesme.
- **[Gerçek bir lansman üzerine spec film](examples/spec-apple-tv-tr).** Apple TV, Eylül 2026'da Türkiye'de resmî olarak açıldı. Bu lansmanı 101'in diliyle, oturma odasına göre yeniden tasarlayarak anlattık: 24 sn, 16:9, Türkçe metinler, bir scriptle sentezlenen müzik (lisans gerekmiyor) ve yeni bir bileşen, *play çizgisi*. Resmî olmayan bir konsept çalışma; her karede etiketli ve Apple ile bağlantılı değil. Repoda gerçek bir ürünün adını taşıyan tek örnek bu ve yalnızca [brief](examples/spec-apple-tv-tr/BRIEF.md)'inde kaynağı verilen bilgileri söylüyor. Film [v1.3 release](https://github.com/tugrawork-creator/saas-motion-kit/releases/tag/v1.3) sayfasında.
- **Küçük düzeltmeler:** galeri artık tema sayısını "100" diye sabit yazmıyor, kendisi sayıyor. `tools/make_thumbs.py --only 101` de yalnızca değiştirdiğiniz temanın küçük resmini üretiyor.

<details>
<summary><b>v1.2'de neler yeniydi: aynı hikâye, altı film</b></summary>

![Aynı 12 saniyelik senaryo altı temada, altısı birlikte oynuyor](docs/six-films.gif)

- **[Aynı hikâye, altı film](examples/six-films).** Tek bir 12 saniyelik Acme Pulse senaryosu, galeriden altı tema ve hikâye dışında hiçbir şeyi ortak olmayan altı film. Her storyboard tekrar denetiminden geçti, her film kendi bileşenini icat etti: nota çizgisine yazılmış metrik (⌘K Keyboard Symphony), geri alan oklava (Clay Studio), canlı çizen kalem sismografı (Hand-Drawn Marker), sahne ışığı işareti (Dark Keynote), P1 oyun kolu (8-Bit Sidekick) ve yarım ton grafik (Pop-Art Ben-Day). Ortak [brief](examples/six-films/BRIEF.md) de klasörde; yedinci bir tema numarasıyla ajanınıza verebilirsiniz. Filmler [v1.2 release](https://github.com/tugrawork-creator/saas-motion-kit/releases/tag/v1.2) sayfasında.
- **`tools/pick_themes.py`** ton ve hedef kitleye göre galeriden tema önerir, son beş videonuzda kullandığınız temaları atlar:
  ```bash
  python tools/pick_themes.py --tone playful --audience "developers" --history ~/.motion-ledger.json
  ```
- **`tools/history_report.py`** video geçmişinizi tek sayfalık bir rapora çevirir: sürekli başvurduğunuz geçiş, giriş ve ease'ler ile hiç denemediğiniz atlas geçişleri ve temalar. `variety_audit.py --append` artık `--theme NNN` de alıyor, böylece geçmiş hangi videoda hangi temanın kullanıldığını biliyor.
- **GitHub Action** ([`variety-audit.yml`](.github/workflows/variety-audit.yml)) her push ve pull request'te bütün `STORYBOARD.md` dosyalarını denetler. Kendini tekrar eden bir storyboard kontrolden geçemez.
- **Şablon repo.** GitHub'da **Use this template** ile araçları, yaratıcı kuralları ve denetim Action'ı hazır kendi video reponuzu başlatabilirsiniz.
- **Önce ve sonra, yan yana:** Acme Suite döngüsünün v1 ve v2 hâlleri [v1.2 release](https://github.com/tugrawork-creator/saas-motion-kit/releases/tag/v1.2) sayfasında yan yana oynuyor.

</details>

<details>
<summary><b>v1.1'de neler yeniydi: yaratıcı kas</b></summary>

- **[`creative/`](creative)** artık kitin kalbi. İçinde her storyboard'da sorulacak 7 soru, "şu mesajı şu tonda vermek istiyorum" diyen [ton matrisi](creative/tone-matrix.md), [tekrar kuralları](creative/variety-rules.md) ve 15 dakikada yeni bileşen icat etmek için [bileşen atölyesi](creative/component-forge.md) var.
- **[Geçiş atlası](https://tugrawork-creator.github.io/saas-motion-kit/transitions/):** 24 anlatımsal geçiş, her biri canlı demolu: match cut, nesne ya da kelime taşıma, kamera hareketleri, maskeler, malzeme ve zaman geçişleri.
- **`tools/variety_audit.py`:** storyboard defterindeki tekrarları yakalar. Aynı geçiş, giriş, ease ya da yön; eşit çekim süreleri; eksik sürpriz; vurgu renginin aşırı kullanımı; ton uyuşmazlığı ve eksik yeni bileşen. `--history` ile önceki videolarınızı hatırlar.
- **Acme örneği bir ders olarak yeniden kuruldu.** Aracı kendi ilk taslağımızda çalıştırdık ve **11 tekrar** yakaladı: aynı dönüş 5 kez, aynı başlık girişi, her yerde aynı ease, eşit süreler, hiç sürpriz yok. v2'de her ürünün kendi girişi var (bulanıktan harf harf, maske silme, sahneler arası taşınan kelime, yukarıdan düşme). Dönüşler farklılaştı (hareket bulanıklıklı kamçı, yavaş sinüs), süreler eşit değil. Forecast'te ekranın teal renge boğulduğu, kameranın yaklaştığı bir sürpriz var. Önce/sonra [`examples/acme-suite-loop`](examples/acme-suite-loop) klasöründe, yeni video [v1.1 release](https://github.com/tugrawork-creator/saas-motion-kit/releases/tag/v1.1) sayfasında.
- Storyboard şablonu artık **"Mesaj ve ton"** cümlesi ve sahne başına bir satırlık **hareket defteri** ile başlıyor. `/saas-motion-video` skill'i de build'den önce bir **yaratıcı kontrol** kapısı çalıştırıyor.

</details>

## İçinde neler var

| Klasör | Açıklama |
|---|---|
| `creative/` | **Yaratıcı kas:** 7 soru, ton matrisi, tekrar kuralları, bileşen atölyesi, geçiş atlası |
| `playbook/` | Her aşamanın sonunda bir karar kapısı olan 7 aşamalı üretim rehberi |
| `components/` | **Temiz ya da hayali bileşen** kuralı: ürünün arayüzü temizse gerçeğini canlandır, değilse hayali bileşen tasarla |
| `docs/` | Tema galerisi (GitHub Pages). **101 tema** var; her birinde 4 anahtar kare, bileşen kiti, hareket notları ve referanslar bulunuyor |
| `examples/six-films/` | **Aynı hikâye, altı film:** tek bir 12 sn'lik senaryonun altı temadaki hâli; her birinin storyboard'u, hareket defteri ve yeni bileşeni, ayrıca ortak brief |
| `examples/spec-apple-tv-tr/` | **Spec film:** Apple TV'nin Türkiye lansmanı, 101 temasının diliyle; 16:9, sentezlenmiş müzik (resmî olmayan konsept, her karede etiketli) |
| `examples/acme-suite-loop/` | Eksiksiz bir HyperFrames projesi: stant ekranı için sessiz, kesintisiz dönen 40 saniyelik 3D döngü |
| `.claude/skills/saas-motion-video/` | Bütün süreci sizinle birlikte yürüten Claude Code skill'i |
| `templates/` | BRIEF, STORYBOARD ve tema sayfası şablonları |
| `examples/prompts/` | Bitmiş videoları üreten gerçek prompt'lar ve şablonları |
| `tools/` | **Tekrar denetimi**, tema seçici, geçmiş raporu, teslim (4K → 1080p/2K), döngü birleşim kontrolü, sıcak arayüz efekt sesi üretici, galeri araçları |
| `.github/workflows/` | GitHub Action olarak tekrar denetimi: her push ve pull request'te bütün storyboard'lar kontrol edilir |

## Süreç: 7 aşama, 7 kapı

1. **Brief:** tek mesaj, format, süre, ses kararı.
2. **Bileşenler:** ürünün arayüzü temiz mi? Temizse yakala ve canlandır, değilse hayali bileşen tasarla.
3. **Tema:** galeriden 2–3 tema seçip birini onaylayın.
4. **Storyboard:** Kanca → Tanıtım → Kanıt anı → Çağrı akışını karelerle kurun. **Yaratıcı kontrol** bu aşamada zorunlu: mesaj ve ton cümlesini yazın, hareket defterini doldurun ve `python tools/variety_audit.py STORYBOARD.md` çalıştırın.
5. **Build:** HyperFrames kompozisyonu, seek-safe animasyon.
6. **Ses:** müzik, efekt sesi ya da bilinçli bir sessizlik.
7. **Teslim:** 4K render, ardından Lanczos ile küçültme; ses normalizasyonu ve döngü kontrolü.

Her aşama bir **insan kararıyla** biter. Üretimi ajan yapar, zevk kararlarını kapılarda siz verirsiniz. Videoyu "insan yapmış" hissettiren bu iş bölümüdür.

## Temiz bileşen ya da hayali bileşen

- **Ürünün arayüzü temizse** (tutarlı, sade, güncel): arayüzü yakalayın ve gerçek bileşenleri canlandırın. Ekran görüntüsü yapıştırmayın; kartları ve tabloları tasarım token'larıyla HTML olarak yeniden kurun.
- **Temiz değilse** (eski ekranlar, kalabalık yönetim panelleri, henüz tasarlanmamış ürün): **hayali bileşenler** tasarlayın. Bunlar ürünün gerçekten ne yaptığını anlatan, sadeleştirilmiş arayüz parçalarıdır.
- **Asla** olmayan bir özelliği, sahte rakamı ya da uydurma müşteriyi göstermeyin.

## 101 tema, tek hikâye

Aynı 45 saniyelik hikâye 11 ailede 101 farklı görsel dille çizildi. Hikâye hayali **Acme Pulse** ürünü üzerine: metrikleri arka planda izleyen, anomaliyi müşteri fark etmeden yakalayan ve kararı insana bırakan bir yapay zekâ. Galeriden beğendiğiniz temaları seçip numaralarını brief'inize yazmanız yeterli.

## Hızlı başlangıç

GitHub'da **Use this template** ile denetim Action'ı hazır kendi reponuzu açabilir ya da kiti klonlayabilirsiniz:

```bash
git clone https://github.com/tugrawork-creator/saas-motion-kit && cd saas-motion-kit
npx skills add heygen-com/hyperframes
cd examples/acme-suite-loop && npx hyperframes preview
```

Ardından repo kökünde Claude Code'u açın ve şunu yazın:

```
/saas-motion-video  https://urununuz.com için 45 sn'lik LinkedIn tanıtımı yapalım. Tema 055 (Bento Grid), müzikli, seslendirmesiz.
```

## Deneyimden çıkan dersler

- **4K render alın, küçülterek teslim edin.** Doğrudan 1080p render'a göre çok daha temiz sonuç verir.
- **Türkçe karakterler:** fontların `latin-ext` alt kümelerini yerel olarak ekleyin, yoksa ş, ğ ve İ harfleri bozulur.
- **Büyük harf:** CSS `uppercase` Türkçede "i" harfini "İ" yapar. Bu yüzden büyük harfli metni doğrudan büyük harfle yazın ve İngilizce kelimelere `lang="en"` ekleyin.
- **Döngüler:** her ortam hareketi, döngü süresine tam sayıda tur sığacak şekilde periyodik olmalı. Birleşim noktasını `tools/loop_check.py` ile doğrulayın.
- **Ses:** saf sinüs efektleri ürkütücü duyulur; marimba ya da tahta blok gibi sıcak tınılar kullanın.
- **Az yazı:** izleyici hikâyeyi okumadan anlamalı. İlerleme çubuğu da kullanmayın.
- **MusicGen:** modelin ağırlıkları ticari olmayan kullanım lisanslıdır (CC-BY-NC). Ticari işlerde lisanslı müzik kullanın.

## Lisans

Kod ve dokümanlar MIT lisanslıdır; fontlar SIL OFL 1.1 ile dağıtılır. Acme ve ürünleri hayalidir. Apple TV, iCloud+, iPhone, iPad, Mac ve Apple TV 4K, Apple Inc.'in ticari markalarıdır; [spec film](examples/spec-apple-tv-tr) resmî olmayan bir konsept çalışmadır ve Apple ile bağlantılı ya da Apple tarafından onaylı değildir.
