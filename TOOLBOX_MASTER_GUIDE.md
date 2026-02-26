# ToolBox RAG: Guía Maestra de Entornos y Flujos

Esta guía explica detalladamente la arquitectura del proyecto ToolBox RAG, cómo interactúan los diferentes entornos, y los pasos correctos para desarrollar, probar y desplegar.

## 1. Arquitectura y Entornos

El proyecto cuenta con dos entornos principales: **Local** (tu ordenador) y **Producción** (el servidor EasyPanel alojado en la IP `37.27.31.52`).

### Entorno Local (Desarrollo)
- **Frontend / Next.js:** Corre en `http://localhost:3000` ejecutando el comando `npm run dev`.
- **Propósito:** Aquí es donde escribes código, diseñas vistas, cambias estilos y haces pruebas rápidas.
- **Variables de entorno (`.env.local`):** Apuntan a los Webhooks online de n8n para que el código local interactúe directamente con el backend real de Inteligencia Artificial que ya está desplegado.

### Entorno Producción (EasyPanel)
- **Frontend / Next.js:** Accesible online en `https://app.toolbox-demo.com`. EasyPanel lo auto-construye bajando el código directamente desde GitHub usando Nixpacks.
- **n8n (Automatización):** Accesible en `https://n8n.toolbox-demo.com`. Es el "cerebro" orquestador del RAG.
- **MinIO (Almacenamiento S3):** Accesible en `https://storage.toolbox-demo.com`. Es el "disco duro" y guarda los PDFs físicos originales.
- **Qdrant (Base de datos vectorial):** Corre de forma aislada en la red interna de Docker (`toolbox-demo-qdrant:6333`). Almacena la "memoria matemática" para que la IA pueda buscar párrafos.

---

## 2. Git y Repositorios

Tienes un único proyecto en tu ordenador, pero está conectado a **dos destinos (remotes)** al mismo tiempo:
1. **`origin` (Tu cuenta personal):** Repositorio principal de desarrollo, validación por llave SSH.
2. **`production` (Cuenta de la demo):** Repositorio que lee EasyPanel para desplegar la aplicación mediante HTTPS+Token.

**Flujo correcto para subir código y desplegar:**
```bash
git add .
git commit -m "Descripción de los cambios"
git push origin master      # 1. Guardas el código de seguridad en tu cuenta personal
git push production master  # 2. Envías el código a la cuenta demo (¡ESTE COMANDO DISPARA EL DESPLIEGUE EN EASYPANEL!)
```
*Si solo vas a guardar código sin desplegar, haz el primer `push`. Si quieres subir a la web online, debes hacer ambos.*

---

## 3. Webhooks en n8n: Test vs Producción

Esta es la clave para entender por qué n8n a veces "parece que no hace nada":

- **Modo TEST (URLs con `/webhook-test/`)**
  - **Uso:** Únicamente útil cuando estás configurando, diseñando o arreglando un workflow en la pantalla de n8n.
  - **Cómo se activa:** Pulsando el botón naranja **"Listen for test event"** o "Execute Workflow" en n8n. Empieza a cargar esperando que le envíes algo.
  - **Caducidad:** Funciona una sola vez. Una vez recibe el archivo, se desactiva. Si haces una llamada desde tu aplicación (sea tu localhost o la online) sin haber pulsado este botón, saltará el error 404 de "Webhook no registrado".
  - **Visibilidad:** Ves el recorrido de los datos por los nodos en tiempo real con lucecitas verdes.

- **Modo PRODUCCIÓN (URLs con `/webhook/`)**
  - **Uso:** Cuando el workflow ya está testeado, terminado y quieres que trabaje de forma autónoma siempre en segundo plano.
  - **Cómo se activa:** Activando el interruptor superior a la derecha en n8n a **"Active"**.
  - **Comportamiento:** Siempre está escuchando. Nunca caduca. Ideal para conectar con las aplicaciones reales.
  - **Visibilidad:** ¡OJO! Aquí NO ves las burbujas verdes moverse por el lienzo. Trabaja en la sombra. Para ver si ha hecho algo o por qué ha fallado, debes salir al menú principal izquierdo y entrar en la sección de **"Executions"**.

