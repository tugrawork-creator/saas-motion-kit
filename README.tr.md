# saas-motion-kit (Türkçe)

**Yazılım ürünleri için tanıtım ve motion videolarını [HyperFrames](https://github.com/heygen-com/hyperframes) ve Claude Code ile üretme kiti.**

Kit üç şeyden oluşuyor: aşamalı bir süreç, bir bileşen stratejisi ve **100 görsel tema**. Amaç, "bir lansman videosuna ihtiyacımız var" noktasından render alınmış bir MP4'e, sonuç yapay zekâ işi gibi görünmeden ulaşmak.

[English README →](README.md) · [Tema galerisi (100 tema) →](https://tugrawork-creator.github.io/saas-motion-kit/) · [Örnek proje →](examples/acme-suite-loop)

> Bu repodaki bütün örneklerde **Acme** adında hayali bir şirket ve onun hayali ürünleri kullanılıyor. Gösterilen tüm rakamlar uydurmadır.

## İçinde neler var

| Klasör | Açıklama |
|---|---|
| `playbook/` | Her aşamanın sonunda bir karar kapısı olan 7 aşamalı üretim rehberi |
| `components/` | **Temiz ya da hayali bileşen** kuralı: ürünün arayüzü temizse gerçeğini canlandır, değilse hayali bileşen tasarla |
| `docs/` | Tema galerisi (GitHub Pages). **100 tema** var; her birinde 4 anahtar kare, bileşen kiti, hareket notları ve referanslar bulunuyor |
| `examples/acme-suite-loop/` | Eksiksiz bir HyperFrames projesi: stant ekranı için sessiz, kesintisiz dönen 40 saniyelik 3D döngü |
| `.claude/skills/saas-motion-video/` | Bütün süreci sizinle birlikte yürüten Claude Code skill'i |
| `templates/` | BRIEF, STORYBOARD ve tema sayfası şablonları |
| `tools/` | Teslim (4K → 1080p/2K), döngü birleşim kontrolü, sıcak arayüz efekt sesi üretici, galeri araçları |

## Süreç: 7 aşama, 7 kapı

1. **Brief:** tek mesaj, format, süre, ses kararı.
2. **Bileşenler:** ürünün arayüzü temiz mi? Temizse yakala ve canlandır, değilse hayali bileşen tasarla.
3. **Tema:** galeriden 2–3 tema seçip birini onaylayın.
4. **Storyboard:** Kanca → Tanıtım → Kanıt anı → Çağrı akışını karelerle kurun.
5. **Build:** HyperFrames kompozisyonu, seek-safe animasyon.
6. **Ses:** müzik, efekt sesi ya da bilinçli bir sessizlik.
7. **Teslim:** 4K render, ardından Lanczos ile küçültme; ses normalizasyonu ve döngü kontrolü.

Her aşama bir **insan kararıyla** biter. Üretimi ajan yapar, zevk kararlarını kapılarda siz verirsiniz. Videoyu "insan yapmış" hissettiren bu iş bölümüdür.

## Temiz bileşen ya da hayali bileşen

- **Ürünün arayüzü temizse** (tutarlı, sade, güncel): arayüzü yakalayın ve gerçek bileşenleri canlandırın. Ekran görüntüsü yapıştırmayın; kartları ve tabloları tasarım token'larıyla HTML olarak yeniden kurun.
- **Temiz değilse** (eski ekranlar, kalabalık yönetim panelleri, henüz tasarlanmamış ürün): **hayali bileşenler** tasarlayın. Bunlar ürünün gerçekten ne yaptığını anlatan, sadeleştirilmiş arayüz parçalarıdır.
- **Asla** olmayan bir özelliği, sahte rakamı ya da uydurma müşteriyi göstermeyin.

## 100 tema, tek hikâye

Aynı 45 saniyelik hikâye 10 ailede 100 farklı görsel dille çizildi. Hikâye hayali **Acme Pulse** ürünü üzerine: metrikleri arka planda izleyen, anomaliyi müşteri fark etmeden yakalayan ve kararı insana bırakan bir yapay zekâ. Galeriden beğendiğiniz temaları seçip numaralarını brief'inize yazmanız yeterli.

## Hızlı başlangıç

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

Kod ve dokümanlar MIT lisanslıdır; fontlar SIL OFL 1.1 ile dağıtılır. Acme ve ürünleri hayalidir.
