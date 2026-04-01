import React, { useState, useEffect } from 'react';
import { Volume2, Play, CheckCircle } from 'lucide-react';

const AlphabetLessonPage = () => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLetters, setCompletedLetters] = useState(
    JSON.parse(localStorage.getItem('completedAlphabet')) || []
  );

  // 英文字母数据
  const letters = [
    { char: 'A', word: 'Apple', pronunciation: '/ˈæpəl/' },
    { char: 'B', word: 'Ball', pronunciation: '/bɔːl/' },
    { char: 'C', word: 'Cat', pronunciation: '/kæt/' },
    { char: 'D', word: 'Dog', pronunciation: '/dɒɡ/' },
    { char: 'E', word: 'Elephant', pronunciation: '/ˈelɪfənt/' },
    { char: 'F', word: 'Fish', pronunciation: '/fɪʃ/' },
    { char: 'G', word: 'Goat', pronunciation: '/ɡəʊt/' },
    { char: 'H', word: 'House', pronunciation: '/haʊs/' },
    { char: 'I', word: 'Ice', pronunciation: '/aɪs/' },
    { char: 'J', word: 'Juice', pronunciation: '/dʒuːs/' },
    { char: 'K', word: 'Kite', pronunciation: '/kaɪt/' },
    { char: 'L', word: 'Lion', pronunciation: '/ˈlaɪən/' },
    { char: 'M', word: 'Monkey', pronunciation: '/ˈmʌŋki/' },
    { char: 'N', word: 'Nest', pronunciation: '/nest/' },
    { char: 'O', word: 'Orange', pronunciation: '/ˈɒrɪndʒ/' },
    { char: 'P', word: 'Panda', pronunciation: '/ˈpændə/' },
    { char: 'Q', word: 'Queen', pronunciation: '/kwiːn/' },
    { char: 'R', word: 'Rabbit', pronunciation: '/ˈræbɪt/' },
    { char: 'S', word: 'Sun', pronunciation: '/sʌn/' },
    { char: 'T', word: 'Tree', pronunciation: '/triː/' },
    { char: 'U', word: 'Umbrella', pronunciation: '/ʌmˈbrelə/' },
    { char: 'V', word: 'Van', pronunciation: '/væn/' },
    { char: 'W', word: 'Water', pronunciation: '/ˈwɔːtə/' },
    { char: 'X', word: 'Xylophone', pronunciation: '/ˈzaɪləfəʊn/' },
    { char: 'Y', word: 'Yellow', pronunciation: '/ˈjeləʊ/' },
    { char: 'Z', word: 'Zebra', pronunciation: '/ˈzebrə/' }
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleLetterComplete = (index) => {
    if (!completedLetters.includes(index)) {
      const updated = [...completedLetters, index];
      setCompletedLetters(updated);
      localStorage.setItem('completedAlphabet', JSON.stringify(updated));
    }
  };

  const playCurrentLetter = () => {
    speakText(letters[currentLetter].char);
  };

  const playExampleWord = () => {
    speakText(letters[currentLetter].word);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">字母发音学习</h1>
        <p className="text-gray-600">学习26个英文字母的正确发音和书写</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex flex-col items-center">
          <div className="text-9xl font-bold mb-6 text-blue-600">
            {letters[currentLetter].char}
          </div>
          
          <div className="text-center mb-8">
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              {letters[currentLetter].word}
            </div>
            <div className="text-gray-600 mb-4">
              发音: {letters[currentLetter].pronunciation}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={playCurrentLetter}
                disabled={isPlaying}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                播放字母
              </button>
              <button
                onClick={playExampleWord}
                disabled={isPlaying}
                className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                播放示例词
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentLetter(prev => Math.max(0, prev - 1))}
              disabled={currentLetter === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              上一个
            </button>
            <button
              onClick={() => handleLetterComplete(currentLetter)}
              className="flex items-center px-6 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              {completedLetters.includes(currentLetter) ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  已完成
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  标记完成
                </>
              )}
            </button>
            <button
              onClick={() => setCurrentLetter(prev => Math.min(letters.length - 1, prev + 1))}
              disabled={currentLetter === letters.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              下一个
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">字母学习进度</h2>
        <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-2">
          {letters.map((letter, index) => (
            <div
              key={index}
              onClick={() => setCurrentLetter(index)}
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                currentLetter === index 
                  ? 'bg-blue-100 border-2 border-blue-500' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                completedLetters.includes(index) 
                  ? 'ring-2 ring-green-500' 
                  : ''
              }`}
            >
              <div className="text-xl font-bold">{letter.char}</div>
              {completedLetters.includes(index) && (
                <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-gray-600">
          已完成: {completedLetters.length} / {letters.length}
        </div>
      </div>
    </div>
  );
};

export default AlphabetLessonPage;