import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, Cpu, Database, Search, Terminal, Zap, ShieldAlert, 
  CheckCircle2, Server, Activity, ArrowRight, Loader2, AlertTriangle, ArrowUpRight, Box
} from 'lucide-react';

type ProcessState = 'IDLE' | 'IPFS_SEARCH' | 'COMPUTING' | 'CONSENSUS' | 'ARBITRATION' | 'ANSWER';
type Message = { id: string; role: 'user' | 'kollektiv'; content: string };

const MOCK_LOGS_A = [
  "Initialize DeepSeek-R1 inference via ONNX...",
  "Loading attention matrices into VRAM [===  ]",
  "Loading attention matrices into VRAM [=====]",
  "Context length: 4096 tokens",
  "Decoding query vectors from IPFS chunk...",
  "Found matching IPFS hash: QmXyZ8a...",
  "Applying LoRA weights...",
  "Calculating attention scores...",
  "Generating response tokens...",
  "Finalizing transformer layer 32/32...",
  "Inference complete. Emitting hash."
];

const MOCK_LOGS_B = [
  "Llama.cpp backend initialized...",
  "Allocating tensor buffers...",
  "Context window set to 4096",
  "Fetching vector embeddings...",
  "IPFS hash verified: QmXyZ8a...",
  "Loading KV cache...",
  "Computing forward pass...",
  "Sampling next tokens (temperature=0.7)...",
  "Evaluating consensus bounds...",
  "Finalizing layer 32/32...",
  "Execution complete. Emitting hash."
];

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [vramAllocation, setVramAllocation] = useState(8);
  const [credits, setCredits] = useState(128.45);
  const [activePeers, setActivePeers] = useState(14028);
  const [computePower, setComputePower] = useState(4.28);
  const [throughput, setThroughput] = useState(1.42);

  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: '1',
      role: 'kollektiv',
      content: 'Willkommen bei Leviathan. Das dezentrale AI-Kollektiv wartet auf deine Anfrage.'
    }
  ]);
  const [processState, setProcessState] = useState<ProcessState>('IDLE');
  
  // Consensus visual state
  const [consensusMatch, setConsensusMatch] = useState(0);
  const [logsA, setLogsA] = useState<string[]>([]);
  const [logsB, setLogsB] = useState<string[]>([]);
  const [logsC, setLogsC] = useState<string[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Network connection mock
  useEffect(() => {
    setTimeout(() => setIsConnected(true), 1500);
  }, []);

  // Compute credits & peers simulation
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setCredits(prev => prev + (vramAllocation * 0.0019));
      setActivePeers(prev => {
        const jitter = Math.floor(Math.random() * 9) - 4;
        return Math.max(1000, prev + jitter);
      });
      setComputePower(prev => {
         const jitter = (Math.random() * 0.04) - 0.02;
         return Math.max(0, prev + jitter);
      });
      setThroughput(prev => {
         const jitter = (Math.random() * 0.02) - 0.01;
         return Math.max(0, prev + jitter);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isConnected, vramAllocation]);

  // Auto-scroll mechanism
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation, processState, logsA, logsB, logsC]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || processState !== 'IDLE') return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setConversation(prev => [...prev, userMsg]);
    setQuery('');
    startComputeEngine();
  };

  const startComputeEngine = async () => {
    setProcessState('IPFS_SEARCH');
    setLogsA([]);
    setLogsB([]);
    setLogsC([]);
    setConsensusMatch(0);
    
    // IPFS Search phase
    await new Promise(r => setTimeout(r, 2000));
    
    // Computing phase
    setProcessState('COMPUTING');
    
    // Stream logs mockup
    for(let i=0; i < MOCK_LOGS_A.length; i++) {
        await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
        setLogsA(prev => [...prev, MOCK_LOGS_A[i]]);
        setLogsB(prev => [...prev, MOCK_LOGS_B[i]]);
    }

    // Consensus Phase
    setProcessState('CONSENSUS');
    let matchPercentage = 0;
    
    // 30% chance of consensus failure
    const willFail = Math.random() < 0.3 || query.toLowerCase().includes('fail');
    const targetMatch = willFail ? 74 : 98;
    
    while(matchPercentage < targetMatch) {
        matchPercentage += Math.floor(Math.random() * 15) + 5;
        if(matchPercentage > targetMatch) matchPercentage = targetMatch;
        setConsensusMatch(matchPercentage);
        await new Promise(r => setTimeout(r, 150));
    }
    
    await new Promise(r => setTimeout(r, 800));

    if (willFail) {
      setProcessState('ARBITRATION');
      const arbiterLogs = [
        "Arbiter requested. Evaluating divergence...",
        "Receiving KV states from Node A and Node B...",
        "Executing deterministic tie-breaker (DeepSeek-R1-Distill-Llama-70B)...",
        "Resolving consensus... Match found with Node A."
      ];
      for(let i=0; i < arbiterLogs.length; i++) {
         await new Promise(r => setTimeout(r, 600));
         setLogsC(prev => [...prev, arbiterLogs[i]]);
      }

      // Re-trigger consensus state but jumping to 98%
      setProcessState('CONSENSUS');
      matchPercentage = targetMatch;
      while(matchPercentage < 98) {
          matchPercentage += Math.floor(Math.random() * 8) + 2;
          if(matchPercentage > 98) matchPercentage = 98;
          setConsensusMatch(matchPercentage);
          await new Promise(r => setTimeout(r, 100));
      }
      await new Promise(r => setTimeout(r, 1000));
    }

    // Result Phase
    setProcessState('ANSWER');
    setConversation(prev => [...prev, {
        id: Date.now().toString(),
        role: 'kollektiv',
        content: `Basierend auf dem Netzwerkkonsens (98% Übereinstimmung) hier die Antwort: Das dezentrale Wissensnetzwerk greift erfolgreich auf verteilte Vektor-Indexe via IPFS zu. Die Berechnungen wurden durch Consumer-GPUs gedeckt und durch das Leviathan-Protokoll verifiziert. Deine Anfrage wurde dezentral und ohne Single-Point-of-Failure verarbeitet.`
    }]);

    await new Promise(r => setTimeout(r, 1000));
    setProcessState('IDLE');
  };

  return (
    <div className="flex bg-black text-[#00FF41] h-screen font-mono overflow-hidden relative">
      <div className="scanlines"></div>
      {/* SIDEBAR: NODE STATUS */}
      <aside className="w-80 border-r border-[#00FF41]/30 bg-[#050505] flex flex-col z-10 shadow-[4px_0_24px_rgba(0,255,65,0.1)]">
        <div className="p-6 border-b border-[#00FF41]/30">
          <div className="flex items-center space-x-3 mb-1">
            <Network className="w-6 h-6 text-[#00FF41]" />
            <h1 className="text-xl font-bold tracking-tight text-white">LEVIATHAN</h1>
          </div>
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#666]">Decentralized AI-Wikipedia</p>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-8 overflow-y-auto">
          {/* Connection Status */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-[#888] font-mono">Node Status</h2>
            <div className={`p-4 border ${isConnected ? 'border-[#00FF41] bg-[#00FF41]/10' : 'border-yellow-500 bg-yellow-500/10'} flex items-center space-x-4 transition-colors duration-500`}>
              <div className="relative flex h-3 w-3">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-[#00FF41]' : 'bg-yellow-500'}`}></span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{isConnected ? 'Mainnet Connected' : 'Connecting to Swarm...'}</p>
                <p className="text-xs font-mono text-[#888]">
                  {isConnected ? 'Sync: 100% (Block #49281)' : 'Establishing P2P handshake...'}
                </p>
              </div>
            </div>
          </div>

          {/* Network Stats */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-[#888] font-mono">Network Snapshot</h2>
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-black border border-[#00FF41]/50 p-3">
                  <div className="text-[#00FF41]/70 mb-1"><Activity className="w-4 h-4" /></div>
                  <div className="text-lg font-mono text-[#00FF41]">{activePeers.toLocaleString()}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#00FF41]/70">Active Peers</div>
               </div>
               <div className="bg-black border border-[#00FF41]/50 p-3">
                  <div className="text-[#00FF41]/70 mb-1"><Database className="w-4 h-4" /></div>
                  <div className="text-lg font-mono text-[#00FF41]">4.2 PB</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#00FF41]/70">IPFS Index Size</div>
               </div>
               <div className="bg-black border border-[#00FF41]/50 p-3">
                  <div className="text-[#00FF41]/70 mb-1"><Cpu className="w-4 h-4" /></div>
                  <div className="text-lg font-mono text-[#00FF41]">{isConnected ? computePower.toFixed(2) : '0.00'} EFLOPs</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#00FF41]/70">Global Compute</div>
               </div>
               <div className="bg-black border border-[#00FF41]/50 p-3">
                  <div className="text-[#00FF41]/70 mb-1"><Zap className="w-4 h-4" /></div>
                  <div className="text-lg font-mono text-[#00FF41]">{isConnected ? throughput.toFixed(2) : '0.00'} M/s</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#00FF41]/70">Global Throughput</div>
               </div>
            </div>
          </div>

          {/* Assimilated Models */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-[#888] font-mono">Assimilated Models</h2>
            <div className="space-y-2">
              {[
                { name: 'DeepSeek-R1-Distill', size: '1.5B', status: 'ACTIVE' },
                { name: 'Llama-3-Instruct', size: '8B:4bit', status: 'SEEDED' },
                { name: 'Mistral-Nemo-Mini', size: '2B', status: 'INDEXING' }
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between bg-[#00FF41]/5 border border-[#00FF41]/30 p-2 text-xs font-mono group hover:border-[#00FF41] transition-colors">
                  <div className="flex items-center gap-2">
                    <Box className="w-3 h-3 text-[#00FF41]/50 group-hover:text-[#00FF41]" />
                    <span className="text-[#00FF41] opacity-90 truncate max-w-[100px]" title={m.name}>{m.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#00FF41]/50 text-[9px]">{m.size}</span>
                    <span className="text-[#00FF41] text-[10px] uppercase animate-pulse">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VRAM Allocation Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-widest text-[#888] font-mono">Contribute Compute</h2>
              <span className="text-xs font-mono text-[#00FF41] bg-[#00FF41]/10 px-2 py-0.5 rounded">{vramAllocation} GB VRAM</span>
            </div>
            
            <input 
              type="range" 
              min="2" max="24" step="2"
              value={vramAllocation}
              onChange={(e) => setVramAllocation(Number(e.target.value))}
              disabled={!isConnected}
              className="w-full h-1 bg-[#00FF41]/20 appearance-none cursor-pointer accent-[#00FF41]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#666]">
              <span>2 GB (Min)</span>
              <span>24 GB (Max)</span>
            </div>
          </div>

          {/* Reward Metrics */}
          <div className="mt-auto space-y-4 pt-6 border-t border-[#00FF41]/30">
            <h2 className="text-xs uppercase tracking-widest text-[#00FF41]/70 font-mono">Proof of Useful Work</h2>
            <div className="bg-black border border-[#00FF41] p-4 flex items-center justify-between group cursor-help">
               <div>
                  <div className="flex items-center space-x-2 text-[#00FF41] mb-1">
                     <Zap className="w-4 h-4 fill-[#00FF41]" />
                     <span className="text-sm font-semibold uppercase">Credits</span>
                  </div>
                  <div className="font-mono text-2xl text-[#00FF41] tracking-tight">
                    {credits.toFixed(3)}
                  </div>
               </div>
               <ArrowUpRight className="w-5 h-5 text-[#00FF41]/50 group-hover:text-[#00FF41] transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CHAT & PROCESS AREA */}
      <main className="flex-1 flex flex-col relative bg-black">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,65,0.1),transparent)] pointer-events-none"></div>

        {/* HEADER: BACKEND VISUALIZER */}
        <header className="border-b border-[#00FF41]/30 bg-black/80 backdrop-blur-md z-20 flex items-center justify-between px-6 py-4">
           <div className="flex items-center gap-6">
              <div className="text-xs font-mono text-[#00FF41]/70 flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>LEVIATHAN_BACKEND</span>
              </div>
              
              <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-[#00FF41]/90">
                <div className="flex gap-1" title="Node Gossip Protocol">
                   <div className="w-2 h-3 bg-[#00FF41] animate-pulse"></div>
                   <div className="w-2 h-3 bg-[#00FF41]/50"></div>
                   <div className="w-2 h-3 bg-[#00FF41]"></div>
                </div>
                <span>P2P_SWARM</span>
                <ArrowRight className="w-3 h-3 text-[#00FF41]/30" />
                
                <div className="w-20 h-1 bg-[#00FF41]/20 overflow-hidden relative border border-[#00FF41]/30">
                   <motion.div className="h-full bg-[#00FF41] w-4" animate={{ x: [ -20, 80 ] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                </div>
                <ArrowRight className="w-3 h-3 text-[#00FF41]/30" />
                
                <div className="flex gap-1 border border-[#00FF41]/30 p-1 px-2 items-center">
                   <Database className="w-3 h-3 mr-1" /> IPFS_DHT
                </div>
                <ArrowRight className="w-3 h-3 text-[#00FF41]/30" />
                
                <div className="flex gap-1 border border-[#00FF41]/30 p-1 px-2 items-center bg-[#00FF41]/10">
                   <Cpu className="w-3 h-3 mr-1" /> ONNX / LLAMA.CPP
                </div>
              </div>
           </div>

           <div className="text-[10px] font-mono text-[#00FF41]/70 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF41] rounded-full animate-ping"></span>
              GLOBAL_CONSENSUS_ENGINE
           </div>
        </header>

        {/* Scrollable Conversation */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8 scroll-smooth z-10">
          
          <AnimatePresence>
            {conversation.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`max-w-3xl ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                <div className={`p-4 border ${
                  msg.role === 'user' 
                    ? 'bg-black border-[#00FF41]/50 text-[#00FF41]' 
                    : 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]'
                }`}>
                  {msg.role === 'kollektiv' && (
                    <div className="flex items-center space-x-2 mb-3 border-b border-[#00FF41]/30 pb-2">
                      <Network className="w-4 h-4 text-[#00FF41]" />
                      <span className="text-[10px] uppercase tracking-widest font-mono text-[#00FF41]">SYSTEM::KOLLEKTIV_RESPONSE</span>
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="flex items-center space-x-2 mb-3 border-b border-[#00FF41]/30 pb-2 text-[#00FF41]/70">
                      <Terminal className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest font-mono">USER::LOCAL_QUERY</span>
                    </div>
                  )}
                  <div className={`leading-relaxed font-mono ${msg.role === 'kollektiv' ? 'text-lg tracking-wide shadow-[#00FF41]' : 'text-base'}`}>
                    {msg.role === 'user' ? `> ${msg.content}` : msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* VISUALIZATION CLUSTER */}
          <AnimatePresence>
            {processState !== 'IDLE' && processState !== 'ANSWER' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-4xl mx-auto border border-[#00FF41] bg-black/90 p-6 shadow-[0_0_15px_rgba(0,255,65,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-black">
                   <motion.div 
                      className="h-full bg-[#00FF41]"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: processState === 'IPFS_SEARCH' ? '20%' : processState === 'COMPUTING' ? '70%' : '100%' 
                      }}
                      transition={{ duration: 1 }}
                   />
                </div>

                {/* Phase: IPFS Search */}
                {processState === 'IPFS_SEARCH' && (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                     <div className="relative">
                        <Database className="w-16 h-16 text-[#00FF41]/40" />
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} className="absolute inset-0">
                           <Loader2 className="w-16 h-16 text-[#00FF41]" />
                        </motion.div>
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-[#00FF41] tracking-tight font-mono">Suche Vektoren auf IPFS...</h3>
                       <p className="text-sm text-[#00FF41]/80 font-mono mt-2">Resolving CID hashes across P2P swarm</p>
                     </div>
                  </div>
                )}

                {/* Phase: Computing / Twin Nodes */}
                {(processState === 'COMPUTING' || processState === 'CONSENSUS' || processState === 'ARBITRATION') && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#00FF41]/50 pb-4">
                      <div>
                         <h3 className="text-lg font-bold text-[#00FF41] tracking-tight flex items-center gap-2 uppercase">
                           <Cpu className="w-5 h-5 text-[#00FF41]" /> 
                           Dezentrale Inference (Twin Nodes)
                         </h3>
                         <p className="text-xs text-[#00FF41]/70 font-mono mt-1">Split task assigned via Leviathan Protocol</p>
                      </div>
                      <div className="px-3 py-1 border border-[#00FF41] text-xs font-mono text-[#00FF41] flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Consensus Requirement Mode
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* NODE A */}
                      <TwinNodeTerminal 
                        nodeName="Node A (Berlin)" 
                        latency="24ms GPU: RTX 4090" 
                        logs={logsA} 
                      />
                      
                      {/* NODE B */}
                      <TwinNodeTerminal 
                        nodeName="Node B (Tokyo)" 
                        latency="180ms GPU: Mac M3 Max" 
                        logs={logsB} 
                      />
                    </div>

                    {/* Arbitration Arbiter Node Pop-in */}
                    {processState === 'ARBITRATION' && (
                       <motion.div 
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         className="border border-[#ff003c] bg-[#ff003c]/10 p-4 flex flex-col space-y-3"
                       >
                         <div className="flex items-center space-x-2 text-[#ff003c] mb-2 font-mono uppercase tracking-widest text-sm">
                           <AlertTriangle className="w-5 h-5" />
                           <span>Consensus Failed ({consensusMatch}%). Requesting Arbiter Node...</span>
                         </div>
                         <TwinNodeTerminal 
                            nodeName="Node C (Arbitrator - Reykjavik)" 
                            latency="54ms GPU: 8x H100" 
                            logs={logsC} 
                            color="[#ff003c]"
                          />
                       </motion.div>
                    )}

                    {/* Consensus Meter */}
                    {(processState === 'CONSENSUS' || processState === 'ARBITRATION') && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black border border-[#00FF41]/50 p-4 flex flex-col space-y-3"
                      >
                        <div className="flex justify-between items-center text-sm font-mono uppercase tracking-widest text-[#00FF41]">
                          <span>Comparing Output Hashes</span>
                          <span className={consensusMatch > 95 ? 'text-[#00FF41]' : (processState === 'ARBITRATION' ? 'text-[#ff003c]' : 'text-yellow-500')}>{consensusMatch}% Match</span>
                        </div>
                        <div className="h-2 w-full bg-[#111] overflow-hidden border border-[#00FF41]/20">
                          <motion.div 
                            className={`h-full ${consensusMatch > 95 ? 'bg-[#00FF41]' : (processState === 'ARBITRATION' ? 'bg-[#ff003c]' : 'bg-yellow-500')}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${consensusMatch}%` }}
                            transition={{ type: 'spring' }}
                          />
                        </div>
                        {consensusMatch > 95 ? (
                          <div className="flex items-center justify-center space-x-2 text-[#00FF41] text-xs font-mono mt-2">
                            <CheckCircle2 className="w-4 h-4" /> <span>Consensus Reached. Cryptographically verified.</span>
                          </div>
                        ) : processState === 'ARBITRATION' ? (
                          <div className="flex items-center justify-center space-x-2 text-[#ff003c] text-xs font-mono mt-2">
                            <Activity className="w-4 h-4" /> <span>Divergence detected. Awaiting strict arbitration...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2 text-yellow-500 text-xs font-mono mt-2">
                            <Activity className="w-4 h-4" /> <span>Calculating divergence probabilities...</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer for input field */}
          <div className="h-24"></div>
        </div>

        {/* BOTTOM INPUT AREA */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-20">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-[#00FF41]/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <form onSubmit={handleSubmit} className="relative flex items-center bg-black border border-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.1)] overflow-hidden focus-within:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all">
               <div className="pl-6 text-[#00FF41]">
                 <Terminal className="w-5 h-5" />
               </div>
               <input 
                 type="text"
                 value={query}
                 onChange={e => setQuery(e.target.value)}
                 disabled={!isConnected || processState !== 'IDLE'}
                 placeholder="[INPUT_QUERY_HERE_]"
                 className="w-full bg-transparent border-none outline-none text-[#00FF41] placeholder-[#00FF41]/40 px-4 py-5 font-mono uppercase"
               />
               <button 
                 type="submit"
                 disabled={!query.trim() || processState !== 'IDLE'}
                 className="mr-3 p-3 bg-[#00FF41] text-black disabled:opacity-30 disabled:hover:scale-100 hover:bg-[#00FF41]/90 transition-colors"
               >
                 <ArrowRight className="w-5 h-5" />
               </button>
            </form>
          </div>
        </div>

      </main>

    </div>
  );
}

function TwinNodeTerminal({ nodeName, latency, logs, color = '[#00FF41]' }: { nodeName: string, latency: string, logs: string[], color?: string }) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={`bg-black border border-${color}/50 flex flex-col h-56 w-full shadow-[0_0_10px_rgba(0,255,65,0.05)]`}>
      <div className={`bg-${color}/10 border-b border-${color}/50 px-3 py-2 flex justify-between items-center`}>
         <div className="flex items-center space-x-2">
           <Server className={`w-3 h-3 text-${color}`} />
           <span className={`text-xs font-mono text-${color}`}>{nodeName}</span>
         </div>
         <span className={`text-[10px] font-mono text-${color}/70`}>{latency}</span>
      </div>
      <div ref={terminalRef} className="flex-1 p-3 overflow-y-auto space-y-1">
        {logs.map((log, i) => (
          <div key={i} className={`text-[10px] font-mono text-${color} opacity-80 break-words flex space-x-2`}>
             <span className={`text-${color}/50 select-none`}>{`>`}</span>
             <span>{log}</span>
          </div>
        ))}
        <div className={`animate-pulse w-2 h-3 bg-${color} mt-1`}></div>
      </div>
    </div>
  );
}
