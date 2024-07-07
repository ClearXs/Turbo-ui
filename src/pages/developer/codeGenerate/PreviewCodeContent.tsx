import { CodeContent } from '@/api/developer/codeGenerate';
import Binary from '@/components/Binary';
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import { Radio, RadioGroup } from '@douyinfe/semi-ui';
import React, { useState } from 'react';

export interface IPreviewCodeContentProps {
  codeContentList: CodeContent[];
}

const PreviewCodeContent: React.FC<IPreviewCodeContentProps> = ({
  codeContentList = [],
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
                {codeContent.filename}
              </Radio>
            );
          })}
        </RadioGroup>
      }
      RightComponent={
        codeContent && (
          <CodeEditor
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
