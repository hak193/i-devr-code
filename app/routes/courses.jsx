import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const meta = () => {
  return [
    { title: "Courses - iDevrCode" },
    { name: "description", content: "Premium programming courses to accelerate your development skills." },
  ];
};

export const loader = async () => {
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      description: "Master advanced React patterns and best practices used by top-tier companies. Learn render props, compound components, and more.",
      price: "$149",
      originalPrice: "$199",
      level: "Advanced",
      duration: "12 hours",
      students: 2847,
      rating: 4.9,
      instructor: "Sarah Chen",
      topics: ["React", "JavaScript", "Frontend", "Patterns"],
      featured: true
    },
    {
      id: 2,
      title: "Node.js Microservices Architecture",
      description: "Build scalable microservices with Node.js, Docker, and Kubernetes. Production-ready patterns and deployment strategies.",
      price: "$199",
      originalPrice: "$249",
      level: "Intermediate",
      duration: "16 hours",
      students: 1923,
      rating: 4.8,
      instructor: "Mike Rodriguez",
      topics: ["Node.js", "Microservices", "Docker", "Backend"],
      featured: true
    },
    {
      id: 3,
      title: "TypeScript Mastery",
      description: "Complete TypeScript course from basics to advanced. Real-world projects and enterprise patterns.",
      price: "$129",
      originalPrice: "$179",
      level: "Beginner to Advanced",
      duration: "14 hours",
      students: 3421,
      rating: 4.9,
      instructor: "Alex Thompson",
      topics: ["TypeScript", "JavaScript", "Programming"],
      featured: false
    },
    {
      id: 4,
      title: "Full-Stack Next.js Development",
      description: "Build modern web applications with Next.js, React, and serverless functions. Complete project-based learning.",
      price: "$179",
      originalPrice: "$229",
      level: "Intermediate",
      duration: "18 hours",
      students: 1654,
      rating: 4.7,
      instructor: "Emma Wilson",
      topics: ["Next.js", "React", "Full-Stack", "Serverless"],
      featured: false
    },
    {
      id: 5,
      title: "GraphQL API Development",
      description: "Design and build robust GraphQL APIs with Apollo Server. Schema design, resolvers, and performance optimization.",
      price: "$159",
      originalPrice: "$199",
      level: "Intermediate",
      duration: "10 hours",
      students: 987,
      rating: 4.8,
      instructor: "David Kim",
      topics: ["GraphQL", "API", "Backend", "Apollo"],
      featured: false
    },
    {
      id: 6,
      title: "DevOps for Developers",
      description: "Essential DevOps skills for developers. CI/CD, containerization, monitoring, and cloud deployment.",
      price: "$189",
      originalPrice: "$239",
      level: "Intermediate",
      duration: "15 hours",
      students: 1432,
      rating: 4.6,
      instructor: "Lisa Park",
      topics: ["DevOps", "CI/CD", "Docker", "AWS"],
      featured: false
    }
  ];

  return json({ courses });
};

export default function Courses() {
  const { courses } = useLoaderData();
  const featuredCourses = courses.filter(course => course.featured);
  const regularCourses = courses.filter(course => !course.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Premium Programming Courses
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Learn from industry experts and build real-world projects. 
                All courses include lifetime access and certificate of completion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="#featured" className="btn btn-primary px-8 py-3">
                  Browse Featured Courses
                </Link>
                <Link to="#all" className="btn btn-secondary px-8 py-3">
                  View All Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section id="featured" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                        <div className="text-sm text-gray-500 line-through">{course.originalPrice}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.topics.map((topic, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                      <span>👨‍🏫 {course.instructor}</span>
                      <span>⏱️ {course.duration}</span>
                      <span>👥 {course.students.toLocaleString()} students</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 btn btn-primary">
                        Enroll Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Courses */}
        <section id="all" className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">All Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCourses.map((course) => (
                <div key={course.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-blue-600">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                    </div>
                    <button className="btn btn-primary text-sm px-4 py-2">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}