import * as React from 'react';
import * as clone from 'clone';
import { Button, Card, CardContent, Typography, Checkbox } from '@material-ui/core';

import * as Utils from '../Utils';
import { Quiz as QuizModel } from "../Quiz";
import { QuizStats } from "../QuizStats";
import { QuestionStats } from "../QuestionStats";
import { AnswerCheckboxes } from "./AnswerCheckboxes";

export interface IQuizProps {
  quiz: QuizModel;
}
export interface IQuizState {
  currentQuestionIndex: number;
  quizStats: QuizStats<string>;
  enabledQuestionIndices: number[];
  showDetailedStats: boolean;
}
export class Quiz extends React.Component<IQuizProps, IQuizState> {
  constructor(props: IQuizProps) {
    super(props);

    const quizStats = new QuizStats<string>(
      this.props.quiz.questionRenderFuncs.map(x => new QuestionStats<string>(0, 0))
    );
    const enabledQuestionIndices = this.props.quiz.questionRenderFuncs.map((_, i) => i)

    this.state = {
      currentQuestionIndex: this.getNextQuestionIndex(this.props.quiz, quizStats, enabledQuestionIndices, -1),
      quizStats: quizStats,
      enabledQuestionIndices: enabledQuestionIndices,
      showDetailedStats: false
    };
  }

  public render(): JSX.Element {
    const questionStats = this.state.quizStats.questionStats
      .map((qs, i) => {
        const renderedQuestion = this.props.quiz.questionRenderFuncs[i]();
        return <p key={i}>{renderedQuestion} {qs.numCorrectGuesses} / {qs.numIncorrectGuesses}</p>;
      }, this);
    
    const questionCheckboxes = this.props.quiz.questionRenderFuncs
      .map((qrf, i) => {
        const isChecked = this.state.enabledQuestionIndices.indexOf(i) >= 0;
        const isEnabled = !isChecked || (this.state.enabledQuestionIndices.length > 1);

        return (
          <div key={i}>
            <Checkbox checked={isChecked} onChange={event => this.toggleQuestionEnabled(i)} disabled={!isEnabled} />{qrf()}
          </div>
        );
      }, this);

    const renderedCurrentQuestion = this.props.quiz.questionRenderFuncs[this.state.currentQuestionIndex]();
    const renderedAnswers = this.props.quiz.answersRenderFunc(this.guessAnswer.bind(this), this.state.currentQuestionIndex);

    const numGuesses = this.state.quizStats.numCorrectGuesses + this.state.quizStats.numIncorrectGuesses;
    const percentCorrect = (this.state.quizStats.numIncorrectGuesses !== 0)
      ? (this.state.quizStats.numCorrectGuesses / numGuesses)
      : 1;

    return (
      <Card>
        <CardContent>
          <Typography gutterBottom={true} variant="h5" component="h2">
            {this.props.quiz.name}
          </Typography>

          <div>
            {questionCheckboxes}
          </div>

          <p>
            <span style={{paddingRight: "2em"}}>{this.state.quizStats.numCorrectGuesses} / {this.state.quizStats.numIncorrectGuesses}</span>
            <span style={{paddingRight: "2em"}}>{(100 * percentCorrect).toFixed(2)}%</span>
          </p>

          {this.state.showDetailedStats ? questionStats : null}

          <div style={{textAlign: "center", fontSize: "2em", padding: "1em 0"}}>{renderedCurrentQuestion}</div>
          {renderedAnswers}
        </CardContent>
      </Card>
    );
  }
  
  private getNextQuestionIndex(
    quiz: QuizModel,
    quizStats: QuizStats<string>,
    enabledQuestionIndices: number[],
    currentQuestionIndex: number
  ): number {
    if (enabledQuestionIndices.length <= 1) {
      return 0;
    }

    const enabledQuestionStats = quizStats.questionStats
      .filter((_, i) => enabledQuestionIndices.indexOf(i) >= 0);
    const minQuestionAskedCount = Utils.min(
      enabledQuestionStats,
      qs => qs.numCorrectGuesses + qs.numIncorrectGuesses
    );
    let leastCorrectQuestionIndices = enabledQuestionStats
      .map((qs, i) => (qs.numCorrectGuesses === minQuestionAskedCount)
        ? i
        : -1
      )
      .filter(x => x >= 0);
    
    if ((leastCorrectQuestionIndices.length === 1) && (leastCorrectQuestionIndices[0] === currentQuestionIndex)) {
      leastCorrectQuestionIndices = enabledQuestionStats.map((_, i) => i);
    }
    
    let nextQuestionIndex: number;

    do {
      const nextQuestionIndexIndex = Utils.randomInt(0, leastCorrectQuestionIndices.length - 1);
      nextQuestionIndex = leastCorrectQuestionIndices[nextQuestionIndexIndex];
    } while(nextQuestionIndex === currentQuestionIndex);

    return nextQuestionIndex;
  }

