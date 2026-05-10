"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ArrowLeft, Copy, Shuffle, ClipboardPaste, Check, Settings2, Link as LinkIcon, Unlink, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock backgrounds for crosshair preview
const PREVIEW_BGS = [
  "bg-zinc-500", // Neutral Gray
  "bg-emerald-800", // Viper / Grass
  "bg-amber-700", // Bind Walls
  "bg-sky-700", // Sky / Icebox
  "bg-stone-900", // Dark
  "bg-zinc-200" // Light
];

const COLOR_PRESETS = [
  { name: "White", value: 0, hex: "#FFFFFF" },
  { name: "Green", value: 1, hex: "#00FF00" },
  { name: "Yellow Green", value: 2, hex: "#7FFF00" },
  { name: "Green Yellow", value: 3, hex: "#DFFF00" },
  { name: "Yellow", value: 4, hex: "#FFFF00" },
  { name: "Cyan", value: 5, hex: "#00FFFF" },
  { name: "Pink", value: 6, hex: "#FF00FF" },
  { name: "Red", value: 7, hex: "#FF0000" },
  { name: "Custom", value: 8, hex: "" }
];

function CrosshairBuilderContent() {
  const [activeTab, setActiveTab] = useState('PRIMARY');
  const [activeBg, setActiveBg] = useState(PREVIEW_BGS[0]);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [showImport, setShowImport] = useState(false);
  
  const searchParams = useSearchParams();

  // Global settings
  const [advancedOptions, setAdvancedOptions] = useState(false);

  const defaultProfile = {
    colorPreset: 1, // Green
    customColor: "#00FF00",
    outlines: true,
    outlineOpacity: 0.5,
    outlineThickness: 1,
    centerDot: false,
    centerDotOpacity: 1,
    centerDotThickness: 2,
    
    showInner: true,
    innerOpacity: 0.8,
    innerLength: 6,
    innerThickness: 2,
    innerOffset: 3,
    innerMovement: false,
    innerMovementMult: 1,
    innerFiring: false,
    innerFiringMult: 1,
    
    showOuter: true,
    outerOpacity: 0.35,
    outerLength: 2,
    outerThickness: 2,
    outerOffset: 10,
    outerMovement: true,
    outerMovementMult: 1,
    outerFiring: true,
    outerFiringMult: 1,
  };

  const [primary, setPrimary] = useState(defaultProfile);
  const [ads, setAds] = useState(defaultProfile);
  const [copyPrimaryToAds, setCopyPrimaryToAds] = useState(true);

  // Helper to generate specific string chunks
  const generateProfileString = (prefix: string, profile: typeof primary, skipColor: boolean = false) => {
    let s = `${prefix};`;
    if (!skipColor) {
      s += `c;${profile.colorPreset};`;
      if (profile.colorPreset === 8) s += `u;${profile.customColor.replace('#', '')}FF;`;
    }
    
    s += `h;${profile.outlines ? 1 : 0};`;
    if (profile.outlines) {
      s += `t;${profile.outlineThickness};o;${profile.outlineOpacity.toFixed(3)};`;
    }

    if (profile.centerDot) {
      s += `d;1;z;${profile.centerDotThickness};a;${profile.centerDotOpacity.toFixed(3)};`;
    } else {
      s += `d;0;`;
    }

    if (profile.showInner) {
      s += `0t;${profile.innerThickness};0l;${profile.innerLength};0o;${profile.innerOffset};0a;${profile.innerOpacity.toFixed(3)};`;
      s += `0m;${profile.innerMovement ? 1 : 0};0f;${profile.innerFiring ? 1 : 0};`;
      if (profile.innerMovement) s += `0s;${profile.innerMovementMult.toFixed(3)};`;
      if (profile.innerFiring) s += `0e;${profile.innerFiringMult.toFixed(3)};`;
    } else {
      s += `0b;0;`;
    }

    if (profile.showOuter) {
      s += `1t;${profile.outerThickness};1l;${profile.outerLength};1o;${profile.outerOffset};1a;${profile.outerOpacity.toFixed(3)};`;
      s += `1m;${profile.outerMovement ? 1 : 0};1f;${profile.outerFiring ? 1 : 0};`;
      if (profile.outerMovement) s += `1s;${profile.outerMovementMult.toFixed(3)};`;
      if (profile.outerFiring) s += `1e;${profile.outerFiringMult.toFixed(3)};`;
    } else {
      s += `1b;0;`;
    }
    
    // Clean up trailing semicolon if exists
    return s.replace(/;$/, '');
  };

  const generateCode = () => {
    let code = `0;P;`;
    // Primary Profile (P is already added by default structure parsing)
    let pString = generateProfileString('P', primary);
    code = `0;${pString.replace('P;', '')}`; // We injected P; above but standard string is 0;P;...

    if (advancedOptions && !copyPrimaryToAds) {
      code += `;${generateProfileString('A', ads)}`;
    }

    return code;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const code = generateCode();
    const url = `${window.location.origin}/crosshair?c=${encodeURIComponent(code)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const parseCode = (code: string) => {
    try {
      const parts = code.split(';');
      if (parts[0] !== '0') throw new Error("Invalid prefix");
      
      let currentProfile = 'P';
      let hasAds = false;
      
      // We start with defaults, so any unmentioned value returns to default
      let newPrimary = { ...defaultProfile };
      let newAds = { ...defaultProfile };

      for (let i = 1; i < parts.length; i++) {
        const p = parts[i];
        if (p === 'P') { currentProfile = 'P'; continue; }
        if (p === 'A') { currentProfile = 'A'; hasAds = true; continue; }
        if (p === 'S') { currentProfile = 'S'; continue; }
        
        // Settings parsing
        if (i + 1 < parts.length && isNaN(Number(p)) && p.length <= 2) {
          const key = p;
          const valStr = parts[i+1];
          const valNum = parseFloat(valStr);
          
          const profile = currentProfile === 'P' ? newPrimary : newAds;
          
          switch(key) {
            case 'c': profile.colorPreset = parseInt(valStr); break;
            case 'u': profile.customColor = '#' + valStr.substring(0, 6); profile.colorPreset = 8; break;
            case 'h': profile.outlines = valStr === '1'; break;
            case 't': profile.outlineThickness = parseInt(valStr); break;
            case 'o': profile.outlineOpacity = valNum; break;
            case 'd': profile.centerDot = valStr === '1'; break;
            case 'z': profile.centerDotThickness = parseInt(valStr); break;
            case 'a': profile.centerDotOpacity = valNum; break;
            case '0b': profile.showInner = valStr !== '0'; break;
            case '0t': profile.innerThickness = parseInt(valStr); break;
            case '0l': profile.innerLength = parseInt(valStr); break;
            case '0o': profile.innerOffset = parseInt(valStr); break;
            case '0a': profile.innerOpacity = valNum; break;
            case '0m': profile.innerMovement = valStr === '1'; break;
            case '0f': profile.innerFiring = valStr === '1'; break;
            case '0s': profile.innerMovementMult = valNum; break;
            case '0e': profile.innerFiringMult = valNum; break;
            case '1b': profile.showOuter = valStr !== '0'; break;
            case '1t': profile.outerThickness = parseInt(valStr); break;
            case '1l': profile.outerLength = parseInt(valStr); break;
            case '1o': profile.outerOffset = parseInt(valStr); break;
            case '1a': profile.outerOpacity = valNum; break;
            case '1m': profile.outerMovement = valStr === '1'; break;
            case '1f': profile.outerFiring = valStr === '1'; break;
            case '1s': profile.outerMovementMult = valNum; break;
            case '1e': profile.outerFiringMult = valNum; break;
          }
          i++; // skip the value
        }
      }

      setPrimary(newPrimary);
      setAds(newAds);
      if (hasAds) setAdvancedOptions(true);
      setCopyPrimaryToAds(!hasAds);
      setShowImport(false); // close modal on success
      return true;
      
    } catch(e) {
      alert("Invalid code format! Please make sure it's a valid Valorant export code.");
      return false;
    }
  };

  // Initial load from URL params
  useEffect(() => {
    const codeParam = searchParams.get('c');
    if (codeParam) {
      parseCode(codeParam);
    }
  }, [searchParams]);

  const renderEditor = (profile: typeof primary, setProfile: React.Dispatch<React.SetStateAction<typeof primary>>) => {
    const update = (key: keyof typeof primary, val: any) => setProfile(p => ({ ...p, [key]: val }));

    return (
      <div className="space-y-8 pb-10">
        {/* CROSSHAIR SECTION */}
        <div className="space-y-6">
          <h3 className="text-valo-red font-black uppercase tracking-widest text-lg border-b border-white/10 pb-2">Crosshair</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
              <label className="text-sm font-bold text-white">Crosshair Color</label>
              <select 
                value={profile.colorPreset} 
                onChange={e => update('colorPreset', parseInt(e.target.value))}
                className="bg-black/50 border border-white/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-valo-cyan text-white"
              >
                {COLOR_PRESETS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
              </select>
            </div>

            {profile.colorPreset === 8 && (
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                <label className="text-sm font-bold text-white">Crosshair Color Code</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={profile.customColor} onChange={e => update('customColor', e.target.value)} className="w-8 h-8 rounded-full border-none bg-transparent cursor-pointer" />
                  <input type="text" value={profile.customColor} onChange={e => update('customColor', e.target.value)} className="w-24 bg-black/50 border border-white/20 rounded-md px-2 py-1 text-sm uppercase text-center" />
                </div>
              </div>
            )}

            <div className="bg-white/5 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white">Outlines</label>
                <div className="flex bg-black/40 rounded-lg p-1">
                  <button onClick={() => update('outlines', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.outlines ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>On</button>
                  <button onClick={() => update('outlines', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.outlines ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                </div>
              </div>
              {profile.outlines && (
                <div className="pl-4 space-y-4 border-l-2 border-white/10">
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Outline Opacity</span><span className="text-xs font-mono">{profile.outlineOpacity.toFixed(2)}</span></div>
                    <input type="range" min="0" max="1" step="0.01" value={profile.outlineOpacity} onChange={e => update('outlineOpacity', parseFloat(e.target.value))} className="w-full accent-valo-cyan" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Outline Thickness</span><span className="text-xs font-mono">{profile.outlineThickness}</span></div>
                    <input type="range" min="1" max="6" step="1" value={profile.outlineThickness} onChange={e => update('outlineThickness', parseInt(e.target.value))} className="w-full accent-valo-cyan" />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white">Center Dot</label>
                <div className="flex bg-black/40 rounded-lg p-1">
                  <button onClick={() => update('centerDot', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.centerDot ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>On</button>
                  <button onClick={() => update('centerDot', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.centerDot ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                </div>
              </div>
              {profile.centerDot && (
                <div className="pl-4 space-y-4 border-l-2 border-white/10">
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Center Dot Opacity</span><span className="text-xs font-mono">{profile.centerDotOpacity.toFixed(2)}</span></div>
                    <input type="range" min="0" max="1" step="0.01" value={profile.centerDotOpacity} onChange={e => update('centerDotOpacity', parseFloat(e.target.value))} className="w-full accent-valo-cyan" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Center Dot Thickness</span><span className="text-xs font-mono">{profile.centerDotThickness}</span></div>
                    <input type="range" min="1" max="6" step="1" value={profile.centerDotThickness} onChange={e => update('centerDotThickness', parseInt(e.target.value))} className="w-full accent-valo-cyan" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* INNER LINES SECTION */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/10 pb-2">
            <h3 className="text-valo-cyan font-black uppercase tracking-widest text-lg">Inner Lines</h3>
            <div className="flex bg-black/40 rounded-lg p-1">
              <button onClick={() => update('showInner', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.showInner ? 'bg-valo-cyan text-black' : 'text-zinc-500 hover:text-white'}`}>Show</button>
              <button onClick={() => update('showInner', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.showInner ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}>Hide</button>
            </div>
          </div>
          
          {profile.showInner && (
            <div className="grid grid-cols-1 gap-4 bg-white/5 p-4 rounded-xl">
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Inner Line Opacity</span><span className="text-xs font-mono">{profile.innerOpacity.toFixed(2)}</span></div>
                <input type="range" min="0" max="1" step="0.01" value={profile.innerOpacity} onChange={e => update('innerOpacity', parseFloat(e.target.value))} className="w-full accent-valo-cyan" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Inner Line Length</span><span className="text-xs font-mono">{profile.innerLength}</span></div>
                <input type="range" min="0" max="20" step="1" value={profile.innerLength} onChange={e => update('innerLength', parseInt(e.target.value))} className="w-full accent-valo-cyan" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Inner Line Thickness</span><span className="text-xs font-mono">{profile.innerThickness}</span></div>
                <input type="range" min="0" max="10" step="1" value={profile.innerThickness} onChange={e => update('innerThickness', parseInt(e.target.value))} className="w-full accent-valo-cyan" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Inner Line Offset</span><span className="text-xs font-mono">{profile.innerOffset}</span></div>
                <input type="range" min="0" max="20" step="1" value={profile.innerOffset} onChange={e => update('innerOffset', parseInt(e.target.value))} className="w-full accent-valo-cyan" />
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <label className="text-xs font-bold text-white">Movement Error</label>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    <button onClick={() => update('innerMovement', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.innerMovement ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>On</button>
                    <button onClick={() => update('innerMovement', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.innerMovement ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                  </div>
                </div>
                {profile.innerMovement && (
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Movement Error Multiplier</span><span className="text-xs font-mono">{profile.innerMovementMult.toFixed(2)}</span></div>
                    <input type="range" min="0" max="3" step="0.01" value={profile.innerMovementMult} onChange={e => update('innerMovementMult', parseFloat(e.target.value))} className="w-full accent-valo-cyan" />
                  </div>
                )}
              </div>

              <div className="mt-2 space-y-4">
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <label className="text-xs font-bold text-white">Firing Error</label>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    <button onClick={() => update('innerFiring', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.innerFiring ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>On</button>
                    <button onClick={() => update('innerFiring', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.innerFiring ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                  </div>
                </div>
                {profile.innerFiring && (
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Firing Error Multiplier</span><span className="text-xs font-mono">{profile.innerFiringMult.toFixed(2)}</span></div>
                    <input type="range" min="0" max="3" step="0.01" value={profile.innerFiringMult} onChange={e => update('innerFiringMult', parseFloat(e.target.value))} className="w-full accent-valo-cyan" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* OUTER LINES SECTION */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/10 pb-2">
            <h3 className="text-valo-purple font-black uppercase tracking-widest text-lg">Outer Lines</h3>
            <div className="flex bg-black/40 rounded-lg p-1">
              <button onClick={() => update('showOuter', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.showOuter ? 'bg-valo-purple text-white' : 'text-zinc-500 hover:text-white'}`}>Show</button>
              <button onClick={() => update('showOuter', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.showOuter ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}>Hide</button>
            </div>
          </div>
          
          {profile.showOuter && (
            <div className="grid grid-cols-1 gap-4 bg-white/5 p-4 rounded-xl">
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Outer Line Opacity</span><span className="text-xs font-mono">{profile.outerOpacity.toFixed(2)}</span></div>
                <input type="range" min="0" max="1" step="0.01" value={profile.outerOpacity} onChange={e => update('outerOpacity', parseFloat(e.target.value))} className="w-full accent-valo-purple" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Outer Line Length</span><span className="text-xs font-mono">{profile.outerLength}</span></div>
                <input type="range" min="0" max="20" step="1" value={profile.outerLength} onChange={e => update('outerLength', parseInt(e.target.value))} className="w-full accent-valo-purple" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Outer Line Thickness</span><span className="text-xs font-mono">{profile.outerThickness}</span></div>
                <input type="range" min="0" max="10" step="1" value={profile.outerThickness} onChange={e => update('outerThickness', parseInt(e.target.value))} className="w-full accent-valo-purple" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Outer Line Offset</span><span className="text-xs font-mono">{profile.outerOffset}</span></div>
                <input type="range" min="0" max="40" step="1" value={profile.outerOffset} onChange={e => update('outerOffset', parseInt(e.target.value))} className="w-full accent-valo-purple" />
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <label className="text-xs font-bold text-white">Movement Error</label>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    <button onClick={() => update('outerMovement', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.outerMovement ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>On</button>
                    <button onClick={() => update('outerMovement', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.outerMovement ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                  </div>
                </div>
                {profile.outerMovement && (
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Movement Error Multiplier</span><span className="text-xs font-mono">{profile.outerMovementMult.toFixed(2)}</span></div>
                    <input type="range" min="0" max="3" step="0.01" value={profile.outerMovementMult} onChange={e => update('outerMovementMult', parseFloat(e.target.value))} className="w-full accent-valo-purple" />
                  </div>
                )}
              </div>

              <div className="mt-2 space-y-4">
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <label className="text-xs font-bold text-white">Firing Error</label>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    <button onClick={() => update('outerFiring', true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${profile.outerFiring ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>On</button>
                    <button onClick={() => update('outerFiring', false)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!profile.outerFiring ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                  </div>
                </div>
                {profile.outerFiring && (
                  <div>
                    <div className="flex justify-between mb-2"><span className="text-xs text-zinc-400">Firing Error Multiplier</span><span className="text-xs font-mono">{profile.outerFiringMult.toFixed(2)}</span></div>
                    <input type="range" min="0" max="3" step="0.01" value={profile.outerFiringMult} onChange={e => update('outerFiringMult', parseFloat(e.target.value))} className="w-full accent-valo-purple" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Crosshair Renderer
  const renderCrosshair = () => {
    const activeProfile = activeTab === 'ADS' ? ads : primary;
    const { colorPreset, customColor, outlines, outlineOpacity, outlineThickness, centerDot, centerDotOpacity, centerDotThickness, showInner, innerOpacity, innerLength, innerThickness, innerOffset, showOuter, outerOpacity, outerLength, outerThickness, outerOffset } = activeProfile;

    const actualColor = colorPreset === 8 ? customColor : COLOR_PRESETS.find(c => c.value === colorPreset)?.hex || '#00FF00';
    const outlineStyle = outlines ? `${outlineThickness}px solid rgba(0,0,0,${outlineOpacity})` : 'none';

    return (
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none z-10 scale-150">
        {/* Center Dot */}
        {centerDot && (
          <div 
            className="absolute z-20" 
            style={{ 
              width: centerDotThickness, 
              height: centerDotThickness, 
              backgroundColor: actualColor, 
              opacity: centerDotOpacity,
              border: outlineStyle
            }} 
          />
        )}

        {/* Inner Lines */}
        {showInner && (
          <>
            <div className="absolute" style={{ top: `calc(50% - ${innerLength + innerOffset}px)`, width: innerThickness, height: innerLength, backgroundColor: actualColor, opacity: innerOpacity, border: outlineStyle, transform: 'translateY(-50%)' }} />
            <div className="absolute" style={{ bottom: `calc(50% - ${innerLength + innerOffset}px)`, width: innerThickness, height: innerLength, backgroundColor: actualColor, opacity: innerOpacity, border: outlineStyle, transform: 'translateY(50%)' }} />
            <div className="absolute" style={{ left: `calc(50% - ${innerLength + innerOffset}px)`, height: innerThickness, width: innerLength, backgroundColor: actualColor, opacity: innerOpacity, border: outlineStyle, transform: 'translateX(-50%)' }} />
            <div className="absolute" style={{ right: `calc(50% - ${innerLength + innerOffset}px)`, height: innerThickness, width: innerLength, backgroundColor: actualColor, opacity: innerOpacity, border: outlineStyle, transform: 'translateX(50%)' }} />
          </>
        )}

        {/* Outer Lines */}
        {showOuter && (
          <>
            <div className="absolute" style={{ top: `calc(50% - ${outerLength + outerOffset}px)`, width: outerThickness, height: outerLength, backgroundColor: actualColor, opacity: outerOpacity, border: outlineStyle, transform: 'translateY(-50%)' }} />
            <div className="absolute" style={{ bottom: `calc(50% - ${outerLength + outerOffset}px)`, width: outerThickness, height: outerLength, backgroundColor: actualColor, opacity: outerOpacity, border: outlineStyle, transform: 'translateY(50%)' }} />
            <div className="absolute" style={{ left: `calc(50% - ${outerLength + outerOffset}px)`, height: outerThickness, width: outerLength, backgroundColor: actualColor, opacity: outerOpacity, border: outlineStyle, transform: 'translateX(-50%)' }} />
            <div className="absolute" style={{ right: `calc(50% - ${outerLength + outerOffset}px)`, height: outerThickness, width: outerLength, backgroundColor: actualColor, opacity: outerOpacity, border: outlineStyle, transform: 'translateX(50%)' }} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 border-l border-white/10 pl-6">
            <Crosshair className="w-6 h-6 text-valo-red" />
            <span className="text-xl font-black tracking-tighter text-white">
              VALO<span className="text-valo-red">INFO</span>
            </span>
          </div>
        </div>
        <div className="font-mono text-xs text-zinc-500 hidden md:block">CROSSHAIR_BUILDER_ADVANCED_V2</div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-80px)]">
        
        {/* Left Panel: Preview */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-full">
          <div className={`relative flex-1 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500 ${activeBg}`}>
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-0" />
            
            {/* Center Guidelines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 pointer-events-none z-0" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5 pointer-events-none z-0" />

            {renderCrosshair()}
          </div>

          {/* Background Selectors & Generate Container */}
          <div className="flex flex-col md:flex-row gap-4 bg-[#0d121f] border border-white/10 p-4 rounded-2xl items-center justify-between">
            <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
              {PREVIEW_BGS.map((bg, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveBg(bg)}
                  className={`w-12 h-12 shrink-0 rounded-xl transition-all ${bg} ${activeBg === bg ? 'ring-2 ring-valo-cyan scale-105' : 'opacity-50 hover:opacity-100'}`}
                />
              ))}
            </div>
            
            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
              <button 
                onClick={() => {
                  setPrimary({ ...primary, colorPreset: Math.floor(Math.random() * 8), outlines: Math.random()>0.5, centerDot: Math.random()>0.7, showInner: true, showOuter: Math.random()>0.5, innerLength: Math.floor(Math.random()*15)+2, innerThickness: Math.floor(Math.random()*5)+1, innerOffset: Math.floor(Math.random()*15) });
                }}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <Shuffle className="w-4 h-4" /> Random
              </button>
              <button 
                onClick={() => setShowImport(!showImport)}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <ClipboardPaste className="w-4 h-4" /> Import
              </button>
            </div>
          </div>
          
          {showImport && (
            <div className="bg-[#0d121f] p-4 border border-white/10 rounded-xl flex gap-2 animate-in slide-in-from-top-2">
              <input 
                type="text" 
                value={importCode}
                onChange={e => setImportCode(e.target.value)}
                placeholder="Paste Valorant Code (0;P;c;...)" 
                className="flex-1 bg-black/50 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-valo-cyan"
              />
              <button onClick={() => parseCode(importCode)} className="px-4 py-2 bg-valo-cyan text-black font-bold uppercase text-xs rounded-md">Load</button>
            </div>
          )}
        </div>

        {/* Right Panel: Settings */}
        <div className="lg:col-span-5 flex flex-col bg-[#0d121f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full">
          {/* Tabs */}
          <div className="flex bg-black/40 border-b border-white/10 overflow-x-auto">
            {['GENERAL', 'PRIMARY', 'ADS', 'SNIPER'].map(tab => (
              <button 
                key={tab}
                onClick={() => {
                  if ((tab === 'ADS' || tab === 'SNIPER') && !advancedOptions) return;
                  setActiveTab(tab);
                }}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors min-w-[80px] ${activeTab === tab ? 'text-valo-cyan border-b-2 border-valo-cyan bg-white/5' : ((tab === 'ADS' || tab === 'SNIPER') && !advancedOptions) ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Settings Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            
            {activeTab === 'GENERAL' && (
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <label className="text-sm font-bold text-white block">Advanced Options</label>
                    <span className="text-xs text-zinc-500">Enables ADS & Sniper settings</span>
                  </div>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    <button onClick={() => setAdvancedOptions(true)} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${advancedOptions ? 'bg-valo-cyan text-black' : 'text-zinc-500'}`}>On</button>
                    <button onClick={() => { setAdvancedOptions(false); setActiveTab('PRIMARY'); }} className={`px-4 py-2.5 text-xs rounded-md font-bold transition-colors ${!advancedOptions ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'PRIMARY' && renderEditor(primary, setPrimary)}
            
            {activeTab === 'ADS' && advancedOptions && (
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center mb-6">
                  <div>
                    <label className="text-sm font-bold text-white block">Copy Primary Crosshair</label>
                  </div>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    <button onClick={() => setCopyPrimaryToAds(true)} className={`px-4 py-1 text-xs rounded-md font-bold transition-colors ${copyPrimaryToAds ? 'bg-valo-cyan text-black' : 'text-zinc-500'}`}>On</button>
                    <button onClick={() => setCopyPrimaryToAds(false)} className={`px-4 py-1 text-xs rounded-md font-bold transition-colors ${!copyPrimaryToAds ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>Off</button>
                  </div>
                </div>

                {!copyPrimaryToAds ? renderEditor(ads, setAds) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                    <LinkIcon className="w-12 h-12 text-zinc-500 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Linked to Primary</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'SNIPER' && advancedOptions && (
              <div className="space-y-6">
                 <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                    <Settings2 className="w-12 h-12 text-zinc-500 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Sniper custom logic coming soon</p>
                  </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-black/40 border-t border-white/10 space-y-4">
            <button 
              onClick={handleCopyCode}
              className={`w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-wider rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-valo-red hover:bg-red-500 text-white shadow-[0_0_20px_rgba(255,70,85,0.3)] hover:shadow-[0_0_30px_rgba(255,70,85,0.5)]'}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Code Copied to Clipboard!' : 'Copy Profile Code'}
            </button>
            <button 
              onClick={handleShareLink}
              className={`w-full py-3 flex items-center justify-center gap-2 font-bold uppercase tracking-wider rounded-xl transition-all ${copiedLink ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'}`}
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Link Copied!' : 'Share Crosshair Link'}
            </button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}

export default function CrosshairBuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-valo-red font-mono animate-pulse">LOADING_BUILDER...</div>}>
      <CrosshairBuilderContent />
    </Suspense>
  );
}
