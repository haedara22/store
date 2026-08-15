export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-orange-50/20 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-zinc-200/40 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="text-center relative z-10">
        {/* Logo with Spinning Border */}
        <div className="relative mb-8">
          {/* Outer Rotating Ring */}
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-orange-500/25 animate-pulse">
              ح
            </div>
            
            {/* Spinning Border */}
            <div className="absolute -inset-2 rounded-3xl border-4 border-transparent border-t-orange-500 border-r-orange-500 animate-spin" />
          </div>
        </div>

        {/* Loading Text with Arabic Animation */}
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight animate-pulse">
            جارٍ التحميل...
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            يرجى الانتظار لحظات قليلة
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
