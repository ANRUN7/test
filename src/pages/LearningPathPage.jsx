import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, CheckCircle, BookOpen, Volume2, Ear, Mic, Music } from 'lucide-react';

const LearningPathPage = () => {
  const [completedLessons, setCompletedLessons] = useState(
    JSON.parse(localStorage.getItem('completedLessons')) || []
  );

  const modules = [
    {
      id: 'alphabet',
      title: '字母发音学习',
      description: '掌握26个英文字母的正确发音和书写',
      icon: <BookOpen className="h-6 w-6" />,
      lessons: [
        { id: 'alphabet-1', title: '字母A到E', path: '/alphabet' },
        { id: 'alphabet-2', title: '字母F到J', path: '/alphabet' },
        { id: 'alphabet-3', title: '字母K到O', path: '/alphabet' },
        { id: 'alphabet-4', title: '字母P到T', path: '/alphabet' },
        { id: 'alphabet-5', title: '字母U到Z', path: '/alphabet' }
      ]
    },
    {
      id: 'ipa',
      title: '国际音标学习',
      description: '学习48个国际音标，掌握英语发音基础',
      icon: <Music className="h-6 w-6" />,
      lessons: [
        { id: 'ipa-1', title: '单元音', path: '/ipa' },
        { id: 'ipa-2', title: '双元音', path: '/ipa' },
        { id: 'ipa-3', title: '爆破音', path: '/ipa' },
        { id: 'ipa-4', title: '摩擦音', path: '/ipa' },
        { id: 'ipa-5', title: '其他辅音', path: '/ipa' }
      ]
    },
    {
      id: 'vocabulary',
      title: '基础词汇练习',
      description: '学习日常生活中最常用的英语单词',
      icon: <Volume2 className="h-6 w-6" />,
      lessons: [
        { id: 'vocab-1', title: '数字与颜色', path: '/vocabulary' },
        { id: 'vocab-2', title: '家庭成员', path: '/vocabulary' },
        { id: 'vocab-3', title: '日常用品', path: '/vocabulary' },
        { id: 'vocab-4', title: '食物与饮料', path: '/vocabulary' },
        { id: 'vocab-5', title: '时间与日期', path: '/vocabulary' }
      ]
    },
    {
      id: 'sentences',
      title: '简单句型训练',
      description: '掌握基本英语句型结构和用法',
      icon: <BookOpen className="h-6 w-6" />,
      lessons: [
        { id: 'sentence-1', title: '主谓宾结构', path: '/sentences' },
        { id: 'sentence-2', title: '疑问句', path: '/sentences' },
        { id: 'sentence-3', title: '否定句', path: '/sentences' },
        { id: 'sentence-4', title: '日常问候', path: '/sentences' },
        { id: 'sentence-5', title: '自我介绍', path: '/sentences' }
      ]
    },
    {
      id: 'listening',
      title: '听力入门训练',
      description: '通过简单对话提升英语听力能力',
      icon: <Ear className="h-6 w-6" />,
      lessons: [
        { id: 'listening-1', title: '数字听力', path: '/listening' },
        { id: 'listening-2', title: '颜色识别', path: '/listening' },
        { id: 'listening-3', title: '简单问答', path: '/listening' },
        { id: 'listening-4', title: '日常对话', path: '/listening' },
        { id: 'listening-5', title: '短句理解', path: '/listening' }
      ]
    },
    {
      id: 'speaking',
      title: '口语跟读练习',
      description: '跟读练习提升口语表达和发音',
      icon: <Mic className="h-6 w-6" />,
      lessons: [
        { id: 'speaking-1', title: '字母发音跟读', path: '/speaking' },
        { id: 'speaking-2', title: '单词发音练习', path: '/speaking' },
        { id: 'speaking-3', title: '短句跟读', path: '/speaking' },
        { id: 'speaking-4', title: '日常对话跟读', path: '/speaking' },
        { id: 'speaking-5', title: '自我介绍练习', path: '/speaking' }
      ]
    }
  ];

  const toggleLessonCompletion = (lessonId) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];
    
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">学习路径</h1>
        <p className="text-gray-600">循序渐进掌握英语基础知识</p>
      </div>

      <div className="space-y-8">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-blue-100 rounded-lg text-blue-600">
                  {module.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{module.title}</h2>
                  <p className="text-gray-600">{module.description}</p>
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {module.lessons.filter(lesson => completedLessons.includes(lesson.id)).length} / {module.lessons.length} 完成
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="p-4 flex items-center">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={completedLessons.includes(lesson.id)}
                      onChange={() => toggleLessonCompletion(lesson.id)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">第{lessonIndex + 1}课: {lesson.title}</h3>
                  </div>
                  <Link 
                    to={lesson.path}
                    className="ml-4 flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    开始学习
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathPage;