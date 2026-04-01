import React, { useState } from 'react';
import { Volume2, CheckCircle, Play } from 'lucide-react';

const IPALessonPage = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentSymbol, setCurrentSymbol] = useState(0);
  const [showExample, setShowExample] = useState(false);
  const [completedSymbols, setCompletedSymbols] = useState(
    JSON.parse(localStorage.getItem('completedIPA')) || {}
  );

  // 音标数据（48个国际音标）
  const categories = [
    {
      name: "元音(Vowels) - 单元音",
      symbols: [
        { 
          symbol: "/iː/", 
          example: "see", 
          chinese: "看见",
          description: "长元音，舌尖抵下齿，嘴角向两侧拉开" 
        },
        { 
          symbol: "/ɪ/", 
          example: "sit", 
          chinese: "坐",
          description: "短元音，口型比/iː/稍松" 
        },
        { 
          symbol: "/e/", 
          example: "bed", 
          chinese: "床",
          description: "短元音，嘴角向两侧拉开，舌位比/iː/低" 
        },
        { 
          symbol: "/æ/", 
          example: "cat", 
          chinese: "猫",
          description: "短元音，嘴角向两侧拉开，舌位低平" 
        },
        { 
          symbol: "/ɑː/", 
          example: "car", 
          chinese: "汽车",
          description: "长元音，口张大，舌身平放" 
        },
        { 
          symbol: "/ɒ/", 
          example: "hot", 
          chinese: "热的",
          description: "短元音，口张大，舌后部抬起" 
        },
        { 
          symbol: "/ɔː/", 
          example: "saw", 
          chinese: "锯子",
          description: "长元音，口张大，舌后部抬起" 
        },
        { 
          symbol: "/ʊ/", 
          example: "book", 
          chinese: "书",
          description: "短元音，双唇收圆，舌后部抬起" 
        },
        { 
          symbol: "/uː/", 
          example: "blue", 
          chinese: "蓝色",
          description: "长元音，双唇收圆，舌后部抬起" 
        },
        { 
          symbol: "/ʌ/", 
          example: "cup", 
          chinese: "杯子",
          description: "短元音，口半开，舌中部抬起" 
        },
        { 
          symbol: "/ɜː/", 
          example: "bird", 
          chinese: "鸟",
          description: "长元音，舌中部抬起，口半开" 
        },
        { 
          symbol: "/ə/", 
          example: "about", 
          chinese: "关于",
          description: "中元音，口半开，舌中部微抬" 
        }
      ]
    },
    {
      name: "元音(Vowels) - 双元音",
      symbols: [
        { 
          symbol: "/eɪ/", 
          example: "day", 
          chinese: "白天",
          description: "从/e/滑向/ɪ/，口型由开到合" 
        },
        { 
          symbol: "/aɪ/", 
          example: "my", 
          chinese: "我的",
          description: "从/a/滑向/ɪ/，口型由开到合" 
        },
        { 
          symbol: "/ɔɪ/", 
          example: "boy", 
          chinese: "男孩",
          description: "从/ɔ/滑向/ɪ/，口型由圆到扁" 
        },
        { 
          symbol: "/əʊ/", 
          example: "go", 
          chinese: "去",
          description: "从/ə/滑向/ʊ/，双唇从扁到圆" 
        },
        { 
          symbol: "/aʊ/", 
          example: "now", 
          chinese: "现在",
          description: "从/a/滑向/ʊ/，口型由开到圆" 
        },
        { 
          symbol: "/ɪə/", 
          example: "ear", 
          chinese: "耳朵",
          description: "从/ɪ/滑向/ə/，口型由合到开" 
        },
        { 
          symbol: "/eə/", 
          example: "air", 
          chinese: "空气",
          description: "从/e/滑向/ə/，口型由开到半开" 
        },
        { 
          symbol: "/ʊə/", 
          example: "tour", 
          chinese: "旅行",
          description: "从/ʊ/滑向/ə/，口型由圆到半开" 
        }
      ]
    },
    {
      name: "辅音(Consonants) - 爆破音",
      symbols: [
        { 
          symbol: "/p/", 
          example: "pen", 
          chinese: "钢笔",
          description: "清辅音，双唇紧闭后突然张开送气" 
        },
        { 
          symbol: "/b/", 
          example: "big", 
          chinese: "大的",
          description: "浊辅音，双唇紧闭后突然张开不送气" 
        },
        { 
          symbol: "/t/", 
          example: "tea", 
          chinese: "茶",
          description: "清辅音，舌尖抵上齿龈后突然放开送气" 
        },
        { 
          symbol: "/d/", 
          example: "dog", 
          chinese: "狗",
          description: "浊辅音，舌尖抵上齿龈后突然放开不送气" 
        },
        { 
          symbol: "/k/", 
          example: "cat", 
          chinese: "猫",
          description: "清辅音，舌后部抬起抵软腭后突然放开送气" 
        },
        { 
          symbol: "/g/", 
          example: "go", 
          chinese: "去",
          description: "浊辅音，舌后部抬起抵软腭后突然放开不送气" 
        }
      ]
    },
    {
      name: "辅音(Consonants) - 摩擦音",
      symbols: [
        { 
          symbol: "/f/", 
          example: "fish", 
          chinese: "鱼",
          description: "清辅音，上齿轻触下唇摩擦发音" 
        },
        { 
          symbol: "/v/", 
          example: "very", 
          chinese: "非常",
          description: "浊辅音，上齿轻触下唇摩擦发音" 
        },
        { 
          symbol: "/θ/", 
          example: "think", 
          chinese: "思考",
          description: "清辅音，舌尖轻触上齿摩擦发音" 
        },
        { 
          symbol: "/ð/", 
          example: "this", 
          chinese: "这个",
          description: "浊辅音，舌尖轻触上齿摩擦发音" 
        },
        { 
          symbol: "/s/", 
          example: "see", 
          chinese: "看见",
          description: "清辅音，舌尖接近上齿龈形成窄缝摩擦发音" 
        },
        { 
          symbol: "/z/", 
          example: "zoo", 
          chinese: "动物园",
          description: "浊辅音，舌尖接近上齿龈形成窄缝摩擦发音" 
        },
        { 
          symbol: "/ʃ/", 
          example: "she", 
          chinese: "她",
          description: "清辅音，舌中部抬起接近硬腭形成窄缝摩擦发音" 
        },
        { 
          symbol: "/ʒ/", 
          example: "measure", 
          chinese: "测量",
          description: "浊辅音，舌中部抬起接近硬腭形成窄缝摩擦发音" 
        },
        { 
          symbol: "/h/", 
          example: "hat", 
          chinese: "帽子",
          description: "清辅音，声门微开，气流摩擦发音" 
        }
      ]
    },
    {
      name: "辅音(Consonants) - 其他辅音",
      symbols: [
        { 
          symbol: "/tʃ/", 
          example: "chair", 
          chinese: "椅子",
          description: "破擦音，先阻塞后摩擦" 
        },
        { 
          symbol: "/dʒ/", 
          example: "jump", 
          chinese: "跳",
          description: "破擦音，先阻塞后摩擦" 
        },
        { 
          symbol: "/m/", 
          example: "man", 
          chinese: "男人",
          description: "鼻音，双唇闭合，气流从鼻腔通过" 
        },
        { 
          symbol: "/n/", 
          example: "no", 
          chinese: "不",
          description: "鼻音，舌尖抵上齿龈，气流从鼻腔通过" 
        },
        { 
          symbol: "/ŋ/", 
          example: "sing", 
          chinese: "唱歌",
          description: "鼻音，舌后部抬起抵软腭，气流从鼻腔通过" 
        },
        { 
          symbol: "/l/", 
          example: "leg", 
          chinese: "腿",
          description: "边音，舌尖抵上齿龈，气流从舌两侧通过" 
        },
        { 
          symbol: "/r/", 
          example: "red", 
          chinese: "红色",
          description: "摩擦音，舌尖卷起接近硬腭" 
        },
        { 
          symbol: "/j/", 
          example: "yes", 
          chinese: "是的",
          description: "半元音，舌中部抬起接近硬腭" 
        },
        { 
          symbol: "/w/", 
          example: "we", 
          chinese: "我们",
          description: "半元音，双唇收圆向前突出" 
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

  const handleSymbolComplete = (categoryIndex, symbolIndex) => {
    const key = `${categoryIndex}-${symbolIndex}`;
    const updated = { ...completedSymbols, [key]: !completedSymbols[key] };
    setCompletedSymbols(updated);
    localStorage.setItem('completedIPA', JSON.stringify(updated));
  };

  const currentCategoryData = categories[currentCategory];
  const currentSymbolData = currentCategoryData.symbols[currentSymbol];
  const completionKey = `${currentCategory}-${currentSymbol}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">国际音标学习</h1>
        <p className="text-gray-600">学习48个国际音标，掌握英语发音基础</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentCategory(index);
                setCurrentSymbol(0);
                setShowExample(false);
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
            {currentSymbolData.symbol}
          </div>
          
          {showExample && (
            <div className="text-center mb-4">
              <div className="text-2xl font-semibold text-gray-800">
                示例: {currentSymbolData.example}
              </div>
              <div className="text-lg text-gray-600">
                ({currentSymbolData.chinese})
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6 w-full max-w-2xl">
            <div className="text-gray-700 text-center">
              {currentSymbolData.description}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => speakText(currentSymbolData.example)}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              播放示例
            </button>
            <button
              onClick={() => setShowExample(!showExample)}
              className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              <Play className="h-5 w-5 mr-2" />
              {showExample ? '隐藏示例' : '显示示例'}
            </button>
            <button
              onClick={() => handleSymbolComplete(currentCategory, currentSymbol)}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {completedSymbols[completionKey] ? '取消完成' : '标记完成'}
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentSymbol(prev => Math.max(0, prev - 1))}
              disabled={currentSymbol === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              上一个
            </button>
            <button
              onClick={() => setCurrentSymbol(prev => Math.min(currentCategoryData.symbols.length - 1, prev + 1))}
              disabled={currentSymbol === currentCategoryData.symbols.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              下一个
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {currentCategoryData.name} 音标表
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {currentCategoryData.symbols.map((symbol, index) => {
            const key = `${currentCategory}-${index}`;
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentSymbol(index);
                  setShowExample(false);
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentSymbol === index
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${
                  completedSymbols[key]
                    ? 'ring-2 ring-green-500'
                    : ''
                }`}
              >
                <div className="font-bold text-lg text-center">{symbol.symbol}</div>
                <div className="text-sm text-gray-600 text-center mt-1">{symbol.example}</div>
                {completedSymbols[key] && (
                  <CheckCircle className="h-4 w-4 text-green-500 mt-2 mx-auto" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IPALessonPage;