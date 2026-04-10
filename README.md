# MESH Gender API

A REST API that predicts the gender of a name using the [Genderize.io](https://genderize.io) API.

## Tech Stack

- Node.js
- Express
- Axios
- Zod

## Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
npm install
```

### Run the server

```bash
# Development
npm run dev

# Production
npm start
```

The server runs on `http://localhost:3000` by default.

## API Reference

### Classify Name

```
GET /api/classify?name={name}
```

**Query Parameters**

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| name      | string | Yes      | The name to classify |

**Success Response (200)**

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}
```

> `is_confident` is `true` when `probability >= 0.7` AND `sample_size >= 100`

**Error Responses**

| Status | Message |
|--------|---------|
| 400 | Missing or empty name parameter |
| 422 | name must be a string |
| 200 | No prediction available for the provided name |
| 502 | Upstream API request failed |
| 500 | Internal server error |

All errors follow this structure:

```json
{
  "status": "error",
  "message": "<error message>"
}
```

## Example Requests

```bash
# Valid request
curl "http://localhost:3000/api/classify?name=John"

# Missing name
curl "http://localhost:3000/api/classify"

# Empty name
curl "http://localhost:3000/api/classify?name="
```
