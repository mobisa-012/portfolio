import Navbar from "@/componets/navbar";
import Image from "next/image";
import { BsDatabase } from "react-icons/bs";
import { FiGithub, FiExternalLink, FiSmartphone, FiGrid } from "react-icons/fi";
import { TbFileDelta } from "react-icons/tb";

export default function ML() {
  const projects = [
    {
      id: 1,
      title: "Sentiment Analysis Engine",
      description: "Deep learning model that analyzes customer reviews with 92% accuracy using BERT architecture.",
      tags: ["NLP", "PyTorch", "Transformers"],
      image: "/me2.jpg",
      github: "https://github.com/yourusername/sentiment-analysis",
      demo: "https://yourdemo.com"
    },
    {
      id: 4,
      title: "AI-Powered Loan Default Prediction",
      description: "Built a predictive model using XGBoost and SHAP to help banks forecast loan defaults with over 89% accuracy.",
      tags: ["Python", "XGBoost", "Pandas", "SHAP", "Jupyter"],
      image: "/me2.jpg",
      github: "https://github.com/yourusername/loan-default-ml",
      demo: "",
    },
    {
      id: 5,
      title: "Facial Emotion Recognition",
      description: "A CNN-based model that classifies facial expressions into emotions in real-time using OpenCV and TensorFlow.",
      tags: ["TensorFlow", "Keras", "OpenCV", "Python"],
      image: "/me2.jpg",
      github: "https://github.com/yourusername/emotion-detector",
      demo: "",
    },
    {
      id: 6,
      title: "Customer Segmentation with K-Means",
      description: "Clustered e-commerce users based on behavior to improve marketing campaigns using unsupervised learning.",
      tags: ["Scikit-learn", "Seaborn", "NumPy", "Pandas"],
      image: "/me2.jpg",
      github: "https://github.com/yourusername/customer-segmentation",
      demo: "",
    },
    {
      id: 2,
      title: "Medical Image Classifier",
      description: "CNN model for detecting abnormalities in X-ray images with 96% precision.",
      tags: ["Computer Vision", "TensorFlow", "Keras"],
      image: "/me2.jpg",
      github: "https://github.com/yourusername/medical-image-classifier"
    },
    // {
    //   id: 3,
    //   title: "Predictive Maintenance System",
    //   description: "Time-series forecasting model predicting industrial equipment failures.",
    //   tags: ["LSTMs", "SKLearn", "Pandas"],
    //   image: "/me2.jpg",
    //   github: "https://github.com/yourusername/predictive-maintenance",
    //   demo: "https://yourdemo.com"
    // },
    // {
    //   id: 4,
    //   title: "Medical Image Classifier",
    //   description: "CNN model for detecting abnormalities in X-ray images with 96% precision.",
    //   tags: ["Computer Vision", "TensorFlow", "Keras"],
    //   image: "/me2.jpg",
    //   github: "https://github.com/yourusername/medical-image-classifier"
    // },
    // {
    //   id: 5,
    //   title: "Predictive Maintenance System",
    //   description: "Time-series forecasting model predicting industrial equipment failures.",
    //   tags: ["LSTMs", "SKLearn", "Pandas"],
    //   image: "/me2.jpg",
    //   github: "https://github.com/yourusername/predictive-maintenance",
    //   demo: "https://yourdemo.com"
    // },
    // {
    //   id: 6,
    //   title: "Predictive Maintenance System",
    //   description: "Time-series forecasting model predicting industrial equipment failures.",
    //   tags: ["LSTMs", "SKLearn", "Pandas"],
    //   image: "/me2.jpg",
    //   github: "https://github.com/yourusername/predictive-maintenance",
    //   demo: "https://yourdemo.com"
    // }
  ];

  const skills = [
    { name: "Python", icon: "/python.png" },
    // { name: "TensorFlow", icon: "/tf.png" },
    // { name: "PyTorch", icon: "/pytorch.png" },
    { name: "SKLearn", icon: "/sci.png" },
    { name: "NLP", icon: "/nlp.jpg" },
    // { name: "Computer Vision", icon: "/cv.png" },
    { name: "Pandas", icon: "/pandas.png" },
    { name: "NumPy", icon: "/numpy.png" },
    // { name: "OpenCV", icon: "/opencv.png" },
    // { name: "Transformers", icon: "/transformers-icon.png" },
    // { name: "MLflow", icon: "/ml-flow.svg" },
    // { name: "Docker", icon: "/docker.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-20 px-2">
        <div className="inline-flex items-center justify-center mb-4 bg-purple-100 text-purple-800 px-4 py-2 md:px-6 md:py-3 rounded-full">
        <BsDatabase className="mr-2 text-lg md:text-xl" />
        <span className="font-medium text-sm md:text-base">Machine Learning</span>
        </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4">
            Machine <span className="text-purple-600">Learning</span> Projects
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring the frontier of AI through practical implementations and research
          </p>
        </section>

        {/* Projects Grid */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <article 
                key={project.id}
                className="group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-100"
              >
                {/* Project Image */}
                <div className="h-40 sm:h-48 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={project.id <= 3} // Only prioritize first 3 images
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-2 sm:gap-3 text-sm sm:text-base">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                        aria-label={`View ${project.title} code on GitHub`}
                      >
                        <FiGithub className="mr-1" size={16} />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                        aria-label={`View ${project.title} demo`}
                      >
                        <FiExternalLink className="mr-1" size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">
            ML <span className="text-purple-600">Skills</span>
          </h2>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative mb-1 sm:mb-2">
                  <Image
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50px, 80px"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg md:rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Interested in collaborating?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Have an interesting ML project or research opportunity? Let's discuss how I can contribute.
          </p>
          <a
            href="contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            Contact Me
          </a>
        </section>
      </main>
    </div>
  );
}