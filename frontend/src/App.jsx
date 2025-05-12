import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WalletConnectButton from './components/WalletConnectButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-purple-600">
                  🚀 MemeLaunch
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {/* <Link to="/create" className="text-gray-700 hover:text-purple-600">Create Token</Link> */}
                {/* <Link to="/my-tokens" className="text-gray-700 hover:text-purple-600">My Tokens</Link> */}
                <WalletConnectButton />
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Add more routes here as needed */}
              {/* <Route path="/create" element={<TokenFormPage />} /> */}
            </Routes>
          </div>
        </main>

        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MemeLaunch. All rights reserved. (Conceptual)
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
