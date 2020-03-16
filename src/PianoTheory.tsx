import * as React from "react";
import { PianoKeyboard } from './Components/Utils/PianoKeyboard';
import { Rect2D } from './lib/Core/Rect2D';
import { Size2D } from './lib/Core/Size2D';
import { Vector2D } from './lib/Core/Vector2D';
import { Pitch } from './lib/TheoryLib/Pitch';
import { PitchLetter } from './lib/TheoryLib/PitchLetter';
import { playPitches } from './Audio/GuitarAudio';
import { flattenArrays } from './lib/Core/ArrayUtils';

class Slide {
  public constructor(public renderFn: () => JSX.Element) {}
}
class SlideGroup {
  public constructor(public name: string, public slides: Array<Slide>) {}
}

class KeyBinding {
  // key
  // press/release/repeat actions
}

// TODO: dynamic width/height
// TODO: quizzes
const slideGroups = [
  new SlideGroup("Introduction", [
    new Slide(() => <span>Introduction to format</span>),
    new Slide(() => <span>This is a piano</span>),
    new Slide(() => <span>There are 88 white &amp; black keys on a standard piano. Some pianos/keyboards are smaller.</span>),
    new Slide(() => <span>These lessons will be on a subset of the full piano.</span>),

    new Slide(() => <span>Each key on a piano plays a pitch. Defn. of pitch. Try clicking keys</span>),
    new Slide(() => <span>Keys on the left produce lower pitches. Keys on the right produce higher pitches.</span>),
    new Slide(() => <span>Each pitch has a specific name</span>),
    new Slide(() => <span>Pitch names repeat</span>),
    new Slide(() => <span>White key pitches &amp; names.</span>),
    new Slide(() => <span>Black key pitches &amp; names.</span>),
    new Slide(() => <span></span>),
    new Slide(() => <span></span>),
    new Slide(() => <span></span>),
    new Slide(() => <span></span>),
    new Slide(() => <span></span>),
    new Slide(() => <span></span>),





    new Slide(() => (
      <PianoKeyboard
        rect={new Rect2D(new Size2D(300, 200), new Vector2D(0, 0))}
        lowestPitch={new Pitch(PitchLetter.C, 0, 4)}
        highestPitch={new Pitch(PitchLetter.B, 0, 4)}
        onKeyPress={p => playPitches([p])}
        style={{ width: "100%", maxWidth: "300px", height: "auto" }} />
    )),
    new Slide(() => <span>Slide 2</span>),
    new Slide(() => <span>Slide 3</span>)
  ])
];

// TODO: optimize
const slides = flattenArrays<Slide>(slideGroups.map(sg => sg.slides));

export interface IPianoTheoryProps {
}
export interface IPianoTheoryState {
  slideIndex: number;
}
export class PianoTheory extends React.Component<IPianoTheoryProps, IPianoTheoryState> {
  public constructor(props: IPianoTheoryProps) {
    super(props);

    this.state = {
      slideIndex: 0
    };
  }

  public componentDidMount() {
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    window.addEventListener("keydown", this.boundOnKeyDown);
    
    this.boundOnKeyUp = this.onKeyUp.bind(this);
    window.addEventListener("keyup", this.boundOnKeyUp);
  }

  public componentWillUnmount() {
    if (this.boundOnKeyDown) {
      window.removeEventListener("keydown", this.boundOnKeyDown);
      this.boundOnKeyDown = undefined;
    }

    if (this.boundOnKeyUp) {
      window.removeEventListener("keyup", this.boundOnKeyUp);
      this.boundOnKeyUp = undefined;
    }
  }

  // TODO: show slide group
  public render(): JSX.Element {
    const { slideIndex } = this.state;

    const slideNumber = slideIndex + 1;
    const numSlides = slides.length;
    const renderedSlide = slides[slideIndex].renderFn();

    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div>{slideNumber} / {numSlides}</div>
        {renderedSlide}
      </div>
    );
  }
  
  private boundOnKeyDown: ((event: KeyboardEvent) => void) | undefined;
  private boundOnKeyUp: ((event: KeyboardEvent) => void) | undefined;

  // TODO: data-based bindings
  private onKeyDown(event: KeyboardEvent) {
    if (event.type === "keydown") {
      // ArrowLeft
      if (event.keyCode === 37) {
        this.moveToPreviousSlide();
      }
      // ArrowRight
      else if (event.keyCode === 39) {
        this.moveToNextSlide();
      }
    }
  }
  private onKeyUp(event: KeyboardEvent) {
  }

  private moveToNextSlide() {
    const { slideIndex } = this.state;

    const newSlideIndex = slideIndex + 1;
    if (newSlideIndex == slides.length) { return; }

    this.setState({ slideIndex: newSlideIndex });
  }
  private moveToPreviousSlide() {
    const { slideIndex } = this.state;

    if (slideIndex === 0) { return; }

    this.setState({ slideIndex: slideIndex - 1 });
  }
}