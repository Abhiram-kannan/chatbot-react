import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import disasterData from './disasterData.json';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initial message from the bot
    const initialMessage = {
      _id: 1,
      text: "Hello! I'm your Disaster Response Bot. Ask me how to stay safe during disasters!",
      createdAt: new Date(),
      user: { _id: 2, name: 'Bot' },
    };
    setMessages([initialMessage]);
  }, []);

  const handleSend = (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const userMessage = newMessages[0].text.toLowerCase();
    const botResponse = getBotResponse(userMessage);

    const botMessage = {
      _id: Math.random().toString(),
      text: botResponse,
      createdAt: new Date(),
      user: { _id: 2, name: 'Bot' },
    };

    setTimeout(() => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }, 1000); // Simulate a delay for better UX
  };

  const getBotResponse = (query) => {
    // Search the disasterData for a matching keyword
    for (const item of disasterData) {
      for (const keyword of item.keywords) {
        if (query.includes(keyword)) {
          return item.response;
        }
      }
    }
    return "Sorry, I don't have information on that. Try asking about earthquakes, floods, or fires!";
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: 1 }} // User ID
    />
  );
};

export default ChatScreen;
