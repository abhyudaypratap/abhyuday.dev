import { GithubIcon, TwitterIcon, LinkedinIcon, GoodreadsIcon } from './Navigation/SocialIcons';
import { socialLinks } from '../constants/navigation';

const iconComponents = {
  Github: GithubIcon,
  Twitter: TwitterIcon,
  Linkedin: LinkedinIcon,
  Goodreads: GoodreadsIcon,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © {currentYear} Abhyuday Pratap Singh. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon, href, label }) => {
              const Icon = iconComponents[icon as keyof typeof iconComponents];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}