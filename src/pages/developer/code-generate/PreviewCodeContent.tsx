import { CodeContent, CodeGenerate } from '@/api/developer/codeGenerate';
import Binary from '@/components/binary';
import CodeEditor from '@/components/code-editor/CodeEditor';
import { directGetIcon } from '@/components/icon/shared';
import {
  Button,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import { open } from '@/util/auth';

export interface IPreviewCodeContentProps {
  codeContentList: CodeContent[];
  codeGenerate: CodeGenerate;
}

const PreviewCodeContent: React.FC<IPreviewCodeContentProps> = ({
  codeContentList = [],
  codeGenerate,
}) => {
  const [codeFile, setCodeFile] = useState<string>(
    codeContentList[0]?.filename ?? '',
  );

  const [codeContent, setCodeContent] = useState<CodeContent | undefined>(
    codeContentList?.[0],
  );

  return (
    <Binary
      rate={0.3}
      LeftComponent={
        <div className="flex flex-col gap-2">
          <RadioGroup type="pureCard" direction="vertical" value={codeFile}>
            {codeContentList.map((codeContent) => {
              return (
                <Radio
                  value={codeContent.filename}
                  onChange={(e) => {
                    const filename = e.target.value;
                    setCodeFile(filename);
                    const codeContent = codeContentList.find(
                      (codeContent) => codeContent.filename === filename,
                    );
                    setCodeContent(codeContent);
                  }}
                  extra={
                    <div className="max-w-64 flex flex-row gap-2 items-center">
                      <Typography.Text ellipsis type="tertiary">
                        {codeContent.content}
                      </Typography.Text>
                      <Tooltip content={`download ${codeContent.filename}`}>
                        <Button
                          className="ml-auto"
                          icon={directGetIcon('IconDownloadStroked')}
                          onClick={(event) => {
                            event.stopPropagation();
                            open(
                              `/api/dev/code/generate/generate/${codeGenerate.id}/${codeContent.filename}`,
                            );
                          }}
                        ></Button>
                      </Tooltip>
                    </div>
                  }
                >
                  <div className="flex flex-row items-center gap-2 w-[100%]">
                    <span>{codeContent.filename}</span>
                  </div>
                </Radio>
              );
            })}
          </RadioGroup>
        </div>
      }
      RightComponent={
        codeContent && (
          <CodeEditor
            height="100%"
            language={codeContent.language}
            value={codeContent.content}
            basicSetup={true}
            readOnly={true}
            extensions={[]}
          ></CodeEditor>
        )
      }
    ></Binary>
  );
};

export default PreviewCodeContent;
