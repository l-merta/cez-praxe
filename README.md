
# 🎨 Art Explorer

**Art Explorer** je interaktivní webová aplikace postavená pomocí [Next.js](https://nextjs.org/) a [TanStack Query](https://tanstack.com/query), která umožňuje procházet databázi více než 500 000 uměleckých děl z veřejného API [The MET Museum](https://metmuseum.github.io/).

🛠 Tato aplikace byla vytvořena jako součást odborné praxe.

🌐 Živá ukázka: [museum.mertalukas.cz](https://museum.mertalukas.cz)

---

## ✨ Funkce

- 🔍 **Vyhledávání** děl s `debounce` a stránkováním
- 🖼️ **Zobrazení detailu** díla s informacemi a optimalizovaným obrázkem
- ❤️ **Favorites** – možnost označit díla jako oblíbená (uložená v Local Storage)
- 🔀 **Featured sekce** – náhodná díla na hlavní stránce
- 📱 **Responzivní design**
- 🔎 **SEO optimalizace** pomocí Next.js `head` komponent

---

## 🛠 Tech Stack

**Next.js** - Framework pro React s podporou SSR a SEO
**React** - Frontend knihovna
**Shadcn/ui** - Knihovna stylovaných komponentů
**Tailwind CSS** - Utility-first CSS framework
**TanStack Query** - Správa a cachování dat z API
**Lucide** - Knihovna ikon
**Local Storage** - Uložení oblíbených děl na straně klienta

---

## 📦 Instalace a spuštění

1. **Naklonujte repozitář**:
   ```bash
   git clone https://github.com/l-merta/cez-praxe.git
2. **Přejděte do adresáře projektu**:
   ```bash
   cd cez-praxe
3. **Nainstalujte závislosti**:
   ```bash
   npm install
4. **Spusťte aplikaci**:
   ```bash
   npm run dev
5. Aplikace poběží na [http://localhost:3000](http://localhost:3000)

---
## 📄 API

Aplikace využívá [The MET Collection API](https://metmuseum.github.io/) pro načítání dat:

- `GET /search?q=...` – hledání záznamů
- `GET /objects/:id` – detail konkrétního díla

---

## 🚀 Nasazení

Aplikace je nasazená pomocí **Vercel** a na **vlastním serveru**
🔗 [https://museum.mertalukas.cz](https://museum.mertalukas.cz)
🔗 [https://museum.vercel.app](https://v0-new-project-u50mgbjyjfc.vercel.app/)

---

## 📄 Licence

MIT © 2025 Lukáš Merta
