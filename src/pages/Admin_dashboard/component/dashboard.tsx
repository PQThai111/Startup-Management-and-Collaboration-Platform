import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { useMutation } from '@tanstack/react-query';
import accountApi from '../../../apis/account.api';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../components/ui/chart';
import { useEffect, useState } from 'react';
import projectApi from '../../../apis/project.api';

const chartAccountConfig = {
  accounts: {
    label: 'Accounts',
  },
  student: {
    label: 'Student',
    color: 'hsl(var(--chart-1))',
  },
  mentor: {
    label: 'Mentor',
    color: 'hsl(var(--chart-2))',
  },
  lecturer: {
    label: 'lecturer',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const chartData = [
  { type: 'Healthcare', numberOfProject: 6 },
  { type: 'Fintech', numberOfProject: 6 },
  { type: 'SharingEconomy', numberOfProject: 1 },
  { type: 'Edtech', numberOfProject: 1 },
  { type: 'ECommerce', numberOfProject: 1 },
  { type: 'SaaS', numberOfProject: 0 },
  { type: 'GreenTech', numberOfProject: 0 },
  { type: 'AIAndMachineLearning', numberOfProject: 0 },
  { type: 'Proptech', numberOfProject: 0 },
  { type: 'Agtech', numberOfProject: 0 },
  { type: 'LogisticsAndSupplyChain', numberOfProject: 1 },
  { type: 'EntertainmentAndMedia', numberOfProject: 0 },
  { type: 'Mobility', numberOfProject: 0 },
  { type: 'Cybersecurity', numberOfProject: 0 },
  { type: 'Others', numberOfProject: 0 },
];

const chartConfig = {
  numberOfProject: {
    label: 'Number of Projects',
    color: 'blue',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

type role = 'student' | 'mentor' | 'lecturer';
const color: Record<role, string> = {
  lecturer: '#5d47ff',
  mentor: '#02ab40',
  student: '#fc911e',
};

const Dashboard = () => {
  const [totalAccounts, setTotalAccounts] = useState<number>(0);
  const [TotalProjects, setTotalProjects] = useState<number>(0);
  const [accountChartData, setAccountChartData] = useState<
    {
      role: role;
      accounts: number;
      fill: string;
    }[]
  >([]);

  const [projectChartData, setProjectChartData] = useState<
    {
      name: string;
      total: number;
    }[]
  >();

  console.log(projectChartData);

  const getAccounts = useMutation({
    mutationFn: () => accountApi.getAccountDashboard({}),
  });

  const getProjects = useMutation({
    mutationFn: () => projectApi.getProjectDashboard({}),
  });

  useEffect(() => {
    getAccounts.mutate(undefined, {
      onSuccess: (accounts) => {
        const data = Object.entries(accounts.data.data).map(
          ([role, accounts]) => {
            if (role !== 'total_account')
              return {
                role: role as role,
                accounts,
                fill: color[role as role],
              };
          },
        );
        setAccountChartData(
          data.filter(
            (item): item is { role: role; accounts: number; fill: string } =>
              item !== undefined,
          ),
        );
        setTotalAccounts(accounts.data.data.total_account);
      },
    });
  }, []);

  useEffect(() => {
    getProjects.mutate(undefined, {
      onSuccess: (projects) => {
        const data = Object.entries(projects.data.data).map(
          ([type, number]) => {
            if (type !== 'TotalProjects')
              return {
                name: type,
                total: number,
              };
          },
        );
        setProjectChartData(data.filter((item) => item !== undefined));
        setTotalProjects(projects.data.data.TotalProjects);
      },
    });
  }, []);

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="">
            <div className="grid h-[500px] grid-cols-5 gap-4">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Accounts
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalAccounts}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Projects
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{TotalProjects}</div>
                  </CardContent>
                </Card>
                <Card className="col-span-2 flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Accounts Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartAccountConfig}
                      className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-background"
                    >
                      <PieChart>
                        <ChartTooltip
                          content={
                            <ChartTooltipContent nameKey="accounts" hideLabel />
                          }
                        />
                        <Pie data={accountChartData} dataKey="accounts" />
                        <ChartLegend
                          content={<ChartLegendContent nameKey="role" />}
                          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
              <Card className="col-span-3 h-full">
                <CardHeader>
                  <CardTitle>Bar Chart - Custom Label</CardTitle>
                </CardHeader>
                <CardContent className="">
                  <ChartContainer className="" config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      layout="vertical"
                      margin={{
                        right: 16,
                      }}
                    >
                      <CartesianGrid horizontal={false} />
                      <YAxis
                        width={155}
                        dataKey="type"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <XAxis dataKey="numberOfProject" type="number" hide />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Bar
                        dataKey="numberOfProject"
                        layout="vertical"
                        fill="blue"
                        radius={4}
                      >
                        <LabelList
                          dataKey="numberOfProject"
                          position="right"
                          offset={8}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
