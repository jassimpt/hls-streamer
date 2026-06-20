import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trophy, Calendar, MapPin, Clock, Sparkles, X, ChevronRight } from 'lucide-react';
import worldcupHero from '@/assets/worldcup-2026.jpg';
import worldcupBall from '@/assets/worldcup-ball.jpg';

interface WorldCupSectionProps {
  onWatch: () => void;
}

const matches = [
  { date: 'Jun 11', time: '20:00', stage: 'Opening Match', teams: 'Mexico vs TBD', venue: 'Estadio Azteca, Mexico City' },
  { date: 'Jun 12', time: '21:00', stage: 'Group A', teams: 'USA vs TBD', venue: 'SoFi Stadium, Los Angeles' },
  { date: 'Jun 13', time: '19:30', stage: 'Group B', teams: 'Canada vs TBD', venue: 'BMO Field, Toronto' },
  { date: 'Jun 15', time: '20:00', stage: 'Group C', teams: 'England vs TBD', venue: 'Lincoln Financial Field, Philadelphia' },
  { date: 'Jun 16', time: '18:00', stage: 'Group C', teams: 'France vs TBD', venue: 'Gillette Stadium, Boston' },
  { date: 'Jun 18', time: '20:00', stage: 'Group D', teams: 'Brazil vs TBD', venue: 'MetLife Stadium, New Jersey' },
  { date: 'Jun 20', time: '19:00', stage: 'Group E', teams: 'Germany vs TBD', venue: 'Arrowhead Stadium, Kansas City' },
  { date: 'Jun 22', time: '21:00', stage: 'Group F', teams: 'Argentina vs TBD', venue: 'AT&T Stadium, Dallas' },
  { date: 'Jun 24', time: '20:00', stage: 'Group G', teams: 'Spain vs TBD', venue: 'NRG Stadium, Houston' },
  { date: 'Jun 26', time: '20:30', stage: 'Group H', teams: 'Portugal vs TBD', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { date: 'Jun 30', time: '20:00', stage: 'Round of 32', teams: 'Knockout Stage', venue: 'Various Venues' },
  { date: 'Jul 04', time: '20:00', stage: 'Round of 16', teams: 'Knockout Stage', venue: 'Various Venues' },
  { date: 'Jul 09', time: '20:00', stage: 'Quarter Finals', teams: 'Top 8 Clash', venue: 'Various Venues' },
  { date: 'Jul 14', time: '20:00', stage: 'Semi Finals', teams: 'Final Four', venue: 'AT&T Stadium, Dallas' },
  { date: 'Jul 18', time: '20:00', stage: 'Third Place', teams: 'Bronze Match', venue: 'Hard Rock Stadium, Miami' },
  { date: 'Jul 19', time: '20:00', stage: 'GRAND FINAL', teams: 'Champions Clash', venue: 'MetLife Stadium, New Jersey' },
];

const MatchRow = ({ match, idx }: { match: typeof matches[0]; idx: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(idx * 0.03, 0.3) }}
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
);

const WorldCupSection = ({ onWatch }: WorldCupSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const previewMatches = matches.slice(0, 6);

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
            className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden border border-primary/30 bg-black"
            onClick={onWatch}
            style={{ minHeight: '380px' }}
          >
            {/* Full background image */}
            <img
              src={worldcupHero}
              alt="FIFA World Cup 2026"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full min-h-[380px] p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider">
                  Main Event
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white">
                  HD • Multi-Quality
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-2 leading-tight drop-shadow-lg">
                Watch World Cup <span className="text-primary">2026</span>
              </h3>
              <p className="text-white/80 text-sm md:text-base mb-5 max-w-xl drop-shadow">
                Live coverage of every match, every goal — in crystal clear HD with adaptive quality streaming.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); onWatch(); }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:scale-105"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
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
              className="hidden md:block absolute top-6 right-6 w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 shadow-xl shadow-primary/30 z-10"
            >
              <img src={worldcupBall} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
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
              <button
                onClick={() => setShowAll(true)}
                className="ml-auto flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                View All ({matches.length})
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1">
              {previewMatches.map((match, idx) => (
                <MatchRow key={idx} match={match} idx={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Schedule Modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAll(false)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-primary/20"
            >
              <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-primary/5">
                <Trophy className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-foreground">Full Match Schedule</h3>
                  <p className="text-xs text-muted-foreground">FIFA World Cup 2026 · {matches.length} matches</p>
                </div>
                <button
                  onClick={() => setShowAll(false)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {matches.map((match, idx) => (
                  <MatchRow key={idx} match={match} idx={idx} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorldCupSection;
