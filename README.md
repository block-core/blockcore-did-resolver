# Blockcore DID Resolver (JS)

Library that helps resolve DID Documents (decentralized identities) from the "did:is" DID Method.

## Usage

```sh
npm install did-resolver @blockcore/did-resolver
```

```ts
import is from '@blockcore/did-resolver';
import { Resolver } from 'did-resolver';

const resolver = new Resolver(isResolver);
const didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');
```