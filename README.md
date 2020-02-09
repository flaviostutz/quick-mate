# Quick Bate

Realtime video chat, message and file sharing for your attendants to go.

## Usage

* Create docker-compose.yml

```yml
version: "3"

services:
  quick-bate:
    build: .
    image: flaviostutz/quick-bate
    ports:
      - 8080:8080
```

* Run ```docker-compose up -d```

* Open the customer browser to http://localhost:8080
  * A number will be shown

* Open the attendant browser to http://localhost:8080/attendant
  * Type the number on customer browser to connect to him

