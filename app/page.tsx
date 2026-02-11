"use client";

import { useState } from "react";

interface SpotifyHistory {
  endTime: string;
  artistName: string;
  trackName: string;
  msPlayed: number;
}

export default function Home() {
  const [history, setHistory] = useState<SpotifyHistory[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const json = JSON.parse(text);
        setHistory(json);
      } catch (err) {
        alert("Error parsing JSON. Make sure it's a valid Spotify file!");
      }
    };
    reader.readAsText(file);
  };

  const totalMinutes = history.reduce((acc, song) => acc + (song.msPlayed / 60000), 0);

  // --- TOP SONGS LOGIC ---
  const topSongs = Object.values(
    history.reduce((acc, song) => {
      const id = `${song.trackName}-${song.artistName}`;
      if (!acc[id]) {
        acc[id] = { ...song, count: 0, totalMs: 0 };
      }
      acc[id].count += 1;
      acc[id].totalMs += song.msPlayed;
      return acc;
    }, {} as Record<string, SpotifyHistory & { count: number; totalMs: number }>)
  )
    .sort((a, b) => b.totalMs - a.totalMs) // Sorting by most time played
    .slice(0, 5);

  if (history.length > 0) {
    return (
      <div className="min-h-screen bg-black p-8 text-white font-sans animate-in fade-in duration-700">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setHistory([])} 
            className="text-xs text-zinc-500 hover:text-green-500 transition-colors mb-12 uppercase tracking-widest"
          >
            ← Upload different file
          </button>

          <header className="mb-16 text-center">
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs mb-2">Total Listening Time</p>
            <h1 className="text-7xl font-black text-green-500 tabular-nums">
              {Math.floor(totalMinutes).toLocaleString()} <span className="text-2xl font-light text-zinc-400">min</span>
            </h1>
          </header>

          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Your Top 5 Tracks</h2>
              <p className="text-zinc-500 text-sm">Based on time played</p>
            </div>
            
            <div className="space-y-3">
              {topSongs.map((song, index) => (
                <div key={index} className="flex justify-between items-center rounded-xl bg-zinc-900/50 p-5 border border-zinc-800 hover:border-green-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-700 font-black text-2xl group-hover:text-green-500/50 transition-colors w-6">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white text-lg leading-tight">{song.trackName}</p>
                      <p className="text-zinc-400 group-hover:text-green-500 transition-colors">{song.artistName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-mono text-sm">{Math.floor(song.totalMs / 60000)}m</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{song.count} plays</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 text-white font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-green-500 mb-2 tracking-tighter">EchoStats</h1>
        <p className="text-zinc-400">Unlock your Spotify listening data.</p>
      </header>

      <main className="w-full max-w-md">
        <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-800 p-12 transition-all hover:border-green-500/50 hover:bg-zinc-900/30">
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p className="text-lg font-semibold">Drop your JSON here</p>
            <p className="text-sm text-zinc-500">StreamingHistory.json</p>
          </div>
        </div>
      </main>
    </div>
  );
}