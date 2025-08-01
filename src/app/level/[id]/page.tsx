'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MathQuestionGenerator, generateMathProblemVisual } from '@/lib/math-generator';
import { JapaneseQuestionGenerator, generateJapaneseVisual } from '@/lib/japanese-generator';
import { EnglishQuestionGenerator, generateEnglishVisual } from '@/lib/english-generator';
import { TimeQuestionGenerator, generateTimeVisual } from '@/lib/time-generator';
import { ShapeQuestionGenerator, generateShapeVisual } from '@/lib/shape-generator';
import { MoneyQuestionGenerator, generateMoneyVisual } from '@/lib/money-generator';
import { ReadingQuestionGenerator, generateReadingVisual } from '@/lib/reading-generator';
import { TimeCalculationQuestionGenerator, generateTimeCalculationVisual } from '@/lib/time-calculation-generator';
import { ScienceQuestionGenerator, generateScienceVisual } from '@/lib/science-generator';
import { VocabularyQuestionGenerator, generateVocabularyVisual } from '@/lib/vocabulary-generator';
import { ProgrammingQuestionGenerator, generateProgrammingVisual } from '@/lib/programming-generator';
import { DigitalLiteracyQuestionGenerator, generateDigitalLiteracyVisual } from '@/lib/digital-literacy-generator';
import { TriviaQuestionGenerator, generateTriviaVisual } from '@/lib/trivia-generator';
import { PokemonQuestionGenerator } from '@/lib/pokemon-question-generator';
import { PokemonAchievementSystem } from '@/lib/pokemon-achievement-system';
import { StorageManager } from '@/lib/storage';
import { SoundManager } from '@/lib/sound';
import { VisualEffects } from '@/lib/visual-effects';
import { CertificateManager } from '@/lib/certificate';
import { getAllLevels } from '@/lib/subjects';
import { AdaptiveLearningEngine, LearningSession } from '@/lib/adaptive-learning-engine';
import { Question, GameSession, UserProgress } from '@/types';
import { ArrowLeft, CheckCircle, XCircle, Star, Award, Zap } from 'lucide-react';
import DrawingCanvas from '@/components/DrawingCanvas';

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = params.id as string;
  
  const [session, setSession] = useState<GameSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const [inputError, setInputError] = useState(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGained, setXPGained] = useState(0);
  const [_levelUpOccurred, setLevelUpOccurred] = useState(false);
  const [_newBadges, setNewBadges] = useState<string[]>([]);
  const [adaptiveEngine] = useState(AdaptiveLearningEngine.getInstance());
  const [currentLearningSession, setCurrentLearningSession] = useState<LearningSession | null>(null);
  const [adaptiveMessage, setAdaptiveMessage] = useState<string>('');
  const [suggestBreak, setSuggestBreak] = useState(false);

  useEffect(() => {
    const initializeLevel = async () => {
      // Generate questions based on level and subject
      let questions: Question[] = [];
      
      if (levelId.startsWith('math-')) {
        questions = MathQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('japanese-')) {
        questions = JapaneseQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('english-')) {
        questions = EnglishQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('time-')) {
        questions = TimeQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('shape-')) {
        questions = ShapeQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('money-')) {
        questions = MoneyQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('reading-')) {
        questions = ReadingQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('time-calc-')) {
        questions = TimeCalculationQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('science-')) {
        questions = ScienceQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('vocabulary-')) {
        questions = VocabularyQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('programming-')) {
        questions = ProgrammingQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.includes('literacy')) {
        questions = DigitalLiteracyQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('trivia-')) {
        questions = TriviaQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('pokemon-')) {
        questions = await PokemonQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else {
        questions = MathQuestionGenerator.generateQuestionsByLevelId(levelId);
      }
      
      const newSession: GameSession = {
        id: `session-${Date.now()}`,
        subjectId: levelId.split('-')[0],
        levelId,
        questions,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        startTime: new Date(),
        completed: false
      };

      setSession(newSession);
      setCurrentQuestion(questions[0]);
      
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);

      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);

      // 適応学習セッションを開始
      const userId = 'user-' + (localStorage.getItem('user-id') || Date.now().toString());
      const learningSession: LearningSession = {
        sessionId: `${userId}-${Date.now()}`,
        startTime: new Date(),
        questions: questions,
        responses: [],
        focusLevel: 8, // 初期値
        engagementScore: 8 // 初期値
      };
      setCurrentLearningSession(learningSession);
    };

    initializeLevel();
  }, [levelId]);

  const handleAnswerSubmit = async (userInput?: string) => {
    const finalAnswer = userInput || userAnswer.trim();
    
    if (!currentQuestion || !session || finalAnswer === '') {
      setInputError(true);
      setTimeout(() => setInputError(false), 500);
      return;
    }

    const correct = finalAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setShowDrawingCanvas(false);

    // 適応学習のためのレスポンス記録
    const responseTime = Date.now() - (currentLearningSession?.startTime.getTime() || Date.now());
    const timeSpentSeconds = Math.floor(responseTime / 1000);
    
    if (currentLearningSession) {
      const response = {
        questionId: currentQuestion.id,
        userAnswer: finalAnswer,
        isCorrect: correct,
        timeSpent: timeSpentSeconds,
        attempts: 1, // TODO: 実際の試行回数を記録
        helpUsed: false // TODO: ヘルプ使用状況を記録
      };
      
      currentLearningSession.responses.push(response);
      setCurrentLearningSession(currentLearningSession);

      // 適応学習エンジンによるリアルタイム調整
      try {
        const userId = currentLearningSession.sessionId.split('-')[0] + '-' + currentLearningSession.sessionId.split('-')[1];
        const adjustment = await adaptiveEngine.adjustRealTime(userId, {
          isCorrect: correct,
          timeSpent: timeSpentSeconds,
          attempts: 1
        });

        setAdaptiveMessage(adjustment.encouragementMessage);
        setSuggestBreak(adjustment.suggestBreak);

        // 難易度調整があれば次の問題に反映（実際の実装では問題生成時に使用）
        if (adjustment.nextDifficultyAdjustment !== 0) {
          console.log('Difficulty adjustment:', adjustment.nextDifficultyAdjustment);
        }
      } catch (error) {
        console.error('Adaptive learning adjustment failed:', error);
      }
    }

    // Play sound
    if (correct) {
      soundManager?.playSound('correct');
    } else {
      soundManager?.playSound('incorrect');
    }

    // Update session
    const updatedSession = {
      ...session,
      score: session.score + (correct ? currentQuestion.points : 0),
      correctAnswers: session.correctAnswers + (correct ? 1 : 0)
    };
    setSession(updatedSession);

    if (correct) {
      // Play correct sound and encouragement
      soundManager?.playSound('correct');
      setTimeout(() => {
        soundManager?.speakEncouragement(true);
      }, 500);
      
      // Update consecutive correct count
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);

      // Calculate XP gain with bonuses
      let xpGain = currentQuestion.points;
      if (newConsecutive >= 3) xpGain += 5; // Bonus for streak
      if (newConsecutive >= 5) xpGain += 10; // Bigger bonus for longer streak
      
      setXPGained(xpGain);
      setShowXPGain(true);

      // Update progress with enhanced rewards
      const oldProgress = StorageManager.getProgress();
      const oldLevel = oldProgress.playerLevel;
      
      // Add points and XP
      let newProgress = StorageManager.addPoints(currentQuestion.points);
      newProgress = StorageManager.addExperience(xpGain);
      
      // Update daily goals
      newProgress = StorageManager.updateDailyGoals('answer_question', 1);
      newProgress = StorageManager.updateDailyGoals('earn_points', currentQuestion.points);
      
      // Check for badges
      newProgress = StorageManager.checkAndAwardBadges('first_question', { 
        subject: session.subjectId 
      });
      
      // Check for perfect score badge
      if (newConsecutive >= 10) {
        newProgress = StorageManager.checkAndAwardBadges('perfect_score', { 
          consecutiveCorrect: newConsecutive 
        });
      }

      // Check for level up
      if (newProgress.playerLevel > oldLevel) {
        setLevelUpOccurred(true);
        VisualEffects.createLevelUpNotification(newProgress.playerLevel);
      }

      // Check for new badges
      const newBadgeIds = newProgress.badges
        .filter(badge => !oldProgress.badges.some(oldBadge => oldBadge.id === badge.id))
        .map(badge => badge.id);
      
      if (newBadgeIds.length > 0) {
        setNewBadges(newBadgeIds);
        newProgress.badges
          .filter(badge => newBadgeIds.includes(badge.id))
          .forEach(badge => {
            setTimeout(() => {
              VisualEffects.createBadgeUnlockNotification(badge);
            }, 1000);
          });
      }

      setProgress(newProgress);

      // Create visual effects
      setTimeout(() => {
        VisualEffects.createParticleBurst(
          window.innerWidth / 2, 
          window.innerHeight / 2, 
          '#4ade80'
        );
        
        if (newConsecutive >= 3) {
          VisualEffects.createConfetti(20);
        }
      }, 500);

    } else {
      // Play incorrect sound and encouragement
      soundManager?.playSound('incorrect');
      setTimeout(() => {
        soundManager?.speakEncouragement(false);
      }, 500);
      
      // Reset consecutive count on wrong answer
      setConsecutiveCorrect(0);
      
      // Visual feedback for wrong answer
      const questionElement = document.querySelector('.question-container');
      if (questionElement) {
        VisualEffects.createErrorFeedback(questionElement as HTMLElement);
      }
    }

    // Hide XP gain effect after animation
    setTimeout(() => {
      setShowXPGain(false);
    }, 1000);

    // Auto advance after 2.5 seconds (longer to show effects)
    setTimeout(() => {
      handleNextQuestion(updatedSession);
    }, 2500);
  };

  const handleDrawingComplete = (recognizedText: string) => {
    // OCRで認識された文字または空文字列を受け取る
    if (recognizedText) {
      handleAnswerSubmit(recognizedText);
    } else {
      // 認識できなかった場合は通常の入力モードに戻る
      setShowDrawingCanvas(false);
    }
  };

  const handleDrawingClear = () => {
    // Reset any drawing state if needed
  };

  const handleNextQuestion = (currentSession: GameSession) => {
    const nextIndex = currentSession.currentQuestionIndex + 1;
    
    if (nextIndex >= currentSession.questions.length) {
      // Level completed
      completeLevel(currentSession);
      return;
    }

    // Move to next question
    const updatedSession = {
      ...currentSession,
      currentQuestionIndex: nextIndex
    };
    
    setSession(updatedSession);
    setCurrentQuestion(currentSession.questions[nextIndex]);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowDrawingCanvas(false);
  };

  const completeLevel = async (finalSession: GameSession) => {
    const completedSession = {
      ...finalSession,
      completed: true,
      endTime: new Date()
    };
    
    setSession(completedSession);
    
    // Save completion
    let newProgress = StorageManager.completeLevel(levelId);
    
    // Check for Pokemon achievements
    const pokemonSystem = PokemonAchievementSystem.getInstance();
    const pokemonRewards = await pokemonSystem.checkAndAwardBadges(newProgress);
    
    // Check for level completion reward
    const levelReward = await pokemonSystem.getLevelCompletionReward(
      levelId, 
      (completedSession.correctAnswers / completedSession.questions.length) * 100
    );
    
    if (levelReward) {
      pokemonRewards.push(levelReward);
    }
    
    // Update progress again if Pokemon rewards were added
    if (pokemonRewards.length > 0) {
      newProgress = StorageManager.getProgress();
    }
    
    setProgress(newProgress);
    
    // Play celebration sound and speak completion
    soundManager?.playSound('celebration');
    setTimeout(() => {
      soundManager?.speakLevelComplete(completedSession.score);
    }, 1000);
    
    // Generate certificate if perfect score or high achievement
    const correctRate = (completedSession.correctAnswers / completedSession.questions.length) * 100;
    const currentLevel = getAllLevels().find(l => l.id === levelId);
    
    if (correctRate === 100) {
      const certificate = CertificateManager.generateCertificate(
        'perfect_score',
        newProgress,
        { score: completedSession.score, level: currentLevel }
      );
      setTimeout(() => {
        CertificateManager.showCertificateModal(certificate);
      }, 3000);
    } else if (currentLevel && currentLevel.difficulty >= 3) {
      const certificate = CertificateManager.generateCertificate(
        'level_completion',
        newProgress,
        { score: completedSession.score, level: currentLevel }
      );
      setTimeout(() => {
        CertificateManager.showCertificateModal(certificate);
      }, 3000);
    }
    
    // Show results screen
    setShowResult(false);
    setCurrentQuestion(null);
  };

  const handleBackClick = () => {
    soundManager?.playSound('click');
    router.back();
  };

  const handleRetry = () => {
    soundManager?.playSound('click');
    router.refresh();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit();
    }
  };

  const renderPokemonVisual = (question: Question) => {
    if (!question.visualAid) return null;

    const content = question.visualAid.content as any;

    switch (question.visualAid.type) {
      case 'pokemon-comparison':
        return (
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <img 
                src={content.pokemon1?.image || ''} 
                alt={content.pokemon1?.name || ''} 
                className="w-24 h-24 mx-auto mb-2"
              />
              <div className="font-bold text-lg">{content.pokemon1?.name}</div>
              <div className="text-sm text-gray-600">
                {content.comparisonType === 'height' ? `${content.pokemon1?.height}cm` : `${content.pokemon1?.weight}kg`}
              </div>
            </div>
            <div className="text-4xl">VS</div>
            <div className="text-center">
              <img 
                src={content.pokemon2?.image || ''} 
                alt={content.pokemon2?.name || ''} 
                className="w-24 h-24 mx-auto mb-2"
              />
              <div className="font-bold text-lg">{content.pokemon2?.name}</div>
              <div className="text-sm text-gray-600">
                {content.comparisonType === 'height' ? `${content.pokemon2?.height}cm` : `${content.pokemon2?.weight}kg`}
              </div>
            </div>
          </div>
        );

      case 'pokemon-math':
        return (
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <img 
                src={content.pokemon1?.image || ''} 
                alt={content.pokemon1?.name || ''} 
                className="w-20 h-20 mx-auto mb-1"
              />
              <div className="text-sm font-bold">{content.pokemon1?.weight}kg</div>
            </div>
            <div className="text-3xl">+</div>
            <div className="text-center">
              <img 
                src={content.pokemon2?.image || ''} 
                alt={content.pokemon2?.name || ''} 
                className="w-20 h-20 mx-auto mb-1"
              />
              <div className="text-sm font-bold">{content.pokemon2?.weight}kg</div>
            </div>
            <div className="text-3xl">=</div>
            <div className="text-3xl font-bold text-blue-600">?</div>
          </div>
        );

      case 'pokemon-type-quiz':
        return (
          <div className="text-center mb-6">
            <img 
              src={content.pokemon?.image || ''} 
              alt={content.pokemon?.name || ''} 
              className="w-32 h-32 mx-auto mb-4"
            />
            <div className="text-xl font-bold mb-2">{content.pokemon?.name}</div>
          </div>
        );

      case 'pokemon-name-quiz':
        return (
          <div className="text-center mb-6">
            <img 
              src={content.pokemon?.image || ''} 
              alt={content.pokemon?.name || ''} 
              className="w-32 h-32 mx-auto mb-4"
            />
            {content.showName && (
              <div className="text-2xl font-bold mb-2">{content.pokemon?.name}</div>
            )}
            {content.pokemon?.cry && (
              <button
                onClick={() => {
                  const audio = new Audio(content.pokemon.cry);
                  audio.volume = 0.5;
                  audio.play().catch(console.error);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
              >
                🔊 鳴き声を聞く
              </button>
            )}
          </div>
        );

      case 'pokemon-english-quiz':
        return (
          <div className="text-center mb-6">
            <img 
              src={content.pokemon?.image || ''} 
              alt={content.pokemon?.japanese || ''} 
              className="w-32 h-32 mx-auto mb-4"
            />
            <div className="text-xl font-bold mb-2">{content.pokemon?.japanese}</div>
            {content.pokemon?.cry && (
              <button
                onClick={() => {
                  const audio = new Audio(content.pokemon.cry);
                  audio.volume = 0.5;
                  audio.play().catch(console.error);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                🔊 鳴き声を聞く
              </button>
            )}
          </div>
        );

      case 'pokemon-evolution':
        return (
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <img 
                src={content.basePokemon?.image || ''} 
                alt={content.basePokemon?.name || ''} 
                className="w-24 h-24 mx-auto mb-2"
              />
              <div className="font-bold">{content.basePokemon?.name}</div>
            </div>
            <div className="text-4xl">→</div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-2 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-2xl">?</span>
              </div>
              <div className="font-bold text-gray-500">???</div>
            </div>
          </div>
        );

      case 'pokemon-cry-quiz':
        return (
          <div className="text-center mb-6">
            <div className="bg-blue-100 rounded-lg p-6 mb-4">
              <div className="text-4xl mb-4">🔊</div>
              <button
                onClick={() => {
                  const audio = new Audio(content.audioUrl);
                  audio.volume = 0.5;
                  audio.play().catch(console.error);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold"
              >
                鳴き声を再生
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {content.options?.slice(0, 4).map((option: any, index: number) => (
                <div key={index} className="text-center p-2 border rounded-lg">
                  <img 
                    src={option.image || ''} 
                    alt={option.name || ''} 
                    className="w-16 h-16 mx-auto mb-1"
                  />
                  <div className="text-sm font-semibold">{option.name}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pokemon-legendary-quiz':
        return (
          <div className="text-center mb-6">
            <div className="relative">
              <img 
                src={content.pokemon?.image || ''} 
                alt={content.pokemon?.name || ''} 
                className="w-40 h-40 mx-auto mb-4 filter brightness-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-yellow-400 opacity-30 rounded-lg"></div>
              {content.specialEffect && (
                <div className="absolute inset-0 animate-pulse bg-yellow-200 opacity-50 rounded-lg"></div>
              )}
            </div>
            <div className="text-sm text-gray-600 mb-2">シルエットクイズ</div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!session || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">読み込み中...</div>
      </div>
    );
  }

  // Level completed screen
  if (session.completed) {
    const percentage = Math.round((session.correctAnswers / session.questions.length) * 100);
    const isPerfect = percentage === 100;
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full animate-bounce-in">
          <div className="text-8xl mb-6">
            {isPerfect ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '📚'}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {isPerfect ? 'パーフェクト！' : percentage >= 80 ? 'すごいね！' : percentage >= 60 ? 'よくできました！' : 'もう少し！'}
          </h1>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
              <span className="font-medium">正解数</span>
              <span className="text-2xl font-bold text-green-600">
                {session.correctAnswers} / {session.questions.length}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
              <span className="font-medium">獲得ポイント</span>
              <span className="text-2xl font-bold text-yellow-600">
                {session.score}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
              <span className="font-medium">正解率</span>
              <span className="text-2xl font-bold text-blue-600">
                {percentage}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="kid-button w-full"
            >
              ホームに戻る
            </button>
            
            <button
              onClick={handleRetry}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition-colors"
            >
              もう一度挑戦
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">戻る</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Score */}
            <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-md">
              <Star className="text-yellow-500" size={20} />
              <span className="font-bold text-yellow-600">{session.score}</span>
            </div>
            
            {/* Player Level */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full px-4 py-2 shadow-md">
              <Award size={18} />
              <span className="font-bold text-sm">Lv.{progress.playerLevel}</span>
            </div>

            {/* Consecutive Streak */}
            {consecutiveCorrect > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full px-3 py-2 shadow-md animate-glow">
                <span className="text-sm">🔥</span>
                <span className="font-bold text-sm">{consecutiveCorrect}</span>
              </div>
            )}

            {/* XP Gain Effect */}
            {showXPGain && (
              <div className="absolute right-0 top-12 xp-gain-effect">
                <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg px-3 py-1 text-sm font-bold shadow-lg">
                  +{xpGained} XP
                </div>
              </div>
            )}
            
            <div className="bg-white/80 rounded-full px-4 py-2 shadow-md relative">
              <span className="font-bold text-gray-700">
                {session.currentQuestionIndex + 1} / {session.questions.length}
              </span>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className={`bg-white rounded-3xl p-8 shadow-2xl animate-bounce-in question-container relative ${
            consecutiveCorrect >= 3 ? 'animate-glow' : ''
          }`}>
            {/* Streak indicator */}
            {consecutiveCorrect >= 3 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full px-3 py-1 text-sm font-bold animate-wiggle">
                🔥 {consecutiveCorrect}連続正解！
              </div>
            )}

            {/* Visual Aid with enhanced animations */}
            <div className="mb-6 animate-float">
              {currentQuestion.type === 'math' && !currentQuestion.subtype?.includes('money') && (
                <div dangerouslySetInnerHTML={{ __html: generateMathProblemVisual(currentQuestion) }} />
              )}
              {currentQuestion.type === 'japanese' && (
                <div dangerouslySetInnerHTML={{ __html: generateJapaneseVisual(currentQuestion) }} />
              )}
              {currentQuestion.type === 'english' && (
                <div dangerouslySetInnerHTML={{ __html: generateEnglishVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype === 'time-reading') && (
                <div dangerouslySetInnerHTML={{ __html: generateTimeVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype?.includes('shape')) && (
                <div dangerouslySetInnerHTML={{ __html: generateShapeVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype?.includes('money')) && (
                <div dangerouslySetInnerHTML={{ __html: generateMoneyVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype?.includes('reading')) && (
                <div dangerouslySetInnerHTML={{ __html: generateReadingVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype === 'time-calculation') && (
                <div dangerouslySetInnerHTML={{ __html: generateTimeCalculationVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype === 'science-observation') && (
                <div dangerouslySetInnerHTML={{ __html: generateScienceVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype?.includes('vocabulary')) && (
                <div dangerouslySetInnerHTML={{ __html: generateVocabularyVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype?.includes('programming')) && (
                <div dangerouslySetInnerHTML={{ __html: generateProgrammingVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype?.includes('digital-literacy')) && (
                <div dangerouslySetInnerHTML={{ __html: generateDigitalLiteracyVisual(currentQuestion) }} />
              )}
              {(currentQuestion.subtype === 'trivia-quiz') && (
                <div dangerouslySetInnerHTML={{ __html: generateTriviaVisual(currentQuestion) }} />
              )}
              {currentQuestion.visualAid?.type?.includes('pokemon') && (
                <div className="pokemon-visual-aid">
                  {renderPokemonVisual(currentQuestion)}
                </div>
              )}
            </div>

            {/* Question with enhanced styling */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-4xl font-bold text-gray-800 animate-pop-in">
                  {currentQuestion.question}
                </h2>
                <button
                  onClick={() => soundManager?.speakQuestion(currentQuestion.question, currentQuestion.type)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 animate-bounce-in"
                  title="問題を読み上げ"
                >
                  🔊
                </button>
              </div>
              
              {/* Question type indicator */}
              <div className="flex justify-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                  currentQuestion.type === 'math' ? 'bg-blue-100 text-blue-800 border-2 border-blue-200' :
                  currentQuestion.type === 'japanese' ? 'bg-red-100 text-red-800 border-2 border-red-200' :
                  currentQuestion.type === 'english' ? 'bg-green-100 text-green-800 border-2 border-green-200' :
                  currentQuestion.subtype === 'time-reading' ? 'bg-purple-100 text-purple-800 border-2 border-purple-200' :
                  currentQuestion.subtype?.includes('shape') ? 'bg-orange-100 text-orange-800 border-2 border-orange-200' :
                  currentQuestion.subtype === 'trivia-quiz' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200' :
                  'bg-gray-100 text-gray-800 border-2 border-gray-200'
                }`}>
                  <span className="text-lg">
                    {currentQuestion.type === 'math' ? '🧮' :
                     currentQuestion.type === 'japanese' ? '🇯🇵' :
                     currentQuestion.type === 'english' ? '🇺🇸' :
                     currentQuestion.subtype === 'time-reading' ? '🕐' :
                     currentQuestion.subtype?.includes('shape') ? '🔺' : 
                     currentQuestion.subtype === 'trivia-quiz' ? '🤔' :
                     '📚'}
                  </span>
                  <span className="font-bold">
                    {currentQuestion.type === 'math' ? '算数' :
                     currentQuestion.type === 'japanese' ? '国語' :
                     currentQuestion.type === 'english' ? '英語' :
                     currentQuestion.subtype === 'time-reading' ? '時計' :
                     currentQuestion.subtype?.includes('shape') ? '図形' :
                     currentQuestion.subtype === 'trivia-quiz' ? 'まめちしき' :
                     '学習'}
                  </span>
                  <Zap size={16} className="text-yellow-500" />
                  <span className="font-bold text-yellow-600">{currentQuestion.points}pt</span>
                </div>
              </div>

              {/* Answer Input - Different types based on question */}
              {!showDrawingCanvas && (
                <>
                  {currentQuestion.options ? (
                    // Multiple choice for English questions
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            VisualEffects.createButtonClickEffect(e);
                            handleAnswerSubmit(option);
                          }}
                          disabled={showResult}
                          className="interactive-button kid-button text-xl py-3 px-6 text-white bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 animate-pop-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : currentQuestion.subtype === 'time-reading' ? (
                    // Time input with dropdowns - no additional input field needed
                    <div className="text-center">
                      <p className="text-lg text-gray-600 mb-4">
                        時計の表示を見て、上のドロップダウンで時間を選択してください
                      </p>
                      <button
                        onClick={() => {
                          // Get values from dropdowns
                          const hourSelect = document.querySelector('.time-hour-input') as HTMLSelectElement;
                          const minuteSelect = document.querySelector('.time-minute-input') as HTMLSelectElement;
                          
                          if (hourSelect) {
                            const hour = hourSelect.value;
                            const minute = minuteSelect ? minuteSelect.value.padStart(2, '0') : '00';
                            const timeAnswer = `${hour}:${minute}`;
                            handleAnswerSubmit(timeAnswer);
                          }
                        }}
                        className="kid-button text-2xl py-4 px-12 animate-pop-in"
                        disabled={showResult}
                      >
                        答える！ 🕐
                      </button>
                    </div>
                  ) : currentQuestion.type === 'japanese' && 
                       (currentQuestion.subtype?.includes('writing') || currentQuestion.subtype?.includes('word')) ? (
                    // Drawing canvas for Japanese character writing
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => setShowDrawingCanvas(true)}
                        className="kid-button text-xl py-3 px-8"
                      >
                        文字を書く
                      </button>
                      <div className="text-gray-600">
                        または下に直接入力してください
                      </div>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`
                          text-3xl font-bold text-center w-32 h-16 border-4 rounded-2xl mx-auto
                          focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all
                          ${inputError ? 'border-red-500 animate-wiggle' : 'border-gray-300'}
                        `}
                        placeholder="?"
                        autoFocus
                      />
                    </div>
                  ) : (
                    // Regular text/number input
                    <div className="flex justify-center">
                      <input
                        type={currentQuestion.type === 'math' ? 'number' : 'text'}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`
                          text-3xl font-bold text-center w-32 h-16 border-4 rounded-2xl
                          focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all
                          ${inputError ? 'border-red-500 animate-wiggle' : 'border-gray-300'}
                        `}
                        placeholder="?"
                        autoFocus
                      />
                    </div>
                  )}
                </>
              )}

              {/* Drawing Canvas for Japanese */}
              {showDrawingCanvas && (
                <div className="mt-6">
                  <DrawingCanvas
                    onDrawingComplete={handleDrawingComplete}
                    onClear={handleDrawingClear}
                    expectedCharacter={currentQuestion.correctAnswer}
                    recognitionType={
                      currentQuestion.type === 'math' ? 'number' : 
                      currentQuestion.subtype?.includes('hiragana') ? 'hiragana' :
                      currentQuestion.subtype?.includes('katakana') ? 'katakana' :
                      'any'
                    }
                  />
                </div>
              )}
            </div>

            {/* Submit Button - Only show for non-multiple choice and non-time reading */}
            {!currentQuestion.options && !showDrawingCanvas && currentQuestion.subtype !== 'time-reading' && (
              <div className="text-center">
                <button
                  onClick={(e) => {
                    VisualEffects.createButtonClickEffect(e);
                    handleAnswerSubmit();
                  }}
                  className="interactive-button kid-button text-2xl py-4 px-12 animate-pop-in"
                  disabled={showResult}
                >
                  答える！ 🚀
                </button>
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div className={`
                mt-6 p-6 rounded-2xl text-center animate-bounce-in
                ${isCorrect 
                  ? 'bg-green-100 border-2 border-green-300' 
                  : 'bg-red-100 border-2 border-red-300'
                }
              `}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600" size={32} />
                  ) : (
                    <XCircle className="text-red-600" size={32} />
                  )}
                  <span className={`text-2xl font-bold ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isCorrect ? '正解！' : '不正解'}
                  </span>
                </div>
                
                {!isCorrect && (
                  <p className="text-red-600">
                    正解は <span className="font-bold text-2xl">{currentQuestion.correctAnswer}</span> でした
                  </p>
                )}
                
                {isCorrect && (
                  <p className="text-green-600">
                    <span className="font-bold">+{currentQuestion.points}</span> ポイント！
                  </p>
                )}

                {/* 適応学習メッセージ */}
                {adaptiveMessage && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-blue-800 font-medium text-sm">
                      🤖 AI先生: {adaptiveMessage}
                    </div>
                  </div>
                )}

                {/* 休憩提案 */}
                {suggestBreak && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="text-orange-800 font-medium text-sm">
                      ☕ 少し休憩を取りませんか？集中力を回復させましょう！
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}