  private guessAnswer(answerIndex: number) {
    const correctAnswerIndex = this.props.quiz.questionAnswerIndices[this.state.currentQuestionIndex];
    const isAnswerCorrect = answerIndex === correctAnswerIndex;
    if (isAnswerCorrect) {
      this.onAnswerCorrect();
    } else {
      this.onAnswerIncorrect();
    }
  }
  private onAnswerCorrect() {
    const newQuizStats = clone(this.state.quizStats);

    const questionStats = newQuizStats.questionStats[this.state.currentQuestionIndex];
    questionStats.numCorrectGuesses++;

    this.setState({
      quizStats: newQuizStats,
      currentQuestionIndex: this.getNextQuestionIndex(
        this.props.quiz, newQuizStats, this.state.enabledQuestionIndices, this.state.currentQuestionIndex
      )
    });
  }
  private onAnswerIncorrect() {
    const newQuizStats = clone(this.state.quizStats);

    const questionStats = newQuizStats.questionStats[this.state.currentQuestionIndex];
    questionStats.numIncorrectGuesses++;

    this.setState({
      quizStats: newQuizStats
    });
  }

  private toggleQuestionEnabled(questionIndex: number) {
    const newEnabledQuestionIndices = this.state.enabledQuestionIndices.slice();
    const i = newEnabledQuestionIndices.indexOf(questionIndex);
    const wasQuestionEnabled = i >= 0;

    if (!wasQuestionEnabled) {
      newEnabledQuestionIndices.push(questionIndex);
    } else if (this.state.enabledQuestionIndices.length > 1) {
      newEnabledQuestionIndices.splice(i, 1);
    }

    const stateDelta: any = { enabledQuestionIndices: newEnabledQuestionIndices };
    if (wasQuestionEnabled && (this.state.currentQuestionIndex === questionIndex)) {
      stateDelta.currentQuestionIndex = this.getNextQuestionIndex(
        this.props.quiz, this.state.quizStats, newEnabledQuestionIndices, this.state.currentQuestionIndex
      );
    }

    this.setState(stateDelta);
  }
}

export function createTextMultipleChoiceQuiz(
  quizName: string,
  questions: string[],
  questionAnswers: string[],
  allAnswers: string[],
  invertQuestionsAndAnswers: boolean
): QuizModel {
  let answerIds: number[];
  let answersRenderFunc: (selectAnswerId: (answerId: number) => void, questionId?: number) => JSX.Element;

  if (!invertQuestionsAndAnswers) {
    answerIds = questions.map((_, i) => allAnswers.indexOf(questionAnswers[i]));
    answersRenderFunc = selectAnswerId => {
      const answerButtons = questions.map((_, i) => {
        return <span key={i} style={{padding: "1em 1em 1em 0"}}><Button onClick={event => selectAnswerId(i)} variant="outlined" color="primary">{questionAnswers[i]}</Button></span>;
      });
      return <div style={{lineHeight: 3}}>{answerButtons}</div>;
    };
  } else {
    const invertedQuestions = allAnswers;
    const invertedAnswers = allAnswers
      .map(a => questions.filter((q, i) => questionAnswers[i] === a));
    answerIds = invertedAnswers
      .map((invertedAnswer, i) => {
        const setBitIndices = invertedAnswer.map(ia => questions.indexOf(ia));
        return Utils.setBitIndicesToInt(setBitIndices);
      });
    
    allAnswers = questions;
    questions = invertedQuestions;
    answersRenderFunc = (selectAnswerId, questionId) => <AnswerCheckboxes key={questionId} answers={allAnswers} selectAnswerId={selectAnswerId} />;      
  }

  return new QuizModel(
    quizName,
    questions.map(question => (() => <span>{question}</span>)),
    answerIds,
    answersRenderFunc
  );
}