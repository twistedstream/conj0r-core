# Sample

This directory contains a [sample usage](index.js) of `conj0r-core`.

Be careful running this sample in your Auth0 tenant as it will perform irreversable actions on that tenant.

## Setup

Create a `.env` file in the `sample` directory with the following contents:

```
AUTH0_TENANT=yourtenant
AUTH0_DOMAIN=yourtenant.auth0.com
GLOBAL_CLIENT_ID=global-client-id
GLOBAL_CLIENT_SECRET=global-client-secret
CONJ0R_CLIENT_ID=non-interactive-client-id
CONJ0R_CLIENT_SECRET=non-interactive-client-secret
WEBTASK_TOKEN=your-tenant-webtask-token
AUTHZ_EXTENSION_ID=adf6e2f2b84784b57522e3b19dfc9201
```

## Run

`npm run sample`