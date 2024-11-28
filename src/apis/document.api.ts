import { DocumentType } from '../constant/document';
// import { Document } from '../types/document.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';
import { convertObjectToParam, convertToFormData } from '../util/util';

export interface UploadDocumentRequest {
  DocumentType: DocumentType;
  TaskId?: string;
  MilestoneId?: string;
  EventId?: string;
  ProjectCourseMilestoneId?: string;
  FileName: string;
  File: File;
  Description: string;
}

export interface GetAllDocumentParams {
  PageSize?: number;
  PageNumber?: number;
  UploaderId?: string;
  TaskId?: string;
  MilestoneId?: string;
  EventId?: string;
  ProjectCourseMilestoneId?: string;
}

const URL = 'Documents';
const documentApi = {
  uploadDocument(body: UploadDocumentRequest) {
    return http.post<
      SuccessResponse<{
        documentId: string;
        taskId: string;
        milestoneId: string;
        eventId: string;
        projectCourseMilestoneId: string;
        documentType: DocumentType;
        document: {
          uploaderId: string;
          fileName: string;
          filePath: string;
          description: string;
          uploadDate: string;
          id: string;
          status: number;
          isDeleted: boolean;
          lastUpdateDate: string;
        };
        id: 'a223c85e-d7c6-4650-ab88-70299e0125f0';
        status: number;
        isDeleted: boolean;
        lastUpdateDate?: string;
      }>
    >(URL, convertToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getDocumentList(data: GetAllDocumentParams) {
    return http.get<
      SuccessResponse<
        {
          documentId: string;
          taskId: string;
          milestoneId: string;
          eventId: string;
          projectCourseMilestoneId: string;
          documentType: DocumentType;
          document: {
            uploaderId: string;
            fileName: string;
            filePath: string;
            description: string;
            uploadDate: string;
            id: string;
            status: number;
            isDeleted: boolean;
            lastUpdateDate: string;
          };
          id: string;
          status: number;
          isDeleted: boolean;
          lastUpdateDate: string;
        }[]
      >
    >(`${URL}?${new URLSearchParams(convertObjectToParam(data))}`);
  },

  deleteDocument(documentId: string) {
    return http.delete<SuccessResponse<void>>(`${URL}/${documentId}`);
  },
};

export default documentApi;
