import React, { useState } from 'react';
import { Check, Crown, Zap, Star, CreditCard, Shield } from 'lucide-react';
import type { PricingPlan } from '../types';

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'FREE',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    features: [
      '3 video analyses per month',
      'Basic technique feedback',
      'Standard model only',
      'Basic progress tracking'
    ],
    limitations: [
      'Limited to 30-second videos',
      'No advanced analytics',
      'No video export'
    ]
  },
  {
    id: 'advanced',
    name: 'ADVANCED',
    monthlyPrice: 11.99,
    yearlyPrice: 10.79,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    features: [
      '25 video analyses per month',
      'All pro models (Federer, Nadal)',
      'Detailed mistake detection',
      'Slow-motion breakdowns',
      'Progress analytics',
      'Video export (720p)'
    ]
  },
  {
    id: 'pro',
    name: 'PRO',
    monthlyPrice: 22.99,
    yearlyPrice: 20.69,
    popular: true,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    features: [
      '100 video analyses per month',
      'All pro models + custom training',
      'Advanced biomechanics analysis',
      'Frame-by-frame breakdown',
      'Personalized improvement plans',
      'HD video export (1080p)',
      'Priority support',
      'PDF technique reports'
    ]
  },
  {
    id: 'elite',
    name: 'ELITE',
    monthlyPrice: 33.99,
    yearlyPrice: 30.59,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      'Unlimited video analyses',
      'All features + AI coach chat',
      'Real-time technique scoring',
      'Custom drill recommendations',
      '4K video export',
      'Team/coach dashboard',
      'API access',
      'White-label options',
      'Dedicated account manager'
    ]
  }
];

export default function PricingTab() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currentPlan] = useState<string>('free'); // This would come from user context

  const handleSubscribe = (planId: string) => {
    // This would integrate with your payment processor
    console.log(`Subscribing to ${planId} plan with ${billingCycle} billing`);
    // For now, we'll just show an alert
    alert(`Redirecting to payment for ${planId.toUpperCase()} plan (${billingCycle} billing)`);
  };

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'free': return Shield;
      case 'advanced': return Zap;
      case 'pro': return Star;
      case 'elite': return Crown;
      default: return Shield;
    }
  };

  const calculateYearlySavings = (monthlyPrice: number) => {
    const yearlyTotal = monthlyPrice * 12;
    const discountedYearly = monthlyPrice * 0.9 * 12;
    return Math.round(yearlyTotal - discountedYearly);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Choose Your Tennis Journey
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock your potential with AI-powered coaching. Start free and upgrade as you improve.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-800' : 'text-gray-500'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            billingCycle === 'yearly' ? 'bg-sky-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <div className="flex items-center space-x-2">
          <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-800' : 'text-gray-500'}`}>
            Yearly
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
            Save 10%
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => {
          const IconComponent = getIcon(plan.id);
          const isCurrentPlan = currentPlan === plan.id;
          const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 transition-all duration-200 hover:shadow-lg ${
                plan.popular 
                  ? 'border-sky-400 shadow-lg scale-105' 
                  : isCurrentPlan
                  ? 'border-emerald-400'
                  : 'border-sand-200 hover:border-sky-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center space-y-4">
                {/* Icon */}
                <div className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto`}>
                  <IconComponent className={`w-8 h-8 ${plan.color}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>

                {/* Price */}
                <div className="space-y-1">
                  {plan.monthlyPrice === 0 ? (
                    <div className="text-3xl font-bold text-gray-800">Free</div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-gray-800">
                        ${price}
                        <span className="text-lg font-normal text-gray-500">/month</span>
                      </div>
                      {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                        <div className="text-sm text-emerald-600">
                          Save ${calculateYearlySavings(plan.monthlyPrice)}/year
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start space-x-3 opacity-60">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isCurrentPlan
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : plan.monthlyPrice === 0
                      ? 'bg-gray-800 hover:bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.monthlyPrice === 0 ? 'Get Started' : 'Upgrade Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Compare All Features
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-800">Features</th>
                {pricingPlans.map((plan) => (
                  <th key={plan.id} className="text-center py-4 px-4 font-semibold text-gray-800">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              <tr>
                <td className="py-4 px-4 text-gray-600">Monthly video analyses</td>
                <td className="py-4 px-4 text-center">3</td>
                <td className="py-4 px-4 text-center">25</td>
                <td className="py-4 px-4 text-center">100</td>
                <td className="py-4 px-4 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Pro models (Federer, Nadal)</td>
                <td className="py-4 px-4 text-center">❌</td>
                <td className="py-4 px-4 text-center">✅</td>
                <td className="py-4 px-4 text-center">✅</td>
                <td className="py-4 px-4 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Video export quality</td>
                <td className="py-4 px-4 text-center">None</td>
                <td className="py-4 px-4 text-center">720p</td>
                <td className="py-4 px-4 text-center">1080p</td>
                <td className="py-4 px-4 text-center">4K</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Advanced analytics</td>
                <td className="py-4 px-4 text-center">❌</td>
                <td className="py-4 px-4 text-center">✅</td>
                <td className="py-4 px-4 text-center">✅</td>
                <td className="py-4 px-4 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Priority support</td>
                <td className="py-4 px-4 text-center">❌</td>
                <td className="py-4 px-4 text-center">❌</td>
                <td className="py-4 px-4 text-center">✅</td>
                <td className="py-4 px-4 text-center">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-2xl p-8 border border-sky-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Can I change plans anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and bank transfers for yearly subscriptions.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Our FREE plan gives you 3 analyses per month. Upgrade anytime to unlock more features.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">Absolutely. Cancel your subscription anytime with no cancellation fees or penalties.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4" />
          <span>Secure payments</span>
        </div>
        <span>•</span>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>SSL encrypted</span>
        </div>
        <span>•</span>
        <span>Cancel anytime</span>
      </div>
    </div>
  );
}