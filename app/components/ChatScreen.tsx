// app/components/ChatScreen.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { BiCheckDouble } from 'react-icons/bi'; // Double Check icon
import { IoMdSend, IoMdTime, IoMdRefresh, IoMdFolder, IoMdArrowDown, IoMdArrowDropdownCircle } from 'react-icons/io'; // New icons
import { ImAttachment } from 'react-icons/im'; // Attachment icon
import { BsEmojiSmile } from 'react-icons/bs'; // Emoji icon
import { PiStarFourFill } from 'react-icons/pi'; // Star icons
import { RiFolderChartFill } from "react-icons/ri";
import { HiInformationCircle } from 'react-icons/hi'; // Info icon for tags
import { FaPaperclip, FaSmile, FaClock, FaSyncAlt, FaStar, FaBox, FaMicrophone, FaChevronDown, FaAngleDown, FaCheck } from 'react-icons/fa';
import ChatHeader from './ChatHeader';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  users: { name: string; phone: string; avatar_url: string };
}

interface UserData {
  name: string;
  phone: string;
  avatar_url: string;
}

export default function ChatScreen({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch the current user's ID
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };

    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*, users(name, phone, avatar_url)')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error(error.message);
        return;
      }
      setMessages(data || []);

      // Mark unread messages as read if the current user is not the sender
      if (currentUserId) {
        const unreadMessages = data?.filter(
          (msg: Message) => !msg.is_read && msg.sender_id !== currentUserId
        );
        if (unreadMessages?.length) {
          const { error: updateError } = await supabase
            .from('messages')
            .update({ is_read: true })
            .in(
              'id',
              unreadMessages.map((msg: Message) => msg.id)
            );

          if (updateError) {
            console.error(updateError.message);
          }
        }
      }
    };

    if (chatId && isAuthenticated && currentUserId) {
      fetchMessages();
    }

    // Subscribe to real-time message updates
    const subscription = supabase
      .channel(`messages:chat_id=${chatId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
        async (payload) => {
          const newMessage = payload.new as Omit<Message, 'users'>;

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('name, phone, avatar_url')
            .eq('id', newMessage.sender_id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError.message);
            return;
          }

          const messageWithUser: Message = {
            ...newMessage,
            users: userData as UserData,
          };

          setMessages((prev) => [...prev, messageWithUser]);

          // Mark the new message as read if the current user is not the sender
          if (currentUserId && newMessage.sender_id !== currentUserId) {
            const { error: updateError } = await supabase
              .from('messages')
              .update({ is_read: true })
              .eq('id', newMessage.id);

            if (updateError) {
              console.error('Error marking new message as read:', updateError.message);
            } else {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newMessage.id ? { ...msg, is_read: true } : msg
                )
              );
            }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
        (payload) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId, isAuthenticated, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isAuthenticated || !currentUserId) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        sender_id: currentUserId,
        content: newMessage,
        created_at: new Date().toISOString(),
        is_read: false,
      });

    if (error) {
      console.error('Error sending message:', error.message);
      return;
    }

    setNewMessage('');
  };

  const uniqueDates = [...new Set(messages.map((msg) => new Date(msg.created_at).toISOString().split('T')[0]))];

  if (!currentUserId) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader chatId={chatId} currentUserId={currentUserId} />
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 bg-opacity-50"
        style={{
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {uniqueDates.map((date, dateIndex) => (
          <div key={dateIndex}>
            <div className="flex justify-center my-2">
              <span className="bg-gray-200 text-gray-600 text-xs rounded px-3 py-1 font-semibold">{date}</span>
            </div>
            {messages
              .filter((msg) => new Date(msg.created_at).toISOString().split('T')[0] === date)
              .map((msg, index) => (
                <div key={index} className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'} my-2`}>
                  <div className="flex items-end space-x-2">
                    {msg.sender_id !== currentUserId && (
                      <div className="w-8 h-8 rounded-full" style={{ backgroundImage: `url(${msg.users.avatar_url})`, backgroundSize: 'cover' }}></div>
                    )}
                    <div
                      className={`max-w-xs p-3 rounded-lg shadow-md ${
                        msg.sender_id === currentUserId ? 'bg-green-100 text-gray-800' : 'bg-white text-gray-800'
                      }`}
                    >
                      <p className="text-sm font-medium">
                        <span className={msg.sender_id === currentUserId ? 'text-green-700' : ''}>
                          {msg.users.name}
                        </span>{' '}
                        <span className="text-xs text-gray-500">{msg.users.phone}</span>
                      </p>
                      <p className="text-sm">{msg.content}</p>
                      <div className="flex justify-end items-center space-x-1">
                        <p className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        {msg.sender_id === currentUserId && (
                          <div className={`flex space-x-0.5 ${msg.is_read ? 'text-blue-500' : 'text-gray-500'}`}>
                            <BiCheckDouble className="text-xs" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

        {/* Tags: Positioned directly above the message bar */}
      <div
        className=" absolute"
        style={{ bottom: '100px' }} // Adjust based on message bar height (e.g., 64px + 8px gap)
      >
        <div className="flex items-center space-x-2">
          <IoMdArrowDropdownCircle className="text-gray-200 text-lg" />
          <div className="flex space-x-2">
            <span className="flex items-center space-x-1 bg-green-200 text-green-700 text-xs rounded px-3 py-1">
              <span>WhatsApp</span>
              <HiInformationCircle className="text-green-700 text-sm" />
            </span>
            <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 text-xs rounded px-3 py-1">
              <span>Private Note</span>
              <HiInformationCircle className="text-yellow-700 text-sm" />
            </span>
          </div>
        </div>
      </div>

      {/* Move to Bottom Button: Floating in the center */}
      <button
        className="absolute bg-gray-100 square-full p-2 shadow-lg"
        style={{
          bottom: '107px', // Adjust based on message bar height (e.g., 64px + 16px gap)
          left: '62%',
          transform: 'translateX(-50%)',
        }}
      >
        <IoMdArrowDown className="text-gray-600 text-lg" />
      </button>

      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex items-center px-4">
          <input
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-2 text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
          />
          <button onClick={handleSendMessage} className="bg-green-700 text-white rounded-full p-2">
            <IoMdSend className="text-white text-lg" />
          </button>
        </div>
        <div className="flex items-center px-4 space-x-3 mt-2">
          <ImAttachment className="text-gray-600 text-lg" />
          <BsEmojiSmile className="text-gray-600 text-lg" />
          <IoMdTime className="text-gray-600 text-lg" />
          <IoMdRefresh className="text-gray-600 text-lg" />
          <div className="relative">
            <PiStarFourFill className="text-gray-600 text-lg" />
            <PiStarFourFill className="absolute -top-1 -left-1 text-gray-600 text-xs" />
            <PiStarFourFill className="absolute -bottom-1 -left-1 text-gray-600 text-xs" />
          </div>
          <RiFolderChartFill className="text-gray-600 text-lg rotate-90" />
          <FaMicrophone className="text-gray-600 text-lg" />
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 ml-auto">
            <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className="text-sm text-gray-600">PerisKope</span>
            <FaChevronDown className="text-gray-600 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
