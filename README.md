# Astro Starter TEMPLATE

## 🚀 Project Structure

Inside my Astro project, you'll see the following folders and files:

```text
├── .github/workflows/deploy.yml - CI/CD for project, deploy at another github repo
├── .vscode/ (snippets, vscode configuration)
├── public/js/
│   ├──data
│   │   └──test.json
│   └──index.js
│
├── src
│   ├── assets
│   │   ├── icons (.svg)
│   │   └── images (.png, .jpg, ...)
│   │  
│   ├── html
│   │   ├── components (small blocks)
│   │   ├── templates  (sections, feature)
│   │   ├── ui         (btns, custom lists)
│   │   └── utils      (connect libs...)
│   │  
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro (or many pages)
├── prettierrc
├── format-dist.js - formating dist file
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:
| Command | Action |
| :--------------------- | :----------------------------------------------- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run format:dist` | Run formatting for folder dist |
| `npm run serve` | runs the build and formats the build version of the files. |

## Aliases

| Allias         | path                     |
| :------------- | :----------------------- |
| `@components/` | "./src/html/components/" |
| `@components/` | "./src/html/components/" |
| `@templates/`  | "./src/html/templates/"  |
| `@ui/`         | "./src/html/ui/"         |
| `@layouts/`    | "./src/layouts/"         |
| `@html/`       | "./src/html/"            |
| `@assets/`     | "./src/assets/"          |
| `@icons/`      | "./src/assets/icons"     |
| `@images/`     | "./src/assets/images"    |
| `@public/ `    | "./public/"              |

## CI/CD

.github/workflows/deploy.yml
