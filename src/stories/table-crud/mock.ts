import { GeneralApi, GeneralParams, Pagination, R } from '@/api';
import { Sample } from '../interface';

export class MockGeneralApi implements GeneralApi<Sample> {
  constructor(
    private data: Sample[] = [],
    private key: string = 'id',
  ) {}

  save(entity: Partial<Sample>): Promise<R<boolean>> {
    if (entity[this.key] === undefined) {
      entity[this.key] = this.data.length;
    }
    this.data.push(entity);
    return Promise.resolve(this.mockReturn<boolean>(true));
  }

  edit(entity: Partial<Sample>): Promise<R<boolean>> {
    const index = this.data.findIndex(
      (value) => value[this.key] === entity[this.key],
    );
    if (index < 0) {
      return Promise.resolve(this.mockReturn(false));
    }
    this.data[index] = entity;
    return Promise.resolve(this.mockReturn(true));
  }

  saveOrUpdate(entity: Partial<Sample>): Promise<R<boolean>> {
    if (entity[this.key] === undefined) {
      return this.save(entity);
    }
    return this.edit(entity);
  }

  batchSaveOrUpdate(entity: Partial<Sample>[]): Promise<R<boolean>> {
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

  details(id: string): Promise<R<Sample>> {
    const entity = this.data.find((value) => value[this.key] === id);
    return Promise.resolve(this.mockReturn(entity));
  }

  import(file: any): Promise<R<boolean>> {
    return Promise.resolve(this.mockReturn(false));
  }

  export(params?: GeneralParams<Sample>): Promise<any> {
    return Promise.resolve(this.mockReturn(false));
  }

  list(params?: GeneralParams<Sample>): Promise<R<Sample[]>> {
    return Promise.resolve(this.mockReturn(this.data));
  }
  page(
    page: Pagination<Sample>,
    params?: GeneralParams<Sample>,
  ): Promise<R<Pagination<Sample>>> {
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
