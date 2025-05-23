// app/components/RightNav.tsx
import { FaAt, FaBars, FaCog, FaSquare } from 'react-icons/fa'; // Keep @, Bars, Cog, and Square
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb'; // Collapse icon
import { LuRefreshCw } from 'react-icons/lu'; // Refresh icon
import { FiEdit3 } from 'react-icons/fi'; // Edit icon
import { FaBarsStaggered } from 'react-icons/fa6'; // Menu Bars icon
import { SiApachekafka } from 'react-icons/si'; // Kafka icon
import { HiUserGroup } from 'react-icons/hi'; // Users icon
import { RiFolderImageFill } from 'react-icons/ri'; // Folder icon (same as LeftNav)

export default function RightNav() {
  return (
    <nav className="w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 space-y-4">
      {/* Collapse Icon */}
      <a href="#" aria-label="Collapse Sidebar">
        <TbLayoutSidebarLeftCollapseFilled className="text-gray-200 text-xl" />
      </a>

      {/* Refresh Icon */}
      <a href="#" aria-label="Refresh">
        <LuRefreshCw className="text-gray-200 text-xl" />
      </a>

      {/* Edit Icon */}
      <a href="#" aria-label="Edit">
        <FiEdit3 className="text-gray-200 text-xl" />
      </a>

      {/* Menu Bars Icon */}
      <a href="#" aria-label="Menu">
        <FaBarsStaggered className="text-gray-200 text-xl" />
      </a>

      {/* Two Square Boxes with Two Lines Each */}
      <a href="#" aria-label="Custom Action" className="relative">
        <FaSquare className="text-gray-200 text-xl" />
        <div className="absolute inset-0 flex items-center justify-center space-x-0.5">
          <span className="w-1 h-4 bg-gray-200"></span>
          <span className="w-1 h-4 bg-gray-200"></span>
        </div>
        <FaSquare className="absolute -bottom-2 -right-2 text-gray-200 text-xl" />
        <div className="absolute -bottom-2 -right-2 flex items-center justify-center space-x-0.5">
          <span className="w-1 h-4 bg-gray-200"></span>
          <span className="w-1 h-4 bg-gray-200"></span>
        </div>
      </a>

      {/* Kafka Icon */}
      <a href="#" aria-label="Kafka">
        <SiApachekafka className="text-gray-200 text-xl" />
      </a>

      {/* Users Icon */}
      <a href="#" aria-label="Users">
        <HiUserGroup className="text-gray-200 text-xl" />
      </a>

      {/* @ Icon */}
      <a href="#" aria-label="Mentions">
        <FaAt className="text-gray-200 text-xl" />
      </a>

      {/* Folder Icon */}
      <a href="#" aria-label="Media">
        <RiFolderImageFill className="text-gray-200 text-xl" />
      </a>

      {/* Bars with Settings Icon */}
      <a href="#" aria-label="Settings Menu" className="relative">
        <FaBars className="text-gray-200 text-xl" />
        <FaCog className="absolute bottom-0 right-0 text-gray-200 text-xs" />
      </a>
    </nav>
  );
}