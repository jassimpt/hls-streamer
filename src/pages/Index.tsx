import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChannelSection from '@/components/ChannelSection';
import VideoPlayer from '@/components/VideoPlayer';
import { useChannels } from '@/hooks/useChannels';
import { Channel } from '@/lib/m3u-parser';

const Index = () => {
  const { channels, groupedChannels, isLoading, error } = useChannels();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

  const handleChannelClick = (channel: Channel) => {
    setCurrentChannel(channel);
    setIsPlayerOpen(true);
  };

  const handlePlayFirst = () => {
    if (channels.length > 0) {
      handleChannelClick(channels[0]);
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
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection onPlay={handlePlayFirst} channelCount={channels.length} />

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
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 StreamVault. Streaming {channels.length} Malayalam channels.
          </p>
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
    </div>
  );
};

export default Index;
