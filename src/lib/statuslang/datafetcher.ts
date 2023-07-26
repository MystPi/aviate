import type { z } from 'zod';

export type DataSources<D> = Record<string, DataSource<D>>;

interface DataSource<D> {
  url: (data: D) => string;
  schema: z.Schema;
}

export class DataFetcher<T extends DataSources<D>, D> {
  private readonly sources: T;
  private readonly cache: Map<keyof T, unknown> = new Map();
  private readonly timeout: number;
  private readonly urlData: D;

  constructor(sources: T, urlData: D, timeout = 5000) {
    this.sources = sources;
    this.urlData = urlData;
    this.timeout = timeout;
  }

  private async fetchWithTimeout(url: string) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res.json();
  }

  async get<K extends keyof T>(key: K): Promise<z.infer<T[K]['schema']>> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const source = this.sources[key];
    let json: unknown;

    try {
      json = source.schema.parse(await this.fetchWithTimeout(source.url(this.urlData)));
    } catch {
      throw new Error('Requested data is not available right now');
    }

    this.cache.set(key, json);
    return json;
  }
}
