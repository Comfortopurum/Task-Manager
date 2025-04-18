import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      <nav
        className={`fixed w-full z-30 transition-all duration-300 ${
          isScrolled ? " bg-indigo-700 shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl sm:px-6 lg:px-8 container mx-auto px-2 ">
          <div className="flex justify-between h-12">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-white font-bold text-xl">TaskMaster</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Features
                </a>

                <a
                  href="#about"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Testimonial
                </a>
              </div>
              <div className="flex items-center ml-6">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      
      <div className="bg-[url('/er_1.jpg')] w-full h-screen bg-cover bg-center flex-grow flex items-center  justify-center">
        <div className=" container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">TaskMaster</span>
              <span className="block text-indigo-200">
                Boost your productivity
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl">
              Track your progress, manage your time, and accomplish more with
              our intuitive task manager
            </p>
            <div className="mt-10 sm:flex sm:justify-center">
              <div className="rounded-md ">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-4xl text-purple-500 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
                >
                  Log in
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/register"
                  className="w-full flex items-center rounded-4xl justify-center px-8 py-3 border border-transparent text-base font-medium hover:bg-purple-500 text-white bg-gradient-to-br from-purple-500 to-blue-600  md:py-4 md:text-lg md:px-10"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className=" py-16 " id="features">
        <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay organized
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              TaskMaster provides powerful tools to manage your tasks and time
              effectively.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative bg-white rounded-lg shadow-lg p-10">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">
                    Task Management
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Easily add, edit, and organize your tasks with our intuitive
                    interface.
                  </p>
                </div>
              </div>

              <div className="relative bg-white rounded-lg shadow-lg p-10">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">
                    Time Tracking
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Keep track of how much time you spend on each task to
                    improve your productivity.
                  </p>
                </div>
              </div>

              <div className="relative bg-white rounded-lg shadow-lg p-10">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">
                    Analytics & Insights
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    View detailed reports of your productivity across days,
                    weeks, and months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="bg-white py-16" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-700 font-semibold tracking-wide uppercase">
              About Us
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our mission is your productivity
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Founded in 2025, TaskMaster is aimed to help thousands of
              individuals and teams accomplish more with less stress.
            </p>
          </div>

          <div className="mt-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative lg:row-start-1 lg:col-start-2">
                <div className="relative text-base mx-auto lg:max-w-none">
                  <div className="aspect-w-5 aspect-h-3 rounded-lg  overflow-hidden">
                    <img
                      className="object-cover object-center"
                      src="/flat-design-kanban-illustration.png"
                      alt="Team collaboration"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 text-left lg:mt-0 lg:row-start-1 lg:col-start-1 ">
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    Our Story
                  </h3>
                  <p className="text-lg text-gray-500">
                    TaskMaster was created under{" "}
                    <span className="font-bold text-indigo-700">
                      COC Technologies
                    </span>
                    , a forward-thinking digital solutions company committed to
                    building practical tools that simplify life and work.
                  </p>
                  <p className="text-lg text-gray-500">
                    What started as a personal project by our founder{" "}
                    <span className="font-bold">
                      Miss Comfort Opurum Chinenye
                    </span>
                    , a passionate front-end engineer, quickly grew into a
                    full-fledged task management platform designed to help
                    individuals stay organized and efficient.
                  </p>
                  <p className="text-lg text-gray-500">
                    Today, TaskMaster continues to evolve with the goal of
                    serving everyone from freelancers to students to stay at home mums, everyone deserves to stay ontop of their game.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">
                          About COC Technologies
                        </h4>
                        <p className="mt-2 text-base text-gray-500">
                          <span className="font-bold text-gray-500">
                            {" "}
                            COC Technologies
                          </span>{" "}
                          is a tech company rooted in innovation and
                          functionality. Our mission is to empower people with
                          tools that are beautifully designed, easy to use, and
                          actually make a difference.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-startr mt-8">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">
                          About The Developer
                        </h4>
                        <p className="mt-2 text-base text-gray-500">
                          <span className="font-bold">
                            Comfort Opurum Chinenye
                          </span>{" "}
                          is the developer and creative mind behind TaskMaster.
                          With a strong background in front-end engineering and
                          a passion for clean UI/UX, she set out to build a tool
                          that’s as useful as it is intuitive and that everyone
                          deserves tools that help them work smarter, not
                          harder.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-gray-100 py-16" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-700 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our users say
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-700 font-bold text-xl">JD</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Jane Doe</h3>
                  <p className="text-gray-500 text-sm">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "TaskMaster has completely transformed how I manage my team's
                workflow. The analytics features are incredibly helpful for
                tracking our productivity."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-700 font-bold text-xl">MS</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Mark Smith</h3>
                  <p className="text-gray-500 text-sm">Freelancer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a freelancer, I juggle multiple projects at once. TaskMaster
                helps me stay organized and ensures I never miss a deadline."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-700 font-bold text-xl">AT</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Alex Turner</h3>
                  <p className="text-gray-500 text-sm">Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I use TaskMaster to keep track of assignments and study
                schedules. The weekly review feature helps me plan ahead and
                stay on top of my coursework."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to boost your productivity?</span>
            <span className="block text-indigo-200">
              Start using TaskMaster today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">TaskMaster</h3>
              <p className="text-gray-400">Productivity made simple.</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://x.com/iam_diva2"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/shez_comfy/?hl=en"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/comfort-opurum-729956274/"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>

                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            

            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} TaskMaster, Inc. All rights
              reserved reserved. Developed by Comfort Opurum Chinenye under COC
              Technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
