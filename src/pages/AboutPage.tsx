import { motion } from 'framer-motion';
import PageTransition from '../components/transitions/PageTransition';
import Footer from '../components/Footer';
import { Mail, MapPin, Twitter } from 'lucide-react';
import headerimage from '../assets/images/harrachov_ski_slope.jpg';
import profileimage from '../assets/images/abhyuday_profile_crop.jpeg';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          {/* Hero Image */}
          <div className="relative h-[60vh] w-full">
            <img
              src={headerimage}
              alt="Harrachov SKI"
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </div>

          {/* Content Section */}
          <div className="bg-white -mt-32 relative">
            <div className="max-w-3xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-16 pt-8"
              >
                {/* Profile Section */}
                <section className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="w-48 h-50 flex-shrink-0">
                    <img
                      src={profileimage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>Berlin, Germany</span>
                    </div>
                    <div className="prose prose-lg text-gray-700">
                      <p>
                      Hi, I’m Abhyuday! I’m a software engineer with a passion for building things, 
                      and I’m fortunate to make it my career. Originally from India, I now live in Berlin, 
                      where I contribute to a company focused on sustainability by selling second-hand clothes and books online.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Work Section */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Work</h2>
                  <div className="prose prose-lg text-gray-700">
                    <p>
                    Over the years, I’ve had the privilege of working on multiple successful products, 
                    playing a role in the design, development, and deployment of cutting-edge solutions 
                    that solve real-world problems. 
                    Right now, I work on a logistics team focused on integrating AI solutions to streamline operations, 
                    improve efficiency, and optimize processes for a greener and more sustainable future.
                    </p>
                  </div>
                </section>

                {/* Hobbies Section */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Hobbies & Interests</h2>
                  <div className="prose prose-lg text-gray-700">
                    <p>
                    When I’m not immersed in tech, you’ll find me outdoors. I have a deep connection with nature and love exploring new places. Cycling, hiking, swimming, and football are just a few of my favorite activities that allow me to stay active and rejuvenate. The mountains hold a special place in my heart, offering both adventure and a peaceful escape where I can recharge.
                    Football is something I’m truly passionate about, and as an avid Arsenal and Bayern Munich fan, I enjoy following their games and the excitement they bring.
                    </p>
                  </div>
                </section>

                {/* Contact Section */}
                <section className="pb-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                  <div className="prose prose-lg text-gray-700">
                    <p>
                      I'm always open to interesting conversations and collaboration 
                      opportunities. The best way to reach me is through email or Twitter.
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 mt-4">
                      <Mail className="w-5 h-5" />
                      <a 
                        href="mailto:abhyuday.py@gmail.com" 
                        className="text-blue-600 hover:text-blue-800 transition-colors no-underline hover:underline"
                      >
                        abhyuday.py@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-4">
                      <Twitter className="w-5 h-5" />
                      <a 
                        href="https://twitter.com/abhyudaypratap_" 
                        className="text-blue-600 hover:text-blue-800 transition-colors no-underline hover:underline"
                      >
                        @abhyudaypratap_
                      </a>
                    </div>
                  </div>
                </section>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}