import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Award,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import React, { useState } from "react";
import {
  CopyrightFooter,
  CopyrightProtection,
} from "../components/CopyrightProtection";
import { ParticleBackground } from "../components/ParticleBackground";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

// Initialize EmailJS with the public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Import your profile image
import profileImage from "../assets/profile.jpg";
// Resume file is now served from public folder

// Static Data
const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sahayasavari",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/_itz_me_santhoz",
    label: "Instagram",
  },
  {
    icon: Github,
    href: "https://github.com/aka-sahayasavari",
    label: "GitHub",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/918667520029",
    label: "WhatsApp",
  },
  {
    icon: Twitter,
    href: "https://x.com/_itz_me_santhoz",
    label: "X (Twitter)",
  },
  {
    icon: Code2,
    href: "https://leetcode.com/u/sahaya_savari/",
    label: "LeetCode",
  },
];

const SKILLS = {
  technical: [
    { name: "Python", level: 85 },
    { name: "C/C++", level: 70 },
    { name: "Java", level: 75 },
    { name: "HTML/CSS", level: 80 },
    { name: "Data Analysis", level: 75 },
    { name: "Coding", level: 70 },
  ],
  tools: ["Power BI", "Excel", "Eclipse", "Weka", "Google Colab", "R-Studio"],
  soft: [
    "Communication",
    "Team Collaboration",
    "Adaptability",
    "Problem-Solving",
  ],
};

const PROJECTS = [
  {
    title: "Data Analytics Dashboard",
    description:
      "Interactive dashboard for data visualization using Power BI and Python",
    tech: ["Python", "Power BI", "Data Analysis"],
    github: "https://github.com/aka-sahayasavari/data-analytics-dashboard",
    demo: "https://aka-sahayasavari.github.io/data-analytics-dashboard",
  },
  {
    title: "ML Prediction Model",
    description:
      "Machine learning model for predictive analysis using various algorithms",
    tech: ["Python", "Scikit-learn", "Pandas"],
    github: "https://github.com/aka-sahayasavari/ml-prediction-model",
    demo: "https://aka-sahayasavari.github.io/ml-prediction-model",
  },
  {
    title: "Web Portfolio",
    description:
      "Responsive portfolio website with modern design and animations",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/sahaya-savari/MY-PORTFOLIO.git",
    demo: "https://sahayasavari.web.app",
  },
];

const EDUCATION = [
  {
    degree: "M.Sc Artificial Intelligence",
    institution: "St. Joseph's College, Trichy",
    duration: "2025 - 2027",
    percentage: "Pursuing",
  },
  {
    degree: "B.Sc Data Science",
    institution: "Thiagarajar College of Arts and Science",
    duration: "2022 - 2025",
    percentage: "65.3%",
  },
  {
    degree: "Higher Secondary in Bio-Maths",
    institution: "St.Mary's Higher Secondary School",
    duration: "2021 - 2022",
    percentage: "78.33%",
  },
  {
    degree: "High School",
    institution: "St.Mary's Higher Secondary School",
    duration: "2019 - 2020",
    percentage: "85%",
  },
];

const CERTIFICATIONS = [
  "IBM Data Analyst course - Coursera",
  "Honor's Diploma in Information Technology - CCE Computer Education",
  "Mastering Excel Data Analysis & Dashboard Reporting - UDEMY",
];

