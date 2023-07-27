import type { z } from 'zod';
import type { LiteralType } from './parser_ast';

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

  async get(key: keyof T, def: LiteralType, path: string[]): Promise<LiteralType> {
    if (this.cache.has(key)) {
      return this.path(this.cache.get(key), def, path);
    } else {
      const source = this.sources[key];

      try {
        const json = source.schema.parse(await this.fetchWithTimeout(source.url(this.urlData)));
        this.cache.set(key, json);
        return this.path(json, def, path);
      } catch {
        throw new Error('Requested data is not available right now');
      }
    }
  }

  private path(obj: any, def: LiteralType, path: string[]) {
    let result = obj;

    for (const p of path) {
      if (p in result) {
        result = result[p];
      } else {
        result = def;
      }
    }

    return result;
  }
}
