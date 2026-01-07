import { useState, useEffect } from 'react';
import { parseM3U, Channel, groupChannelsByCategory } from '@/lib/m3u-parser';

const PLAYLIST_URL = 'https://iptv-org.github.io/iptv/languages/mal.m3u';

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [groupedChannels, setGroupedChannels] = useState<Record<string, Channel[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        setIsLoading(true);
        const response = await fetch(PLAYLIST_URL);
        const text = await response.text();
        const parsedChannels = parseM3U(text);
        setChannels(parsedChannels);
        setGroupedChannels(groupChannelsByCategory(parsedChannels));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch playlist:', err);
        setError('Failed to load channels');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaylist();
  }, []);

  return { channels, groupedChannels, isLoading, error };
}
