export interface FeedbackPoint {
  line?: number;
  comment: string;
}
  
export interface ReviewResult {
  programDescription: string;
  errors: FeedbackPoint[];
  suggestions: FeedbackPoint[];
  correctApproach: string;
  updatedCode: string;
}
