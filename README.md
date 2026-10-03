# Marques Marketing — Landings de servicios

Sitio de 5 páginas en español (Argentina): una landing general y una landing por servicio, todas con botón de WhatsApp y pensadas para SEO y anuncios.

| Página | Ruta |
|---|---|
| Inicio | `/` |
| Google Mi Negocio | `/google-mi-negocio-la-rioja` |
| SEO local y web | `/seo-local-la-rioja` |
| Meta Ads | `/meta-ads-la-rioja` |
| Diseño web | `/diseno-web-la-rioja` |

También genera `/sitemap.xml` y `/robots.txt` automáticamente.

## Probar en tu computadora

1. Instalá Node.js (versión 18 o superior): https://nodejs.org
2. Abrí una terminal dentro de esta carpeta y ejecutá:

```bash
npm install
npm start
```

3. Abrí http://localhost:3000 en el navegador.

## Cómo editar el contenido

Todo el texto, el número de WhatsApp y los servicios están en **`data/site.js`**. Editá ese archivo y reiniciá el servidor.

- Para cambiar el número de WhatsApp: modificá `whatsappNumber` (formato internacional, sin `+`, sin 0 y sin 15) y `phoneDisplay`.
- Para agregar un servicio: copiá un bloque de la lista `services` y cambiá sus textos. La página, el menú, el sitemap y los links internos se crean solos.
- Colores: están en las variables al comienzo de `public/style.css`.
- Logo: reemplazá `public/img/logo.svg` y `public/img/favicon.svg` por tus archivos oficiales.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Primera versión del sitio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/marques-landings.git
git push -u origin main
```

(Antes creá el repositorio vacío `marques-landings` en https://github.com/new.)

## Publicar en Render

1. Creá una cuenta en https://render.com e iniciá sesión con GitHub.
2. **New → Web Service** y elegí el repositorio `marques-landings`.
3. Completá:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/healthz`
4. Presioná **Create Web Service**. En unos minutos tendrás una dirección `https://....onrender.com`.

Desde ese momento, cada vez que hagas `git push`, Render actualiza el sitio solo.

> En el plan gratuito de Render el sitio "se duerme" tras un rato sin visitas y la primera carga puede tardar. Para anuncios y SEO conviene un plan pago.

## Conectar tu dominio (cuando lo tengas)

1. En Render: **Settings → Custom Domains** y agregá tu dominio. Render te indica los registros DNS que hay que cargar en el proveedor del dominio.
2. En Render: **Environment → Add Environment Variable**:
   - Clave: `BASE_URL`
   - Valor: `https://tudominio.com.ar` (sin barra final)
3. Reiniciá el servicio. Con eso el sitemap, el robots.txt y las URLs canónicas usan tu dominio.
4. Registrá el sitio en **Google Search Console** y enviá `https://tudominio.com.ar/sitemap.xml`.

## Estructura

```
├── package.json       dependencias y comandos
├── server.js          servidor Express (rutas, sitemap, robots)
├── data/site.js       todo el contenido del sitio
├── views/layout.js    cabecera, pie y metadatos SEO
├── views/pages.js     arma la home y las páginas de servicio
└── public/            CSS, JavaScript e imágenes
```
