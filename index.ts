import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

import websocketPlugin, { type WebSocket } from '@fastify/websocket';
import Fastify from 'fastify';

import 'dotenv/config';

import { inputMessageSchema, outputMessageSchema } from './utils/zodSchemas';
import MessageStore from './utils/messageStore';

const messageStore = new MessageStore();

const fastify = Fastify();
fastify.register(websocketPlugin);

function sendOutput(
	socket: WebSocket,
	status: z.infer<typeof outputMessageSchema>['status'],
	response?: string,
	error?: string
): void {
	const output = outputMessageSchema.parse({ status, response, error });
	socket.send(JSON.stringify(output));
}

fastify.register(async function (fastify) {
	fastify.get('/', { websocket: true }, (socket) => {
		const sessionId = crypto.randomUUID();
		socket.on('message', async (data: string) => {
			try {
				const json = JSON.parse(data);
				const { text } = inputMessageSchema.parse(json);

				messageStore.addMessage(sessionId, 'user', text);
				sendOutput(socket, 'processing');
				console.info('Received message:', text);

				const { text: response } = await generateText({
					model: openai('gpt-3.5-turbo'),
					messages: messageStore.getHistory(sessionId),
				});

				messageStore.addMessage(sessionId, 'assistant', response);
				sendOutput(socket, 'completed', response);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'An error occurred';
				console.error('Error processing message:', errorMessage);
				sendOutput(socket, 'error', undefined, errorMessage);
			}
		})
	})
})

const start = async (): Promise<void> => {
	try {
		const port = process.env.PORT || 1337;
		const host = process.env.HOST || 'localhost';
		await fastify.listen({ port: Number(port), host });
		console.info(`Server is running on ws://${host}:${port}/ws`);
	} catch (err) {
		console.error('Error starting server:', err);
		process.exit(1);
	}
};

start();
