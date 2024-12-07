import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useMutation } from '@tanstack/react-query';
import documentApi from '../../../apis/document.api';
import { DocumentType } from '../../../constant/document';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ScrollArea } from '../../../components/ui/scroll-area';

interface DocumentUploadProps {
  FileName: string;
  File: FileList;
  Description: string;
}

const FilesAttachment = ({
  files,
  taskId,
  isLecturerOrMentor,
}: {
  files: {
    id: string;
    fileName: string;
    filePath: string;
    description: string;
  }[];
  taskId: string;
  isLecturerOrMentor: boolean;
}) => {
  const { handleSubmit, register, reset } = useForm<DocumentUploadProps>();
  const [open, setOpen] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<
    {
      id: string;
      fileName: string;
      filePath: string;
      description: string;
    }[]
  >(files);

  const onSubmit: SubmitHandler<DocumentUploadProps> = (data) => {
    if (!data.Description) {
      toast.error('Description is required');
      return;
    }
    if (!data.FileName) {
      toast.error('Name is required');
      return;
    }
    if (data.File.length === 0) {
      toast.error('File is required');
      return;
    }

    handleUploadFile.mutate(
      { ...data, File: data.File[0] },
      {
        onSuccess: (data) => {
          setDocumentList((prev) => [
            ...prev,
            {
              description: data.data.data.document.description,
              fileName: data.data.data.document.fileName,
              filePath: data.data.data.document.filePath,
              id: data.data.data.documentId,
            },
          ]);
          toast.success('Document uploaded successfully');
          setOpen(false);
          reset();
        },
        onError: () => {
          toast.error('Failed to upload document');
        },
      },
    );
  };

  const handleDeleteDocument = useMutation({
    mutationFn: (documentId: string) => documentApi.deleteDocument(documentId),
  });

  const handleUploadFile = useMutation({
    mutationFn: ({
      Description,
      File,
      FileName,
    }: Omit<DocumentUploadProps, 'File'> & { File: File }) =>
      documentApi.uploadDocument({
        File,
        FileName,
        Description,
        DocumentType: DocumentType.ProjectTask,
        TaskId: taskId,
      }),
  });

  const handleDeleteFile = (documentId: string) => {
    handleDeleteDocument.mutate(documentId, {
      onSuccess: () => {
        setDocumentList((prev) => prev.filter((doc) => doc.id !== documentId));
        toast.success('Document deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete document');
      },
    });
  };

  return (
    <>
      <p className="mb-3 font-bold">Files Attachment</p>
      <ScrollArea
        className={`${!isLecturerOrMentor ? 'h-[435px]' : 'h-[490px]'} rounded-lg bg-white px-3 py-3 text-sm`}
      >
        {documentList.map(({ description, fileName, id }) => (
          <div
            className="mt-2 flex items-center gap-2"
            key={id}
            onClick={() => {
              //handle download 2wwith filepath
            }}
          >
            <div className="flex w-full justify-between">
              <div>
                <p className="text-base font-semibold">{fileName}</p>
                <p className="text-[#828282]">{description}</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button>
                    <FaRegTrashAlt />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteFile(id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </ScrollArea>
      {!isLecturerOrMentor && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-5">
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add New Document</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('FileName')}
                    id="name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('Description')}
                    id="description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="document" className="text-right">
                    Document <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="col-span-3"
                    id="document"
                    type="file"
                    {...register('File')}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FilesAttachment;
