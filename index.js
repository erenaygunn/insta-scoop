class CacheStrategy {
	async getCache(cacheKey) {
		throw new Error("getCache method must be implemented");
	}

	async setCache(cacheKey, data) {
		throw new Error("setCache method must be implemented");
	}
}

class ClientCacheStrategy extends CacheStrategy {
	async getCache(cacheKey) {
		if (typeof window !== "undefined") {
			const cachedData = localStorage.getItem(cacheKey);
			if (cachedData) {
				const { data, timestamp } = JSON.parse(cachedData);
				return { data, timestamp };
			}
		}
		return null;
	}

	async setCache(cacheKey, data) {
		if (typeof window !== "undefined") {
			localStorage.setItem(cacheKey, JSON.stringify(data));
		}
	}
}

class ServerCacheStrategy extends CacheStrategy {
	constructor() {
		super();
		this.cache = {};
	}

	async getCache(cacheKey) {
		return this.cache[cacheKey] || null;
	}

	async setCache(cacheKey, data) {
		this.cache[cacheKey] = data;
	}
}

class CacheStrategyFactory {
	static create() {
		if (typeof window !== "undefined") {
			return new ClientCacheStrategy();
		}
		return new ServerCacheStrategy();
	}
}

const cacheTTL = 60 * 60 * 1000; // 1 hour

export async function getInstagramMedia({ accountId, accessToken }) {
	if (!accountId || !accessToken) {
		throw new Error("Instagram account ID and access token are required.");
	}

	const cacheKey = `instagram_media_${accountId}`;
	const now = Date.now();
	const cacheStrategy = CacheStrategyFactory.create();

	// Try to get cached data
	const cached = await cacheStrategy.getCache(cacheKey);
	if (cached && now - cached.timestamp < cacheTTL) {
		return cached.data;
	}

	const instagramUrl = `https://graph.instagram.com/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink,like_count,comments_count,username&access_token=${accessToken}`;

	try {
		const response = await fetch(instagramUrl);
		if (!response.ok) {
			throw new Error(`Error fetching Instagram data: ${response.statusText}`);
		}

		const data = await response.json();

		// Cache the fetched data
		const cacheData = { data, timestamp: now };
		await cacheStrategy.setCache(cacheKey, cacheData);

		return data;
	} catch (error) {
		console.error("Error fetching Instagram data:", error);
		throw error;
	}
}
