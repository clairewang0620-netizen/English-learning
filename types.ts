
export interface Word {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  categories: string[]; // Added tags for filtering
  examples: {
    sentence: string;
    translation: string;
  }[];
}

export interface ArticleSegment {
  id: string;
  text: string;
  translation: string;
}

export interface KeyPhrase {
  phrase: string;
  meaning: string;
}

export interface Article {
  id: string;
  title: string;
  source: string;
  segments: ArticleSegment[];
  keyPhrases: KeyPhrase[];
}

export interface DictationSession {
  groupId: number;
  wordIds: string[];
  currentIndex: number;
  wrongWordIds: string[];
}

export enum AppRoute {
  HOME = 'home',
  VOCABULARY = 'vocabulary',
  DICTATION = 'dictation',
  READING = 'reading',
  WRONG_WORDS = 'wrong_words'
}
