import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trophy, Calendar, MapPin, Clock, Sparkles, X, ChevronRight } from 'lucide-react';
import worldcupHero from '@/assets/worldcup-2026.jpg';
import worldcupBall from '@/assets/worldcup-ball.jpg';

interface WorldCupSectionProps {
  onWatch: () => void;
}

type Match = {
  num: number;
  dateISO: string; // YYYY-MM-DD (local US ET kickoff date)
  time: string; // ET kickoff
  stage: string;
  teamA: string;
  teamB: string;
  flagA?: string;
  flagB?: string;
  venue: string;
  city: string;
};

// FIFA World Cup 2026 — Official Schedule (Eastern Time). 104 matches.
const matches: Match[] = [
  // June 11
  { num: 1, dateISO: '2026-06-11', time: '3:00 PM ET', stage: 'Group A', teamA: 'Mexico', teamB: 'South Africa', flagA: 'mx', flagB: 'za', venue: 'Estadio Azteca', city: 'Mexico City' },
  { num: 2, dateISO: '2026-06-11', time: '10:00 PM ET', stage: 'Group A', teamA: 'South Korea', teamB: 'Czech Republic', flagA: 'kr', flagB: 'cz', venue: 'Estadio Akron', city: 'Guadalajara' },
  // June 12
  { num: 3, dateISO: '2026-06-12', time: '3:00 PM ET', stage: 'Group B', teamA: 'Canada', teamB: 'Bosnia & Herzegovina', flagA: 'ca', flagB: 'ba', venue: 'BMO Field', city: 'Toronto' },
  { num: 4, dateISO: '2026-06-12', time: '9:00 PM ET', stage: 'Group D', teamA: 'United States', teamB: 'Paraguay', flagA: 'us', flagB: 'py', venue: 'SoFi Stadium', city: 'Los Angeles' },
  // June 13
  { num: 5, dateISO: '2026-06-13', time: '3:00 PM ET', stage: 'Group B', teamA: 'Qatar', teamB: 'Switzerland', flagA: 'qa', flagB: 'ch', venue: "Levi's Stadium", city: 'SF Bay Area' },
  { num: 6, dateISO: '2026-06-13', time: '6:00 PM ET', stage: 'Group C', teamA: 'Brazil', teamB: 'Morocco', flagA: 'br', flagB: 'ma', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 7, dateISO: '2026-06-13', time: '9:00 PM ET', stage: 'Group C', teamA: 'Haiti', teamB: 'Scotland', flagA: 'ht', flagB: 'gb-sct', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 8, dateISO: '2026-06-13', time: '12:00 AM ET', stage: 'Group D', teamA: 'Australia', teamB: 'Turkey', flagA: 'au', flagB: 'tr', venue: 'BC Place', city: 'Vancouver' },
  // June 14
  { num: 9, dateISO: '2026-06-14', time: '1:00 PM ET', stage: 'Group E', teamA: 'Germany', teamB: 'Curaçao', flagA: 'de', flagB: 'cw', venue: 'NRG Stadium', city: 'Houston' },
  { num: 10, dateISO: '2026-06-14', time: '4:00 PM ET', stage: 'Group F', teamA: 'Netherlands', teamB: 'Japan', flagA: 'nl', flagB: 'jp', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 11, dateISO: '2026-06-14', time: '7:00 PM ET', stage: 'Group E', teamA: 'Ivory Coast', teamB: 'Ecuador', flagA: 'ci', flagB: 'ec', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { num: 12, dateISO: '2026-06-14', time: '10:00 PM ET', stage: 'Group F', teamA: 'Sweden', teamB: 'Tunisia', flagA: 'se', flagB: 'tn', venue: 'Estadio BBVA', city: 'Monterrey' },
  // June 15
  { num: 13, dateISO: '2026-06-15', time: '12:00 PM ET', stage: 'Group H', teamA: 'Spain', teamB: 'Cape Verde', flagA: 'es', flagB: 'cv', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 14, dateISO: '2026-06-15', time: '6:00 PM ET', stage: 'Group G', teamA: 'Belgium', teamB: 'Egypt', flagA: 'be', flagB: 'eg', venue: 'Lumen Field', city: 'Seattle' },
  { num: 15, dateISO: '2026-06-15', time: '6:00 PM ET', stage: 'Group H', teamA: 'Saudi Arabia', teamB: 'Uruguay', flagA: 'sa', flagB: 'uy', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 16, dateISO: '2026-06-15', time: '9:00 PM ET', stage: 'Group G', teamA: 'Iran', teamB: 'New Zealand', flagA: 'ir', flagB: 'nz', venue: 'SoFi Stadium', city: 'Los Angeles' },
  // June 16
  { num: 17, dateISO: '2026-06-16', time: '3:00 PM ET', stage: 'Group I', teamA: 'France', teamB: 'Senegal', flagA: 'fr', flagB: 'sn', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 18, dateISO: '2026-06-16', time: '6:00 PM ET', stage: 'Group I', teamA: 'Iraq', teamB: 'Norway', flagA: 'iq', flagB: 'no', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 19, dateISO: '2026-06-16', time: '9:00 PM ET', stage: 'Group J', teamA: 'Argentina', teamB: 'Algeria', flagA: 'ar', flagB: 'dz', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { num: 20, dateISO: '2026-06-16', time: '12:00 AM ET', stage: 'Group J', teamA: 'Austria', teamB: 'Jordan', flagA: 'at', flagB: 'jo', venue: "Levi's Stadium", city: 'SF Bay Area' },
  // June 17
  { num: 21, dateISO: '2026-06-17', time: '1:00 PM ET', stage: 'Group K', teamA: 'Portugal', teamB: 'DR Congo', flagA: 'pt', flagB: 'cd', venue: 'NRG Stadium', city: 'Houston' },
  { num: 22, dateISO: '2026-06-17', time: '4:00 PM ET', stage: 'Group L', teamA: 'England', teamB: 'Croatia', flagA: 'gb-eng', flagB: 'hr', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 23, dateISO: '2026-06-17', time: '7:00 PM ET', stage: 'Group L', teamA: 'Ghana', teamB: 'Panama', flagA: 'gh', flagB: 'pa', venue: 'BMO Field', city: 'Toronto' },
  { num: 24, dateISO: '2026-06-17', time: '10:00 PM ET', stage: 'Group K', teamA: 'Uzbekistan', teamB: 'Colombia', flagA: 'uz', flagB: 'co', venue: 'Estadio Azteca', city: 'Mexico City' },
  // June 18
  { num: 25, dateISO: '2026-06-18', time: '12:00 PM ET', stage: 'Group A', teamA: 'Czech Republic', teamB: 'South Africa', flagA: 'cz', flagB: 'za', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 26, dateISO: '2026-06-18', time: '3:00 PM ET', stage: 'Group B', teamA: 'Switzerland', teamB: 'Bosnia & Herzegovina', flagA: 'ch', flagB: 'ba', venue: 'SoFi Stadium', city: 'Los Angeles' },
  { num: 27, dateISO: '2026-06-18', time: '9:00 PM ET', stage: 'Group B', teamA: 'Canada', teamB: 'Qatar', flagA: 'ca', flagB: 'qa', venue: 'BC Place', city: 'Vancouver' },
  { num: 28, dateISO: '2026-06-18', time: '11:00 PM ET', stage: 'Group A', teamA: 'Mexico', teamB: 'South Korea', flagA: 'mx', flagB: 'kr', venue: 'Estadio Akron', city: 'Guadalajara' },
  // June 19
  { num: 29, dateISO: '2026-06-19', time: '3:00 PM ET', stage: 'Group D', teamA: 'United States', teamB: 'Australia', flagA: 'us', flagB: 'au', venue: 'Lumen Field', city: 'Seattle' },
  { num: 30, dateISO: '2026-06-19', time: '6:00 PM ET', stage: 'Group C', teamA: 'Scotland', teamB: 'Morocco', flagA: 'gb-sct', flagB: 'ma', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 31, dateISO: '2026-06-19', time: '9:00 PM ET', stage: 'Group C', teamA: 'Brazil', teamB: 'Haiti', flagA: 'br', flagB: 'ht', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { num: 32, dateISO: '2026-06-19', time: '11:00 PM ET', stage: 'Group D', teamA: 'Turkey', teamB: 'Paraguay', flagA: 'tr', flagB: 'py', venue: "Levi's Stadium", city: 'SF Bay Area' },
  // June 20 (TODAY)
  { num: 33, dateISO: '2026-06-20', time: '1:00 PM ET', stage: 'Group F', teamA: 'Netherlands', teamB: 'Sweden', flagA: 'nl', flagB: 'se', venue: 'NRG Stadium', city: 'Houston' },
  { num: 34, dateISO: '2026-06-20', time: '4:00 PM ET', stage: 'Group E', teamA: 'Germany', teamB: 'Ivory Coast', flagA: 'de', flagB: 'ci', venue: 'BMO Field', city: 'Toronto' },
  { num: 35, dateISO: '2026-06-20', time: '8:00 PM ET', stage: 'Group E', teamA: 'Ecuador', teamB: 'Curaçao', flagA: 'ec', flagB: 'cw', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { num: 36, dateISO: '2026-06-20', time: '12:00 AM ET', stage: 'Group F', teamA: 'Tunisia', teamB: 'Japan', flagA: 'tn', flagB: 'jp', venue: 'Estadio BBVA', city: 'Monterrey' },
  // June 21
  { num: 37, dateISO: '2026-06-21', time: '12:00 PM ET', stage: 'Group H', teamA: 'Spain', teamB: 'Saudi Arabia', flagA: 'es', flagB: 'sa', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 38, dateISO: '2026-06-21', time: '6:00 PM ET', stage: 'Group G', teamA: 'Belgium', teamB: 'Iran', flagA: 'be', flagB: 'ir', venue: 'SoFi Stadium', city: 'Los Angeles' },
  { num: 39, dateISO: '2026-06-21', time: '6:00 PM ET', stage: 'Group H', teamA: 'Uruguay', teamB: 'Cape Verde', flagA: 'uy', flagB: 'cv', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 40, dateISO: '2026-06-21', time: '12:00 AM ET', stage: 'Group G', teamA: 'New Zealand', teamB: 'Egypt', flagA: 'nz', flagB: 'eg', venue: 'BC Place', city: 'Vancouver' },
  // June 22
  { num: 41, dateISO: '2026-06-22', time: '1:00 PM ET', stage: 'Group J', teamA: 'Argentina', teamB: 'Austria', flagA: 'ar', flagB: 'at', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 42, dateISO: '2026-06-22', time: '5:00 PM ET', stage: 'Group I', teamA: 'France', teamB: 'Iraq', flagA: 'fr', flagB: 'iq', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { num: 43, dateISO: '2026-06-22', time: '8:00 PM ET', stage: 'Group I', teamA: 'Norway', teamB: 'Senegal', flagA: 'no', flagB: 'sn', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 44, dateISO: '2026-06-22', time: '11:00 PM ET', stage: 'Group J', teamA: 'Jordan', teamB: 'Algeria', flagA: 'jo', flagB: 'dz', venue: "Levi's Stadium", city: 'SF Bay Area' },
  // June 23
  { num: 45, dateISO: '2026-06-23', time: '1:00 PM ET', stage: 'Group K', teamA: 'Portugal', teamB: 'Uzbekistan', flagA: 'pt', flagB: 'uz', venue: 'NRG Stadium', city: 'Houston' },
  { num: 46, dateISO: '2026-06-23', time: '4:00 PM ET', stage: 'Group L', teamA: 'England', teamB: 'Ghana', flagA: 'gb-eng', flagB: 'gh', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 47, dateISO: '2026-06-23', time: '7:00 PM ET', stage: 'Group L', teamA: 'Panama', teamB: 'Croatia', flagA: 'pa', flagB: 'hr', venue: 'BMO Field', city: 'Toronto' },
  { num: 48, dateISO: '2026-06-23', time: '10:00 PM ET', stage: 'Group K', teamA: 'Colombia', teamB: 'DR Congo', flagA: 'co', flagB: 'cd', venue: 'Estadio Akron', city: 'Guadalajara' },
  // June 24
  { num: 49, dateISO: '2026-06-24', time: '3:00 PM ET', stage: 'Group B', teamA: 'Switzerland', teamB: 'Canada', flagA: 'ch', flagB: 'ca', venue: 'BC Place', city: 'Vancouver' },
  { num: 50, dateISO: '2026-06-24', time: '3:00 PM ET', stage: 'Group B', teamA: 'Bosnia & Herzegovina', teamB: 'Qatar', flagA: 'ba', flagB: 'qa', venue: 'Lumen Field', city: 'Seattle' },
  { num: 51, dateISO: '2026-06-24', time: '6:00 PM ET', stage: 'Group C', teamA: 'Scotland', teamB: 'Brazil', flagA: 'gb-sct', flagB: 'br', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 52, dateISO: '2026-06-24', time: '6:00 PM ET', stage: 'Group C', teamA: 'Morocco', teamB: 'Haiti', flagA: 'ma', flagB: 'ht', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 53, dateISO: '2026-06-24', time: '9:00 PM ET', stage: 'Group A', teamA: 'Czech Republic', teamB: 'Mexico', flagA: 'cz', flagB: 'mx', venue: 'Estadio Azteca', city: 'Mexico City' },
  { num: 54, dateISO: '2026-06-24', time: '9:00 PM ET', stage: 'Group A', teamA: 'South Africa', teamB: 'South Korea', flagA: 'za', flagB: 'kr', venue: 'Estadio BBVA', city: 'Monterrey' },
  // June 25
  { num: 55, dateISO: '2026-06-25', time: '4:00 PM ET', stage: 'Group E', teamA: 'Ecuador', teamB: 'Germany', flagA: 'ec', flagB: 'de', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 56, dateISO: '2026-06-25', time: '4:00 PM ET', stage: 'Group E', teamA: 'Curaçao', teamB: 'Ivory Coast', flagA: 'cw', flagB: 'ci', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { num: 57, dateISO: '2026-06-25', time: '7:00 PM ET', stage: 'Group F', teamA: 'Japan', teamB: 'Sweden', flagA: 'jp', flagB: 'se', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 58, dateISO: '2026-06-25', time: '7:00 PM ET', stage: 'Group F', teamA: 'Tunisia', teamB: 'Netherlands', flagA: 'tn', flagB: 'nl', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { num: 59, dateISO: '2026-06-25', time: '10:00 PM ET', stage: 'Group D', teamA: 'Turkey', teamB: 'United States', flagA: 'tr', flagB: 'us', venue: 'SoFi Stadium', city: 'Los Angeles' },
  { num: 60, dateISO: '2026-06-25', time: '10:00 PM ET', stage: 'Group D', teamA: 'Paraguay', teamB: 'Australia', flagA: 'py', flagB: 'au', venue: "Levi's Stadium", city: 'SF Bay Area' },
  // June 26
  { num: 61, dateISO: '2026-06-26', time: '3:00 PM ET', stage: 'Group I', teamA: 'Norway', teamB: 'France', flagA: 'no', flagB: 'fr', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 62, dateISO: '2026-06-26', time: '3:00 PM ET', stage: 'Group I', teamA: 'Senegal', teamB: 'Iraq', flagA: 'sn', flagB: 'iq', venue: 'BMO Field', city: 'Toronto' },
  { num: 63, dateISO: '2026-06-26', time: '8:00 PM ET', stage: 'Group H', teamA: 'Cape Verde', teamB: 'Saudi Arabia', flagA: 'cv', flagB: 'sa', venue: 'NRG Stadium', city: 'Houston' },
  { num: 64, dateISO: '2026-06-26', time: '10:00 PM ET', stage: 'Group H', teamA: 'Uruguay', teamB: 'Spain', flagA: 'uy', flagB: 'es', venue: 'Estadio Akron', city: 'Guadalajara' },
  { num: 65, dateISO: '2026-06-26', time: '11:00 PM ET', stage: 'Group G', teamA: 'Egypt', teamB: 'Iran', flagA: 'eg', flagB: 'ir', venue: 'Lumen Field', city: 'Seattle' },
  { num: 66, dateISO: '2026-06-26', time: '11:00 PM ET', stage: 'Group G', teamA: 'New Zealand', teamB: 'Belgium', flagA: 'nz', flagB: 'be', venue: 'BC Place', city: 'Vancouver' },
  // June 27
  { num: 67, dateISO: '2026-06-27', time: '5:00 PM ET', stage: 'Group L', teamA: 'Panama', teamB: 'England', flagA: 'pa', flagB: 'gb-eng', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 68, dateISO: '2026-06-27', time: '5:00 PM ET', stage: 'Group L', teamA: 'Croatia', teamB: 'Ghana', flagA: 'hr', flagB: 'gh', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { num: 69, dateISO: '2026-06-27', time: '7:30 PM ET', stage: 'Group K', teamA: 'Colombia', teamB: 'Portugal', flagA: 'co', flagB: 'pt', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 70, dateISO: '2026-06-27', time: '7:30 PM ET', stage: 'Group K', teamA: 'DR Congo', teamB: 'Uzbekistan', flagA: 'cd', flagB: 'uz', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 71, dateISO: '2026-06-27', time: '11:00 PM ET', stage: 'Group J', teamA: 'Algeria', teamB: 'Austria', flagA: 'dz', flagB: 'at', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { num: 72, dateISO: '2026-06-27', time: '11:00 PM ET', stage: 'Group J', teamA: 'Jordan', teamB: 'Argentina', flagA: 'jo', flagB: 'ar', venue: 'AT&T Stadium', city: 'Dallas' },
  // Knockouts — Round of 32
  { num: 73, dateISO: '2026-06-28', time: '6:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'SoFi Stadium', city: 'Los Angeles' },
  { num: 74, dateISO: '2026-06-29', time: '2:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'NRG Stadium', city: 'Houston' },
  { num: 75, dateISO: '2026-06-29', time: '4:30 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 76, dateISO: '2026-06-29', time: '9:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Estadio BBVA', city: 'Monterrey' },
  { num: 77, dateISO: '2026-06-30', time: '2:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 78, dateISO: '2026-06-30', time: '5:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 79, dateISO: '2026-06-30', time: '9:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Estadio Azteca', city: 'Mexico City' },
  { num: 80, dateISO: '2026-07-01', time: '12:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 81, dateISO: '2026-07-01', time: '4:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Lumen Field', city: 'Seattle' },
  { num: 82, dateISO: '2026-07-01', time: '8:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: "Levi's Stadium", city: 'SF Bay Area' },
  { num: 83, dateISO: '2026-07-02', time: '6:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'SoFi Stadium', city: 'Los Angeles' },
  { num: 84, dateISO: '2026-07-02', time: '7:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'BMO Field', city: 'Toronto' },
  { num: 85, dateISO: '2026-07-02', time: '11:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'BC Place', city: 'Vancouver' },
  { num: 86, dateISO: '2026-07-03', time: '3:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 87, dateISO: '2026-07-03', time: '6:00 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 88, dateISO: '2026-07-03', time: '10:30 PM ET', stage: 'Round of 32', teamA: 'TBD', teamB: 'TBD', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  // Round of 16
  { num: 89, dateISO: '2026-07-04', time: '2:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'NRG Stadium', city: 'Houston' },
  { num: 90, dateISO: '2026-07-04', time: '5:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { num: 91, dateISO: '2026-07-05', time: '4:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'MetLife Stadium', city: 'New York / NJ' },
  { num: 92, dateISO: '2026-07-05', time: '8:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'Estadio Azteca', city: 'Mexico City' },
  { num: 93, dateISO: '2026-07-06', time: '4:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 94, dateISO: '2026-07-06', time: '8:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'Lumen Field', city: 'Seattle' },
  { num: 95, dateISO: '2026-07-07', time: '12:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 96, dateISO: '2026-07-07', time: '7:00 PM ET', stage: 'Round of 16', teamA: 'TBD', teamB: 'TBD', venue: 'BC Place', city: 'Vancouver' },
  // Quarterfinals
  { num: 97, dateISO: '2026-07-09', time: '4:00 PM ET', stage: 'Quarterfinal', teamA: 'TBD', teamB: 'TBD', venue: 'Gillette Stadium', city: 'Boston' },
  { num: 98, dateISO: '2026-07-10', time: '6:00 PM ET', stage: 'Quarterfinal', teamA: 'TBD', teamB: 'TBD', venue: 'SoFi Stadium', city: 'Los Angeles' },
  { num: 99, dateISO: '2026-07-11', time: '5:00 PM ET', stage: 'Quarterfinal', teamA: 'TBD', teamB: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 100, dateISO: '2026-07-11', time: '10:00 PM ET', stage: 'Quarterfinal', teamA: 'TBD', teamB: 'TBD', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  // Semifinals / 3rd / Final
  { num: 101, dateISO: '2026-07-14', time: '4:00 PM ET', stage: 'Semi-final', teamA: 'TBD', teamB: 'TBD', venue: 'AT&T Stadium', city: 'Dallas' },
  { num: 102, dateISO: '2026-07-15', time: '3:00 PM ET', stage: 'Semi-final', teamA: 'TBD', teamB: 'TBD', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { num: 103, dateISO: '2026-07-18', time: '5:00 PM ET', stage: '3rd Place Play-off', teamA: 'TBD', teamB: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami' },
  { num: 104, dateISO: '2026-07-19', time: '3:00 PM ET', stage: 'GRAND FINAL', teamA: 'TBD', teamB: 'TBD', venue: 'MetLife Stadium', city: 'New York / NJ' },
];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const formatDate = (iso: string) => {
  const [, m, d] = iso.split('-').map(Number);
  return { mon: MONTHS[m - 1], day: String(d).padStart(2, '0') };
};

const Flag = ({ code }: { code?: string }) =>
  code ? (
    <img src={`https://flagcdn.com/w40/${code}.png`} alt="" className="w-6 h-4 object-cover rounded-sm shadow-sm" loading="lazy" />
  ) : (
    <div className="w-6 h-4 rounded-sm bg-muted" />
  );

const MatchRow = ({ match, idx, isToday }: { match: Match; idx: number; isToday: boolean }) => {
  const d = formatDate(match.dateISO);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(idx * 0.015, 0.25) }}
      className={`px-5 py-3.5 border-b border-border/40 hover:bg-primary/5 transition-colors group/match ${isToday ? 'bg-primary/5' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex flex-col items-center justify-center min-w-[52px] py-1.5 px-2 rounded-lg border transition-colors ${isToday ? 'bg-primary border-primary' : 'bg-primary/10 border-primary/20 group-hover/match:bg-primary group-hover/match:border-primary'}`}>
          <span className={`text-[10px] font-bold uppercase ${isToday ? 'text-primary-foreground' : 'text-primary group-hover/match:text-primary-foreground'}`}>
            {d.mon}
          </span>
          <span className={`text-lg font-display font-extrabold leading-none ${isToday ? 'text-primary-foreground' : 'text-foreground group-hover/match:text-primary-foreground'}`}>
            {d.day}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{match.stage}</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              {match.time}
            </span>
            {isToday && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-wider">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                Today
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Flag code={match.flagA} />
            <span className="truncate">{match.teamA}</span>
            <span className="text-muted-foreground text-xs mx-1">vs</span>
            <Flag code={match.flagB} />
            <span className="truncate">{match.teamB}</span>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground truncate mt-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {match.venue} · {match.city}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const WorldCupSection = ({ onWatch }: WorldCupSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const todayISO = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  }, []);

  const upcoming = useMemo(() => {
    const idx = matches.findIndex((m) => m.dateISO >= todayISO);
    const start = idx === -1 ? 0 : idx;
    return matches.slice(start, start + 6);
  }, [todayISO]);

  const liveToday = matches.filter((m) => m.dateISO === todayISO);
  const liveHeadline = liveToday[0];

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6 flex-wrap"
        >
          <div className="relative">
            <Trophy className="w-7 h-7 text-primary" />
            <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            FIFA World Cup 2026
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/90 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Live</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden border border-primary/30 bg-black"
            onClick={onWatch}
            style={{ minHeight: '380px' }}
          >
            <img
              src={worldcupHero}
              alt="FIFA World Cup 2026"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col justify-end h-full min-h-[380px] p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider">
                  Main Event
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white">
                  HD · Multi-Quality
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-2 leading-tight drop-shadow-lg">
                Watch World Cup <span className="text-primary">2026</span>
              </h3>
              {liveHeadline ? (
                <p className="text-white/85 text-sm md:text-base mb-5 max-w-xl drop-shadow">
                  Live today: <span className="font-bold text-white">{liveHeadline.teamA} vs {liveHeadline.teamB}</span> · {liveHeadline.time} · {liveHeadline.venue}
                </p>
              ) : (
                <p className="text-white/80 text-sm md:text-base mb-5 max-w-xl drop-shadow">
                  Every match, every goal — crystal clear HD with adaptive quality.
                </p>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); onWatch(); }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:scale-105"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Live Now
                </button>
                <div className="hidden sm:flex items-center gap-2 text-white/70 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  On Air
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden md:block absolute top-6 right-6 w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 shadow-xl shadow-primary/30 z-10"
            >
              <img src={worldcupBall} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </motion.div>

          {/* Schedule Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col"
          >
            <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-primary/5">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">Upcoming Matches</h3>
              <button
                onClick={() => setShowAll(true)}
                className="ml-auto flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                View All ({matches.length})
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1">
              {upcoming.map((match, idx) => (
                <MatchRow key={match.num} match={match} idx={idx} isToday={match.dateISO === todayISO} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Schedule Modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAll(false)}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-primary/20"
            >
              <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-primary/5">
                <Trophy className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-foreground">Full Match Schedule</h3>
                  <p className="text-xs text-muted-foreground">FIFA World Cup 2026 · {matches.length} matches</p>
                </div>
                <button
                  onClick={() => setShowAll(false)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {matches.map((match, idx) => (
                  <MatchRow key={match.num} match={match} idx={idx} isToday={match.dateISO === todayISO} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorldCupSection;
