import * as React from 'react';

import { Quiz } from "../../Quiz";
import { Quiz as QuizComponent } from "../Quiz";

import Button from "@material-ui/core/Button";

export class ScaleDegreeNames extends React.Component<{}, {}> {
  public static createQuiz(): Quiz {
    const chordNotes = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7 (in major)",
      "7 (in minor)"
    ];
    const chordTypes = [
      "Tonic",
      "Supertonic",
      "Mediant",
      "Subdominant",
      "Dominant",
      "Submediant",
      "Leading Tone",
      "Subtonic"
    ];
    const questionAnswerIndices = chordNotes.map((_, i) => i);

    return new Quiz(
      "Scale Degree Names",
      chordNotes.map(cn => (() => <span style={{ fontSize: "2em" }}>{cn}</span>)),
      questionAnswerIndices,
      selectAnswerIndex => {
        const answerButtons = chordTypes.map((chordType, i) => {
          return <span key={i} style={{padding: "1em"}}><Button onClick={event => selectAnswerIndex(i)} variant="outlined" color="primary">{chordType}</Button></span>;
        }, this);
        return <div style={{lineHeight: 3}}>{answerButtons}</div>;
      }
    );
  }
  
  constructor(props: {}) {
    super(props);
    this.quiz = ScaleDegreeNames.createQuiz();
  }

  public render(): JSX.Element {
    return <QuizComponent quiz={this.quiz} />;
  }

  private quiz: Quiz;
}