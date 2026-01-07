import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  category?: string;
  onClick?: () => void;
}

const VideoCard = ({ title, thumbnail, duration, category, onClick }: VideoCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden card-elevated">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
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

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md glass-surface text-xs font-medium text-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration}
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-semibold">
            {category}
          </div>
        )}
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default VideoCard;
