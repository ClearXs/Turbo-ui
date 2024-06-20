import { IdEntity } from '@/api';
import { InlineEditorApi, TableContext } from './interface';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import _ from 'lodash';
import { Toast } from '@douyinfe/semi-ui';

export default class InlineEditorApiImpl<T extends IdEntity>
  implements InlineEditorApi<T>
{
  formApi?: FormApi<{ data: T[] }>;
  constructor(private tableContext: TableContext<T>) {}

  open(id: T['id']): void {
    this.tableContext.inlineEditor.modCount += 1;
    this.tableContext.inlineEditor.editing.set(id, true);
  }

  save(id: T['id']): void {
    if (_.isEmpty(this.formApi)) {
      throw new Error('failed inline editing, form api is empty.');
    }
    const values = this.formApi.getValues();
    const dataSource = values.data;
    const editingIndex = this.tableContext.helperApi.index(id);
    if (editingIndex < 0) {
      throw new Error('not found specifies id in dataSource index');
    }
    this.formApi
      .validate(['data'])
      .then((values) => {
        const record = values.data[editingIndex];
        this.onSave(id, record, editingIndex);
      })
      .catch((errors) => {
        if (!_.isEmpty(errors.data[editingIndex])) {
          Toast.error('failed validation!');
        } else {
          const record = dataSource[editingIndex];
          this.onSave(id, record, editingIndex);
        }
      });
  }

  onSave(id: T['id'], record: T, index: number): void {
    this.tableContext.tableApi.saveOrUpdate(
      record,
      { showMessage: false },
      {
        onSuccess: () => {
          this.finish(id);
          // sync change to tableContext data source
          this.tableContext.dataSource[index] = record;
        },
      },
    );
  }

  isEditing(id: T['id']): boolean {
    return this.tableContext.inlineEditor.editing.has(id);
  }

  contains(id: T['id']): boolean {
    return this.tableContext.inlineEditor.editing.has(id);
  }

  finish(id: T['id']): void {
    this.tableContext.inlineEditor.editing.delete(id);
  }

  clear(): void {
    this.tableContext.inlineEditor.editing.clear();
  }

  hasElement(): boolean {
    return this.tableContext.inlineEditor.editing.size > 0;
  }

  setFormApi(formApi: FormApi<{ data: T[] }>): void {
    this.formApi = formApi;
  }
}
