import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'emerald'
}) {
  const variants = {
    emerald: {
      card: 'bg-gradient-to-br from-emerald-500/15 via-emerald-50 to-teal-50/50 border-emerald-200/90 text-slate-900',
      title: 'text-emerald-800',
      value: 'text-emerald-950',
      subtitle: 'text-emerald-700/80',
      iconBox: 'bg-emerald-600 text-white shadow-xs'
    },
    blue: {
      card: 'bg-gradient-to-br from-blue-500/15 via-blue-50 to-indigo-50/50 border-blue-200/90 text-slate-900',
      title: 'text-blue-800',
      value: 'text-blue-950',
      subtitle: 'text-blue-700/80',
      iconBox: 'bg-blue-600 text-white shadow-xs'
    },
    amber: {
      card: 'bg-gradient-to-br from-amber-500/15 via-amber-50 to-orange-50/50 border-amber-200/90 text-slate-900',
      title: 'text-amber-800',
      value: 'text-amber-950',
      subtitle: 'text-amber-700/80',
      iconBox: 'bg-amber-600 text-white shadow-xs'
    },
    'solid-emerald': {
      card: 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white border-transparent shadow-md',
      title: 'text-emerald-100',
      value: 'text-white',
      subtitle: 'text-emerald-200',
      iconBox: 'bg-white/20 text-white backdrop-blur-md shadow-xs'
    },
    'solid-rose': {
      card: 'bg-gradient-to-br from-rose-600 to-red-800 text-white border-transparent shadow-md',
      title: 'text-rose-100',
      value: 'text-white',
      subtitle: 'text-rose-200',
      iconBox: 'bg-white/20 text-white backdrop-blur-md shadow-xs'
    },
    'solid-purple': {
      card: 'bg-gradient-to-br from-purple-600 to-indigo-900 text-white border-transparent shadow-md',
      title: 'text-purple-100',
      value: 'text-white',
      subtitle: 'text-purple-200',
      iconBox: 'bg-white/20 text-white backdrop-blur-md shadow-xs'
    },
    'solid-blue': {
      card: 'bg-gradient-to-br from-blue-600 to-indigo-800 text-white border-transparent shadow-md',
      title: 'text-blue-100',
      value: 'text-white',
      subtitle: 'text-blue-200',
      iconBox: 'bg-white/20 text-white backdrop-blur-md shadow-xs'
    }
  };

  const style = variants[variant] || variants.emerald;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 border shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md ${style.card}`}>
      <div className="flex justify-between items-start">
        <span className={`text-[11px] font-black uppercase tracking-wider ${style.title}`}>
          {title}
        </span>
        {Icon && (
          <span className={`p-2 rounded-xl flex items-center justify-center ${style.iconBox}`}>
            <Icon size={16} />
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className={`text-2xl font-black font-mono tracking-tight ${style.value}`}>
          {value}
        </div>
        {subtitle && (
          <div className={`text-xs font-medium mt-1 ${style.subtitle}`}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}