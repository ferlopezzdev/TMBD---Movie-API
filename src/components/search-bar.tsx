"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/lista?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const modal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.form
              onSubmit={handleSearch}
              className="w-full max-w-2xl md:max-w-4xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="¿Qué quieres ver?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="
                  w-full
                  h-16 md:h-20
                  px-4 md:px-6
                  text-xl md:text-3xl
                  font-light
                  rounded-lg
                  border-2 border-gray-300
                  focus:outline-none focus:border-blue-600
                  bg-white bg-opacity-90
                "
              />
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white hover:opacity-80 cursor-pointer p-2 md:p-0"
        aria-label="Abrir búsqueda"
      >
        <Search className="w-6 h-6" />
      </button>
      {modal}
    </>
  );
};
