"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ArrowLeft, Edit3, Video, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
  </svg>
);

export default function CareerPage() {
  const roles = [
    {
      title: "Social Media Manager",
      icon: <MessageSquare className="w-8 h-8 text-valo-cyan" />,
      desc: "Drive engagement and manage our community across X, Instagram, and Discord."
    },
    {
      title: "Video Editor",
      icon: <Video className="w-8 h-8 text-valo-red" />,
      desc: "Create high-quality VOD highlights, short-form content, and promotional videos."
    },
    {
      title: "Esports Journalist",
      icon: <Edit3 className="w-8 h-8 text-valo-purple" />,
      desc: "Cover live events, write breaking news, and provide deep analytical pieces on matches."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans selection:bg-valo-red/30 selection:text-white pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-valo-purple/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-24">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-widest uppercase text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Crosshair className="w-6 h-6 text-valo-red" />
            <span className="text-xl font-black tracking-tighter text-white">
              VALO<span className="text-valo-red">INFO</span>
            </span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-valo-purple/10 border border-valo-purple/20 mb-6"
          >
            <span className="w-2 h-2 bg-valo-purple rounded-full animate-pulse" />
            <span className="text-valo-purple font-mono text-sm font-bold tracking-widest uppercase">We Are Hiring</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6"
          >
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-valo-red to-valo-purple">Squad</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Help us build the ultimate hub for the Valorant esports community. We're looking for passionate creators and experts.
          </motion.p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="group relative p-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-valo-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-[#0d121f] transition-colors p-8 rounded-[15px] flex flex-col items-center text-center gap-6 z-10">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {role.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{role.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{role.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA / Contact */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-px bg-gradient-to-r from-valo-red via-valo-purple to-valo-cyan max-w-3xl mx-auto"
        >
          <div className="relative bg-background p-10 md:p-16 rounded-[23px] text-center z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Apply?</h2>
            <p className="text-zinc-400 mb-8">
              We aren't looking for traditional resumes. Send us a DM with your portfolio and tell us why you belong at ValoInfo!
            </p>
            <a 
              href="https://www.instagram.com/thevaloinfo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            >
              <InstagramIcon />
              DM us on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
