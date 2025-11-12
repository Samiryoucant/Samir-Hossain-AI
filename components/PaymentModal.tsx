import React, { useState, useEffect } from 'react';
import { Plan } from '../types';
import { Icon } from './Icon';

interface PaymentModalProps {
  plan: Plan | null;
  onClose: () => void;
  onUpgrade: (plan: Plan) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onUpgrade }) => {
  const [transactionId, setTransactionId] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (plan) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [plan]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
        plan: plan?.name,
        transactionId,
        contactInfo,
    });
    if (plan) {
        onUpgrade(plan);
    }
    setIsSubmitted(true);
  };
  
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl m-4 overflow-hidden transform transition-all animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="p-6 sm:p-8">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <Icon name="close" className="w-6 h-6"/>
                </button>
                {isSubmitted ? (
                    <div className="text-center py-12">
                        <Icon name="check-circle" className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Submitted</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your request for the {plan.name} plan is under review. We will update your account within 24 hours after confirming the payment.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 text-sm font-medium text-white bg-brand-purple-600 hover:bg-brand-purple-700 rounded-md transition-colors">Close</button>
                    </div>
                ) : (
                <>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Upgrade to {plan.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Complete the payment and submit your details below.</p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Payment Instructions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Payment Instructions</h3>
                            <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                <p className="font-semibold text-gray-700 dark:text-gray-300">Total Amount</p>
                                <p className="text-2xl font-bold text-brand-purple-600 dark:text-brand-purple-400">${plan.price}</p>
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                <p className="font-semibold text-gray-700 dark:text-gray-300">Bkash / Nagad</p>
                                <p className="font-mono text-gray-800 dark:text-gray-200">+8801935728557</p>
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                <p className="font-semibold text-gray-700 dark:text-gray-300">USDT (TRC20) Wallet</p>
                                <p className="font-mono text-xs text-gray-800 dark:text-gray-200 break-all">TY9muJE8sq1jAuvEAn37j3B52bnXs52voW</p>
                            </div>
                        </div>

                        {/* Submission Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Confirm Your Payment</h3>
                            <div>
                                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Your Bkash/Nagad Number or USDT Wallet Address</label>
                                <input type="text" id="contactInfo" value={contactInfo} onChange={e => setContactInfo(e.target.value)} required className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-purple-500 focus:border-brand-purple-500"/>
                            </div>
                            <div>
                                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Transaction ID (TrxID)</label>
                                <input type="text" id="transactionId" value={transactionId} onChange={e => setTransactionId(e.target.value)} required className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-purple-500 focus:border-brand-purple-500"/>
                            </div>
                            <button type="submit" className="w-full py-3 text-lg font-bold text-white bg-brand-purple-600 hover:bg-brand-purple-700 rounded-lg transition-colors">Submit for Confirmation</button>
                        </form>
                    </div>
                </>
                )}
            </div>
        </div>
    </div>
  )
}