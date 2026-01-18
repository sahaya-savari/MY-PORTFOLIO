import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface AnimatedToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export function AnimatedToggle({ isOn, onToggle }: AnimatedToggleProps) {
  return (
    <div className="relative">
      <motion.button
        className={`
          relative w-16 h-8 rounded-full p-1 cursor-pointer
          transition-colors duration-300 ease-in-out
          ${isOn ? 'bg-blue-600' : 'bg-gray-700'}
          shadow-inner border-2 border-opacity-20
          ${isOn ? 'border-blue-300' : 'border-gray-500'}
        `}
        onClick={onToggle}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: isOn 
              ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
              : 'linear-gradient(135deg, #374151, #1f2937)'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Toggle circle */}
        <motion.div
          className="relative w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
          animate={{
            x: isOn ? 32 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Icon inside the toggle */}
          <motion.div
            animate={{ 
              rotate: isOn ? 180 : 0,
              scale: isOn ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {isOn ? (
              <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </motion.div>
        </motion.div>
        
        {/* Sparkle effects */}
        {isOn && (
          <>
            <motion.div
              className="absolute top-1 left-2 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="absolute bottom-1 right-3 w-1 h-1 bg-yellow-300 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.8
              }}
            />
          </>
        )}
      </motion.button>
    </div>
  );
}
