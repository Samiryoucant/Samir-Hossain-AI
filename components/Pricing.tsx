import React, { useState } from 'react';
import { Plan } from '../types';
import { Icon } from './Icon';
import { PaymentModal } from './PaymentModal';

interface PricingProps {
    currentPlan: Plan;
    onUpgrade: (plan: Plan) => void;
}

const plans: Plan[] = [
    {
        name: "Free",
        price: 0,
        creditsPerDay: 100,
        features: ["100 Credits per day", "Standard Generation Speed", "Community Support"]
    },
    {
        name: "Basic",
        price: 10,
        creditsPerDay: 1000,
        features: ["1,000 Credits per day", "Standard Generation Speed", "Email Support"],
    },
    {
        name: "Advance",
        price: 20,
        creditsPerDay: 2000,
        features: ["2,000 Credits per day", "Priority Generation Queue", "Advanced Style Options", "Priority Support"],
        isPopular: true,
    },
    {
        name: "Legendary",
        price: 50,
        creditsPerDay: 5000,
        features: ["5,000 Credits per day", "Highest Priority Queue", "All Beta Features", "Dedicated Support"],
    },
];

export const Pricing: React.FC<PricingProps> = ({ currentPlan, onUpgrade }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    return (
        <>
        <section id="pricing" className="py-16 sm:py-24">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Plan</h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">Unlock more credits and features. Start creating without limits.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map(plan => {
                        const isCurrentPlan = plan.name === currentPlan.name;
                        return (
                        <div key={plan.name} className={`relative border rounded-2xl p-6 flex flex-col text-left transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                            plan.isPopular ? 'border-brand-purple-500' : 'border-gray-200 dark:border-gray-700'
                        }`}>
                            {plan.isPopular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <span className="bg-brand-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Most Popular</span>
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                            <p className="mt-4">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                                {plan.price > 0 && <span className="text-gray-500 dark:text-gray-400">/month</span>}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.creditsPerDay.toLocaleString()} credits/day</p>

                            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center">
                                        <Icon name="check-circle" className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"/>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => !isCurrentPlan && setSelectedPlan(plan)}
                                disabled={isCurrentPlan}
                                className={`w-full mt-8 py-2 px-4 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                                    isCurrentPlan 
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-default' 
                                    : plan.isPopular
                                    ? 'bg-brand-purple-600 text-white hover:bg-brand-purple-700 focus:ring-brand-purple-500'
                                    : 'bg-white dark:bg-gray-800 text-brand-purple-600 dark:text-brand-purple-400 border border-brand-purple-500 hover:bg-brand-purple-50 dark:hover:bg-brand-purple-900/20 focus:ring-brand-purple-500'
                                }`}
                            >
                                {isCurrentPlan ? "Your Current Plan" : "Upgrade Plan"}
                            </button>
                        </div>
                    )})}
                </div>
            </div>
        </section>
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} onUpgrade={onUpgrade} />
        </>
    );
};
