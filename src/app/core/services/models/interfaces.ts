export interface QuestionSpec {
  questionNumber: number;
  questionHtmlDir: string;
  questionHtmlFile: string;
  gizmo?: string;
  draggables: string[];
  droppable: string;
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
