import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

const ListeningLessonPage = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(
    JSON.parse(localStorage.getItem('completedListening')) || []
  );

  // 听力练习数据
  const exercises = [
    {
      id: 1,
      type: "数字识别",
      question: "听音频，选择你听到的数字",
      audioText: "Seven",
      options: ["Five", "Seven", "Nine", "Three"],
      correctAnswer: "Seven"
    },
    {
      id: 2,
      type: "颜色识别",
      question: "听音频，选择正确的颜色",
      audioText: "Blue",
      options: ["Red", "Green", "Blue", "Yellow"],
      correctAnswer: "Blue"
    },
    {
      id: 3,
      type: "简单问答",
      question: "听对话，选择正确的回答",
      audioText: "How are you? I'm fine, thank you.",
      options: [
        "I'm ten years old.",
        "I'm fine, thank you.",
        "It's sunny today.",
        "I like apples."
      ],
      correctAnswer: "I'm fine, thank you."
    },
    {
      id: 4,
      type: "日常对话",
      question: "听对话，选择谈论的主题",
      audioText: "What time is it? It's three o'clock.",
      options: [
        "Weather",
        "Time",
        "Food",
        "Family"
      ],
      correctAnswer: "Time"
    }
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // 稍慢的语速
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handlePlayAudio = () => {
    speakText(exercises[currentExercise].audioText);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setShowResult(false);
    }
  };

  const handleComplete = () => {
    const exerciseId = exercises[currentExercise].id;
    if (!completedExercises.includes(exerciseId)) {
      const updated = [...completedExercises, exerciseId];
      setCompletedExercises(updated);
      localStorage.setItem('completedListening', JSON.stringify(updated));
    }
    handleNext();
  };

  const currentExerciseData = exercises[currentExercise];
  const isCorrect = userAnswer === currentExerciseData.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">听力入门训练</h1>
        <p className="text-gray-600">通过简单对话提升英语听力能力</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-800">
            练习 {currentExercise + 1} / {exercises.length}
          </div>
          <div className="text-sm text-gray-600">
            已完成: {completedExercises.length} / {exercises.length}
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            {currentExerciseData.type}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {currentExerciseData.question}
          </h2>

          <div className="flex justify-center mb-8">
            <button
              onClick={handlePlayAudio}
              disabled={isPlaying}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  播放中...
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5 mr-2" />
                  播放音频
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentExerciseData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setUserAnswer(option)}
                disabled={showResult}
                className={`p-4 text-left rounded-lg border-2 transition-all ${
                  userAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${
                  showResult && option === currentExerciseData.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : ''
                } ${
                  showResult && userAnswer === option && !isCorrect
                    ? 'border-red-500 bg-red-50'
                    : ''
                }`}
              >
                <div className="font-medium">{option}</div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
            }`}>
              <div className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '回答正确!' : '回答错误!'}
              </div>
              <div className="mt-2">
                正确答案: <span className="font-semibold">{currentExerciseData.correctAnswer}</span>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!userAnswer}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                提交答案
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setUserAnswer('');
                    setShowResult(false);
                  }}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重新答题
                </button>
                <button
                  onClick={isCorrect ? handleComplete : () => setShowResult(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {currentExercise < exercises.length - 1 ? '下一题' : '完成练习'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">听力练习进度</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              onClick={() => {
                setCurrentExercise(index);
                setUserAnswer('');
                setShowResult(false);
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                currentExercise === index
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                completedExercises.includes(exercise.id)
                  ? 'ring-2 ring-green-500'
                  : ''
              }`}
            >
              <div className="font-semibold text-gray-800 mb-1">
                练习 {index + 1}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {exercise.type}
              </div>
              {completedExercises.includes(exercise.id) && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeningLessonPage;