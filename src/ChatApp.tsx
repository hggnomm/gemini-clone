import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemeni-1.5-pro" });
const ChatApp = () => {
  const [messages, setMessages] = useState<any>([
    {
      sender: "user",
      text: "hello",
    },
    {
      sender: "ai",
      text: "Bạn Nam rất đẹp trai đấy !!!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messageEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (!chatSessionRef.current) {
      chatSessionRef.current = model.startChat({
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        history: [],
      });
    }
  }, []);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Gemini Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message: any, index: string) => {
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "ai-message"
              }`}
            >
              {message.text}
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default ChatApp;
