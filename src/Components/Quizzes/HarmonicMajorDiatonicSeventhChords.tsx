import * as React from 'react';

import { Quiz } from "../../Quiz";
import { Quiz as QuizComponent } from "../Quiz";

import Button from "@material-ui/core/Button";

export class HarmonicMajorDiatonicSeventhChords extends React.Component<{}, {}> {
  public static createQuiz(): Quiz {
    const chordRoots = [1, 2, 3, 4, 5, 6, 7];
    const chordTypes = [
      "M7",
      "m7b5",
      "m7",
      "mM7",
      "7",
      "M7#5",
      "dim7"
    ];
    const answers = [
      "7",
      "M7",
      "m7",
      "m7b5",
      "dim7",
      "mM7",
      "M7#5"
    ];
    const questionAnswerIndices = chordTypes.map(answer => answers.indexOf(answer));

    return new Quiz(
      "Harmonic Major Diatonic Seventh Chords",
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
    this.quiz = HarmonicMajorDiatonicSeventhChords.createQuiz();
  }

  public render(): JSX.Element {
    return <QuizComponent quiz={this.quiz} />;
  }

  private quiz: Quiz;
}