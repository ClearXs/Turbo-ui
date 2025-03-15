import ConversationListPanel from './ConversationListPanel';
import { useMemo } from 'react';
import ConversationContext from './conversation-context';
import Conversation from './Conversation';

const ChatPage = () => {
  const conversationContext = useMemo(() => {
    return new ConversationContext();
  }, []);

  return (
    <div className="flex flex-row w-[100%] h-[100%] max-h-[100%] gap-2 overflow-y-auto">
      <div className="p-2 bg-[var(--semi-color-fill-0)] w-[20%] h-[100%]">
        <ConversationListPanel context={conversationContext} />
      </div>
      <div className="w-[85%] h-[100%]">
        <Conversation context={conversationContext} />
      </div>
    </div>
  );
};

export default ChatPage;
