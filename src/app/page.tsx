import Link from 'next/link';

import { Button } from '@/components/ui';
import { Footer, Navbar } from '@/components/layout';
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Academic Resources',
    description: 'Access previous exams, lecture notes, and practical files for all academic years.',
  },
  {
    icon: Brain,
    title: 'AI Summaries',
    description: 'Generate intelligent summaries for any PDF or document instantly.',
    premium: true,
  },
  {
    icon: Sparkles,
    title: 'AI Exam Generator',
    description: 'Create custom MCQ practice exams from any resource.',
    premium: true,
  },
  {
    icon: BookOpen,
    title: 'AI Flashcards',
    description: 'Auto-generate flashcard decks for efficient memorization.',
    premium: true,
  },
  {
    icon: Users,
    title: 'Study Groups',
    description: 'Collaborate with fellow students in dedicated study groups.',
  },
  {
    icon: MessageSquare,
    title: 'Community',
    description: 'Discuss topics, share knowledge, and learn together.',
  },
];

const stats = [
  { value: '6', label: 'Academic Years' },
  { value: '50+', label: 'Subjects' },
  { value: '1000+', label: 'Resources' },
  { value: '500+', label: 'Students' },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 dark:from-gray-900 dark:to-gray-950 sm:py-32">
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 dark:bg-primary-900/30">
              <GraduationCap className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Faculty of Medicine, University Ferhat Abbas Setif 1
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Learn More.{' '}
              <span className="gradient-text">Stress Less.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Your digital learning companion for medical school. Access all academic resources,
              AI-powered study tools, and a supportive community in one place.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Resources
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-200/50 to-transparent blur-3xl dark:from-primary-900/20" />
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Powerful tools designed specifically for medical students at UFAS.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-soft-md dark:border-gray-800 dark:bg-gray-900"
              >
                {feature.premium && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-secondary-100 px-2 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-300">
                    <Star className="h-3 w-3" />
                    Premium
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to transform your learning?
            </h2>
            <p className="mt-4 text-primary-100">
              Join hundreds of medical students already using UFAS Cortex to study smarter.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="border-white bg-white text-primary-700 hover:bg-gray-100"
              >
                Create Free Account
              </Button>
              <Link
                href="/login"
                className="text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
