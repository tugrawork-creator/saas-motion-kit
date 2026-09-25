# Security

This repository contains documentation, static HTML theme sheets, one example HyperFrames project and small local tools. It runs no servers and stores no credentials.

- Theme sheets in `docs/themes/` contain no JavaScript. The gallery (`docs/index.html`) only uses a small inline filter script, and the thumbnail helper (`docs/_thumb.html`) only loads local theme sheets.
- The example loads GSAP and Three.js from jsDelivr at pinned versions. GSAP is also checked with Subresource Integrity.
- Please report a vulnerability privately via **Security → Report a vulnerability** on GitHub, not in a public issue.
