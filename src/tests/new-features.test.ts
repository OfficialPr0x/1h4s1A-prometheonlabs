import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppHomePage } from '@/app/(authenticated)/organizations/[organizationId]/home/page'
import { PlaygroundPage } from '@/app/(authenticated)/organizations/[organizationId]/playground/page'
import { AIChatPage } from '@/app/(authenticated)/organizations/[organizationId]/ai-chat/page'
import { Api } from '@/core/trpc'

// Mock the API calls
vi.mock('@/core/trpc', () => ({
  Api: {
    organization: {
      findUnique: {
        useQuery: vi.fn(),
      },
    },
    auditLog: {
      findMany: {
        useQuery: vi.fn(),
      },
    },
    ai: {
      generateText: {
        useMutation: vi.fn(),
      },
      generateImage: {
        useMutation: vi.fn(),
      },
    },
    aiResponse: {
      findMany: {
        useQuery: vi.fn(),
      },
      create: {
        useMutation: vi.fn(),
      },
    },
    rag: {
      loadFile: {
        useMutation: vi.fn(),
      },
    },
  },
}))

describe('Dashboard Tests', () => {
  it('renders dashboard components correctly', async () => {
    Api.organization.findUnique.useQuery.mockReturnValue({
      data: { organizationRoles: [{ id: '1' }, { id: '2' }] },
      isLoading: false,
    })
    Api.auditLog.findMany.useQuery.mockReturnValue({
      data: [{ action: 'test', details: 'test details' }],
      isLoading: false,
    })

    render(<AppHomePage />)


    await waitFor(() => {
      expect(screen.getByText('Organization Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument() // Total Users count
      expect(screen.getByText('Recent Activities')).toBeInTheDocument()
      expect(screen.getByText('Quick Links')).toBeInTheDocument()
    })
  })
})


describe('Playground Tests', () => {
  it('adds and generates widget content', async () => {
    const generateTextMock = vi.fn().mockResolvedValue({ answer: 'Generated content' })
    Api.ai.generateText.useMutation.mockReturnValue({ mutateAsync: generateTextMock })

    render(<PlaygroundPage />)


    fireEvent.change(screen.getByPlaceholderText('Enter widget type'), { target: { value: 'Test Widget' } })
    fireEvent.click(screen.getByText('Add Widget'))

    await waitFor(() => {
      expect(screen.getByText('Test Widget Widget')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Generate Content'))

    await waitFor(() => {
      expect(generateTextMock).toHaveBeenCalled()
      expect(screen.getByText('Generated content')).toBeInTheDocument()
    })
  })
})


describe('AI Chat Tests', () => {
  it('sends message and receives AI response', async () => {
    const generateTextMock = vi.fn().mockResolvedValue({ answer: 'AI response' })
    Api.ai.generateText.useMutation.mockReturnValue({ mutateAsync: generateTextMock })
    Api.aiResponse.create.useMutation.mockReturnValue({ mutateAsync: vi.fn() })
    Api.aiResponse.findMany.useQuery.mockReturnValue({ data: [], isLoading: false })

    render(<AIChatPage />)


    fireEvent.change(screen.getByPlaceholderText('Type your message here...'), { target: { value: 'Test message' } })
    fireEvent.click(screen.getByText('Send'))

    await waitFor(() => {
      expect(generateTextMock).toHaveBeenCalledWith({ prompt: 'Test message' })
      expect(screen.getByText('AI response')).toBeInTheDocument()
    })
  })

  it('uploads and integrates file', async () => {
    const loadFileMock = vi.fn().mockResolvedValue({ key: 'test-key' })
    Api.rag.loadFile.useMutation.mockReturnValue({ mutateAsync: loadFileMock })

    render(<AIChatPage />)

    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const uploadInput = screen.getByText('Upload Knowledge Base').closest('button')
    fireEvent.change(uploadInput, { target: { files: [file] } })


    await waitFor(() => {
      expect(loadFileMock).toHaveBeenCalled()
      expect(screen.getByText('File integrated with key: test-key')).toBeInTheDocument()
    })
  })
})

