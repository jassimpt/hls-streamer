import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category?: string;
}

interface VideoSectionProps {
  title: string;
  videos: Video[];
  onVideoClick: (id: string) => void;
}

const VideoSection = ({ title, videos, onVideoClick }: VideoSectionProps) => {
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

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <VideoCard
                title={video.title}
                thumbnail={video.thumbnail}
                duration={video.duration}
                category={video.category}
                onClick={() => onVideoClick(video.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
