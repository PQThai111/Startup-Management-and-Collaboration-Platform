import { DocumentType } from '../constant/document';

export interface Document {
  title: string;
  description: string;
  type: DocumentType;
  coverImageFile: string;
  startDate: string;
  endDate: string;
  location: string;
  tag: string;
  registrationLink: string;
  isMandatory: boolean;
  id: string;
  registeredAmount: 0;
}
