import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `Tu es l'assistant IA personnel d'Othmane EL HOUDAIGUI, intégré à son portfolio en ligne. Ton rôle est de répondre aux questions des visiteurs concernant son parcours, ses compétences, et ses projets.

Voici les informations clés sur Othmane :
- Poste actuel : Alternant Ingénieur IA — Maintenance Prédictive chez CAF (Construcciones y Auxiliar de Ferrocarriles) à Reichshoffen (Sept 2025 - Août 2026).
- Études : Diplôme d'Ingénieur Généraliste aux Arts et Métiers Sciences et Technologies (2023 - 2026), avec une spécialisation en Mécatronique et Systèmes Complexes.
- Expérience Passée : Stagiaire Maintenance Mécanique au Groupe RATP (Juil. 2024).
- Domaines d'Expertise : Ingénierie Système, Data & Algorithmes (Machine Learning, Traitement du signal, Analyse vibratoire), Infrastructure Ferroviaire, Mécatronique, IoT & Edge.

Stack Technologique :
- Programmation : Python, C/C++, MATLAB, SQL, LabVIEW.
- IA / Data Science : PyTorch, TensorFlow, Scikit-learn, Isolation Forest, Autoencoders.
- Outils / DevOps : Docker, Git, AWS IoT, InfluxDB, Grafana.

Projets Professionnels Phares :
1. Détection précoce d'usure d'essieux (Modèle ML avec vibrations, réduction des temps d'arrêt).
2. Jumeau Numérique de Voie Ferrée (Simulation de dégradation combinant modèles physiques et IA).
3. Dashboard Supervision Flotte (Architecture InfluxDB + Grafana pour plus de 100 rames).
4. Algorithme de Diagnostic Pantographe (Computer Vision, détection d'arcs avec >99% de précision).

Projets Académiques :
1. Robot Autonome de Suivi de Ligne (Conception CAO 3D, PCB, C++ PID).
2. Classification d'Images Médicales (ResNet50 PyTorch sur IRM pour tumeurs cérébrales).

Contact et Localisation :
- Localisation : Strasbourg, France
- Email : elhoudaiguiothmane1@gmail.com
- LinkedIn : Othmane EL HOUDAIGUI
- GitHub : GuyProgress

Directives de conversation :
- Sois professionnel, courtois, et clair.
- Réponds en français de manière concise, sauf si l'utilisateur parle une autre langue.
- Si on te pose une question hors du contexte professionnel d'Othmane (ex: recettes de cuisine, météo abstraite, ou programmation sans lien avec le portfolio), recadre poliment la conversation sur son profil ou indique que tu n'es programmé que pour parler d'Othmane.
- Si le visiteur souhaite le contacter, donne-lui toujours son adresse email.`;

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function Chatbot({ isDark = true }: { isDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: "Bonjour ! Je suis OthmaneGPT, l'assistant IA d'Othmane. Posez-moi vos questions sur ses projets, ses compétences ou son parcours." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI client
  // Ensure "VITE_GEMINI_API_KEY" is defined in your .env file
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || 'YOUR_API_KEY' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      if (!apiKey) {
         setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Erreur : La clé API Gemini n'est pas configurée dans le fichier .env (VITE_GEMINI_API_KEY)." }]);
         setIsLoading(false);
         return;
      }

      // Format previous messages for Gemini context
      const contents = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      
      // Append current user message
      contents.push({ role: 'user', parts: [{ text: userText }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents as any,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
      });

      const modelReply = response.text || "Désolé, je n'ai pas pu générer de réponse.";
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: modelReply }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Désolé, une erreur est survenue lors de la communication avec le serveur." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 
          ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'} 
          ${isDark ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-500'}
        `}
        aria-label="Ouvrir le chat assistant"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-[100] w-[90vw] max-w-[400px] h-[600px] max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}
          ${isDark ? 'bg-zinc-900 border border-white/10' : 'bg-white border border-black/10'}
        `}
      >
        {/* Header */}
        <div className={`p-4 flex items-center justify-between border-b ${isDark ? 'border-white/10 bg-zinc-950/50' : 'border-black/5 bg-zinc-50'}`}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-500 text-white">
                <Bot size={20} />
             </div>
             <div>
                <h3 className={`font-semibold text-lg leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>OthmaneGPT</h3>
                <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Assistant Personnel IA</p>
             </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-black/5 text-zinc-600'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Message View Area */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth ${isDark ? 'bg-zinc-900/50' : 'bg-zinc-50/50'}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                     ${msg.role === 'model' ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') 
                     : (isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-600')}
                  `}>
                     {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                  </div>

                  {/* Bubble */}
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                     ${msg.role === 'user' 
                        ? (isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') 
                        : (isDark ? 'bg-zinc-800 text-zinc-200 border border-white/5' : 'bg-white text-zinc-800 border border-black/5 shadow-sm')
                     }
                  `}>
                    {msg.text}
                  </div>
               </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex gap-3 max-w-[85%] flex-row">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                     <Bot size={16} />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl flex items-center gap-2 ${isDark ? 'bg-zinc-800 border border-white/5' : 'bg-white border border-black/5 shadow-sm'}`}>
                    <Loader2 size={16} className="animate-spin text-emerald-500" />
                    <span className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Génération...</span>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${isDark ? 'border-white/10 bg-zinc-950/50' : 'border-black/5 bg-white'}`}>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Chattez avec OthmaneGPT..." 
              className={`flex-1 px-4 py-3 rounded-full outline-none border transition-colors text-sm
                ${isDark ? 'bg-zinc-900 border-white/10 text-white placeholder-zinc-500 focus:border-emerald-500' : 'bg-zinc-100 border-transparent text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:bg-white'}
              `}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors disabled:opacity-50
                ${isDark ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-500'}
              `}
            >
              <Send size={18} className="translate-x-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
