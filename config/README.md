An environment specific configuration file, e.g. **dev.json**, should contain the following properties:
``` json
{
    "auth": {
        "google": {
            "clientID": "<client ID>",
            "clientSecret": "<client secret>"
        }
    },
    "db": {
        "mongo": {
            "uri": "<MongoDB URI>"
        }
    }
}
```