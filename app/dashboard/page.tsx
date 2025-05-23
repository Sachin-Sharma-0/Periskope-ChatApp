// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import LeftNav from '../components/LeftNav';
import Sidebar from '../components/Sidebar';
import ChatScreen from '../components/ChatScreen';
import RightNav from '../components/RightNav';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // State to manage selected chat

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/');
    } else if (isMounted && isAuthenticated && !selectedChatId) {
      // Set a default chat ID when the dashboard loads
      setSelectedChatId('a1b2c3d4-1234-5678-9abc-1234567890ab'); // Default to "Test E Centro" chat
    }
  }, [isAuthenticated, router, isMounted, selectedChatId]);

  if (!isMounted || !isAuthenticated || !selectedChatId) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <LeftNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
          <ChatScreen chatId={selectedChatId} />
          <RightNav />
        </div>
      </div>
    </div>
  );
}