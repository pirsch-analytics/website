# pirsch.io

The website for pirsch.io.

## Structure

The directory structure is as follows:

| Directory | Description |
| - | - |
| content/ | Recursive content files in JSON format. |
| static/ | Static content (will be served as is on `/static/`). |
| style/ | Sass npm project compiling the output to `static/css/` |
| tpl/ | Recursive Golang template files. |

The JSON structure for a content file is as follows:

```json
{
    "path": {
        "en": "/", // /404 is a special case serving the 404 not found page
        "de": "/de"
    },
    "sitemap": {
        "priority": "1.0" // default is 1.0
    },
    "header": { // optional list of headers
        "X-Frame-Options": "deny"
    },
    "handler": "custom_handler", // sets a custom handler defined on the backend
    "analytics": { // optional analytics meta data
        "tags": {
            "key": "value"
        }
    },
    "content": {
        "content": [
            {
                "ref": "head", // references to a standalone element (JSON file without extension, always lowercase)
                "data": {
                    "en": {
                        "title": "Home" // overrides the variable "title" with the value "Home"
                    }
                }
            },
            {
                "tpl": "text", // template file (without extension, always lowercase)
                "data": { // optional data used in the template
                    "en": {
                        "headline": "Welcome!",
                        "text": "To pirsch.io."
                    },
                    "de": {
                        "headline": "Willkommen!",
                        "text": "Bei pirsch.io."
                    }
                },
                "content": {
                    "children": [ /* ... */ ]
                }
            }
        ]
    }
}
```

Standalone elements are use the same structure as pages, but do not specify paths. Here is an example:

```json
{
    "tpl": "head",
    "data": {
        "en": {
            "title": "Welcome to Pirsch"
        },
        "de": {
            "title": "Willkommen bei Pirsch"
        }
    }
}
```
