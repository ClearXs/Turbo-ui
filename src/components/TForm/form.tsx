import { IdEntity } from '@/api/interface';
import {
  ColumnType,
  FormColumnProps,
  FormContext,
  FormDateColumnProps,
  FormInputColumnProps,
  FormNumberColumnProps,
  FormProps,
  FormRadioColumnProps,
  FormSelectColumnProps,
  FormTextAreaColumnProps,
  FormTreeSelectColumnProps,
} from './interface';
import {
  Avatar,
  Form,
  Modal,
  Radio,
  RadioGroup,
  Space,
  Tag,
} from '@douyinfe/semi-ui';
import IconList from '@/pages/develop/icon';
import { IconCamera } from '@douyinfe/semi-icons';
import { directGetIcon } from '../Icon';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { ReactNode } from 'react';
import { TagColor } from '@douyinfe/semi-ui/lib/es/tag';

export interface FormColumnDecorator<T extends IdEntity> {
  /**
   * 通过把column渲染为Form组件
   * @param column table字段实体
   * @param type 区分column是搜索还是表单渲染
   */
  render(column: FormColumnProps<T>, type: 'search' | 'form'): React.ReactNode;

  /**
   * 获取form context
   */
  getFormContext(): FormContext<T> | undefined;

  /**
   * 设置form context
   */
  setFormContext(formContext: FormContext<T>): void;
}

export interface FormField<T extends IdEntity, K extends FormColumnProps<T>> {
  /**
   * 通过把column渲染为Form组件
   * @param type 区分column是搜索还是表单渲染
   */
  render: (column: K, type: 'search' | 'form') => React.ReactNode | undefined;
}

export abstract class BaseFormField<
  T extends IdEntity,
  K extends FormColumnProps<T>,
> implements FormField<T, K>
{
  constructor(protected decorator: FormColumnDecorator<T>) {}

  private placeholderPrefix: Record<ColumnType, string> = {
    input: '请输入',
    number: '请输入',
    select: '请选择',
    treeSelect: '请选择',
    radio: '请选择',
    textarea: '请输入',
    icon: '',
    color: '',
    date: '请选择',
    undefined: '请输入',
  };

  public render(
    column: K,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    // 表单通用属性实现

    return this.doRender(column, type);
  }

  // 子类实现
  protected abstract doRender(
    column: K,
    type: 'search' | 'form',
  ): React.ReactNode | undefined;

  protected getGeneralProps(column: K, type: 'search' | 'form') {
    const field = column.field;
    const label = column.label;
    const placeholder = `${this.placeholderPrefix[column.type]}${label}!`;
    const rules = [
      ...(column.rules || []),
      {
        required: column.require && type === 'form',
        message: `请输入${placeholder}`,
      },
    ];

    return {
      key: field,
      label,
      field,
      rules,
      placeholder,
      extraText: column.extraText,
    };
  }

  /**
   * 获取字段类型
   */
  public abstract getType(): ColumnType;
}

export class InputFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormInputColumnProps<T>
> {
  doRender(
    column: FormInputColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Input {...props} />;
  }

  public getType(): ColumnType {
    return 'input';
  }
}

export class NumberFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormNumberColumnProps<T>
> {
  doRender(
    column: FormNumberColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.InputNumber {...props} />;
  }

  public getType(): ColumnType {
    return 'number';
  }
}

export class SelectFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormSelectColumnProps<T>
> {
  doRender(
    column: FormSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();
    const dic = column.dic;
    if (dic) {
      const dics = formContext?.dicValues[dic] || [];
      return (
        <Form.Select {...props} multiple={column.multiple} filter>
          {dics.map((dic) => {
            return (
              <Form.Select.Option value={dic.value} showTick key={dic.value}>
                <Tag size="large" color={dic.tag}>
                  {dic.label}
                </Tag>
              </Form.Select.Option>
            );
          })}
        </Form.Select>
      );
    } else {
      return (
        <Form.Select
          {...props}
          optionList={column.optionList}
          filter={column.filter || true}
          multiple={column.multiple}
        />
      );
    }
  }

  public getType(): ColumnType {
    return 'select';
  }
}

export class TreeSelectFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormTreeSelectColumnProps<T>
> {
  doRender(
    column: FormTreeSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    let data = column.treeData;
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getFormContext());
    } else {
      data = column.treeData as TreeNodeData[];
    }
    return (
      <Form.TreeSelect
        {...props}
        treeData={data}
        filterTreeNode={column.filterTreeNode}
        multiple={column.multiple}
        showClear={column.showClear || true}
        showSearchClear={column.showSearchClear || true}
        expandAll={column.expandAll}
      />
    );
  }

  public getType(): ColumnType {
    return 'treeSelect';
  }
}

export class RadioFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormRadioColumnProps<T>
> {
  doRender(
    column: FormTextAreaColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Radio {...props} />;
  }

  public getType(): ColumnType {
    return 'radio';
  }
}

export class TextAreaFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormTextAreaColumnProps<T>
> {
  doRender(
    column: FormTextAreaColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TextArea {...props} />;
  }

  public getType(): ColumnType {
    return 'textarea';
  }
}

