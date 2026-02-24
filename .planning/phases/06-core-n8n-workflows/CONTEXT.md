# Contexto Fase 6: Core n8n Workflows

## Situación Actual
Tenemos un panel de administración en Next.js capaz de subir documentos (interceptados actualmente por un mock) y una interfaz de chat lista para renderizar citas en Markdown, conectada a puntos finales que aún no tienen lógica real de procesamiento de IA. 

Por el lado de la infraestructura, se nos ha provisto un VPS (Ubuntu con EasyPanel) que ya aloja la arquitectura subyacente: n8n (orquestador visual), Qdrant (Base de datos vectorial), MinIO (Object storage S3) y PostgreSQL.

## Objetivo Arquitectónico
Sustituir la simulación (mock) por motores reales de procesamiento RAG (Retrieval-Augmented Generation) mediante webhooks de n8n, creando los JSON exportables para que el usuario pueda importarlos de inmediato en su instancia.

Debemos diseñar 3 Webhooks:
1. **Ingestor (POST `/ingest-document`)**: Almacena el binario del PDF en MinIO, extrae texto, trocea (Chunking), obtiene Embebings (mediante OpenRouter) y los almacena en Qdrant asociados al `document_id`.
2. **Borrador (POST `/delete-document`)**: Limpia Qdrant ordenando el borrado de vectores según el `document_id`, y opcionalmente borra el PDF de MinIO.
3. **Bot / Retriever (POST `/chat`)**: Recibe la pregunta, historial y System Prompt. Convierte la pregunta en vector, busca en Qdrant los chunks similares, lo encapsula todo en un prompt completo, y llama al LLM en OpenRouter. Responde formateado en Markdown.

## Entregables
1. Carpeta `n8n/workflows/` con al menos 3 archivos JSON conteniendo el código fuente de los nodos.
2. Adaptación de las variables de entorno locales `.env` o `.env.local` en el proyecto Next.js para apuntar a los Webhooks de producción de n8n.
3. Modificar `src/app/api/ingest/route.ts`, `src/app/api/docs/[id]/route.ts` y `src/app/api/chat/route.ts` para que hagan `fetch` a las URL verdaderas y pasen los payloads estructurados, eliminando la lógica de "Mock" o "Simulación".
