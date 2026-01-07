export interface Channel {
  id: string;
  name: string;
  logo: string;
  url: string;
  group: string;
}

export function parseM3U(content: string): Channel[] {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#EXTINF:')) {
      // Parse channel info
      const logoMatch = line.match(/tvg-logo="([^"]*)"/);
      const groupMatch = line.match(/group-title="([^"]*)"/);
      const nameMatch = line.match(/,(.+)$/);
      
      // Get the stream URL from the next line
      const urlLine = lines[i + 1]?.trim();
      
      if (nameMatch && urlLine && !urlLine.startsWith('#')) {
        const name = nameMatch[1].trim();
        const logo = logoMatch ? logoMatch[1] : '';
        const group = groupMatch ? groupMatch[1] : 'General';
        
        channels.push({
          id: `channel-${channels.length}`,
          name,
          logo: logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff&size=200`,
          url: urlLine,
          group,
        });
      }
    }
  }
  
  return channels;
}

export function groupChannelsByCategory(channels: Channel[]): Record<string, Channel[]> {
  return channels.reduce((acc, channel) => {
    const group = channel.group || 'General';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);
}
