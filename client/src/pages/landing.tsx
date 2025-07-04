import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Sun, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-morning-gradient overflow-hidden relative">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sunrise-orange"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0.3 
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        ))}
        
        {/* Floating Pancakes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`pancake-${i}`}
            className="absolute text-6xl"
            initial={{ 
              x: -100,
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              rotate: 0
            }}
            animate={{ 
              x: (typeof window !== 'undefined' ? window.innerWidth : 1200) + 100,
              rotate: 360
            }}
            transition={{ 
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            🥞
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Sun Logo */}
          <motion.div
            className="relative mb-6"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="relative">
              <Sun className="h-24 w-24 text-sunrise-orange mx-auto drop-shadow-lg" />
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <Sun className="h-24 w-24 text-strawberry-pink mx-auto" />
              </motion.div>
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1 
            className="text-6xl md:text-8xl font-fredoka text-maple-brown mb-4 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Morning Glory
          </motion.h1>
          
          <motion.div
            className="text-4xl md:text-5xl font-fredoka text-sunrise-orange mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pancakes
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-xl md:text-2xl text-maple-brown/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ✨ <em>Wake up to sunshine on a plate!</em> ✨
            <br />
            <span className="text-lg">Fluffy pancakes delivered fresh to your door every morning</span>
          </motion.p>
        </motion.div>

        {/* Features Showcase */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: "🚀", text: "Fast Delivery", color: "bg-mint-green" },
            { icon: "💝", text: "Made with Love", color: "bg-strawberry-pink" },
            { icon: "🌟", text: "6 Amazing Flavors", color: "bg-lemon-yellow" },
            { icon: "🏠", text: "To Your Hostel", color: "bg-sunrise-orange" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`${feature.color} px-6 py-4 rounded-full border-2 border-white shadow-lg`}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-bold text-maple-brown">{feature.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/order">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-sunset-gradient text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl border-4 border-white hover:shadow-2xl"
              >
                <span className="mr-3">🥞</span>
                Order Your Perfect Stack
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
            </motion.div>
          </Link>
          
          <motion.p 
            className="text-maple-brown/70 mt-4 text-lg"
            animate={{ 
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            Ready in 15-30 minutes! 🕒
          </motion.p>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex space-x-2 text-3xl">
            <span>🥞</span>
            <Heart className="h-8 w-8 text-strawberry-pink" fill="currentColor" />
            <span>☀️</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}