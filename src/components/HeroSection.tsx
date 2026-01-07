import { motion } from 'framer-motion';
import { Play, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onPlay: () => void;
}

const HeroSection = ({ onPlay }: HeroSectionProps) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
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
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now Streaming
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
            Cosmic <span className="gradient-text">Odyssey</span>
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <span className="text-primary font-semibold">98% Match</span>
            <span>2024</span>
            <span className="px-2 py-0.5 border border-muted-foreground/30 rounded text-xs">HD</span>
            <span>2h 15m</span>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
            Embark on an extraordinary journey through the cosmos as a group of astronauts 
            discovers a mysterious signal from the edge of the known universe. A visually 
            stunning masterpiece that redefines the boundaries of science fiction.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={onPlay}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 glow-effect"
            >
              <Play className="w-5 h-5 mr-2" fill="currentColor" />
              Play Now
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-secondary/80 hover:bg-secondary text-secondary-foreground"
            >
              <Plus className="w-5 h-5 mr-2" />
              My List
            </Button>
            <Button 
              size="icon"
              variant="ghost"
              className="rounded-full bg-secondary/50 hover:bg-secondary"
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
