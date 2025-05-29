// globals.d.ts

// TypeScript definitions for the Web Speech API
// Based on MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionErrorEvent
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechGrammarList

declare global {
  interface SpeechGrammar {
    src: string;
    weight: number;
  }
  var SpeechGrammar: {
    prototype: SpeechGrammar;
    new(): SpeechGrammar;
  };

  interface SpeechGrammarList {
    readonly length: number;
    item(index: number): SpeechGrammar;
    [index: number]: SpeechGrammar;
    addFromString(string: string, weight?: number): void;
    addFromURI(src: string, weight?: number): void;
  }
  var SpeechGrammarList: {
    prototype: SpeechGrammarList;
    new(): SpeechGrammarList;
  };
  var webkitSpeechGrammarList: { // For vendor prefix
    prototype: SpeechGrammarList;
    new(): SpeechGrammarList;
  };


  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
    readonly emma?: Document | null;
    readonly interpretation?: any;
  }

  type SpeechRecognitionErrorCode =
    | 'no-speech'
    | 'aborted'
    | 'audio-capture'
    | 'network'
    | 'not-allowed'
    | 'service-not-allowed'
    | 'bad-grammar'
    | 'language-not-supported';

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionErrorCode;
    readonly message: string;
  }

  interface SpeechRecognitionEventMap {
    "audiostart": Event;
    "audioend": Event;
    "end": Event;
    "error": SpeechRecognitionErrorEvent;
    "nomatch": SpeechRecognitionEvent; // Or Event, MDN is a bit unclear if it's a specific SpeechRecognitionEvent
    "result": SpeechRecognitionEvent;
    "soundstart": Event;
    "soundend": Event;
    "speechstart": Event; // Or Event
    "speechend": Event; // Or Event
    "start": Event;
  }

  interface SpeechRecognition extends EventTarget {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI?: string;

    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;

    abort(): void;
    start(): void;
    stop(): void;

    addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
    prototype: SpeechRecognition;
  }

  var SpeechRecognition: SpeechRecognitionStatic;
  var webkitSpeechRecognition: SpeechRecognitionStatic; // For vendor prefix

  interface Window {
    SpeechRecognition?: SpeechRecognitionStatic;
    webkitSpeechRecognition?: SpeechRecognitionStatic; // For vendor prefix
    SpeechGrammarList?: { new(): SpeechGrammarList };
    webkitSpeechGrammarList?: { new(): SpeechGrammarList };
  }
}

export {}; // Add this line to ensure the file is treated as a module
