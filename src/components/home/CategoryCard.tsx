import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  icon: string;
  href: string;
  description?: string;
}

export function CategoryCard({ title, icon, href, description }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative glass-panel rounded-3xl 
               p-6 sm:p-8 
               shadow-md hover:shadow-2xl 
               transition-all duration-300 
               hover:-translate-y-2 
               flex flex-col justify-between 
               overflow-hidden
               min-h-[240px] sm:min-h-[260px]
               border-2 border-transparent hover:border-orange-200/40"
    >
      {/* Ambient Glow on Hover - Enhanced with Double Layer */}
      <div className="absolute top-0 right-0 w-40 h-40 
                    bg-gradient-to-br from-orange-400/10 to-orange-300/5 
                    rounded-full blur-3xl 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 
                    pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 w-32 h-32 
                    bg-gradient-to-tr from-orange-300/8 to-transparent 
                    rounded-full blur-2xl 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-700 
                    pointer-events-none" />

      <div className="relative z-10">
        {/* Icon & Arrow Section - Professional Spacing (8px grid: 24px/28px) */}
        <div className="flex items-center justify-between mb-6 sm:mb-7">
          
          {/* Icon Container - Enhanced Size & Effects */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 
                        rounded-2xl 
                        bg-gradient-to-br from-white/90 to-white/70 
                        border-2 border-orange-200/50 
                        flex items-center justify-center 
                        text-4xl sm:text-5xl 
                        shadow-lg shadow-orange-100/50
                        group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-orange-100/80
                        group-hover:border-orange-300/80 
                        group-hover:scale-110 
                        group-hover:shadow-xl group-hover:shadow-orange-200/60
                        transition-all duration-300">
            <span className="transform 
                         group-hover:rotate-12 
                         group-hover:scale-105 
                         transition-transform duration-300">
              {icon}
            </span>
          </div>

          {/* Arrow Button - Enhanced with Rotation Effect */}
          <div className="w-11 h-11 sm:w-12 sm:h-12
                        rounded-full 
                        bg-gradient-to-br from-white/90 to-white/70
                        border-2 border-orange-200/50 
                        flex items-center justify-center 
                        text-neutral-600 
                        group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600
                        group-hover:text-white 
                        group-hover:border-orange-500 
                        group-hover:scale-110
                        group-hover:rotate-[-8deg]
                        transition-all duration-300 
                        shadow-md shadow-orange-100/30
                        group-hover:shadow-lg group-hover:shadow-orange-500/40">
            <svg 
              className="w-5 h-5 transform rotate-180 
                       group-hover:-translate-x-0.5 
                       transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Title & Description - Improved Typography & Spacing (24px) */}
        <div className="space-y-3 mb-6">
          <h3 className="font-black text-neutral-900 
                       text-xl sm:text-2xl 
                       group-hover:text-orange-600 
                       transition-colors duration-300 
                       tracking-tight leading-tight
                       line-clamp-2">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm sm:text-base text-neutral-600 
                        leading-relaxed line-clamp-2 
                        font-medium
                        group-hover:text-neutral-700
                        transition-colors duration-200
                        min-h-[2.5rem]">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom CTA - Enhanced with Progress Bar (20px padding top) */}
      <div className="relative z-10 mt-auto pt-5 
                    border-t-2 border-neutral-200/50 
                    group-hover:border-orange-200/60
                    transition-colors duration-300">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-neutral-600 
                         group-hover:text-orange-600 
                         transition-colors duration-200">
            تصفح الآن
          </span>
          
          <span className="text-lg font-bold text-orange-500
                         opacity-0 group-hover:opacity-100 
                         transform translate-x-2 group-hover:translate-x-0
                         transition-all duration-300">
            ←
          </span>
        </div>
        
        {/* Progress Bar Effect - Visual Feedback */}
        <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 
                        w-0 group-hover:w-full 
                        transition-all duration-500 ease-out
                        shadow-sm shadow-orange-500/50"></div>
        </div>
      </div>
    </Link>
  );
}
