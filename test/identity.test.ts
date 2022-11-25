import test from 'ava';
// import { getResolver } from '../src/index.js';
import is from '../src/index.js';

import { Resolver } from 'did-resolver';

function sleep(durationInMillisecond: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, durationInMillisecond));
}

test('Create the server', async (t) => {
	const isResolver = is.getResolver();
	t.assert(isResolver != null);

	//If you are using one method you can simply pass the result of getResolver( into the constructor
	const resolver = new Resolver(isResolver);
	let didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f218');

	t.assert(didResolution.didResolutionMetadata.error == 'notFound');

	didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');
	t.assert(didResolution.didDocument?.id == 'did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');
});

test('Create the server and wait for resolve', async (t) => {
	const isResolver = is.getResolver();
	t.assert(isResolver != null);

	// Wait until the decentralized DNS lookup has completed:
	await sleep(1000);

	//If you are using one method you can simply pass the result of getResolver( into the constructor
	const resolver = new Resolver(isResolver);
	let didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f218');

	t.assert(didResolution.didResolutionMetadata.error == 'notFound');

	didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');
	t.assert(didResolution.didDocument?.id == 'did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f217');
});
