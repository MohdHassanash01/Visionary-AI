import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Digital Marketing Director',
    company: 'TechFlow Inc.',
    content: 'TextVision AI has revolutionized our content creation process. We can now generate unique visuals for our campaigns in minutes instead of days.',
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Independent Artist',
    company: 'Studio M',
    content: 'The quality of images is incredible. It\'s like having a creative partner that never runs out of ideas. My clients are amazed by what we can create.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'Startup Founder',
    company: 'GreenTech Solutions',
    content: 'As a bootstrap startup, TextVision AI allows us to create professional marketing materials without breaking the bank. It\'s a game-changer.',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold  mb-6">
            Trusted by
            <span className="text-blue-500"> Creators </span>
            Worldwide
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Join thousands of satisfied users who are transforming their creative workflows with TextVision AI.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-neutral-300 transition-all duration-300 transform hover:-translate-y-2 shadow-md "
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-black mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-slate-800 font-semibold">{testimonial.name}</h4>
                  <p className="dark:text-gray-700 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-lg">4.9/5</span>
            </div>
            <p className="text-lg">
              Average rating from over <span className="text-purple-400 font-semibold">10,000+</span> satisfied users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;