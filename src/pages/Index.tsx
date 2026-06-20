import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Instagram, Github, Linkedin, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChannelSection from '@/components/ChannelSection';
import VideoPlayer from '@/components/VideoPlayer';
import WorldCupSection from '@/components/WorldCupSection';
import { useChannels } from '@/hooks/useChannels';
import { Channel } from '@/lib/m3u-parser';

const WORLD_CUP_STREAM = 'https://as.roomtu.store/rook1.m3u8';

const Index = () => {
  const { channels, groupedChannels, isLoading, error } = useChannels();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [isWorldCupOpen, setIsWorldCupOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleChannelClick = (channel: Channel) => {
    setCurrentChannel(channel);
    setIsPlayerOpen(true);
  };

  const handlePlayFirst = () => {
    if (channels.length > 0) {
      handleChannelClick(channels[0]);
    }
  };

  const handleCategoryClick = (category: string) => {
    const ref = sectionRefs.current[category];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Priority order for sections
  const sectionOrder = ['News', 'Entertainment', 'Movies', 'General', 'Religious', 'Kids', 'Documentary', 'Sports', 'Music', 'Education', 'Lifestyle'];
  
  const sortedGroups = Object.entries(groupedChannels).sort(([a], [b]) => {
    const indexA = sectionOrder.indexOf(a);
    const indexB = sectionOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCategoryClick={handleCategoryClick} />
      
      {/* Hero Section */}
      <HeroSection onPlay={handlePlayFirst} channelCount={channels.length} />

      {/* World Cup Featured Section */}
      <WorldCupSection onWatch={() => setIsWorldCupOpen(true)} />


      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="ml-3 text-muted-foreground">Loading channels...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      )}

      {/* Channel Sections */}
      {!isLoading && !error && (
        <div className="relative z-10 -mt-16">
          {sortedGroups.map(([group, groupChannels]) => (
            <ChannelSection
              key={group}
              title={group}
              channels={groupChannels}
              onChannelClick={handleChannelClick}
              sectionRef={(el: HTMLElement | null) => { sectionRefs.current[group] = el; }}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-muted-foreground text-sm">
            © 2024 StreamVault. Streaming {channels.length} Malayalam channels.
          </p>
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
            <span>Developed with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by</span>
            <span className="font-semibold text-foreground">Jassim PT</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://www.linkedin.com/in/jassimpt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/jassimpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/j4ssim.__?igsh=M2pvY2dnZDhkMW5y&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Video Player Modal */}
      <AnimatePresence>
        {isPlayerOpen && currentChannel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPlayerOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass-surface hover:bg-secondary transition-colors z-10"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <VideoPlayer 
                src={currentChannel.url}
                title={currentChannel.name}
                poster={currentChannel.logo}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* World Cup Player Modal */}
      <AnimatePresence>
        {isWorldCupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl relative"
            >
              <button
                onClick={() => setIsWorldCupOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass-surface hover:bg-secondary transition-colors z-20"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <VideoPlayer
                src="https://as.roomtu.store/rook1.m3u8"
                title="FIFA World Cup 2026 — Live"
                showQualitySelector
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
