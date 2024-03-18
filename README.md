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
                    // overwrites whatever is set in head.json
                },
                "copy": {
                    "en": {
                        "title": "Home" // overrides the copy "title" with the value "Home"
                    }
                }
            },
            {
                "tpl": "text", // template file (without extension, always lowercase)
                "data": { // optional generic data object
                    "numbers": [1, 2, 3]
                },
                "copy": { // optional data used in the template
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
        // ...
    },
    "copy": {
        "en": {
            "title": "Welcome to Pirsch"
        },
        "de": {
            "title": "Willkommen bei Pirsch"
        }
    }
}
```

## Building CSS

The CSS is built by Sass in the `style` directory. Run `npm i` to install Sass and then `npm run watch` during development. The generated CSS files are stored in `static/css' and must be committed to the repository.
