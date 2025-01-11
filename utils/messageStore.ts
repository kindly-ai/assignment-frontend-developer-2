type Message = {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
};

class MessageStore {
    private messages: Map<string, Message[]>;

    constructor() {
        this.messages = new Map();
    }

    addMessage(sessionId: string, role: Message['role'], content: string): void {
        if (!this.messages.has(sessionId)) {
            this.messages.set(sessionId, []);
        }

        const sessionMessages = this.messages.get(sessionId)!;
        sessionMessages.push({
            role,
            content,
            timestamp: Date.now()
        });
    }

    getHistory(sessionId: string): Message[] {
        return this.messages.get(sessionId) || [];
    }
}

export default MessageStore;