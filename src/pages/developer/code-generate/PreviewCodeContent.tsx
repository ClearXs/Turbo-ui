import { CodeContent, CodeGenerate } from '@/api/developer/codeGenerate';
import Binary from '@/components/binary';
import CodeEditor from '@/components/code-editor/CodeEditor';
import { directGetIcon } from '@/components/icon';
import { Button, Radio, RadioGroup, Tooltip } from '@douyinfe/semi-ui';
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
      LeftComponent={
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
              >
                <div className="flex flex-row items-center gap-2">
                  <span>{codeContent.filename}</span>
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
              </Radio>
            );
          })}
        </RadioGroup>
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
