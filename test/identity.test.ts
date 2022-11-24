import test from 'ava';
// import { getResolver } from '../src/index.js';
import is from '../src/index.js';

import { Resolver } from 'did-resolver';

test('Create the server', async (t) => {
	const isResolver = is.getResolver();
	t.assert(isResolver != null);

	//If you are using one method you can simply pass the result of getResolver( into the constructor
	const resolver = new Resolver(isResolver);
	let didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f218');

	t.assert(didResolution.didResolutionMetadata.error == 'notFound');

	didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');
	t.assert(didResolution.didDocument?.id == 'did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');

	// TODO: The Blockcore Wallet will be able to resolve multiple, so use the below code:
	//If you are using multiple methods you need to flatten them into one object
	// const resolver = new Resolver({
	// 	...ethrResolver,
	// 	...webResolver,
	// });
});
