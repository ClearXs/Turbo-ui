import { Conversation } from '@/api/ai/chat';
import { action, makeObservable, observable } from 'mobx';

class ConversationContext {
  conversation?: Conversation;
  agent: string = 'chat';
  constructor() {
    makeObservable(this, {
      conversation: observable,
      agent: observable,
      setConversation: action,
      getConversation: action,
    });
  }

  setConversation(conversation?: Conversation) {
    this.conversation = conversation;
  }

  getConversation() {
    return this.conversation;
  }
}

export default ConversationContext;
