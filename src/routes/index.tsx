import { useEffect, useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Send, Square, Zap, Moon, Shield, Brain, Dumbbell, Heart, Wind, Bone, RotateCcw, Target, Stethoscope, Copy, Check, Printer, ShoppingBag } from 'lucide-react'
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

type SymptomGroup = { sub: string; symptoms: string[] }
type Category = { label: string; planned?: boolean; groups: SymptomGroup[] }

const CATEGORIES: Category[] = [
  {
    label: 'Energie & Erschöpfung',
    groups: [
      { sub: 'Müdigkeit & Antrieb', symptoms: ['Morgenmüdigkeit', 'Antriebslosigkeit', 'Chronische Müdigkeit', 'Nachmittagstief'] },
      { sub: 'Erschöpfung & Burnout', symptoms: ['Erschöpfung', 'Burnout-Gefühl', 'Stressbedingte Erschöpfung', 'Leistungsabfall'] },
    ],
  },
  {
    label: 'Schlaf & innere Unruhe',
    groups: [
      { sub: 'Schlafqualität', symptoms: ['Einschlafschwierigkeiten', 'Durchschlafschwierigkeiten', 'Unruhiger Schlaf', 'Schlafprobleme'] },
      { sub: 'Anspannung', symptoms: ['Innere Unruhe', 'Nervosität', 'Stress', 'Gedankenkreisen'] },
    ],
  },
  {
    label: 'Stimmung & Psyche',
    groups: [
      { sub: 'Stimmung', symptoms: ['Depressive Verstimmung', 'Stimmungsschwankungen', 'Reizbarkeit'] },
      { sub: 'Angst & Stress', symptoms: ['Angstzustände', 'Innere Anspannung', 'Cortisol-Stress'] },
    ],
  },
  {
    label: 'Konzentration & Gehirn',
    groups: [
      { sub: 'Kognition', symptoms: ['Konzentrationsprobleme', 'Vergesslichkeit', 'Brain Fog'] },
      { sub: 'Mentale Leistung', symptoms: ['Geistige Erschöpfung', 'Fokusverlust'] },
    ],
  },
  {
    label: 'Immunsystem & Schilddrüse',
    groups: [
      { sub: 'Immunabwehr', symptoms: ['Immunschwäche', 'Häufige Erkältungen', 'Häufige Infekte', 'Langsame Wundheilung'] },
      { sub: 'Schilddrüse & Stoffwechsel', symptoms: ['Schilddrüsenprobleme', 'Kältegefühl', 'Stoffwechselträgheit'] },
    ],
  },
  {
    label: 'Muskeln & Bewegung',
    groups: [
      { sub: 'Muskelfunktion', symptoms: ['Muskelkrämpfe', 'Muskelzittern', 'Muskelschwäche', 'Schwere Beine'] },
      { sub: 'Sport & Regeneration', symptoms: ['Langsame Regeneration', 'Leistungsabfall Sport', 'Muskelkater'] },
      { sub: 'Kopf', symptoms: ['Migräne', 'Spannungskopfschmerzen'] },
    ],
  },
  {
    label: 'Gelenke & Knochen',
    groups: [
      { sub: 'Gelenke', symptoms: ['Gelenkschmerzen', 'Gelenksteifheit', 'Arthrose-Beschwerden'] },
      { sub: 'Knochen & Entzündung', symptoms: ['Osteoporose-Risiko', 'Schwache Knochen', 'Chronische Entzündungen'] },
    ],
  },
  {
    label: 'Haut, Haare & Nägel',
    groups: [
      { sub: 'Haare & Nägel', symptoms: ['Haarausfall', 'Brüchige Nägel', 'Dünner werdendes Haar'] },
      { sub: 'Haut', symptoms: ['Akne', 'Unreine Haut', 'Trockene Haut', 'Faltenbildung'] },
    ],
  },
  {
    label: 'Verdauung & Darm',
    groups: [
      { sub: 'Verdauung', symptoms: ['Blähungen', 'Völlegefühl', 'Verstopfung', 'Durchfall'] },
      { sub: 'Darmgesundheit', symptoms: ['Reizdarm', 'Nahrungsmittelunverträglichkeiten', 'Darmflora-Aufbau'] },
    ],
  },
  {
    label: 'Hormone & Zyklus',
    planned: true,
    groups: [
      { sub: 'PMS & Zyklus', symptoms: ['PMS-Beschwerden', 'Zyklusbeschwerden', 'Stimmungstief vor der Periode', 'Krämpfe während der Periode'] },
      { sub: 'Wechseljahre', symptoms: ['Hitzewallungen', 'Nachtschweiß', 'Hormonelle Umstellung'] },
      { sub: 'Hormonbalance', symptoms: ['Wassereinlagerungen', 'Hormonell bedingte Müdigkeit'] },
    ],
  },
  {
    label: 'Libido & Vitalität',
    planned: true,
    groups: [
      { sub: 'Libido', symptoms: ['Libidoverlust', 'Geringe sexuelle Lust'] },
      { sub: 'Vitalität & Hormone', symptoms: ['Antriebsschwäche', 'Testosteron-Unterstützung', 'Allgemeine Vitalität'] },
    ],
  },
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

function getMessageText(message: ChatMessages[number]): string {
  return message.parts
    .filter((p) => p.type === 'text' && p.content)
    .map((p) => (p as { content: string }).content)
    .join('\n\n')
}

function MessageActions({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback für ältere Browser
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handlePrint() {
    const win = window.open('', '_blank', 'width=720,height=900')
    if (!win) return
    const safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
    win.document.write(`
      <html><head><title>HEC+ME Empfehlung</title>
      <style>
        body { font-family: Georgia, serif; max-width: 640px; margin: 40px auto; padding: 0 24px; color: #1a1a1a; line-height: 1.7; }
        h1 { color: #C85A00; font-size: 22px; border-bottom: 2px solid #C85A00; padding-bottom: 10px; }
        .meta { color: #888; font-size: 12px; margin-bottom: 24px; }
        a { color: #C85A00; }
        .foot { margin-top: 32px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 11px; color: #888; }
      </style></head>
      <body>
        <h1>HEC+ME · Deine Supplement-Empfehlung</h1>
        <div class="meta">Erstellt am ${new Date().toLocaleDateString('de-DE')} · hecme.de</div>
        <div>${safe}</div>
        <div class="foot">Nur zur Information. Kein Ersatz für medizinische Beratung. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene Ernährung.</div>
      </body></html>
    `)
    win.document.close()
    setTimeout(() => win.print(), 300)
  }

  return (
    <div className="message-actions">
      <button className="msg-action-btn" onClick={handleCopy}>
        {copied ? <Check size={13} strokeWidth={2.2} /> : <Copy size={13} strokeWidth={2} />}
        {copied ? 'Kopiert' : 'Kopieren'}
      </button>
      <button className="msg-action-btn" onClick={handlePrint}>
        <Printer size={13} strokeWidth={2} />
        Drucken
      </button>
      <a className="msg-action-btn msg-action-shop" href="https://www.hecme.de/shop" target="_blank" rel="noopener">
        <ShoppingBag size={13} strokeWidth={2} />
        Zum Shop
      </a>
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
            {message.role === 'assistant' && !isLoading && getMessageText(message).length > 40 && (
              <MessageActions text={getMessageText(message)} />
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

  const currentCategory = CATEGORIES.find(c => c.label === activeCat)
  const currentGroups = currentCategory?.groups ?? []
  const isPlanned = currentCategory?.planned ?? false

  return (
    <div className="empty-state">
      <div className="empty-hero">
        <div className="hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1b2128" />
                <stop offset="58%" stopColor="#222a33" />
                <stop offset="100%" stopColor="#2b343f" />
              </linearGradient>
              <linearGradient id="hSun" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9a3d" />
                <stop offset="100%" stopColor="#C85A00" />
              </linearGradient>
              <linearGradient id="hMtnBack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a4754" />
                <stop offset="100%" stopColor="#222a33" />
              </linearGradient>
              <linearGradient id="hMtnFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a333d" />
                <stop offset="100%" stopColor="#161a1f" />
              </linearGradient>
              <linearGradient id="hLake" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9a3d" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#222a33" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            <rect width="480" height="200" fill="url(#hSky)" />

            <circle cx="250" cy="68" r="40" fill="url(#hSun)" opacity="0.9" />
            <circle cx="250" cy="68" r="56" fill="#ff9a3d" opacity="0.1" />
            <circle cx="250" cy="68" r="72" fill="#ff9a3d" opacity="0.045" />

            <path d="M0 132 L70 80 L130 122 L200 62 L270 120 L340 74 L410 124 L480 86 L480 200 L0 200 Z" fill="url(#hMtnBack)" opacity="0.85" />
            <path d="M0 160 L90 112 L170 152 L250 102 L330 150 L420 110 L480 150 L480 200 L0 200 Z" fill="url(#hMtnFront)" />
            <ellipse cx="240" cy="184" rx="240" ry="18" fill="url(#hLake)" />

            <g transform="translate(232 98) rotate(-16)">
              <g fill="#0d1116">
                <g stroke="#0d1116" strokeLinecap="round" fill="none">
                  <path d="M9 10 L42 4" strokeWidth="13" />
                  <path d="M42 4 L70 -3" strokeWidth="9" />
                  <path d="M2 14 L-10 38" strokeWidth="13" />
                  <path d="M-10 38 L14 44" strokeWidth="9" />
                  <path d="M8 -26 L36 -36" strokeWidth="8.5" />
                  <path d="M36 -36 L57 -50" strokeWidth="6" />
                  <path d="M-2 -26 L-30 -34" strokeWidth="8.5" />
                  <path d="M-30 -34 L-50 -50" strokeWidth="6" />
                </g>
                <path d="M57 -50 q7 -5 12 -1 q3 4 -2 7 q-6 4 -12 1 q-3 -4 2 -7 Z" />
                <path d="M-50 -50 q-7 -5 -12 -1 q-3 4 2 7 q6 4 12 1 q3 -4 -2 -7 Z" />
                <path d="M70 -3 Q78 -5 87 -10 Q90 -12 88 -8 Q84 -2 74 2 Q69 3 68 0 Z" />
                <path d="M14 44 q9 1 11 6 q1 4 -4 5 l-10 -3 q-3 -3 3 -8 Z" />
                <path d="M0 -31 L22 -28 Q29 -8 23 14 Q18 22 10 21 Q2 20 0 11 Q-3 -11 0 -31 Z" />
                <circle cx="11" cy="-42" r="9.5" />
              </g>
            </g>
          </svg>
        </div>
        <div className="brand-capsule" aria-hidden="true">
          <CapsuleIcon />
        </div>
        <h1 className="hero-headline">
          Finde dein <em>passendes</em><br />Supplement
        </h1>
        <p className="hero-sub">
          Wähle deinen Weg: Suche nach einem <strong>Ziel</strong>, das du erreichen möchtest – oder nach konkreten <strong>Symptomen</strong>, die dich belasten.
        </p>
      </div>

      {/* Modus-Umschalter: zwei klar getrennte Karten */}
      <div className="mode-switch">
        <button
          className={`mode-card ${mode === 'ziele' ? 'active' : ''}`}
          onClick={() => setMode('ziele')}
        >
          <Target size={20} strokeWidth={1.8} />
          <div className="mode-card-text">
            <span className="mode-card-title">Nach Ziel</span>
            <span className="mode-card-sub">Was möchtest du erreichen?</span>
          </div>
        </button>
        <button
          className={`mode-card ${mode === 'symptome' ? 'active' : ''}`}
          onClick={() => setMode('symptome')}
        >
          <Stethoscope size={20} strokeWidth={1.8} />
          <div className="mode-card-text">
            <span className="mode-card-title">Nach Symptomen</span>
            <span className="mode-card-sub">Was belastet dich?</span>
          </div>
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
          {/* Schritt 1: Bereich (Überbegriff) wählen */}
          <div className="symptom-step">
            <span className="step-label"><span className="step-num">1</span> Bereich wählen</span>
            <div className="cat-row">
              {CATEGORIES.map((c) => (
                <button
                  key={c.label}
                  className={`cat-pill ${activeCat === c.label ? 'active' : ''}`}
                  onClick={() => setActiveCat(c.label)}
                >
                  {c.label}
                  {c.planned && <span className="planned-dot" title="Produkte in Planung">bald</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Schritt 2: konkrete Symptome wählen, gruppiert nach Unterbereich */}
          <div className="symptom-step">
            <span className="step-label"><span className="step-num">2</span> Symptome auswählen</span>
            {isPlanned && (
              <div className="planned-note">
                Für diesen Bereich hat HEC+ME noch kein eigenes Produkt – du bekommst aber trotzdem eine fundierte Empfehlung, welcher Wirkstoff dir helfen könnte.
              </div>
            )}
            <div className="symptom-groups">
              {currentGroups.map((g) => (
                <div key={g.sub} className="symptom-group">
                  <span className="symptom-group-label">{g.sub}</span>
                  <div className="symptom-grid">
                    {g.symptoms.map((s) => (
                      <button
                        key={s}
                        className={`symptom-chip ${selected.includes(s) ? 'selected' : ''}`}
                        onClick={() => toggleSymptom(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
        <br />
        <Link to="/impressum" className="disclaimer-link">Impressum</Link>
        {' · '}
        <Link to="/datenschutz" className="disclaimer-link">Datenschutz</Link>
      </p>
    </div>
  )
}

function ChatArea({ onActiveChange, onReset }: { onActiveChange: (active: boolean) => void; onReset: () => void }) {
  const [input, setInput] = useState('')
  const { messages, sendMessage, isLoading, stop, error } = useAIChat()
  const inputRef = useRef<HTMLInputElement>(null)

  const hasMessages = messages.length > 0

  useEffect(() => {
    onActiveChange(hasMessages)
  }, [hasMessages, onActiveChange])

  function handleSend(text: string) {
    if (!text.trim() || isLoading) return
    sendMessage(text)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <>
      <main className="chat-main">
        {!hasMessages ? (
          <EmptyState onSelect={(p) => handleSend(p)} />
        ) : (
          <Messages messages={messages} isLoading={isLoading} />
        )}
      </main>

      <footer className="input-footer">
        <div className="input-inner">
          {error && !isLoading && (
            <div className="error-note">
              {/rate|429|many|limit/i.test(error.message)
                ? 'Zu viele Anfragen in kurzer Zeit. Bitte warte einen Moment und versuche es erneut.'
                : 'Es gab ein Problem bei der Verbindung. Bitte versuche es erneut.'}
            </div>
          )}
          {isLoading && (
            <div className="stop-row">
              <button onClick={stop} className="stop-btn">
                <Square size={13} fill="currentColor" strokeWidth={0} />
                Antwort stoppen
              </button>
            </div>
          )}
          <div className="input-row">
            {hasMessages && !isLoading && (
              <button className="reset-inline-btn" onClick={onReset} title="Neue Suche starten">
                <RotateCcw size={15} strokeWidth={2} />
                <span>Neue Suche</span>
              </button>
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
        </div>
      </footer>
    </>
  )
}

const CONSENT_KEY = 'hecme_consent_v1'

function ConsentOverlay({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="consent-overlay">
      <div className="consent-box">
        <div className="consent-icon" aria-hidden="true"><CapsuleIcon /></div>
        <h2 className="consent-title">Bevor es losgeht</h2>
        <p className="consent-text">
          Dieser Supplement-Finder gibt dir auf Basis deiner Angaben eine persönliche, KI-gestützte
          Empfehlung. Deine Eingaben können <strong>Gesundheitsangaben</strong> enthalten und werden zur
          Beantwortung an unseren KI-Dienstleister <strong>Anthropic (USA)</strong> übermittelt. Sie werden
          von uns nicht dauerhaft gespeichert.
        </p>
        <p className="consent-text">
          Die Empfehlungen ersetzen keine ärztliche Beratung. Mit „Einverstanden" willigst du in diese
          Verarbeitung ein. Details findest du in unserer{' '}
          <Link to="/datenschutz" className="consent-link">Datenschutzerklärung</Link>.
        </p>
        <button className="consent-accept" onClick={onAccept}>
          Einverstanden &amp; weiter
        </button>
        <p className="consent-foot">
          Du kannst deine Einwilligung jederzeit widerrufen, indem du die Nutzung beendest.
        </p>
      </div>
    </div>
  )
}

function Home() {
  const [sessionKey, setSessionKey] = useState(0)
  const [chatActive, setChatActive] = useState(false)
  const [consented, setConsented] = useState(true)

  useEffect(() => {
    try {
      setConsented(localStorage.getItem(CONSENT_KEY) === 'true')
    } catch {
      setConsented(false)
    }
  }, [])

  function acceptConsent() {
    try {
      localStorage.setItem(CONSENT_KEY, 'true')
    } catch {
      // localStorage nicht verfügbar – Zustimmung gilt für diese Sitzung
    }
    setConsented(true)
  }

  function resetChat() {
    setSessionKey(k => k + 1)
    setChatActive(false)
  }

  return (
    <div className="app-shell">
      {!consented && <ConsentOverlay onAccept={acceptConsent} />}
      <header className="app-header">
        <div className="header-inner">
          <button className="brand brand-button" onClick={resetChat} title="Zurück zur Startseite">
            <div className="brand-icon" aria-hidden="true"><CapsuleIcon /></div>
            <div className="brand-text">
              <span className="brand-name">HEC<span className="brand-plus">+</span>ME</span>
              <span className="brand-tagline">Supplement Finder</span>
            </div>
          </button>
          <div className="header-right">
            {chatActive && (
              <button className="reset-header-btn" onClick={resetChat}>
                <RotateCcw size={13} strokeWidth={2} />
                <span>Neue Suche</span>
              </button>
            )}
            <div className="header-badge">Powered by Claude</div>
          </div>
        </div>
      </header>

      <ChatArea key={sessionKey} onActiveChange={setChatActive} onReset={resetChat} />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
