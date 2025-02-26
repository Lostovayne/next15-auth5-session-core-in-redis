# Next.js 15 Auth con Cache de Sesiones

![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Auth.js](https://img.shields.io/badge/Auth.js-5.0-green)
![Redis](https://img.shields.io/badge/Upstash_Redis-latest-red)

Una implementación robusta y moderna de autenticación en Next.js 15 utilizando Auth.js (anteriormente NextAuth) con almacenamiento en caché de sesiones mediante Upstash Redis.

## 🚀 Características

- ⚡ Autenticación moderna con Next.js 15 y App Router
- 🔐 Sistema de autenticación completo con Auth.js 5
- 📦 Caché de sesiones con Upstash Redis
- 🎨 UI moderna con Tailwind CSS
- 📱 Diseño responsivo
- 🔒 Manejo seguro de credenciales
- 🌐 Soporte para modo oscuro
- ⚛️ Construido con React 19

## 📋 Prerrequisitos

- Node.js 18.0 o superior
- Una cuenta en [Upstash](https://upstash.com/) para Redis
- Conocimientos básicos de Next.js y TypeScript

## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto:

```env
AUTH_SECRET="tu-secreto-seguro"
UPSTASH_REDIS_REST_URL="tu-url-de-upstash"
UPSTASH_REDIS_REST_TOKEN="tu-token-de-upstash"
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   ├── libs/
│   │   ├── auth.ts
│   │   ├── credentials.ts
│   │   ├── providers.ts
│   │   ├── redis.ts
│   │   └── types.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .env
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Tecnologías Principales

- **Next.js 15.1.7**: Framework de React para producción
- **Auth.js 5.0**: Sistema de autenticación moderno
- **Upstash Redis**: Almacenamiento en caché distribuido
- **TypeScript**: Tipado estático para JavaScript
- **Tailwind CSS**: Framework de CSS utilitario
- **React 19**: Biblioteca UI
- **nanoid**: Generación de IDs únicos

## 🔐 Características de Autenticación

- Autenticación con credenciales
- Sesiones JWT
- Almacenamiento en caché con Redis
- Funciones de hash seguras para contraseñas
- Tokens aleatorios seguros
- Verificación de email (opcional)

## 📚 API y Endpoints

### Rutas de Autenticación

- `/api/auth/signin`: Inicio de sesión
- `/api/auth/signout`: Cierre de sesión
- `/api/auth/session`: Información de la sesión actual

## 🎨 Personalización

### Estilos

El proyecto utiliza Tailwind CSS con soporte para modo oscuro y claro. Los estilos principales se encuentran en:

- `app/globals.css`
- `tailwind.config.ts`

### Fuentes

- Geist Sans: Fuente principal
- Geist Mono: Fuente para código

## 🚀 Despliegue

El proyecto está optimizado para despliegue en Vercel:

```bash
npm run build
vercel deploy
```

## 🔍 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📧 Contacto

Tu Nombre - [@tutwitter](https://twitter.com/Deus)

Link del Proyecto: [https://github.com/Lostovayne](https://github.com/LostoVayne)
