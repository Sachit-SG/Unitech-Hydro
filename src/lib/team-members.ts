import type { LeadershipMember } from "@/components/about/leadership-profile-card";
import { SITE_IMAGES } from "@/lib/site-config";

/** Official portraits keyed by full name — add paths as photos are supplied. */
export const TEAM_PORTRAITS: Partial<Record<string, string>> = {
  "Anoj Khadka": SITE_IMAGES.chairmanPortrait,
  "Dinesh Lal Shrestha": "/images/team/dinesh-lal-shrestha.jpeg",
  "Shobha Basnet": "/images/team/shobha-basnet.jpeg",
  "Vishwa Prakash Amatya": "/images/team/vishwa-prakash-amatya.jpeg",
  "Bhaskar Kafle": "/images/team/bhaskar-kafle.jpeg",
  "Rabindra Mahaseth": "/images/team/rabindra-mahaseth.jpeg",
  "Shrina Ghimire": "/images/team/shrina-ghimire.jpeg",
};

function withPortrait(member: { name: string; title: string }): LeadershipMember {
  const photoSrc = TEAM_PORTRAITS[member.name];
  return photoSrc ? { ...member, photoSrc } : member;
}

export const boardMembers: LeadershipMember[] = [
  { name: "Anoj Khadka", title: "Chairman" },
  { name: "Dinesh Lal Shrestha", title: "Director" },
  { name: "Anand Kumar Basnet", title: "Director" },
  { name: "Shobha Basnet", title: "Director" },
  { name: "Vishwa Prakash Amatya", title: "Director" },
  { name: "Pramod Kumar Shah", title: "Independent Director" },
].map(withPortrait);

export const managementTeamMembers: LeadershipMember[] = [
  { name: "Bhaskar Kafle", title: "CEO" },
  { name: "Rabindra Mahaseth", title: "Project Co-ordinator" },
  { name: "Shrina Ghimire", title: "Account / Admin Officer" },
].map(withPortrait);

/** Gallery page uses “Chief Executive Officer” for the same role. */
export const galleryOperationsTeam: LeadershipMember[] = [
  { name: "Bhaskar Kafle", title: "Chief Executive Officer" },
  { name: "Rabindra Mahaseth", title: "Project Co-ordinator" },
  { name: "Shrina Ghimire", title: "Account / Admin Officer" },
].map(withPortrait);
