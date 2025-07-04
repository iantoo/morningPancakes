import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Clock, 
  Heart, 
  Users, 
  Award, 
  Utensils, 
  MapPin, 
  Phone, 
  Mail,
  ArrowLeft,
  ChefHat,
  Sparkles
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-morning-gradient">
      {/* Header */}
      <div className="bg-sunrise-orange text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Order
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-fredoka">About Morning Glory</h1>
                <p className="text-orange-100">Bringing sunshine to your breakfast since 2023</p>
              </div>
            </div>
            <div className="text-6xl">🌅</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-maple-brown mb-6 font-fredoka">
                Our Story
              </h2>
              <div className="space-y-4 text-maple-brown">
                <p className="text-lg leading-relaxed">
                  Morning Glory Pancakes was born from a simple idea: everyone deserves a perfect 
                  morning, especially busy students who need fuel for their day ahead.
                </p>
                <p className="leading-relaxed">
                  Founded by a group of food-loving college students, we noticed how hard it was 
                  to get a proper breakfast between classes, study sessions, and hostel life. 
                  So we decided to bring the comfort of home-cooked pancakes directly to your door.
                </p>
                <p className="leading-relaxed">
                  Every pancake is made with love, using premium ingredients and family recipes 
                  passed down through generations. We believe breakfast should be the highlight 
                  of your day, not an afterthought.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-cream-white border-2 border-strawberry-pink shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-6xl">🥞</div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-maple-brown mb-2">
                      Made with Love
                    </h3>
                    <p className="text-maple-brown">
                      Fresh ingredients, traditional recipes, and a sprinkle of morning magic
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-maple-brown text-center mb-12 font-fredoka">
            Why Choose Morning Glory?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-cream-white border-2 border-mint-green hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-maple-brown">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maple-brown text-center">
                  Fresh pancakes delivered to your hostel in 15-30 minutes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-white border-2 border-strawberry-pink hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle className="text-maple-brown">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maple-brown text-center">
                  Made with organic ingredients and traditional family recipes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-white border-2 border-lemon-yellow hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">💝</div>
                <CardTitle className="text-maple-brown">Student Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maple-brown text-center">
                  Affordable prices designed for student budgets
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-white border-2 border-sunrise-orange hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">🍯</div>
                <CardTitle className="text-maple-brown">6 Amazing Flavors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maple-brown text-center">
                  From classic Plain to tropical Pineapple - something for everyone
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-white border-2 border-strawberry-pink hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <CardTitle className="text-maple-brown">WhatsApp Ordering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maple-brown text-center">
                  Simple ordering through WhatsApp - no apps to download
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cream-white border-2 border-mint-green hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">🏠</div>
                <CardTitle className="text-maple-brown">Hostel Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maple-brown text-center">
                  Direct delivery to your hostel room - no need to go out
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Flavor Showcase */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-maple-brown text-center mb-12 font-fredoka">
            Our Signature Flavors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Plain", emoji: "🥞", description: "Classic buttermilk perfection", color: "bg-lemon-yellow" },
              { name: "Cinnamon", emoji: "🍯", description: "Warm spice with a hint of sweetness", color: "bg-sunrise-orange" },
              { name: "Orange", emoji: "🍊", description: "Citrus burst with fresh orange zest", color: "bg-strawberry-pink" },
              { name: "Lemon", emoji: "🍋", description: "Tangy and refreshing lemon delight", color: "bg-mint-green" },
              { name: "Pineapple", emoji: "🍍", description: "Tropical paradise in every bite", color: "bg-lemon-yellow" },
              { name: "Vanilla", emoji: "🌟", description: "Rich Madagascar vanilla bean", color: "bg-cream-white" }
            ].map((flavor, index) => (
              <Card key={index} className={`${flavor.color} border-2 border-maple-brown/20 hover:shadow-lg transition-all hover:scale-105`}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{flavor.emoji}</div>
                  <h3 className="text-xl font-bold text-maple-brown mb-2">{flavor.name}</h3>
                  <p className="text-maple-brown text-sm">{flavor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact & Hours */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-cream-white border-2 border-sunrise-orange">
              <CardHeader>
                <CardTitle className="text-maple-brown text-2xl font-bold flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-sunrise-orange" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-maple-brown font-medium">Monday - Friday</span>
                  <Badge variant="secondary" className="bg-mint-green text-maple-brown">
                    6:00 AM - 11:00 AM
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-maple-brown font-medium">Saturday - Sunday</span>
                  <Badge variant="secondary" className="bg-strawberry-pink text-maple-brown">
                    7:00 AM - 12:00 PM
                  </Badge>
                </div>
                <div className="mt-4 p-4 bg-lemon-yellow rounded-lg">
                  <p className="text-maple-brown text-sm">
                    <strong>Peak Hours:</strong> 7:00 AM - 9:00 AM
                    <br />
                    <em>Order early to avoid the breakfast rush!</em>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cream-white border-2 border-strawberry-pink">
              <CardHeader>
                <CardTitle className="text-maple-brown text-2xl font-bold flex items-center">
                  <Phone className="h-6 w-6 mr-2 text-strawberry-pink" />
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📱</div>
                  <div>
                    <p className="text-maple-brown font-medium">WhatsApp Orders</p>
                    <p className="text-maple-brown text-sm">+254794056800</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="text-maple-brown font-medium">Email Support</p>
                    <p className="text-maple-brown text-sm">hello@morningglory.co.ke</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="text-maple-brown font-medium">Service Area</p>
                    <p className="text-maple-brown text-sm">All Campus Hostels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-sunset-gradient border-2 border-sunrise-orange">
            <CardContent className="p-12">
              <div className="text-6xl mb-4">🌅</div>
              <h2 className="text-4xl font-bold text-white mb-4 font-fredoka">
                Ready to Start Your Morning Right?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied students who start their day with Morning Glory pancakes. 
                Fresh, delicious, and delivered with love.
              </p>
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-white text-sunrise-orange hover:bg-cream-white font-bold text-lg px-8 py-3"
                >
                  Order Now
                  <Sparkles className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}