# hooko

[![Build Status](https://travis-ci.org/fidemapps/hooko.svg?branch=master)](https://travis-ci.org/fidemapps/hooko)
[![Dependency Status](https://david-dm.org/fidemapps/hooko.svg?theme=shields.io)](https://david-dm.org/fidemapps/hooko)
[![devDependency Status](https://david-dm.org/fidemapps/hooko/dev-status.svg?theme=shields.io)](https://david-dm.org/fidemapps/hooko#info=devDependencies)

Configurable Web Hook server.

## Setup

To setup environement you must have [fig](http://www.fig.sh/) installed.

### Environment variables

To start the project you must specify several environment variables:

- AWS_REGION
- AWS_ACCESS_KEY
- AWS_SECRET
- QUEUE_NAME

### Run database

```
fig up -d db
```

### Run server

You could start it automatically using:

```
fig up -d
```

Else you can run each process individually:

```
./bin/hooko-api
./bin/hooko-worker
```

### Run tests

To run tests, you must have a complete server running. Then you can run test using `npm test` and by specifying the API url:

```
./bin/hooko-api | bunyan
env HOOKO_API_URL=http://0.0.0.0:3000 ./bin/hooko-worker | bunyan
env HOOKO_API_URL=http://0.0.0.0:3000 ./bin/hooko-scheduler | bunyan
env HOOKO_API_URL=http://0.0.0.0:3000 QUEUE_NAME=hooko-custom ./bin/hooko-worker | bunyan
```

```
npm test
```

## HTTP API

### Bundles

#### GET /api/bundles

List all bundles.

#### POST /api/bundles

Create a new bundle.

#### PATCH /api/bundles/:name

Update a bundle.

#### DELETE /api/bundles/:name

Delete a bundle.

### Hooks

#### GET /api/bundles/:name/hooks

List all hooks of a specific bundle.

#### POST /api/bundles/:name/hooks

Create a hook associated to the bundle.

#### PATCH /api/bundles/:name/hooks/:id

Update a hook.

#### DELETE /api/bundles/:name/hooks/:id

Delete a hook.

### Actions

#### GET /api/actions?bundle&name&state

List actions.

#### POST /api/actions

Trigger an action.

### Database

#### POST /api/db/reset

Reset all database.

## Specifications

- [Specifications](https://docs.google.com/document/d/1gWVtMaKpx0KGD6qQz9thlCWgTTffryhS4xJAEbo4Keg/edit?usp=sharing)

## License

MIT
