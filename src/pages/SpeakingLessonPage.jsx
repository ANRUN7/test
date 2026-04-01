import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, CheckCircle, Volume2 } from 'lucide-react';

const SpeakingLessonPage = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(
    JSON.parse(localStorage.getItem('completedSpeaking')) || []
  );
  const recognitionRef = useRef(null);

  // 口语练习数据
  const exercises = [
    {
      id: 1,
      type: "字母发音",
      text: "A",
      example: "Apple"
    },
    {
      id: 2,
      type: "单词发音",
      text: "Hello",
      example: "Hello, how are you?"
    },
    {
      id: 3,
      type: "短句跟读",
      text: "My name is Tom.",
      example: "My name is Tom. I am ten years old."
    },
    {
      id: 4,
      type: "日常对话",
      text: "How are you today?",
      example: "How are you today? I'm fine, thank you."
    }
  ];

  // 检查浏览器是否支持语音识别
  const isSpeechRecognitionSupported = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  };

  // 初始化语音识别
  useEffect(() => {
    if (isSpeechRecognitionSupported()) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecordedText(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('语音识别错误:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setRecordedText('');
      setShowResult(false);
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setRecordedText('');
      setShowResult(false);
    }
  };

  const handleComplete = () => {
    const exerciseId = exercises[currentExercise].id;
    if (!completedExercises.includes(exerciseId)) {
      const updated = [...completedExercises, exerciseId];
      setCompletedExercises(updated);
      localStorage.setItem('completedSpeaking', JSON.stringify(updated));
    }
    handleNext();
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">口语跟读练习</h1>
        <p className="text-gray-600">跟读练习提升口语表达和发音</p>
      </div>

      {!isSpeechRecognitionSupported() && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6">
          <p className="font-bold">浏览器不支持语音识别</p>
          <p>请使用最新版本的Chrome、Edge或其他支持Web Speech API的浏览器。</p>
        </div>
      )}

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
          
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {currentExerciseData.text}
            </div>
            <div className="text-gray-600 mb-6">
              示例句子: {currentExerciseData.example}
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => speakText(currentExerciseData.text)}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                播放示例
              </button>
              <button
                onClick={() => speakText(currentExerciseData.example)}
                className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                播放句子
              </button>
            </div>
          </div>

          {isSpeechRecognitionSupported() && (
            <div className="text-center mb-8">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={showResult}
                className={`flex items-center mx-auto px-6 py-3 rounded-full text-white font-medium transition-all ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                } ${showResult ? 'opacity-50' : ''}`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" />
                    停止录音
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    开始跟读
                  </>
                )}
              </button>
              
              <div className="mt-4 text-gray-600">
                {isRecording ? '正在录音...' : '点击按钮开始跟读练习'}
              </div>
            </div>
          )}

          {recordedText && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="font-semibold text-gray-800 mb-2">您的跟读:</div>
              <div className="text-lg">{recordedText}</div>
            </div>
          )}

          {showResult && recordedText && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="font-semibold text-gray-800 mb-2">练习建议:</div>
              <div className="text-gray-700">
                请对比原文和您的跟读，注意发音和语调的差异。可以多次练习直到满意为止。
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!recordedText}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                提交练习
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setRecordedText('');
                    setShowResult(false);
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  重新练习
                </button>
                <button
                  onClick={handleComplete}
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">口语练习进度</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              onClick={() => {
                setCurrentExercise(index);
                setRecordedText('');
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

export default SpeakingLessonPage;