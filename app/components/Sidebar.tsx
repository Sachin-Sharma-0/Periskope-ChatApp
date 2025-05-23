// app/components/Sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import { HiUsers } from 'react-icons/hi'; // Users icon for group chats
import { BsChat } from 'react-icons/bs'; // Chat icon for bottom button
import { MdOutlineAddCircle } from 'react-icons/md'; // Plus icon for bottom button
import { HiChat } from 'react-icons/hi'; // Chat icon for bottom button
import { BiCheckDouble } from 'react-icons/bi'; // Double Check icon
import { IoFilterSharp } from 'react-icons/io5'; // Filter icon
import { RiFolderDownloadFill } from 'react-icons/ri'; // Custom Filter icon
import { FaFolder, FaArrowDown, FaSearch, FaFilter, FaPhone, FaPlus } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

interface Chat {
  id: string;
  title: string;
  type: string;
  last_message: string;
  last_message_time: string;
  chat_labels: { labels: { name: string; color: string }[] }[]; // Updated to expect labels as an array
  chat_members: { user_id: string; users: { name: string; phone: string; avatar_url: string } }[];
}

interface SidebarProps {
  selectedChatId: string | null;
  setSelectedChatId: (chatId: string) => void;
}

export default function Sidebar({ selectedChatId, setSelectedChatId }: SidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select(`
          id,
          title,
          type,
          last_message,
          last_message_time,
          chat_labels(labels(name, color)),
          chat_members(user_id, users(name, phone, avatar_url))
        `)
        .order('last_message_time', { ascending: false });

      if (error) {
        console.error(error.message);
        return;
      }
      
      
      console.log('Fetched chats:', JSON.stringify(data, null, 2)); // Debug the data
      setChats((data as unknown as Chat[]) || []);
      
    };

    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };

    if (isAuthenticated) {
      fetchChats();
      fetchCurrentUser();
    }

    // Subscribe to real-time updates for chats
    const subscription = supabase
      .channel('chats')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'chats' },
        (payload) => {
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === payload.new.id ? { ...chat, ...payload.new } : chat
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [isAuthenticated]);

  const handleChatClick = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <aside className="w-100 bg-white border-r border-gray-200 flex flex-col relative">
      <header className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-green-700">
            <RiFolderDownloadFill className="text-green-700 text-sm" />
            <span className="text-sm">Custom filter</span>
          </div>
          <button className="bg-gray-100 text-gray-600 text-sm rounded-lg px-3 py-1.5">Save</button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5">
            <FaSearch className="text-gray-600 text-sm" />
            <span className="text-sm text-gray-600">Search</span>
          </div>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 relative">
            <IoFilterSharp className="text-green-700 text-sm" />            
            <span className="text-sm text-green-700">Filtered</span>
            <div className="absolute -top-2 -right-2 bg-green-700 rounded-full w-5 h-5 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>
      <nav className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const isGroup = chat.chat_members.length > 2;
          const label = chat.chat_labels[0]?.labels[0]; // Take the first label from the labels array
          const displayUser = isGroup
            ? chat.chat_members[0]
            : chat.chat_members.find(member => member.user_id !== currentUserId) || chat.chat_members[0];
          const displayPhone = displayUser?.users?.phone || 'No phone available';
          const additionalMembers = chat.chat_members.length - 1;
          return (
            <a
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className={`p-4 border-b border-gray-200 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer h-24 ${
                selectedChatId === chat.id ? 'bg-gray-100' : ''
              }`}
              aria-label={`Chat with ${chat.title}`}
            >
                {/* Main Avatar: Grey Circle with HiUsers for Group Chats */}
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
              
              <div className="flex-1 flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{chat.title}</span>
                  {label && (
                    <span className={`text-xs rounded px-2 py-1 ${label.color}`}>{label.name}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 truncate">{chat.last_message}</span>
                  {isGroup && (
                    <div className="flex items-center space-x-1">
                      <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                        <HiUsers className="text-white text-sm" />
                      </div>
                      {chat.chat_members.length > 1 && (
                        <div className="relative">
                          <div className="w-5 h-5 bg-green-700 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">{chat.chat_members.length}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1">
                    <FaPhone className="text-gray-500 text-xs" />
                    {isGroup ? (
                      <>
                        <span className="text-xs text-gray-500">{displayPhone}</span>
                        {additionalMembers > 0 && (
                          <>
                            <span className="text-xs text-gray-500 mx-1">•</span>
                            <span className="text-xs text-gray-500">+{additionalMembers}</span>
                          </>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">{displayPhone}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiCheckDouble className="text-gray-500 text-xs" />
                    <span className="text-xs text-gray-500">
                      {chat.last_message_time ? new Date(chat.last_message_time).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </nav>
      <div className="absolute bottom-4 right-4">
        <button className="bg-green-700 rounded-full p-3 relative" aria-label="New Chat">
            <BsChat className="text-white text-2xl" />
        </button>
      </div>
    </aside>
  );
}