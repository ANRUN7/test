import React, { useState } from 'react';
import { Volume2, CheckCircle, Play, BookOpen } from 'lucide-react';

const SentenceLessonPage = () => {
  const [currentUnit, setCurrentUnit] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedSentences, setCompletedSentences] = useState(
    JSON.parse(localStorage.getItem('completedSentences')) || {}
  );

  // 句型数据
  const units = [
    {
      name: "主谓宾结构",
      sentences: [
        {
          english: "I eat apples.",
          chinese: "我吃苹果。",
          structure: "主语 + 谓语 + 宾语",
          explanation: "这是英语中最基本的句型结构"
        },
        {
          english: "She reads books.",
          chinese: "她读书。",
          structure: "主语 + 谓语 + 宾语",
          explanation: "第三人称单数动词要加-s"
        },
        {
          english: "We play football.",
          chinese: "我们踢足球。",
          structure: "主语 + 谓语 + 宾语",
          explanation: "复数主语动词用原形"
        }
      ]
    },
    {
      name: "疑问句",
      sentences: [
        {
          english: "Do you like coffee?",
          chinese: "你喜欢咖啡吗？",
          structure: "Do/Does + 主语 + 动词原形 + 其他？",
          explanation: "一般疑问句用Do/Does开头"
        },
        {
          english: "What is your name?",
          chinese: "你叫什么名字？",
          structure: "疑问词 + be动词 + 主语？",
          explanation: "特殊疑问句用疑问词开头"
        },
        {
          english: "Where do you live?",
          chinese: "你住在哪里？",
          structure: "疑问词 + do/does + 主语 + 动词原形？",
          explanation: "对地点提问用where"
        }
      ]
    },
    {
      name: "否定句",
      sentences: [
        {
          english: "I do not like tea.",
          chinese: "我不喜欢茶。",
          structure: "主语 + do/does + not + 动词原形 + 其他",
          explanation: "否定句在助动词后加not"
        },
        {
          english: "She does not work here.",
          chinese: "她不在这里工作。",
          structure: "主语 + does + not + 动词原形 + 其他",
          explanation: "第三人称单数用does not"
        },
        {
          english: "We are not students.",
          chinese: "我们不是学生。",
          structure: "主语 + be动词 + not + 表语",
          explanation: "be动词的否定形式直接加not"
        }
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

  const handleSentenceComplete = (unitIndex, sentenceIndex) => {
    const key = `${unitIndex}-${sentenceIndex}`;
    const updated = { ...completedSentences, [key]: !completedSentences[key] };
    setCompletedSentences(updated);
    localStorage.setItem('completedSentences', JSON.stringify(updated));
  };

  const currentUnitData = units[currentUnit];
  const currentSentenceData = currentUnitData.sentences[currentSentence];
  const completionKey = `${currentUnit}-${currentSentence}`;

  return (
    <div className="max  -w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">简单句型训练</h1>
        <p className="text-gray-600">掌握基本英语句型结构和用法</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {units.map((unit, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentUnit(index);
                setCurrentSentence(0);
                setShowTranslation(false);
              }}
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentUnit === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {unit.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold mb-6 text-blue-600 text-center">
            {currentSentenceData.english}
          </div>
          
          {showTranslation && (
            <div className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              {currentSentenceData.chinese}
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6 w-full max-w-2xl">
            <div className="font-semibold text-gray-800 mb-2">句型结构:</div>
            <div className="text-gray-700">{currentSentenceData.structure}</div>
            <div className="font-semibold text-gray-800 mt-3 mb-2">解释:</div>
            <div className="text-gray-700">{currentSentenceData.explanation}</div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => speakText(currentSentenceData.english)}
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
              onClick={() => handleSentenceComplete(currentUnit, currentSentence)}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {completedSentences[completionKey] ? '取消完成' : '标记完成'}
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentSentence(prev => Math.max(0, prev - 1))}
              disabled={currentSentence === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              上一个
            </button>
            <button
              onClick={() => setCurrentSentence(prev => Math.min(currentUnitData.sentences.length - 1, prev + 1))}
              disabled={currentSentence === currentUnitData.sentences.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              下一个
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {currentUnitData.name} 句型练习
        </h2>
        <div className="space-y-4">
          {currentUnitData.sentences.map((sentence, index) => {
            const key = `${currentUnit}-${index}`;
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentSentence(index);
                  setShowTranslation(false);
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentSentence === index
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${
                  completedSentences[key]
                    ? 'ring-2 ring-green-500'
                    : ''
                }`}
              >
                <div className="font-bold text-lg">{sentence.english}</div>
                <div className="text-gray-600">{sentence.chinese}</div>
                {completedSentences[key] && (
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

export default SentenceLessonPage;