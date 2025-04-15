"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookMarked, CheckCircle, Layers, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const handleSignInclick = () => {
    router.push("https://secondbrain-delta.vercel.app/signin")
  }

  const handleSignUpclick = () => {
    router.push("https://secondbrain-delta.vercel.app/signup")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">Brainly</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex" onClick={handleSignInclick}>
              Sign In
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSignUpclick}>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-slate-900">
                    Your bookmarks, organized smartly.
                  </h1>
                  <p className="max-w-[600px] text-slate-500 md:text-xl">
                    Brainly pulls your saved content from social platforms and organizes them with AI-driven metadata
                    and tags.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSignUpclick}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={handleSignInclick}>Sign In</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Brainly dashboard preview"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Brainly makes organizing your bookmarks effortless with three simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Connect Platforms</h3>
                <p className="text-center text-slate-500">
                  Link your social accounts and browser extensions to automatically import your saved content.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Smart Processing</h3>
                <p className="text-center text-slate-500">
                  Brainly scrapes and tags your bookmarks using AI to extract and organize metadata.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Access Anywhere</h3>
                <p className="text-center text-slate-500">
                  Find and use your bookmarks from one smart dashboard, accessible on any device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
                <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to organize and access your bookmarks efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <BookMarked className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Smart Bookmark Sync</h3>
                <p className="text-slate-500">
                  Automatically import and sync bookmarks from LinkedIn, Twitter, Threads, and any URL you share.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Metadata Extraction</h3>
                <p className="text-slate-500">
                  Brainly automatically extracts titles, descriptions, authors, and other relevant information.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Tag className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Label-based Organization</h3>
                <p className="text-slate-500">
                  AI-powered tagging system that intelligently categorizes your bookmarks for easy recall.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Cross-platform Search</h3>
                <p className="text-slate-500">
                  Powerful search functionality that works across all your connected platforms and bookmarks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what people are saying about Brainly.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-slate-500">Content Creator</p>
                    </div>
                  </div>
                  <p className="text-slate-500">
                    "Brainly has completely transformed how I save and organize content. I can finally find everything
                    in one place!"
                  </p>
                  <div className="flex text-indigo-500">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <div>
                      <p className="text-sm font-medium">Michael Chen</p>
                      <p className="text-xs text-slate-500">Product Manager</p>
                    </div>
                  </div>
                  <p className="text-slate-500">
                    "The AI tagging is incredibly accurate. It's like having a personal assistant organizing all my
                    research."
                  </p>
                  <div className="flex text-indigo-500">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <div>
                      <p className="text-sm font-medium">Alex Rodriguez</p>
                      <p className="text-xs text-slate-500">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-slate-500">
                    "I used to lose track of important articles and resources. With Brainly, everything is just a search
                    away."
                  </p>
                  <div className="flex text-indigo-500">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Got questions? We've got answers.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Which platforms does Brainly support?</AccordionTrigger>
                  <AccordionContent>
                    Brainly currently supports LinkedIn, Twitter, Threads, and any URL you share. We're constantly
                    adding more platforms based on user feedback.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is my data secure with Brainly?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take data security very seriously. All your data is encrypted and we never share your
                    information with third parties. You can delete your data at any time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I use Brainly offline?</AccordionTrigger>
                  <AccordionContent>
                    While Brainly requires an internet connection to sync your bookmarks, you can access previously
                    synced bookmarks offline through our mobile apps.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is there a limit to how many bookmarks I can save?</AccordionTrigger>
                  <AccordionContent>
                    Our free plan allows up to 500 bookmarks. Premium plans offer unlimited bookmarks and additional
                    features like advanced search and priority support.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How does the AI tagging system work?</AccordionTrigger>
                  <AccordionContent>
                    Our AI analyzes the content of your bookmarks, extracting key topics, themes, and relevant
                    information. It then creates intelligent tags that help organize your content in a way that makes it
                    easy to find later.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to organize your digital life?
                </h2>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have transformed how they save and access information.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-indigo-600 hover:bg-slate-100" onClick={handleSignUpclick}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-indigo-700">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">Brainly</span>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="https://github.com/GuntreddyHemanth/SecondBrain" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline underline-offset-4">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/hemanth-guntreddy-536242238/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline underline-offset-4">
              LinkedIn
            </Link>
          </nav>
          <p className="text-sm text-slate-500">© 2025 Brainly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