export function PortfolioHome() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Environment Credentials
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        message: formData.message.trim(),
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      alert("SUCCESS! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const error = err as { text?: string; message?: string };
      console.error("[EmailJS] Error:", error);
      const errorMsg =
        error?.text ||
        error?.message ||
        "Check your Public Key and Template settings";
      alert("FAILED... Error: " + errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Enhanced scroll behavior for better mobile support
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Alternative method for better mobile compatibility
      if (
        !window.scrollTo ||
        window.scrollTo.toString().indexOf("[native code]") === -1
      ) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 py-8 pt-20 relative overflow-hidden"
      >
        <ParticleBackground />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center px-4 lg:px-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight"
              style={{
                fontFamily:
                  'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              <div className="mb-2">Hi, I'm</div>
              <span className="text-gradient bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent block">
                SAHAYA SAVARI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium mt-4"
              style={{
                fontFamily:
                  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              M.Sc Artificial Intelligence Student | Future AI Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mt-6"
              style={{
                fontFamily:
                  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              MSc Artificial Intelligence student passionate about transforming
              complex data into actionable insights and developing intelligent
              systems. Experienced in Python, Machine Learning, and Data
              Analytics, with a strong foundation in AI research and
              applications. Ready to contribute to innovative AI solutions that
              shape the future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mt-8"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-primary hover:bg-primary/90 glow-effect"
              >
                View Projects
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground bg-background/90 dark:bg-background/90 dark:text-foreground"
              >
                <a
                  href="/SAHAYASAVARI_FINAL_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume in new tab"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground bg-background/90 dark:bg-background/90 dark:text-foreground"
              >
                <a
                  href="/SAHAYASAVARI_FINAL_RESUME.pdf"
                  download="SAHAYASAVARI_FINAL_RESUME.pdf"
                  aria-label="Download resume PDF"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mt-8">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 rounded-full glass-card hover:glow-effect transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-1 lg:order-2 lg:justify-end items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden glass-card glow-effect animate-float relative bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-100 dark:to-slate-200 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-background relative shadow-inner">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-foreground text-4xl sm:text-5xl md:text-6xl font-bold absolute inset-0 z-0 pointer-events-none">
                        SS
                      </div>
                      <img
                        src={profileImage}
                        alt="Sahaya Savari Profile"
                        className="w-full h-full object-cover object-center profile-image-enhanced transition-all duration-500 group-hover:scale-110 absolute inset-0 z-10"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = "none";
                        }}
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = "block";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-28 sm:h-28 border-2 border-primary/20 rounded-full opacity-30 hidden sm:block group-hover:border-primary/40 group-hover:opacity-50 transition-all duration-300"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-24 sm:h-24 border border-primary/15 rounded-full opacity-20 hidden sm:block group-hover:border-primary/30 group-hover:opacity-40 transition-all duration-300"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground cursor-pointer touch-manipulation"
            onClick={() => scrollToSection("about")}
          >
            <span className="text-xs sm:text-sm mb-2 select-none">
              Scroll to explore
            </span>
            <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-4 bg-dot-pattern">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A passionate Artificial Intelligence student from Madurai, Tamil
              Nadu, dedicated to learning and innovation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <GraduationCap className="mr-3 h-6 w-6 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-muted-foreground text-sm">
                        {edu.institution}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">
                          {edu.duration}
                        </span>
                        <Badge variant="secondary">{edu.percentage}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="mr-3 h-6 w-6 text-primary" />
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-4">
                      <p className="text-sm">{cert}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {SKILLS.soft.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-6 py-3 text-base sm:text-lg hover:bg-primary/10 transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen py-20 px-4 bg-muted/30 bg-mesh-gradient"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              My <span className="text-gradient">Skills</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.technical.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 text-center hover:glow-effect transition-all duration-300"
                  >
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6">Tools & Software</h3>
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 text-center hover:glow-effect transition-all duration-300"
                  >
                    <span className="font-medium">{tool}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4 bg-dot-pattern">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              My <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="glass-card h-full hover:glow-effect transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                      <Button asChild size="sm">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-muted/30 bg-mesh-gradient">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Latest <span className="text-gradient">Articles</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Getting Started with Machine Learning",
                excerpt:
                  "A beginner's guide to understanding the fundamentals of machine learning.",
                readTime: "5 min read",
                date: "Dec 15, 2024",
              },
              {
                title: "Data Visualization Best Practices",
                excerpt: "Learn how to create compelling data visualizations.",
                readTime: "7 min read",
                date: "Dec 10, 2024",
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card h-full hover:glow-effect transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{article.readTime}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <CardTitle className="hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost">Read More →</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen py-20 px-4 relative overflow-hidden"
      >
        <ParticleBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>sahayasavari@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Madurai, Tamil Nadu</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex flex-wrap gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full glass-card hover:glow-effect transition-all duration-300"
                      title={social.label}
                    >
                      <social.icon className="h-5 w-5 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={sendEmail} className="space-y-6">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    disabled={isSubmitting}
                  />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <CopyrightProtection />
      <CopyrightFooter />
    </div>
  );
}
