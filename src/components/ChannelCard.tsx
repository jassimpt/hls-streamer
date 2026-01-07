import { motion } from 'framer-motion';
import { Play, Radio } from 'lucide-react';
import { Channel } from '@/lib/m3u-parser';

interface ChannelCardProps {
  channel: Channel;
  onClick: () => void;
}

const ChannelCard = ({ channel, onClick }: ChannelCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden card-elevated">
        {/* Channel Logo */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted p-6">
          {channel.logo ? (
            <img
              src={channel.logo}
              alt={channel.name}
              className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=0ea5e9&color=fff&size=200`;
              }}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Radio className="w-10 h-10 text-primary" />
            </div>
          )}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center glow-effect">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </motion.div>

        {/* Live Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-destructive/90 text-destructive-foreground text-xs font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          LIVE
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md glass-surface text-xs font-medium text-foreground">
          {channel.group}
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {channel.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Malayalam • Live TV</p>
      </div>
    </motion.div>
  );
};

export default ChannelCard;
