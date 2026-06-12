import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Send, Square, Zap, Moon, Shield, Brain, Dumbbell, Heart, Wind, Bone } from 'lucide-react'
import { Streamdown } from 'streamdown'

import { useAIChat } from '@/lib/ai-hook'
import type { ChatMessages } from '@/lib/ai-hook'

const GOALS = [
  { label: 'Muskelaufbau', icon: Dumbbell, prompt: 'Ich möchte Muskeln aufbauen und meine Kraft steigern. Welche Supplemente empfiehlst du mir?' },
  { label: 'Mehr Energie', icon: Zap, prompt: 'Ich leide unter Energiemangel und mentaler Erschöpfung. Welche HEC+ME Produkte können helfen?' },
  { label: 'Besser schlafen', icon: Moon, prompt: 'Ich habe Schlafprobleme und erhole mich schlecht. Welche Supplemente unterstützen Tiefschlaf und Regeneration?' },
  { label: 'Gehirn & Fokus', icon: Brain, prompt: 'Ich möchte meine Konzentration, Gedächtnis und kognitive Leistung verbessern. Was empfiehlst du?' },
  { label: 'Immunsystem', icon: Shield, prompt: 'Ich möchte mein Immunsystem stärken. Welche HEC+ME Produkte sind sinnvoll?' },
  { label: 'Stress & Nerven', icon: Heart, prompt: 'Ich stehe unter starkem Stress und fühle mich ausgebrannt. Welche Adaptogene und Supplemente helfen?' },
  { label: 'Gelenke & Knochen', icon: Bone, prompt: 'Ich habe Gelenkbeschwerden und möchte meine Knochen langfristig schützen. Was empfiehlst du?' },
  { label: 'Haut & Haare', icon: Wind, prompt: 'Ich habe Haarausfall und Hautprobleme. Welche Supplemente können von innen helfen?' },
]

function CapsuleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <ellipse cx="11" cy="11" rx="7" ry="4.5" transform="rotate(-35 11 11)" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.5" y1="8.5" x2="16.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TypingDots() {
  return (
    <div className="typing-indicator" aria-label="Berater denkt nach">
      <span /><span /><span />
    </div>
  )
}

function Messages({ messages, isLoading }: { messages: ChatMessages; isLoading: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <div ref={containerRef} className="messages-container">
      {messages.map((message) => (
        <div key={message.id} className={`message-row ${message.role === 'assistant' ? 'message-row--ai' : 'message-row--user'}`}>
          {message.role === 'assistant' && (
            <div className="message-avatar message-avatar--ai" aria-hidden="true">
              <CapsuleIcon />
            </div>
          )}
          <div className={`message-bubble ${message.role === 'assistant' ? 'message-bubble--ai' : 'message-bubble--user'}`}>
            {message.parts.map((part, i) =>
              part.type === 'text' && part.content ? (
                <div key={i} className="prose-content">
                  <Streamdown>{part.content}</Streamdown>
                </div>
              ) : null
            )}
          </div>
          {message.role === 'user' && (
            <div className="message-avatar message-avatar--user" aria-hidden="true">
              ICH
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="message-row message-row--ai">
          <div className="message-avatar message-avatar--ai" aria-hidden="true">
            <CapsuleIcon />
          </div>
          <div className="message-bubble message-bubble--ai">
            <TypingDots />
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="empty-state">
      <div className="empty-hero">
        <div className="brand-capsule" aria-hidden="true">
          <CapsuleIcon />
        </div>
        <h1 className="hero-headline">
          Finde dein <em>perfektes</em><br />Supplement
        </h1>
        <p className="hero-sub">
          Beschreibe deine Beschwerden oder wähle ein Ziel – du bekommst evidenzbasierte, auf dich zugeschnittene Empfehlungen.
        </p>
      </div>
      <div className="goals-grid">
        {GOALS.map((goal) => {
          const Icon = goal.icon
          return (
            <button
              key={goal.label}
              className="goal-chip"
              onClick={() => onSelect(goal.prompt)}
            >
              <Icon size={15} strokeWidth={1.8} />
              <span>{goal.label}</span>
            </button>
          )
        })}
      </div>
      <p className="disclaimer">
        Nur zur Information. Kein Ersatz für medizinische Beratung. Sprich bei gesundheitlichen Beschwerden mit deinem Arzt.
      </p>
    </div>
  )
}

function Home() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, isLoading, stop } = useAIChat()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSend(text: string) {
    if (!text.trim() || isLoading) return
    sendMessage(text)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true"><CapsuleIcon /></div>
            <div className="brand-text">
              <span className="brand-name">HEC<span className="brand-plus">+</span>ME</span>
              <span className="brand-tagline">Supplement Finder</span>
            </div>
          </div>
          <div className="header-badge">Powered by Claude</div>
        </div>
      </header>

      <main className="chat-main">
        {messages.length === 0 ? (
          <EmptyState onSelect={(p) => handleSend(p)} />
        ) : (
          <Messages messages={messages} isLoading={isLoading} />
        )}
      </main>

      <footer className="input-footer">
        <div className="input-inner">
          {isLoading && (
            <div className="stop-row">
              <button onClick={stop} className="stop-btn">
                <Square size={13} fill="currentColor" strokeWidth={0} />
                Antwort stoppen
              </button>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="input-form"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Beschreibe deine Beschwerden oder frag nach einem Supplement…"
              className="chat-input"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="send-btn"
              aria-label="Nachricht senden"
            >
              <Send size={16} strokeWidth={2} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  )
}

export const Route = createFileRoute('/')(({
  component: Home,
}))
