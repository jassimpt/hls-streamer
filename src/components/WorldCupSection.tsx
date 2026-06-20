import { motion } from 'framer-motion';
import { Play, Trophy, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import worldcupHero from '@/assets/worldcup-2026.jpg';
import worldcupBall from '@/assets/worldcup-ball.jpg';

interface WorldCupSectionProps {
  onWatch: () => void;
}

const matches = [
  { date: 'Jun 11', time: '20:00', stage: 'Opening', teams: 'Mexico vs TBD', venue: 'Estadio Azteca, Mexico City' },
  { date: 'Jun 12', time: '21:00', stage: 'Group A', teams: 'USA vs TBD', venue: 'SoFi Stadium, Los Angeles' },
  { date: 'Jun 13', time: '19:30', stage: 'Group B', teams: 'Canada vs TBD', venue: 'BMO Field, Toronto' },
  { date: 'Jun 18', time: '20:00', stage: 'Group D', teams: 'Brazil vs TBD', venue: 'MetLife Stadium, New Jersey' },
  { date: 'Jun 22', time: '21:00', stage: 'Group E', teams: 'Argentina vs TBD', venue: 'AT&T Stadium, Dallas' },
  { date: 'Jul 19', time: '20:00', stage: 'Final', teams: 'Champions Clash', venue: 'MetLife Stadium, New Jersey' },
];

const WorldCupSection = ({ onWatch }: WorldCupSectionProps) => {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative">
            <Trophy className="w-7 h-7 text-primary" />
            <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            FIFA World Cup 2026
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/90 rounded-full ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Live</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden border border-primary/30"
            onClick={onWatch}
          >
            <div className="relative aspect-[16/9] lg:aspect-[16/8]">
              <img
                src={worldcupHero}
                alt="FIFA World Cup 2026"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={1920}
                height={1080}
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider">
                    Main Event
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white">
                    HD • Multi-Quality
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-2 leading-tight">
                  Watch World Cup <span className="text-primary">2026</span>
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-5 max-w-xl">
                  Live coverage of every match, every goal — in crystal clear HD with adaptive quality streaming.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onWatch(); }}
                    className="group/btn flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:scale-105"
                  >
                    <div className="relative">
                      <Play className="w-5 h-5" fill="currentColor" />
                    </div>
                    Watch Live Now
                  </button>
                  <div className="hidden sm:flex items-center gap-2 text-white/70 text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    On Air
                  </div>
                </div>
              </div>

              {/* Floating ball */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden md:block absolute top-6 right-6 w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 shadow-xl shadow-primary/30"
              >
                <img src={worldcupBall} alt="" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </motion.div>

          {/* Schedule Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col"
          >
            <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-primary/5">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">Match Schedule</h3>
              <span className="ml-auto text-xs text-muted-foreground">2026</span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[420px] custom-scrollbar">
              {matches.map((match, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-5 py-4 border-b border-border/50 hover:bg-primary/5 transition-colors group/match"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[52px] py-1.5 px-2 rounded-lg bg-primary/10 border border-primary/20 group-hover/match:bg-primary group-hover/match:border-primary transition-colors">
                      <span className="text-[10px] font-bold text-primary group-hover/match:text-primary-foreground uppercase">
                        {match.date.split(' ')[0]}
                      </span>
                      <span className="text-lg font-display font-extrabold text-foreground group-hover/match:text-primary-foreground leading-none">
                        {match.date.split(' ')[1]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {match.stage}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {match.time}
                        </span>
                      </div>
                      <p className="font-semibold text-sm text-foreground truncate">
                        {match.teams}
                      </p>
                      <p className="flex items-center gap-1 text-[11px] text-muted-foreground truncate mt-0.5">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {match.venue}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldCupSection;