**Tu `.env.local` actual:**
Hemos configurado las URLs en modo PRODUCCIÓN (`/webhook/`). De esta forma, puedes probar a subir PDFs y chatear desde el localhost en cualquier momento sin tener que ir a n8n a darle al botoncito de Test en cada intento.

---

## 4. Workflows de n8n (El núcleo RAG)

El RAG (Retrieval-Augmented Generation) que hemos configurado se divide en 3 procesos independientes:

### WF1: 01-Ingest-Workflow (Ingesta de documentos)
- **URL Webhook:** `.../webhook/ingest`
- **Qué hace:** Next.js le manda el PDF con un ID único -> n8n lo envía a MinIO por S3 -> n8n extrae el texto usando una herramienta -> El Text Splitter lo corta en trozos asimilables por la IA -> Configura el ID del archivo como "Metadato" -> Lo guarda e indexa en Qdrant como Vectores.
- **Estado actual:** Validado y funcionando.

### WF2: 02-Delete-Workflow (Borrar documentos)
- **URL Webhook:** `.../webhook/delete`
- **Qué hace:** Admin Panel manda petición con el ID del doc -> n8n contacta con MinIO y le dice "borra el archivo con este ID.pdf" -> n8n hace petición REST a Qdrant y le dice "borra todos los vectores informativos que tengan este ID de metadato".
- **Estado actual:** Configurado, pendiente de test end-to-end.

### WF3: 03-Chat-Workflow (Motor Conversacional)
- **URL Webhook:** `.../webhook/chat`
- **Qué hace:** Pantalla de Chat envía la pregunta -> Trigger la pasa al Agente Inteligente -> El Agente Inteligente analiza la pregunta y la memoria del chat -> Si el Agente considera que necesita buscar archivos para dar datos precisos, usa la "Herramienta Vector Store" conectada a Qdrant -> Recopila los párrafos relevantes -> Construye una respuesta final y la devuelve al Chat.
- **Estado actual:** Configurado, pendiente de test end-to-end.

---

## 5. End-to-End Testing (Tu próxima misión)

Para estar tú (y todos) seguros de que el sistema está 100% libre de bugs, solo tienes que seguir esta prueba maestro combinada, y lo vas a hacer íntegramente desde tu ordenador (**Localhost**), porque es allí donde es más fácil detectar fallos.

**Paso 1: Activar "Los Motores"**
Ve al portal de n8n. Entra uno por uno a los 3 workflows (Ingest, Delete, Chat) y asegúrate de que el **interruptor "Active"** que está arriba a la derecha está encendido en verde.

**Paso 2: Ingesta**
1. Abre un navegador y ve a `http://localhost:3000/admin`.
2. Sube un documento PDF (algo cuyo contenido conozcas muy bien).
   - *Verificación (Opcional):* Ve a n8n -> Menú lateral Executions -> Busca la ejecución de "Ingest" y mira si está todo en *Success*.

**Paso 3: Conversación**
3. Ve a `http://localhost:3000/`.
4. Habla con el chat. Pregúntale cosas en bruto: *"Resume el documento que acabo de subir", "¿Qué dice el documento sobre X?".*
   - *Verificación (Opcional):* Ve a n8n -> Executions -> Entra al flujo de "Chat" para ver el prompt interno que se ha generado y qué fuentes y puntajes de similitud le ha devuelto Qdrant.

**Paso 4: Eliminación y Prueba de Amnesia**
5. Vuelve a `http://localhost:3000/admin`.
6. Pulsa en la "Papelera" junto al documento que subiste para eliminarlo.
   - *Verificación (Opcional):* n8n -> Executions -> Workflow Delete -> Todo debería estar *Success*.
7. Vuelve al chat (`http://localhost:3000/`) y empieza una conversación nueva. Haz la misma pregunta de antes. Ahora la IA **NO debería** saber la respuesta, indicando que el borrado ha sido un éxito integral.

> **Meta Conseguida:**
> Si consigues completar estos 4 pasos en Localhost y todo funciona perfecto, **la gran Fase 6 está oficialmente terminada y estabilizada.** Como EasyPanel lee exactamente el mismo código que estás probando en local (excepto que allí las variables de entorno están guardadas y ocultas en el panel), la puesta en producción en la demo pública tardará apenas los 2 minutos de hacer un `git push production master`.
