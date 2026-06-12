import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Send, Square, Zap, Moon, Shield, Brain, Dumbbell, Heart, Wind, Bone, RotateCcw } from 'lucide-react'
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

const CATEGORIES = [
  { label: 'Energie & Schlaf', symptoms: ['Morgenmüdigkeit', 'Antriebslosigkeit', 'Erschöpfung', 'Schlafprobleme', 'Einschlafschwierigkeiten', 'Durchschlafschwierigkeiten', 'Nachmittagstief', 'Chronische Müdigkeit'] },
  { label: 'Stimmung & Psyche', symptoms: ['Angstzustände', 'Stimmungsschwankungen', 'Reizbarkeit', 'Konzentrationsprobleme', 'Vergesslichkeit', 'Depressive Verstimmung', 'Innere Unruhe', 'Burnout-Gefühl', 'Nervosität'] },
  { label: 'Hormone & Stoffwechsel', symptoms: ['Libidoverlust', 'Nachtschweiß', 'Hitzewallungen', 'PMS-Beschwerden', 'Wassereinlagerungen', 'Gewichtszunahme trotz Diät', 'Kältegefühl', 'Schilddrüsenprobleme'] },
  { label: 'Schmerzen & Entzündung', symptoms: ['Kopfschmerzen', 'Muskelschmerzen', 'Gelenkschmerzen', 'Rückenschmerzen', 'Migräne', 'Chronische Entzündungen', 'Nackenschmerzen'] },
  { label: 'Muskel & Sport', symptoms: ['Muskelschwäche', 'Muskelkrämpfe', 'Langsame Regeneration', 'Leistungsabfall Sport', 'Ausdauerverlust', 'Muskelzittern', 'Schwere Beine'] },
  { label: 'Immunsystem', symptoms: ['Immunschwäche', 'Häufige Erkältungen', 'Langsame Wundheilung', 'Häufige Infekte', 'Allergien', 'Autoimmunprobleme'] },
  { label: 'Haut, Haare & Nägel', symptoms: ['Haarausfall', 'Hautprobleme', 'Trockene Haut', 'Brüchige Nägel', 'Akne', 'Faltenbildung', 'Schuppige Haut', 'Pigmentflecken'] },
  { label: 'Verdauung', symptoms: ['Verdauungsprobleme', 'Blähungen', 'Durchfall', 'Verstopfung', 'Reizdarm', 'Nahrungsmittelunverträglichkeiten', 'Übelkeit', 'Sodbrennen'] },
  { label: 'Herz & Kreislauf', symptoms: ['Herzrasen', 'Bluthochdruck', 'Schwindel', 'Kurzatmigkeit', 'Kalte Hände/Füße', 'Ohnmachtsgefühle'] },
  { label: 'Knochen & Gelenke', symptoms: ['Osteoporose-Risiko', 'Gelenksteifheit', 'Knochenschmerzen', 'Arthrose-Beschwerden', 'Bandscheibenprobleme'] },
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
  const [mode, setMode] = useState<'ziele' | 'symptome'>('ziele')
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].label)
  const [selected, setSelected] = useState<string[]>([])

  function toggleSymptom(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  function analyzeSymptoms() {
    if (selected.length === 0) return
    onSelect(
      `Ich habe folgende Beschwerden: ${selected.join(', ')}. ` +
      `Welche HEC+ME Supplemente passen zu meinen Symptomen und warum? ` +
      `Bitte erkläre auch, welche Kombinationen sinnvoll sind.`
    )
  }

  const currentSymptoms = CATEGORIES.find(c => c.label === activeCat)?.symptoms ?? []

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

      <div className="mode-tabs">
        <button className={`mode-tab ${mode === 'ziele' ? 'active' : ''}`} onClick={() => setMode('ziele')}>
          Nach Ziel
        </button>
        <button className={`mode-tab ${mode === 'symptome' ? 'active' : ''}`} onClick={() => setMode('symptome')}>
          Nach Symptomen
        </button>
      </div>

      {mode === 'ziele' ? (
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
      ) : (
        <div className="symptom-section">
          <div className="cat-row">
            {CATEGORIES.map((c) => (
              <button
                key={c.label}
                className={`cat-pill ${activeCat === c.label ? 'active' : ''}`}
                onClick={() => setActiveCat(c.label)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="symptom-grid">
            {currentSymptoms.map((s) => (
              <button
                key={s}
                className={`symptom-chip ${selected.includes(s) ? 'selected' : ''}`}
                onClick={() => toggleSymptom(s)}
              >
                {s}
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="selected-bar">
              <span className="selected-count">{selected.length} ausgewählt:</span>
              <span className="selected-list">{selected.join(', ')}</span>
              <button className="clear-btn" onClick={() => setSelected([])}>Leeren</button>
            </div>
          )}
          <button className="analyze-btn" disabled={selected.length === 0} onClick={analyzeSymptoms}>
            {selected.length === 0
              ? 'Symptome auswählen'
              : `${selected.length} Symptom${selected.length > 1 ? 'e' : ''} analysieren →`}
          </button>
        </div>
      )}

      <p className="disclaimer">
        Nur zur Information. Kein Ersatz für medizinische Beratung. Sprich bei gesundheitlichen Beschwerden mit deinem Arzt.
      </p>
    </div>
  )
}

function ChatArea({ onActiveChange }: { onActiveChange: (active: boolean) => void }) {
  const [input, setInput] = useState('')
  const { messages, sendMessage, isLoading, stop } = useAIChat()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onActiveChange(messages.length > 0)
  }, [messages.length, onActiveChange])

  function handleSend(text: string) {
    if (!text.trim() || isLoading) return
    sendMessage(text)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <>
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
    </>
  )
}

function Home() {
  const [sessionKey, setSessionKey] = useState(0)
  const [chatActive, setChatActive] = useState(false)

  function resetChat() {
    setSessionKey(k => k + 1)
    setChatActive(false)
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
          <div className="header-right">
            {chatActive && (
              <button className="reset-header-btn" onClick={resetChat}>
                <RotateCcw size={13} strokeWidth={2} />
                Neue Suche
              </button>
            )}
            <div className="header-badge">Powered by Claude</div>
          </div>
        </div>
      </header>

      <ChatArea key={sessionKey} onActiveChange={setChatActive} />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
