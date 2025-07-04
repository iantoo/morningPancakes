import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema, type Flavor } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Sun, Clock, Building, DoorOpen, LayersIcon, Minus, Plus, MessageCircle, Bike, Heart, Star, Instagram, Facebook, Info } from "lucide-react";
import { Link } from "wouter";
import { z } from "zod";

type FormData = z.infer<typeof insertOrderSchema>;

export default function Home() {
  const { toast } = useToast();
  const [flavorQuantities, setFlavorQuantities] = useState<Record<string, number>>({});

  const form = useForm<FormData>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      hostel: "",
      room: "",
      flavors: [],
    },
  });

  const { data: flavors = [], isLoading: flavorsLoading } = useQuery<Flavor[]>({
    queryKey: ["/api/flavors"],
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      generateWhatsAppOrder(order);
      toast({
        title: "Order Created!",
        description: "Your order has been submitted. You'll be redirected to WhatsApp.",
      });
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message || "Failed to create order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const watchedValues = form.watch();
  
  const getTotalQuantity = () => {
    return Object.values(flavorQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const calculateTotal = () => {
    return getTotalQuantity() * 8;
  };

  const updateFlavorQuantity = (flavorValue: string, quantity: number) => {
    const newQuantities = { ...flavorQuantities };
    if (quantity === 0) {
      delete newQuantities[flavorValue];
    } else {
      newQuantities[flavorValue] = quantity;
    }
    setFlavorQuantities(newQuantities);
    
    // Update form flavors array
    const flavorArray = Object.entries(newQuantities).map(([flavor, quantity]) => ({
      flavor,
      quantity
    }));
    form.setValue("flavors", flavorArray);
  };

  const generateWhatsAppOrder = (order: any) => {
    const flavorDetails = order.flavors.map((item: any) => {
      const flavor = flavors.find(f => f.value === item.flavor);
      return `${flavor?.emoji || '🥞'} ${flavor?.name || item.flavor} x${item.quantity}`;
    }).join("\n");

    const message = `🌅 *Morning Glory Pancakes Order* 🥞

🏨 *Hostel:* ${order.hostel}
🚪 *Room:* ${order.room}
📊 *Total Stacks:* ${order.quantity}
🎯 *Flavors:*
${flavorDetails}
💰 *Total:* $${(order.total / 100).toFixed(2)}

Please confirm this order and let me know the delivery time. Thank you! 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254794056800?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const onSubmit = (data: FormData) => {
    createOrderMutation.mutate(data);
  };

  const getSelectedFlavorNames = () => {
    return Object.entries(flavorQuantities)
      .map(([flavorValue, quantity]) => {
        const flavor = flavors.find(f => f.value === flavorValue);
        return `${flavor?.emoji || '🥞'} ${flavor?.name || flavorValue} x${quantity}`;
      })
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-morning-gradient">
      {/* Header */}
      <header className="bg-cream-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sun className="text-sunrise-orange text-2xl" />
              <h1 className="text-2xl font-fredoka text-maple-brown">Morning Glory</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/about">
                <Button 
                  variant="ghost" 
                  className="text-maple-brown hover:bg-lemon-yellow font-medium"
                >
                  <Info className="h-4 w-4 mr-2" />
                  About Us
                </Button>
              </Link>
              <div className="hidden md:flex items-center space-x-2 text-sm text-maple-brown">
                <Clock className="h-4 w-4" />
                <span>Open 6:00 AM - 12:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-sunset-gradient py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce mb-8">
            <Sun className="h-16 w-16 text-white mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-fredoka text-white mb-6 drop-shadow-lg">
            Morning Glory Pancakes
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Fluffy, golden pancakes delivered fresh to your hostel room every morning! 🥞
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-white">
              <Bike className="h-8 w-8 mb-2 mx-auto" />
              <p className="text-sm">Fast Delivery</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-white">
              <Heart className="h-8 w-8 mb-2 mx-auto text-red-400" />
              <p className="text-sm">Made with Love</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-white">
              <Star className="h-8 w-8 mb-2 mx-auto text-yellow-300" />
              <p className="text-sm">5-Star Taste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-16 bg-cream-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-fredoka text-maple-brown mb-4">Order Your Perfect Stack</h2>
            <p className="text-lg text-maple-brown/80">Fill out the form below and we'll send your order via WhatsApp!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <Card className="bg-white rounded-3xl shadow-lg border-2 border-strawberry-pink/20">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Hostel Name */}
                    <FormField
                      control={form.control}
                      name="hostel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-maple-brown flex items-center">
                            <Building className="h-4 w-4 mr-2" />Hostel Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Sunrise Hostel, Golden Inn" 
                              className="border-2 border-pancake-gold border-opacity-30 rounded-xl focus:border-pancake-gold"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Room Number */}
                    <FormField
                      control={form.control}
                      name="room"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-maple-brown flex items-center">
                            <DoorOpen className="h-4 w-4 mr-2" />Room Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 101, A-205" 
                              className="border-2 border-pancake-gold border-opacity-30 rounded-xl focus:border-pancake-gold"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Flavor Selection with Quantity */}
                    <div>
                      <FormLabel className="text-sm font-semibold text-maple-brown flex items-center mb-3">
                        <span className="mr-2">🍪</span>Choose Your Flavors & Quantities
                      </FormLabel>
                      <div className="space-y-4">
                        {flavorsLoading ? (
                          <div className="text-center text-gray-500">Loading flavors...</div>
                        ) : (
                          flavors.map(flavor => (
                            <div 
                              key={flavor.id}
                              className="flex items-center justify-between p-4 border-2 border-sunrise-orange border-opacity-30 rounded-xl hover:bg-lemon-yellow hover:bg-opacity-20 transition-all duration-200"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{flavor.emoji}</span>
                                <span className="font-medium text-maple-brown">{flavor.name}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Button
                                  type="button"
                                  onClick={() => updateFlavorQuantity(flavor.value, Math.max(0, (flavorQuantities[flavor.value] || 0) - 1))}
                                  className="w-8 h-8 bg-sunrise-orange text-white rounded-full hover:bg-strawberry-pink"
                                  disabled={!flavorQuantities[flavor.value]}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-lg font-bold text-maple-brown min-w-8 text-center">
                                  {flavorQuantities[flavor.value] || 0}
                                </span>
                                <Button
                                  type="button"
                                  onClick={() => updateFlavorQuantity(flavor.value, Math.min(10, (flavorQuantities[flavor.value] || 0) + 1))}
                                  className="w-8 h-8 bg-sunrise-orange text-white rounded-full hover:bg-strawberry-pink"
                                  disabled={(flavorQuantities[flavor.value] || 0) >= 10}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      {Object.keys(flavorQuantities).length === 0 && (
                        <p className="text-red-500 text-sm mt-2">Please select at least one flavor</p>
                      )}
                    </div>

                    {/* Order Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-sunset-gradient text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg"
                      disabled={createOrderMutation.isPending}
                    >
                      <MessageCircle className="mr-3 h-5 w-5" />
                      {createOrderMutation.isPending ? "Creating Order..." : "Order via WhatsApp"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Order Summary & Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="bg-white rounded-3xl shadow-lg border-2 border-strawberry-pink border-opacity-30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-fredoka text-maple-brown mb-4 flex items-center">
                    <span className="mr-2">🧾</span>Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-maple-brown/80">
                      <span>Hostel:</span>
                      <span className="font-medium">{watchedValues.hostel || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between items-center text-maple-brown/80">
                      <span>Room:</span>
                      <span className="font-medium">{watchedValues.room || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between items-center text-maple-brown/80">
                      <span>Total Stacks:</span>
                      <span className="font-medium">{getTotalQuantity()} stack{getTotalQuantity() !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="text-maple-brown/80">
                      <span>Flavors:</span>
                      <div className="font-medium text-sm mt-1">
                        {getSelectedFlavorNames() || 'None selected'}
                      </div>
                    </div>
                    <Separator className="border-sunrise-orange border-opacity-30" />
                    <div className="flex justify-between items-center font-bold text-lg text-maple-brown">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="grid gap-4">
                <Card className="bg-mint-green border-2 border-mint-green">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-maple-brown mr-2" />
                      <h4 className="font-bold text-maple-brown">Delivery Time</h4>
                    </div>
                    <p className="text-maple-brown text-sm">15-30 minutes after order confirmation</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-lemon-yellow border-2 border-lemon-yellow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-maple-brown mr-2">💰</span>
                      <h4 className="font-bold text-maple-brown">Pricing</h4>
                    </div>
                    <p className="text-maple-brown text-sm">$8 per stack</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-lemon-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-fredoka text-maple-brown mb-4">Why Choose Morning Glory?</h2>
            <p className="text-lg text-maple-brown/80">We make every morning special with our delicious pancakes!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-pancake-gold to-yellow-300 rounded-xl flex items-center justify-center text-6xl">
                    🥞
                  </div>
                </div>
                <h3 className="text-xl font-fredoka text-maple-brown mb-2">Fresh Ingredients</h3>
                <p className="text-gray-600">Made with the finest flour, farm-fresh eggs, and creamy milk every morning.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Bike className="h-24 w-24 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-fredoka text-maple-brown mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Hot, fresh pancakes delivered to your door in under 30 minutes!</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <Star className="h-24 w-24 text-yellow-300" />
                  </div>
                </div>
                <h3 className="text-xl font-fredoka text-maple-brown mb-2">100% Satisfaction</h3>
                <p className="text-gray-600">Join thousands of happy customers who start their day with our pancakes!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maple-brown text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sun className="text-pancake-gold text-2xl" />
                <h3 className="text-xl font-fredoka">Morning Glory</h3>
              </div>
              <p className="text-yellow-200">Making mornings brighter, one pancake at a time.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-yellow-200">
                <p className="flex items-center"><MessageCircle className="h-4 w-4 mr-2" />WhatsApp Orders</p>
                <p className="flex items-center"><Clock className="h-4 w-4 mr-2" />6:00 AM - 12:00 PM Daily</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-yellow-200 hover:text-pancake-gold transition-colors duration-200">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-yellow-200 hover:text-pancake-gold transition-colors duration-200">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-yellow-200 hover:text-pancake-gold transition-colors duration-200">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <Separator className="border-yellow-800 my-8" />
          <div className="text-center text-yellow-200">
            <p>&copy; 2024 Morning Glory Pancakes. All rights reserved. Made with ❤️ for pancake lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
