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
import { ArrowLeft, Building, DoorOpen, Plus, Minus, MessageCircle, Sparkles, Heart, Star } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { z } from "zod";

type FormData = z.infer<typeof insertOrderSchema>;

export default function Order() {
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

  const watchedValues = form.watch();

  const { data: flavors = [], isLoading: flavorsLoading } = useQuery<Flavor[]>({
    queryKey: ["/api/flavors"],
  });

  const updateFlavorQuantity = (flavorValue: string, quantity: number) => {
    setFlavorQuantities(prev => {
      if (quantity === 0) {
        const newQuantities = { ...prev };
        delete newQuantities[flavorValue];
        return newQuantities;
      }
      return { ...prev, [flavorValue]: quantity };
    });
  };

  const getTotalQuantity = () => {
    return Object.values(flavorQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const calculateTotal = () => {
    return getTotalQuantity() * 8;
  };

  const createOrderMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const flavorData = Object.entries(flavorQuantities).map(([flavor, quantity]) => ({
        flavor,
        quantity
      }));
      
      const orderData = {
        ...data,
        flavors: flavorData
      };

      return apiRequest("/api/orders", "POST", orderData);
    },
    onSuccess: (order: any) => {
      const flavorDetails = Object.entries(flavorQuantities)
        .map(([flavorValue, quantity]) => {
          const flavor = flavors.find((f: Flavor) => f.value === flavorValue);
          return `${flavor?.emoji || '🥞'} ${flavor?.name || flavorValue}: ${quantity} stack${quantity > 1 ? 's' : ''}`;
        })
        .join('%0A');

      const message = `🌅 *Morning Glory Pancakes Order* 🥞%0A%0A` +
        `*Hostel:* ${watchedValues.hostel}%0A` +
        `*Room:* ${watchedValues.room}%0A%0A` +
        `*Your Perfect Stack:*%0A${flavorDetails}%0A%0A` +
        `*Total Stacks:* ${getTotalQuantity()} stack${getTotalQuantity() !== 1 ? 's' : ''}%0A%0A` +
        `Thank you for choosing Morning Glory! ☀️ We'll have your delicious pancakes ready in 15-30 minutes! 🚀`;

      window.open(`https://wa.me/254794056800?text=${message}`, '_blank');
      
      toast({
        title: "Order sent! 🎉",
        description: "Check WhatsApp to complete your order. We'll start cooking right away!",
        className: "bg-mint-green border-sunrise-orange",
      });

      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      form.reset();
      setFlavorQuantities({});
    },
    onError: () => {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again. We want to make your morning perfect!",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (getTotalQuantity() === 0) {
      toast({
        title: "Choose your flavors! 🥞",
        description: "Select at least one pancake to start your perfect morning.",
        className: "bg-strawberry-pink border-sunrise-orange",
      });
      return;
    }
    createOrderMutation.mutate(data);
  };

  const getSelectedFlavorNames = () => {
    return Object.entries(flavorQuantities)
      .map(([flavorValue, quantity]) => {
        const flavor = flavors.find((f: Flavor) => f.value === flavorValue);
        return `${flavor?.emoji || '🥞'} ${flavor?.name || flavorValue} x${quantity}`;
      })
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-morning-gradient relative overflow-hidden">
      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sunrise-orange"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0.2 
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          >
            <Sparkles className="h-3 w-3" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 bg-cream-white/90 backdrop-blur-sm shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="text-maple-brown hover:bg-lemon-yellow font-medium group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-3xl">☀️</span>
              </motion.div>
              <div>
                <h1 className="text-2xl font-fredoka text-maple-brown">Morning Glory</h1>
                <p className="text-sm text-sunrise-orange">Order Your Perfect Stack</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-fredoka text-maple-brown mb-4">
            Create Your Perfect Morning! ✨
          </h2>
          <p className="text-xl text-maple-brown/80 max-w-2xl mx-auto">
            Tell us where you are and pick your favorite flavors. We'll deliver sunshine to your door! 🌅
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white rounded-3xl shadow-2xl border-4 border-strawberry-pink/30 overflow-hidden">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Hostel Name */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FormField
                        control={form.control}
                        name="hostel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-maple-brown flex items-center mb-3">
                              <Building className="h-5 w-5 mr-3 text-sunrise-orange" />
                              Which hostel calls you home? 🏠
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Sunshine Hostel, Golden Dreams Inn" 
                                className="text-lg p-4 border-3 border-lemon-yellow rounded-2xl focus:border-sunrise-orange focus:ring-4 focus:ring-sunrise-orange/20 bg-lemon-yellow/10"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    {/* Room Number */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FormField
                        control={form.control}
                        name="room"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-maple-brown flex items-center mb-3">
                              <DoorOpen className="h-5 w-5 mr-3 text-strawberry-pink" />
                              Your room number? 🚪
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Room 101, A-23, etc." 
                                className="text-lg p-4 border-3 border-strawberry-pink rounded-2xl focus:border-sunrise-orange focus:ring-4 focus:ring-sunrise-orange/20 bg-strawberry-pink/10"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    {/* Flavor Selection */}
                    <div>
                      <FormLabel className="text-lg font-bold text-maple-brown flex items-center mb-6">
                        <span className="text-2xl mr-3">🥞</span>
                        Choose Your Magical Flavors!
                      </FormLabel>
                      <div className="space-y-4">
                        {flavorsLoading ? (
                          <div className="text-center text-maple-brown">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block text-4xl mb-2"
                            >
                              ☀️
                            </motion.div>
                            <p>Loading delicious flavors...</p>
                          </div>
                        ) : (
                          flavors.map((flavor, index) => (
                            <motion.div
                              key={flavor.id}
                              className="bg-cream-white p-6 rounded-2xl border-3 border-mint-green/30 hover:border-sunrise-orange/50 transition-all duration-300 hover:shadow-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, y: -2 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <motion.span 
                                    className="text-4xl"
                                    whileHover={{ scale: 1.2, rotate: 15 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  >
                                    {flavor.emoji}
                                  </motion.span>
                                  <div>
                                    <h3 className="text-xl font-bold text-maple-brown">{flavor.name}</h3>
                                    <p className="text-maple-brown/70">Perfect for any morning mood</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <motion.div
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Button
                                      type="button"
                                      onClick={() => updateFlavorQuantity(flavor.value, Math.max(0, (flavorQuantities[flavor.value] || 0) - 1))}
                                      className="w-10 h-10 bg-strawberry-pink text-white rounded-full hover:bg-sunrise-orange shadow-lg"
                                      disabled={!flavorQuantities[flavor.value]}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                  <motion.span 
                                    className="text-2xl font-bold text-maple-brown min-w-12 text-center"
                                    key={flavorQuantities[flavor.value] || 0}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  >
                                    {flavorQuantities[flavor.value] || 0}
                                  </motion.span>
                                  <motion.div
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Button
                                      type="button"
                                      onClick={() => updateFlavorQuantity(flavor.value, Math.min(10, (flavorQuantities[flavor.value] || 0) + 1))}
                                      className="w-10 h-10 bg-sunrise-orange text-white rounded-full hover:bg-strawberry-pink shadow-lg"
                                      disabled={(flavorQuantities[flavor.value] || 0) >= 10}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Order Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-sunset-gradient text-white font-bold text-xl py-6 px-8 rounded-2xl shadow-xl border-3 border-white hover:shadow-2xl disabled:opacity-50"
                        disabled={createOrderMutation.isPending || getTotalQuantity() === 0}
                      >
                        {createOrderMutation.isPending ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-3"
                          >
                            ☀️
                          </motion.div>
                        ) : (
                          <MessageCircle className="h-6 w-6 mr-3" />
                        )}
                        Send My Order via WhatsApp! 
                        <Sparkles className="h-6 w-6 ml-3" />
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <Card className="bg-white rounded-3xl shadow-2xl border-4 border-mint-green/40 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-3xl font-fredoka text-maple-brown mb-6 flex items-center">
                  <span className="mr-3 text-4xl">📋</span>Your Perfect Morning
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-lemon-yellow/20 rounded-xl">
                    <span className="text-maple-brown font-medium">🏠 Hostel:</span>
                    <span className="font-bold text-maple-brown">{watchedValues.hostel || 'Not entered yet'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-strawberry-pink/20 rounded-xl">
                    <span className="text-maple-brown font-medium">🚪 Room:</span>
                    <span className="font-bold text-maple-brown">{watchedValues.room || 'Not entered yet'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-mint-green/20 rounded-xl">
                    <span className="text-maple-brown font-medium">🥞 Total Stacks:</span>
                    <motion.span 
                      className="font-bold text-maple-brown"
                      key={getTotalQuantity()}
                      initial={{ scale: 1.2, color: "#FFA94D" }}
                      animate={{ scale: 1, color: "#7B4B2A" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {getTotalQuantity()} stack{getTotalQuantity() !== 1 ? 's' : ''}
                    </motion.span>
                  </div>
                  {getTotalQuantity() > 0 && (
                    <motion.div 
                      className="p-4 bg-sunrise-orange/10 rounded-xl border-2 border-sunrise-orange/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-maple-brown font-medium block mb-2">🌟 Your Flavors:</span>
                      <div className="text-sm text-maple-brown font-medium">
                        {getSelectedFlavorNames() || 'None selected yet'}
                      </div>
                    </motion.div>
                  )}

                </div>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid gap-4">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-mint-green border-3 border-mint-green">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h4 className="font-bold text-maple-brown text-lg mb-2">Lightning Fast</h4>
                    <p className="text-maple-brown">Ready in 15-30 minutes!</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-lemon-yellow border-3 border-lemon-yellow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">💝</div>
                    <h4 className="font-bold text-maple-brown text-lg mb-2">Student Friendly</h4>
                    <p className="text-maple-brown">Perfect for busy mornings</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}