'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  RocketOutlined,
  LockOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  CloudServerOutlined,
  RobotOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Serverless Architecture`,
      description: `Scale effortlessly with our cutting-edge serverless infrastructure, reducing costs and improving performance.`,
      icon: <CloudServerOutlined />,
    },
    {
      heading: `Advanced Authentication`,
      description: `Protect your enterprise with state-of-the-art authentication mechanisms, ensuring data security at every level.`,
      icon: <LockOutlined />,
    },
    {
      heading: `AI Integration`,
      description: `Harness the power of artificial intelligence to drive innovation and automate complex processes.`,
      icon: <RobotOutlined />,
    },
    {
      heading: `Industry-Standard Integrations`,
      description: `Seamlessly connect with your existing tools and platforms for a unified development experience.`,
      icon: <ApiOutlined />,
    },
    {
      heading: `Rapid Deployment`,
      description: `Accelerate your time-to-market with our streamlined development and deployment processes.`,
      icon: <ThunderboltOutlined />,
    },
    {
      heading: `Enterprise-Grade Security`,
      description: `Rest easy knowing your applications are protected by industry-leading security measures and compliance standards.`,
      icon: <LockOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Johnson`,
      designation: `CTO, Global Tech Solutions`,
      content: `This solution has revolutionized our development process. We've cut our time-to-market by 50% while maintaining enterprise-grade security.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `Lead Developer, InnovateTech`,
      content: `The AI integration capabilities have allowed us to create cutting-edge applications that set us apart from our competitors.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Rodriguez`,
      designation: `VP of Engineering, SecureFinance`,
      content: `As a financial institution, security is paramount. This solution provides the robust protection we need while enabling rapid innovation.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `David Patel`,
      designation: `Founder, AgileStartup`,
      content: `The serverless architecture has allowed us to scale effortlessly as our user base grows, without breaking the bank.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: `Lisa Thompson`,
      designation: `Head of IT, HealthTech Innovations`,
      content: `The comprehensive nature of this solution has streamlined our development process and improved collaboration across our teams.`,
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    {
      name: `Robert Kim`,
      designation: `Senior Architect, Enterprise Solutions Inc.`,
      content: `The industry-standard integrations have made it incredibly easy to incorporate this solution into our existing tech stack.`,
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Startup`,
      description: `Perfect for growing businesses ready to scale`,
      monthly: 999,
      yearly: 9990,
      features: [
        `Serverless Architecture`,
        `Basic Authentication`,
        `24/7 Support`,
      ],
    },
    {
      title: `Enterprise`,
      description: `Comprehensive solution for large-scale operations`,
      monthly: 4999,
      yearly: 49990,
      features: [
        `Advanced Serverless Architecture`,
        `Enterprise-Grade Security`,
        `AI Integration`,
        `Dedicated Support Team`,
      ],
      highlight: true,
    },
    {
      title: `Custom`,
      description: `Tailored solutions for unique enterprise needs`,
      monthly: null,
      yearly: null,
      features: [
        `Customized Features`,
        `Bespoke Integrations`,
        `Personalized Onboarding`,
        `Priority Support`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the serverless architecture benefit my enterprise?`,
      answer: `Our serverless architecture allows for automatic scaling, reduced operational costs, and improved performance. It eliminates the need for server management, allowing your team to focus on developing features that drive business value.`,
    },
    {
      question: `What security measures are in place to protect our data?`,
      answer: `We implement multiple layers of security, including advanced authentication mechanisms, encryption at rest and in transit, regular security audits, and compliance with industry standards such as GDPR, HIPAA, and SOC 2.`,
    },
    {
      question: `Can this solution integrate with our existing tools and platforms?`,
      answer: `Absolutely. Our solution is designed with industry-standard integrations in mind, allowing seamless connection with a wide range of existing tools and platforms commonly used in enterprise environments.`,
    },
    {
      question: `How does the AI capability enhance our application development?`,
      answer: `Our AI integration allows you to incorporate advanced features such as natural language processing, predictive analytics, and machine learning models into your applications, driving innovation and enabling more intelligent, data-driven decision-making.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Integrate Our Solution`,
      description: `Seamlessly incorporate our platform into your existing development environment.`,
    },
    {
      heading: `Develop with Ease`,
      description: `Leverage our comprehensive tools and AI capabilities to build robust applications.`,
    },
    {
      heading: `Deploy Securely`,
      description: `Utilize our serverless architecture for effortless, secure deployment.`,
    },
    {
      heading: `Scale Confidently`,
      description: `Grow your application with peace of mind, backed by our enterprise-grade infrastructure.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😓`,
      title: `Struggling with complex, costly infrastructure`,
    },
    {
      emoji: `🔒`,
      title: `Worried about security vulnerabilities`,
    },
    {
      emoji: `⏳`,
      title: `Frustrated by slow development cycles`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Empower Your Enterprise with Next-Gen Web Development`}
        subtitle={`Unleash the full potential of your business with our comprehensive, secure, and scalable Next.js application development solution.`}
        buttonText={`Start Your Digital Transformation`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/1h4s1A-prometheonlabs-vtF8`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from satisfied enterprise clients`}
          />
        }
      />

      <LandingSocialProof logos={logos} title={`Trusted by Industry Leaders`} />
      <LandingPainPoints
        title={`The High Cost of Outdated Web Development: 85% of Enterprises Are Falling Behind`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Streamline Your Path to Digital Excellence`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Accelerate Your Success with Cutting-Edge Capabilities`}
        subtitle={`Harness the power of next-generation technologies to drive your enterprise forward`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories: Enterprises Thriving with Our Solution`}
        subtitle={`Discover how industry leaders have transformed their digital landscape`}
        testimonials={testimonials}
      />

      <LandingPricing
        id="pricing"
        title={`Invest in Your Digital Future`}
        subtitle={`Choose the plan that aligns with your enterprise goals`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Your Questions, Answered`}
        subtitle={`Get clarity on how our solution can empower your enterprise`}
        questionAnswers={questionAnswers}
      />

      <LandingCTA
        title={`Ready to Revolutionize Your Web Development?`}
        subtitle={`Join the ranks of forward-thinking enterprises and start your journey to digital excellence today.`}
        buttonText={`Begin Your Transformation`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
