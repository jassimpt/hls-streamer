import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import VideoPlayer from '@/components/VideoPlayer';

// Sample HLS streams for demo (these are public test streams)
const DEMO_STREAMS = {
  main: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  bigBuckBunny: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  sintel: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
};

// Sample video data
const trendingVideos = [
  { id: '1', title: 'The Last Frontier', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80', duration: '1h 52m', category: 'Sci-Fi' },
  { id: '2', title: 'Ocean Depths', thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80', duration: '2h 10m', category: 'Documentary' },
  { id: '3', title: 'Midnight Chase', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80', duration: '1h 45m', category: 'Action' },
  { id: '4', title: 'Beyond the Stars', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80', duration: '2h 5m', category: 'Sci-Fi' },
  { id: '5', title: 'Forest Whispers', thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80', duration: '1h 30m', category: 'Nature' },
];

const recentlyAdded = [
  { id: '6', title: 'City Lights', thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&q=80', duration: '1h 48m' },
  { id: '7', title: 'Mountain Peak', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80', duration: '55m' },
  { id: '8', title: 'Desert Storm', thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80', duration: '1h 22m' },
  { id: '9', title: 'Arctic Journey', thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80', duration: '2h 15m' },
  { id: '10', title: 'Sunset Boulevard', thumbnail: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&q=80', duration: '1h 35m' },
];

const documentaries = [
  { id: '11', title: 'Planet Earth: The Unknown', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80', duration: '58m', category: 'Nature' },
  { id: '12', title: 'Into the Wild', thumbnail: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=400&q=80', duration: '1h 42m', category: 'Adventure' },
  { id: '13', title: 'Deep Blue', thumbnail: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&q=80', duration: '1h 15m', category: 'Ocean' },
  { id: '14', title: 'The Human Mind', thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80', duration: '48m', category: 'Science' },
  { id: '15', title: 'Ancient Civilizations', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', duration: '1h 25m', category: 'History' },
];

const Index = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState(DEMO_STREAMS.main);
  const [currentTitle, setCurrentTitle] = useState('');

  const handlePlayVideo = (id?: string, title?: string) => {
    // For demo, we'll use different streams based on ID
    if (id) {
      const streamMap: Record<string, string> = {
        '1': DEMO_STREAMS.main,
        '2': DEMO_STREAMS.sintel,
        '3': DEMO_STREAMS.bigBuckBunny,
      };
      setCurrentStream(streamMap[id] || DEMO_STREAMS.main);
      setCurrentTitle(title || '');
    } else {
      setCurrentStream(DEMO_STREAMS.main);
      setCurrentTitle('Cosmic Odyssey');
    }
    setIsPlayerOpen(true);
  };

  const handleVideoClick = (id: string) => {
    const allVideos = [...trendingVideos, ...recentlyAdded, ...documentaries];
    const video = allVideos.find(v => v.id === id);
    handlePlayVideo(id, video?.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection onPlay={() => handlePlayVideo()} />

      {/* Video Sections */}
      <div className="relative z-10 -mt-20">
        <VideoSection 
          title="Trending Now" 
          videos={trendingVideos} 
          onVideoClick={handleVideoClick}
        />
        <VideoSection 
          title="Recently Added" 
          videos={recentlyAdded} 
          onVideoClick={handleVideoClick}
        />
        <VideoSection 
          title="Top Documentaries" 
          videos={documentaries} 
          onVideoClick={handleVideoClick}
        />
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 StreamVault. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Video Player Modal */}
      <AnimatePresence>
        {isPlayerOpen && (
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
                src={currentStream}
                title={currentTitle}
                poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
