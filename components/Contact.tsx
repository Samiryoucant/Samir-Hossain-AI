import React from 'react';
import { Icon } from './Icon';

const contactMethods = [
  {
    name: 'Email',
    detail: 'samirhossain0916@gmail.com',
    cta: 'Send an Email',
    href: 'mailto:samirhossain0916@gmail.com',
    icon: 'mail',
  },
  {
    name: 'Telegram',
    detail: '@QuiXora69',
    cta: 'Message Me',
    href: 'https://t.me/QuiXora69',
    icon: 'telegram',
  },
  {
    name: 'YouTube',
    detail: 'QuiXora69',
    cta: 'Visit Channel',
    href: 'https://youtube.com/@quixora69?si=T21CgAVwIHZjKN9S',
    icon: 'youtube',
  },
];

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
          Have a question or want to collaborate? Reach out!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-brand-purple-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto bg-brand-purple-100 dark:bg-brand-purple-900/50 text-brand-purple-600 dark:text-brand-purple-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-purple-500 group-hover:text-white">
                <Icon name={method.icon as any} className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{method.name}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{method.detail}</p>
              <div className="mt-6 text-brand-purple-600 dark:text-brand-purple-400 font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {method.cta}
                <Icon name="arrow-right" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
