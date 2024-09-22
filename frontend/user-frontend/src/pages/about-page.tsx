import { Code, Database, Cloud, Zap, Shield, Users } from "lucide-react"

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-2 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            About Libris
          </h1>
          
          {/* Creator Section */}
          <div className="mb-16 flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto">
                <img 
                  src="https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Creator" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-400">The Mind Behind Libris</h2>
              <p className="text-gray-300 mb-4">
                Meet the passionate developer who single-handedly brought Libris to life. With a deep love for books and technology, this visionary created a solution that's revolutionizing library management.
              </p>
              <p className="text-gray-300">
                Driven by the desire to make knowledge more accessible, our creator combined cutting-edge technology with user-centric design to develop Libris – a tool that's not just a library management system, but a gateway to endless possibilities in the world of literature and learning.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">Why Libris?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BenefitCard 
                icon={<Zap className="h-8 w-8 text-indigo-400" />}
                title="Lightning-Fast Searches"
                description="Find any book in seconds with our advanced search algorithms."
              />
              <BenefitCard 
                icon={<Shield className="h-8 w-8 text-indigo-400" />}
                title="Secure and Reliable"
                description="Rest easy knowing your data is protected with state-of-the-art security measures."
              />
              <BenefitCard 
                icon={<Users className="h-8 w-8 text-indigo-400" />}
                title="User-Friendly Interface"
                description="Intuitive design that makes library management a breeze for staff and patrons alike."
              />
              <BenefitCard 
                icon={<Database className="h-8 w-8 text-indigo-400" />}
                title="Comprehensive Analytics"
                description="Gain valuable insights into your library's performance and user preferences."
              />
            </div>
          </section>

          {/* Tech Stack Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">Powered by Cutting-Edge Tech</h2>
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <p className="text-gray-300 mb-6 text-center">
              Libris leverages a modern, robust tech stack to deliver unparalleled performance and reliability:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TechItem icon={<Code className="h-6 w-6" />} name="Hono" />
                <TechItem icon={<Database className="h-6 w-6" />} name="PostgreSQL" />
                <TechItem icon={<Code className="h-6 w-6" />} name="TypeScript" />
                <TechItem icon={<Database className="h-6 w-6" />} name="Prisma" />
                <TechItem icon={<Code className="h-6 w-6" />} name="React" />
                <TechItem icon={<Cloud className="h-6 w-6" />} name="Cloudflare" />
                <TechItem icon={<Code className="h-6 w-6" />} name="TailwindCSS" />
                <TechItem icon={<Code className="h-6 w-6" />} name="ShadcN" />
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4 text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

function TechItem({ icon, name }: { icon: React.ReactNode, name: string }) {
  return (
    <div className="flex items-center justify-center bg-gray-700 p-3 rounded-lg">
      {icon}
      <span className="ml-2 text-sm font-medium text-gray-300">{name}</span>
    </div>
  )
}