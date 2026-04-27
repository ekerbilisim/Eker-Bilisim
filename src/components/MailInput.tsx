import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface MailInputProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const MailInput: React.FC<MailInputProps> = ({ name, label, onChange, required }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (val.length > 0) {
      setIsValid(validateEmail(val));
    } else {
      setIsValid(null);
    }
    if (onChange) onChange(e);
  };

  return (
    <div className="relative group w-full space-y-4">
      <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest block transition-colors group-focus-within:text-blue-600">
        {label}
      </label>
      
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none pl-1">
          <motion.div
            animate={{
              scale: isFocused || value.length > 0 ? 0.8 : 1,
              x: isFocused || value.length > 0 ? -10 : 0,
              opacity: isFocused || value.length > 0 ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="text-slate-300 dark:text-slate-600" size={24} />
          </motion.div>
        </div>

        <input
          name={name}
          type="email"
          required={required}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b-2 border-slate-50 dark:border-slate-800 focus:border-blue-600 py-4 pl-0 transition-all outline-none font-bold text-xl text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
          placeholder={!isFocused && value.length === 0 ? "example@email.com" : ""}
        />

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {isValid === true && (
              <motion.div
                key="valid"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-emerald-500"
              >
                <Check size={20} strokeWidth={3} />
              </motion.div>
            )}
            {isValid === false && value.length > 0 && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0, scale: 0.5, x: 5 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-rose-500"
              >
                <AlertCircle size={20} strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated underline focus effect */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence>
        {isValid === false && value.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-black text-rose-500 uppercase tracking-widest"
          >
            Geçersiz e-posta formatı / Invalid email format
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
