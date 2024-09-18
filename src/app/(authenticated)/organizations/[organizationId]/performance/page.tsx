'use client'

import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Alert,
  Spin,
  Input,
  Button,
} from 'antd'
import {
  LineChartOutlined,
  AlertOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { Line, Bar } from '@ant-design/charts'

export default function PerformanceMetricsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  )
  const [customBenchmark, setCustomBenchmark] = useState<number>(1000)

  const {
    data: performanceData,
    isLoading,
    refetch,
  } = Api.ragVector.findMany.useQuery(
    {
      where: { tags: { has: 'performance' } },
      orderBy: { createdAt: 'desc' },
    },
    {
      refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    },
  )

  const { mutateAsync: updateBenchmark } = Api.ragVector.update.useMutation()

  const isAdmin = checkOrganizationRole('admin')

  useEffect(() => {
    if (performanceData && performanceData.length > 0) {
      const benchmarkData = performanceData.find(
        item => item.key === 'benchmark',
      )
      if (benchmarkData) {
        setCustomBenchmark(Number(benchmarkData.tags[0]))
      }
    }
  }, [performanceData])

  const handleBenchmarkUpdate = async () => {
    try {
      const benchmarkData = performanceData?.find(
        item => item.key === 'benchmark',
      )
      if (benchmarkData) {
        await updateBenchmark({
          where: { id: benchmarkData.id },
          data: { tags: [customBenchmark.toString(), benchmarkData.tags[1]] },
        })
        enqueueSnackbar('Benchmark updated successfully', {
          variant: 'success',
        })
        refetch()
      }
    } catch (error) {
      enqueueSnackbar('Failed to update benchmark', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Component',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Response Time (ms)',
      dataIndex: 'tags',
      key: 'responseTime',
      render: (tags: any) => tags[1],
    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const overallPerformance =
    performanceData?.filter(item => item.key !== 'benchmark') || []
  const componentPerformance = overallPerformance.filter(
    item => item.key === selectedComponent,
  )

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Performance Metrics</Title>
      <Text>
        Monitor and analyze the performance of your application components.
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24}>
          <Card>
            <Title level={4}>Response Time Trend</Title>
            <Line
              data={overallPerformance.map(item => ({
                date: dayjs(item.dateCreated).format('YYYY-MM-DD HH:mm:ss'),
                responseTime: Number(item.tags[1]),
              }))}
              xField="date"
              yField="responseTime"
              seriesField="responseTime"
              color={({ responseTime }) => {
                if (responseTime <= customBenchmark * 0.8) return '#3f8600'
                if (responseTime <= customBenchmark) return '#faad14'
                return '#cf1322'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Average Response Time"
              value={
                overallPerformance.reduce(
                  (acc, curr) => acc + Number(curr.tags[1]),
                  0,
                ) / overallPerformance.length
              }
              suffix="ms"
              prefix={<LineChartOutlined />}
              valueStyle={{
                color:
                  overallPerformance.reduce(
                    (acc, curr) => acc + Number(curr.tags[1]),
                    0,
                  ) /
                    overallPerformance.length >
                  customBenchmark
                    ? '#cf1322'
                    : '#3f8600',
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Performance Benchmark"
              value={customBenchmark}
              suffix="ms"
              prefix={<SettingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Alerts"
              value={
                overallPerformance.filter(
                  item => Number(item.tags[1]) > customBenchmark,
                ).length
              }
              prefix={<AlertOutlined />}
              valueStyle={{
                color:
                  overallPerformance.filter(
                    item => Number(item.tags[1]) > customBenchmark,
                  ).length > 0
                    ? '#cf1322'
                    : '#3f8600',
              }}
            />
          </Card>
        </Col>
      </Row>

      {isAdmin && (
        <Card style={{ marginTop: '20px' }}>
          <Title level={4}>Set Custom Benchmark</Title>
          <Input
            type="number"
            value={customBenchmark}
            onChange={e => setCustomBenchmark(Number(e.target.value))}
            style={{ width: '200px', marginRight: '10px' }}
          />
          <Button type="primary" onClick={handleBenchmarkUpdate}>
            Update Benchmark
          </Button>
        </Card>
      )}

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <Card style={{ marginTop: '20px' }}>
            <Title level={4}>Overall Performance</Title>
            <Bar
              data={overallPerformance}
              xField="key"
              yField={record => Number(record.tags[1])}
              color={({ tags }) => {
                const responseTime = Number(tags[1])
                if (responseTime <= customBenchmark * 0.8) return '#3f8600'
                if (responseTime <= customBenchmark) return '#faad14'
                return '#cf1322'
              }}
              label={{
                position: 'top',
                style: {
                  fill: '#000000',
                  opacity: 0.6,
                },
              }}
            />
          </Card>

          {selectedComponent && (
            <Card style={{ marginTop: '20px' }}>
              <Title level={4}>
                Component Performance: {selectedComponent}
              </Title>
              <Line
                data={componentPerformance.map(item => ({
                  date: dayjs(item.dateCreated).format('YYYY-MM-DD HH:mm:ss'),
                  responseTime: Number(item.tags[1]),
                }))}
                xField="date"
                yField="responseTime"
                color={({ responseTime }) => {
                  if (responseTime <= customBenchmark * 0.8) return '#3f8600'
                  if (responseTime <= customBenchmark) return '#faad14'
                  return '#cf1322'
                }}
              />
            </Card>
          )}

          {overallPerformance.some(
            item => Number(item.tags[1]) > customBenchmark,
          ) && (
            <Alert
              message="Performance Alert"
              description="Some components are performing below the set benchmark. Please review and optimize."
              type="warning"
              showIcon
              style={{ marginTop: '20px' }}
            />
          )}
        </>
      )}
    </PageLayout>
  )
}
