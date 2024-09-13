import { GeneralParams, Pagination, R, Tree, TreeGeneralApi } from '@/api';
import { SampleTree } from '../interface';

export class MockTreeGeneralApi implements TreeGeneralApi<SampleTree> {
  constructor(
    private data: SampleTree[] = [],
    private key: string = 'id',
  ) {}

  tree(params?: GeneralParams<Tree> | undefined): Promise<R<SampleTree[]>> {
    return Promise.resolve(this.mockReturn<SampleTree[]>(this.data));
  }

  save(entity: Partial<SampleTree>): Promise<R<boolean>> {
    if (entity[this.key] === undefined) {
      entity[this.key] = this.data.length;
    }
    this.data.push(entity);
    return Promise.resolve(this.mockReturn<boolean>(true));
  }

  edit(entity: Partial<SampleTree>): Promise<R<boolean>> {
    const index = this.data.findIndex(
      (value) => value[this.key] === entity[this.key],
    );
    if (index < 0) {
      return Promise.resolve(this.mockReturn(false));
    }
    this.data[index] = entity;
    return Promise.resolve(this.mockReturn(true));
  }

  saveOrUpdate(entity: Partial<SampleTree>): Promise<R<boolean>> {
    if (entity[this.key] === undefined) {
      return this.save(entity);
    }
    return this.edit(entity);
  }

  batchSaveOrUpdate(entity: Partial<SampleTree>[]): Promise<R<boolean>> {
    for (const e of entity) {
      this.saveOrUpdate(e);
    }
    return Promise.resolve(this.mockReturn(true));
  }

  deleteEntity(ids: string[]): Promise<R<boolean>> {
    for (const id of ids) {
      const index = this.data.findIndex((value) => value[this.key] === id);
      if (index >= 0) {
        this.data = [
          ...this.data.slice(0, index - 1),
          ...this.data.slice(index, this.data.length - 1),
        ];
      }
    }
    return Promise.resolve(this.mockReturn(true));
  }

  details(id: string): Promise<R<SampleTree>> {
    const entity = this.data.find((value) => value[this.key] === id);
    return Promise.resolve(this.mockReturn(entity));
  }

  import(file: any): Promise<R<boolean>> {
    return Promise.resolve(this.mockReturn(false));
  }

  export(params?: GeneralParams<SampleTree>): Promise<any> {
    return Promise.resolve(this.mockReturn(false));
  }

  list(params?: GeneralParams<SampleTree>): Promise<R<SampleTree[]>> {
    return Promise.resolve(this.mockReturn(this.data));
  }
  page(
    page: Pagination<SampleTree>,
    params?: GeneralParams<SampleTree>,
  ): Promise<R<Pagination<SampleTree>>> {
    const current = Number(page.current);
    const size = Number(page.size);
    const length = this.data.length;
    const start = (current - 1) * size;
    const end = start + size > length - 1 ? length - 1 : start + size;
    const data = this.data.slice(start, end);
    return Promise.resolve(
      this.mockReturn({ current, size, records: data, total: length }),
    );
  }

  mockReturn<T>(data: T): R<T> {
    return { code: 200, data: data, message: 'Ok' };
  }
}
