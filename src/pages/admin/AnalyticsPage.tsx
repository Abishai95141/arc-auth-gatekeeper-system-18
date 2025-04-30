
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/AdminLayout';
import { Calendar, ChartBar, TrendingUp } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from 'recharts';

// Mock data for charts
const generateMockData = (days: number, baseValue: number, variance: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString(),
      value: Math.max(0, baseValue + Math.floor(Math.random() * variance - variance / 2))
    });
  }
  
  return data;
};

const signupData = generateMockData(30, 12, 10);
const dau = generateMockData(30, 80, 40);
const mau = generateMockData(30, 350, 100);

const contentCreationData = [
  { name: 'Ideas', value: 45 },
  { name: 'Projects', value: 32 },
  { name: 'Docs', value: 28 },
  { name: 'Talks', value: 15 },
];

const userActivityByHour = [
  { hour: '00:00', active: 15 },
  { hour: '03:00', active: 10 },
  { hour: '06:00', active: 25 },
  { hour: '09:00', active: 78 },
  { hour: '12:00', active: 65 },
  { hour: '15:00', active: 85 },
  { hour: '18:00', active: 90 },
  { hour: '21:00', active: 42 },
];

const growthTrends = [
  { month: 'Jan', users: 1200, content: 450 },
  { month: 'Feb', users: 1350, content: 520 },
  { month: 'Mar', users: 1500, content: 580 },
  { month: 'Apr', users: 1750, content: 620 },
  { month: 'May', users: 2000, content: 700 },
  { month: 'Jun', users: 2250, content: 830 },
];

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // In a real application, this would trigger data refetching
  };

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp size={18} className="text-green-500" />
              New Signups
            </CardTitle>
            <CardDescription>Last {dateRange} days</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold mb-2">
              {signupData.reduce((sum, item) => sum + item.value, 0)}
            </div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={signupData}>
                  <defs>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorSignups)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ChartBar size={18} className="text-blue-500" />
              Active Users
            </CardTitle>
            <CardDescription>Daily vs Monthly</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between mb-2">
              <div>
                <div className="text-sm text-muted-foreground">DAU</div>
                <div className="text-2xl font-bold">{dau[dau.length - 1].value}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">MAU</div>
                <div className="text-2xl font-bold">{mau[mau.length - 1].value}</div>
              </div>
            </div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dau}>
                  <XAxis dataKey="date" tick={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ChartBar size={18} className="text-purple-500" />
              Content Creation
            </CardTitle>
            <CardDescription>By content type</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold mb-2">
              {contentCreationData.reduce((sum, item) => sum + item.value, 0)}
            </div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentCreationData}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Activity by Hour</CardTitle>
            <CardDescription>Average active users during each time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityByHour}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="active" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>User and content growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="content" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
