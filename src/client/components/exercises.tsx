import type { FC } from "hono/jsx";

export type Answer = {
  answerText: string;
  isCorrect: boolean;
};

export type Question = {
  questionText: string;
  answers: Answer[];
};

const Exercises: FC<{ questions: Question[] }> = (props: {
  questions: Question[];
}) => {
  return (
    <div id="exercises">
      {props.questions.map((question) => (
        <div>{question.questionText}</div>
      ))}
    </div>
  );
};

export default Exercises;
