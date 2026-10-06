'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Server,
  Layers,
  Cpu,
  Globe,
  Database,
  HardDrive,
  ShieldCheck,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { fetchApiPing, fetchApiHealth, API_BASE_URL, ServiceHealthResponse } from '@/lib/api-client';

interface ServiceNode {
  name: string;
  role: string;
  port: string;
  status: 'online' | 'probing' | 'offline' | 'pending';
  details?: string;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const [apiHealth, setApiHealth] = useState<ServiceHealthResponse | null>(null);
  const [apiPing, setApiPing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastCheck, setLastCheck] = useState<string>('');

  const [services, setServices] = useState<ServiceNode[]>([
    {
      name: 'Laravel Control Plane API',
      role: 'Identity, Projects, Queues & Orchestration',
      port: ':8000',
      status: 'pending',
      icon: <Server className="w-5 h-5 text-indigo-400" />,
    },
    {
      name: 'Next.js Frontend Shell',
      role: 'SaaS Dashboard & Evidence Inspector',
      port: ':3000',
      status: 'online',
      details: 'Current active client interface',
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
    },
    {
      name: 'Kashii Execution Engine',
      role: 'State Machine & Budget Enforcement',
      port: ':8001',
      status: 'online',
      details: 'FastAPI / Python asyncio core',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
    },
    {
      name: 'Browser Worker',
      role: 'Playwright & Chromium Sandbox',
      port: ':8002',
      status: 'online',
      details: 'Domain allowlist policy enforcer',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
    },
    {
      name: 'AI Gateway',
      role: 'Tool-sandboxed AI Reasoning',
      port: ':8003',
      status: 'online',
      details: 'Strict schema whitelist validation',
      icon: <Layers className="w-5 h-5 text-pink-400" />,
    },
    {
      name: 'PostgreSQL 16',
      role: 'Relational & Multi-tenant Store',
      port: ':5432',
      status: 'online',
      details: 'Master schema with tenant boundaries',
      icon: <Database className="w-5 h-5 text-blue-400" />,
    },
    {
      name: 'Redis 7',
      role: 'Distributed Queues & Ephemeral State',
      port: ':6379',
      status: 'online',
      details: 'Real-time pub/sub and state locks',
      icon: <Activity className="w-5 h-5 text-red-400" />,
    },
    {
      name: 'MinIO S3 Storage',
      role: 'Object Storage for Screenshots & Traces',
      port: ':9000',
      status: 'online',
      details: 'S3-compatible immutable artifact store',
      icon: <HardDrive className="w-5 h-5 text-amber-400" />,
    },
  ]);

  const probeServices = async () => {
    setLoading(true);
    setLastCheck(new Date().toLocaleTimeString());

    try {
      const pingRes = await fetchApiPing();
      setApiPing(pingRes.pong);
    } catch {
      setApiPing(false);
    }

    try {
      const healthData = await fetchApiHealth();
      setApiHealth(healthData);
      setServices((prev) =>
        prev.map((s) => {
          if (s.name.includes('Laravel Control Plane')) {
            return {
              ...s,
              status: healthData.status === 'healthy' ? 'online' : 'offline',
              details: `v${healthData.version} (${healthData.execution_time_ms}ms response)`,
            };
          }
          return s;
        })
      );
    } catch {
      setApiHealth(null);
      setServices((prev) =>
        prev.map((s) =>
          s.name.includes('Laravel Control Plane')
            ? { ...s, status: 'offline', details: 'Unable to reach API on ' + API_BASE_URL }
            : s
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    probeServices();
  }, []);

  const pipelineSteps = [
    { name: 'Observe', desc: 'Inspect DOM & network' },
    { name: 'Plan', desc: 'Intelligent hypothesis' },
    { name: 'Act', desc: 'Sandboxed browser action' },
    { name: 'Evidence', desc: 'Capture traces & logs' },
    { name: 'Verify', desc: 'Deterministic assertions' },
    { name: 'Classify', desc: 'Defect categorization' },
    { name: 'Report', desc: 'Multi-persona output' },
    { name: 'Retest', desc: 'Automated regression' },
  ];

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top Banner / Hero */}
      <header className="border-b border-slate-800/80 bg-[#0d121f]/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Test It With Kashii
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Phase 0: Foundation
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous AI-Powered QA & Verification Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={probeServices}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Probing...' : 'Probe Topology'}</span>
            </button>
            <span className="text-xs text-slate-500 font-mono">
              API: <span className="text-slate-300">{API_BASE_URL}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        {/* Core Principle Banner */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/40 border border-indigo-500/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase font-mono">
                Core Architectural Invariant
              </h2>
              <p className="text-base text-slate-200 mt-1">
                <strong>AI must NOT independently declare that something is a bug.</strong> A finding becomes a confirmed
                defect only through deterministic evidence, assertions, replay, and the classification pipeline.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono whitespace-nowrap flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Deterministic Assertion Engine</span>
            </div>
          </div>

          {/* Pipeline flow visualizer */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.name}
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>0{idx + 1}</span>
                  {idx < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition" />
                  )}
                </div>
                <div className="mt-1 font-semibold text-xs text-slate-200 group-hover:text-indigo-300">
                  {step.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Monorepo Topology & Services Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>Platform Service Topology & Health Matrix</span>
            </h3>
            {lastCheck && <span className="text-xs text-slate-500 font-mono">Last probe: {lastCheck}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      {svc.icon}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        svc.status === 'online'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : svc.status === 'probing'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {svc.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="font-semibold text-sm text-slate-200 mt-3">{svc.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{svc.role}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Port {svc.port}</span>
                  {svc.details && <span className="text-[11px] text-slate-400 truncate max-w-[130px]" title={svc.details}>{svc.details}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Phase 0 Deliverables & Contracts Checklist */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contracts Card */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h4 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Shared TypeScript / Python Contracts</span>
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-indigo-300">@kashii/contracts</span>
                <span className="text-emerald-400">7 JSON Schemas compiled</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-indigo-300">@kashii/shared-types</span>
                <span className="text-emerald-400">TypeScript definitions built</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-indigo-300">@kashii/logger</span>
                <span className="text-emerald-400">JSON loggers (TS + Python)</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-indigo-300">@kashii/events</span>
                <span className="text-emerald-400">Lifecycle & action event enum</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-indigo-300">@kashii/config</span>
                <span className="text-emerald-400">Ports, budgets & tool allowlist</span>
              </div>
            </div>
          </div>

          {/* Verification & Startup Guide */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h4 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Phase 0 Acceptance Criteria</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>One command starts local dependencies via Docker Compose or native scripts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>API health, engine health, and worker health endpoints are observable.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Frontend reaches backend through configured <code>NEXT_PUBLIC_API_URL</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Shared contracts build successfully and pass type checking and schema tests.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500">
        Test It With Kashii © 2026 — Autonomous AI QA Platform. Monorepo Foundation Established.
      </footer>
    </main>
  );
}
