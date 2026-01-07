import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import ChannelCard from './ChannelCard';
import { Channel } from '@/lib/m3u-parser';

interface ChannelSectionProps {
  title: string;
  channels: Channel[];
  onChannelClick: (channel: Channel) => void;
  sectionRef?: (el: HTMLElement | null) => void;
}

const ChannelSection = ({ title, channels, onChannelClick, sectionRef }: ChannelSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (channels.length === 0) return null;

  const displayedChannels = isExpanded ? channels : channels.slice(0, 6);
  const hasMore = channels.length > 6;

  return (
    <section ref={sectionRef} className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-display font-bold text-foreground"
          >
            {title}
          </motion.h2>
          {hasMore && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              {isExpanded ? 'Show Less' : `View All (${channels.length})`}
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Channel Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          <AnimatePresence>
            {displayedChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index < 6 ? index * 0.05 : 0 }}
              >
                <ChannelCard
                  channel={channel}
                  onClick={() => onChannelClick(channel)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelSection;
