// app/components/Header.tsx
import { HiChat } from 'react-icons/hi'; // Chat icon
import { LuRefreshCcwDot } from 'react-icons/lu'; // Refresh icon
import { IoMdHelpCircleOutline } from 'react-icons/io'; // Help icon
import { FaChevronDown} from 'react-icons/fa'; // Keep ChevronDown and Bars
import { MdOutlineInstallDesktop } from 'react-icons/md'; // Desktop Download icon
import { MdNotificationsOff } from 'react-icons/md'; // Notification icon
import { BsStars } from 'react-icons/bs'; // Stars icon
import { TfiMenuAlt } from 'react-icons/tfi'; // Menu icon

export default function Header() {
  return (
    <header className="h-[52px] bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left Side: Chat Icon and "chats" Label */}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <HiChat className="text-gray-600 text-xl" />
        </div>
        <span className="text-lg font-semibold text-gray-800">chats</span>
      </div>

      {/* Right Side: Action Buttons */}
      <nav className="flex items-center space-x-3">
        {/* Refresh Box */}
        <a href="#" aria-label="Refresh" className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
          <LuRefreshCcwDot className="text-gray-600 text-sm" />
          <span className="text-sm text-gray-600">Refresh</span>
        </a>

        {/* Help Box */}
        <a href="#" aria-label="Help" className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
          <IoMdHelpCircleOutline className="text-gray-600 text-sm" />
          <span className="text-sm text-gray-600">Help</span>
        </a>

        {/* Phones Box */}
        <a href="#" aria-label="Phones Status" className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span className="text-sm text-gray-600">5 / 6 phones</span>
          <FaChevronDown className="text-gray-600 text-sm" />
        </a>

        {/* Desktop Download Box */}
        <a href="#" aria-label="Install Desktop" className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
          <div className="relative">
            <MdOutlineInstallDesktop className="text-gray-600 text-sm" />
          </div>
        </a>

        {/* Notification Box */}
        <a href="#" aria-label="Notifications Off" className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
          <MdNotificationsOff className="text-gray-600 text-sm" />
        </a>

        {/* Stars and Bars Box */}
        <a href="#" aria-label="Favorites Menu" className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
          <BsStars className="text-yellow-400 text-sm" />
          <TfiMenuAlt className="text-gray-600 text-sm" />
        </a>
      </nav>
    </header>
  );
}