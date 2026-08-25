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
  push/pull by mal fungovať bez pýtania hesla. Ak token vyprší (chyba
  "Invalid username or token"), treba vygenerovať nový fine-grained token
  (Settings → Developer settings → Personal access tokens, scope: len tento
  repo, Contents: Read and write) a nastaviť ho:
  `git remote set-url origin https://NOVY_TOKEN@github.com/borisschubert/omnia-web.git`

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
