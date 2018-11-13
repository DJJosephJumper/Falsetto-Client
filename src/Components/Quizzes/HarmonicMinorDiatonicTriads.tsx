import * as React from 'react';

import { Quiz } from "../../Quiz";
import { Quiz as QuizComponent } from "../Quiz";

import Button from "@material-ui/core/Button";

export class HarmonicMinorDiatonicTriads extends React.Component<{}, {}> {
  public static createQuiz(): Quiz {
    const chordRoots = [1, 2, 3, 4, 5, 6, 7];
    const chordTypes = [
      "minor",
      "diminished",
      "augmented",
      "minor",
      "major",
      "major",
      "diminished"
    ];
    const answers = [
      "major",
      "minor",
      "diminished",
      "augmented"
    ];
    const questionAnswerIndices = chordTypes.map(answer => answers.indexOf(answer));

    return new Quiz(
      "Harmonic Minor Diatonic Triads",
      chordRoots.map(chordRoot => (() => <span style={{ fontSize: "2em" }}>{chordRoot}</span>)),
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
    this.quiz = HarmonicMinorDiatonicTriads.createQuiz();
  }

  public render(): JSX.Element {
    return <QuizComponent quiz={this.quiz} />;
  }

  private quiz: Quiz;
}