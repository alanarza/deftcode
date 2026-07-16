# deftcode

Sitio institucional bilingüe construido con Nuxt 4, Nuxt Content y Tailwind CSS.

## Requisitos

- Node.js 22 o superior
- npm 10 o superior

## Desarrollo

1. Copiar `.env.example` como `.env`.
2. Reemplazar el dominio y, cuando se elija un proveedor de formularios, configurar `NUXT_PUBLIC_CONTACT_ENDPOINT`.
3. Ejecutar `npm install` y `npm run dev`.

El nombre del estudio se configura con `NUXT_PUBLIC_SITE_NAME`. El email y los canales sociales se encuentran en `app/app.config.ts`.

## Contenido

Los proyectos viven en `content/projects/es` y `content/projects/en`. Cada archivo debe tener su traducción equivalente y cumplir el esquema de `content.config.ts`.

## Verificación

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run generate`

Vercel debe usar `npm run generate` y publicar `.output/public` para mantener el sitio completamente estático.
