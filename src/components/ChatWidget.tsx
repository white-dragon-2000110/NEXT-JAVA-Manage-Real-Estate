'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2
} from 'lucide-react'

interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Olá! Sou o assistente virtual da plataforma de imóveis. Como posso ajudá-lo hoje?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response (to be replaced with actual backend call)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Esta é uma resposta simulada do assistente IA. Em breve será conectada ao backend para respostas reais.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg cursor-pointer"
          style={{
            background: 'linear-gradient(to right, #4ade80, #22c55e, #16a34a)',
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite'
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-2xl border-0 bg-background py-0">
        <CardHeader className="pb-3 pt-3 rounded-t-lg text-white"
          style={{
            background: 'linear-gradient(to right, #4ade80, #22c55e, #16a34a)',
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-base">Assistente IA</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMinimize}
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20 cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4 cursor-pointer" /> : <Minimize2 className="h-4 w-4 cursor-pointer" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20 cursor-pointer"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex flex-col h-80">
              {/* Messages Area */}
              <ScrollArea className="flex-1 px-4 py-2">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-foreground/60'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground rounded-lg px-3 py-2">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-foreground/60 ml-2">Digitando...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-border p-3">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!inputValue.trim() || isTyping}
                    className="px-3 cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, #4ade80, #22c55e, #16a34a)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient 3s ease infinite',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-foreground/50 mt-2 text-center">
                  Pressione Enter para enviar
                </p>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
} 