import { motion } from 'framer-motion';
import { Play, Radio, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onPlay: () => void;
  channelCount: number;
}

const HeroSection = ({ onPlay, channelCount }: HeroSectionProps) => {
  return (
    <div className="relative h-[60vh] min-h-[450px] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            Live Streaming
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
            Malayalam <span className="gradient-text">Live TV</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-6">
            Stream {channelCount}+ Malayalam channels live. News, entertainment, movies, sports, 
            and more — all in one place.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-primary" />
              <span className="text-foreground font-semibold">{channelCount}+ Channels</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">Live Now</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={onPlay}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 glow-effect"
            >
              <Play className="w-5 h-5 mr-2" fill="currentColor" />
              Start Watching
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
