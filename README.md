# CLP Central

ERP web de CLP Automotriz para centralizar importaciones, series de tanques, stock, ventas a Vari, compras locales, Libro Mayor, cashflow, documentos, contabilidad, proveedores y pendientes.

## Arquitectura

- Next.js 16 + React 19
- Clerk para autenticación privada
- Neon PostgreSQL + Drizzle ORM
- Cloudflare R2 para archivos privados
- Vercel para despliegue

## Configuración

1. Copiar `.env.example` a `.env.local` para desarrollo.
2. Agregar las mismas variables en Vercel para Production y Preview.
3. Aplicar el esquema a Neon con `npm run db:push` usando `DATABASE_URL_UNPOOLED`.
4. Mantener el bucket R2 `clp-central-documentos` privado.

## Logo

Cargar manualmente el archivo PNG en:

```text
public/brand/logo-clp.png
```

Mientras no exista, la interfaz muestra un identificador CLP de respaldo.

## Regla central

Cada dato se registra una sola vez y se propaga a los módulos relacionados. Los formularios usan guardado manual, excepto Documentos, donde la carga del archivo se guarda al confirmar la subida.

## Estado actual

La base técnica, navegación responsive, autenticación, conexiones Neon/R2, esquema inicial y estructura de los 11 módulos ya están creadas. La siguiente etapa activa formularios, cálculos y automatizaciones por módulo sobre la base desplegada.
