# INFRASTRUCTURE ANALYSIS

## Overview
The VPS has been provisioned via EasyPanel on Hetzner. The services deployed align perfectly with an enterprise-grade RAG architecture.

## Services & Endpoints
1.  **n8n (Orchestrator)**
    - URL: `https://n8n.toolbox-demo.com`
    - Status: Operative.
    - Notes: Needs confirmation of `WEBHOOK_URL` env var.
2.  **PostgreSQL (Relational DB)**
    - Internal Host: `toolbox-demo_toolbox-demo-postgres:5432`
    - Action: Needs `toolbox_db` created and a dedicated user `toolbox_app`.
3.  **Qdrant (Vector DB)**
    - Internal Host: `toolbox-demo-qdrant:6333` (assuming default EasyPanel naming)
    - Auth: API Key `9dskfj29dj29dj29dj29d`
    - Status: Ready for n8n Embedding storage.
4.  **MinIO (S3 Object Storage)**
    - API URL: `https://storage.toolbox-demo.com`
    - Auth: `toolbox_admin` / `Jd83kd92!dks92Kd`
    - Action: Needs a bucket `documents` created and a dedicated policy/user.
5.  **LLM Provider**
    - Account: OpenRouter (Credit added by Jose).
    - Status: Needs API Key generation and credential injection into n8n.

## Next Steps for Architecting
With this infrastructure, we no longer need local file-system storage for PDFs. The ingest workflow should:
1. Upload the PDF to MinIO (S3).
2. Read from MinIO into n8n.
3. Process (Chunking + Embedding via OpenRouter/OpenAI).
4. Store in Qdrant.
