"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, KeyRound, Leaf, ArrowRight, Loader2, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (username.length < 5 || username.length > 17) {
      setError("Username must be between 5 and 17 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(fullName, username, email, password);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldActive = (field: string) => focusedField === field;

  const fields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      icon: UserCircle,
      value: fullName,
      onChange: setFullName,
    },
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      icon: User,
      value: username,
      onChange: setUsername,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: Mail,
      value: email,
      onChange: setEmail,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: Lock,
      value: password,
      onChange: setPassword,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: KeyRound,
      value: confirmPassword,
      onChange: setConfirmPassword,
    },
  ];

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
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="mt-2 text-muted">Join us in tracking your carbon footprint</p>
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
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`flex items-center gap-3 border-b-2 pb-2 transition-colors duration-300 ${
                    isFieldActive(field.name) ? "border-primary" : "border-border"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isFieldActive(field.name) ? "text-primary" : "text-muted"
                    }`}
                  />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    autoComplete={
                      field.name === "fullName"
                        ? "name"
                        : field.name === "username"
                        ? "username"
                        : field.name === "email"
                        ? "email"
                        : field.name === "password"
                        ? "new-password"
                        : field.name === "confirmPassword"
                        ? "new-password"
                        : "on"
                    }
                    required
                    className="flex-1 bg-transparent text-foreground placeholder-muted outline-none"
                  />
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isFieldActive(field.name) ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary"
                />
              </motion.div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
