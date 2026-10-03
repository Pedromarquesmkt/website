// Servidor Express: entrega las páginas, el sitemap y el robots.txt
const express = require('express');
const path = require('path');
const site = require('./data/site');
const { renderHome, renderService, renderNotFound } = require('./views/pages');

const app = express();
const PORT = process.env.PORT || 3000;

// Dirección pública del sitio. Se usa en el sitemap y en las URLs canónicas.
// 1) BASE_URL: la definís vos cuando tengas dominio propio (ej: https://marquesmarketing.com.ar)
// 2) RENDER_EXTERNAL_URL: la completa Render automáticamente
// 3) localhost: para probar en tu computadora
const BASE_URL = (
  process.env.BASE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${PORT}`
).replace(/\/+$/, '');

app.disable('x-powered-by');

// Cabeceras de seguridad básicas
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

// Envía HTML con una caché corta
function sendHtml(res, html, status = 200) {
  res.status(status).set('Content-Type', 'text/html; charset=utf-8').set('Cache-Control', 'public, max-age=300').send(html);
}

// Para que Render sepa que el servidor está vivo
app.get('/healthz', (req, res) => res.type('text').send('ok'));

// Le dice a Google qué páginas existen
app.get('/sitemap.xml', (req, res) => {
  const urls = ['/', ...site.services.map((s) => `/${s.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE_URL}${u}</loc></url>`).join('\n')}
</urlset>`;
  res.type('application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
});

// Página principal
app.get('/', (req, res) => sendHtml(res, renderHome(BASE_URL)));

// Páginas de servicio: /google-mi-negocio-la-rioja, /seo-local-la-rioja, etc.
app.get('/:slug', (req, res, next) => {
  const service = site.services.find((s) => s.slug === req.params.slug);
  if (!service) return next();
  sendHtml(res, renderService(BASE_URL, service));
});

// Cualquier otra dirección: página 404
app.use((req, res) => sendHtml(res, renderNotFound(BASE_URL), 404));

app.listen(PORT, () => {
  console.log(`Sitio funcionando en http://localhost:${PORT}`);
});
