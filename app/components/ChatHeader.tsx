// app/components/ChatHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import { HiUsers } from 'react-icons/hi'; // Users icon for group chats
import { BiSearch } from 'react-icons/bi'; // Search icon
import { PiStarFourFill } from 'react-icons/pi'; // Star icons
import { FaStar, FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

interface User {
  name: string;
  phone: string;
  avatar_url: string;
}

interface ChatMember {
  user_id: string;
  users: User;
}

interface Chat {
  title: string;
  chat_members: ChatMember[];
}

interface ChatHeaderProps {
  chatId: string;
  currentUserId: string | null;
}

export default function ChatHeader({ chatId, currentUserId }: ChatHeaderProps) {
    const [chat, setChat] = useState<Chat | null>(null);

    useEffect(() => {
      const fetchChat = async () => {
        const { data, error } = await supabase
          .from('chats')
          .select('title, chat_members(user_id, users(name, phone, avatar_url))')
          .eq('id', chatId)
          .single();
  
        if (error) {
          console.error('Error fetching chat:', error.message);
          return;
        }
  
        setChat(data as unknown as Chat);
      };
  
      if (chatId) fetchChat();
    }, [chatId]);

  if (!chat) return <div className="h-16 bg-white border-b border-gray-200 flex items-center px-4">Chat Not Found</div>;

  const isGroup = chat.chat_members.length > 2;
  const displayUser = chat.chat_members.find(member => member.user_id !== currentUserId) || chat.chat_members[0];
  const singleUserPhone = displayUser?.users?.phone || 'No phone available';
  const memberNames = chat.chat_members.map((member) => member.users?.name).filter(Boolean).join(', ');


  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4">
      {/* Avatar: Grey Circle with HiUsers for Group Chats */}
      {isGroup ? (
        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
          <HiUsers className="text-white text-2xl" />
        </div>
      ) : (
        <div
          className="w-10 h-10 rounded-full"
          style={{ backgroundImage: `url(${chat.chat_members[0]?.users?.avatar_url || 'https://picsum.photos/200/200?random=1'})`, backgroundSize: 'cover' }}
        ></div>
      )}

      <div className="flex-1 ml-3">
        <h2 className="text-lg font-semibold text-gray-800">{chat.title}</h2>
        {isGroup ? (
          <p className="text-sm text-gray-600">{memberNames}</p>
        ) : (
          <p className="text-sm text-gray-600">{singleUserPhone}</p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {/* Group Member Avatars (for group chats only) */}
        {isGroup && (
          <div className="flex items-center">
            {chat.chat_members.map((member, index) => (
              <div
                key={member.user_id}
                className={`w-6 h-6 rounded-full border-2 border-white ${index !== 0 ? 'ml-[-8px]' : ''}`}
                style={{
                  backgroundImage: `url(${member.users?.avatar_url})`,
                  backgroundSize: 'cover',
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Star Icons: Three Stars with Positioning */}
        <div className="relative">
          <PiStarFourFill className="text-gray-600 text-lg" />
          <PiStarFourFill className="absolute -top-1 -left-1 text-gray-600 text-xs" />
          <PiStarFourFill className="absolute -bottom-1 -left-1 text-gray-600 text-xs" />
        </div>

        {/* Search Icon */}
        <BiSearch className="text-gray-600 text-lg" />
      </div>
    </header>
  );
}