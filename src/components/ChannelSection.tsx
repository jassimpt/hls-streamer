import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ChannelCard from './ChannelCard';
import { Channel } from '@/lib/m3u-parser';

interface ChannelSectionProps {
  title: string;
  channels: Channel[];
  onChannelClick: (channel: Channel) => void;
}

const ChannelSection = ({ title, channels, onChannelClick }: ChannelSectionProps) => {
  if (channels.length === 0) return null;

  return (
    <section className="py-8">
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
          <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Channel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {channels.slice(0, 6).map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ChannelCard
                channel={channel}
                onClick={() => onChannelClick(channel)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChannelSection;