export class IconFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormColumnProps<T>
> {
  doRender(
    column: FormColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const isDetails = this.decorator.getFormContext()?.type === 'details';
    return (
      <>
        <Form.Slot label={props.label}>
          <Avatar
            alt="Alice Swift"
            size="small"
            shape="square"
            onClick={() => {
              if (isDetails) {
                return;
              }
              const modal = Modal.info({
                size: 'medium',
                title: 'Icon Resources',
                content: (
                  <IconList
                    chooseIcon={(icon) => {
                      const formContext = this.decorator.getFormContext();
                      const values = { ...formContext?.values } || {};
                      values[props.field] = icon;
                      const newContext = {
                        ...formContext,
                        visible: true,
                        values,
                      };
                      formContext?.newContext(newContext as FormContext<T>);
                      formContext?.formApi?.setValue(props.field, icon);
                      modal.destroy();
                    }}
                    showName={false}
                    splitNum={3}
                  />
                ),
                footer: null,
              });
            }}
            hoverMask={
              !isDetails && (
                <div
                  style={{
                    backgroundColor: 'var(--semi-color-overlay-bg)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCamera />
                </div>
              )
            }
          >
            {directGetIcon(
              this.decorator.getFormContext()?.values?.[props.field],
            )}
          </Avatar>
        </Form.Slot>
      </>
    );
  }

  public getType(): ColumnType {
    return 'icon';
  }
}

export class ColorFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormColumnProps<T>
> {
  private colorList = [
    'amber',
    'blue',
    'cyan',
    'green',
    'grey',
    'indigo',
    'light-blue',
    'light-green',
    'lime',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'violet',
    'yellow',
    'white',
  ] as TagColor[];

  protected doRender(
    column: FormColumnProps<T>,
    type: 'search' | 'form',
  ): ReactNode {
    const props = this.getGeneralProps(column, type);

    return (
      <Form.Slot label={props.label}>
        <Space wrap>
          <RadioGroup
            type="pureCard"
            mode="advanced"
            disabled={this.decorator.getFormContext()?.type === 'details'}
            value={this.decorator.getFormContext()?.values?.[props.field]}
            onChange={(e) => {
              const formContext = this.decorator.getFormContext();
              const { value } = e.target;
              const values = { ...formContext?.values } || {};
              values[props.field] = value;
              const newContext = {
                ...formContext,
                visible: true,
                values,
              };
              formContext?.newContext(newContext as FormContext<T>);
              formContext?.formApi?.setValue(props.field, value);
            }}
          >
            {this.colorList.map((item) => (
              <Radio
                value={item}
                extra={
                  <Tag
                    color={item}
                    key={item}
                    shape="circle"
                    type="solid"
                    style={{ padding: '2px 10px' }}
                  />
                }
              />
            ))}
          </RadioGroup>
        </Space>
      </Form.Slot>
    );
  }

  public getType(): ColumnType {
    return 'color';
  }
}

export class DateFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormDateColumnProps<T>
> {
  protected doRender(
    column: FormDateColumnProps<T>,
    type: 'form' | 'search',
  ): ReactNode {
    const props = this.getGeneralProps(column, type);
    if (type === 'form') {
      return (
        <Form.DatePicker
          {...props}
          type={column.dateType || 'dateTime'}
          format="yyyy-MM-dd HH:mm:ss"
          presets={[
            {
              text: '昨天',
              start: new Date(new Date().valueOf() - 1000 * 3600 * 24),
              end: new Date(new Date().valueOf() - 1000 * 3600 * 24),
            },
            {
              text: '当前时间',
              start: new Date(),
              end: new Date(),
            },
            {
              text: '明天',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24),
            },
            {
              text: '下周',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
            },
            {
              text: '15天后',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
            },
            {
              text: '1个月后',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
            },
          ]}
        />
      );
    } else if (type === 'search') {
      return (
        <Form.DatePicker
          {...props}
          type="dateRange"
          format="yyyy-MM-dd HH:mm:ss"
          presets={[
            {
              text: '昨天',
              start: new Date(new Date().valueOf() - 1000 * 3600 * 24),
              end: new Date(),
            },
            {
              text: '当前时间',
              start: new Date(),
              end: new Date(),
            },
            {
              text: '明天',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24),
            },
            {
              text: '下周',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
            },
            {
              text: '15天后',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
            },
            {
              text: '1个月后',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
            },
          ]}
        />
      );
    }
  }

  public getType(): ColumnType {
    return 'date';
  }
}

export class UndefinedFormField<T extends IdEntity> extends BaseFormField<
  T,
  any
> {
  doRender(column: FormProps<T>, type: 'search' | 'form'): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'undefined';
  }
}

export class FormColumnFactory {
  public static get<T extends IdEntity, K extends FormColumnProps<T>>(
    type: ColumnType,
    decorator: FormColumnDecorator<T>,
  ): FormField<T, K> {
    switch (type) {
      case 'input':
        return new InputFormField<T>(decorator);
      case 'number':
        return new NumberFormField<T>(decorator);
      case 'select':
        return new SelectFormField<T>(decorator);
      case 'treeSelect':
        return new TreeSelectFormField<T>(decorator);
      case 'radio':
        return new RadioFormField<T>(decorator);
      case 'textarea':
        return new TextAreaFormField<T>(decorator);
      case 'icon':
        return new IconFormField<T>(decorator);
      case 'color':
        return new ColorFormField<T>(decorator);
      case 'date':
        return new DateFormField<T>(decorator);
      case 'undefined':
        return new UndefinedFormField<T>(decorator);
      default:
        return new UndefinedFormField<T>(decorator);
    }
  }
}

export class FormColumnDecoratorImpl<T extends IdEntity>
  implements FormColumnDecorator<T>
{
  constructor(private formContext?: FormContext<T>) {}

  render(column: FormColumnProps<T>, type: 'search' | 'form'): ReactNode {
    return FormColumnFactory.get<T, FormColumnProps<T>>(
      column.type,
      this,
    )?.render(column, type);
  }
  getFormContext(): FormContext<T> | undefined {
    return this.formContext;
  }
  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
  }
}

export function getFormColumnDecorator<T extends IdEntity>(
  formContext?: FormContext<T>,
): FormColumnDecorator<T> {
  return new FormColumnDecoratorImpl<T>(formContext);
}
