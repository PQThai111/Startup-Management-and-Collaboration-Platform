import ContentContainer from '../ProjectManagementPage/components/ContentContainer';
import HistoryTable from './components/HistoryTable';
import ProjectStatistic from './components/ProjectStatistic';
import RevExp from './components/RevExp';
import SourceOfFunds from './components/SourceOfFunds';

const FinancialReport = () => {
  return (
    <ContentContainer className="">
      <div className="flex items-center">
        <p className="text-4xl font-bold">Financial Report</p>
      </div>
      <div className="mt-5 flex gap-10 px-10">
        <div className="w-[50%]">
          <RevExp className="mb-5" />
          <HistoryTable />
        </div>
        <div className="w-auto">
          <SourceOfFunds className="mb-5" />
          <ProjectStatistic />
        </div>
      </div>
    </ContentContainer>
  );
};

export default FinancialReport;