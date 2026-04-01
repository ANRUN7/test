import React, { useState, useEffect } from 'react';
import { Trophy, BookOpen, Volume2, Ear, Mic, BarChart2, Target } from 'lucide-react';

const ProgressPage = () => {
  // 从localStorage获取学习进度
  const [progressData, setProgressData] = useState({
    alphabet: [],
    vocabulary: {},
    sentences: {},
    listening: [],
    speaking: []
  });

  useEffect(() => {
    const alphabet = JSON.parse(localStorage.getItem('completedAlphabet')) || [];
    const vocabulary = JSON.parse(localStorage.getItem('completedVocabulary')) || {};
    const sentences = JSON.parse(localStorage.getItem('completedSentences')) || {};
    const listening = JSON.parse(localStorage.getItem('completedListening')) || [];
    const speaking = JSON.parse(localStorage.getItem('completedSpeaking')) || [];
    
    setProgressData({
      alphabet,
      vocabulary,
      sentences,
      listening,
      speaking
    });
  }, []);

  // 计算各模块完成数量
  const calculateProgress = () => {
    const alphabetCount = progressData.alphabet.length;
    const vocabularyCount = Object.values(progressData.vocabulary).filter(Boolean).length;
    const sentencesCount = Object.values(progressData.sentences).filter(Boolean).length;
    const listeningCount = progressData.listening.length;
    const speakingCount = progressData.speaking.length;
    
    return {
      alphabet: alphabetCount,
      vocabulary: vocabularyCount,
      sentences: sentencesCount,
      listening: listeningCount,
      speaking: speakingCount,
      total: alphabetCount + vocabularyCount + sentencesCount + listeningCount + speakingCount
    };
  };

  const progress = calculateProgress();

  // 各模块信息
  const modules = [
    {
      id: 'alphabet',
      name: '字母发音',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-blue-500',
      total: 26,
      completed: progress.alphabet
    },
    {
      id: 'vocabulary',
      name: '基础词汇',
      icon: <Volume2 className="h-6 w-6" />,
      color: 'bg-green-500',
      total: 30, // 假设有30个词汇
      completed: progress.vocabulary
    },
    {
      id: 'sentences',
      name: '简单句型',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-purple-500',
      total: 15, // 假设有15个句型
      completed: progress.sentences
    },
    {
      id: 'listening',
      name: '听力训练',
      icon: <Ear className="h-6 w-6" />,
      color: 'bg-yellow-500',
      total: 10, // 假设有10个练习
      completed: progress.listening
    },
    {
      id: 'speaking',
      name: '口语练习',
      icon: <Mic className="h-6 w-6" />,
      color: 'bg-red-500',
      total: 10, // 假设有10个练习
      completed: progress.speaking
    }
  ];

  // 成就系统
  const achievements = [
    {
      id: 1,
      title: "学习新手",
      description: "完成第一个字母学习",
      icon: <Target className="h-8 w-8" />,
      earned: progress.alphabet > 0
    },
    {
      id: 2,
      title: "词汇达人",
      description: "掌握20个以上词汇",
      icon: <Volume2 className="h-8 w-8" />,
      earned: progress.vocabulary >= 20
    },
    {
      id: 3,
      title: "句型专家",
      description: "完成所有句型练习",
      icon: <BookOpen className="h-8 w-8" />,
      earned: progress.sentences >= 15
    },
    {
      id: 4,
      title: "听力能手",
      description: "完成所有听力练习",
      icon: <Ear className="h-8 w-8" />,
      earned: progress.listening >= 10
    },
    {
      id: 5,
      title: "口语之星",
      description: "完成所有口语练习",
      icon: <Mic className="h-8 w-8" />,
      earned: progress.speaking >= 10
    },
    {
      id: 6,
      title: "学习冠军",
      description: "完成所有学习内容",
      icon: <Trophy className="h-8 w-8" />,
      earned: progress.total >= 91 // 所有内容完成
    }
  ];

  const totalCompleted = progress.total;
  const totalAvailable = 26 + 30 + 15 + 10 + 10; // 所有模块总数
  const overallProgress = Math.round((totalCompleted / totalAvailable) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">学习进度</h1>
        <p className="text-gray-600">追踪您的英语学习成果</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">总体进度</h2>
          <div className="text-lg font-semibold text-blue-600">
            {overallProgress}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        
        <div className="text-center text-gray-600">
          已完成 {totalCompleted} / {totalAvailable} 项学习内容
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${module.color} text-white mr-4`}>
                {module.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{module.name}</h3>
                <div className="text-sm text-gray-600">
                  {typeof module.completed === 'object' 
                    ? `${Object.values(module.completed).filter(Boolean).length} / ${module.total}` 
                    : `${module.completed} / ${module.total}`}
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${module.color} h-2 rounded-full`} 
                style={{ 
                  width: `${Math.round(
                    (typeof module.completed === 'object' 
                      ? Object.values(module.completed).filter(Boolean).length 
                      : module.completed) / module.total * 100
                  )}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
          学习成就
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border-2 flex items-center ${
                achievement.earned 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg mr-4 ${
                achievement.earned 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {achievement.icon}
              </div>
              <div>
                <div className={`font-bold ${
                  achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.description}
                </div>
                {achievement.earned && (
                  <div className="text-xs font-semibold text-yellow-600 mt-1">
                    已获得
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;