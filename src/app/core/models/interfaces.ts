import { GizmoType } from "./types";

export interface AssessmentSpec {
  assessmentId: string;
  grade: number;
  assessmentName: string;
  sectionsFileRefs: SectionFileRef[];
}

export interface SectionFileRef {
  sectionNumber: number;
  sectionName: string;
}

export interface SectionSpec {
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
