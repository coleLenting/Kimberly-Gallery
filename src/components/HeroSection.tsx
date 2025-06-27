
export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-pink py-20 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-light-pink/30 rounded-full blur-2xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-charcoal-gray mb-6 text-shadow-soft animate-fade-in">
          Kimberly's Gallery
        </h1>
        <p className="text-xl md:text-2xl text-soft-brown mb-12 font-light animate-fade-in" style={{animationDelay: '0.3s'}}>
          Capturing precious moments and memories
        </p>
        
        {/* Featured photos grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl hover-lift">
            <img 
              src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop&crop=face" 
              alt="Featured moment 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl hover-lift">
            <img 
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop&crop=center" 
              alt="Featured moment 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl hover-lift">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" 
              alt="Featured moment 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
