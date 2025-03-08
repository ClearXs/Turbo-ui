import { Conversation } from '@/api/ai/chat';
import { makeObservable, observable } from 'mobx';

class ConversationContext {
  conversation?: Conversation;
  constructor() {
    makeObservable(this, {
      conversation: observable,
    });
  }
}

export default ConversationContext;
