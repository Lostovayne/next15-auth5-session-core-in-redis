Creación de una nueva aplicación Next.js
Empecemos por crear un nuevo proyecto de Next.js. Abra su terminal y ejecute el siguiente comando:

npx create-next-app@latest my-app
Cuando se le solicite, elija:

Yes cuando se le pida que use TypeScript.
No cuando se le pida que utilice ESLint.
Yes cuando se le solicite que use Tailwind CSS.
No cuando se le solicite usar el directorio.src/
Yes cuando se te pida que uses App Router.
No cuando se le solicite usar Turbopack.
No cuando se le pida que personalice el alias de importación predeterminado ().@/\*

cd my-app
npm run dev
La aplicación debe ejecutarse en localhost:3000. Detenga el servidor de desarrollo para instalar las dependencias necesarias con los siguientes comandos:

npm install @upstash/redis nanoid
npm install next-auth @auth/core @auth/upstash-redis-adapter

nanoid: Una biblioteca para generar identificadores únicos y seguros.
next-auth: Solución de autenticación creada para Next.js.
@auth/core: Paquete principal para manejar la autenticación en Auth.js.
@upstash/redis: SDK para interactuar con Upstash Redis a través de solicitudes HTTP.
@auth/upstash-redis-adapter: Adaptador para la integración de Auth.js con Upstash Redis.

Ahora, crea un archivo en la raíz de tu proyecto. Vas a usar los valores , and..envAUTH_SECRETUPSTASH_REDIS_REST_URLUPSTASH_REDIS_REST_TOKEN

El archivo debe tener lo siguiente:.env
