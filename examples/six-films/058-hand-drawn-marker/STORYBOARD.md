# Storyboard — Acme Pulse · Hand-Drawn Marker

Theme: 058 Hand-Drawn Marker · Format: 1080×1080 · Length: 12 s · Sound: none (silent)

## Message & tone
- **Sentence:** I want to say "Pulse catches the drop you would have missed, and you make the call" in a warm, human tone, so the viewer feels relieved that checking dashboards is no longer their job.
- **Tone arc:** urgent → urgent → bold → trustworthy → trustworthy → warm
- accent: coral
- **Motif:** the marker ring. It first appears as a messy red scribble around the one dashboard nobody checked (too late), and returns once as a clean coral double ring around −18% (caught). Same mark, same meaning ("look here"), evolved from panic to precision.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 1.5 | hook | urgent | poster-hold then marker-strike cascade | none | power1.inOut | right | paper+ink+coral | locked | dotted-paper, 38 pencil dashboards, marker strike-through, loop arrow | | none | frame 0 is the poster: "38 dashboards." over 38 pencil thumbnails; 37 strikes accelerate left→right, one tile is skipped |
| 2 | 0:01.5 | 1.2 | hook | urgent | handwrite-wipe | eraser-wipe | none | radial | paper+coral+amber | locked | punchline, highlighter smear, motif:marker-ring (messy) | | none | "One missed drop." writes in; a messy two-loop red ring circles the skipped tile |
| 3 | 0:02.7 | 1.5 | reveal | bold | ink-over-guides | paper-fold | power3.out | down | paper+teal | locked | block eraser + crumbs, pencil guides, Acme Pulse lockup | | none | surprise: a giant eraser scrubs the whole page clean in four zigzag passes, and the lockup is inked right behind it |
| 4 | 0:04.2 | 2.2 | proof | trustworthy | pencil-draw then seam | zoom-to-ring | power2.inOut | right | white+ink+teal | locked | sketch→real seam, Pulse panel, teal ticks | fineliner seismograph | none | the page turns onto a fresh page; a graphite wireframe draws and a seam walks right turning it into crisp UI; Pulse's teal pen starts sketching checkout conversion live |
| 5 | 0:06.4 | 2.6 | proof | trustworthy | ring-draw + sticky-slap | line-to-horizon | back.out(2) | in | coral+white+teal | push-in 1.06 then back | motif:marker-ring (clean double), handwritten note, sticky note + tape, cursor press | | none | the pen dips coral at 09:42, value flips to −18%, one coral double ring closes, "since 09:42" is written, the sticky slaps "Roll back? your call.", a human cursor presses Roll back and the line climbs back teal |
| 6 | 0:09.0 | 3.0 | cta | warm | line-becomes-underline + drop | end | power4.out | up | paper+teal+coral | locked | lockup, serif line, hand-drawn underline, Start free | | none | the recovered line flattens into the underline of "Pulse watches."; last 1 s holds still |

## The seven questions (answered)
1. **What and how:** the sentence above. Warm and human because the medium is a notebook: the mess is handwritten, the product is clean type.
2. **Repeats:** audited (see README). The only deliberate repeat is the marker ring (motif).
3. **Transition meaning:** *eraser-wipe* = the chores are wiped away (cause → effect: Pulse arrives). *paper-fold* (a page turn) = from promise to evidence, the next page of the notebook. *zoom-to-ring* = lean in to look at the one thing that matters. *line-to-horizon* = the recovered metric settles into the calm underline of the promise.
4. **Colour over time:** red marker only in the hook (problem). Teal arrives with the mark. The one coral colour event is the dip + ring at 6.4 s; the Roll back button turns teal when the human decides; coral returns only on "Start free".
5. **New component:** the *fineliner seismograph*: Pulse's teal pen sketches checkout conversion live inside the panel, dips coral at 09:42, climbs back after the rollback and then becomes the CTA underline.
6. **Surprise:** the giant eraser scrubbing the whole page at 2.7 s (medium break: the marker's own page is wiped).
7. **Last film:** first film in this set for this theme; no history file.

## Frames

### Frame 1 · Hook
- key visual: a wall of 38 pencil dashboards, struck through one by one in red marker; one is skipped and gets ringed
- moves first: the marker strikes, left→right, accelerating (`power1.inOut` per stroke)
- on-screen words: "38 dashboards." "One missed drop." (5 words)
- beat hook: the ring closes around the skipped tile

### Frame 2 · Reveal
- key visual: a pink block eraser scrubs the page in four passes, leaving a dot-free rubbed swath and crumbs; the Acme mark and "Acme Pulse" are inked over graphite guides behind it
- moves first: the eraser (linear), then the mark's pulse line draws itself
- on-screen words: "Acme Pulse"

### Frame 3 · Proof moment
- key visual: the Pulse panel, sketch→real; the fineliner seismograph dips at 09:42; a coral double ring around "Checkout conversion −18%"; handwritten "since 09:42"; sticky note "Roll back? your call."; a human cursor presses Roll back
- new component: fineliner seismograph
- moves first: graphite wireframe, then the seam

### Frame 4 · CTA
- key visual: Acme Pulse lockup, "You ship. *Pulse watches.*" with the teal underline that used to be the metric line, coral "Start free"
- loop note: not a loop; holds still from 10.9 s to 12 s
