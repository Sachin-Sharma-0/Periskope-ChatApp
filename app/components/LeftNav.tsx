// app/components/LeftNav.tsx
import { AiFillHome } from 'react-icons/ai'; // Home icon
import { HiChat } from 'react-icons/hi'; // Chat icon
import { IoTicket } from 'react-icons/io5'; // Ticket icon
import { FaChartLine } from 'react-icons/fa'; // Chart icon
import { TfiMenuAlt } from 'react-icons/tfi'; // Menu icon
import { HiOutlineSpeakerphone } from 'react-icons/hi'; // Speaker icon
import { GoRepoForked } from 'react-icons/go'; // Branch icon
import { RiContactsBookFill, RiFolderImageFill } from 'react-icons/ri'; // Contact Diary and Folder icons
import { MdChecklist } from 'react-icons/md'; // Checklist icon
import { FiSettings } from 'react-icons/fi'; // Settings icon
import { TbStarsFilled, TbLayoutSidebarRightCollapse } from 'react-icons/tb'; // Stars and Collapse icons
import { BsStars } from 'react-icons/bs'; // Stars icon

export default function LeftNav() {
  return (
    <nav className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
      {/* Periscope Logo with Unread Count */}
      <div className="relative">
        <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">P</span>
        </div>
        <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          12
        </span>
      </div>

      {/* Home Icon */}
      <a href="#" aria-label="Home">
        <AiFillHome className="text-gray-600 text-xl" />
      </a>

      {/* Divider */}
      <hr className="w-8 border-gray-300 my-1" />

      {/* Chat Icon (Active - Green with Background) */}
      <a href="#" aria-label="Chats" className="p-1 bg-gray-200 rounded-md">
        <HiChat className="text-green-700 text-xl" />
      </a>

      {/* Ticket Icon */}
      <a href="#" aria-label="Tickets">
        <IoTicket className="text-gray-600 text-xl" />
      </a>

      {/* Chart Icon */}
      <a href="#" aria-label="Analytics">
        <FaChartLine className="text-gray-600 text-xl" />
      </a>

      {/* Divider */}
      <hr className="w-8 border-gray-300 my-1" />

      {/* Menu Icon */}
      <a href="#" aria-label="Menu">
        <TfiMenuAlt className="text-gray-600 text-xl" />
      </a>

      {/* Speaker Icon */}
      <a href="#" aria-label="Announcements">
        <HiOutlineSpeakerphone className="text-gray-600 text-xl" />
      </a>

      {/* Branch Icon (Rotated 180 Degrees) with Star */}
      <a href="#" aria-label="Branches" className="relative">
        <GoRepoForked className="text-gray-600 text-xl rotate-180" />
        <BsStars className="absolute -top-1 -right-1 text-yellow-400 text-sm" />
      </a>

      {/* Divider */}
      <hr className="w-8 border-gray-300 my-1" />

      {/* Contact Diary Icon */}
      <a href="#" aria-label="Contacts">
        <RiContactsBookFill className="text-gray-600 text-xl" />
      </a>

      {/* Folder Icon */}
      <a href="#" aria-label="Media">
        <RiFolderImageFill className="text-gray-600 text-xl" />
      </a>

      {/* Divider */}
      <hr className="w-8 border-gray-300 my-1" />

      {/* Checklist Icon */}
      <a href="#" aria-label="Tasks">
        <MdChecklist className="text-gray-600 text-xl" />
      </a>

      {/* Settings Icon */}
      <a href="#" aria-label="Settings">
        <FiSettings className="text-gray-600 text-xl" />
      </a>

      {/* Spacer to Push Remaining Icons to Bottom */}
      <div className="flex-1"></div>

      {/* Three Stars Icon */}
      <a href="#" aria-label="Favorites">
        <TbStarsFilled className="text-gray-600 text-xl" />
      </a>

      {/* Collapse Icon */}
      <a href="#" aria-label="Collapse Sidebar">
        <TbLayoutSidebarRightCollapse className="text-gray-600 text-xl" />
      </a>
    </nav>
  );
}