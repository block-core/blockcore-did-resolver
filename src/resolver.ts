import { DIDResolutionOptions, DIDResolutionResult, DIDResolver, ParsedDID, Resolvable } from 'did-resolver';
import { BlockcoreDns } from '@blockcore/dns';

export function getResolver(): Record<string, DIDResolver> {
	return new BlockcoreDidResolver().build();
}

export class BlockcoreDidResolver {
	private identityServiceDomain = 'https://id.blockcore.net';

	async resolve(
		did: string,
		parsed: ParsedDID,
		_resolver: Resolvable,
		_options: DIDResolutionOptions,
	): Promise<DIDResolutionResult> {
		const fetchUrl = `${this.identityServiceDomain}/1.0/identifiers/did:is:${parsed.id}`;

		const didResolutionResponse = await fetch(fetchUrl, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const didResolution: DIDResolutionResult = await didResolutionResponse.json();
		return didResolution;
	}

	/** Since the resolver is not async, we must simply fire and forget the initial load operation. */
	load() {
		// Initialize the DNS and get "Identity" services.
		const dns = new BlockcoreDns();
		dns.load(undefined, 'Identity').then(() => {
			// If successful, randomly pick one of the 'Identity' services that are available among all nameservers.
			const services = dns.getServices().filter((s) => s.online);

			// If there are no online services, use the default fallback.
			if (services.length === 0) {
				return;
			}

			const randomServiceIndex = this.getRandomInt(services.length);

			if (services[randomServiceIndex]?.domain) {
				this.identityServiceDomain = 'https://' + services[randomServiceIndex]?.domain;
			}
		});
	}

	private getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	build(): Record<string, DIDResolver> {
		// Fire and forget
		this.load();

		return { is: this.resolve.bind(this) };
	}
}
