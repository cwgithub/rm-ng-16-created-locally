import { GizmoType } from "./types";

export interface AssessmentSpec {
  assessmentId: string;
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
  gizmoType?: GizmoType;
  draggables?: string[];
  droppable?: string;
  options?: string[];
  optionsDataFile?: string;
  optionsData: any;
}

export interface CorrectAnswersSpec {
  sectionName: string;
  answers: CorrectAnswer[];
}

export interface UserAnswer {
  gizmoType: GizmoType;
  selection: any;
}

export interface CorrectAnswer extends UserAnswer {
  questionNumber: number;
}
