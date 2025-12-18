"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Lock, Leaf, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(usernameOrEmail, password);
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldActive = (field: string) => focusedField === field;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <Leaf className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-muted">Sign in to continue tracking your impact</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-500"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Username or Email Field */}
          <div className="relative">
            <div
              className={`flex items-center gap-3 border-b-2 pb-2 transition-colors duration-300 ${
                isFieldActive("usernameOrEmail")
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              <User
                className={`h-5 w-5 transition-colors duration-300 ${
                  isFieldActive("usernameOrEmail") ? "text-primary" : "text-muted"
                }`}
              />
              <input
                type="text"
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                onFocus={() => setFocusedField("usernameOrEmail")}
                onBlur={() => setFocusedField(null)}
                required
                className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
              />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFieldActive("usernameOrEmail") ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div
              className={`flex items-center gap-3 border-b-2 pb-2 transition-colors duration-300 ${
                isFieldActive("password") ? "border-primary" : "border-border"
              }`}
            >
              <Lock
                className={`h-5 w-5 transition-colors duration-300 ${
                  isFieldActive("password") ? "text-primary" : "text-muted"
                }`}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
              />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFieldActive("password") ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
