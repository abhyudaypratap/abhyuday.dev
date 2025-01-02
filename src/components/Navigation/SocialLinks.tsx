import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/yourusername',
    label: 'GitHub',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/yourusername',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/yourusername',
    label: 'Instagram',
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-4">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}