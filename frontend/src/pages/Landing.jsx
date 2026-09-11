import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
                        Welcome to <span className="text-blue-600">E-Learning</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-xl text-gray-500 mb-8">
                        Start learning today. Join thousands of students and expert instructors to master new skills and advance your career.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link 
                            to="/register" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md shadow-md transition duration-300"
                        >
                            Get Started for Free
                        </Link>
                        <Link 
                            to="/login" 
                            className="bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-8 rounded-md shadow-sm border border-gray-300 transition duration-300"
                        >
                            Login to Account
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                        <div className="text-5xl mb-4">🎓</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
                        <p className="text-gray-600">Learn directly from industry professionals who are passionate about teaching.</p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                        <div className="text-5xl mb-4">💻</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Learn Anywhere</h3>
                        <p className="text-gray-600">Access your courses 24/7 from any device, anywhere in the world.</p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                        <div className="text-5xl mb-4">🤖</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">AI Recommendations</h3>
                        <p className="text-gray-600">Get personalized course suggestions powered by ChatGPT.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Landing;