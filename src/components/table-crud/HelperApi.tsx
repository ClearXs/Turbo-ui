import { Entity } from '@/api';
import { HelperApi, TableContext } from './interface';

export default class HelperApiImpl<T extends Entity> implements HelperApi<T> {
  constructor(private tableContext: TableContext<T>) {}

  getId(entity: T): T['id'] {
    return entity[this.tableContext.idKey];
  }

  index(id: T['id']): number {
    return this.tableContext.dataSource.findIndex((r) => this.getId(r) === id);
  }

  indexOfEntity(entity: T): number {
    return this.tableContext.dataSource.findIndex(
      (r) => this.getId(r) === this.getId(entity),
    );
  }
}
