'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassButton from './components/send-buttons';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [blurVisible, setBlurVisible] = useState(false);
  const [form, setForm] = useState({ name: '', wallet: '', telegram: '' });
  const [errors, setErrors] = useState({ name: '', wallet: '', telegram: '' });

  const openForm = () => {
    setBlurVisible(true);
    setTimeout(() => setShowForm(true), 100);
  };

  const closeForm = () => {
    setShowForm(false);
    setTimeout(() => setBlurVisible(false), 90);
  };

  const validateWallet = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);
  const validateTelegram = (handle: string) => /^@[\w\d_]{3,}$/.test(handle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: form.name.trim().length < 3 ? 'Name must be at least 3 characters' : '',
      wallet: validateWallet(form.wallet) ? '' : 'Wallet must start with 0x and be 42 characters',
      telegram: validateTelegram(form.telegram) ? '' : 'Telegram must start with @',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error("form errors");
      return;
    }

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Submission failed');
      } else {
        toast.success('Successfully joined the waitlist!');
        setForm({ name: '', wallet: '', telegram: '' });
        setShowForm(false);
        setTimeout(() => setBlurVisible(false), 90);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('Form error:', err);
    }
  };

  return (
    <div className="relative">
      <div className="h-screen flex items-center flex-col bg-gradient-to-bl from-stone-900">
        <img
          src="/chronix.png"
          height={400}
          width={400}
          alt="chronix"
          className="mt-32 h-52 w-52 lg:h-[400px] lg:w-[400px] md:h-[400px] md:w-[400px]"
        />
        <h1 className="text-2xl lg:text-3xl italic text-white">
          predict. profit. plant the future.
        </h1>

        <button className="button mt-14" onClick={openForm}>
          <div className="wrap">
            <p>
              <span>✧</span>
              <span>✦</span>
              join waitlist
            </p>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {blurVisible && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 p-10 rounded-3xl shadow-2xl w-full max-w-2xl bg-black/50 backdrop-blur-md shadow-stone-900"
            >
              <button
                onClick={closeForm}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl text-center font-bold mb-2 text-white">join the waitlist</h2>
              <h2 className="text-sm text-center font-light italic mb-6 text-white">
                chronix isn’t explained. it has to be experienced.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-5 py-3 rounded-xl text-lg text-white bg-black/30 backdrop-blur-md 
                      border-2 transition-all duration-200 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-white/30
                      shadow-inner group-hover:shadow-xl group-focus-within:shadow-lg
                      ${errors.name ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Wallet Field */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="wallet address"
                    value={form.wallet}
                    onChange={(e) => setForm({ ...form, wallet: e.target.value })}
                    className={`w-full px-5 py-3 rounded-xl text-lg text-white bg-black/30 backdrop-blur-md 
                      border-2 transition-all duration-200 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-white/30
                      shadow-inner group-hover:shadow-xl group-focus-within:shadow-lg
                      ${errors.wallet ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {errors.wallet && <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>}
                </div>

                {/* Telegram Field */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="telegram"
                    value={form.telegram}
                    onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                    className={`w-full px-5 py-3 rounded-xl text-lg text-white bg-black/30 backdrop-blur-md 
                      border-2 transition-all duration-200 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-white/30
                      shadow-inner group-hover:shadow-xl group-focus-within:shadow-lg
                      ${errors.telegram ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {errors.telegram && <p className="text-red-500 text-sm mt-1">{errors.telegram}</p>}
                </div>

                <div className="flex justify-end mt-8">
                  <GlassButton />
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
