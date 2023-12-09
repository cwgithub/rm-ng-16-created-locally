export interface AssessmentSpec {
  grade: number;
  name: string;
  sections: SectionSpec[];
}

export interface SectionSpec {
  sectionNumber: number;
  sectionFile: string;
  sectionName: string;
  questions: QuestionSpec[];
}

export interface QuestionSpec {
  questionNumber: number;
  questionHtmlDir: string;
  questionHtmlFile: string;
  gizmo?: string;
  draggables?: string[];
  droppable?: string;
  options?: string[];
}
