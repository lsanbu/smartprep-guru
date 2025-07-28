import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Sparkles, Zap } from "lucide-react";

export default function Index() {
	return (
		<div className="container mx-auto py-10">
			<section className="mb-16 text-center">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
					Welcome to <span className="text-brand-purple">KDx</span>AI
				</h1>
				<p className="text-lg text-brand-light-gray mb-8">
					Empowering the Next Generation of AI Innovators
				</p>
				<Button size="lg">
					Get Started <Sparkles className="ml-2 animate-pulse" />
				</Button>
			</section>

			<section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
				{/* Mentorship Program Card */}
				<Card className="glass-effect hover:shadow-lg transition-shadow duration-300">
					<CardHeader>
						<CardTitle className="text-xl">Mentorship Program</CardTitle>
						<CardDescription>
							Connect with industry experts and gain invaluable insights.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							Our mentorship program pairs you with seasoned AI professionals
							who can guide you through your learning journey.
						</p>
					</CardContent>
					<CardFooter>
						<Button variant="secondary">Learn More</Button>
					</CardFooter>
				</Card>

				{/* AI Education Card */}
				<Card className="glass-effect hover:shadow-lg transition-shadow duration-300">
					<CardHeader>
						<CardTitle className="text-xl">AI Education</CardTitle>
						<CardDescription>
							Access curated courses and workshops to master AI concepts.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							From beginner-friendly introductions to advanced topics, our
							educational resources cover a wide range of AI subjects.
						</p>
					</CardContent>
					<CardFooter>
						<Button variant="secondary">Explore Courses</Button>
					</CardFooter>
				</Card>

				{/* Community & Events Card */}
				<Card className="glass-effect hover:shadow-lg transition-shadow duration-300">
					<CardHeader>
						<CardTitle className="text-xl">Community & Events</CardTitle>
						<CardDescription>
							Join a vibrant community of AI enthusiasts and attend exclusive
							events.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							Network with like-minded individuals, participate in discussions,
							and attend workshops and conferences.
						</p>
					</CardContent>
					<CardFooter>
						<Button variant="secondary">Join the Community</Button>
					</CardFooter>
				</Card>
			</section>

			{/* KDxAutomate Section */}
			<div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
						<Zap className="w-6 h-6 text-white" />
					</div>
					<div>
						<h3 className="text-2xl font-bold text-accent">KDxAutomate</h3>
						<p className="text-accent/80 font-medium">Do More by Doing Less</p>
					</div>
				</div>

				<p className="text-gray-600 mb-6">
					KDxAutomate powers <strong>task-level AI agents and cross-platform automation</strong>, helping individuals and teams eliminate repetitive effort and optimize operations.
				</p>

				<div className="grid md:grid-cols-2 gap-4">
					<div className="bg-white/70 p-4 rounded-lg border border-accent/10">
						<h4 className="font-semibold text-accent mb-2">KDxRobotize</h4>
						<p className="text-sm text-gray-600">No-code task agents for emails, document sorting, and file ops</p>
					</div>
					<div className="bg-white/70 p-4 rounded-lg border border-accent/10">
						<h4 className="font-semibold text-accent mb-2">KDxWorkflow</h4>
						<p className="text-sm text-gray-600">Cross-platform automation (e.g., CRM → Sheets → WhatsApp)</p>
					</div>
					<div className="bg-white/70 p-4 rounded-lg border border-accent/10">
						<h4 className="font-semibold text-accent mb-2">KDxOps</h4>
						<p className="text-sm text-gray-600">Ops dashboard with alerts, reports, and checklists</p>
					</div>
					<div className="bg-white/70 p-4 rounded-lg border border-accent/10">
						<h4 className="font-semibold text-accent mb-2">KDxHR</h4>
						<p className="text-sm text-gray-600">AI-first HR workflow automation — onboarding, leave, timesheets, etc.</p>
					</div>
				</div>
			</div>

			<section className="mt-20">
				<h2 className="text-3xl font-semibold text-center mb-8">
					Frequently Asked Questions
				</h2>
				<Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
					<AccordionItem value="item-1">
						<AccordionTrigger>What is KDxAI?</AccordionTrigger>
						<AccordionContent>
							KDxAI is an initiative focused on empowering individuals through AI
							education, mentorship, and community engagement.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>How can I join the mentorship program?</AccordionTrigger>
						<AccordionContent>
							To join the mentorship program, please fill out the application form
							on our website. We review applications on a rolling basis.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Are the courses free?</AccordionTrigger>
						<AccordionContent>
							We offer a mix of free and premium courses. Check our course catalog
							for details on pricing.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			<section className="mt-20 text-center">
				<h2 className="text-3xl font-semibold mb-8">Stay Updated</h2>
				<p className="text-brand-light-gray mb-4">
					Subscribe to our newsletter for the latest news, events, and
					resources.
				</p>
				<div className="flex justify-center">
					<div className="w-full md:w-2/3 lg:w-1/2 flex flex-col md:flex-row gap-2">
						<Input type="email" placeholder="Enter your email" />
						<Button>Subscribe</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
