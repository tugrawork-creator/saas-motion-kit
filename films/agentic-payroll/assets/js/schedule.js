// Shared, baked schedules. Loaded as a classic script, so the GSAP timeline (classic) and the
// 3D world (module) type the same prompts at the same seeded instants.
(function () {
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // A human-feeling typing schedule: seeded jitter per key, a small pause after each word.
  function typing(text, t0, cps, seed) {
    const r = rng(seed), at = [];
    let t = t0;
    for (const ch of text) {
      at.push(t);
      t += (1 / cps) * (0.7 + 0.6 * r()) + (ch === " " ? 0.05 : 0);
    }
    return {
      text, at, end: t,
      count(tt) { let n = 0; while (n < at.length && at[n] <= tt) n++; return n; },
    };
  }
  // Every prompt the film types, with its start time (s), speed (chars/s) and seed. The script is fixed by the brief.
  const prompts = {
    ask: typing("Eylül ayı döneminde eksik puantaj bilgisi var mı?", 7.35, 16, 7),
    enter: typing("Çalışanların puantaj bilgilerini gir.", 29.5, 28, 8),
    report: typing("Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla.", 38.4, 46, 9),
  };
  // Frame 6's surprise: the tempo doubles, three prompts on the beat
  const QUICK = [
    "Departman bazında fazla mesai maliyetini göster.",
    "Son 6 ayın SGK prim karşılaştırmasını çıkar.",
    "Şirket geneli kıdem tazminatı yükümlülük özetini hazırla.",
  ];
  const QUICK_T0 = 42.95, QUICK_STEP = 1.35, QUICK_CPS = 52;
  window.APSchedule = {
    rng, typing, prompts, QUICK,
    quick: QUICK.map((q, i) => typing(q, QUICK_T0 + i * QUICK_STEP, QUICK_CPS, 10 + i)),
  };
})();
