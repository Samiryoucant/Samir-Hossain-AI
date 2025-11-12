import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Generator } from './components/Generator';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Plan } from './types';

export type Theme = 'light' | 'dark';

const plans: Plan[] = [
    { name: "Free", price: 0, creditsPerDay: 100, features: [] },
    { name: "Basic", price: 10, creditsPerDay: 1000, features: [] },
    { name: "Advance", price: 20, creditsPerDay: 2000, features: [] },
    { name: "Legendary", price: 50, creditsPerDay: 5000, features: [] },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [credits, setCredits] = useState(100);
  const [currentPlan, setCurrentPlan] = useState<Plan>(plans[0]);

  useEffect(() => {
    // Theme initialization
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);

    // Daily Credit Refresh Logic
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem('userData');
    let userData = savedData ? JSON.parse(savedData) : {
      plan: plans[0],
      credits: plans[0].creditsPerDay,
      lastRefreshed: today
    };

    if (userData.lastRefreshed !== today) {
      userData.credits = userData.plan.creditsPerDay;
      userData.lastRefreshed = today;
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    setCredits(userData.credits);
    setCurrentPlan(userData.plan);

  }, [theme]);

  const handleSetCredits = (newCredits: number) => {
    setCredits(newCredits);
    const savedData = localStorage.getItem('userData');
    let userData = savedData ? JSON.parse(savedData) : { plan: currentPlan, lastRefreshed: new Date().toISOString().split('T')[0]};
    userData.credits = newCredits;
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  const handlePlanUpgrade = (newPlan: Plan) => {
    const today = new Date().toISOString().split('T')[0];
    const userData = {
      plan: newPlan,
      credits: newPlan.creditsPerDay,
      lastRefreshed: today
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setCurrentPlan(newPlan);
    setCredits(newPlan.creditsPerDay);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans flex flex-col transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} credits={credits} />
      <main className="flex-grow w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        <Generator credits={credits} setCredits={handleSetCredits} />
        <Pricing currentPlan={currentPlan} onUpgrade={handlePlanUpgrade}/>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;