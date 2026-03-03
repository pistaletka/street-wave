# Streetwave Site — Project Guide

## Notion Integration

This project has access to the Notion workspace "Галя Пісталетка's Space" via API.

- **Token**: `ntn_P81289302519RR9vIsh4Tj4f5N0HmcDm8aUjTSQEDEM8Pu`
- **Integration name**: Claude
- **Databases**: Documents, Projects, Tasks

To use Notion, run the `/notion` skill or use `curl` with the Notion API.

### Quick reference
- **Search**: `POST /v1/search` — find pages and databases
- **Query DB**: `POST /v1/databases/{id}/query` — list rows with filters
- **Create page**: `POST /v1/pages` — add rows to a database
- **Update page**: `PATCH /v1/pages/{id}` — modify properties
- **Read content**: `GET /v1/blocks/{id}/children` — get page blocks

### Before first use
Databases must be shared with the "Claude" integration in Notion UI:
Database page → "..." → Connections → Connect to → Claude

All API calls require headers:
```
Authorization: Bearer ntn_P81289302519RR9vIsh4Tj4f5N0HmcDm8aUjTSQEDEM8Pu
Notion-Version: 2022-06-28
```
