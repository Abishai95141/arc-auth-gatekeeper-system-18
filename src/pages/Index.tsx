
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold text-white">Builders Arc</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
              >
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.04]"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-transparent via-black/40 to-black/60 py-20 text-center">
          <div className="container px-4 animate-fade-in">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-arc-accent">Builders Arc</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl">
              Connect with tech enthusiasts, collaborate on projects, and grow your skills in our curated community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                  transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.04] 
                  hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
                >
                  Apply to Join
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">Why Join Builders Arc?</h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-arc-accent/20 bg-black/40 p-6 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-[1.02] animate-fade-in">
                <div className="mb-4 h-12 w-12 rounded-full bg-arc-accent/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-arc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Collaborative Community</h3>
                <p className="text-gray-300">
                  Connect with like-minded tech enthusiasts to share ideas, learn from each other, and build meaningful projects together.
                </p>
              </div>
              
              <div className="rounded-lg border border-arc-accent/20 bg-black/40 p-6 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="mb-4 h-12 w-12 rounded-full bg-arc-accent/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-arc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Monthly Tech Talks</h3>
                <p className="text-gray-300">
                  Participate in our monthly tech talks where members share insights, new technologies, and industry trends.
                </p>
              </div>
              
              <div className="rounded-lg border border-arc-accent/20 bg-black/40 p-6 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-[1.02] animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="mb-4 h-12 w-12 rounded-full bg-arc-accent/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-arc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Project Incubation</h3>
                <p className="text-gray-300">
                  Turn your ideas into reality with our project incubation program. Find team members and receive guidance from experienced mentors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl rounded-xl border border-arc-accent/20 bg-black/60 p-8 backdrop-blur-md shadow-lg animate-fade-in">
              <h2 className="mb-4 text-center text-2xl font-bold text-white">Ready to join the community?</h2>
              <p className="mb-6 text-center text-gray-300">
                Apply today and connect with other tech enthusiasts who share your passion.
              </p>
              <div className="flex justify-center">
                <Link to="/signup">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                    transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.04] 
                    hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
                  >
                    Apply to Join
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md py-6">
        <div className="container px-4 text-center text-sm text-gray-400">
          <p>© 2025 Builders Arc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
