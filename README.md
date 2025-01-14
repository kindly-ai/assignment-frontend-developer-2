# LLM (Lovely Little Messages) 🤖🟢

Welcome to our little chat experiment! Our backend developer got hit by the dreaded "bus factor" (actually, they're just away for the week ⛷️) and left us with this somewhat untested WebSocket-based chat backend. Now it's your time to shine and drive this project forward! 🚌✨

## The Challenge 🎯

We need a nice frontend that can talk to our WebSocket backend. The backend is there, it works (mostly), and it's ready to connect to OpenAI's GPT-3.5 Turbo. Your mission, should you choose to accept it, is to:

1. Create an engaging chat interface (React would be a great fit, but feel free to use what you're most comfortable with)
2. Make it talk to our WebSocket backend
3. Allow users to send messages to the backend and vice-versa
4. The task is volontarily open-ended, so feel free to add your personal touch! Feel free to modify the backend as you see fit, or even add new features. We're interested in seeing what you can come up with!

## Getting Started 🚀

1. Clone this repo
2. Copy `.env.default` to `.env` and add your OpenAI API key
   - Don't have one? No worries! You can either:
     - Create one at [OpenAI's platform](https://platform.openai.com/api-keys)
     - Or reach out to us, and we'll provide one
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the backend:
   ```bash
   npm start
   ```
   The WebSocket server will be running at `ws://localhost:1337/ws`

## Technical Details 🔧

The backend expects messages in this format:

```typescript
{
  text: string;
}
```

And responds with:

```typescript
{
  status: 'processing' | 'completed' | 'error';
  response?: string;
  error?: string;
}
```

## Questions? 🤔

Found something weird in the backend? That's part of the fun! Work around it, document it, or even fix it if you're feeling adventurous. We're interested in seeing how you handle real-world scenarios!

Good luck! 🍀
