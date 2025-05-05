# 🍿 PopcornBox 🎬

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue.svg)]()

> 🚀 Una experiencia moderna de streaming con diseño elegante y rendimiento excepcional

PopcornBox es una plataforma de streaming que combina una interfaz intuitiva con acceso a un amplio catálogo de películas y series. Diseñada con las últimas tecnologías web para ofrecer una experiencia fluida y atractiva en cualquier dispositivo.

<div align="center">

<!-- Tipo de Proyecto -->
`#web-application` `#frontend` `#spa` `#streaming-service` `#open-source`

<!-- Tecnologías -->
`#nextjs` `#react` `#typescript` `#tailwindcss` `#turborepo` `#swr` `#motion`

<!-- Características -->
`#responsive-design` `#dark-mode` `#user-experience` `#modern-ui` `#pwa` `#animations`

<!-- Dominio -->
`#streaming-platform` `#movies` `#tv-series` `#entertainment` `#video-player` `#media`

<!-- Estado -->
`#in-development` `#version-0.1.0` `#actively-maintained` `#beta`

</div>

### ✨ Características Destacadas

- 🎭 **Catálogo Extenso** - Amplia variedad de películas y series
- 🔍 **Búsqueda Avanzada** - Encuentra contenido por título, género, actor y más
- 📱 **Diseño Responsivo** - Experiencia optimizada para cualquier dispositivo
- 🌓 **Modo Oscuro/Claro** - Interfaz adaptable a tus preferencias
- ⚡ **Rendimiento Optimizado** - Carga rápida y streaming sin interrupciones

### 🚦 Estado del Proyecto

- ⏳ **Estado**: En desarrollo activo
- 🔄 **Versión**: 0.1.0
- 📅 **Última Actualización**: Mayo 2025

### 📚 Enlaces Rápidos

- [🔧 Instalación](#requisitos-de-instalación)
- [⚙️ Configuración](#instrucciones-de-configuración)
- [📋 Comandos](#comandos-disponibles)
- [📁 Estructura](#estructura-del-proyecto)
- [👥 Contribución](#contribución)

---

## Descripción General

PopcornBox es una plataforma moderna de streaming de películas y series que permite a los usuarios descubrir, buscar y disfrutar de contenido audiovisual de alta calidad. La aplicación ofrece una experiencia fluida y atractiva con una interfaz intuitiva, diseñada para hacer que la navegación y el consumo de contenido sean lo más agradables posible.

## Tecnologías Utilizadas

- **Frontend**: 
  - [Next.js 15](https://nextjs.org/) - Framework de React con renderizado del lado del servidor
  - [React 19](https://react.dev/) - Biblioteca de JavaScript para construir interfaces de usuario
  - [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
  - [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utility-first
  - [Motion](https://motion.dev/) - Biblioteca para animaciones fluidas
  - [SWR](https://swr.vercel.app/) - Biblioteca para manejo de caché y obtención de datos
  - [Lucide React](https://lucide.dev/) - Iconos SVG

- **Desarrollo**:
  - [ESLint](https://eslint.org/) - Linter para identificar problemas en el código
  - [TurboPack](https://turbo.build/) - Empaquetador optimizado para Next.js

## Estructura del Proyecto

PopcornBox sigue una estructura de proyecto modular y escalable:

```
popcornbox/
├── .next/               # Archivos generados por Next.js (generado automáticamente)
├── node_modules/        # Dependencias de Node.js (generado automáticamente)
├── public/              # Archivos estáticos accesibles públicamente
├── src/                 # Código fuente de la aplicación
│   ├── api/             # Endpoints de API y lógica de servicios
│   ├── app/             # Definición de rutas y páginas de la aplicación (Next.js App Router)
│   ├── components/      # Componentes React reutilizables
│   ├── contexts/        # Contextos de React para estado global
│   ├── styles/          # Estilos globales y configuración de Tailwind
│   ├── types/           # Definiciones de tipos TypeScript
│   └── utils/           # Funciones utilitarias y helpers
├── .env                 # Variables de entorno (no incluido en control de versión)
├── .gitignore           # Archivos y directorios ignorados por Git
├── eslint.config.mjs    # Configuración de ESLint
├── next.config.ts       # Configuración de Next.js
├── package.json         # Dependencias y scripts del proyecto
├── postcss.config.mjs   # Configuración de PostCSS
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Documentación del proyecto (este archivo)
```

## Requisitos de Instalación

Para ejecutar PopcornBox localmente, necesitarás tener instalado:

- [Node.js](https://nodejs.org/) (versión 18.17.0 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js) o [yarn](https://yarnpkg.com/) o [pnpm](https://pnpm.io/) o [bun](https://bun.sh/)
- [Git](https://git-scm.com/) para clonar el repositorio

## Instrucciones de Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/DavidCortesA/movie.git
   cd popcornbox
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto basado en `.env.example` (si existe)
   - Configura las variables necesarias, como API keys o URLs de servicios

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

5. **Acceder a la aplicación**:
   - Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con TurboPack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta ESLint para verificar y arreglar problemas de código

## Características Principales

- **Catálogo Extenso**: Acceso a una amplia variedad de películas y series
- **Interfaz Intuitiva**: Diseño moderno con animaciones fluidas utilizando Motion
- **Sistema de Búsqueda**: Busca títulos por nombre, género, actor, director, etc.
- **Perfiles de Usuario**: Crea y personaliza perfiles para recibir recomendaciones personalizadas
- **Listas Personalizadas**: Guarda contenido en "Mi Lista" para ver más tarde
- **Reproducción Optimizada**: Streaming de alta calidad con mínimo buffering
- **Diseño Responsivo**: Experiencia optimizada para dispositivos móviles, tablets y desktops
- **Modo Oscuro/Claro**: Cambia entre temas según tus preferencias

## Estructura de Directorios Detallada

### `/public`
Contiene archivos estáticos como imágenes, favicon, y otros recursos accesibles públicamente.

### `/src/api`
Contiene la lógica de servicios y endpoints de API:
- Integraciones con APIs externas de películas y series
- Lógica para obtener y filtrar datos

### `/src/app`
Implementa el App Router de Next.js:
- Estructura de rutas y páginas
- Layouts compartidos
- Loading states y error boundaries

### `/src/components`
Componentes React reutilizables organizados por funcionalidad:
- UI: elementos básicos de la interfaz (botones, inputs, tarjetas)
- Layout: componentes de estructura (header, footer, sidebar)
- Movie: componentes específicos relacionados con películas
- Series: componentes específicos relacionados con series
- User: componentes relacionados con la gestión de usuarios

### `/src/contexts`
Contextos de React para manejar estado global:
- ThemeContext: para gestionar el modo oscuro/claro
- AuthContext: para manejar la autenticación
- PlayerContext: para el estado del reproductor

### `/src/styles`
Estilos globales y configuración de Tailwind CSS.

### `/src/types`
Definiciones de tipos TypeScript para:
- Modelos de datos (Movie, Series, User)
- Respuestas de API
- Props de componentes complejos

### `/src/utils`
Funciones utilitarias:
- Formatters: formateo de fechas, duraciones, etc.
- Validators: validación de entradas de usuario
- Helpers: funciones auxiliares reutilizables

## Contribución

¡Contribuciones a PopcornBox son bienvenidas! Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios
4. Ejecuta los linters y tests para asegurar la calidad del código
5. Commit tus cambios (`git commit -m 'Add amazing feature'`)
6. Push a la rama (`git push origin feature/amazing-feature`)
7. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la licencia [MIT](LICENSE).

---

Desarrollado con ❤️ por el equipo de PopcornBox
