import React, { useState } from 'react';
import { Volume2, CheckCircle, Play } from 'lucide-react';

const VocabularyLessonPage = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState(
    JSON.parse(localStorage.getItem('completedVocabulary')) || {}
  );

  // 词汇数据
  const categories = [
    {
      name: "数字与颜色",
      words: [
        { english: "One", chinese: "一", pronunciation: "/wʌn/" },
        { english: "Two", chinese: "二", pronunciation: "/tuː/" },
        { english: "Three", chinese: "三", pronunciation: "/θriː/" },
        { english: "Four", chinese: "四", pronunciation: "/fɔː/" },
        { english: "Five", chinese: "五", pronunciation: "/faɪv/" },
        { english: "Red", chinese: "红色", pronunciation: "/red/" },
        { english: "Blue", chinese: "蓝色", pronunciation: "/bluː/" },
        { english: "Green", chinese: "绿色", pronunciation: "/ɡriːn/" },
        { english: "Yellow", chinese: "黄色", pronunciation: "/ˈjeləʊ/" },
        { english: "Black", chinese: "黑色", pronunciation: "/blæk/" }
      ]
    },
    {
      name: "家庭成员",
      words: [
        { english: "Father", chinese: "父亲", pronunciation: "/ˈfɑːðə/" },
        { english: "Mother", chinese: "母亲", pronunciation: "/ˈmʌðə/" },
        { english: "Brother", chinese: "兄弟", pronunciation: "/ˈbrʌðə/" },
        { english: "Sister", chinese: "姐妹", pronunciation: "/ˈsɪstə/" },
        { english: "Grandfather", chinese: "祖父", pronunciation: "/ˈɡrænfɑːðə/" },
        { english: "Grandmother", chinese: "祖母", pronunciation: "/ˈɡrænmʌðə/" },
        { english: "Son", chinese: "儿子", pronunciation: "/sʌn/" },
        { english: "Daughter", chinese: "女儿", pronunciation: "/ˈdɔːtə/" }
      ]
    },
    {
      name: "日常用品",
      words: [
        { english: "Book", chinese: "书", pronunciation: "/bʊk/" },
        { english: "Pen", chinese: "钢笔", pronunciation: "/pen/" },
        { english: "Table", chinese: "桌子", pronunciation: "/ˈteɪbl/" },
        { english: "Chair", chinese: "椅子", pronunciation: "/tʃeə/" },
        { english: "Door", chinese: "门", pronunciation: "/dɔː/" },
        { english: "Window", chinese: "窗户", pronunciation: "/ˈwɪndəʊ/" },
        { english: "Bed", chinese: "床", pronunciation: "/bed/" },
        { english: "Phone", chinese: "电话", pronunciation: "/fəʊn/" }
      ]
    }
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleWordComplete = (categoryIndex, wordIndex) => {
    const key = `${categoryIndex}-${wordIndex}`;
    const updated = { ...completedWords, [key]: !completedWords[key] };
    setCompletedWords(updated);
    localStorage.setItem('completedVocabulary', JSON.stringify(updated));
  };

  const currentCategoryData = categories[currentCategory];
  const currentWordData = currentCategoryData.words[currentWord];
  const completionKey = `${currentCategory}-${currentWord}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">基础词汇练习</h1>
        <p className="text-gray-600">学习日常生活中最常用的英语单词</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentCategory(index);
                setCurrentWord(0);
                setShowTranslation(false);
              }}
              className={`px-4 py-2 rounded-lg ${
                currentCategory === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="text-7xl font-bold mb-6 text-blue-600">
            {currentWordData.english}
          </div>
          
          {showTranslation && (
            <div className="text-3xl font-semibold mb-4 text-gray-800">
              {currentWordData.chinese}
            </div>
          )}
          
          <div className="text-gray-600 mb-6">
            发音: {currentWordData.pronunciation}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => speakText(currentWordData.english)}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              播放发音
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              <Play className="h-5 w-5 mr-2" />
              {showTranslation ? '隐藏翻译' : '显示翻译'}
            </button>
            <button
              onClick={() => handleWordComplete(currentCategory, currentWord)}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {completedWords[completionKey] ? '取消完成' : '标记完成'}
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentWord(prev => Math.max(0, prev - 1))}
              disabled={currentWord === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              上一个
            </button>
            <button
              onClick={() => setCurrentWord(prev => Math.min(currentCategoryData.words.length - 1, prev + 1))}
              disabled={currentWord === currentCategoryData.words.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              下一个
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {currentCategoryData.name} 词汇表
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {currentCategoryData.words.map((word, index) => {
            const key = `${currentCategory}-${index}`;
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentWord(index);
                  setShowTranslation(false);
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentWord === index
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${
                  completedWords[key]
                    ? 'ring-2 ring-green-500'
                    : ''
                }`}
              >
                <div className="font-bold text-lg">{word.english}</div>
                <div className="text-sm text-gray-600">{word.chinese}</div>
                {completedWords[key] && (
                  <CheckCircle className="h-4 w-4 text-green-500 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VocabularyLessonPage;