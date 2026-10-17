# Knižnica animácií pre web: zadanie pre Claude Code

Tento súbor je referenčný katalóg animácií. Každá má **ID**, **anglický názov** (ako sa jej bežne hovorí), popis, kde ju použiť, ako ju implementovať a odporúčané parametre.

**Ako ho používať:** ulož súbor do koreňa projektu a v Claude Code napíš napríklad:
> „Podľa ANIMATIONS.md implementuj A3 (Split text reveal) na nadpisy H1 a H2, A7 (Sticky stacking cards) na sekciu Služby a A11 (Magnetic button) na hlavné CTA. Dodrž globálne pravidlá.“

---

## 0. Globálne pravidlá (platia pre každú animáciu)

1. **Animuj iba `transform` a `opacity`**, prípadne `clip-path`. Nie `top/left/width/height/margin`, pretože tie spôsobujú prepočítavanie layoutu a sekanie.
2. **Easing:** nikdy `linear` pre pohyb UI prvkov.
   - CSS default: `cubic-bezier(0.22, 1, 0.36, 1)` (rýchly štart, mäkký dojazd)
   - GSAP default: `power3.out` alebo `expo.out`
3. **Trvanie:**
   - mikrointerakcie (hover, klik): 150–250 ms
   - reveal prvkov pri scrolle: 600–900 ms
   - stagger (oneskorenie medzi prvkami v skupine): 60–100 ms
4. **Reveal animácie sa spustia iba raz** (`once: true`), nie pri každom scrollovaní hore a dole. Výnimkou sú scroll-linked efekty (viazané priamo na pozíciu scrollu).
5. **Prístupnosť:** pri `prefers-reduced-motion: reduce` vypni pohyb aj parallax a nechaj iba jemný fade alebo nič.
6. **Hover efekty iba pre myš:** obaľ ich do `@media (hover: hover) and (pointer: fine)`. Na mobile ich nespúšťaj.
7. **Progressive enhancement:** obsah nesmie zostať neviditeľný, ak JS zlyhá. Počiatočný skrytý stav nastav iba vtedy, keď má `<html>` triedu `.js` (pridanú skriptom).
8. **Technológie (v tomto poradí):**
   - natívne CSS: transitions, `@keyframes`, scroll-driven animations (`animation-timeline: view()/scroll()`) s fallbackom cez `@supports`, View Transitions API
   - **GSAP + ScrollTrigger** (vrátane SplitText, je zadarmo) na zložitejšie scroll efekty
   - **Lenis** na smooth scroll
   - nepridávaj ďalšie knižnice bez dôvodu
