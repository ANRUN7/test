import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Home, Trophy, BarChart2, Music } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">零基础英语学习</h1>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
            >
              <Home className="h-4 w-4 mr-1" />
              首页
            </Link>
            <Link 
              to="/learning-path" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              学习路径
            </Link>
            <Link 
              to="/ipa" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
            >
              <Music className="h-4 w-4 mr-1" />
              音标学习
            </Link>
            <Link 
              to="/progress" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
            >
              <BarChart2 className="h-4 w-4 mr-1" />
              学习进度
            </Link>
          </nav>
          
          <div className="flex items-center">
            <User className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;