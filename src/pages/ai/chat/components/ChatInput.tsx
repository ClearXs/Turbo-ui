import { ModelOptions, Options, Variable } from '@/api/ai/chat';
import IconButton from '@/components/button/IconButton';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import {
  Button,
  Dropdown,
  MarkdownRender,
  Popover,
  SplitButtonGroup,
  Switch,
  Tag,
  TextArea,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import { TextAreaProps } from '@douyinfe/semi-ui/lib/es/input';
import { clone } from 'lodash';
import React, { useMemo } from 'react';
import { useState } from 'react';

const DEFAULT_OPTIONS: Options = {
  enableLimitHistoryMessages: true,
  maxHistoryMessageNums: 8,
};

const DEFAULT_MODEL_OPTIONS: ModelOptions = {
  manufacturer: 'ollama',
  address: 'http://localhost:11434',
  model: 'llama3.2:1b',
};

export type ChatInputApi = {
  clear: () => void;
  setText: (text: string) => void;
  getText: () => string | undefined;
};

export type SendParam = {
  text: string;
  options: Options;
  modelOptions: ModelOptions;
  variable: Variable;
};

export type ChatInputProps = TextAreaProps & {
  options?: Options;
  modelOptions?: ModelOptions;
  variable?: Variable;
  // click send callback
  onSend?: (params: SendParam) => void;
  onChangeOptions?: (options: Options) => void;
  onChangeModelOptions?: (modelOptions: ModelOptions) => void;
  onChangeVariable?: (variable: Variable) => void;
  getChatInputApi?: (api: ChatInputApi) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
  options,
  modelOptions,
  variable,
  onSend,
  onChangeOptions,
  onChangeModelOptions,
  onChangeVariable,
  getChatInputApi,
  ...props
}) => {
  const [useMicrophone, setUseMicrophone] = useState(false);
  const [useNetwork, setUseNetwork] = useState(false);
  const [useDeepSearch, setUseDeepSearch] = useState(false);
  const [useStreamMode, setUseStreamMode] = useState(true);

  const [chatOptions, setChatOptions] = useState<Options>(
    clone(options || DEFAULT_OPTIONS),
  );

  const [chatModelOptions, setChatModelOptions] = useState<ModelOptions>(
    clone(modelOptions || DEFAULT_MODEL_OPTIONS),
  );

  const [chatVariable, setChatVariable] = useState<Variable>(
    clone(variable || {}),
  );

  const [text, setText] = useState<string | undefined>('');

  const chatInputApi: ChatInputApi = useMemo(() => {
    return {
      clear: () => {
        setText(undefined);
      },
      setText: (text) => {
        setText(text);
      },
      getText: () => {
        return text;
      },
    };
  }, []);

  getChatInputApi?.(chatInputApi);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2 bg-[var(--semi-color-fill-0)] items-center align-middle justify-center p-2">
        <Popover
          trigger="hover"
          position="top"
          content={
            <div className="flex flex-col gap-2 bg-[var(--semi-color-fill-0)] w-96 p-2">
              <div>OpenAI</div>
              <div>ss</div>
            </div>
          }
        >
          <IconButton
            icon={
              <span className="icon-[arcticons--deepseek] h-6 w-6 bg-[#4d6afe]" />
            }
          />
        </Popover>
        <Tooltip content="上传图片">
          <IconButton
            icon={<span className="icon-[line-md--image-filled] h-6 w-6" />}
          />
        </Tooltip>

        {!useMicrophone ? (
          <Tooltip content="输入声音">
            <IconButton
              icon={
                <span className="icon-[carbon--microphone-filled] h-6 w-6" />
              }
              onClick={() => setUseMicrophone(true)}
            ></IconButton>
          </Tooltip>
        ) : (
          <Tooltip content="关闭声音">
            <IconButton
              icon={
                <span className="icon-[carbon--microphone-off-filled] h-6 w-6"></span>
              }
              onClick={() => setUseMicrophone(false)}
            ></IconButton>
          </Tooltip>
        )}
        <Popover
          trigger="hover"
          content={
            <div className="flex flex-col gap-2 w-96 bg-[var(--semi-color-fill-0)]">
              高级设置
            </div>
          }
          position="top"
        >
          <IconButton
            icon={<span className="icon-[rivet-icons--settings] h-5 w-5" />}
          ></IconButton>
        </Popover>

        <Popover
          trigger="hover"
          content={
            <div className="flex flex-col gap-2 w-96 bg-[var(--semi-color-fill-0)]">
              保留最多多少条历史消息
            </div>
          }
          position="top"
        >
          <IconButton
            icon={<span className="icon-[line-md--lightbulb-filled] h-5 w-5" />}
          ></IconButton>
        </Popover>

        <Popover
          trigger="hover"
          position="top"
          content={
            <div className="p-2 bg-[var(--semi-color-fill-0)]">
              <MarkdownRender
                raw={`##### 流模式
                - 流模式下，消息会实时显示，不会自动清空
                - 非流模式下，消息会自动清空`}
              ></MarkdownRender>
            </div>
          }
        >
          <IconButton
            onClick={() => setUseStreamMode(!useStreamMode)}
            icon={
              <span
                className={`icon-[fluent--stream-output-20-filled] h-6 w-6 ${useStreamMode && 'bg-[#4d6afe]'}`}
              />
            }
          ></IconButton>
        </Popover>

        <Popover
          trigger="hover"
          content={
            <div className="flex flex-col gap-2 w-96 bg-[var(--semi-color-fill-0)]">
              添加环境变量
            </div>
          }
          position="top"
        >
          <IconButton
            icon={<span className="icon-[eos-icons--env] h-5 w-5" />}
          ></IconButton>
        </Popover>

        <div className="ml-auto ">
          <Tooltip content="清空消息">
            <IconButton
              icon={<span className="icon-[iconoir--erase] h-5 w-5" />}
            />
          </Tooltip>
        </div>
      </div>
      <TextArea
        {...props}
        placeholder="请输入消息..."
        value={text}
        onChange={(value, e) => {
          props?.onChange?.(value, e);
          setText(value);
        }}
      ></TextArea>
      <div className="w-[100%] flex flex-row gap-2 bg-[var(--semi-color-fill-0)] p-2">
        <Button
          theme="borderless"
          icon={<span className="icon-[zondicons--network] h-4 w-4" />}
        >
          <div className="flex flex-row gap-2 justify-center items-center">
            <span>联网搜索</span>
            <Switch size="small"></Switch>
          </div>
        </Button>
        <Button
          theme="borderless"
          icon={<span className="icon-[mdi--atom] h-5 w-5" />}
          onClick={() => setUseDeepSearch(!useDeepSearch)}
        >
          <div className="flex flex-row gap-2 justify-center items-center">
            <span>深度搜索</span>
            <Switch
              size="small"
              onChange={(e, event) => event.stopPropagation()}
              checked={useDeepSearch}
            ></Switch>
          </div>
        </Button>
        <div className="ml-auto ">
          <div className="flex flex-row gap-2 items-center">
            <Typography.Text size="small">
              <div className="flex flex-row gap-2 items-center">
                <Tag>
                  <span className="icon-[tabler--command]" />
                </Tag>
                +
                <Tag>
                  <span className="icon-[uil--enter]" />
                </Tag>
                <div>发送</div>
              </div>
            </Typography.Text>

            <Typography.Text size="small">/</Typography.Text>
            <Typography.Text size="small">
              <div className="flex flex-row gap-2 items-center">
                <Tag>
                  <span className="icon-[uil--enter]" />
                </Tag>
                <div>新建一行</div>
              </div>
            </Typography.Text>
            <SplitButtonGroup aria-label="项目操作按钮组">
              <Button
                icon={<span className="icon-[bi--send-fill]" />}
                onClick={(e) =>
                  onSend?.({
                    text: text!,
                    options: chatOptions,
                    modelOptions: chatModelOptions,
                    variable: chatVariable,
                  })
                }
              >
                Send
              </Button>

              <Dropdown
                trigger="hover"
                position="bottomRight"
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item>输入回车发送</Dropdown.Item>
                    <Dropdown.Item>
                      输入
                      <Tag>
                        <span className="icon-[tabler--command]" />
                      </Tag>
                      +
                      <Tag>
                        <span className="icon-[uil--enter]" />
                      </Tag>
                      发送
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>新增系统提示词</Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Button icon={<IconTreeTriangleDown />}></Button>
              </Dropdown>
            </SplitButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
