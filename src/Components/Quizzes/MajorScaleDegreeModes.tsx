import * as React from 'react';

import { Quiz } from "../../Quiz";
import { Quiz as QuizComponent } from "../Quiz";

import Button from "@material-ui/core/Button";

export class MajorScaleDegreeModes extends React.Component<{}, {}> {
  public static createQuiz(): Quiz {
    const scaleDegrees = [1, 2, 3, 4, 5, 6, 7];
    const scaleDegreeModes = [
      "Ionian",
      "Dorian",
      "Phrygian",
      "Lydian",
      "Mixolydian",
      "Aeolian",
      "Locrian"
    ];
    const answers = [
      "Ionian",
      "Dorian",
      "Phrygian",
      "Lydian",
      "Mixolydian",
      "Aeolian",
      "Locrian"
    ];
    const questionAnswerIndices = scaleDegreeModes.map(answer => answers.indexOf(answer));

    return new Quiz(
      "Major Scale Degree Modes",
      scaleDegrees.map(scaleDegree => (() => <span style={{ fontSize: "2em" }}>{scaleDegree}</span>)),
      questionAnswerIndices,
      selectAnswerIndex => {
        const answerButtons = answers.map((answer, i) => {
          return <span key={i} style={{padding: "1em"}}><Button onClick={event => selectAnswerIndex(i)} variant="outlined" color="primary">{answer}</Button></span>;
        }, this);
        return <div style={{lineHeight: 3}}>{answerButtons}</div>;
      }
    );
  }
  
  constructor(props: {}) {
    super(props);
    this.quiz = MajorScaleDegreeModes.createQuiz();
  }

  public render(): JSX.Element {
    return <QuizComponent quiz={this.quiz} />;
  }

  private quiz: Quiz;
}