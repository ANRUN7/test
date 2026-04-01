import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Volume2, Ear, Mic, Award } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "字母发音学习",
      description: "从26个英文字母开始，掌握正确的发音方法",
      path: "/alphabet"
    },
    {
      icon: <Volume2 className="h-8 w-8 text-green-600" />,
      title: "基础词汇练习",
      description: "学习日常生活中最常用的英语单词",
      path: "/vocabulary"
    },
    {
      icon: <Ear className="h-8 w-8 text-purple-600" />,
      title: "简单句型训练",
      description: "掌握基本英语句型结构和用法",
      path: "/sentences"
    },
    {
      icon: <Ear className="h-8 w-8 text-yellow-600" />,
      title: "听力入门训练",
      description: "通过简单对话提升英语听力能力",
      path: "/listening"
    },
    {
      icon: <Mic className="h-8 w-8 text-red-600" />,
      title: "口语跟读练习",
      description: "跟读练习提升口语表达和发音",
      path: "/speaking"
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-600" />,
      title: "学习成就系统",
      description: "追踪学习进度，获得学习成就奖励",
      path: "/progress"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">欢迎来到零基础英语学习</h1>
        <p className="text-xl text-gray-600 mb-8">循序渐进的学习路径，帮助您从零开始掌握英语</p>
        <Link 
          to="/learning-path" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Play className="h-5 w-5 mr-2" />
          开始学习
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.path}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-blue-200"
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">学习方法</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-1 6 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">循序渐进</h3>
            <p className="text-gray-600">按照科学的学习路径，从字母发音开始逐步提升</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">互动练习</h3>
            <p className="text-gray-600">通过发音跟读、语音识别等互动方式巩固学习</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">持续追踪</h3>
            <p className="text-gray-600">记录学习进度，可视化展示学习成果</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;