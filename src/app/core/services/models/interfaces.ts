export interface QuestionSpec {
  questionNumber: number;
  questionHtmlFile: string;
}

export interface SectionSpec {
  sectionNumber: number;
  sectionFile: string;
}

export interface AssessmentSpec {
  grade: number;
  name: string;
  sections: SectionSpec[];
}
