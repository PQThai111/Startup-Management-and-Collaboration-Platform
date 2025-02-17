import { useQuery } from '@tanstack/react-query';
import ContentContainer from '../ProjectDetail/components/ContentContainer';
import HistoryTable from './components/HistoryTable';
import RevExp from './components/RevExp';
import financialApi from '../../apis/financial.api';
import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useProjectContext } from '../../context/project.context';
// import { Semester } from '../../types/semester.type';
// import semesterApi from '../../apis/semester.api';
import DepositWithdraw from './components/DepositWithdraw';

// const chartConfig = {
//   input: {
//     label: 'Deposit',
//     color: '#089e53',
//   },
//   output: {
//     label: 'Withdraw',
//     color: '#bf550d',
//   },
// } satisfies ChartConfig;

const FinancialReport = () => {
  // const { project } = useProjectContext();
  // const [chartData, setChartData] = useState<MonthlySummary[]>();
  // const [semester, setSemester] = useState<Semester>();

  const projectId = useLocation().pathname.split('/')[2];
  const { data: financial } = useQuery({
    queryKey: ['financial', { page: 1, projectId }],
    queryFn: () =>
      financialApi.getFinancials({
        PageSize: 100,
        PageNumber: 1,
        ProjectId: projectId,
      }),
  });

  // useEffect(() => {
  //   if (financial?.data.data && semester) {
  //     const data = financial.data.data.transactions.data;

  //     const monthlySummary = convertTransactions(
  //       data,
  //       semester?.startDate,
  //       semester?.endDate,
  //     );
  //     // setChartData(monthlySummary);
  //   }
  // }, [financial, semester]);

  // const getSemester = useMutation({
  //   mutationFn: () =>
  //     semesterApi.getSemester(project?.semesterAndCourse.semesterId as string),
  // });

  // useEffect(() => {
  //   getSemester.mutate(undefined, {
  //     onSuccess: (data) => {
  //       setSemester(data.data.data);
  //     },
  //   });
  // }, [project]);

  return (
    <ContentContainer className="">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold">Financial Report</p>
        <div>
          <DepositWithdraw projectId={projectId} />
        </div>
      </div>
      {financial?.data.data && (
        <div className="mx-auto my-5 flex min-h-[500px] w-[90vw] gap-10 px-10">
          <div className="grid w-full grid-cols-5">
            <RevExp
              total={financial?.data.data.total}
              cashOut={financial?.data.data.cashOut}
              className=""
            />
            <HistoryTable
              className="col-span-4"
              history={financial?.data.data.transactions.data}
            />
          </div>
          {/* <Card className="w-3/5">
            <CardHeader>
              <CardTitle>Money Flow</CardTitle>
              {semester && (
                <CardDescription>
                  {getMonthName(dayjs(semester?.startDate).toDate())} -{' '}
                  {getMonthName(dayjs(semester?.endDate).toDate())}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="deposit" fill="#089e53" radius={4} />
                  <Bar dataKey="withdraw" fill="#bf550d" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card> */}
        </div>
      )}
    </ContentContainer>
  );
};

export default FinancialReport;
