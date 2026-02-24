# Contexto Fase 5: Preparación de Demo

## Situación Actual
La aplicación es funcional en su núcleo (Fase 4 completada con persistencia de backend y autenticación), pero fue evaluada de cara a una **demostración en vivo a un cliente**. En este escenario de alto valor, se requiere un flujo de trabajo pulido donde el cliente pueda subir sus PDFs, consultar sobre ellos con aislamiento total de otros contextos, recibir respuestas con citas formateadas y poder hacerlo todo fluido desde un navegador móvil.

Actualmente existen cuatro brechas críticas (gaps) que bloquean la viabilidad de la demo:

1. **Aislamiento de Contexto (Lienzo en Blanco):** No existe un botón físico ni un mecanismo subyacente en el Admin para eliminar documentos y limpiar el Vector Store de n8n, lo que provoca la acumulación de contexto entre diferentes clientes y resta privacidad/exclusividad a la demo.
2. **Interpretación de Evidencias (Citas):** El LLM emite sus respuestas con formato Markdown estructurado (negritas, enlaces, referencias a las páginas del PDF), pero nuestro componente `MessageList.tsx` las plasma en texto plano, perdiendo el valor diferencial de "transparencia de IA".
3. **Usabilidad Móvil (Viewport):** La altura del chat depende de un estático `100vh`. En dispositivos móviles (iOS Safari, Android Chrome), la barra de navegación provoca que el input de texto quede oculto o desplazado por debajo del teclado, haciendo imposible chatear de forma natural.
4. **Alucinaciones en Demo (Estrictez de RAG):** Se requiere que la IA se ciña exclusivamente a los PDFs proporcionados. (A nivel técnico, esto será subsanado a través de configurar un System Prompt estricto y la integración del historial a través del Window Buffer Memory de n8n, lo cual se abordará formalmente en una fase de workflow puro o se tuneará manualmente en el Admin UI).

## Objetivos Arquitectónicos
*   **Implementar un endpoint de borrado (`DELETE /api/docs/:id`):** Deberá actualizar el `docs.json` local (estado mock) y lanzar una petición paralela a un nuevo Webhook de n8n (Delete Workflow) para limpiar el Vector Store de Pinecone/Qdrant asociado a ese tenant.
*   **Integrar `react-markdown`:** Procesamiento seguro de texto enriquecido en el listado de mensajes del chat para resaltar las fuentes.
*   **Migrar a `100dvh` y `flex-1`:** Ajuste CSS moderno para garantizar que la barra superior, el historial y el input respeten los márgenes seguros físicos del dispositivo móvil.

## Entregables
- Nuevo botón (Trash icon) en cada fila de documento en `AdminPage.tsx`.
- Endpoint DELETE en `/api/docs/route.ts` (con la simulación mock ajustada y llamada al webhook externa preparada).
- Actualizar `package.json` instalando `react-markdown`. Modificar `MessageList.tsx` para parsearlo.
- Refactor CSS en `ChatInterface.tsx` y `layout.tsx` para corregir la experiencia móvil.
