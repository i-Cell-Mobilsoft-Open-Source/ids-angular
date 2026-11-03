# Lokális CSS-tokenek frissítése az IDS_CSS branchből

A művelet az **ids-angular** repóban történik. Az `IDS_CSS` branch generált
CSS-tokenjeit vesszük át a `feature/local-css-tokens` branch demójába. A célmappát
teljesen lecseréljük: a forrásból hiányzó célfájlok is törlődnek.

## A most elvégzett frissítés

- Forrásbranch: `origin/IDS_CSS`.
- Rögzített forráscommit: `46054992226fb20928c279574e6063e6caa2edb5`
  (`chore(tokens): update generated CSS`, 2026-11-03).
- Forrásmappa: **`src/assets/ids_css`**.
- Célbranch: **`feature/local-css-tokens`**.
- Célmappa: **`projects/demo/src/assets/ids_css`**.
- A forrás 38 fájljának teljes, változtatás nélküli másolatát vettük át.
- A korábbi `compatibility.css` nincs a forrásexportban, ezért a teljes csere
  eltávolította. A forrás `tokens.css` fájlja sem importálja.
- A csomag tartalmazza az összesített `component/component.css` fájlt és a
  32 komponens különálló `component/ids-*.css` fájljait is. A `tokens.css`
  az összesített fájlt importálja; a különállókat nem kell mellé importálni.
- A chip-label javított nevei már az exportból érkeznek. Nem írtunk át kézzel
  tokennevet, tokenértéket vagy alias-hivatkozást.
- A `smc/smc-reference.css` tartalma megegyezett a célbranch korábbi fájljával,
  ezért ehhez a frissítéshez nem volt szükség új Tailwind-térképre.

Az `IDS_CSS` branch régi, örökölt `projects/demo/src/assets/ids_css` könyvtárat
is tartalmaz. **A friss exportot a `src/assets/ids_css` útvonalról kell átvenni.**
Nem merge-eltük az egész `IDS_CSS` branchet: csak a megadott mappát másoltuk át.

## A mostani frissítés ellenőrzései

- Mind a 38 célfájl neve és teljes bináris tartalma egyezik a rögzített
  forráscommit megfelelő fájljával; nincs további fájl a célmappában.
- `node scripts/check-local-tokens.cjs`: sikeres. Core: 11 169 token,
  DÁP: 12 375 token; mindkét importlánc 6 CSS-fájlt tölt be.
- `NG_BUILD_MAX_WORKERS=2 pnpm ng build demo --configuration=development`:
  sikeres.
- `git diff --check`: sikeres.

## Megismételhető lépések

A parancsokat az `ids-angular` repó gyökeréből, Bash vagy Zsh terminálban futtasd.
A helyi változtatásokat előbb rendezd: a `git status --short` kimenete legyen üres.
A folyamat szándékosan felülírja és a forráshoz igazítja a teljes célmappát.

### 1. A branchek frissítése és a célbranch kiválasztása

```sh
git status --short
git fetch origin IDS_CSS feature/local-css-tokens
git switch feature/local-css-tokens
git pull --ff-only origin feature/local-css-tokens
```

A `--ff-only` megakadályozza, hogy egy helyileg eltérő branchre véletlenül merge
commit készüljön. Ha ez a parancs hibát jelez, előbb rendezd a branch eltérését.

### 2. A forráscommit rögzítése és a mappa ellenőrzése

```sh
source_ref=$(git rev-parse origin/IDS_CSS)
git show --no-patch --format='%H %ci %s' "$source_ref"
git ls-tree -r --name-only "$source_ref" -- src/assets/ids_css
git cat-file -e "${source_ref}:src/assets/ids_css/tokens.css"
```

A `source_ref` egy konkrét commit SHA-ja. A másolás során ezt használjuk, így
ugyanazt a pillanatképet vesszük át akkor is, ha közben új export érkezik.
A mostani frissítés pontos megismétléséhez az első parancs helyett ezt használd:

```sh
source_ref=46054992226fb20928c279574e6063e6caa2edb5
```

### 3. Kicsomagolás és teljes mappacsere

```sh
export_dir=$(mktemp -d "${TMPDIR:-/tmp}/ids-css-refresh.XXXXXX")
git archive --format=tar --output="$export_dir/ids-css.tar" \
  "$source_ref" src/assets/ids_css

tar -xf "$export_dir/ids-css.tar" -C "$export_dir"
```

Csak akkor folytasd, ha a kicsomagolás sikeres. A következő parancs előbb
ellenőrzi a forrás létezését, majd lecseréli a célmappa tartalmát:

```sh
test -f "$export_dir/src/assets/ids_css/tokens.css" && \
  rsync -a --delete "$export_dir/src/assets/ids_css/" \
  projects/demo/src/assets/ids_css/
```

A forrásútvonal végén lévő `/` azt jelenti, hogy a mappa **tartalmát** másoljuk.
A `--delete` eltávolítja a célmappából a forrásban nem szereplő fájlokat is,
így nem maradnak vissza régi tokenek vagy kompatibilitási pótlások.

Ellenőrizd a teljes tartalmi egyezést:

```sh
diff -qr "$export_dir/src/assets/ids_css" projects/demo/src/assets/ids_css
```

A sikeres ellenőrzés nem ad kimenetet. A normál felülmásolás vagy önmagában a
`git checkout <branch> -- <mappa>` nem helyettesíti ezt a teljes cserét: a
forrásútvonal eltér, és a csak a célban létező fájlokat is el kell távolítani.

### 4. Ellenőrzés

Ha még nincs telepítve a projekt függősége:

```sh
pnpm install --frozen-lockfile
```

Ezután:

```sh
node scripts/check-local-tokens.cjs
NG_BUILD_MAX_WORKERS=2 pnpm ng build demo --configuration=development
git diff --check
git status --short
git diff --stat
```

A tokenellenőrző a Core és a DÁP `tokens.css` importjait és a tokeneken belüli
`var(...)` hivatkozásokat vizsgálja. Nem hasonlítja össze az ids-styles összes
hivatkozását az exporttal, és nem helyettesít böngészős vizuális ellenőrzést.
A build a demó fordíthatóságát ellenőrzi.

Ha egy későbbi export megváltoztatja a `smc/smc-reference.css` fájlt, a
`pnpm parse-tokens` paranccsal frissítsd a belőle generált `tailwind-tokens.js`
térképet is, és azt is ellenőrizd, majd commitold.

### 5. Dokumentálás, commit és push

Frissítsd ebben a leírásban és a README-ben a forráscommitot. A `git status`
kimenetében ellenőrizd, hogy csak a tervezett fájlok módosultak, majd:

```sh
git add -A -- projects/demo/src/assets/ids_css README.md docs/local-css-token-refresh.md
git diff --cached --check
git diff --cached --stat
git commit -m "chore(tokens): refresh local CSS export from IDS_CSS"
git push origin feature/local-css-tokens
git status --short --branch
```

A `git add -A` a törléseket is stage-eli, például egy régi compatibility-fájl
eltávolítását. Ha frissítetted a Tailwind-térképet, commit előtt add hozzá azt is:
`git add tailwind-tokens.js`.

A DÁP mappa külön forrás (`projects/demo/src/assets/ids_css_dap`); ezt a művelet
nem frissíti. A következő exportnál sem kell kézzel visszatenni a korábbi
`compatibility.css` fájlt: a célmappa a kiválasztott export pontos másolata.
