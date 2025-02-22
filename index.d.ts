export interface InstagramMedia {
	id: string;
	caption?: string;
	media_type: string;
	media_url: string;
	thumbnail_url?: string;
	timestamp: string;
	permalink: string;
	like_count: number;
	comments_count: number;
	username: string;
}

export interface CacheData {
	data: InstagramMedia[];
	timestamp: number;
}

export function getInstagramMedia(params: {
	accountId: string;
	accessToken: string;
}): Promise<InstagramMedia[]>;

export class CacheStrategy {
	async getCache(cacheKey: string): Promise<CacheData | null>;
	async setCache(cacheKey: string, data: CacheData): Promise<void>;
}

export class ClientCacheStrategy extends CacheStrategy {
	async getCache(cacheKey: string): Promise<CacheData | null>;
	async setCache(cacheKey: string, data: CacheData): Promise<void>;
}

export class ServerCacheStrategy extends CacheStrategy {
	async getCache(cacheKey: string): Promise<CacheData | null>;
	async setCache(cacheKey: string, data: CacheData): Promise<void>;
}

export class CacheStrategyFactory {
	static create(): CacheStrategy;
}
