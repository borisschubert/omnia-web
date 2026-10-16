# Omnia web (omniachoir.sk)

Next.js 16 / React 19 / Tailwind 4 web pre Miešaný spevácky zbor Omnia (Žilina).
Pôvodne postavené cez Cursor, teraz sa upravuje cez Claude.

## Kontext o používateľovi
Boris je projektový manažér (marketingová agentúra), nie developer. Vysvetľuj
zmeny stručne a zrozumiteľne, navrhuj vylepšenia len keď sa to naozaj hodí.
Komunikácia prebieha po slovensky.

## Ako web funguje
- Statický Next.js web, deploy cez Vercel.
- **Deploy = push na GitHub.** Repo: https://github.com/borisschubert/omnia-web,
  vetva `main`. Vercel má na túto vetvu napojený auto-deploy — push na `main`
  = do 1-2 minút live na omniachoir.sk. Netreba nič robiť vo Vercel dashboarde.
- Lokálny dev server: `npm run dev`, beží na http://localhost:3000 (hot-reload).
- Git remote (origin) má HTTPS URL s vloženým GitHub Personal Access Tokenom —
  push/pull by mal fungovať bez pýtania hesla. Ak token vyprší alebo push
  zlyhá (chyba "Invalid username or token" / "could not read Username"),
  treba vygenerovať nový fine-grained token (Settings → Developer settings →
  Personal access tokens → Fine-grained, len repo omnia-web, Contents: Read
  and write). Token nastavuje Boris sám v Termináli (Claude tokeny nezadáva):
  `git remote set-url origin https://borisschubert:NOVY_TOKEN@github.com/borisschubert/omnia-web.git`
  Používateľské meno v URL je dôležité — credential helper `gh` v
  ~/.gitconfig na tomto Macu nefunguje ("Bad CPU type"), takže git sa nesmie
  pýtať na heslo. Hláška "gh auth git-credential store … Bad CPU type" po
  úspešnom pushi je neškodná.

## Redizajn (október 2026)
- Prebieha na vetve `redesign` (push → Vercel preview, NIE produkcia). `main`
  = živý web, redizajn sa tam zmerguje až po Borisovom schválení.
- Záloha pred redizajnom: git tag `zaloha-pred-redizajnom`.
- Podklady z Claude Design sú lokálne v `design_handoff_omnia_web/`
  (README.md s tokenmi, screenshoty, HTML) — v .gitignore, necommitovať.
- Pravidlo: texty a údaje zo súčasného webu, z dizajnu len vzhľad a štruktúra.
  Sekcie bez podkladov (video, Instagram, PDF, logá partnerov) sú skryté.
- Nový dizajnový systém: tokeny a typografia (`t-display`, `t-h2`, `t-h3`,
  `t-body`, `t-small`, `t-label`, `wrap`, `section-y`) v `app/globals.css`,
  komponenty v `components/ds/`. Animácie: `data-reveal`, `data-parallax`
  (MotionRoot v Shell).
- Hotové: základ, hlavička, päta, domov. Ďalej: Vystúpenia, Aktuality +
  detail, Ocenenia, O nás, Pridaj sa, Podporte nás, Kontakt, upratanie.
- Lokálny dev server štartuje na tomto Macu 3–5 min; pri zaseknutí pomôže
  zmazať `.next` a reštartovať.

## i18n
Texty sú v `lib/i18n/strings/sk.json` a `lib/i18n/strings/en.json`, kľúč →
text. Komponenty volajú `t(locale, "kluc")`. Pri úprave textu treba zmeniť
oba jazykové súbory (aj keď anglická verzia niekedy necháva slovenský názov,
napr. názov zboru/skladby).

## Vystúpenia / koncerty
Jediný zdroj dát: `lib/content/homeConcerts.ts`, pole `homeConcerts`.
Použité na dvoch miestach:
- `components/pages/ProgramPage.tsx` — stránka "Vystúpenia" (zoskupené podľa mesiaca)
- `components/home/HomeEventsSection.tsx` — sekcia "Kde nás môžete počuť" na
  hlavnej stránke (zobrazuje najbližšie 3 podujatia)

Obe miesta používajú funkciu `getUpcomingConcerts()` (tiež v `homeConcerts.ts`),
ktorá automaticky vyfiltruje podujatia, ktorých `dateIso` je v minulosti —
staré podujatia teda netreba ručne mazať, zmiznú samy po tom dátume.
Pozor: pri viacdňových podujatiach je `dateIso` len začiatočný dátum.

## Ocenenia
Zoznam v `components/pages/OceneniaPage.tsx`, pole `awards` (najnovší rok
hore). Texty (názov súťaže, miesto, medaily) sú v i18n súboroch pod kľúčmi
`award.aN.*` — N je poradové číslo, unikátne naprieč celým súborom.

## Doterajšie zmeny v tejto sezóne (referencia)
- Zmena "Zmiešaný" → "Miešaný" (názov zboru) naprieč celým webom
- Odstránené prebehnuté podujatia máj-august 2026, pridaná auto-filtrácia
  starých podujatí (viď vyššie)
- Pridané ocenenie 2026: World Choir Games, Helsingborg/Švédsko, 2x zlatá medaila