9. **Výkon:** žiadny layout shift (CLS = 0), Lighthouse performance nesmie klesnúť. Pri pinovaných sekciách použi `will-change: transform` iba počas animácie.
10. **Konzistentnosť:** jeden easing, jedna sada trvaní a jeden smer pohybu (napr. všetko prichádza zdola) naprieč celým webom. Hodnoty definuj ako CSS premenné / jeden JS config.

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 200ms;
  --dur-base: 700ms;
  --stagger: 80ms;
}
```

---

## A. Scroll a vstupné animácie

### A1. Smooth scroll (Lenis)
- **Čo to je:** scroll s jemnou zotrvačnosťou namiesto trhaného skákania kolieska myši. Základ „prémiového“ pocitu, na ktorom stoja ostatné scroll efekty.
- **Kde:** celý web.
- **Implementácia:** Lenis, `lerp: 0.1`, `smoothWheel: true`, prepojiť s GSAP ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` a `gsap.ticker`). Kotvové odkazy (#sekcia) musia scrollovať cez `lenis.scrollTo()`.
- **Pozor:** na touch zariadeniach nechaj natívny scroll. Pri reduced-motion Lenis nespúšťaj.

### A2. Fade-up stagger reveal
- **Čo to je:** prvky (karty, odstavce, ikony) sa pri vstupe do viewportu jemne vysunú zdola a objavia sa, postupne jeden po druhom.
- **Kde:** gridy kariet, zoznamy benefitov, bloky textu.
- **Parametre:** `translateY(24px)` → `0`, `opacity 0` → `1`, 700 ms, `--ease-out`, stagger 80 ms, spustenie pri 15 % viditeľnosti prvku.
- **Implementácia:** IntersectionObserver pridá triedu `.is-visible` (CSS transition), alebo GSAP ScrollTrigger `start: "top 85%"`, `once: true`.

### A3. Split text reveal (line mask reveal)
- **Čo to je:** nadpis sa rozdelí na riadky (alebo slová) a každý riadok sa „vysunie“ zospodu spoza neviditeľnej masky, ako keby vychádzal spod čiary. Najtypickejší efekt dnešných agentúrnych webov.
- **Kde:** H1 v hero sekcii, hlavné nadpisy sekcií. Nie na bežný text.
- **Parametre:** každý riadok v obale s `overflow: hidden`; vnútorný span `translateY(110%)` → `0`, 900 ms, `expo.out`, stagger 100 ms medzi riadkami.
- **Implementácia:** GSAP SplitText (`type: "lines"`, `mask: "lines"`), re-split pri resize. Pre čítačky obrazovky zachovaj pôvodný text (`aria-label` na rodičovi, rozdelené spany `aria-hidden`).

### A4. Scroll text highlight (text fill on scroll)
- **Čo to je:** dlhší výrazný odstavec (manifest, claim) je najprv sivý/polopriehľadný a ako používateľ scrolluje, slová sa postupne „rozsvecujú“ do plnej farby, akoby ich niekto čítal.
- **Kde:** jeden statement odstavec na stránke (o nás, misia). Max 1–2× na web.
- **Parametre:** slová `opacity: 0.2` → `1`, viazané na scroll (scrub), od momentu keď odstavec vstúpi do spodnej tretiny po moment keď je v hornej tretine.
- **Implementácia:** SplitText `type: "words"` + ScrollTrigger `scrub: true`, alebo CSS `animation-timeline: view()` s `animation-range: entry 20% cover 60%`.

### A5. Blur-in headline
- **Čo to je:** text sa objaví z rozmazania do ostrosti s jemným fade. Pôsobí mäkko a „tech/AI“ elegantne.
- **Kde:** podnadpisy, krátke claimy, alternatíva k A3 na menej dramatických miestach.
- **Parametre:** `filter: blur(12px)` + `opacity 0` → `blur(0)` + `opacity 1`, 800 ms, stagger po slovách 40 ms.
- **Pozor:** blur je náročnejší na výkon, nepoužívaj na veľké plochy ani veľa prvkov naraz.

### A6. Image clip-path reveal (curtain reveal)
- **Čo to je:** obrázok sa neobjaví fade-om, ale „odhalí“ ako opona: maska sa rozbalí zdola nahor (alebo zboku), zatiaľ čo samotná fotka sa jemne zmenšuje zo zoomu.
- **Kde:** veľké fotky v sekciách, galérie, referencie.
- **Parametre:** `clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)`, 1 000 ms, `--ease-in-out`; zároveň vnútorný `<img>` `scale(1.2)` → `scale(1)`, 1 400 ms.
- **Implementácia:** ScrollTrigger alebo IntersectionObserver, `once: true`.

### A7. Subtle parallax
- **Čo to je:** obrázok sa vo svojom ráme pohybuje o niečo pomalšie ako stránka, takže vzniká pocit hĺbky. Musí byť jemný, inak pôsobí lacno.
- **Kde:** veľké fotky, hero pozadie.
- **Parametre:** `<img>` vo ráme s `overflow: hidden`, obrázok o 15 % vyšší ako rám, posun `yPercent: -10` → `10` počas prechodu sekcie, `scrub: true`.
- **Pozor:** nikdy neparallaxuj text. Pri reduced-motion vypnúť.

---

## B. Scroll storytelling (pinované sekcie)

### B1. Sticky stacking cards
- **Čo to je:** karty (služby, kroky procesu) sa pri scrollovaní prilepia k hornej časti obrazovky a každá ďalšia sa nasunie na predchádzajúcu, ktorá sa jemne zmenší a stmavne. Vzniká balíček kariet.
- **Kde:** služby, proces „ako pracujeme“, 3–5 kariet.
- **Implementácia:** čisté CSS `position: sticky; top: 10vh` (každá karta o pár px nižšie, napr. `top: calc(10vh + n*20px)`); zmenšenie predchádzajúcej karty `scale(1)` → `scale(0.92)` + `brightness(0.7)` cez ScrollTrigger scrub alebo `animation-timeline: view()`.
- **Mobile:** funguje, len menší offset.

### B2. Horizontal scroll section
- **Čo to je:** sekcia sa „zamkne“ na mieste a vertikálny scroll ju posúva do strany, takže sa prechádza vodorovnou galériou/časovou osou.
- **Kde:** portfólio, história/časová os, galéria. Max 1× na web.
- **Implementácia:** GSAP ScrollTrigger `pin: true`, `scrub: 1`, posun kontajnera `x: -(scrollWidth - innerWidth)`, `end: "+=" + scrollWidth`.
- **Mobile:** prepnúť na natívny horizontálny swipe (`overflow-x: auto; scroll-snap-type: x mandatory`), bez pinu.

### B3. Hero media scale on scroll (expanding video)
- **Čo to je:** v hero sekcii je menšie video/fotka so zaoblenými rohmi; pri scrolle sa plynulo roztiahne na celú šírku obrazovky a rohy sa vyrovnajú.
- **Kde:** hero alebo intro sekcia hneď pod ním.
- **Parametre:** `scale(0.8)` + `border-radius: 24px` → `scale(1)` + `border-radius: 0`, pin sekcie počas efektu, `scrub: true`.
- **Pozor:** video `muted playsinline autoplay loop`, poster obrázok, lazy load.

### B4. Scroll progress bar
- **Čo to je:** tenká linka na vrchu stránky, ktorá sa vypĺňa podľa toho, koľko z obsahu je prečítané.
- **Kde:** články, dlhé podstránky.
- **Implementácia:** čisté CSS: `transform-origin: left; animation: grow linear; animation-timeline: scroll(root);` (`scaleX(0)` → `scaleX(1)`), fallback cez JS.

### B5. Footer curtain reveal
- **Čo to je:** pätička je „schovaná pod“ stránkou a pri dojazde na koniec ju obsah odhalí ako zdvihnutá opona.
- **Implementácia:** footer `position: sticky; bottom: 0; z-index: -1` (alebo fixed + margin-bottom na `main`), hlavný obsah má plné pozadie.

---

## C. Mikrointerakcie (hover, kurzor)

### C1. Magnetic button
- **Čo to je:** keď sa kurzor priblíži k tlačidlu, tlačidlo sa jemne „pritiahne“ smerom ku kurzoru; po odchode sa pružne vráti.
- **Kde:** hlavné CTA, ikony sociálnych sietí. Nie na každé tlačidlo.
- **Parametre:** posun max 30 % vzdialenosti kurzora od stredu (cca 8–12 px), text vo vnútri sa hýbe o niečo viac ako pozadie (vrstvený efekt); návrat `elastic.out(1, 0.4)` 600 ms.
- **Len pre** `(hover: hover) and (pointer: fine)`.

### C2. Text roll hover (rolling text button)
- **Čo to je:** pri hoveri text v tlačidle/odkaze odroluje hore a zospodu prirolu jeho kópia, ako na mechanickom počítadle.
- **Kde:** navigácia, tlačidlá.
- **Implementácia:** text zdvojený vo dvoch spanoch v obale `overflow: hidden`, hover `translateY(-100%)`, 350 ms `--ease-out`, voliteľný stagger po písmenách 15 ms.

### C3. Animated underline
- **Čo to je:** podčiarknutie odkazu sa pri hoveri „nakreslí“ zľava doprava a pri odchode zmizne doprava.
- **Implementácia:** pseudo-element `::after`, `transform: scaleX(0)` → `scaleX(1)`, `transform-origin` prepínať `right` → `left` pri hoveri, 300 ms.

### C4. Custom cursor (cursor follower)
- **Čo to je:** malý kruh, ktorý s miernym oneskorením sleduje kurzor; nad odkazmi sa zväčší, nad obrázkami ukáže text („Pozrieť“).
- **Kde:** kreatívne a portfóliové weby. Systémový kurzor nechaj viditeľný (alebo len skry na konkrétnych zónach).
- **Implementácia:** `position: fixed`, `pointer-events: none`, pohyb cez `gsap.quickTo()` (duration 0.4), `mix-blend-mode: difference` pre invertovanie farieb pod ním.

### C5. Spotlight / glow cards (bento hover)
- **Čo to je:** pri pohybe myši nad kartou sa pod kurzorom rozsvieti jemný radiálny svetelný kruh na pozadí a na okraji karty. Typické pre bento gridy na tech/SaaS weboch.
- **Implementácia:** JS zapisuje pozíciu myši do CSS premenných `--x`, `--y` na karte; pozadie `radial-gradient(400px circle at var(--x) var(--y), rgba(255,255,255,0.08), transparent 40%)`, rovnaký trik na border cez `mask`.

### C6. 3D tilt card
- **Čo to je:** karta/produkt sa pri hoveri jemne nakláňa za kurzorom v 3D, s odleskom svetla.
- **Parametre:** `perspective: 1000px`, max `rotateX/rotateY` 6–8°, návrat 500 ms. Viac ako 10° pôsobí lacno.

### C7. Hover image reveal in list
- **Čo to je:** zoznam (projekty, hráči, služby) je čisto textový; pri hoveri nad položkou sa vedľa kurzora objaví a pláva príslušná fotka.
- **Implementácia:** jeden fixed obrázkový kontajner, `gsap.quickTo` na x/y, výmena `src` podľa položky, `scale 0.8` → `1` + fade pri vstupe.
- **Mobile:** obrázky zobraziť priamo v položkách.

---

## D. Ostatné obľúbené efekty

### D1. Infinite marquee
- **Čo to je:** nekonečne bežiaci pás textu alebo log (partneri, sponzori, klienti). Pri hoveri spomalí; voliteľne mení smer podľa smeru scrollu.
- **Implementácia:** obsah zdvojený, CSS `@keyframes` `translateX(0)` → `translateX(-50%)`, `linear` (tu je linear správne), 30–40 s na cyklus. Okraje stmaviť cez `mask-image: linear-gradient(...)`.

### D2. Number counter
- **Čo to je:** čísla (štatistiky, roky, počty) sa pri zobrazení napočítajú od 0 po cieľovú hodnotu.
- **Parametre:** 1 500–2 000 ms, `power2.out` (spomalenie na konci), formátovanie s medzerou ako oddeľovačom tisícov, `font-variant-numeric: tabular-nums` aby číslo „neskákalo“.

### D3. Page transitions (View Transitions API)
- **Čo to je:** pri prechode medzi podstránkami sa obsah plynulo prelína; ideálne sa obrázok z karty „preletí“ a zväčší do hero obrázka detailu.
- **Implementácia:** natívne CSS `@view-transition { navigation: auto; }` pre MPA, `view-transition-name` na zdieľaných prvkoch. V Next.js/React cez podporu frameworku. Fallback = bežná navigácia.

### D4. Animated gradient / aurora background + grain
- **Čo to je:** pozadie s pomaly sa prelievajúcimi farebnými škvrnami (mesh gradient) a jemnou zrnitosťou, vďaka ktorej to pôsobí „analógovo“, nie plasticky.
- **Implementácia:** 2–4 rozmazané kruhy (`filter: blur(80px)`) animované cez `@keyframes` po 20–30 s; grain ako SVG `feTurbulence` overlay s `opacity: 0.05`.
- **Pozor:** iba v hero alebo jednej sekcii, kontrolovať čitateľnosť textu.

### D5. Text scramble / decode
- **Čo to je:** text sa pri objavení alebo hoveri „dešifruje“ z náhodných znakov do správneho slova.
- **Kde:** krátke labely, čísla, tech/herné weby. Nie na dlhý text.
- **Parametre:** 600–1 000 ms, znaky z obmedzenej sady (`A–Z0–9`), monospace alebo pevná šírka kontajnera, aby layout neskákal.

### D6. Preloader / intro sequence
- **Čo to je:** krátka úvodná animácia pri prvom načítaní (logo, počítadlo 0–100 %), ktorá sa odsunie ako opona a odhalí hero.
- **Pravidlá:** max 1,5–2 s, iba pri prvej návšteve (sessionStorage), nikdy neblokovať obsah dlhšie, než sa načíta.

---

## E. Hotové kombinácie (presety)

- **Elegantný / prémiový:** A1 + A3 + A6 + A7 + C2 + C3 + D3. Pomalšie časovanie (800–1 000 ms), žiadne kurzory ani glow.
- **Moderný tech / SaaS:** A2 + A5 + B4 + C5 + D1 + D4. Kratšie časovanie, glow a blur.
- **Energický / športový:** A1 + A3 + B2 + B3 + C1 + D1 + D2. Rýchlejšie easingy (`power4.out`), výrazné nadpisy, marquee so sponzormi, počítadlá štatistík.
- **Portfólio / kreatívne:** A1 + A3 + A6 + B2 + C4 + C7 + D3.

---

## F. Čo nerobiť

- Neanimovať všetko. Nech 70 % obsahu je statických; animácia má smerovať pozornosť.
- Nekombinovať veľa rôznych smerov a easingov, web potom pôsobí chaoticky.
- Žiadny scroll-jacking (prebratie kontroly nad scrollom) okrem jasne ohraničených pinovaných sekcií.
- Žiadne animácie dlhšie ako 1,2 s na prvkoch, ktoré si používateľ chce prečítať.
- Neskrývať obsah dôležitý pre SEO za JS bez fallbacku.
- Netestovať iba na výkonnom notebooku: overiť aj na priemernom mobile a so zapnutým reduced-motion.
