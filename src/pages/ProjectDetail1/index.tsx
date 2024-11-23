import { useParams } from 'react-router-dom';
import Reminder from './components/Reminder';
import Status from './components/Status';
import Description from './components/Description';
import Comments from './components/Comments';
import FilesAttachment from './components/FilesAttachment';
import Members from './components/Members';
import ContentContainer from '../ProjectDetaill/components/ContentContainer';

const ProjectDetail = () => {
  let { projectId } = useParams<{ projectId: string }>();

  return (
    <ContentContainer>
      <div className="flex items-center">
        <p className="text-4xl font-bold">{projectId}</p>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-4">
        <div className="h-[76.5vh] rounded-xl bg-[#EEF2F5] px-3 py-3">
          <Description />
        </div>

        <div>
          <div className="h-fit rounded-xl bg-[#EEF2F5] px-3 py-3">
            <Reminder />
          </div>
          <div className="mt-4 h-fit rounded-xl bg-[#EEF2F5] px-3 py-3">
            <Status />
          </div>
        </div>

        <div className="h-fit rounded-xl bg-[#EEF2F5] px-3 py-3">
          <Comments />
        </div>

        <div>
          <div className="h-fit rounded-xl bg-[#EEF2F5] px-3 py-3">
            <Members />
          </div>
          <div className="mt-4 h-fit rounded-xl bg-[#EEF2F5] px-3 py-3">
            <FilesAttachment />
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default ProjectDetail;