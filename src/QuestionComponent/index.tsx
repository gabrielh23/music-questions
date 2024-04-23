import React, { useState } from "react";
import { questions } from "./questions";
import './index.scss';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Props {
  question: Question;
  selectedOption: string | null;
  handleOptionChange: (option: string) => void;
}

const QuestionComponent: React.FC<Props> = ({ question, selectedOption, handleOptionChange }) => {
  return (
    <div className="question-component">
      <h2 className="question-title">{question.question}</h2>
      <div className="questions-wrapper">
        {question.options.map((option, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void; // Callback para reiniciar o quiz
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="results-wrapper">
      <h2>Resultado:</h2>
      <p>Você acertou {score} de {totalQuestions} perguntas.</p>
      <button onClick={onRestart}>Reiniciar</button> {/* Botão para reiniciar o quiz */}
    </div>
  );
};

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false); // Estado para controlar se o quiz está completo

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirmClick = () => {
    // Verificar resposta
    const question = questions[currentQuestion];
    if (question.correctAnswer === selectedOption) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null); // Limpar a seleção após confirmar a resposta
    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true); // Definir o estado como completo quando todas as perguntas forem respondidas
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false); // Resetar o estado para reiniciar o quiz
  };

  return (
    <div className="main-container">
      {quizCompleted ? (
        <Results score={score} totalQuestions={questions.length} onRestart={handleRestart} />
      ) : (
        <div className="question-component-container">
          <QuestionComponent
            question={questions[currentQuestion]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
          <div className="btn-wrapper">
            <button onClick={handleConfirmClick}>Confirmar Resposta</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
